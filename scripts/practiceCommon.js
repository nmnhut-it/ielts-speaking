/**
 * PracticeCommon - Shared practice logic for IELTS Speaking modules.
 * Consolidates duplicated recording, transcription, scoring, attempt tracking,
 * identification/approval, and utility functions from module2 and module3.
 */
const PracticeCommon = {

    // --- Utilities ---

    /** Convert base64 data URL to Blob */
    dataURLtoBlob(dataURL) {
        const parts = dataURL.split(',');
        const mimeMatch = parts[0].match(/:(.*?);/);
        const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
        const binary = atob(parts[1]);
        const array = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            array[i] = binary.charCodeAt(i);
        }
        return new Blob([array], { type: mime });
    },

    /** Fisher-Yates shuffle, returns new array */
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    /** Format milliseconds as m:ss */
    formatDuration(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    },

    // --- Attempt Tracking ---

    /** Get attempt count from localStorage */
    getAttemptCount(prefix, index) {
        return parseInt(
            localStorage.getItem(prefix + index) || '0', 10
        );
    },

    /** Increment attempt count, returns new count */
    incrementAttempt(prefix, index) {
        const count = this.getAttemptCount(prefix, index) + 1;
        localStorage.setItem(prefix + index, String(count));
        return count;
    },

    /**
     * Update or create the attempt badge element.
     * config: { badgeId, headerId, prefix, index }
     */
    updateAttemptBadge(config) {
        let badge = document.getElementById(config.badgeId);
        if (!badge) {
            const header = document.getElementById(config.headerId);
            if (!header) return;
            badge = document.createElement('span');
            badge.id = config.badgeId;
            badge.style.cssText =
                'margin-left:8px;font-size:0.75em;background:#6c757d;' +
                'color:#fff;padding:2px 8px;border-radius:10px;vertical-align:middle;';
            header.parentNode.insertBefore(badge, header.nextSibling);
        }
        const count = this.getAttemptCount(config.prefix, config.index);
        if (count > 0) {
            badge.textContent = 'Attempt #' + count;
            badge.style.display = 'inline';
        } else {
            badge.style.display = 'none';
        }
    },

    // --- Transcription ---

    /**
     * Display transcript result and trigger scoring.
     * config: {
     *   areaEl, textEl, wordcountEl,
     *   storagePrefix, index,
     *   onAfterDisplay(transcript, index) - module-specific post-actions
     * }
     */
    showTranscriptResult(transcript, config) {
        const area = document.getElementById(config.areaEl);
        const textDiv = document.getElementById(config.textEl);
        const wordsDiv = document.getElementById(config.wordcountEl);

        area.classList.remove('hidden');
        textDiv.textContent = transcript;
        const wc = transcript.split(/\s+/).filter(w => w).length;
        wordsDiv.textContent = wc + ' words';

        localStorage.setItem(
            config.storagePrefix + config.index, transcript
        );

        if (config.onAfterDisplay) {
            config.onAfterDisplay(transcript, config.index);
        }
    },

    /**
     * Get text from a textarea and pass to showTranscriptResult.
     * config: same as showTranscriptResult plus { textareaId, manualAreaEl }
     */
    submitManualAnswer(config) {
        const textarea = document.getElementById(config.textareaId);
        const transcript = (textarea.value || '').trim();
        if (!transcript) {
            alert('Please type your answer first.');
            return;
        }
        document.getElementById(config.manualAreaEl).classList.add('hidden');
        this.showTranscriptResult(transcript, config);
    },

    // --- Band Scoring ---

    /**
     * Run band scoring, render results, save to history.
     * config: {
     *   moduleId,            - e.g. 'module2' or 'module3'
     *   scoreDisplayEl,      - container element id
     *   attemptPrefix,       - e.g. 'm2_attempts_'
     *   transcriptPrefix,    - e.g. 'm2_last_transcript_'
     *   getQuestionId(index) - returns unique question/card id
     *   extraHTML            - optional extra HTML to append (e.g. history button)
     *   onAfterScore()       - optional callback after rendering (e.g. showScoreTrend)
     * }
     */
    runBandScoring(transcript, index, config) {
        if (!window.calculateBandScores) return;

        const scores = calculateBandScores(transcript);
        if (!scores || scores.overall === 0) return;

        let previousScores = null;
        if (window.scoreHistory) {
            const qId = config.getQuestionId(index);
            const prev = window.scoreHistory.getPreviousScore(
                config.moduleId, qId
            );
            if (prev && prev.scores) previousScores = prev.scores;
        }

        const attemptCount = this.getAttemptCount(
            config.attemptPrefix, index
        );
        let improvementHTML = '';
        if (attemptCount >= 2) {
            improvementHTML = this._buildImprovementHTML(
                transcript, config.transcriptPrefix, index
            );
        }

        const container = document.getElementById(config.scoreDisplayEl);
        if (!container) return;

        const extraHTML = config.extraHTML || '';
        container.innerHTML =
            '<h4 style="margin:0 0 12px;font-size:1em;">' +
            'IELTS Band Score Analysis</h4>' +
            renderScoreHTML(scores, previousScores) +
            improvementHTML + extraHTML;
        container.classList.remove('hidden');

        if (window.scoreHistory) {
            const qId = config.getQuestionId(index);
            window.scoreHistory.addScore({
                date: new Date().toISOString(),
                module: config.moduleId,
                questionId: qId,
                scores: {
                    overall: scores.overall,
                    fluency: scores.fluency,
                    vocab: scores.vocabulary,
                    grammar: scores.grammar,
                    pronunciation: scores.pronunciation
                },
                wordCount: scores.wordCount,
                duration: null
            });
        }

        if (config.onAfterScore) config.onAfterScore();
    },

    /** Build word-count improvement comparison HTML */
    _buildImprovementHTML(transcript, prefix, index) {
        const prevTranscript = localStorage.getItem(prefix + index);
        if (!prevTranscript) return '';

        const prevWC = prevTranscript.split(/\s+/).filter(w => w).length;
        const currWC = transcript.split(/\s+/).filter(w => w).length;
        let html =
            '<div style="margin-top:8px;padding:8px;background:#e8f5e9;' +
            'border-radius:6px;font-size:0.85em;">';
        html += 'Word count: <strong>' + prevWC +
            '</strong> -> <strong>' + currWC + '</strong>';
        if (currWC > prevWC) {
            html += ' <span style="color:#28a745;">(+' +
                (currWC - prevWC) + ')</span>';
        } else if (currWC < prevWC) {
            html += ' <span style="color:#dc3545;">(' +
                (currWC - prevWC) + ')</span>';
        }
        html += '</div>';
        return html;
    },

    // --- Try Again ---

    /**
     * Show a "Try Again" button inside a container element.
     * config: { btnId, containerEl, btnClass, onTryAgain }
     */
    showTryAgainButton(config) {
        if (document.getElementById(config.btnId)) return;

        const container = document.getElementById(config.containerEl);
        if (!container) return;

        const btn = document.createElement('button');
        btn.id = config.btnId;
        btn.textContent = 'Try Again';
        btn.className = config.btnClass || 'btn-recording-action';
        btn.style.cssText =
            'background:#28a745;color:#fff;font-weight:600;margin-top:8px;';
        btn.onclick = config.onTryAgain;
        container.appendChild(btn);
    },

    /**
     * Reset UI for a new attempt.
     * config: {
     *   prefix, index,
     *   resetElements: [{id, action}] - action: 'hide'|'show'|'remove'|'hideClass'|'showClass'
     *   scoreDisplayEl, tryAgainBtnId,
     *   onReset() - module-specific cleanup (e.g. clear blob ref)
     * }
     */
    tryAgain(config) {
        this.incrementAttempt(config.prefix, config.index);

        if (config.updateBadge) config.updateBadge();

        if (config.onReset) config.onReset();

        config.resetElements.forEach(el => {
            const dom = document.getElementById(el.id);
            if (!dom) return;
            switch (el.action) {
                case 'hideClass':
                    dom.classList.add('hidden');
                    break;
                case 'showClass':
                    dom.classList.remove('hidden');
                    break;
                case 'hide':
                    dom.style.display = 'none';
                    break;
                case 'show':
                    dom.style.display = '';
                    break;
                case 'remove':
                    dom.remove();
                    break;
            }
        });

        const scoreDisplay = document.getElementById(config.scoreDisplayEl);
        if (scoreDisplay) scoreDisplay.classList.add('hidden');

        const btn = document.getElementById(config.tryAgainBtnId);
        if (btn) btn.remove();
    },

    // --- Answer Comparison ---

    /**
     * Show side-by-side answer comparison.
     * config: {
     *   comparisonEl, yoursTextEl, sampleTextEl,
     *   yoursWordsEl, sampleWordsEl, sampleText
     * }
     */
    showAnswerComparison(transcript, config) {
        if (!config.sampleText) return;

        const compDiv = document.getElementById(config.comparisonEl);
        const yoursText = document.getElementById(config.yoursTextEl);
        const sampleText = document.getElementById(config.sampleTextEl);
        const yoursWords = document.getElementById(config.yoursWordsEl);
        const sampleWords = document.getElementById(config.sampleWordsEl);

        const yourWC = transcript.split(/\s+/).filter(w => w).length;
        const sampleWC = config.sampleText.split(/\s+/).filter(w => w).length;

        yoursText.textContent = transcript;
        sampleText.textContent = config.sampleText;
        yoursWords.textContent = yourWC + ' words';
        sampleWords.textContent = sampleWC + ' words';

        compDiv.classList.remove('hidden');
    },

    // --- Identification / Approval ---

    /** Show the identification modal */
    showIdentificationModal(modalId, overlayId) {
        const modal = document.getElementById(modalId || 'identificationModal');
        const overlay = document.getElementById(overlayId || 'identificationOverlay');
        if (modal) modal.classList.add('active');
        if (overlay) overlay.classList.add('active');
    },

    /** Hide the identification modal */
    hideIdentificationModal(modalId, overlayId) {
        const modal = document.getElementById(modalId || 'identificationModal');
        const overlay = document.getElementById(overlayId || 'identificationOverlay');
        if (modal) modal.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    },

    /** Show approval waiting spinner in modal body */
    showApprovalWaiting(modalSelector) {
        const sel = modalSelector || '#identificationModal .modal-body';
        const modalBody = document.querySelector(sel);
        if (!modalBody) return;
        modalBody.innerHTML =
            '<div class="approval-waiting">' +
            '<div class="approval-spinner"></div>' +
            '<h3>Waiting for teacher approval</h3>' +
            '<p class="approval-dots">Please wait' +
            '<span class="dots-anim">...</span></p>' +
            '<p class="approval-hint">Your teacher will review ' +
            'your session request.</p></div>';
    },

    /** Show rejection message in modal body */
    showApprovalRejected(modalSelector) {
        const sel = modalSelector || '#identificationModal .modal-body';
        const modalBody = document.querySelector(sel);
        if (!modalBody) return;
        modalBody.innerHTML =
            '<div class="approval-result">' +
            '<h3>Session Not Approved</h3>' +
            '<p>Your session was not approved. ' +
            'Please contact your teacher.</p>' +
            '<button class="btn-primary" ' +
            'onclick="retryIdentification()">Try Again</button></div>';
    },

    /** Show timeout message in modal body */
    showApprovalTimeout(modalSelector) {
        const sel = modalSelector || '#identificationModal .modal-body';
        const modalBody = document.querySelector(sel);
        if (!modalBody) return;
        modalBody.innerHTML =
            '<div class="approval-result">' +
            '<h3>Teacher Unavailable</h3>' +
            '<p>Please try again later.</p>' +
            '<button class="btn-primary" ' +
            'onclick="retryIdentification()">Try Again</button></div>';
    },

    /**
     * Send approval request via Telegram with inline keyboard.
     * config: { telegramSender, studentName, sessionId, moduleName, studentSession }
     */
    async sendApprovalRequest(config) {
        if (!config.telegramSender) return;
        const message =
            '<b>New Practice Session Request</b>\n\n' +
            '<b>Student:</b> ' + config.studentName + '\n' +
            '<b>Module:</b> ' + config.moduleName + '\n' +
            '<b>Time:</b> ' + new Date().toLocaleString() + '\n\n' +
            "Please approve or reject this student's practice session.";
        const keyboard = [[
            { text: 'Accept', callback_data: 'approve_' + config.sessionId },
            { text: 'Reject', callback_data: 'reject_' + config.sessionId }
        ]];
        const result = await config.telegramSender.sendMessageWithKeyboard(
            message, keyboard
        );
        config.studentSession.setTelegramMessageId(result.message_id);
    },

    /**
     * Poll for approval result.
     * config: { telegramSender, sessionId, onComplete(result) }
     */
    async startApprovalPolling(config) {
        if (!config.telegramSender) {
            config.onComplete({ approved: true });
            return;
        }
        try {
            const result = await config.telegramSender.pollForApproval(
                config.sessionId
            );
            config.onComplete(result);
        } catch (error) {
            console.error('Approval polling error:', error);
            PracticeCommon.showApprovalTimeout();
        }
    },

    /**
     * Send session start photo+caption to Telegram.
     * config: { telegramSender, studentName, photoDataUrl, moduleName }
     */
    async sendSessionStartToTelegram(config) {
        if (!config.telegramSender) return;
        try {
            const photoBlob = this.dataURLtoBlob(config.photoDataUrl);
            const caption =
                '<b>New Practice Session Started</b>\n\n' +
                '<b>Student:</b> ' + config.studentName + '\n' +
                '<b>Module:</b> ' + config.moduleName + '\n' +
                '<b>Time:</b> ' + new Date().toLocaleString();
            await config.telegramSender.sendPhoto(
                photoBlob, caption,
                config.studentName + '_session.jpg'
            );
        } catch (error) {
            console.error(
                'Failed to send session start to Telegram:', error
            );
        }
    },

    /** Clear session and reload page */
    retryIdentification(studentSession) {
        studentSession.clearSession();
        location.reload();
    },

    // --- Live STT helpers ---

    /**
     * Start live STT transcription.
     * config: { liveAreaEl, liveTextEl, manualAreaEl }
     * Returns the liveSTT handle or null.
     */
    startLiveSTT(config) {
        const liveArea = document.getElementById(config.liveAreaEl);
        const liveText = document.getElementById(config.liveTextEl);
        liveText.textContent = '';

        if (config.manualAreaEl) {
            document.getElementById(config.manualAreaEl)
                .classList.add('hidden');
        }

        try {
            liveArea.classList.remove('hidden');
            const handle = window.sttService.startLiveTranscription(
                (interim) => { liveText.textContent = interim; },
                (final) => { liveText.textContent = final; }
            );
            return handle;
        } catch (e) {
            console.warn('Live transcription not available:', e.message);
            liveArea.classList.add('hidden');
            return null;
        }
    },

    /**
     * Stop live STT and hide the area.
     * Returns the final transcript string.
     */
    stopLiveSTT(handle, liveAreaEl) {
        let transcript = '';
        if (handle) {
            transcript = handle.stop();
        }
        document.getElementById(liveAreaEl).classList.add('hidden');
        return transcript;
    },

    // --- Examiner Voice (browser speechSynthesis) ---

    /** Speak text as IELTS examiner (British English) */
    speakAsExaminer(text, onEnd) {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-GB';
        utterance.rate = 0.92;
        utterance.pitch = 1.0;
        if (onEnd) utterance.onend = onEnd;
        utterance.onerror = () => { if (onEnd) onEnd(); };
        speechSynthesis.speak(utterance);
    },

    /** Stop examiner speech */
    stopExaminer() {
        speechSynthesis.cancel();
    },

    /** Check if speechSynthesis is available */
    canSpeak() {
        return 'speechSynthesis' in window;
    },

    // --- Audio Cues ---

    /** Play a beep tone (frequency in Hz, duration in ms) */
    playBeep(freq, durationMs) {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.value = freq || 880;
            gain.gain.value = 0.3;
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            setTimeout(() => { osc.stop(); ctx.close(); }, durationMs || 200);
        } catch (e) { /* silent fail if AudioContext unavailable */ }
    },

    /** Play prep-end beep (higher pitch) */
    playPrepEndBeep() { this.playBeep(880, 300); },

    /** Play time-up chime (two tones) */
    playTimeUpChime() {
        this.playBeep(660, 150);
        setTimeout(() => this.playBeep(880, 300), 200);
    },

    // --- Score Badge ---

    /** Generate inline score badge HTML */
    scoreBadgeHTML(band) {
        const num = parseFloat(band) || 0;
        let cls = 'score-badge ';
        if (num >= 7) cls += 'band-high';
        else if (num >= 6) cls += 'band-mid';
        else cls += 'band-low';
        return `<span class="${cls}">Band ${num.toFixed(1)}</span>`;
    }
};

window.PracticeCommon = PracticeCommon;
