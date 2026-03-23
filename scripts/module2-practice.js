/**
 * Module 2 Practice Interface - Main JavaScript
 * Handles all UI interactions, question rendering, and form management
 */

// Global state
let practiceInterface;
let currentQuestion;
let currentTechnique = '5w1h';
let currentSection = 'm2_practice2';
let currentSectionType = 'practice';
let allQuestions = [];
let currentBrowserView = 'grid';
let currentBrowserFilter = 'all';

/**
 * Initialize the practice interface when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    initializePracticeInterface();
});

function initializePracticeInterface() {
    // Check if IELTS_LESSONS is loaded
    if (!window.IELTS_LESSONS?.module2) {
        console.error('IELTS_LESSONS not loaded yet. Retrying...');
        setTimeout(initializePracticeInterface, 100);
        return;
    }

    allQuestions = getQuestionsForTechnique(currentTechnique);

    if (!allQuestions || allQuestions.length === 0) {
        console.error('No questions loaded for technique:', currentTechnique);
        alert('Error: No questions found. Please check that ieltsLessons.js is loaded correctly.');
        return;
    }

    practiceInterface = new PracticeInterface({
        moduleId: 'module2',
        questions: allQuestions,
        onAnswerSubmit: handleAnswerSubmit,
        onQuestionChange: handleQuestionChange
    });

    // Override renderQuestion to use our custom renderer
    practiceInterface.renderQuestion = () => renderCurrentQuestion();

    // Setup event listeners first
    setupEventListeners();

    // Render the form
    renderTechniqueForm(currentTechnique);

    // Initial render
    renderCurrentQuestion();
    updateProgress();
    populateQuestionBrowser();

    // Check API key
    if (!window.ieltsCoachAI?.hasApiKey()) {
        showApiKeyReminder();
    }
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Mode buttons
    document.querySelectorAll('.mode-button').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.mode-button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            practiceInterface.setMode(btn.dataset.mode);
        });
    });

    // Section filter
    const sectionFilter = document.getElementById('sectionFilter');
    if (sectionFilter) {
        sectionFilter.addEventListener('change', (e) => switchSection(e.target.value));
    }

    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => filterByCategory(e.target.value));
    }

    // Favorite button
    const favoriteBtn = document.getElementById('favoriteButton');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', toggleFavorite);
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

/**
 * Handle keyboard shortcuts
 */
function handleKeyboardShortcuts(e) {
    // Ignore if typing in an input field
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch(e.key.toLowerCase()) {
        case 'n':
            nextQuestion();
            break;
        case 'p':
            previousQuestion();
            break;
        case 's':
            toggleSampleAnswer();
            break;
        case 'f':
            getAIFeedback();
            break;
    }
}

// ========== SECTION AND TECHNIQUE MANAGEMENT ==========

function switchSection(sectionId) {
    currentSection = sectionId;
    currentSectionType = SECTION_TYPES[sectionId] || 'practice';

    switch(currentSectionType) {
        case 'audio_lesson':
            renderAudioLesson(sectionId);
            break;
        case 'practice':
            const techniqueId = SECTION_TO_TECHNIQUE[sectionId] || '5w1h';
            switchTechnique(techniqueId, sectionId);
            break;
        case 'interactive_guide':
            renderInteractiveGuide(sectionId);
            break;
        case 'ai_conversation':
            renderAIConversation(sectionId);
            break;
    }

    // Show/hide category filter (only for 5w1h practice)
    const categorySection = document.getElementById('categoryFilterSection');
    if (categorySection) {
        categorySection.style.display = sectionId === 'm2_practice2' ? 'block' : 'none';
    }
}

function switchTechnique(techniqueId, sectionId = null) {
    currentTechnique = techniqueId;

    // Show practice interface elements
    showPracticeElements();

    // Load questions for this technique/section
    allQuestions = getQuestionsForTechnique(techniqueId, sectionId);

    // Reinitialize practice interface
    practiceInterface = new PracticeInterface({
        moduleId: 'module2_' + (sectionId || techniqueId),
        questions: allQuestions,
        onAnswerSubmit: handleAnswerSubmit,
        onQuestionChange: handleQuestionChange
    });

    practiceInterface.renderQuestion = () => renderCurrentQuestion();

    // Render the form for this technique
    renderTechniqueForm(techniqueId);

    // Show/hide category filter
    const categorySection = document.getElementById('categoryFilterSection');
    if (categorySection) {
        categorySection.style.display = (sectionId === 'm2_practice2') ? 'block' : 'none';
    }

    // Render first question
    renderCurrentQuestion();
    updateProgress();
    populateQuestionBrowser();
}

function showPracticeElements() {
    const elements = [
        '.question-card',
        '.answer-section',
        '.sample-answer-card',
        '.navigation-buttons',
        '.action-buttons',
        '.compact-progress'
    ];

    elements.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) el.style.display = selector === '.compact-progress' ? 'flex' : 'block';
    });

    const questionBrowserPanel = document.getElementById('questionBrowserPanel');
    if (questionBrowserPanel) questionBrowserPanel.style.display = 'block';

    const quickNavBar = document.getElementById('quickNavBar');
    if (quickNavBar) quickNavBar.style.display = 'flex';
}

function hidePracticeElements() {
    const elements = [
        '.question-card',
        '.answer-section',
        '.sample-answer-card',
        '.navigation-buttons',
        '.action-buttons',
        '.compact-progress'
    ];

    elements.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) el.style.display = 'none';
    });

    const feedbackSection = document.getElementById('feedbackSection');
    if (feedbackSection) feedbackSection.style.display = 'none';

    const questionBrowserPanel = document.getElementById('questionBrowserPanel');
    if (questionBrowserPanel) questionBrowserPanel.style.display = 'none';

    const quickNavBar = document.getElementById('quickNavBar');
    if (quickNavBar) quickNavBar.style.display = 'none';
}

// ========== FORM RENDERING ==========

function renderTechniqueForm(techniqueId) {
    const config = techniqueId === 'all' ? TECHNIQUE_CONFIG['5w1h'] : TECHNIQUE_CONFIG[techniqueId];
    if (!config) return;

    const container = document.getElementById('techniqueFormContainer');
    container.innerHTML = '';
    container.className = 'technique-form';

    // Update form title and hint
    document.getElementById('formTitle').textContent = `📝 Your Answer (${config.name})`;
    document.getElementById('formHint').textContent = `Fill in the ${config.name} elements to build your answer`;

    // Render form fields
    config.fields.forEach(field => {
        const fieldDiv = document.createElement('div');
        fieldDiv.className = 'form-field';

        fieldDiv.innerHTML = `
            <label class="field-label">${field.icon} ${field.label}</label>
            <input
                type="text"
                id="input-${field.id}"
                class="field-input"
                placeholder="${field.placeholder}"
                aria-label="${field.label}"
            >
            <span class="field-hint">${field.hint}</span>
        `;

        container.appendChild(fieldDiv);
    });

    // Setup real-time answer generation
    setupAnswerGeneration();
}

// ========== QUESTION RENDERING ==========

function renderCurrentQuestion() {
    if (!practiceInterface) {
        console.error('Practice interface not initialized');
        return;
    }

    currentQuestion = practiceInterface.getCurrentQuestion();

    if (!currentQuestion) {
        console.error('No current question found');
        return;
    }

    const index = practiceInterface.currentIndex;
    const total = practiceInterface.questions.length;

    // Handle both string and object formats
    const questionText = typeof currentQuestion === 'string' ? currentQuestion : currentQuestion.question;
    const sampleAnswer = typeof currentQuestion === 'object' ? currentQuestion.sampleAnswer : null;
    const category = typeof currentQuestion === 'object' && currentQuestion.category
        ? currentQuestion.category
        : getCategoryFromIndex(index);

    // Update UI
    const questionNumberEl = document.getElementById('questionNumber');
    const questionTextEl = document.getElementById('questionText');
    const questionCategoryEl = document.getElementById('questionCategory');

    if (questionNumberEl) questionNumberEl.textContent = `Question ${index + 1}/${total}`;
    if (questionTextEl) questionTextEl.textContent = questionText;
    if (questionCategoryEl) questionCategoryEl.textContent = category;

    // Update sample answer
    if (sampleAnswer) {
        renderSampleAnswer(sampleAnswer);
    } else {
        const sampleCard = document.querySelector('.sample-answer-card');
        if (sampleCard) sampleCard.style.display = 'none';
    }

    // Reset UI state
    resetQuestionUI();

    // Update favorite button
    updateFavoriteButton();

    updateProgress();
}

function renderSampleAnswer(sampleAnswer) {
    document.getElementById('sampleAnswerText').textContent = sampleAnswer;

    const config = currentTechnique === 'all' ? TECHNIQUE_CONFIG['5w1h'] : TECHNIQUE_CONFIG[currentTechnique];
    let breakdown = {};

    // Use technique-specific breakdown if available
    if (typeof currentQuestion === 'object' && config.breakdownKey && currentQuestion[config.breakdownKey]) {
        breakdown = currentQuestion[config.breakdownKey];
    } else {
        // Fall back to parsing for 5W1H
        const questionText = typeof currentQuestion === 'string' ? currentQuestion : currentQuestion.question;
        breakdown = parse5W1HFromSampleAnswer(sampleAnswer, questionText);
    }

    renderBreakdown(breakdown);

    // Show sample answer card
    const sampleCard = document.querySelector('.sample-answer-card');
    if (sampleCard) sampleCard.style.display = 'block';
}

function renderBreakdown(breakdown) {
    const grid = document.getElementById('breakdownGrid');
    grid.innerHTML = '';

    const config = currentTechnique === 'all' ? TECHNIQUE_CONFIG['5w1h'] : TECHNIQUE_CONFIG[currentTechnique];
    if (!config) return;

    // Update breakdown title
    const breakdownTitle = document.getElementById('breakdownTitle');
    if (breakdownTitle) {
        breakdownTitle.textContent = `📋 ${config.name} Elements Used:`;
    }

    // Render breakdown items
    config.fields.forEach(field => {
        const value = breakdown[field.id];
        if (value) {
            const div = document.createElement('div');
            div.className = 'breakdown-item';
            div.innerHTML = `
                <span class="breakdown-label">${field.icon} ${field.label.split('(')[0].trim()}:</span>
                <span class="breakdown-value">${value}</span>
            `;
            grid.appendChild(div);
        }
    });

    if (grid.children.length === 0) {
        grid.innerHTML = `<p><em>No ${config.name} elements identified in sample</em></p>`;
    }
}

function resetQuestionUI() {
    // Reset sample answer display
    const sampleBox = document.getElementById('sampleAnswerBox');
    const toggleIcon = document.querySelector('.toggle-icon');
    const toggleText = document.querySelector('.toggle-text');

    if (sampleBox) sampleBox.style.display = 'none';
    if (toggleIcon) toggleIcon.textContent = '▼';
    if (toggleText) toggleText.textContent = '💡 Compare with Band 7-7.5 Sample Answer';

    // Clear form fields
    const config = currentTechnique === 'all' ? TECHNIQUE_CONFIG['5w1h'] : TECHNIQUE_CONFIG[currentTechnique];
    if (config) {
        config.fields.forEach(field => {
            const input = document.getElementById(`input-${field.id}`);
            if (input) input.value = '';
        });
    }

    // Reset preview
    document.getElementById('generatedAnswer').innerHTML = '<em>Start filling in the fields above to see your answer...</em>';
    document.getElementById('feedbackSection').style.display = 'none';

    // Setup answer generation
    setupAnswerGeneration();
}

function updateFavoriteButton() {
    const questionId = practiceInterface.getQuestionId(currentQuestion, practiceInterface.currentIndex);
    const isFav = practiceInterface.isFavorite(questionId);
    const favBtn = document.getElementById('favoriteButton');
    if (favBtn) {
        favBtn.textContent = isFav ? '★' : '☆';
        favBtn.classList.toggle('active', isFav);
    }
}

// ========== ANSWER GENERATION ==========

function setupAnswerGeneration() {
    const config = currentTechnique === 'all' ? TECHNIQUE_CONFIG['5w1h'] : TECHNIQUE_CONFIG[currentTechnique];
    if (!config) return;

    config.fields.forEach(field => {
        const input = document.getElementById(`input-${field.id}`);
        if (input) {
            // Remove old listeners by cloning
            const newInput = input.cloneNode(true);
            input.parentNode.replaceChild(newInput, input);
            // Add new listener
            newInput.addEventListener('input', updateGeneratedAnswer);
        }
    });
}

function updateGeneratedAnswer() {
    const answer = generateFullAnswer();
    const previewDiv = document.getElementById('generatedAnswer');

    if (answer) {
        previewDiv.innerHTML = answer;
        previewDiv.style.fontStyle = 'normal';
    } else {
        previewDiv.innerHTML = '<em>Start filling in the fields above to see your answer...</em>';
    }

    updateElementStats();
}

function generateFullAnswer() {
    const config = currentTechnique === 'all' ? TECHNIQUE_CONFIG['5w1h'] : TECHNIQUE_CONFIG[currentTechnique];
    if (!config) return '';

    // Special handling for 5W1H
    if (currentTechnique === '5w1h' || currentTechnique === 'all') {
        return generate5W1HAnswer();
    }

    // Generic generation for other techniques
    const parts = [];
    config.fields.forEach(field => {
        const input = document.getElementById(`input-${field.id}`);
        const value = input?.value.trim();
        if (value) {
            parts.push(value);
        }
    });

    return parts.join(' ');
}

function generate5W1HAnswer() {
    const what = document.getElementById('input-what')?.value.trim() || '';
    const when = document.getElementById('input-when')?.value.trim() || '';
    const where = document.getElementById('input-where')?.value.trim() || '';
    const who = document.getElementById('input-who')?.value.trim() || '';
    const why = document.getElementById('input-why')?.value.trim() || '';
    const how = document.getElementById('input-how')?.value.trim() || '';

    if (!what && !when && !where && !who && !why && !how) return '';

    let sentence = '';

    // Start with WHAT
    if (what) {
        const lowerWhat = what.toLowerCase();
        if (lowerWhat.startsWith('enjoy') || lowerWhat.startsWith('like') ||
            lowerWhat.startsWith('love') || lowerWhat.startsWith('prefer') ||
            lowerWhat.startsWith('really') || lowerWhat.startsWith('absolutely')) {
            sentence = `I ${what}`;
        } else {
            sentence = `I enjoy ${what}`;
        }
    }

    // Add WHEN
    if (when) {
        const lowerWhen = when.toLowerCase();
        if (lowerWhen.startsWith('in ') || lowerWhen.startsWith('on ') ||
            lowerWhen.startsWith('during ') || lowerWhen.startsWith('every ') ||
            lowerWhen.startsWith('usually') || lowerWhen.startsWith('typically')) {
            sentence += `, ${when}`;
        } else {
            sentence += `, usually ${when}`;
        }
    }

    // Add WHERE
    if (where) {
        const lowerWhere = where.toLowerCase();
        if (lowerWhere.startsWith('at ') || lowerWhere.startsWith('in ') || lowerWhere.startsWith('near ')) {
            sentence += ` ${where}`;
        } else {
            sentence += ` at ${where}`;
        }
    }

    // Add WHO
    if (who) {
        const lowerWho = who.toLowerCase();
        if (lowerWho.startsWith('with ') || lowerWho.startsWith('alone') || lowerWho.startsWith('by myself')) {
            sentence += ` ${who}`;
        } else {
            sentence += ` with ${who}`;
        }
    }

    // Close first sentence
    if (sentence) sentence += '.';

    // Add WHY
    if (why) {
        const lowerWhy = why.toLowerCase();
        if (lowerWhy.startsWith('because') || lowerWhy.startsWith('since') ||
            lowerWhy.startsWith('as ') || lowerWhy.startsWith('it ') || lowerWhy.startsWith('i ')) {
            sentence += ` ${why.charAt(0).toUpperCase() + why.slice(1)}`;
        } else {
            sentence += ` I do this because ${why}`;
        }
    }

    // Add HOW
    if (how) {
        const lowerHow = how.toLowerCase();
        if (lowerHow.startsWith('it makes') || lowerHow.startsWith('which makes') || lowerHow.startsWith('i feel')) {
            sentence += `, ${how}`;
        } else {
            sentence += `, which makes me feel ${how}`;
        }
    }

    // Ensure proper ending
    if (sentence && !sentence.endsWith('.') && !sentence.endsWith('!') && !sentence.endsWith('?')) {
        sentence += '.';
    }

    return sentence;
}

function updateElementStats() {
    const config = currentTechnique === 'all' ? TECHNIQUE_CONFIG['5w1h'] : TECHNIQUE_CONFIG[currentTechnique];
    if (!config) return;

    let count = 0;
    const total = config.fields.length;

    config.fields.forEach(field => {
        const input = document.getElementById(`input-${field.id}`);
        if (input?.value.trim()) count++;
    });

    const statsBadge = document.getElementById('previewStats');
    if (statsBadge) {
        statsBadge.innerHTML = `<span class="stat-badge">${count}/${total} elements used</span>`;

        const badge = statsBadge.querySelector('.stat-badge');
        const percentage = (count / total) * 100;

        if (percentage >= 70) {
            badge.style.background = '#4caf50';
            badge.style.color = 'white';
        } else if (percentage >= 40) {
            badge.style.background = '#ff9800';
            badge.style.color = 'white';
        } else {
            badge.style.background = '#e0e0e0';
            badge.style.color = '#666';
        }
    }
}

// ========== PARSING UTILITIES ==========

function parse5W1HFromSampleAnswer(sampleText, questionText) {
    const breakdown = {
        what: '',
        when: '',
        where: '',
        who: '',
        why: '',
        how: ''
    };

    const text = sampleText.toLowerCase();

    // WHAT - at the start or after "I"
    const whatMatch = sampleText.match(/(?:I (?:really )?(?:enjoy|love|like|prefer) )([^,\.]+?)(?:,|\.| when| where| because)/i);
    if (whatMatch) breakdown.what = whatMatch[1].trim();

    // WHEN - time expressions
    const whenPatterns = ['in the evening', 'on weekends', 'every day', 'usually', 'typically', 'during', 'after', 'before'];
    for (const pattern of whenPatterns) {
        if (text.includes(pattern)) {
            const whenMatch = sampleText.match(new RegExp(`(${pattern}[^,\.]+)`, 'i'));
            if (whenMatch) {
                breakdown.when = whenMatch[1].trim();
                break;
            }
        }
    }

    // WHERE - location words
    const wherePatterns = ['at home', 'in the park', 'at the gym', 'at work', 'in my', 'at a', 'near'];
    for (const pattern of wherePatterns) {
        if (text.includes(pattern)) {
            const whereMatch = sampleText.match(new RegExp(`(${pattern}[^,\.]+)`, 'i'));
            if (whereMatch) {
                breakdown.where = whereMatch[1].trim();
                break;
            }
        }
    }

    // WHY - reason words
    const whyMatch = sampleText.match(/(?:because|as|since) ([^,\.]+)/i);
    if (whyMatch) breakdown.why = whyMatch[1].trim();

    // HOW - feeling words
    const howMatch = sampleText.match(/(?:feel|makes me feel|feeling) ([^,\.]+)/i);
    if (howMatch) breakdown.how = howMatch[1].trim();

    // WHO - people mentions
    const whoPatterns = ['with friends', 'with family', 'alone', 'with my', 'with colleagues'];
    for (const pattern of whoPatterns) {
        if (text.includes(pattern)) {
            breakdown.who = pattern;
            break;
        }
    }

    return breakdown;
}

// ========== AI FEEDBACK ==========

async function getAIFeedback() {
    const answer = generateFullAnswer();

    if (!answer || answer.trim().length < 10) {
        alert('Please fill in at least 2-3 fields before getting feedback');
        return;
    }

    if (!window.ieltsCoachAI?.hasApiKey()) {
        showApiKeyReminder();
        return;
    }

    const btn = document.getElementById('getFeedbackBtn');
    const feedbackSection = document.getElementById('feedbackSection');
    const feedbackContent = document.getElementById('feedbackContent');

    try {
        btn.disabled = true;
        btn.textContent = '⏳ Getting AI Feedback...';

        const questionText = typeof currentQuestion === 'string' ? currentQuestion : currentQuestion.question;
        const feedback = await window.ieltsCoachAI.feedbackOnIdeas(questionText, answer);

        feedbackContent.innerHTML = feedback.replace(/\n/g, '<br>');
        feedbackSection.style.display = 'block';

        practiceInterface.saveProgress(
            practiceInterface.getQuestionId(currentQuestion, practiceInterface.currentIndex),
            { answer, completed: true, hasFeedback: true }
        );

        feedbackSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (error) {
        console.error('AI Feedback Error:', error);
        alert('Error getting feedback: ' + error.message);
    } finally {
        btn.disabled = false;
        btn.textContent = '🤖 Get AI Feedback';
    }
}

function showApiKeyReminder() {
    const reminder = confirm(
        'You need a free Gemini API key to get AI feedback.\n\n' +
        'Would you like to set it up now?\n\n' +
        '(You can still practice and view sample answers without it)'
    );

    if (reminder) {
        window.location.href = 'ielts-speaking-lessons.html#api-key';
    }
}

// ========== NAVIGATION ==========

function nextQuestion() {
    practiceInterface.nextQuestion();
}

function previousQuestion() {
    practiceInterface.previousQuestion();
}

function skipQuestion() {
    practiceInterface.nextQuestion();
}

function markComplete() {
    practiceInterface.markComplete();
    nextQuestion();
}

function toggleFavorite() {
    const questionId = practiceInterface.getQuestionId(currentQuestion, practiceInterface.currentIndex);
    practiceInterface.toggleFavorite(questionId);
    renderCurrentQuestion();
    populateQuestionBrowser();
}

function updateProgress() {
    const stats = practiceInterface.getCompletionStats();
    const progressTextEl = document.getElementById('progressText');
    const progressBarEl = document.getElementById('progressBar');

    if (progressTextEl) progressTextEl.textContent = `${stats.completed}/${stats.total}`;
    if (progressBarEl) progressBarEl.style.width = `${stats.percentage}%`;
}

// ========== UI TOGGLES ==========

function toggleSampleAnswer() {
    const box = document.getElementById('sampleAnswerBox');
    const icon = document.querySelector('.toggle-icon');
    const text = document.querySelector('.toggle-text');

    if (!box) return;

    if (box.style.display === 'none' || box.style.display === '') {
        box.style.display = 'block';
        if (icon) icon.textContent = '▲';
        if (text) text.textContent = '🔼 Hide Sample Answer';
    } else {
        box.style.display = 'none';
        if (icon) icon.textContent = '▼';
        if (text) text.textContent = '💡 Compare with Band 7-7.5 Sample Answer';
    }
}

function toggleOptions() {
    const content = document.getElementById('optionsContent');
    const toggle = document.getElementById('optionsToggle');

    if (content.style.display === 'none') {
        content.style.display = 'block';
        toggle.textContent = '⚙️ Hide Options';
    } else {
        content.style.display = 'none';
        toggle.textContent = '⚙️ Options (Modes & Filters)';
    }
}

function toggleTemplate() {
    const content = document.getElementById('templateContent');
    const toggle = document.getElementById('templateToggleBtn');

    if (content.style.display === 'none') {
        content.style.display = 'block';
        toggle.textContent = 'Hide';
    } else {
        content.style.display = 'none';
        toggle.textContent = 'Show';
    }
}

// ========== QUESTION BROWSER ==========

/**
 * Helper function to check if a question is completed
 */
function isQuestionComplete(questionId) {
    if (!practiceInterface || !practiceInterface.progress) return false;
    return practiceInterface.progress[questionId]?.completed || false;
}

function toggleQuestionBrowser() {
    const content = document.getElementById('browserContent');
    const icon = document.getElementById('browserToggleIcon');

    if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.textContent = '▲';
    } else {
        content.style.display = 'none';
        icon.textContent = '▼';
    }
}

function switchBrowserView(view) {
    currentBrowserView = view;

    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });

    document.getElementById('browserGrid').style.display = view === 'grid' ? 'grid' : 'none';
    document.getElementById('browserList').style.display = view === 'list' ? 'block' : 'none';
}

function filterQuestions(filter) {
    currentBrowserFilter = filter;

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    populateQuestionBrowser();
}

function populateQuestionBrowser() {
    if (!practiceInterface || !allQuestions) return;

    const total = allQuestions.length;
    const countEl = document.getElementById('browserQuestionCount');
    if (countEl) countEl.textContent = total;

    populateGridView();
    populateListView();
}

function populateGridView() {
    const grid = document.getElementById('browserGrid');
    if (!grid) return;

    grid.innerHTML = '';

    allQuestions.forEach((q, index) => {
        const questionId = practiceInterface.getQuestionId(q, index);
        const isFavorite = practiceInterface.isFavorite(questionId);
        const isCompleted = isQuestionComplete(questionId);
        const isCurrent = index === practiceInterface.currentIndex;

        if (currentBrowserFilter === 'favorites' && !isFavorite) return;
        if (currentBrowserFilter === 'completed' && !isCompleted) return;
        if (currentBrowserFilter === 'incomplete' && isCompleted) return;

        const tile = document.createElement('div');
        tile.className = 'question-tile';
        if (isCurrent) tile.classList.add('current');
        if (isCompleted) tile.classList.add('completed');
        if (!isCompleted) tile.classList.add('incomplete');
        if (isFavorite) tile.classList.add('favorite');

        tile.innerHTML = `
            <span class="tile-number">${index + 1}</span>
            <span class="tile-status">${isCompleted ? '✓' : '○'}</span>
        `;

        tile.onclick = () => jumpToQuestion(index);
        grid.appendChild(tile);
    });
}

function populateListView() {
    const list = document.getElementById('browserList');
    if (!list) return;

    list.innerHTML = '';

    allQuestions.forEach((q, index) => {
        const questionId = practiceInterface.getQuestionId(q, index);
        const isFavorite = practiceInterface.isFavorite(questionId);
        const isCompleted = isQuestionComplete(questionId);
        const isCurrent = index === practiceInterface.currentIndex;

        if (currentBrowserFilter === 'favorites' && !isFavorite) return;
        if (currentBrowserFilter === 'completed' && !isCompleted) return;
        if (currentBrowserFilter === 'incomplete' && isCompleted) return;

        const questionText = typeof q === 'string' ? q : q.question;

        const item = document.createElement('div');
        item.className = 'question-list-item';
        if (isCurrent) item.classList.add('current');

        item.innerHTML = `
            <span class="list-item-number">${index + 1}.</span>
            <span class="list-item-text">${questionText}</span>
            <span class="list-item-status">${isFavorite ? '⭐' : ''} ${isCompleted ? '✓' : '○'}</span>
        `;

        item.onclick = () => jumpToQuestion(index);
        list.appendChild(item);
    });
}

// ========== ADVANCED NAVIGATION ==========

function jumpToQuestion(index) {
    if (!practiceInterface) return;

    const total = allQuestions.length;
    if (index < 0 || index >= total) {
        alert(`Question number must be between 1 and ${total}`);
        return;
    }

    practiceInterface.currentIndex = index;
    renderCurrentQuestion();
    updateProgress();
    populateQuestionBrowser();

    document.getElementById('questionCard').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function jumpToQuestionByInput() {
    const input = document.getElementById('jumpToInput');
    const questionNumber = parseInt(input.value);

    if (isNaN(questionNumber) || questionNumber < 1) {
        alert('Please enter a valid question number');
        return;
    }

    jumpToQuestion(questionNumber - 1);
    input.value = '';
}

function jumpRelative(offset) {
    if (!practiceInterface) return;
    jumpToQuestion(practiceInterface.currentIndex + offset);
}

function jumpToRandom() {
    if (!practiceInterface || !allQuestions) return;
    const randomIndex = Math.floor(Math.random() * allQuestions.length);
    jumpToQuestion(randomIndex);
}

function jumpToNextIncomplete() {
    if (!practiceInterface || !allQuestions) return;

    const currentIndex = practiceInterface.currentIndex;
    const total = allQuestions.length;

    // Search from current+1 to end
    for (let i = currentIndex + 1; i < total; i++) {
        const questionId = practiceInterface.getQuestionId(allQuestions[i], i);
        if (!isQuestionComplete(questionId)) {
            jumpToQuestion(i);
            return;
        }
    }

    // Search from start to current
    for (let i = 0; i < currentIndex; i++) {
        const questionId = practiceInterface.getQuestionId(allQuestions[i], i);
        if (!isQuestionComplete(questionId)) {
            jumpToQuestion(i);
            return;
        }
    }

    alert('All questions completed! 🎉');
}

// ========== CATEGORY FILTER ==========

function filterByCategory(category) {
    // TODO: Implement category filtering
    console.log('Filter by category:', category);
}

// ========== HANDLERS ==========

function handleAnswerSubmit(question, answer) {
    // Handled in getAIFeedback
}

function handleQuestionChange(question) {
    // Optional: track analytics or other actions
}

// ========== SPECIAL RENDERERS ==========

function renderAudioLesson(sectionId) {
    const section = window.IELTS_LESSONS?.module2?.sections.find(s => s.id === sectionId);
    if (!section) return;

    hidePracticeElements();

    const questionCard = document.querySelector('.question-card');
    const questionText = document.getElementById('questionText');
    const questionNumber = document.getElementById('questionNumber');

    questionNumber.textContent = section.title;
    questionText.innerHTML = `
        <div class="audio-lesson-content">
            <h2>🎧 ${section.title}</h2>
            <div class="audio-script">
                <p style="line-height: 1.8; font-size: 16px; margin: 20px 0;">
                    ${section.audioScript.text}
                </p>
                <p style="color: #666; font-size: 14px; margin-top: 20px;">
                    ⏱️ Duration: ~${section.audioScript.duration} seconds
                </p>
            </div>
        </div>
    `;
}

function renderInteractiveGuide(sectionId) {
    const section = window.IELTS_LESSONS?.module2?.sections.find(s => s.id === sectionId);
    if (!section) return;

    hidePracticeElements();

    const questionNumber = document.getElementById('questionNumber');
    const questionText = document.getElementById('questionText');

    questionNumber.textContent = section.title;

    if (sectionId === 'm2_compare') {
        questionText.innerHTML = `
            <div class="interactive-guide">
                <h2>🔄 ${section.title}</h2>
                <div style="margin-top: 20px;">
                    <h3>👨‍🎓 Student View:</h3>
                    <p>${section.studentView}</p>

                    <h3 style="margin-top: 30px;">👨‍🏫 Teacher's Approach:</h3>
                    <div class="audio-script" style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin-top: 10px;">
                        <p style="line-height: 1.8;">${section.teacherView.audioScript.text}</p>
                        <p style="color: #666; margin-top: 15px;">⏱️ ~${section.teacherView.audioScript.duration}s</p>
                    </div>

                    <h4 style="margin-top: 20px;">📋 5W1H Breakdown:</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 10px;">
                        ${Object.entries(section.teacherView.ideas).map(([key, value]) => `
                            <div style="background: #fff; padding: 15px; border-left: 3px solid #4caf50; border-radius: 4px;">
                                <strong>${key.toUpperCase()}:</strong><br>
                                <span style="color: #666;">${value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    } else if (sectionId === 'm2_selection_guide') {
        const guide = section.content.guide;
        questionText.innerHTML = `
            <div class="interactive-guide">
                <h2>📐 ${section.title}</h2>
                <p style="margin: 20px 0;">${section.description}</p>
                <div style="margin-top: 30px;">
                    ${guide.map(item => `
                        <div style="background: #f9f9f9; padding: 20px; margin-bottom: 20px; border-radius: 8px; border-left: 4px solid #2196f3;">
                            <h3 style="margin-top: 0; color: #2196f3;">${item.questionType}</h3>
                            <p><strong>Best Techniques:</strong> ${item.bestTechniques.join(', ')}</p>
                            <p style="color: #666;"><strong>Why:</strong> ${item.reason}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

function renderAIConversation(sectionId) {
    const section = window.IELTS_LESSONS?.module2?.sections.find(s => s.id === sectionId);
    if (!section) return;

    hidePracticeElements();

    const questionNumber = document.getElementById('questionNumber');
    const questionText = document.getElementById('questionText');

    questionNumber.textContent = section.title;
    questionText.innerHTML = `
        <div class="ai-conversation">
            <h2>🎭 ${section.title}</h2>
            <p style="margin: 20px 0; line-height: 1.6;">${section.instructions}</p>

            <div style="background: #f0f4f8; padding: 20px; border-radius: 8px; margin-top: 20px;">
                <h3>🤖 AI Conversation Settings:</h3>
                <ul style="line-height: 1.8;">
                    <li><strong>Number of Questions:</strong> ${section.conversationSettings.numberOfQuestions}</li>
                    <li><strong>Focus Area:</strong> ${section.conversationSettings.focusArea}</li>
                    <li><strong>Feedback Style:</strong> ${section.conversationSettings.feedbackStyle}</li>
                </ul>
            </div>

            <div style="margin-top: 30px; padding: 20px; background: #fff; border: 2px dashed #ccc; border-radius: 8px; text-align: center;">
                <p style="color: #666; margin-bottom: 15px;">This is an AI conversation practice section.</p>
                <button class="btn btn-primary" onclick="alert('AI Conversation feature coming soon!')">
                    🚀 Start AI Conversation
                </button>
            </div>

            <details style="margin-top: 30px;">
                <summary><strong>📋 View AI System Prompt</strong></summary>
                <pre>${section.aiSystemPrompt}</pre>
            </details>
        </div>
    `;
}
