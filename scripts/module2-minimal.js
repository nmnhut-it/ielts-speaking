/**
 * Module 2 Minimal Practice Interface
 * Clean, focused implementation with essential features only
 */

// Template examples for each technique
const TEMPLATE_EXAMPLES = {
    '5w1h': `<strong>5W1H Method - 4 Template Variations:</strong><br><br>
<strong>Template 1 - Simple & Direct:</strong><br>
I [enjoy/like/love] [WHAT]. Usually, I do this [WHEN] [WHERE] [WHO]. The reason is [WHY]. This makes me feel [HOW].<br><br>
<strong>Template 2 - Time-First:</strong><br>
In [WHEN], I [enjoy/like] [WHAT]. I usually do it [WHERE] [WHO]. I like this activity because [WHY], and it makes me [HOW].<br><br>
<strong>Template 3 - What-Why Focus:</strong><br>
I really [like/enjoy] [WHAT]. [WHY] is the main reason. I usually do it [WHEN] [WHERE] [WHO]. It always makes me feel [HOW].<br><br>
<strong>Template 4 - Feeling-Emphasis:</strong><br>
[WHAT] makes me feel [HOW]. That's why I do it [WHEN]. I usually do it [WHERE] [WHO], and [WHY].<br><br>
<em style="color: #666;">💡 Tip: The system randomly picks one template variation to keep your answers natural!</em>`,

    'prep': `<strong>PREP Method Template:</strong><br><br>
<strong>Point:</strong> [State your main answer/opinion]<br>
<strong>Reason:</strong> The reason is... / This is because...<br>
<strong>Example:</strong> For example, / For instance, / Like...<br>
<strong>Point:</strong> [Restate your main point]<br><br>
<em style="color: #666;">Example: "Yes, I enjoy reading. The reason is it helps me relax. For example, last night I read for an hour before bed. So that's why I really enjoy reading."</em>`,

    'past_present': `<strong>Past vs Present Template:</strong><br><br>
<strong>Past:</strong> In the past, / When I was younger, / Previously, / Back then...<br>
<strong>Present:</strong> But now, / These days, / Currently, / Nowadays...<br>
<strong>Reason:</strong> This changed because... / The difference is...<br><br>
<em style="color: #666;">Example: "In the past, I didn't like cooking. But now, I cook almost every day because I discovered it's actually relaxing."</em>`,

    'personal_general': `<strong>Personal + General Template:</strong><br><br>
<strong>Personal:</strong> Personally, I... / As for me, / In my case...<br>
<strong>General:</strong> But in general, people in [country] / Most people / Many people...<br>
<strong>Reason:</strong> This is because... / The reason is...<br><br>
<em style="color: #666;">Example: "Personally, I prefer coffee. But in general, people in my country drink tea more because it's part of our culture."</em>`,

    'contrast': `<strong>Contrast Technique Template:</strong><br><br>
<strong>Side A:</strong> On one hand, / Some people think... / One advantage is...<br>
<strong>Side B:</strong> On the other hand, / However, / But...<br>
<strong>Opinion:</strong> Personally, I think... / In my view...<br><br>
<em style="color: #666;">Example: "On one hand, studying alone helps you focus. On the other hand, group study lets you learn from others. Personally, I prefer a mix of both."</em>`,

    'feelings': `<strong>Feelings + Reasons Template:</strong><br><br>
<strong>Feeling:</strong> I feel [emotion] when... / It makes me feel...<br>
<strong>Reason:</strong> Because / The reason is / This is because...<br>
<strong>Example:</strong> For instance, / Like when...<br><br>
<em style="color: #666;">Example: "I feel really happy when I exercise because it releases endorphins. For instance, yesterday after jogging, I felt energized all day."</em>`,

    'frequency': `<strong>Frequency + Details Template:</strong><br><br>
<strong>Frequency:</strong> Always / Usually / Often / Sometimes / Rarely / Never<br>
<strong>When:</strong> [specific times or situations]<br>
<strong>Details:</strong> [add specifics about how/what/why]<br><br>
<em style="color: #666;">Example: "I usually go to the gym three times a week, typically in the evening after work because it's less crowded and helps me unwind."</em>`
};

// State
let currentTechnique = '5w1h';
let currentMode = 'sequential';
let currentIndex = 0;
let allQuestions = [];
let favorites = new Set();
let completed = new Set();
let sampleExpanded = false;
let templateExpanded = false;

// Interview state machine: ready, speaking, answered, review
let interviewState = 'ready';
let followUpAnswered = false;
let mainTranscript = '';
let followUpTranscript = '';
let mainRecording = null;
let interviewTimer = null;
let interviewSeconds = 0;
const INTERVIEW_MAX_SECONDS = 30;
const TIMER_CIRCUMFERENCE = 339.3;

// Audio recording state
let audioRecorder = null;
let recordingTimer = null;
let currentRecording = null;
let telegramSender = null;

// Student identification state
let studentSession = null;
let identificationCamera = null;
let capturedPhotoData = null;

// TTS state
let currentSampleText = null;
let isTTSPlaying = false;
let ttsInitialized = false;

// Storage keys
const STORAGE_KEY = 'module2_minimal_progress';
const FAVORITES_KEY = 'module2_minimal_favorites';

// Initialize
document.addEventListener('DOMContentLoaded', init);

function init() {
    // Wait for IELTS_LESSONS to load
    if (!window.IELTS_LESSONS?.module2) {
        setTimeout(init, 100);
        return;
    }

    // Force cleanup any stale overlays/modals from previous sessions
    cleanupStaleModals();

    // Initialize studentSession
    studentSession = new StudentSession();
    initializeAudioRecording();
    setupTTSProgressIndicator();

    // Check if student has active session
    const hasSession = studentSession.hasActiveSession();
    const hasPending = studentSession.hasPendingSession();
    console.log('Student has active session:', hasSession, 'pending:', hasPending);

    if (hasSession) {
        // Student is authenticated and approved
        console.log('Hiding identification modal - student authenticated');
        hideIdentificationModal();
        displayStudentInfo();
        loadProgress();
        loadQuestions();
        checkURLParameters();
        setupEventListeners();
        renderCurrentQuestion();
    } else if (hasPending) {
        // Session exists but pending approval, resume polling
        console.log('Resuming approval polling for pending session');
        showIdentificationModal();
        const session = studentSession.getSession();
        showApprovalWaiting();
        startApprovalPolling(session.sessionId);
    } else {
        // No active session, show modal and setup listeners
        console.log('Showing identification modal - no active session');
        showIdentificationModal();
        setupIdentificationListeners();
    }
}

function setupTTSProgressIndicator() {
    const ttsStatusGlobal = document.getElementById('ttsStatusGlobal');
    const ttsStatusMessage = document.querySelector('.tts-status-message');
    const ttsProgressFill = document.querySelector('.tts-progress-fill');

    if (window.ttsService) {
        window.ttsService.onProgress((message, progress) => {
            if (ttsStatusGlobal) {
                ttsStatusGlobal.classList.remove('hidden');
            }

            if (ttsStatusMessage) {
                ttsStatusMessage.textContent = message;
            }

            if (ttsProgressFill) {
                ttsProgressFill.style.width = `${progress * 100}%`;
            }

            if (progress >= 1) {
                setTimeout(() => {
                    if (ttsStatusGlobal) {
                        ttsStatusGlobal.classList.add('hidden');
                    }
                }, 2000);
            }
        });
    }
}

function checkURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const questionParam = urlParams.get('q') || urlParams.get('question');

    if (questionParam) {
        const questionNum = parseInt(questionParam);
        if (!isNaN(questionNum) && questionNum >= 1 && questionNum <= allQuestions.length) {
            currentIndex = questionNum - 1;
        }
    }
}

function updateURLParameter(questionNum) {
    const url = new URL(window.location);
    url.searchParams.set('q', questionNum);
    window.history.replaceState({}, '', url);
}

function cleanupStaleModals() {
    // Remove active class from any stale overlays/modals
    const identOverlay = document.getElementById('identificationOverlay');
    const identModal = document.getElementById('identificationModal');

    if (identOverlay) identOverlay.classList.remove('active');
    if (identModal) identModal.classList.remove('active');

    console.log('Cleaned up stale modal states');
}

function initializeAudioRecording() {
    if (typeof botToken !== 'undefined' && typeof groupId !== 'undefined' && botToken && groupId) {
        telegramSender = new TelegramSender(botToken, groupId);
    } else {
        console.warn('Telegram credentials not found');
    }
    if (!botToken || !groupId) {
        setTimeout(() => {
            document.querySelectorAll('[onclick*="Telegram"]').forEach(el => el.style.display = 'none');
            const sendBtns = document.querySelectorAll('.btn-telegram, #sendTelegramBtn');
            sendBtns.forEach(el => el.style.display = 'none');
        }, 100);
    }
}

function showIdentificationModal() {
    PracticeCommon.showIdentificationModal();
    const mainContainer = document.getElementById('mainContainer');
    if (mainContainer) mainContainer.classList.add('hidden');
}

function hideIdentificationModal() {
    PracticeCommon.hideIdentificationModal();
    const mainContainer = document.getElementById('mainContainer');
    if (mainContainer) mainContainer.classList.remove('hidden');
}

function displayStudentInfo() {
    const session = studentSession.getSession();
    if (session) {
        const nameDisplay = document.getElementById('studentNameDisplay');
        nameDisplay.textContent = session.name;
        nameDisplay.style.display = 'inline';
    }
}

// Load questions for current technique
function loadQuestions() {
    allQuestions = getQuestionsForTechnique(currentTechnique);

    if (!allQuestions || allQuestions.length === 0) {
        console.error('No questions found for technique:', currentTechnique);
        return;
    }

    // Apply mode filter
    if (currentMode === 'random') {
        allQuestions = shuffleArray([...allQuestions]);
    } else if (currentMode === 'favorites') {
        allQuestions = allQuestions.filter((q, i) => favorites.has(getQuestionId(q, i)));
    }

    updateProgress();
}

// Event listeners
function setupEventListeners() {
    // Mode buttons
    document.querySelectorAll('.btn-mode').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.btn-mode').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentMode = e.target.dataset.mode;
            currentIndex = 0;
            loadQuestions();
            renderCurrentQuestion();
        });
    });

    // Technique selector
    const techniqueSelect = document.getElementById('techniqueSelect');
    if (techniqueSelect) {
        techniqueSelect.addEventListener('change', (e) => {
            currentTechnique = e.target.value;
            currentIndex = 0;
            loadQuestions();
            renderForm();
            renderCurrentQuestion();

            // Update template if it's expanded
            if (templateExpanded) {
                updateTemplateDisplay();
            }
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.key === 'ArrowLeft' || e.key === 'p') previousQuestion();
        if (e.key === 'ArrowRight' || e.key === 'n') nextQuestion();
        if (e.key === 's') toggleSample();
        if (e.key === 'f') scoreMyAnswer();
    });

    // Quick jump input enter key
    const quickJumpInput = document.getElementById('quickJumpInput');
    if (quickJumpInput) {
        quickJumpInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') quickJumpToQuestion();
        });
    }
}

// Render current question
function renderCurrentQuestion() {
    if (!allQuestions || allQuestions.length === 0) return;

    // Stop any playing TTS audio when switching questions
    if (isTTSPlaying) {
        stopSampleAudio();
    }

    // Stop any active recording/timer
    if (interviewState === 'speaking') {
        forceStopSpeaking();
    }

    const question = allQuestions[currentIndex];
    const questionText = typeof question === 'string' ? question : question.question;
    const category = typeof question === 'object' && question.category
        ? question.category
        : getCategoryFromIndex(currentIndex);

    // Update interview card
    document.getElementById('questionNum').textContent = `Question ${currentIndex + 1}`;
    document.getElementById('questionText').textContent = questionText;
    document.getElementById('questionCategory').textContent = category;

    // Update favorite button
    const favBtn = document.getElementById('favBtn');
    const questionId = getQuestionId(question, currentIndex);
    favBtn.textContent = favorites.has(questionId) ? '★' : '☆';
    favBtn.classList.toggle('active', favorites.has(questionId));

    // Reset interview state
    resetInterviewUI();

    // Render plan fields (collapsible)
    renderPlanFields();

    // Handle sample answers
    const sampleDetail = document.getElementById('sampleSection');
    if (typeof question === 'object' && question.sampleAnswer) {
        sampleDetail.style.display = 'block';
        renderSampleAnswers(question);
    } else {
        sampleDetail.style.display = 'none';
    }

    // Update tip content
    updateTipContent(category);

    // Update vocabulary detail section
    updateVocabularySection();

    // Hide feedback
    document.getElementById('feedbackSection').style.display = 'none';

    // Reset scoring display
    const scoreDisplay = document.getElementById('m2ScoreDisplay');
    if (scoreDisplay) scoreDisplay.classList.add('hidden');

    // Reset M2 transcription
    document.getElementById('m2Transcription').classList.add('hidden');

    // Remove Try Again button if present
    const tryBtn = document.getElementById('m2TryAgainBtn');
    if (tryBtn) tryBtn.remove();

    // Show attempt badge
    updateM2AttemptBadge(currentIndex);

    updateProgress();
    updateURLParameter(currentIndex + 1);

    // Auto-read question if enabled
    if (document.getElementById('autoVoice')?.checked) {
        examinerAskQuestion();
    }
}

/** Reset interview UI to ready state */
function resetInterviewUI() {
    interviewState = 'ready';
    followUpAnswered = false;

    // Reset all dynamic zones
    mainTranscript = '';
    followUpTranscript = '';
    mainRecording = null;
    const autoFeedback = document.getElementById('autoFeedback');
    if (autoFeedback) autoFeedback.style.display = 'none';
    const followupFeedback = document.getElementById('followupFeedback');
    if (followupFeedback) followupFeedback.style.display = 'none';
    document.getElementById('transcriptZone').style.display = 'none';
    document.getElementById('followupZone').style.display = 'none';
    document.getElementById('audioPreview').style.display = 'none';
    document.getElementById('mainAudioPreview').style.display = 'none';
    document.getElementById('followupAudioPreview').style.display = 'none';
    document.getElementById('mainAnswerSummary').style.display = 'none';
    document.getElementById('reviewPanel').style.display = 'none';
    document.getElementById('reviewAnswers').innerHTML = '';
    document.getElementById('reviewScore').innerHTML = '';
    document.getElementById('reviewFeedback').innerHTML = '';

    // Reset action button
    const actionBtn = document.getElementById('actionBtn');
    actionBtn.className = 'btn-action btn-speak';
    actionBtn.textContent = '🎤 Speak Now';

    // Reset transcript
    document.getElementById('liveTranscriptText').textContent =
        'Your words will appear here as you speak...';
    document.getElementById('wordCount').textContent = '0 words';
    document.getElementById('scoreBadge').textContent = '';

    // Reset timer ring
    const progress = document.getElementById('timerProgress');
    if (progress) {
        progress.style.strokeDashoffset = '0';
        progress.style.stroke = '#2563eb';
    }
    document.getElementById('timerValue').textContent = '0:30';
    document.getElementById('timerLabel').textContent = 'Ready';
}

/** Update tip content from category tips */
function updateTipContent(category) {
    const tipContent = document.getElementById('tipContent');
    if (!tipContent) return;
    const tip = CATEGORY_TIPS[category];
    tipContent.textContent = tip || 'Focus on giving a clear, direct answer with one example.';
}

/** Render plan fields into the collapsible plan section */
function renderPlanFields() {
    const config = TECHNIQUE_CONFIG[currentTechnique];
    if (!config) return;

    const container = document.getElementById('planFields');
    if (!container) return;
    container.innerHTML = '';

    config.fields.forEach(field => {
        const fieldDiv = document.createElement('div');
        fieldDiv.className = 'form-field';
        fieldDiv.style.marginBottom = '8px';

        const label = document.createElement('label');
        label.className = 'field-label';
        label.textContent = `${field.icon} ${field.label}`;
        label.htmlFor = `input-${field.id}`;

        const input = document.createElement('input');
        input.type = 'text';
        input.id = `input-${field.id}`;
        input.className = 'field-input';
        input.placeholder = field.placeholder;
        input.addEventListener('input', updatePreview);

        fieldDiv.appendChild(label);
        fieldDiv.appendChild(input);
        container.appendChild(fieldDiv);
    });

    updatePreview();
}

// Render form fields
function renderForm() {
    const config = TECHNIQUE_CONFIG[currentTechnique];
    if (!config) return;

    // formContainer removed in interview redesign; use planFields instead
    const container = document.getElementById('formContainer')
        || document.getElementById('planFields');
    if (!container) return;
    container.innerHTML = '';

    config.fields.forEach(field => {
        const fieldDiv = document.createElement('div');
        fieldDiv.className = 'form-field';

        const label = document.createElement('label');
        label.className = 'field-label';
        label.textContent = `${field.icon} ${field.label}`;
        label.htmlFor = `input-${field.id}`;

        const input = document.createElement('input');
        input.type = 'text';
        input.id = `input-${field.id}`;
        input.className = 'field-input';
        input.placeholder = field.placeholder;
        input.addEventListener('input', updatePreview);

        fieldDiv.appendChild(label);
        fieldDiv.appendChild(input);
        container.appendChild(fieldDiv);
    });

    updatePreview();
}

// Update live preview
function updatePreview() {
    const config = TECHNIQUE_CONFIG[currentTechnique];
    if (!config) return;

    const values = {};
    let filledCount = 0;

    config.fields.forEach(field => {
        const input = document.getElementById(`input-${field.id}`);
        if (input) {
            const value = input.value.trim();
            values[field.id] = value;
            if (value) filledCount++;
        }
    });

    // Generate answer based on technique
    const answer = generateAnswer(values, currentTechnique);
    const wordCount = answer ? answer.split(/\s+/).length : 0;

    // Update preview
    const previewBox = document.getElementById('previewBox');
    if (answer) {
        previewBox.textContent = answer;
        previewBox.style.fontStyle = 'normal';
    } else {
        previewBox.innerHTML = '<em>Start typing to see your answer...</em>';
    }

    // Update meta
    document.getElementById('elementCount').textContent = `${filledCount}/${config.fields.length} elements`;
    document.getElementById('wordCount').textContent = `${wordCount} words`;

    // Show breakdown for all techniques
    if (filledCount > 0) {
        updateBreakdownDisplay(values, filledCount, config);
    } else {
        document.getElementById('previewBreakdown').style.display = 'none';
    }
}

// Update breakdown display for all techniques
function updateBreakdownDisplay(values, filledCount, config) {
    const breakdownDiv = document.getElementById('previewBreakdown');
    const contentDiv = document.getElementById('breakdownContent');

    if (filledCount === 0) {
        breakdownDiv.style.display = 'none';
        return;
    }

    breakdownDiv.style.display = 'block';

    let html = '';

    config.fields.forEach(field => {
        const value = values[field.id];
        const colorClass = field.id.replace(/_/g, '-'); // Convert field id to CSS class name

        if (value) {
            html += `<div class="preview-breakdown-item">
                <span class="technique-tag ${colorClass}">${field.icon} ${field.label.split('(')[0].trim()}</span>
                <span>${value}</span>
            </div>`;
        } else {
            html += `<div class="preview-breakdown-item element-missing">
                <span class="technique-tag ${colorClass}">${field.icon} ${field.label.split('(')[0].trim()}</span>
                <span>(not filled yet)</span>
            </div>`;
        }
    });

    contentDiv.innerHTML = html;
}

// Generate answer from values
function generateAnswer(values, technique) {
    if (technique === '5w1h') {
        return generate5W1HAnswer(values);
    }

    // Generic: just join non-empty values
    return Object.values(values).filter(v => v).join(' ');
}

// Constants for template variety
const STARTERS = ['I really like', 'I enjoy', 'I love', 'I like to', 'I really enjoy'];
const TIME_CONNECTORS = ['usually', 'normally', 'typically', 'generally'];
const REASON_STARTERS = ['The reason is', 'This is because', 'I do this because'];
const FEELING_STARTERS = ['This makes me feel', 'It makes me feel', 'I feel', 'And I feel'];

function randomPick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Generate 5W1H answer with template variations
function generate5W1HAnswer(v) {
    if (!v.what && !v.when && !v.where && !v.who && !v.why && !v.how) return '';

    const templateType = Math.floor(Math.random() * 4);

    switch (templateType) {
        case 0:
            return generateTemplate1(v);
        case 1:
            return generateTemplate2(v);
        case 2:
            return generateTemplate3(v);
        case 3:
            return generateTemplate4(v);
        default:
            return generateTemplate1(v);
    }
}

// Template 1: Simple & Direct
function generateTemplate1(v) {
    let answer = '';

    if (v.what) {
        answer = `${randomPick(STARTERS)} ${v.what}`;
    }

    if (v.when) {
        const connector = randomPick(TIME_CONNECTORS);
        const timePrefix = v.when.startsWith('in ') || v.when.startsWith('on ') ? '' : 'in ';
        answer += `. ${connector.charAt(0).toUpperCase() + connector.slice(1)}, I do this ${timePrefix}${v.when}`;
    }

    if (v.where || v.who) {
        if (v.where) {
            const wherePrefix = v.where.startsWith('at ') || v.where.startsWith('in ') ? '' : 'at ';
            answer += ` ${wherePrefix}${v.where}`;
        }
        if (v.who) {
            const whoPrefix = v.who.startsWith('with ') || v.who.startsWith('alone') ? '' : 'with ';
            answer += ` ${whoPrefix}${v.who}`;
        }
        answer += '.';
    } else if (answer) {
        answer += '.';
    }

    if (v.why) {
        const reasonStarter = randomPick(REASON_STARTERS);
        const whyText = v.why.startsWith('it ') || v.why.startsWith('I ') ? v.why : `it ${v.why}`;
        answer += ` ${reasonStarter} ${whyText}.`;
    }

    if (v.how) {
        const feelingStarter = randomPick(FEELING_STARTERS);
        answer += ` ${feelingStarter} ${v.how}.`;
    }

    return answer;
}

// Template 2: Time-First
function generateTemplate2(v) {
    let answer = '';

    if (v.when && v.what) {
        const timePrefix = v.when.startsWith('In ') || v.when.startsWith('On ') ? '' : 'In ';
        answer = `${timePrefix}${v.when}, I ${randomPick(['enjoy', 'like', 'love'])} ${v.what}`;
    } else if (v.what) {
        answer = `${randomPick(STARTERS)} ${v.what}`;
    }

    if (v.where || v.who) {
        answer += '. I usually do it';
        if (v.where) {
            const wherePrefix = v.where.startsWith('at ') || v.where.startsWith('in ') ? '' : 'at ';
            answer += ` ${wherePrefix}${v.where}`;
        }
        if (v.who) {
            const whoPrefix = v.who.startsWith('with ') || v.who.startsWith('alone') ? '' : 'with ';
            answer += ` ${whoPrefix}${v.who}`;
        }
        answer += '.';
    } else if (answer) {
        answer += '.';
    }

    if (v.why) {
        const whyText = v.why.startsWith('it ') || v.why.startsWith('I ') ? v.why : `it ${v.why}`;
        answer += ` I like this activity because ${whyText}`;
    }

    if (v.how) {
        answer += `, and it makes me ${v.how}.`;
    } else if (v.why) {
        answer += '.';
    }

    return answer;
}

// Template 3: What-Why Focus
function generateTemplate3(v) {
    let answer = '';

    if (v.what) {
        answer = `I really ${randomPick(['like', 'enjoy', 'love'])} ${v.what}`;
    }

    if (v.why) {
        const whyText = v.why.startsWith('it ') || v.why.startsWith('It ') ? v.why : `It ${v.why}`;
        answer += `. ${whyText} is the main reason`;
    }

    if (v.when || v.where || v.who) {
        answer += `. I usually do it`;
        if (v.when) {
            const timePrefix = v.when.startsWith('in ') || v.when.startsWith('on ') ? '' : 'in ';
            answer += ` ${timePrefix}${v.when}`;
        }
        if (v.where) {
            const wherePrefix = v.where.startsWith('at ') || v.where.startsWith('in ') ? '' : 'at ';
            answer += ` ${wherePrefix}${v.where}`;
        }
        if (v.who) {
            answer += `, ${v.who.startsWith('with ') || v.who.startsWith('alone') ? v.who : 'with ' + v.who}`;
        }
        answer += '.';
    } else if (answer) {
        answer += '.';
    }

    if (v.how) {
        answer += ` It always makes me feel ${v.how}.`;
    }

    return answer;
}

// Template 4: Feeling-Emphasis
function generateTemplate4(v) {
    let answer = '';

    if (v.what && v.how) {
        const whatText = v.what.charAt(0).toUpperCase() + v.what.slice(1);
        answer = `${whatText} makes me feel ${v.how}`;
    } else if (v.what) {
        answer = `${randomPick(STARTERS)} ${v.what}`;
    }

    if (v.when) {
        const timePrefix = v.when.startsWith('in ') || v.when.startsWith('on ') ? '' : 'in ';
        answer += `. That's why I do it ${timePrefix}${v.when}`;
    }

    if (v.where || v.who) {
        answer += '. I usually do it';
        if (v.where) {
            const wherePrefix = v.where.startsWith('at ') || v.where.startsWith('in ') ? '' : 'at ';
            answer += ` ${wherePrefix}${v.where}`;
        }
        if (v.who) {
            answer += ` ${v.who.startsWith('with ') || v.who.startsWith('alone') ? v.who : 'with ' + v.who}`;
        }
    }

    if (v.why) {
        const whyText = v.why.startsWith('it ') || v.why.startsWith('I ') ? v.why : `it ${v.why}`;
        answer += `, and ${whyText}`;
    }

    if (answer && !answer.endsWith('.')) answer += '.';

    return answer;
}

// Render all sample answers (main + alternatives)
function renderSampleAnswers(question) {
    const container = document.getElementById('sampleCardsContainer');
    container.innerHTML = '';

    // Build array of all samples
    const samples = [];

    // Add main sample (5W1H)
    const config = TECHNIQUE_CONFIG[currentTechnique];
    samples.push({
        technique: '5W1H',
        text: question.sampleAnswer,
        breakdown: question[config.breakdownKey] || {},
        isMain: true
    });

    // Add alternative samples if available
    if (question.alternativeSamples && Array.isArray(question.alternativeSamples)) {
        question.alternativeSamples.forEach(alt => {
            samples.push({
                technique: alt.technique,
                text: alt.text,
                breakdown: alt.breakdown || {},
                isMain: false
            });
        });
    }

    // Store for audio playback
    currentSampleText = question.sampleAnswer;

    // Render each sample card
    samples.forEach((sample, index) => {
        const card = document.createElement('div');
        card.className = 'sample-card' + (sample.isMain ? ' sample-card-main' : ' sample-card-alt');
        card.innerHTML = `
            <div class="sample-card-header">
                <span class="sample-technique-badge ${sample.isMain ? 'badge-main' : 'badge-alt'}">
                    ${sample.technique}
                </span>
                <div class="sample-audio-controls">
                    <button class="btn-audio-listen" onclick="playSampleByIndex(${index})" data-sample-index="${index}">
                        🔊 Listen
                    </button>
                    <button class="btn-audio-stop" onclick="stopSampleAudio()" style="display: none;" data-sample-index="${index}">
                        ⏹️ Stop
                    </button>
                </div>
            </div>
            <div class="sample-card-breakdown">${renderBreakdownHTML(sample.breakdown, sample.technique)}</div>
            <div class="sample-card-text">${sample.text}</div>
        `;
        container.appendChild(card);
    });

    // Store samples array for audio playback
    window.currentSamples = samples;
}

// Render breakdown HTML for a sample
function renderBreakdownHTML(breakdown, technique) {
    if (!breakdown || Object.keys(breakdown).length === 0) {
        return '<em style="color: #999;">Breakdown not available</em>';
    }

    let html = '<strong>Elements used:</strong><div style="margin-top: 0.5rem;">';
    const fieldMapping = getFieldMapping(technique.toLowerCase().replace(/\s+/g, '_').replace('vs', '').replace('past__present', 'past_present'));

    // For techniques not in the mapping, show raw breakdown
    if (fieldMapping.length === 0) {
        Object.entries(breakdown).forEach(([key, value]) => {
            if (value) {
                html += `<div style="margin-bottom: 0.5rem;">
                    <span class="technique-tag">${key.toUpperCase()}</span>
                    <span style="margin-left: 0.5rem;">${value}</span>
                </div>`;
            }
        });
    } else {
        fieldMapping.forEach(elem => {
            const value = breakdown[elem.key];
            if (value) {
                html += `<div style="margin-bottom: 0.5rem;">
                    <span class="technique-tag ${elem.color}">${elem.icon} ${elem.label}</span>
                    <span style="margin-left: 0.5rem;">${value}</span>
                </div>`;
            }
        });
    }

    html += '</div>';
    return html;
}

// Play sample by index
async function playSampleByIndex(index) {
    const samples = window.currentSamples;
    if (!samples || !samples[index]) return;

    const sample = samples[index];
    currentSampleText = sample.text;

    // For main sample (5W1H), use pre-generated audio
    if (sample.isMain) {
        await playSampleAnswer();
    } else {
        // For alternative samples, use TTS
        await playSampleWithTTS(sample.text, index);
    }
}

// Play sample using TTS for alternatives
async function playSampleWithTTS(text, index) {
    if (!window.ttsService) {
        alert('TTS service not available');
        return;
    }

    const buttons = document.querySelectorAll(`[data-sample-index="${index}"]`);
    const listenBtn = buttons[0];
    const stopBtn = buttons[1];

    try {
        if (listenBtn) listenBtn.style.display = 'none';
        if (stopBtn) {
            stopBtn.style.display = 'inline-block';
            stopBtn.textContent = '⏳ Loading...';
        }

        isTTSPlaying = true;

        await window.ttsService.speak(text, {
            onStart: () => {
                if (stopBtn) stopBtn.textContent = '⏹️ Stop';
            },
            onEnd: () => {
                isTTSPlaying = false;
                if (stopBtn) stopBtn.style.display = 'none';
                if (listenBtn) listenBtn.style.display = 'inline-block';
            }
        });
    } catch (error) {
        console.error('TTS error:', error);
        isTTSPlaying = false;
        if (stopBtn) stopBtn.style.display = 'none';
        if (listenBtn) listenBtn.style.display = 'inline-block';
    }
}

// Get field mapping for visual breakdown
function getFieldMapping(technique) {
    const mappings = {
        '5w1h': [
            { key: 'what', label: 'WHAT', icon: '📌', color: 'what' },
            { key: 'when', label: 'WHEN', icon: '⏰', color: 'when' },
            { key: 'where', label: 'WHERE', icon: '📍', color: 'where' },
            { key: 'who', label: 'WHO', icon: '👥', color: 'who' },
            { key: 'why', label: 'WHY', icon: '❓', color: 'why' },
            { key: 'how', label: 'HOW', icon: '💭', color: 'how' }
        ],
        'prep': [
            { key: 'point', label: 'POINT', icon: '🎯', color: 'point' },
            { key: 'reason', label: 'REASON', icon: '💡', color: 'reason' },
            { key: 'example', label: 'EXAMPLE', icon: '📋', color: 'example' },
            { key: 'pointAgain', label: 'POINT AGAIN', icon: '🔁', color: 'point-again' }
        ],
        'past_present': [
            { key: 'past', label: 'PAST', icon: '⏮️', color: 'past' },
            { key: 'present', label: 'PRESENT', icon: '⏭️', color: 'present' },
            { key: 'why', label: 'WHY CHANGED', icon: '🔄', color: 'why-changed' }
        ],
        'personal_general': [
            { key: 'personal', label: 'PERSONAL', icon: '👤', color: 'personal' },
            { key: 'general', label: 'GENERAL', icon: '🌍', color: 'general' },
            { key: 'observation', label: 'OBSERVATION', icon: '👁️', color: 'general' }
        ],
        'contrast': [
            { key: 'type', label: 'TYPE', icon: '🔀', color: 'markers' },
            { key: 'sideA', label: 'SIDE A', icon: '⚖️', color: 'side-a' },
            { key: 'sideB', label: 'SIDE B', icon: '⚡', color: 'side-b' },
            { key: 'marker', label: 'MARKERS', icon: '🔤', color: 'markers' }
        ],
        'feelings': [
            { key: 'emotions', label: 'EMOTIONS', icon: '💙', color: 'feelings' },
            { key: 'reasons', label: 'REASONS', icon: '🔍', color: 'reasons' },
            { key: 'impact', label: 'IMPACT', icon: '✨', color: 'impact' }
        ],
        'frequency': [
            { key: 'main', label: 'MAIN FREQUENCY', icon: '⏰', color: 'main-freq' },
            { key: 'variations', label: 'VARIATIONS', icon: '🔄', color: 'variations' }
        ]
    };

    return mappings[technique] || [];
}

// ========== FOLLOW-UP QUESTION FEATURE ==========

/** Show/hide follow-up question for current question */
function updateFollowUpSection(question) {
    // Follow-up is now shown dynamically after speaking via stopSpeaking()
    // This function is kept for backward compatibility
    const followupZone = document.getElementById('followupZone');
    if (followupZone) followupZone.style.display = 'none';
}

/** Toggle follow-up question visibility */
function toggleFollowUp() {
    const zone = document.getElementById('followupZone');
    if (!zone) return;
    zone.style.display = zone.style.display === 'none' ? 'block' : 'none';
}

// ========== RECORDING TIMER WITH COLOR CODING ==========

const PART1_TARGET_MIN = 20;
const PART1_TARGET_MAX = 30;

/** Update recording timer color based on elapsed seconds */
function updateRecordingTimerColor(seconds) {
    const timerEl = document.getElementById('recordTimer');
    if (!timerEl) return;

    if (seconds < PART1_TARGET_MIN) {
        timerEl.style.color = '#16a34a'; // green
    } else if (seconds <= PART1_TARGET_MAX) {
        timerEl.style.color = '#ca8a04'; // yellow
    } else {
        timerEl.style.color = '#dc2626'; // red
    }
}

// ========== INTERVIEW STATE MACHINE ==========

/** Examiner reads the question aloud via browser TTS */
function examinerAskQuestion() {
    const q = allQuestions[currentIndex];
    const text = typeof q === 'string' ? q : q.question;
    PracticeCommon.speakAsExaminer(text, () => {
        // After examiner finishes, do NOT auto-start speaking
        // Student clicks "Speak Now" when ready
    });
}

/** Main action button handler - behavior depends on state */
function handleActionButton() {
    switch (interviewState) {
        case 'ready':
            startSpeaking();
            break;
        case 'speaking':
            stopSpeaking();
            break;
        case 'answered':
            // Start follow-up answer
            startSpeaking();
            break;
        case 'review':
            nextQuestion();
            break;
    }
}

/** Start speaking: show timer ring, begin recording + STT */
async function startSpeaking() {
    // If answering follow-up, mark it
    if (interviewState === 'answered') {
        followUpAnswered = true;
    }

    // Keep transcript zone hidden — STT runs in background, shown in review
    document.getElementById('liveTranscriptText').textContent = '';

    // Update action button to stop
    const actionBtn = document.getElementById('actionBtn');
    actionBtn.className = 'btn-action btn-speak recording';
    actionBtn.textContent = '⏹ Stop Speaking';

    // Reset timer
    interviewSeconds = 0;
    updateTimerRing(INTERVIEW_MAX_SECONDS);
    document.getElementById('timerLabel').textContent = 'Speaking...';

    // Start recording + live STT
    try {
        audioRecorder = new AudioRecorder();
        await audioRecorder.initialize();
        audioRecorder.startRecording();

        window.liveSTT = PracticeCommon.startLiveSTT({
            liveAreaEl: 'transcriptZone',
            liveTextEl: 'liveTranscriptText',
            manualAreaEl: 'manualAnswerArea'
        });
    } catch (error) {
        console.error('Recording error:', error);
        audioRecorder = null;
        // Show manual input as fallback
        document.getElementById('manualAnswerArea').classList.remove('hidden');
    }

    // Start countdown timer
    interviewTimer = setInterval(() => {
        interviewSeconds++;
        const remaining = INTERVIEW_MAX_SECONDS - interviewSeconds;
        updateTimerRing(remaining);

        if (remaining <= 0) {
            stopSpeaking();
        }
    }, 1000);

    interviewState = 'speaking';
}

/** Update timer ring SVG and colors */
function updateTimerRing(secondsRemaining) {
    const progress = document.getElementById('timerProgress');
    const timerValue = document.getElementById('timerValue');
    const fraction = secondsRemaining / INTERVIEW_MAX_SECONDS;
    const offset = TIMER_CIRCUMFERENCE * (1 - fraction);

    progress.style.strokeDashoffset = offset.toString();
    timerValue.textContent = `0:${String(
        Math.max(0, secondsRemaining)
    ).padStart(2, '0')}`;

    // Color coding
    if (secondsRemaining > 10) {
        progress.style.stroke = '#16a34a'; // green
    } else if (secondsRemaining > 5) {
        progress.style.stroke = '#ca8a04'; // yellow
    } else {
        progress.style.stroke = '#dc2626'; // red
    }
}

/** Stop speaking: stop recording, get transcript, transition to next phase */
async function stopSpeaking() {
    // Clear timer
    if (interviewTimer) {
        clearInterval(interviewTimer);
        interviewTimer = null;
    }

    document.getElementById('timerLabel').textContent = 'Done';

    // Stop live STT
    const liveTranscript = PracticeCommon.stopLiveSTT(
        window.liveSTT, 'transcriptZone'
    );
    window.liveSTT = null;

    // Transcript stays hidden — shown in review panel instead

    // Stop recording
    if (audioRecorder) {
        const recording = await audioRecorder.stopRecording();
        if (recording) {
            currentRecording = recording;
        }
        audioRecorder.cleanup();
        audioRecorder = null;
    }

    // Get transcript text
    const transcriptEl = document.getElementById('liveTranscriptText');
    const transcript = liveTranscript || transcriptEl.textContent.trim();

    const isFollowUp = followUpAnswered;

    if (transcript && transcript.length > 0) {
        const words = transcript.trim().split(/\s+/).filter(Boolean);
        document.getElementById('wordCount').textContent = `${words.length} words`;

        // Store transcript
        const storageKey = isFollowUp
            ? 'm2_followup_transcript_' + currentIndex
            : 'm2_last_transcript_' + currentIndex;
        localStorage.setItem(storageKey, transcript);
    }

    const question = allQuestions[currentIndex];
    const hasFollowUp = typeof question === 'object' && question.followUp;

    if (!isFollowUp) {
        // --- Main answer done ---
        mainTranscript = transcript || '';
        mainRecording = currentRecording;
        currentRecording = null;

        if (hasFollowUp) {
            // Show main answer as compact summary
            const summaryEl = document.getElementById('mainAnswerSummary');
            document.getElementById('mainAnswerText').textContent = mainTranscript;
            const mainWords = mainTranscript.trim().split(/\s+/).filter(Boolean).length;
            document.getElementById('mainAnswerMeta').textContent = `${mainWords} words`;
            summaryEl.style.display = 'block';

            // Hide live transcript zone (will reuse for follow-up)
            document.getElementById('transcriptZone').style.display = 'none';
            document.getElementById('liveTranscriptText').textContent = '';
            document.getElementById('wordCount').textContent = '0 words';
            document.getElementById('scoreBadge').textContent = '';

            // Show follow-up question
            document.getElementById('followupZone').style.display = 'block';
            document.getElementById('followupText').textContent = question.followUp;

            // Reset timer for follow-up
            interviewSeconds = 0;
            const progress = document.getElementById('timerProgress');
            if (progress) {
                progress.style.strokeDashoffset = '0';
                progress.style.stroke = '#2563eb';
            }
            document.getElementById('timerValue').textContent = '0:30';
            document.getElementById('timerLabel').textContent = 'Ready';

            // Auto-read follow-up question
            if (document.getElementById('autoVoice')?.checked) {
                setTimeout(() => {
                    PracticeCommon.speakAsExaminer(question.followUp);
                }, 1000);
            }

            const actionBtn = document.getElementById('actionBtn');
            actionBtn.className = 'btn-action btn-speak';
            actionBtn.textContent = '🎤 Answer Follow-up';
            interviewState = 'answered';
        } else {
            // No follow-up — go straight to review
            enterReview();
        }
    } else {
        // --- Follow-up answer done ---
        followUpTranscript = transcript || '';
        enterReview();
    }
}

/** Enter review state: score all answers together, show combined feedback */
async function enterReview() {
    const question = allQuestions[currentIndex];
    const hasFollowUp = followUpTranscript.length > 0;

    // Hide speaking UI elements
    document.getElementById('transcriptZone').style.display = 'none';
    document.getElementById('followupZone').style.display = 'none';
    document.getElementById('mainAnswerSummary').style.display = 'none';

    // Show review panel
    const reviewPanel = document.getElementById('reviewPanel');
    reviewPanel.style.display = 'flex';

    // --- Score (rule-based, instant) ---
    const mainDuration = interviewSeconds;
    const combinedTranscript = hasFollowUp
        ? mainTranscript + ' ' + followUpTranscript
        : mainTranscript;
    const combinedWords = combinedTranscript.trim().split(/\s+/).filter(Boolean).length;

    let scores = null;
    if (combinedTranscript.length > 0 && window.calculateBandScores) {
        scores = calculateBandScores(combinedTranscript, mainDuration, 'part1');
    }

    // --- Render band score bar ---
    renderReviewScore(scores, combinedWords);

    // --- Feedback: Gemini (primary) or rule-based (fallback) ---
    const questionText = typeof question === 'string' ? question : question.question;
    const feedbackEl = document.getElementById('reviewFeedback');
    const audioBlob = mainRecording?.blob || currentRecording?.blob || null;
    const hasGemini = window.ieltsCoachAI && window.ieltsCoachAI.hasApiKey();

    if (hasGemini) {
        // Gemini handles everything: transcription from audio, scoring, feedback
        feedbackEl.innerHTML = '<div style="text-align:center;padding:20px;color:var(--color-text-muted);"><div class="gemini-loading"></div>AI Examiner is reviewing your answer...</div>';
        window.ieltsCoachAI.getExaminerFeedback(combinedTranscript, 'part1', questionText, scores, audioBlob)
            .then(markdown => {
                if (markdown) {
                    feedbackEl.innerHTML = '<div class="gemini-feedback">' + markdownToHtml(markdown) + '</div>';
                } else {
                    renderReviewFeedback(scores, combinedTranscript, question);
                }
            })
            .catch(() => {
                renderReviewFeedback(scores, combinedTranscript, question);
            });
    } else {
        renderReviewFeedback(scores, combinedTranscript, question);
    }
    finalizeReview(scores, question, combinedWords);

    // Update action button
    const actionBtn = document.getElementById('actionBtn');
    actionBtn.className = 'btn-action btn-next-q';
    actionBtn.textContent = 'Next Question →';
    interviewState = 'review';

    // Scroll review into view
    reviewPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Render score section in review panel (called initially and again after Gemini validation) */
function renderReviewScore(scores, combinedWords) {
    const scoreEl = document.getElementById('reviewScore');
    if (scores) {
        const overall = parseFloat(scores.overall);
        const bandColor = overall >= 7 ? '#16a34a' : overall >= 6 ? '#d97706' : '#dc2626';

        let scoreHtml = `<div style="font-size:2rem;font-weight:800;color:${bandColor};margin-bottom:4px;">Band ${scores.overall}</div>`;
        scoreHtml += `<div style="font-size:0.75rem;color:var(--color-text-muted);margin-bottom:12px;">${combinedWords} words total</div>`;

        // Criteria bars
        const criteria = [
            { label: 'Fluency', short: 'F', val: scores.fluency },
            { label: 'Vocabulary', short: 'V', val: scores.vocabulary },
            { label: 'Grammar', short: 'G', val: scores.grammar },
            { label: 'Pronunciation', short: 'P', val: scores.pronunciation }
        ];
        scoreHtml += '<div style="display:flex;gap:8px;justify-content:center;">';
        criteria.forEach(c => {
            const pct = Math.max(5, ((c.val - 4) / 5) * 100);
            const clr = c.val >= 7 ? '#16a34a' : c.val >= 6 ? '#d97706' : '#dc2626';
            scoreHtml += `<div style="flex:1;max-width:80px;text-align:center;" title="${c.label}: ${c.val}">
                <div style="font-size:0.65rem;color:var(--color-text-muted);font-weight:600;">${c.label}</div>
                <div style="height:4px;background:#e5e7eb;border-radius:2px;margin:3px 0;">
                    <div style="height:100%;width:${pct}%;background:${clr};border-radius:2px;"></div>
                </div>
                <div style="font-size:0.8rem;font-weight:700;color:${clr};">${c.val}</div>
            </div>`;
        });
        scoreHtml += '</div>';


        scoreEl.innerHTML = scoreHtml;
    } else {
        scoreEl.innerHTML = '<div style="color:var(--color-text-muted);font-size:0.875rem;">No score available</div>';
    }
}

/** Render feedback section in review panel */
function renderReviewFeedback(scores, combinedTranscript, question) {
    // --- Render feedback ---
    const feedbackEl = document.getElementById('reviewFeedback');
    let fbHtml = '';

    if (scores && scores.details) {
        if (scores.details.strengths.length) {
            fbHtml += '<div style="margin-bottom:8px;"><strong style="color:#16a34a;font-size:0.8rem;">Strengths:</strong>';
            fbHtml += '<ul style="margin:4px 0;padding-left:18px;font-size:0.82rem;">';
            scores.details.strengths.forEach(s => fbHtml += `<li>${s}</li>`);
            fbHtml += '</ul></div>';
        }
        if (scores.details.weaknesses.length) {
            fbHtml += '<div style="margin-bottom:8px;"><strong style="color:#dc2626;font-size:0.8rem;">Areas to Improve:</strong>';
            fbHtml += '<ul style="margin:4px 0;padding-left:18px;font-size:0.82rem;">';
            scores.details.weaknesses.forEach(w => fbHtml += `<li>${w}</li>`);
            fbHtml += '</ul></div>';
        }
        if (scores.details.tips.length) {
            fbHtml += '<div style="margin-bottom:8px;"><strong style="color:#2563eb;font-size:0.8rem;">Tips:</strong>';
            fbHtml += '<ul style="margin:4px 0;padding-left:18px;font-size:0.82rem;">';
            scores.details.tips.forEach(t => fbHtml += `<li>${t}</li>`);
            fbHtml += '</ul></div>';
        }
    }

    // Pronunciation mismatches
    const sampleText = typeof question === 'object' ? question.sampleAnswer : null;
    if (sampleText && window.detectPronunciationMismatches) {
        const pronMismatches = detectPronunciationMismatches(combinedTranscript, sampleText);
        if (pronMismatches.length > 0) {
            fbHtml += '<div style="margin-top:8px;padding:10px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;font-size:0.82rem;">';
            fbHtml += '<strong style="color:#dc2626;">Pronunciation Errors:</strong>';
            fbHtml += '<ul style="margin:4px 0;padding-left:18px;">';
            pronMismatches.forEach(m => {
                fbHtml += `<li>You said "<strong>${m.heard}</strong>" — should be "<strong>${m.expected}</strong>"`;
                if (m.feedback) fbHtml += `<br><span style="color:var(--color-text-muted);font-size:0.78rem;">${m.feedback}</span>`;
                fbHtml += '</li>';
            });
            fbHtml += '</ul></div>';
        }
    }

    // Pronunciation challenges
    if (scores && scores.pronunciationChallenges && scores.pronunciationChallenges.length > 0) {
        fbHtml += '<div style="margin-top:8px;padding:10px;background:#eff6ff;border-radius:8px;font-size:0.82rem;">';
        fbHtml += '<strong>Pronunciation Practice:</strong><ul style="margin:4px 0;padding-left:18px;">';
        const shown = new Set();
        scores.pronunciationChallenges.forEach(c => {
            if (!shown.has(c.category)) {
                shown.add(c.category);
                fbHtml += `<li><strong>${c.word}</strong> — ${c.tip}</li>`;
            }
        });
        fbHtml += '</ul></div>';
    }

    // Sample answer
    if (sampleText) {
        fbHtml += '<div style="margin-top:10px;padding:10px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;">';
        fbHtml += '<strong style="font-size:0.8rem;color:#166534;">Sample Answer:</strong>';
        fbHtml += `<div style="font-size:0.85rem;margin-top:4px;color:var(--color-text-secondary);line-height:1.6;font-style:italic;">${sampleText}</div>`;
        fbHtml += '</div>';
    }

    feedbackEl.innerHTML = fbHtml;
}

/** Enter review continued: audio, history, navigation */
function finalizeReview(scores, question, combinedWords) {
    // Show audio previews for both recordings
    if (mainRecording) {
        const el = document.getElementById('mainAudioPreview');
        document.getElementById('mainAudioPlayer').src = URL.createObjectURL(mainRecording.blob);
        el.style.display = 'block';
    }
    if (currentRecording && currentRecording !== mainRecording) {
        const el = document.getElementById('followupAudioPreview');
        document.getElementById('followupAudioPlayer').src = URL.createObjectURL(currentRecording.blob);
        el.style.display = 'block';
    }

    // Save to score history
    if (scores && window.scoreHistory) {
        scoreHistory.addScore({
            date: new Date().toISOString(),
            module: 'module2',
            questionId: currentIndex,
            scores: scores,
            wordCount: combinedWords,
            duration: interviewSeconds
        });
    }

    // Mark completed
    const questionId = getQuestionId(question, currentIndex);
    completed.add(questionId);
    saveProgress();
}

/** Escape HTML for safe rendering */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/** Simple markdown to HTML converter */
function markdownToHtml(md) {
    return md
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/^### (.+)$/gm, '<h4>$1</h4>')
        .replace(/^## (.+)$/gm, '<h3>$1</h3>')
        .replace(/^# (.+)$/gm, '<h2>$1</h2>')
        .replace(/^[-*] (.+)$/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
        .replace(/<\/ul>\s*<ul>/g, '')
        .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
        .replace(/\n{2,}/g, '</p><p>')
        .replace(/\n/g, '<br>')
        .replace(/^/, '<p>').replace(/$/, '</p>')
        .replace(/<p><h/g, '<h').replace(/<\/h(\d)><\/p>/g, '</h$1>')
        .replace(/<p><ul>/g, '<ul>').replace(/<\/ul><\/p>/g, '</ul>');
}

/** Force stop speaking without scoring (used on question change) */
function forceStopSpeaking() {
    if (interviewTimer) {
        clearInterval(interviewTimer);
        interviewTimer = null;
    }
    if (window.liveSTT) {
        PracticeCommon.stopLiveSTT(window.liveSTT, null);
        window.liveSTT = null;
    }
    if (audioRecorder) {
        audioRecorder.stopRecording().catch(() => {});
        audioRecorder.cleanup();
        audioRecorder = null;
    }
    interviewState = 'ready';
}

/** Auto-score transcript and show inline badge */
async function autoScoreTranscript(transcript) {
    if (!transcript || !window.calculateBandScores) return;

    const words = transcript.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const duration = interviewSeconds;
    const scores = calculateBandScores(transcript, duration, 'part1');
    const overall = parseFloat(scores.overall);

    // Run pronunciation mismatch detection against sample answer
    const question = allQuestions[currentIndex];
    const sampleText = typeof question === 'object' ? question.sampleAnswer : null;
    let pronMismatches = [];
    if (sampleText && window.detectPronunciationMismatches) {
        pronMismatches = detectPronunciationMismatches(transcript, sampleText);
    }
    // Also try async audio-based assessment if we have a recording
    let audioPronResult = null;
    const audioBlob = currentRecording?.blob || window.answerRecordingBlob || null;
    if (audioBlob && window.assessPronunciation) {
        audioPronResult = await assessPronunciation(audioBlob, transcript, sampleText).catch(() => null);
        if (audioPronResult && audioPronResult.band) {
            scores.pronunciation = audioPronResult.band;
            // Recalculate overall
            const raw = (scores.fluency + scores.vocabulary + scores.grammar + scores.pronunciation) / 4;
            scores.overall = Math.max(4.0, Math.min(9.0, Math.round(raw * 2) / 2));
        }
    }

    // Inline score summary with criteria bars
    const badgeEl = document.getElementById('scoreBadge');
    const bandColor = overall >= 7 ? '#16a34a' : overall >= 6 ? '#d97706' : '#dc2626';

    let badgeHtml = `<div style="margin-top:8px;">`;
    badgeHtml += `<div style="font-size:1.4rem;font-weight:700;color:${bandColor};">Band ${scores.overall}</div>`;

    // Mini criteria bars
    const miniCriteria = [
        { label: 'F', val: scores.fluency, full: 'Fluency & Coherence' },
        { label: 'V', val: scores.vocabulary, full: 'Lexical Resource' },
        { label: 'G', val: scores.grammar, full: 'Grammar Range' },
        { label: 'P', val: scores.pronunciation, full: 'Pronunciation' }
    ];
    badgeHtml += '<div style="display:flex;gap:6px;margin-top:6px;">';
    miniCriteria.forEach(c => {
        const pct = Math.max(5, ((c.val - 4) / 5) * 100);
        const clr = c.val >= 7 ? '#16a34a' : c.val >= 6 ? '#d97706' : '#dc2626';
        badgeHtml += `<div style="flex:1;text-align:center;" title="${c.full}: ${c.val}">`;
        badgeHtml += `<div style="font-size:0.65rem;color:#6b7280;">${c.label}</div>`;
        badgeHtml += `<div style="height:4px;background:#e5e7eb;border-radius:2px;margin:2px 0;">`;
        badgeHtml += `<div style="height:100%;width:${pct}%;background:${clr};border-radius:2px;"></div>`;
        badgeHtml += `</div>`;
        badgeHtml += `<div style="font-size:0.7rem;font-weight:600;color:${clr};">${c.val}</div>`;
        badgeHtml += `</div>`;
    });
    badgeHtml += '</div>';

    if (wordCount < 15) {
        badgeHtml += `<div style="font-size:0.75rem;color:#dc2626;margin-top:6px;">⚠ Too short — aim for 30-60 words</div>`;
    } else if (wordCount < 30) {
        badgeHtml += `<div style="font-size:0.75rem;color:#d97706;margin-top:6px;">Develop more — aim for 40-60 words</div>`;
    } else {
        badgeHtml += `<div style="font-size:0.72rem;color:#6b7280;margin-top:4px;">${wordCount} words</div>`;
    }
    badgeHtml += '</div>';
    badgeEl.innerHTML = badgeHtml;

    // Full feedback panel (below transcript)
    let feedbackEl = document.getElementById('autoFeedback');
    if (!feedbackEl) {
        feedbackEl = document.createElement('div');
        feedbackEl.id = 'autoFeedback';
        feedbackEl.style.cssText = 'margin-top:16px;padding:16px;background:#fff;border:1px solid #e2e8f0;border-radius:12px;';
        const transcriptZone = document.getElementById('transcriptZone');
        if (transcriptZone) transcriptZone.after(feedbackEl);
    }

    let html = '';

    // Criteria breakdown
    html += `<div style="font-weight:700;margin-bottom:10px;">AI Feedback</div>`;
    html += `<div style="font-size:0.85rem;color:#666;margin-bottom:8px;">Band Score: ${scores.overall} | Words: ${wordCount}</div>`;

    const criteria = [
        { label: 'Fluency', val: scores.fluency },
        { label: 'Vocabulary', val: scores.vocabulary },
        { label: 'Grammar', val: scores.grammar },
        { label: 'Pronunciation', val: scores.pronunciation }
    ];
    html += '<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:12px;">';
    criteria.forEach(c => {
        const color = c.val >= 7 ? '#16a34a' : c.val >= 6 ? '#d97706' : '#dc2626';
        html += `<div style="font-size:0.8rem;"><span style="color:${color};font-weight:700;">${c.val}</span> ${c.label}</div>`;
    });
    html += '</div>';

    // Strengths & weaknesses
    if (scores.details) {
        if (scores.details.strengths.length) {
            html += '<div style="margin-bottom:8px;"><strong style="color:#16a34a;font-size:0.8rem;">Strengths:</strong>';
            html += '<ul style="margin:4px 0;padding-left:20px;font-size:0.82rem;">';
            scores.details.strengths.forEach(s => html += `<li>${s}</li>`);
            html += '</ul></div>';
        }
        if (scores.details.weaknesses.length) {
            html += '<div style="margin-bottom:8px;"><strong style="color:#dc2626;font-size:0.8rem;">Areas to Improve:</strong>';
            html += '<ul style="margin:4px 0;padding-left:20px;font-size:0.82rem;">';
            scores.details.weaknesses.forEach(w => html += `<li>${w}</li>`);
            html += '</ul></div>';
        }
        if (scores.details.tips.length) {
            html += '<div style="margin-bottom:8px;"><strong style="color:#2563eb;font-size:0.8rem;">Tips:</strong>';
            html += '<ul style="margin:4px 0;padding-left:20px;font-size:0.82rem;">';
            scores.details.tips.forEach(t => html += `<li>${t}</li>`);
            html += '</ul></div>';
        }
    }

    // Pronunciation errors detected (mismatches between what you said vs expected)
    if (pronMismatches.length > 0) {
        html += '<div style="margin-top:10px;padding:12px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;font-size:0.82rem;">';
        html += '<strong style="color:#dc2626;">🔊 Pronunciation Errors Detected:</strong>';
        html += '<ul style="margin:6px 0;padding-left:20px;">';
        pronMismatches.forEach(m => {
            html += `<li>You said "<strong>${m.heard}</strong>" — should be "<strong>${m.expected}</strong>"`;
            if (m.feedback) html += `<br><span style="color:#6b7280;font-size:0.78rem;">${m.feedback}</span>`;
            html += '</li>';
        });
        html += '</ul></div>';
    }

    // Audio-based pronunciation score
    if (audioPronResult && audioPronResult.isAudioBased) {
        html += `<div style="margin-top:8px;font-size:0.8rem;color:#6b7280;">🎤 Audio pronunciation score: Band ${audioPronResult.band} (spectral analysis)</div>`;
    }

    // Pronunciation challenges (tricky words in your text)
    if (scores.pronunciationChallenges && scores.pronunciationChallenges.length > 0) {
        html += '<div style="margin-top:8px;padding:10px;background:#eff6ff;border-radius:8px;font-size:0.82rem;">';
        html += '<strong>Pronunciation Practice:</strong><ul style="margin:4px 0;padding-left:20px;">';
        const shown = new Set();
        scores.pronunciationChallenges.forEach(c => {
            if (!shown.has(c.category)) {
                shown.add(c.category);
                html += `<li><strong>${c.word}</strong> — ${c.tip}</li>`;
            }
        });
        html += '</ul></div>';
    }

    // Sample answer (question already declared above)
    const sampleAnswer = sampleText;
    if (sampleAnswer) {
        html += '<div style="margin-top:12px;padding:12px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;">';
        html += '<strong style="font-size:0.8rem;color:#166534;">Sample Answer:</strong>';
        html += `<div style="font-size:0.85rem;margin-top:6px;color:#334155;line-height:1.6;font-style:italic;">${sampleAnswer}</div>`;
        html += '</div>';
    }

    feedbackEl.innerHTML = html;
    feedbackEl.style.display = 'block';

    // Save to score history
    if (window.scoreHistory) {
        scoreHistory.addScore({
            date: new Date().toISOString(),
            module: 'module2',
            questionId: currentIndex,
            scores: scores,
            wordCount: wordCount,
            duration: duration
        });
    }
}

/** Score follow-up answer — shown in a separate panel below main feedback */
async function autoScoreFollowUp(transcript) {
    if (!transcript || !window.calculateBandScores) return;

    const words = transcript.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const scores = calculateBandScores(transcript, interviewSeconds, 'part1');

    let el = document.getElementById('followupFeedback');
    if (!el) {
        el = document.createElement('div');
        el.id = 'followupFeedback';
        el.style.cssText = 'margin-top:16px;padding:16px;background:#fffbeb;border:1px solid #fde68a;border-radius:12px;';
        const autoFeedback = document.getElementById('autoFeedback');
        if (autoFeedback) autoFeedback.after(el);
        else {
            const zone = document.getElementById('transcriptZone');
            if (zone) zone.after(el);
        }
    }

    const bandColor = scores.overall >= 7 ? '#16a34a' : scores.overall >= 6 ? '#d97706' : '#dc2626';
    let html = `<div style="font-weight:700;margin-bottom:8px;">Follow-up Answer Feedback</div>`;
    html += `<div style="font-size:1.2rem;font-weight:700;color:${bandColor};margin-bottom:6px;">Band ${scores.overall}</div>`;

    // Mini criteria
    const criteria = [
        { label: 'F', val: scores.fluency },
        { label: 'V', val: scores.vocabulary },
        { label: 'G', val: scores.grammar },
        { label: 'P', val: scores.pronunciation }
    ];
    html += '<div style="display:flex;gap:6px;margin-bottom:10px;">';
    criteria.forEach(c => {
        const pct = Math.max(5, ((c.val - 4) / 5) * 100);
        const clr = c.val >= 7 ? '#16a34a' : c.val >= 6 ? '#d97706' : '#dc2626';
        html += `<div style="flex:1;text-align:center;"><div style="font-size:0.65rem;color:#6b7280;">${c.label}</div>`;
        html += `<div style="height:4px;background:#e5e7eb;border-radius:2px;margin:2px 0;"><div style="height:100%;width:${pct}%;background:${clr};border-radius:2px;"></div></div>`;
        html += `<div style="font-size:0.7rem;font-weight:600;color:${clr};">${c.val}</div></div>`;
    });
    html += '</div>';

    html += `<div style="font-size:0.8rem;color:#6b7280;">${wordCount} words</div>`;

    // Strengths & weaknesses
    if (scores.details) {
        if (scores.details.weaknesses.length) {
            html += '<div style="margin-top:6px;font-size:0.82rem;">';
            scores.details.weaknesses.forEach(w => html += `<div style="color:#dc2626;">• ${w}</div>`);
            html += '</div>';
        }
        if (scores.details.tips.length) {
            html += '<div style="margin-top:4px;font-size:0.82rem;">';
            scores.details.tips.slice(0, 2).forEach(t => html += `<div style="color:#2563eb;">💡 ${t}</div>`);
            html += '</div>';
        }
    }

    el.innerHTML = html;
    el.style.display = 'block';
}

// ========== QUICK ANSWER TIPS BY CATEGORY ==========

const CATEGORY_TIPS = {
    'Hobbies & Interests': 'Use present simple + frequency adverbs (always, usually, often)',
    'Daily Life': 'Describe your routine with time markers (in the morning, after work)',
    'Activities & Sports': 'Use present simple for habits, past tense for specific events',
    'Technology & Media': 'Compare past and present (used to... but now...)',
    'People & Relationships': 'Describe personality traits and give examples of behaviour',
    'Learning & Work': 'Talk about skills, goals, and what motivates you',
    'Places & Travel': 'Use descriptive adjectives and talk about your feelings',
    'Food & Cooking': 'Describe taste, texture, and the experience of eating',
    'Weather & Seasons': 'Compare different seasons and their effects on your mood',
    'Shopping & Fashion': 'Express preferences with reasons (I prefer... because...)',
    'Home & Living': 'Describe spaces using adjectives and explain what you like about them',
    'Arts & Entertainment': 'Share personal reactions and say why something appeals to you',
    'Nature & Environment': 'Use descriptive language and express opinions about conservation',
    'Transportation': 'Compare methods and discuss convenience, cost, and speed',
    'Health & Lifestyle': 'Talk about habits using frequency expressions and results',
    'Celebrations & Festivals': 'Use past tense for memories, present for traditions',
    'Pets & Animals': 'Describe behaviour and explain emotional connections',
    'Language & Communication': 'Discuss learning strategies and challenges',
    'Memory & Childhood': 'Use past tense and expressions like "I remember when..."',
    'Time Management': 'Talk about priorities and scheduling with time expressions'
};

/** Update the quick answer tips section - now handled by updateTipContent() */
function updateQuickAnswerTips(category) {
    // Kept for backward compatibility; tips now in detail-section
    updateTipContent(category);
}

/** Toggle quick tips expansion (legacy, now <details>) */
function toggleQuickTips() {
    // No-op: tips are in a native <details> element now
}

// Navigation
function previousQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        renderCurrentQuestion();
    }
}

function nextQuestion() {
    if (currentIndex < allQuestions.length - 1) {
        currentIndex++;
        renderCurrentQuestion();
    }
}

function quickJumpToQuestion() {
    const input = document.getElementById('quickJumpInput');
    const questionNum = parseInt(input.value);

    if (isNaN(questionNum) || questionNum < 1 || questionNum > allQuestions.length) {
        alert(`Please enter a number between 1 and ${allQuestions.length}`);
        return;
    }

    currentIndex = questionNum - 1;
    renderCurrentQuestion();
    input.value = '';
    input.blur();
}

// Toggle functions
function toggleSettings() {
    const overlay = document.getElementById('settingsOverlay');
    const panel = document.getElementById('settingsPanel');
    overlay.classList.toggle('active');
    panel.classList.toggle('active');
}

function toggleFavorite() {
    const question = allQuestions[currentIndex];
    const questionId = getQuestionId(question, currentIndex);

    if (favorites.has(questionId)) {
        favorites.delete(questionId);
    } else {
        favorites.add(questionId);
    }

    saveFavorites();
    renderCurrentQuestion();
}

function toggleSample() {
    // Sample section is now a <details> element, toggle is native
    const detail = document.getElementById('sampleSection');
    if (detail) {
        sampleExpanded = detail.open;
    }
}

function toggleTemplate() {
    const content = document.getElementById('templateContent');
    const btn = document.getElementById('templateToggleBtn');

    templateExpanded = !templateExpanded;
    content.style.display = templateExpanded ? 'block' : 'none';
    btn.textContent = templateExpanded ? 'Hide' : 'Show';

    // Update template content when opened
    if (templateExpanded) {
        updateTemplateDisplay();
    }
}

function updateTemplateDisplay() {
    const templateText = document.getElementById('templateText');
    const template = TEMPLATE_EXAMPLES[currentTechnique] || TEMPLATE_EXAMPLES['5w1h'];
    templateText.innerHTML = template;
}

// Score My Answer - uses the same rich feedback as autoScoreTranscript
async function scoreMyAnswer() {
    // Try transcript first, then preview box, then manual input
    let answer = localStorage.getItem('m2_last_transcript_' + currentIndex) || '';
    if (!answer || answer.length < 10) {
        const transcriptEl = document.getElementById('liveTranscriptText');
        if (transcriptEl) answer = transcriptEl.textContent.trim();
    }
    if (!answer || answer.length < 10) {
        const previewBox = document.getElementById('previewBox');
        answer = previewBox?.textContent || '';
    }
    if (!answer || answer.length < 10 || answer === 'Start typing to see your answer...') {
        answer = document.getElementById('manualAnswerInput')?.value || '';
    }
    if (!answer || answer.length < 10) {
        alert('Please record or type your answer before scoring');
        return;
    }

    // Use the full feedback system
    await autoScoreTranscript(answer);

    // Mark as completed
    const question = allQuestions[currentIndex];
    const questionId = getQuestionId(question, currentIndex);
    completed.add(questionId);
    saveProgress();

    // Scroll to feedback
    const feedbackEl = document.getElementById('autoFeedback');
    if (feedbackEl) {
        feedbackEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Get sample answer text from question data
function getSampleAnswer(question) {
    if (typeof question === 'object' && question.sample) return question.sample;
    if (typeof question === 'object' && question.sampleAnswer) return question.sampleAnswer;
    if (typeof question === 'object' && question.answer) return question.answer;
    return null;
}

// Progress
function updateProgress() {
    const count = document.getElementById('progressCount');
    count.textContent = `${completed.size}/${allQuestions.length}`;
}

// Storage
function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        completed: Array.from(completed),
        currentIndex
    }));
}

function loadProgress() {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        completed = new Set(data.completed || []);
        currentIndex = data.currentIndex || 0;
    } catch (e) {
        console.error('Error loading progress:', e);
    }
}

function saveFavorites() {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
}

function loadFavorites() {
    try {
        const data = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
        favorites = new Set(data);
    } catch (e) {
        console.error('Error loading favorites:', e);
    }
}

// Utilities
function getQuestionId(question, index) {
    const text = typeof question === 'string' ? question : question.question;
    return `${currentTechnique}_${index}_${text.substring(0, 20)}`;
}

function shuffleArray(array) {
    return PracticeCommon.shuffleArray(array);
}

// Load favorites on init
loadFavorites();

// ========== STUDENT IDENTIFICATION FUNCTIONS ==========

function setupIdentificationListeners() {
    const nameInput = document.getElementById('studentName');
    nameInput.addEventListener('input', updateSubmitButtonState);
}

function updateSubmitButtonState() {
    const nameInput = document.getElementById('studentName');
    const submitBtn = document.getElementById('submitIdentificationBtn');
    const hasName = nameInput.value.trim().length > 0;
    const hasPhoto = capturedPhotoData !== null;

    submitBtn.disabled = !(hasName && hasPhoto);
}

async function startIdentificationCamera() {
    const videoElement = document.getElementById('cameraVideo');
    const startBtn = document.getElementById('startCameraBtn');
    const captureBtn = document.getElementById('capturePhotoBtn');
    const placeholder = document.getElementById('cameraPlaceholder');

    try {
        identificationCamera = new CameraCapture();
        await identificationCamera.initialize(videoElement);

        placeholder.style.display = 'none';
        videoElement.style.display = 'block';
        startBtn.style.display = 'none';
        captureBtn.style.display = 'inline-block';
    } catch (error) {
        alert(`Camera error: ${error.message}`);
    }
}

function captureIdentificationPhoto() {
    if (!identificationCamera) return;

    try {
        capturedPhotoData = identificationCamera.capturePhoto();

        const photoImg = document.getElementById('capturedPhoto');
        const photoPreview = document.getElementById('photoPreview');
        const cameraPreview = document.getElementById('cameraPreview');
        const captureBtn = document.getElementById('capturePhotoBtn');
        const retakeBtn = document.getElementById('retakePhotoBtn');

        photoImg.src = capturedPhotoData;
        photoPreview.style.display = 'block';
        cameraPreview.style.display = 'none';
        captureBtn.style.display = 'none';
        retakeBtn.style.display = 'inline-block';

        identificationCamera.stopCamera();
        identificationCamera = null;

        updateSubmitButtonState();
    } catch (error) {
        alert(`Capture error: ${error.message}`);
    }
}

function retakeIdentificationPhoto() {
    capturedPhotoData = null;

    const photoPreview = document.getElementById('photoPreview');
    const cameraPreview = document.getElementById('cameraPreview');
    const startBtn = document.getElementById('startCameraBtn');
    const retakeBtn = document.getElementById('retakePhotoBtn');

    photoPreview.style.display = 'none';
    cameraPreview.style.display = 'block';
    startBtn.style.display = 'inline-block';
    retakeBtn.style.display = 'none';

    updateSubmitButtonState();
}

async function submitIdentification() {
    const nameInput = document.getElementById('studentName');
    const studentName = nameInput.value.trim();

    if (!studentName || !capturedPhotoData) {
        alert('Please enter your name and take a photo');
        return;
    }

    const submitBtn = document.getElementById('submitIdentificationBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Starting session...';

    try {
        studentSession.createSession(studentName, capturedPhotoData);
        await sendSessionStartToTelegram(studentName, capturedPhotoData);
        await sendApprovalRequest(studentName, studentSession.getSession().sessionId);

        showApprovalWaiting();
        startApprovalPolling(studentSession.getSession().sessionId);
    } catch (error) {
        alert(`Failed to start session: ${error.message}`);
        studentSession.clearSession();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Start Practice Session';
    }
}

async function sendApprovalRequest(studentName, sessionId) {
    await PracticeCommon.sendApprovalRequest({
        telegramSender: telegramSender,
        studentName: studentName,
        sessionId: sessionId,
        moduleName: 'Module 2 - Finding Ideas Fast',
        studentSession: studentSession
    });
}

function showApprovalWaiting() {
    PracticeCommon.showApprovalWaiting();
}

function showApprovalRejected() {
    PracticeCommon.showApprovalRejected();
}

function showApprovalTimeout() {
    PracticeCommon.showApprovalTimeout();
}

function retryIdentification() {
    capturedPhotoData = null;
    PracticeCommon.retryIdentification(studentSession);
}

async function startApprovalPolling(sessionId) {
    await PracticeCommon.startApprovalPolling({
        telegramSender: telegramSender,
        sessionId: sessionId,
        onComplete: onApprovalComplete
    });
}

function onApprovalComplete(result) {
    if (result.approved) {
        studentSession.setApprovalStatus('approved');
        hideIdentificationModal();
        displayStudentInfo();
        loadProgress();
        loadQuestions();
        checkURLParameters();
        setupEventListeners();
        renderCurrentQuestion();
    } else if (result.timeout) {
        studentSession.clearSession();
        showApprovalTimeout();
    } else {
        studentSession.setApprovalStatus('rejected');
        studentSession.clearSession();
        showApprovalRejected();
    }
}

async function sendSessionStartToTelegram(studentName, photoDataUrl) {
    await PracticeCommon.sendSessionStartToTelegram({
        telegramSender: telegramSender,
        studentName: studentName,
        photoDataUrl: photoDataUrl,
        moduleName: 'Module 2 - Finding Ideas Fast'
    });
}

function dataURLtoBlob(dataURL) {
    return PracticeCommon.dataURLtoBlob(dataURL);
}

function endStudentSession() {
    const confirmed = confirm('Are you sure you want to end your session? Your progress will be saved.');

    if (confirmed) {
        studentSession.clearSession();
        capturedPhotoData = null;

        if (identificationCamera) {
            identificationCamera.stopCamera();
            identificationCamera = null;
        }

        location.reload();
    }
}

// ========== AUDIO RECORDING FUNCTIONS ==========

async function toggleRecording() {
    if (!audioRecorder) {
        await startRecording();
    } else if (audioRecorder.isRecording()) {
        await stopRecording();
    }
}

async function startRecording() {
    try {
        audioRecorder = new AudioRecorder();
        await audioRecorder.initialize();
        audioRecorder.startRecording();
        updateRecordingUI(true);
        startRecordingTimer();

        // Start live transcription
        window.liveSTT = PracticeCommon.startLiveSTT({
            liveAreaEl: 'liveTranscriptArea',
            liveTextEl: 'liveTranscriptText',
            manualAreaEl: 'manualAnswerArea'
        });
    } catch (error) {
        alert(`Recording error: ${error.message}`);
        audioRecorder = null;
    }
}

async function stopRecording() {
    // Stop live transcription and get result
    const liveTranscript = PracticeCommon.stopLiveSTT(
        window.liveSTT, 'liveTranscriptArea'
    );
    window.liveSTT = null;

    const recording = await audioRecorder.stopRecording();

    if (recording) {
        currentRecording = recording;
        displayAudioPreview(recording.blob);
    }

    stopRecordingTimer();
    updateRecordingUI(false);
    audioRecorder.cleanup();
    audioRecorder = null;

    // If live transcription produced content, use it directly
    if (liveTranscript) {
        showM2LiveTranscriptResult(liveTranscript);
    }
}

function updateRecordingUI(isRecording) {
    // Old record button UI - now handled by interview state machine
    // Kept for backward compatibility
    const recordBtn = document.getElementById('recordBtn');
    if (!recordBtn) return;
    const recordIcon = document.getElementById('recordIcon');
    const recordLabel = document.getElementById('recordLabel');

    if (isRecording) {
        recordBtn.classList.add('recording');
        if (recordIcon) recordIcon.textContent = '⏹️';
        if (recordLabel) recordLabel.textContent = 'Stop Recording';
    } else {
        recordBtn.classList.remove('recording');
        if (recordIcon) recordIcon.textContent = '🎤';
        if (recordLabel) recordLabel.textContent = 'Record Answer';
    }
}

function startRecordingTimer() {
    const timerDisplay = document.getElementById('recordTimer');
    if (!timerDisplay) return;
    timerDisplay.style.display = 'inline';
    timerDisplay.textContent = '0:00';

    let recSeconds = 0;
    recordingTimer = setInterval(() => {
        if (audioRecorder) {
            const duration = audioRecorder.getRecordingDuration();
            timerDisplay.textContent = formatDuration(duration);
            recSeconds = Math.floor(duration / 1000);
            updateRecordingTimerColor(recSeconds);
        }
    }, 1000);
}

function stopRecordingTimer() {
    if (recordingTimer) {
        clearInterval(recordingTimer);
        recordingTimer = null;
    }
    const timerDisplay = document.getElementById('recordTimer');
    if (timerDisplay) timerDisplay.style.display = 'none';
}

function formatDuration(milliseconds) {
    return PracticeCommon.formatDuration(milliseconds);
}

function displayAudioPreview(audioBlob) {
    const audioPlayer = document.getElementById('audioPlayer');
    const audioPreview = document.getElementById('audioPreview');

    audioPlayer.src = URL.createObjectURL(audioBlob);
    audioPreview.style.display = 'block';
}

function deleteRecording() {
    currentRecording = null;
    const audioPlayer = document.getElementById('audioPlayer');
    const audioPreview = document.getElementById('audioPreview');

    if (audioPlayer.src) {
        URL.revokeObjectURL(audioPlayer.src);
        audioPlayer.src = '';
    }

    audioPreview.style.display = 'none';
}

async function sendAudioToTelegram() {
    if (!telegramSender) {
        alert('Telegram not configured');
        return;
    }

    // mainRecording = first answer, currentRecording = follow-up answer
    const recording = mainRecording || currentRecording;

    const sendBtn = document.getElementById('sendTelegramBtn');
    const originalText = sendBtn.textContent;

    try {
        sendBtn.disabled = true;
        sendBtn.textContent = 'Sending...';

        const question = allQuestions[currentIndex];
        const questionText = typeof question === 'string' ? question : question.question;
        const category = typeof question === 'object' && question.category
            ? question.category
            : getCategoryFromIndex(currentIndex);
        const hasFollowUp = typeof question === 'object' && question.followUp;
        const sampleText = typeof question === 'object' ? question.sampleAnswer : null;

        const session = studentSession.getSession();
        const studentName = session ? session.name : 'Unknown Student';

        // Use stored transcripts from linear flow
        const mainText = mainTranscript || localStorage.getItem('m2_last_transcript_' + currentIndex) || '';
        const followUpText = followUpTranscript || localStorage.getItem('m2_followup_transcript_' + currentIndex) || '';
        const combinedTranscript = followUpText ? mainText + ' ' + followUpText : mainText;
        const mainWords = mainText ? mainText.trim().split(/\s+/).length : 0;
        const fuWords = followUpText ? followUpText.trim().split(/\s+/).length : 0;
        const totalWords = mainWords + fuWords;

        // Score
        let scores = null;
        let scoreText = 'Not scored';
        if (combinedTranscript && window.calculateBandScores) {
            scores = calculateBandScores(combinedTranscript, interviewSeconds, 'part1');
            scoreText = scores.overall + ' (F:' + scores.fluency +
                ' V:' + scores.vocabulary + ' G:' + scores.grammar +
                ' P:' + scores.pronunciation + ')';
        }

        // --- Message 1: Question + Answers + Score (short, fits in audio caption) ---
        let msg1 = '<b>📚 IELTS Part 1 — Q' + (currentIndex + 1) + '</b>\n' +
            '<b>Student:</b> ' + studentName + '\n' +
            '<b>Category:</b> ' + category + '\n\n' +
            '<b>Q:</b> ' + questionText + '\n\n' +
            '<b>📝 Answer</b> (' + mainWords + ' words):\n' +
            (mainText || 'No transcription') + '\n';

        if (hasFollowUp && followUpText) {
            msg1 += '\n<b>🔄 Follow-up:</b> ' + question.followUp + '\n' +
                '<b>📝 Answer</b> (' + fuWords + ' words):\n' +
                followUpText + '\n';
        }

        msg1 += '\n<b>📊 Band ' + (scores ? scores.overall : '—') + '</b>' +
            (scores ? '  F:' + scores.fluency + ' V:' + scores.vocabulary +
                ' G:' + scores.grammar + ' P:' + scores.pronunciation : '') +
            '\n<b>Total:</b> ' + totalWords + ' words';

        // --- Message 2: Detailed feedback ---
        let msg2 = '';
        if (scores) {
            msg2 = '<b>📋 Feedback — Q' + (currentIndex + 1) + ' (' + studentName + ')</b>\n\n';

            if (scores.details) {
                if (scores.details.strengths.length) {
                    msg2 += '<b>✅ Strengths:</b>\n';
                    scores.details.strengths.forEach(s => msg2 += '• ' + s + '\n');
                    msg2 += '\n';
                }
                if (scores.details.weaknesses.length) {
                    msg2 += '<b>⚠️ Areas to Improve:</b>\n';
                    scores.details.weaknesses.forEach(w => msg2 += '• ' + w + '\n');
                    msg2 += '\n';
                }
                if (scores.details.tips.length) {
                    msg2 += '<b>💡 Tips:</b>\n';
                    scores.details.tips.forEach(t => msg2 += '• ' + t + '\n');
                    msg2 += '\n';
                }
            }

            // Pronunciation mismatches
            if (sampleText && window.detectPronunciationMismatches) {
                const pronMismatches = detectPronunciationMismatches(combinedTranscript, sampleText);
                if (pronMismatches.length > 0) {
                    msg2 += '<b>🔊 Pronunciation Errors:</b>\n';
                    pronMismatches.forEach(m => {
                        msg2 += '• "' + m.heard + '" → should be "' + m.expected + '"';
                        if (m.feedback) msg2 += ' — ' + m.feedback;
                        msg2 += '\n';
                    });
                    msg2 += '\n';
                }
            }

            // Pronunciation challenges
            if (scores.pronunciationChallenges && scores.pronunciationChallenges.length > 0) {
                msg2 += '<b>🗣 Practice These Words:</b>\n';
                const shown = new Set();
                scores.pronunciationChallenges.forEach(c => {
                    if (!shown.has(c.category)) {
                        shown.add(c.category);
                        msg2 += '• <b>' + c.word + '</b> — ' + c.tip + '\n';
                    }
                });
                msg2 += '\n';
            }

            // Sample answer
            if (sampleText) {
                msg2 += '<b>📖 Sample Answer:</b>\n' +
                    '<i>' + sampleText + '</i>';
            }
        }

        // --- Send messages ---
        // Telegram caption limit: 1024 chars. Text message limit: 4096 chars.
        // Strategy: audio with short caption (msg1 truncated), then full text messages.

        if (session?.photoDataUrl) {
            const photoBlob = dataURLtoBlob(session.photoDataUrl);
            const photoCaption = '<b>📚 IELTS Part 1 — Q' + (currentIndex + 1) + '</b>\n' +
                '<b>Student:</b> ' + studentName;
            await telegramSender.sendPhoto(
                photoBlob,
                photoCaption,
                `${studentName}_q${currentIndex + 1}.jpg`
            );
        }

        // Always send the transcript as text first
        await telegramSender.sendTextMessage(msg1);

        // Send main answer recording if available
        if (mainRecording) {
            await telegramSender.sendAudio(
                mainRecording.blob,
                '<b>🎤 Main answer — Q' + (currentIndex + 1) + '</b>',
                `${studentName}_q${currentIndex + 1}.ogg`
            );
        }

        // Send follow-up recording if available
        if (currentRecording && currentRecording !== mainRecording) {
            await telegramSender.sendAudio(
                currentRecording.blob,
                '<b>🔄 Follow-up answer — Q' + (currentIndex + 1) + '</b>',
                `${studentName}_q${currentIndex + 1}_followup.ogg`
            );
        }

        // Send detailed feedback as second message (if it has content)
        if (msg2.length > 0) {
            // Split if over 4096 chars
            if (msg2.length <= 4096) {
                await telegramSender.sendTextMessage(msg2);
            } else {
                const mid = msg2.lastIndexOf('\n', 4000);
                await telegramSender.sendTextMessage(msg2.substring(0, mid));
                await telegramSender.sendTextMessage(msg2.substring(mid + 1));
            }
        }

        alert('Sent to nmnhut-it successfully!');
    } catch (error) {
        alert(`Failed to send: ${error.message}`);
    } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = originalText;
    }
}

async function downloadRecording() {
    if (!currentRecording) {
        alert('No recording available');
        return;
    }

    const downloadBtn = document.getElementById('downloadAudioBtn');
    const originalText = downloadBtn.textContent;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    try {
        downloadBtn.disabled = true;
        downloadBtn.textContent = isMobile ? '⏳ Preparing...' : '⏳ Converting...';

        const question = allQuestions[currentIndex];
        const questionText = typeof question === 'string' ? question : question.question;

        // Create filename from question (first 30 chars)
        const safeQuestion = questionText.replace(/[^a-zA-Z0-9\s]/g, '').trim().substring(0, 30).replace(/\s+/g, '_');
        const fileName = `IELTS_Q${currentIndex + 1}_${safeQuestion}`;

        // Get the input format from mimeType
        const inputFormat = currentRecording.mimeType.includes('webm') ? 'webm' :
                           currentRecording.mimeType.includes('ogg') ? 'ogg' : 'webm';

        // Use audio converter for MP3 download
        if (window.audioConverter) {
            await window.audioConverter.downloadAudio(currentRecording.blob, fileName, inputFormat);
        } else {
            // Fallback: download original format
            const url = URL.createObjectURL(currentRecording.blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${fileName}.${inputFormat}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        }

        downloadBtn.textContent = '✅ Downloaded!';
        setTimeout(() => {
            downloadBtn.textContent = originalText;
        }, 2000);
    } catch (error) {
        console.error('Download failed:', error);
        alert(`Download failed: ${error.message}`);
        downloadBtn.textContent = originalText;
    } finally {
        downloadBtn.disabled = false;
    }
}

// ============================================
// VOCABULARY SECTION
// ============================================

// Vocabulary Toggle
function toggleVocab() {
    // Vocab is now in a <details> element; load on open
    const detail = document.getElementById('vocabDetailSection');
    if (detail && detail.open) {
        loadVocabularyForCurrentQuestion();
    }
}

// Listen for details toggle to load vocab
document.addEventListener('DOMContentLoaded', () => {
    const vocabDetail = document.getElementById('vocabDetailSection');
    if (vocabDetail) {
        vocabDetail.addEventListener('toggle', () => {
            if (vocabDetail.open) loadVocabularyForCurrentQuestion();
        });
    }
});

// Question to vocabulary category mapping
const QUESTION_TO_VOCAB = {
    'music': 'hobbies',
    'movies': 'hobbies',
    'watching': 'hobbies',
    'weekends': 'hobbies',
    'hobbies': 'hobbies',
    'free time': 'hobbies',
    'studying': 'daily-life',
    'wake up': 'daily-life',
    'evenings': 'daily-life',
    'eating at': 'daily-life',
    'after work': 'daily-life',
    'after school': 'daily-life',
    'sports': 'sports',
    'outdoor activities': 'sports',
    'swimming': 'sports',
    'gym': 'sports',
    'exercise': 'sports',
    'social media': 'technology',
    'phone': 'technology',
    'TV shows': 'technology',
    'online shopping': 'shopping',
    'internet': 'technology',
    'family': 'people',
    'friends': 'people',
    'meeting new people': 'people',
    'childhood friends': 'people',
    'spending time': 'people',
    'studies': 'work',
    'learning': 'work',
    'subject': 'work',
    'job': 'work',
    'traveling': 'travel',
    'hometown': 'travel',
    'city or countryside': 'travel',
    'abroad': 'travel',
    'visit': 'travel',
    'cooking': 'food',
    'food': 'food',
    'eat out': 'food',
    'trying new foods': 'food',
    'traditional food': 'food',
    'weather': 'weather',
    'hot or cold': 'weather',
    'season': 'weather',
    'affect your mood': 'weather',
    'forecast': 'weather',
    'clothes': 'shopping',
    'wear': 'shopping',
    'fashion': 'shopping',
    'buy things': 'shopping',
    'shopping alone': 'shopping',
    'house or apartment': 'home',
    'favorite room': 'home',
    'decorating': 'home',
    'move': 'home',
    'living with': 'home',
    'museums': 'arts',
    'concert': 'arts',
    'photographs': 'arts',
    'drawing': 'arts',
    'painting': 'arts',
    'art': 'arts',
    'nature': 'nature',
    'plants': 'nature',
    'environment': 'nature',
    'mountains or beaches': 'nature',
    'wildlife': 'nature',
    'travel to work': 'transport',
    'public transportation': 'transport',
    'train': 'transport',
    'journeys': 'transport',
    'drive': 'transport',
    'healthy lifestyle': 'health',
    'sleep': 'health',
    'vitamins': 'health',
    'supplements': 'health',
    'relax': 'health',
    'stressed': 'health',
    'festival': 'celebrations',
    'celebration': 'celebrations',
    'birthday': 'celebrations',
    'holidays': 'celebrations',
    'gifts': 'celebrations',
    'pets': 'pets',
    'animals': 'pets',
    'languages': 'language',
    'learning languages': 'language',
    'English': 'language',
    'writing': 'language',
    'texting or calling': 'language'
};

// Get vocabulary category for current question
function getVocabCategoryForQuestion(questionText) {
    if (!questionText) return null;

    const lowerQuestion = questionText.toLowerCase();
    for (const [keyword, category] of Object.entries(QUESTION_TO_VOCAB)) {
        if (lowerQuestion.includes(keyword)) {
            return category;
        }
    }
    return null;
}

// Load vocabulary for current question
async function loadVocabularyForCurrentQuestion() {
    const vocabList = document.getElementById('vocabList');
    const vocabLoading = document.getElementById('vocabLoading');

    const currentQuestion = allQuestions[currentIndex];
    if (!currentQuestion) return;

    const category = getVocabCategoryForQuestion(currentQuestion.question);
    if (!category) {
        vocabList.innerHTML = '<p style="color: #6b7280; text-align: center;">No vocabulary available for this question.</p>';
        return;
    }

    vocabLoading.style.display = 'block';
    vocabList.innerHTML = '';

    try {
        const response = await fetch(`data/module2-vocab-${category}.json`);
        if (!response.ok) throw new Error('Failed to load vocabulary');

        const vocabulary = await response.json();
        vocabLoading.style.display = 'none';

        if (vocabulary.length === 0) {
            vocabList.innerHTML = '<p style="color: #6b7280;">No vocabulary found.</p>';
            return;
        }

        vocabList.innerHTML = vocabulary.map(item => `
            <div class="vocab-item">
                <div class="vocab-header">
                    <span class="vocab-word">${item.english}</span>
                    <span class="vocab-type">${item.type}</span>
                </div>
                <div class="vocab-pronunciation">${item.pronunciation}</div>
                <div class="vocab-meaning">${item.vietnamese}</div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading vocabulary:', error);
        vocabLoading.style.display = 'none';
        vocabList.innerHTML = '<p style="color: #ef4444;">Error loading vocabulary. Please try again.</p>';
    }
}

// Show/hide vocabulary section based on question
function updateVocabularySection() {
    const vocabSection = document.getElementById('vocabDetailSection');
    if (!vocabSection) return;
    const currentQuestion = allQuestions[currentIndex];

    if (currentQuestion && currentTechnique === '5w1h') {
        const category = getVocabCategoryForQuestion(
            typeof currentQuestion === 'string'
                ? currentQuestion : currentQuestion.question
        );
        vocabSection.style.display = category ? 'block' : 'none';
    } else {
        vocabSection.style.display = 'none';
    }
}

// ========== SAMPLE ANSWER PLAYBACK (Using Pre-generated MP3s) ==========

async function playSampleAnswer() {
    const question = allQuestions[currentIndex];
    if (!question) {
        console.warn('No question available');
        return;
    }

    // Initialize sample audio service if needed
    if (!window.sampleAudioService) {
        console.error('Sample audio service not loaded');
        return;
    }

    const listenBtn = document.getElementById('btnListenSample');
    const stopBtn = document.getElementById('btnStopSample');

    try {
        if (listenBtn) listenBtn.style.display = 'none';
        if (stopBtn) {
            stopBtn.style.display = 'inline-block';
            stopBtn.textContent = '⏳ Loading...';
            stopBtn.disabled = true;
        }

        isTTSPlaying = true;

        // Use pre-generated MP3 file for sample answer
        const success = await window.sampleAudioService.playSampleAnswer(question.question, {
            onStart: () => {
                console.log('Playing sample answer MP3');
                if (stopBtn) {
                    stopBtn.textContent = '⏹️ Stop';
                    stopBtn.disabled = false;
                }
            },
            onEnd: () => {
                isTTSPlaying = false;
                if (stopBtn) stopBtn.style.display = 'none';
                if (listenBtn) {
                    listenBtn.style.display = 'inline-block';
                    listenBtn.disabled = false;
                }
            },
            onError: (error) => {
                console.error('Audio playback error:', error);
                isTTSPlaying = false;
                if (stopBtn) stopBtn.style.display = 'none';
                if (listenBtn) {
                    listenBtn.style.display = 'inline-block';
                    listenBtn.disabled = false;
                }
            }
        });

        if (!success) {
            throw new Error('No audio file available for this question');
        }

    } catch (error) {
        console.error('Failed to play sample audio:', error);
        isTTSPlaying = false;
        if (stopBtn) stopBtn.style.display = 'none';
        if (listenBtn) {
            listenBtn.style.display = 'inline-block';
            listenBtn.disabled = false;
        }
    }
}

function stopSampleAudio() {
    if (window.sampleAudioService) {
        window.sampleAudioService.stop();
    }

    isTTSPlaying = false;

    const listenBtn = document.getElementById('btnListenSample');
    const stopBtn = document.getElementById('btnStopSample');

    if (stopBtn) stopBtn.style.display = 'none';
    if (listenBtn) listenBtn.style.display = 'inline-block';
}

// ========== TRANSCRIPTION ==========

// Display live transcript result and auto-score for module 2
function showM2LiveTranscriptResult(transcript) {
    PracticeCommon.showTranscriptResult(transcript, {
        areaEl: 'm2Transcription',
        textEl: 'm2TranscriptionText',
        wordcountEl: 'm2TranscriptionWords',
        storagePrefix: 'm2_last_transcript_',
        index: currentIndex,
        onAfterDisplay: function(t, idx) {
            runM2BandScoring(t, idx);
            showM2TryAgainButton();
        }
    });
}

// Fallback: show manual input area for typing answer
async function transcribeM2Recording() {
    if (!currentRecording) {
        alert('No recording available');
        return;
    }

    document.getElementById('manualAnswerArea').classList.remove('hidden');
}

// Submit manually typed answer for module 2
function submitM2ManualAnswer() {
    PracticeCommon.submitManualAnswer({
        textareaId: 'manualAnswerInput',
        manualAreaEl: 'manualAnswerArea',
        areaEl: 'm2Transcription',
        textEl: 'm2TranscriptionText',
        wordcountEl: 'm2TranscriptionWords',
        storagePrefix: 'm2_last_transcript_',
        index: currentIndex,
        onAfterDisplay: function(t, idx) {
            runM2BandScoring(t, idx);
            showM2TryAgainButton();
        }
    });
}

// ========== PHASE 4: TRY AGAIN & ATTEMPT TRACKING (Module 2) ==========

/** Get attempt count for a question index */
function getM2AttemptCount(questionIndex) {
    return PracticeCommon.getAttemptCount('m2_attempts_', questionIndex);
}

/** Increment attempt counter */
function incrementM2Attempt(questionIndex) {
    return PracticeCommon.incrementAttempt('m2_attempts_', questionIndex);
}

/** Update attempt badge next to question header */
function updateM2AttemptBadge(questionIndex) {
    PracticeCommon.updateAttemptBadge({
        badgeId: 'attemptBadge',
        headerId: 'questionNum',
        prefix: 'm2_attempts_',
        index: questionIndex
    });
}

/** Show Try Again button in audio preview */
function showM2TryAgainButton() {
    PracticeCommon.showTryAgainButton({
        btnId: 'm2TryAgainBtn',
        containerEl: 'audioPreview',
        btnClass: 'btn-download-audio',
        onTryAgain: tryAgainM2
    });
}

/** Reset for a new attempt, keep question visible */
function tryAgainM2() {
    PracticeCommon.tryAgain({
        prefix: 'm2_attempts_',
        index: currentIndex,
        updateBadge: function() { updateM2AttemptBadge(currentIndex); },
        onReset: function() {
            currentRecording = null;
            const audioPlayer = document.getElementById('audioPlayer');
            if (audioPlayer.src) {
                URL.revokeObjectURL(audioPlayer.src);
                audioPlayer.src = '';
            }
        },
        resetElements: [
            { id: 'audioPreview', action: 'hide' },
            { id: 'm2Transcription', action: 'hideClass' }
        ],
        scoreDisplayEl: 'm2ScoreDisplay',
        tryAgainBtnId: 'm2TryAgainBtn'
    });
}

// ========== PHASE 5: BAND SCORING (Module 2) ==========

/** Run band scoring for Module 2 */
function runM2BandScoring(transcript, questionIndex) {
    PracticeCommon.runBandScoring(transcript, questionIndex, {
        moduleId: 'module2',
        scoreDisplayEl: 'm2ScoreDisplay',
        attemptPrefix: 'm2_attempts_',
        transcriptPrefix: 'm2_last_transcript_',
        getQuestionId: function(idx) {
            return getQuestionId(allQuestions[idx], idx);
        }
    });
}
