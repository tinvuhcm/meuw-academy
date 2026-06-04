/**
 * deep_content_audit.mjs
 * Comprehensive content quality sweep for Meuw Academy.
 *
 * Checks 10 categories NOT covered by the existing audit:
 *  1. MC answer not in options
 *  2. Empty/missing question text (< 5 chars after stripping HTML)
 *  3. MC with < 3 or > 4 options
 *  4. Duplicate options within a single question
 *  5. Fill-blank questions with missing/empty blanks[].answer
 *  6. Unicode garbage (U+FFFD replacement char, control chars)
 *  7. Theory blocks where ALL points are empty strings
 *  8. Answer and ALL options are identical (trivial question)
 *  9. English (eng) module questions with no Latin characters
 * 10. Explanation is just the raw answer verbatim and nothing else
 *
 * Usage:  node scripts/deep_content_audit.mjs [dayFrom] [dayTo]
 */

import { getCurriculumDay } from '../js/data/curriculum-loader.js';
import { stripHtmlLite } from './lib/content-audit-helpers.mjs';

const dayFrom = Number(process.argv[2] || 1);
const dayTo   = Number(process.argv[3] || 60);

// ── helpers ────────────────────────────────────────────────────────────────

function clean(v) {
  return stripHtmlLite(v || '');
}

/** Normalise for comparison: lower-case, collapse whitespace */
function norm(v) {
  return clean(v).toLowerCase().replace(/\s+/g, ' ').trim();
}

/** Does a string contain at least one Latin letter (a-z A-Z, plus accented)? */
function hasLatin(s) {
  return /[a-zA-ZÀ-ɏ]/.test(s);
}

/** Does a string contain U+FFFD or ASCII control chars (except tab/newline)? */
function hasGarbage(s) {
  return /�|[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(s);
}

// ── findings store ─────────────────────────────────────────────────────────

const TAGS = [
  'mc-answer-not-in-options',
  'empty-question-text',
  'mc-wrong-option-count',
  'duplicate-options',
  'fill-blank-missing-answer',
  'unicode-garbage',
  'theory-all-points-empty',
  'trivial-all-identical',
  'eng-no-latin',
  'trivial-explanation',
];

const findings = [];

function add(tag, path, snippet, extra = {}) {
  findings.push({ tag, path, snippet: String(snippet).slice(0, 220), ...extra });
}

// ── main loop ──────────────────────────────────────────────────────────────

for (let day = dayFrom; day <= dayTo; day++) {
  const dayData = getCurriculumDay(day);
  for (const module of dayData?.modules || []) {
    const isEng = /^eng$/i.test(module.subject);
    const modulePath = `day${day}/${module.id}/${module.subject}/${module.title}`;

    // ── lessonBlocks checks ────────────────────────────────────────────────

    for (const block of module.lessonBlocks || []) {
      // Check 7: theory block where ALL points are empty strings
      if (Array.isArray(block.points) && block.points.length > 0) {
        const allEmpty = block.points.every(p => clean(p).length === 0);
        if (allEmpty) {
          add('theory-all-points-empty', modulePath,
            `block.title="${clean(block.title)}" has ${block.points.length} point(s) all empty`);
        }
      }

      // Check 6: Unicode garbage in any block text
      const blockTexts = [block.title, ...(block.points || []), block.example, block.cta]
        .filter(Boolean);
      for (const t of blockTexts) {
        if (hasGarbage(t)) {
          add('unicode-garbage', modulePath,
            `lessonBlock garbage: "${clean(t).slice(0, 120)}"`);
          break; // one finding per block
        }
      }
    }

    // ── question checks ────────────────────────────────────────────────────

    for (const question of module.questions || []) {
      const qType    = (question.type || '').toLowerCase(); // mc, fill-blank, etc.
      const qText    = clean(question.question || '');
      const qPath    = `${modulePath} | q="${qText.slice(0, 60)}"`;
      const options  = Array.isArray(question.options) ? question.options : [];
      const answer   = question.answer;
      const explanation = question.explanation;

      // Check 2: empty/missing question text (< 5 chars after stripping)
      if (qText.length < 5) {
        add('empty-question-text', modulePath,
          `question text is "${qText}" (${qText.length} chars)`);
      }

      // Check 6: Unicode garbage in question fields
      const qAllText = [question.question, answer, explanation, ...options].filter(Boolean);
      for (const t of qAllText) {
        if (hasGarbage(String(t))) {
          add('unicode-garbage', modulePath,
            `question garbage: qText="${qText.slice(0, 80)}"`);
          break;
        }
      }

      // ── MC-specific checks ─────────────────────────────────────────────
      if (qType === 'mc' || options.length > 0) {
        const cleanedOptions = options.map(norm);
        const cleanedAnswer  = norm(answer || '');

        // Check 1: answer not in options
        if (answer !== undefined && answer !== null && answer !== '' &&
            options.length > 0 &&
            !cleanedOptions.includes(cleanedAnswer)) {
          add('mc-answer-not-in-options', modulePath,
            `answer="${clean(answer).slice(0,80)}" | options=[${options.map(o => `"${clean(o).slice(0,30)}"`).join(', ')}]`);
        }

        // Check 3: option count < 3 or > 4
        if (options.length < 3 || options.length > 4) {
          add('mc-wrong-option-count', modulePath,
            `${options.length} options — q="${qText.slice(0, 80)}"`);
        }

        // Check 4: duplicate options (case-sensitive — capitalization questions are valid)
        const caseSensitiveOpts = options.map(o => clean(o).replace(/\s+/g, ' ').trim());
        const seen = new Set();
        const dups = [];
        for (const opt of caseSensitiveOpts) {
          if (seen.has(opt)) dups.push(opt);
          seen.add(opt);
        }
        if (dups.length > 0) {
          add('duplicate-options', modulePath,
            `dup options: [${dups.map(d => `"${d.slice(0,30)}"`).join(', ')}] — q="${qText.slice(0, 60)}"`);
        }

        // Check 8: answer and ALL options are identical (case-sensitive)
        if (options.length > 0 && answer !== undefined && answer !== null && answer !== '') {
          const csAnswer = clean(answer).replace(/\s+/g, ' ').trim();
          const allSame = caseSensitiveOpts.every(o => o === csAnswer);
          if (allSame) {
            add('trivial-all-identical', modulePath,
              `all options === answer="${clean(answer).slice(0,80)}"`);
          }
        }
      }

      // ── fill-blank specific checks ─────────────────────────────────────
      if (qType === 'fill-blank' || Array.isArray(question.blanks)) {
        const blanks = Array.isArray(question.blanks) ? question.blanks : [];
        if (blanks.length === 0) {
          add('fill-blank-missing-answer', modulePath,
            `fill-blank has no blanks array — q="${qText.slice(0, 80)}"`);
        } else {
          for (let i = 0; i < blanks.length; i++) {
            const ba = clean(blanks[i]?.answer || '');
            if (ba.length === 0) {
              add('fill-blank-missing-answer', modulePath,
                `blanks[${i}].answer is empty — q="${qText.slice(0, 80)}"`);
            }
          }
        }
      }

      // Check 9: English module question has no Latin characters
      if (isEng) {
        const combined = [qText, clean(answer || ''), ...options.map(clean)].join(' ');
        if (!hasLatin(combined)) {
          add('eng-no-latin', modulePath,
            `no Latin in eng question: "${qText.slice(0, 120)}"`);
        }
      }

      // Check 10: explanation is just the raw answer verbatim and nothing else
      if (explanation && answer !== undefined && answer !== null && answer !== '') {
        const normExp = norm(explanation);
        const normAns = norm(String(answer));
        if (normExp.length > 0 && normExp === normAns) {
          add('trivial-explanation', modulePath,
            `explanation===answer="${clean(String(answer)).slice(0, 80)}"`);
        }
      }
    }
  }
}

// ── output ─────────────────────────────────────────────────────────────────

const byTag = {};
for (const tag of TAGS) byTag[tag] = 0;
for (const f of findings) byTag[f.tag] = (byTag[f.tag] || 0) + 1;

// Up to 5 examples per tag
const examples = {};
for (const tag of TAGS) {
  examples[tag] = findings.filter(f => f.tag === tag).slice(0, 5);
}

console.log(JSON.stringify({
  days: { from: dayFrom, to: dayTo },
  totalFindings: findings.length,
  byTag,
  examples,
}, null, 2));
