// IELTS Practice Interface - Shared Components
// Reusable practice UI components for all module pages

class PracticeInterface {
    constructor(config) {
        this.moduleId = config.moduleId;
        this.questions = config.questions || [];
        this.currentIndex = 0;
        this.mode = 'sequential'; // sequential, random, favorites, incomplete
        this.category = 'all';
        this.progress = this.loadProgress();
        this.favorites = this.loadFavorites();

        // Callbacks
        this.onAnswerSubmit = config.onAnswerSubmit || null;
        this.onQuestionChange = config.onQuestionChange || null;

        // Initialize
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderQuestion();
        this.updateProgress();
    }

    // Progress Management
    loadProgress() {
        const key = `ielts_practice_progress_${this.moduleId}`;
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : {};
    }

    saveProgress(questionId, data) {
        const key = `ielts_practice_progress_${this.moduleId}`;
        this.progress[questionId] = {
            ...data,
            timestamp: Date.now(),
            attempts: (this.progress[questionId]?.attempts || 0) + 1
        };
        localStorage.setItem(key, JSON.stringify(this.progress));
        this.updateProgress();
    }

    getCompletionStats() {
        const total = this.questions.length;
        const completed = Object.keys(this.progress).filter(
            key => this.progress[key].completed
        ).length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        return { total, completed, percentage };
    }

    // Favorites Management
    loadFavorites() {
        const key = `ielts_favorites_${this.moduleId}`;
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : [];
    }

    toggleFavorite(questionId) {
        const index = this.favorites.indexOf(questionId);
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(questionId);
        }
        const key = `ielts_favorites_${this.moduleId}`;
        localStorage.setItem(key, JSON.stringify(this.favorites));
        this.renderQuestion();
    }

    isFavorite(questionId) {
        return this.favorites.includes(questionId);
    }

    // Question Navigation
    getCurrentQuestion() {
        return this.questions[this.currentIndex];
    }

    nextQuestion() {
        if (this.currentIndex < this.questions.length - 1) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0; // Loop back
        }
        this.renderQuestion();
        this.scrollToTop();

        if (this.onQuestionChange) {
            this.onQuestionChange(this.getCurrentQuestion());
        }
    }

    previousQuestion() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.questions.length - 1; // Loop to end
        }
        this.renderQuestion();
        this.scrollToTop();

        if (this.onQuestionChange) {
            this.onQuestionChange(this.getCurrentQuestion());
        }
    }

    goToQuestion(index) {
        if (index >= 0 && index < this.questions.length) {
            this.currentIndex = index;
            this.renderQuestion();
            this.scrollToTop();

            if (this.onQuestionChange) {
                this.onQuestionChange(this.getCurrentQuestion());
            }
        }
    }

    // Practice Modes
    setMode(mode) {
        this.mode = mode;
        this.currentIndex = 0;

        if (mode === 'random') {
            this.shuffleQuestions();
        } else if (mode === 'favorites') {
            this.filterFavorites();
        } else if (mode === 'incomplete') {
            this.filterIncomplete();
        }

        this.renderQuestion();
        this.updateProgress();
    }

    shuffleQuestions() {
        // Fisher-Yates shuffle
        const shuffled = [...this.questions];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        this.questions = shuffled;
    }

    filterFavorites() {
        // Show only favorited questions
        const allQuestions = [...this.questions];
        this.questions = allQuestions.filter((q, idx) =>
            this.isFavorite(this.getQuestionId(q, idx))
        );
    }

    filterIncomplete() {
        // Show only incomplete questions
        const allQuestions = [...this.questions];
        this.questions = allQuestions.filter((q, idx) => {
            const qId = this.getQuestionId(q, idx);
            return !this.progress[qId] || !this.progress[qId].completed;
        });
    }

    // Category Filtering
    filterByCategory(category) {
        this.category = category;
        // This needs to be implemented based on question structure
        // Questions should have a category property
        this.currentIndex = 0;
        this.renderQuestion();
    }

    // UI Rendering
    renderQuestion() {
        // Override this method in specific implementations
        console.log('renderQuestion() should be overridden');
    }

    updateProgress() {
        const stats = this.getCompletionStats();
        const progressEl = document.getElementById('practiceProgress');
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');

        if (progressText) {
            progressText.textContent = `${stats.completed}/${stats.total} completed`;
        }

        if (progressBar) {
            progressBar.style.width = `${stats.percentage}%`;
        }

        if (progressEl) {
            progressEl.innerHTML = `
                <div class="progress-stats">
                    <div class="stat">
                        <span class="stat-label">Completed</span>
                        <span class="stat-value">${stats.completed}/${stats.total}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Progress</span>
                        <span class="stat-value">${stats.percentage}%</span>
                    </div>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" style="width: ${stats.percentage}%"></div>
                </div>
            `;
        }
    }

    // Sample Answer Display
    toggleSampleAnswer() {
        const sampleBox = document.getElementById('sampleAnswerBox');
        const toggleBtn = document.getElementById('toggleSampleBtn');

        if (sampleBox && toggleBtn) {
            const isHidden = sampleBox.style.display === 'none';
            sampleBox.style.display = isHidden ? 'block' : 'none';
            toggleBtn.textContent = isHidden ? '🔼 Hide Sample Answer' : '💡 Show Sample Answer';
        }
    }

    // Answer Submission
    async submitAnswer() {
        const answerArea = document.getElementById('studentAnswer');
        const answer = answerArea ? answerArea.value.trim() : '';

        if (!answer) {
            alert('Please type your answer first');
            return;
        }

        const question = this.getCurrentQuestion();
        const questionId = this.getQuestionId(question, this.currentIndex);

        // Save progress
        this.saveProgress(questionId, {
            answer: answer,
            completed: true
        });

        // Call callback if provided
        if (this.onAnswerSubmit) {
            await this.onAnswerSubmit(question, answer);
        }

        // Show success feedback
        this.showFeedbackMessage('Answer saved! ✓');
    }

    markComplete() {
        const question = this.getCurrentQuestion();
        const questionId = this.getQuestionId(question, this.currentIndex);

        this.saveProgress(questionId, { completed: true });
        this.showFeedbackMessage('Marked as complete! ✓');
    }

    // Utility Functions
    getQuestionId(question, index) {
        // Generate a unique ID for the question
        if (typeof question === 'string') {
            return `q_${index}`;
        } else if (question.question) {
            return `q_${index}_${question.question.substring(0, 20).replace(/\s+/g, '_')}`;
        } else {
            return `q_${index}`;
        }
    }

    showFeedbackMessage(message, duration = 2000) {
        const existingMsg = document.querySelector('.feedback-toast');
        if (existingMsg) existingMsg.remove();

        const toast = document.createElement('div');
        toast.className = 'feedback-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Event Listeners
    setupEventListeners() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Only if not typing in textarea
            if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') {
                return;
            }

            switch(e.key.toLowerCase()) {
                case 'n':
                    this.nextQuestion();
                    break;
                case 'p':
                    this.previousQuestion();
                    break;
                case 's':
                    this.toggleSampleAnswer();
                    break;
                case 'f':
                    this.submitAnswer();
                    break;
            }
        });
    }
}

// Export for use in HTML pages
if (typeof window !== 'undefined') {
    window.PracticeInterface = PracticeInterface;
}
