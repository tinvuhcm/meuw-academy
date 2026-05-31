/**
 * MEUW ACADEMY — SpeechPractice.js
 * Question Type: Speech Practice (Web Speech API)
 */

import { el, animateClass, sleep } from '../../utils.js';
import { triggerMascot } from '../../mascot.js';
import { Audio } from '../../audio.js';
import State from '../../state.js';

export function renderSpeechPractice(q, onComplete) {
  const container = el('div', { class: 'question-wrapper speech-wrapper' });

  // 1. Title
  const title = el('h2', { class: 'question-title text-gradient font-display text-2xl text-center' }, q.question);
  container.appendChild(title);

  // 2. Prompt Card
  const promptCard = el('div', { class: 'speech-prompt-card mt-4' });
  const promptText = el('div', { class: 'speech-prompt-text' }, q.promptText || 'Hãy kể một câu chuyện ngắn!');
  promptCard.appendChild(promptText);

  if (q.sample) {
    const sampleBox = el('div', { class: 'speech-prompt-sample mt-3 italic text-text-muted text-sm' });
    sampleBox.innerHTML = `<strong>Ví dụ:</strong> "${q.sample}"`;
    promptCard.appendChild(sampleBox);
  }
  container.appendChild(promptCard);

  // 3. Web Speech API Setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const hasSpeechApi = !!SpeechRecognition && State.getSetting('speechEnabled') !== false;

  const minWords = q.minWords || 3;
  let transcriptFull = '';
  let recognition = null;
  let isRecording = false;

  // 4. Record UI
  const recordArea = el('div', { class: 'speech-practice-container mt-6' });
  const recordBtn = el('button', { class: 'speech-record-btn', title: 'Nhấn để nói' }, '🎤');
  
  const statusText = el('div', { class: 'text-sm font-bold text-méo-purple mt-2 h-6' }, 
    hasSpeechApi ? 'Nhấn mic để bắt đầu' : 'Trình duyệt không hỗ trợ thu âm'
  );

  const transcriptBox = el('div', { class: 'speech-transcript-box mt-4' });
  const transcriptContent = el('span', { class: 'speech-transcript-placeholder' }, 'Lời em nói sẽ hiện ở đây...');
  transcriptBox.appendChild(transcriptContent);

  const wordsCounter = el('div', { class: 'absolute bottom-2 right-4 text-xs font-bold text-text-muted' }, `0 / ${minWords} từ`);
  transcriptBox.appendChild(wordsCounter);

  if (hasSpeechApi) {
    recordArea.appendChild(recordBtn);
    recordArea.appendChild(statusText);
    recordArea.appendChild(transcriptBox);
  }

  // 5. Fallback Textarea
  const fallbackArea = el('div', { class: 'w-full mt-6 flex flex-col gap-3' });
  if (hasSpeechApi) {
    fallbackArea.appendChild(el('div', { class: 'speech-or-divider' }, 'hoặc'));
  }
  
  const textarea = el('textarea', { 
    class: 'speech-textarea-fallback',
    placeholder: 'Em có thể gõ câu trả lời vào đây nếu không muốn nói...',
    rows: '3'
  });
  fallbackArea.appendChild(textarea);
  
  container.appendChild(recordArea);
  container.appendChild(fallbackArea);

  // 6. Action
  const submitBtn = el('button', { class: 'btn btn-cta w-full mt-6', disabled: true }, 'Hoàn thành');
  container.appendChild(submitBtn);

  // 7. Logic
  function updateWordCount(text) {
    const count = text.trim() ? text.trim().split(/\s+/).length : 0;
    wordsCounter.textContent = `${count} / ${minWords} từ`;
    if (count >= minWords) {
      submitBtn.disabled = false;
      wordsCounter.classList.add('text-correct-dk');
    } else {
      submitBtn.disabled = true;
      wordsCounter.classList.remove('text-correct-dk');
    }
  }

  // Textarea listener
  textarea.addEventListener('input', () => {
    transcriptFull = textarea.value;
    if (!isRecording && !hasSpeechApi) {
      updateWordCount(transcriptFull);
    } else if (transcriptFull.length > 0) {
      updateWordCount(transcriptFull);
    }
  });

  // Speech Recognition Logic
  if (hasSpeechApi) {
    recognition = new SpeechRecognition();
    recognition.lang = q.lang === 'en' ? 'en-US' : 'vi-VN';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      isRecording = true;
      recordBtn.classList.add('recording');
      statusText.textContent = 'Đang nghe... (Nhấn lần nữa để dừng)';
      statusText.classList.add('text-wrong');
      triggerMascot('answer:wrong', { customLines: ['Méo đang lắng nghe đây...'] }, null); // Just a thinking state
    };

    recognition.onresult = (event) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      if (final) {
        transcriptFull += ' ' + final;
        transcriptFull = transcriptFull.trim();
      }

      transcriptContent.textContent = transcriptFull + ' ' + interim;
      transcriptContent.classList.remove('speech-transcript-placeholder');
      
      // Update textarea as well to keep them in sync
      textarea.value = transcriptFull + ' ' + interim;
      
      updateWordCount(transcriptFull + ' ' + interim);
    };

    recognition.onerror = (e) => {
      console.warn('Speech recognition error:', e.error);
      if (e.error === 'not-allowed') {
        statusText.textContent = 'Chưa cấp quyền Micro! Hãy gõ chữ bên dưới nhé.';
        stopRecording();
      }
    };

    recognition.onend = () => {
      if (isRecording) {
        // Auto restart if it stopped accidentally, unless user clicked stop
        try { recognition.start(); } catch(e) {}
      }
    };

    function stopRecording() {
      isRecording = false;
      recordBtn.classList.remove('recording');
      statusText.textContent = 'Nhấn mic để nói lại';
      statusText.classList.remove('text-wrong');
      try { recognition.stop(); } catch(e) {}
    }

    recordBtn.addEventListener('click', () => {
      Audio.click();
      if (isRecording) {
        stopRecording();
      } else {
        try {
          transcriptFull = textarea.value; // start from current text
          recognition.start();
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  // Submit
  submitBtn.addEventListener('click', async () => {
    Audio.click();
    if (isRecording && recognition) {
      isRecording = false;
      try { recognition.stop(); } catch(e) {}
    }

    State.recordSpeechSubmit(); // Tracking
    Audio.correct();
    triggerMascot('answer:correct', { customLines: ['Giọng em hay quá!', 'Tuyệt vời!'] });
    
    await sleep(1500);
    onComplete(true, q.xp || 20); // Speaking gives good XP
  });

  return container;
}
