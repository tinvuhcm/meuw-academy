# Dynamic HTML Generators for Mascot & Knowledge Cards

## Overview
This plan specifies the architecture for dynamically generating structured HTML for two core visual components of the app:
1. **Knowledge Cards Generator**: Standardizes the rendering of knowledge cards to ensure consistent frames, rarity-based styling, and clear content display across the app.
2. **Mascot Avatar Generator**: Replaces the static pre-rendered combination images with dynamic HTML composition (overlaying up to 3 accessories using CSS `position: absolute`).

## Status
⏳ PLANNED

## 1. Mascot Avatar HTML Generator
Currently, equipping accessories requires hardcoded combo images (e.g., `mascot-combo-crown-wand.png`). We will replace this with dynamic HTML using the `box: [x, y, w, h]` coordinate system defined in `mascot-assets.js`.

**Changes:**
- Create `js/generators.js` with `generateAvatarHTML(character, equippedAccessoryIds)`.
- Limit rendering to a maximum of 3 accessories. If >3, slice the first 3.
- Base rendering: `<div class="relative inline-block">`
- Mascot layer: `<img src="assets/images/mascot_avatar.png" class="w-full h-full relative z-0">`
- Accessory layers: `<img src="..." style="position: absolute; left: Xpx; top: Ypx; width: Wpx; height: Hpx; z-index: 10;">`
- **Touchpoints**: `js/mascot.js` and anywhere displaying the mascot needs to accept HTML instead of just an `img.src`.

## 2. Knowledge Card HTML Generator
Currently, cards are rendered imperatively. We will centralize card rendering to ensure a beautiful, consistent frame.

**Changes:**
- Add `generateKnowledgeCardHTML(cardData)` to `js/generators.js`.
- Template features: 
  - Consistent border/frame.
  - Rarity glow effects (common, rare, epic, legendary).
  - Clean typography for Title and Description.
- **Touchpoints**: `js/modules/knowledge-cards.js` will map `earnedCards` through this generator.

## 3. Public Contracts
- `window.AppGenerators` exported for easy console access (developer utility).
- Components requiring Mascot or Card rendering will import `generators.js`.

## 4. Blast Radius
- `js/mascot.js`: High impact. Needs to update DOM innerHTML instead of modifying `img.src`.
- `js/modules/knowledge-cards.js`: Moderate impact. Replaces internal DOM creation logic.
- UI layouts containing the mascot might need CSS flex/grid adjustments to accommodate a composite `<div>` instead of an `<img>`.

## 5. Verification Evidence
- [ ] Integration: The `window.dispatchEvent(new CustomEvent('mascot', ...))` correctly updates the composite HTML.
- [ ] Manual Test: Purchase and equip 3 accessories -> Verify they stack properly in the shop and dashboard.
- [ ] Manual Test: Equip 4 accessories -> Verify only 3 are rendered to prevent clutter.
- [ ] Manual Test: Open Knowledge Cards -> Verify cards render beautifully with correct rarity colors.

## 6. Resume and Execution Handoff
- Start by creating `js/generators.js`.
- Refactor `js/mascot.js` to consume `generateAvatarHTML`.
- Refactor `js/modules/knowledge-cards.js` to consume `generateKnowledgeCardHTML`.
