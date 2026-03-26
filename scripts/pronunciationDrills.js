/**
 * Pronunciation Drills - UI logic for word practice and minimal pairs quizzes.
 * Uses browser speechSynthesis for TTS and PracticeCommon patterns for STT.
 */

const PronunciationDrillsApp = {
    // --- State ---
    currentCategory: null,
    currentWordIndex: 0,
    isRecording: false,
    mediaRecorder: null,
    recognition: null,
    quizPairIndex: 0,
    quizCorrectWord: null,
    quizScore: { correct: 0, total: 0 },
    tipsOpen: false,

    // --- Constants ---
    STORAGE_PREFIX: 'pron_scores_',

    // --- Initialization ---

    init() {
        this.renderCategorySelector();
        this.initSpeechRecognition();
    },

    /** Set up Web Speech API recognition if available */
    initSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition
            || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return;
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'en-US';
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 3;
    },

    // --- Category Selector ---

    renderCategorySelector() {
        const main = document.getElementById('mainContent');
        const scores = this.loadAllScores();
        let html = '<div class="category-grid">';
        PRONUNCIATION_CATEGORY_ORDER.forEach(id => {
            const cat = PRONUNCIATION_DRILLS[id];
            const scoreData = scores[id];
            const scoreText = scoreData
                ? `${scoreData.correct}/${scoreData.total} correct`
                : '';
            html += this.buildCategoryCardHTML(id, cat, scoreText);
        });
        html += '</div>';
        main.innerHTML = html;
    },

    /** Build HTML for a single category card */
    buildCategoryCardHTML(id, cat, scoreText) {
        return `<div class="category-card" onclick="PronunciationDrillsApp.selectCategory('${id}')">
            <span class="category-card__icon">${cat.icon}</span>
            <div class="category-card__name">${cat.name}</div>
            <div class="category-card__desc">${cat.description}</div>
            ${scoreText ? `<div class="category-card__score">${scoreText}</div>` : ''}
        </div>`;
    },

    // --- Category Selection ---

    selectCategory(categoryId) {
        this.currentCategory = categoryId;
        this.currentWordIndex = 0;
        this.quizPairIndex = 0;
        this.quizScore = { correct: 0, total: 0 };
        this.tipsOpen = false;
        this.renderDrillView();
    },

    backToCategories() {
        this.currentCategory = null;
        this.stopRecordingIfActive();
        this.renderCategorySelector();
    },

    // --- Drill View ---

    renderDrillView() {
        const cat = PRONUNCIATION_DRILLS[this.currentCategory];
        const main = document.getElementById('mainContent');
        main.innerHTML = this.buildDrillViewHTML(cat);
        this.loadWord(this.currentWordIndex);
        this.loadQuizPair();
    },

    buildDrillViewHTML(cat) {
        return `
            <div class="category-header">
                <button class="btn-back-categories" onclick="PronunciationDrillsApp.backToCategories()">
                    ← All Categories
                </button>
                <h2>${cat.icon} ${cat.name}</h2>
            </div>

            <div class="tips-section">
                <button class="tips-toggle" onclick="PronunciationDrillsApp.toggleTips()">
                    <span>Pronunciation Tips</span>
                    <span class="tips-toggle__arrow" id="tipsArrow">▼</span>
                </button>
                <div class="tips-content" id="tipsContent">${cat.tips}</div>
            </div>

            <div class="word-card" id="wordCard">
                <div class="word-card__sound-tag" id="soundTag"></div>
                <div class="word-card__word" id="wordDisplay"></div>
                <div class="word-card__ipa" id="ipaDisplay"></div>
                <button class="btn-play-word" onclick="PronunciationDrillsApp.playCurrentWord()" title="Listen">
                    🔊
                </button>
            </div>

            <div class="record-section">
                <div class="record-section__label">Your turn — record yourself</div>
                <button class="btn-record" id="recordBtn"
                    onclick="PronunciationDrillsApp.toggleRecording()">🎤</button>
                <div class="record-section__stt" id="sttSection">
                    <div class="stt-label">Speech recognition heard:</div>
                    <div class="stt-result" id="sttResult"></div>
                    <div class="result-indicator" id="resultIndicator">
                        <span class="result-indicator__icon" id="resultIcon"></span>
                        <span id="resultText"></span>
                    </div>
                    <div class="self-assess hidden" id="selfAssess">
                        Did it sound right to you? Trust your ear — STT is not perfect.
                    </div>
                </div>
            </div>

            <div class="word-nav">
                <button class="btn-nav" id="btnPrev"
                    onclick="PronunciationDrillsApp.prevWord()">← Prev</button>
                <span class="word-counter" id="wordCounter"></span>
                <button class="btn-nav" id="btnNext"
                    onclick="PronunciationDrillsApp.nextWord()">Next →</button>
            </div>

            <div class="quiz-section">
                <div class="quiz-section__title">Minimal Pairs Quiz</div>
                <div class="quiz-section__subtitle">Listen and pick the word you hear</div>
                <button class="quiz-play-btn" id="quizPlayBtn"
                    onclick="PronunciationDrillsApp.playQuizWord()">
                    🔊 Play Sound
                </button>
                <div class="quiz-choices" id="quizChoices"></div>
                <button class="quiz-next-pair" id="quizNextBtn"
                    onclick="PronunciationDrillsApp.nextQuizPair()">
                    Next Pair →
                </button>
                <div class="quiz-score" id="quizScoreDisplay"></div>
            </div>`;
    },

    // --- Word Display ---

    loadWord(index) {
        const cat = PRONUNCIATION_DRILLS[this.currentCategory];
        const words = cat.practiceWords;
        const word = words[index];

        document.getElementById('soundTag').textContent = word.sound;
        document.getElementById('wordDisplay').textContent = word.word;
        document.getElementById('ipaDisplay').textContent = word.ipa;
        document.getElementById('wordCounter').textContent =
            `${index + 1}/${words.length}`;

        document.getElementById('btnPrev').disabled = index === 0;
        document.getElementById('btnNext').disabled =
            index === words.length - 1;

        this.resetRecordingUI();
    },

    nextWord() {
        const max = PRONUNCIATION_DRILLS[this.currentCategory]
            .practiceWords.length - 1;
        if (this.currentWordIndex < max) {
            this.currentWordIndex++;
            this.loadWord(this.currentWordIndex);
        }
    },

    prevWord() {
        if (this.currentWordIndex > 0) {
            this.currentWordIndex--;
            this.loadWord(this.currentWordIndex);
        }
    },

    // --- TTS ---

    playCurrentWord() {
        const word = PRONUNCIATION_DRILLS[this.currentCategory]
            .practiceWords[this.currentWordIndex].word;
        this.playWord(word);
    },

    playWord(word) {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-GB';
        utterance.rate = 0.85;
        utterance.pitch = 1.0;
        speechSynthesis.speak(utterance);
    },

    // --- Recording & STT ---

    toggleRecording() {
        if (this.isRecording) {
            this.stopRecording();
        } else {
            this.startRecording();
        }
    },

    startRecording() {
        if (!this.recognition) {
            alert('Speech recognition is not supported in this browser.');
            return;
        }
        this.isRecording = true;
        const btn = document.getElementById('recordBtn');
        btn.classList.add('recording');
        btn.textContent = '⏹';

        this.recognition.onresult = (event) => {
            const heard = event.results[0][0].transcript;
            this.onSTTResult(heard);
        };
        this.recognition.onerror = () => {
            this.stopRecordingUI();
        };
        this.recognition.onend = () => {
            this.stopRecordingUI();
        };
        this.recognition.start();
    },

    stopRecording() {
        if (this.recognition) {
            this.recognition.stop();
        }
        this.stopRecordingUI();
    },

    stopRecordingIfActive() {
        if (this.isRecording) {
            this.stopRecording();
        }
    },

    stopRecordingUI() {
        this.isRecording = false;
        const btn = document.getElementById('recordBtn');
        if (btn) {
            btn.classList.remove('recording');
            btn.textContent = '🎤';
        }
    },

    resetRecordingUI() {
        this.stopRecordingIfActive();
        const sttSection = document.getElementById('sttSection');
        const indicator = document.getElementById('resultIndicator');
        const selfAssess = document.getElementById('selfAssess');
        if (sttSection) sttSection.classList.remove('visible');
        if (indicator) indicator.classList.remove('visible', 'match', 'mismatch');
        if (selfAssess) selfAssess.classList.add('hidden');
    },

    onSTTResult(heard) {
        const sttSection = document.getElementById('sttSection');
        const sttResult = document.getElementById('sttResult');
        sttSection.classList.add('visible');
        sttResult.textContent = heard;

        const expected = PRONUNCIATION_DRILLS[this.currentCategory]
            .practiceWords[this.currentWordIndex].word;
        this.checkResult(expected, heard);
    },

    /** Compare STT output to target word (case-insensitive, trimmed) */
    checkResult(expected, heard) {
        const normalize = (s) => s.toLowerCase().trim()
            .replace(/[.,!?]/g, '');
        const isMatch = normalize(heard).includes(normalize(expected))
            || normalize(expected).includes(normalize(heard));

        const indicator = document.getElementById('resultIndicator');
        const icon = document.getElementById('resultIcon');
        const text = document.getElementById('resultText');
        const selfAssess = document.getElementById('selfAssess');

        indicator.classList.add('visible');
        indicator.classList.remove('match', 'mismatch');

        if (isMatch) {
            indicator.classList.add('match');
            icon.textContent = '✓';
            text.textContent = 'Match! Well done.';
            selfAssess.classList.add('hidden');
            this.incrementScore(true);
        } else {
            indicator.classList.add('mismatch');
            icon.textContent = '~';
            text.textContent = `Expected "${expected}" — heard "${heard}"`;
            selfAssess.classList.remove('hidden');
            this.incrementScore(false);
        }
    },

    // --- Minimal Pairs Quiz ---

    loadQuizPair() {
        const cat = PRONUNCIATION_DRILLS[this.currentCategory];
        const pairs = cat.minimalPairs;
        if (this.quizPairIndex >= pairs.length) {
            this.quizPairIndex = 0;
        }
        const pair = pairs[this.quizPairIndex];

        // Randomly pick which word to play
        const playFirst = Math.random() < 0.5;
        this.quizCorrectWord = playFirst ? pair.word1 : pair.word2;

        const choicesDiv = document.getElementById('quizChoices');
        choicesDiv.innerHTML = `
            <button class="quiz-choice" data-word="${pair.word1}"
                onclick="PronunciationDrillsApp.pickQuizAnswer('${pair.word1}')">
                <div class="quiz-choice__word">${pair.word1}</div>
                <div class="quiz-choice__ipa">${pair.ipa1}</div>
            </button>
            <button class="quiz-choice" data-word="${pair.word2}"
                onclick="PronunciationDrillsApp.pickQuizAnswer('${pair.word2}')">
                <div class="quiz-choice__word">${pair.word2}</div>
                <div class="quiz-choice__ipa">${pair.ipa2}</div>
            </button>`;

        document.getElementById('quizNextBtn').classList.remove('visible');
        this.updateQuizScoreDisplay();
    },

    playQuizWord() {
        if (!this.quizCorrectWord) return;
        this.playWord(this.quizCorrectWord);
    },

    pickQuizAnswer(chosen) {
        const buttons = document.querySelectorAll('.quiz-choice');
        buttons.forEach(btn => {
            btn.disabled = true;
            const word = btn.dataset.word;
            if (word === this.quizCorrectWord) {
                btn.classList.add('correct');
            } else if (word === chosen && chosen !== this.quizCorrectWord) {
                btn.classList.add('incorrect');
            }
        });

        this.quizScore.total++;
        if (chosen === this.quizCorrectWord) {
            this.quizScore.correct++;
        }
        this.updateQuizScoreDisplay();
        document.getElementById('quizNextBtn').classList.add('visible');
    },

    nextQuizPair() {
        this.quizPairIndex++;
        this.loadQuizPair();
    },

    updateQuizScoreDisplay() {
        const el = document.getElementById('quizScoreDisplay');
        if (this.quizScore.total > 0) {
            el.textContent =
                `Quiz: ${this.quizScore.correct}/${this.quizScore.total}`;
        } else {
            el.textContent = '';
        }
    },

    // --- Tips Toggle ---

    toggleTips() {
        this.tipsOpen = !this.tipsOpen;
        const content = document.getElementById('tipsContent');
        const arrow = document.getElementById('tipsArrow');
        content.classList.toggle('open', this.tipsOpen);
        arrow.classList.toggle('open', this.tipsOpen);
    },

    // --- Score Tracking (localStorage) ---

    incrementScore(correct) {
        const key = this.STORAGE_PREFIX + this.currentCategory;
        const data = JSON.parse(localStorage.getItem(key) || '{"correct":0,"total":0}');
        data.total++;
        if (correct) data.correct++;
        localStorage.setItem(key, JSON.stringify(data));
    },

    loadAllScores() {
        const scores = {};
        PRONUNCIATION_CATEGORY_ORDER.forEach(id => {
            const raw = localStorage.getItem(this.STORAGE_PREFIX + id);
            if (raw) {
                scores[id] = JSON.parse(raw);
            }
        });
        return scores;
    }
};

// --- Boot ---
document.addEventListener('DOMContentLoaded', () => {
    PronunciationDrillsApp.init();
});
