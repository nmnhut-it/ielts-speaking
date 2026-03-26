# Full Redesign: IELTS Speaking Parts 2 & 3

## Overview

Redesign Part 2 (Long Turn) and Part 3 (Discussion) to match Part 1's quality level while giving each part its own layout and color theme suited to its IELTS format.

### Design System (shared across all parts)
- **Font:** DM Sans (body) + DM Mono (counters/timers)
- **Design tokens:** CSS custom properties for colors, radii, shadows, transitions (same pattern as Part 1's `shared/styles/module2-minimal.css`)
- **Mobile-first**, single-screen-focused, no unnecessary scrolling
- **Polished details:** backdrop blur, subtle shadows, smooth CSS transitions, rounded cards

### Color Themes
- Part 1: Blue (`#2563eb`) — already done
- Part 2: **Emerald/Green** (`#059669` primary, `#d1fae5` light, `#065f46` dark)
- Part 3: **Purple/Violet** (`#7c3aed` primary, `#ede9fe` light, `#5b21b6` dark)

---

## Part 2: Long Turn — Seamless Single-Screen Card ✅ DONE

### Current Problems
- 3 separate phase sections shown/hidden with `display:none` — feels like page navigation
- System font stack, basic styling, no design polish
- Cluttered prep phase with timer + notes + cue card all competing

### New Design: Morphing Card

The entire flow happens within **one card** that transforms between states using CSS transitions. No section swapping.

### States & Transitions

```
idle → prep → speaking → review → (next card)
```

#### State: Idle
- Full cue card displayed in a centered card: topic title, "You should say" prompts, category badge, card number
- Single prominent button: "Start 1-Minute Preparation"
- Key vocabulary section collapsed below (if available)
- Favorite button in card header

#### State: Prep (card morphs)
- Timer ring appears around card number or in card header (60s countdown, emerald color)
- Notes textarea slides in below the prompts (placeholder: "Jot down keywords...")
- Button changes to "Start Speaking" (becomes active when prep ends or user taps early)
- Strategy hint collapsible at bottom

#### State: Speaking (card transforms)
- Cue card content shrinks to a compact 2-line reference at top of same card
- Large timer ring (2:00 countdown) appears in center of card
- Live word count below timer
- Live transcript area below that
- "Done Speaking" button at bottom
- Smooth height transition as card content changes

#### State: Review (card transforms again)
- Timer disappears, card expands to show results
- Band score display (overall + criteria breakdown) at top
- Your transcript vs sample answer in a tabbed or side-by-side view
- Follow-up questions section (if available)
- Action buttons: "Try Again" | "Next Card" at bottom
- Audio playback if recording exists

### Files to Modify

1. **`styles/module3-minimal.css`** — Complete rewrite
   - Add DM Sans + DM Mono font imports
   - Define emerald color theme CSS custom properties (follow Part 1's token pattern exactly)
   - Single `.cuecard` container with state-based classes (`.cuecard--prep`, `.cuecard--speaking`, `.cuecard--review`)
   - CSS transitions for height, opacity, transform changes between states
   - Timer ring styles (reuse Part 1's ring pattern, change color to emerald)
   - Mobile-first responsive design
   - Review panel styles (score display, transcript comparison, action buttons)
   - Settings panel + jump modal styles (match Part 1's drawer pattern)
   - Student identification modal styles (match Part 1)

2. **`ielts-module3-minimal.html`** — Restructure HTML
   - Add DM Sans/DM Mono font link tags
   - Replace 3 separate `phase-content` sections with single `.cuecard` container
   - Card has all elements always present, visibility controlled by state classes on the container
   - Elements: card header (number, category, fav), topic title, prompts, prep timer, notes, speaking timer, transcript, review scores, sample answer, action buttons
   - Keep all existing script tags unchanged
   - Update top bar to match Part 1's pattern (centered title, student name, progress count)

3. **`scripts/module3-minimal.js`** — Refactor state machine
   - Replace `showPhase('prep'|'speak'|'review')` with state class toggling on the card container
   - Single function `setState(state)` that adds/removes `.cuecard--idle`, `.cuecard--prep`, `.cuecard--speaking`, `.cuecard--review` classes
   - Keep all existing logic: timer, recording, scoring, favorites, jump modal, settings
   - Keep all existing data structures (CONNECTOR_EXAMPLES, strategies, cue cards)
   - Keep all existing integrations (Telegram, STT, scoring, score history)
   - Transition callbacks: prep timer end → auto-advance to speaking, speaking done → show review

### Important: Do NOT change
- Script tag list or load order
- Data structures (cue card data, strategies, connectors)
- Scoring logic (ieltsScoring.js)
- Telegram integration
- STT/recording logic
- Score history storage
- practiceCommon.js shared methods

---

## Part 3: Discussion — Focused Question Deck

### Current Problems
- Chat UI requires scrolling to see previous messages
- Scoring/feedback not prominent enough — buried in chat flow
- Dark theme with system fonts feels disconnected from rest of app

### New Design: Question Card Deck

Replace chat with a **focused single-question card** that shows one question at a time with immediate scoring feedback.

### Layout

```
┌─────────────────────────┐
│ ← Home  Part 3  3/40 ⚙ │  Top bar (purple theme)
├─────────────────────────┤
│  ┌───────────────────┐  │
│  │ Society & Culture  │  │  Category badge
│  │                   │  │
│  │ "Why do you think │  │  Question text (large, centered)
│  │  people value     │  │
│  │  traditions?"     │  │
│  │                   │  │
│  │  ● ● ● ○ ○       │  │  Follow-up dot indicator
│  └───────────────────┘  │
│                         │
│  ┌───────────────────┐  │
│  │ Your answer...    │  │  Live transcript area
│  │ (appears while    │  │
│  │  recording)       │  │
│  └───────────────────┘  │
│                         │
│    ←    🎤    Skip →    │  Controls (bottom)
└─────────────────────────┘
```

### States

```
ready → recording → scored → (follow-up or next question)
```

#### State: Ready
- Question card centered with category badge, question text
- Follow-up dot indicator (shows which question in the sequence: main + follow-ups)
- Strategy hint button (collapsible)
- Mic button prominent at bottom, prev/skip arrows on sides

#### State: Recording
- Question card stays visible but compact
- Transcript area appears below with live text
- Timer + word count shown
- Mic button changes to "Stop" (pulsing red)

#### State: Scored
- Question card transforms to show results:
  - Band score (large number) with criteria breakdown
  - Your answer transcript
  - Sample answer (expandable)
  - AI feedback (if available)
- If follow-ups exist: "Next Follow-up" button, dot indicator advances
- If no more follow-ups: "Next Question" button
- "Try Again" option

### Files to Modify

1. **`styles/part3-practice.css`** — Complete rewrite
   - Add DM Sans + DM Mono font imports
   - Define purple/violet color theme CSS custom properties
   - **Light background** (not dark) — use `#faf5ff` page bg, white cards (consistent with Parts 1 & 2)
   - `.question-card` centered container with state classes
   - Category badge colors (keep existing 5 categories, style as colored pills)
   - Recording state styles (pulsing mic, transcript area)
   - Score display styles (match Part 1/2 review panel patterns)
   - Bottom controls bar (sticky, with mic/nav buttons)
   - Follow-up dot indicator styles
   - Settings panel + jump modal (match Part 1/2 pattern)
   - CSS transitions between states
   - Student identification modal styles

2. **`ielts-part3-practice.html`** — Restructure HTML
   - Add DM Sans/DM Mono font link tags
   - Replace `.chat-container` + `.chat-input` with `.question-card` + `.controls-bar`
   - Question card contains: category badge, question text, dot indicator, transcript area, score panel
   - Controls bar at bottom: prev button, mic button, skip button
   - Strategy hint as floating collapsible (keep existing pattern)
   - Update top bar to match Part 1's pattern
   - Keep all existing script tags unchanged

3. **`scripts/part3-practice.js`** — Refactor from chat to card
   - Remove all chat bubble rendering (`appendMessage`, `appendBubble`, etc.)
   - Add `setState(state)` function for card state management
   - `loadQuestion(index)` — renders question in card (not as chat message)
   - `showScore(result)` — renders score in card's review area (not as chat bubble)
   - Keep navigation logic (next, previous, jump, favorites)
   - Keep all data (40 questions, strategies, connectors)
   - Keep recording/STT/scoring/Telegram integration
   - Follow-up flow: after scoring main question, if follow-ups exist, advance dot indicator and show next follow-up in same card

### Important: Do NOT change
- Script tag list or load order
- Question data (40 questions, categories, follow-ups, sample answers)
- Strategy data structures
- Scoring logic
- Telegram integration
- STT/recording logic
- Score history storage
- practiceCommon.js shared methods

---

## Implementation Order

### Step 1: Part 2 CSS (`styles/module3-minimal.css`)
- Complete rewrite with emerald theme, DM Sans, design tokens
- All state-based styles for the morphing card
- Test with existing HTML to make sure nothing breaks catastrophically

### Step 2: Part 2 HTML (`ielts-module3-minimal.html`)
- Restructure to single card layout
- Add font imports
- Update top bar

### Step 3: Part 2 JS (`scripts/module3-minimal.js`)
- Refactor phase management to state classes
- Test full flow: idle → prep → speaking → review → next

### Step 4: Part 3 CSS (`styles/part3-practice.css`) ✅ DONE
- Complete rewrite with purple theme, DM Sans, design tokens
- Light background (#faf5ff), white cards, backdrop blur top/bottom bars
- Question card with state classes (ready, recording, scored)
- Category badge colors, dot indicators, score chips, controls bar

### Step 5: Part 3 HTML (`ielts-part3-practice.html`) ✅ DONE
- Restructured from chat to question card layout
- Added Google Fonts (DM Sans + DM Mono) link tags
- Question card with badge, meta, dots, transcript, score, sample areas
- Sticky bottom controls bar (prev, mic, skip)
- Strategy hint as floating collapsible

### Step 6: Part 3 JS (`scripts/part3-practice.js`) ✅ DONE
- Removed all chat bubble rendering (addMessage, addScorePill, addSampleAnswer, scrollChatToBottom)
- Added setState() for card state management (ready/recording/scored)
- renderCurrentQuestion() updates card content instead of appending chat messages
- showScore() renders score, transcript, and sample in card sections
- Follow-up flow: after scoring, card resets to ready with follow-up question, dot advances
- All 40 questions, strategies, connectors, scoring, Telegram, STT preserved

### Step 7: Cross-part consistency check
- Verify all 3 parts share: DM Sans, consistent top bar, settings panel pattern, identification modal
- Test on mobile viewport
- Verify no regressions in scoring, recording, Telegram

---

## Testing Checklist

For each part after redesign:
- [ ] Page loads without console errors
- [ ] Student identification modal works
- [ ] Settings panel opens/closes
- [ ] Jump modal works (search, filter, jump to number)
- [ ] Recording starts/stops correctly
- [ ] Live transcript appears during recording
- [ ] Scoring displays correctly after recording
- [ ] Sample answer displays
- [ ] Follow-up questions work
- [ ] Favorites toggle works
- [ ] Next/Previous navigation works
- [ ] Timer countdown works (Part 2: prep 60s + speaking 120s)
- [ ] Mobile viewport looks correct (375px width)
- [ ] Telegram integration still sends recordings
- [ ] Score history is saved to localStorage
