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
    console.log('Student has active session:', hasSession);

    if (hasSession) {
        // Student is authenticated, ensure modal is hidden and load content
        console.log('Hiding identification modal - student authenticated');
        hideIdentificationModal();
        displayStudentInfo();
        loadProgress();
        loadQuestions();
        checkURLParameters();
        setupEventListeners();
        renderCurrentQuestion();
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
    if (typeof botToken !== 'undefined' && typeof groupId !== 'undefined') {
        telegramSender = new TelegramSender(botToken, groupId);
    } else {
        console.warn('Telegram credentials not found');
    }
}

function showIdentificationModal() {
    const modal = document.getElementById('identificationModal');
    const overlay = document.getElementById('identificationOverlay');
    const mainContainer = document.getElementById('mainContainer');

    if (modal) modal.classList.add('active');
    if (overlay) overlay.classList.add('active');
    if (mainContainer) mainContainer.classList.add('hidden');
}

function hideIdentificationModal() {
    const modal = document.getElementById('identificationModal');
    const overlay = document.getElementById('identificationOverlay');
    const mainContainer = document.getElementById('mainContainer');

    if (modal) modal.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
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
        if (e.key === 'f') getAIFeedback();
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

    const question = allQuestions[currentIndex];
    const questionText = typeof question === 'string' ? question : question.question;
    const category = typeof question === 'object' && question.category
        ? question.category
        : getCategoryFromIndex(currentIndex);

    // Update UI
    document.getElementById('questionNum').textContent = `Question ${currentIndex + 1}`;
    document.getElementById('questionText').textContent = questionText;
    document.getElementById('questionCategory').textContent = category;

    // Update favorite button
    const favBtn = document.getElementById('favBtn');
    const questionId = getQuestionId(question, currentIndex);
    favBtn.textContent = favorites.has(questionId) ? '★' : '☆';
    favBtn.classList.toggle('active', favorites.has(questionId));

    // Render form
    renderForm();

    // Handle sample answers (including alternatives)
    if (typeof question === 'object' && question.sampleAnswer) {
        document.getElementById('sampleSection').style.display = 'block';
        renderSampleAnswers(question);
    } else {
        document.getElementById('sampleSection').style.display = 'none';
    }

    // Update vocabulary section
    updateVocabularySection();

    // Hide feedback
    document.getElementById('feedbackSection').style.display = 'none';

    // Reset sample expansion
    if (sampleExpanded) toggleSample();

    updateProgress();
    updateURLParameter(currentIndex + 1);
}

// Render form fields
function renderForm() {
    const config = TECHNIQUE_CONFIG[currentTechnique];
    if (!config) return;

    const container = document.getElementById('formContainer');
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
    const content = document.getElementById('sampleContent');
    const icon = document.getElementById('sampleToggleIcon');

    sampleExpanded = !sampleExpanded;
    content.style.display = sampleExpanded ? 'block' : 'none';
    icon.textContent = sampleExpanded ? '▼' : '▶';
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

// AI Feedback
async function getAIFeedback() {
    const previewBox = document.getElementById('previewBox');
    const answer = previewBox.textContent;

    if (!answer || answer.length < 10 || answer === 'Start typing to see your answer...') {
        alert('Please fill in at least 2-3 fields before getting feedback');
        return;
    }

    if (!window.ieltsCoachAI?.hasApiKey()) {
        const setup = confirm('You need a free Gemini API key to get AI feedback. Set it up now?');
        if (setup) window.location.href = 'ielts-speaking-lessons.html#api-key';
        return;
    }

    const question = allQuestions[currentIndex];
    const questionText = typeof question === 'string' ? question : question.question;

    const feedbackSection = document.getElementById('feedbackSection');
    const feedbackContent = document.getElementById('feedbackContent');

    feedbackSection.style.display = 'block';
    feedbackContent.textContent = 'Getting AI feedback...';

    try {
        const feedback = await window.ieltsCoachAI.feedbackOnIdeas(questionText, answer);
        feedbackContent.innerHTML = feedback.replace(/\n/g, '<br>');

        // Mark as completed
        const questionId = getQuestionId(question, currentIndex);
        completed.add(questionId);
        saveProgress();
    } catch (error) {
        feedbackContent.textContent = 'Error: ' + error.message;
    }
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
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
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

        hideIdentificationModal();
        displayStudentInfo();
        loadProgress();
        loadQuestions();
        checkURLParameters();
        setupEventListeners();
        renderCurrentQuestion();
    } catch (error) {
        alert(`Failed to start session: ${error.message}`);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Start Practice Session';
    }
}

async function sendSessionStartToTelegram(studentName, photoDataUrl) {
    if (!telegramSender) return;

    try {
        const photoBlob = dataURLtoBlob(photoDataUrl);
        const caption = `<b>📚 New Practice Session Started</b>\n\n` +
                       `<b>Student:</b> ${studentName}\n` +
                       `<b>Module:</b> Module 2 - Finding Ideas Fast\n` +
                       `<b>Time:</b> ${new Date().toLocaleString()}`;

        await telegramSender.sendPhoto(photoBlob, caption, `${studentName}_session.jpg`);
    } catch (error) {
        console.error('Failed to send session start to Telegram:', error);
    }
}

function dataURLtoBlob(dataURL) {
    const parts = dataURL.split(',');
    const mimeMatch = parts[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
    const binary = atob(parts[1]);
    const array = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
        array[i] = binary.charCodeAt(i);
    }

    return new Blob([array], { type: mime });
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
    } catch (error) {
        alert(`Recording error: ${error.message}`);
        audioRecorder = null;
    }
}

async function stopRecording() {
    const recording = await audioRecorder.stopRecording();

    if (recording) {
        currentRecording = recording;
        displayAudioPreview(recording.blob);
    }

    stopRecordingTimer();
    updateRecordingUI(false);
    audioRecorder.cleanup();
    audioRecorder = null;
}

function updateRecordingUI(isRecording) {
    const recordBtn = document.getElementById('recordBtn');
    const recordIcon = document.getElementById('recordIcon');
    const recordLabel = document.getElementById('recordLabel');

    if (isRecording) {
        recordBtn.classList.add('recording');
        recordIcon.textContent = '⏹️';
        recordLabel.textContent = 'Stop Recording';
    } else {
        recordBtn.classList.remove('recording');
        recordIcon.textContent = '🎤';
        recordLabel.textContent = 'Record Answer';
    }
}

function startRecordingTimer() {
    const timerDisplay = document.getElementById('recordTimer');
    timerDisplay.style.display = 'inline';
    timerDisplay.textContent = '0:00';

    recordingTimer = setInterval(() => {
        if (audioRecorder) {
            const duration = audioRecorder.getRecordingDuration();
            timerDisplay.textContent = formatDuration(duration);
        }
    }, 1000);
}

function stopRecordingTimer() {
    if (recordingTimer) {
        clearInterval(recordingTimer);
        recordingTimer = null;
    }
    document.getElementById('recordTimer').style.display = 'none';
}

function formatDuration(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
    if (!currentRecording) {
        alert('No recording available');
        return;
    }

    if (!telegramSender) {
        alert('Telegram not configured');
        return;
    }

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

        const session = studentSession.getSession();
        const studentName = session ? session.name : 'Unknown Student';

        const caption = telegramSender.formatAudioCaption(
            questionText,
            currentIndex + 1,
            category,
            currentRecording.duration,
            studentName
        );

        if (session?.photoDataUrl) {
            const photoBlob = dataURLtoBlob(session.photoDataUrl);
            await telegramSender.sendPhoto(
                photoBlob,
                caption,
                `${studentName}_q${currentIndex + 1}.jpg`
            );
        }

        await telegramSender.sendAudio(
            currentRecording.blob,
            caption,
            `${studentName}_q${currentIndex + 1}.ogg`
        );

        alert('✅ Sent to nmnhut-it successfully!');
        deleteRecording();
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
    const vocabContent = document.getElementById('vocabContent');
    const vocabToggleIcon = document.getElementById('vocabToggleIcon');

    if (vocabContent.style.display === 'none') {
        vocabContent.style.display = 'block';
        vocabToggleIcon.textContent = '▼';
        loadVocabularyForCurrentQuestion();
    } else {
        vocabContent.style.display = 'none';
        vocabToggleIcon.textContent = '▶';
    }
}

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
    const vocabSection = document.getElementById('vocabSection');
    const currentQuestion = allQuestions[currentIndex];

    if (currentQuestion && currentTechnique === '5w1h') {
        const category = getVocabCategoryForQuestion(currentQuestion.question);
        if (category) {
            vocabSection.style.display = 'block';
        } else {
            vocabSection.style.display = 'none';
        }
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
