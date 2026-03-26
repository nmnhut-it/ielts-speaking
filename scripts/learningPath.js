/**
 * Learning Path — guided skill-based progression through IELTS Speaking practice.
 * Steps progress from Part 1 basics → Part 2 structure → Part 3 discussion.
 * Completion based on SpacedRepetition mastery data (avg band >= target).
 */

const LEARNING_PATH = [
    // Part 1: First 6 categories (foundational topics)
    { id: 'p1_hobbies', label: 'Part 1: Hobbies & Interests', module: 'module2', category: 'hobbies', range: [0, 5], target: 6.0, href: 'ielts-module2-minimal.html' },
    { id: 'p1_daily', label: 'Part 1: Daily Life', module: 'module2', category: 'daily', range: [5, 10], target: 6.0, href: 'ielts-module2-minimal.html' },
    { id: 'p1_sports', label: 'Part 1: Activities & Sports', module: 'module2', category: 'sports', range: [10, 15], target: 6.0, href: 'ielts-module2-minimal.html' },
    { id: 'p1_tech', label: 'Part 1: Technology & Media', module: 'module2', category: 'technology', range: [15, 20], target: 6.0, href: 'ielts-module2-minimal.html' },
    { id: 'p1_people', label: 'Part 1: People & Relationships', module: 'module2', category: 'relationships', range: [20, 25], target: 6.0, href: 'ielts-module2-minimal.html' },
    { id: 'p1_work', label: 'Part 1: Learning & Work', module: 'module2', category: 'work', range: [25, 30], target: 6.0, href: 'ielts-module2-minimal.html' },

    // Part 2: Cue cards in sets of 10
    { id: 'p2_set1', label: 'Part 2: Cue Cards 1-10', module: 'module3', range: [0, 10], target: 6.0, href: 'ielts-module3-minimal.html' },
    { id: 'p2_set2', label: 'Part 2: Cue Cards 11-20', module: 'module3', range: [10, 20], target: 6.0, href: 'ielts-module3-minimal.html' },
    { id: 'p2_set3', label: 'Part 2: Cue Cards 21-30', module: 'module3', range: [20, 30], target: 6.0, href: 'ielts-module3-minimal.html' },

    // Part 1: Remaining categories (broader topics)
    { id: 'p1_travel', label: 'Part 1: Places & Travel', module: 'module2', category: 'travel', range: [30, 35], target: 6.0, href: 'ielts-module2-minimal.html' },
    { id: 'p1_food', label: 'Part 1: Food & Cooking', module: 'module2', category: 'food', range: [35, 40], target: 6.0, href: 'ielts-module2-minimal.html' },
    { id: 'p1_home', label: 'Part 1: Home & Living', module: 'module2', category: 'home', range: [50, 55], target: 6.0, href: 'ielts-module2-minimal.html' },

    // Part 3: Discussion in sets of 10
    { id: 'p3_set1', label: 'Part 3: Questions 1-10', module: 'part3', range: [0, 10], target: 6.0, href: 'ielts-part3-practice.html' },
    { id: 'p3_set2', label: 'Part 3: Questions 11-20', module: 'part3', range: [10, 20], target: 6.0, href: 'ielts-part3-practice.html' },

    // Part 2: More cards
    { id: 'p2_set4', label: 'Part 2: Cue Cards 31-40', module: 'module3', range: [30, 40], target: 6.0, href: 'ielts-module3-minimal.html' },
    { id: 'p2_set5', label: 'Part 2: Cue Cards 41-50', module: 'module3', range: [40, 50], target: 6.0, href: 'ielts-module3-minimal.html' },

    // Part 3: Remaining
    { id: 'p3_set3', label: 'Part 3: Questions 21-30', module: 'part3', range: [20, 30], target: 6.0, href: 'ielts-part3-practice.html' },
    { id: 'p3_set4', label: 'Part 3: Questions 31-40', module: 'part3', range: [30, 40], target: 6.0, href: 'ielts-part3-practice.html' },

    // Full test
    { id: 'full_test', label: 'Full Test Simulation', module: 'test', range: null, target: 6.5, href: 'ielts-speaking-test.html' }
];

const LP_STORAGE_KEY = 'ielts_learning_path';

const LearningPath = {

    /**
     * Get completion status for a step based on SR mastery data.
     * A step is complete when avg band score >= target for its question range.
     */
    getStepStatus(step) {
        if (!window.SpacedRepetition || !step.range) return 'locked';

        var scores = [];
        for (var i = step.range[0]; i < step.range[1]; i++) {
            var key = step.module + '_' + i;
            var data = SpacedRepetition._getData();
            if (data[key]) {
                scores.push(data[key].lastScore);
            }
        }

        if (scores.length === 0) return 'not_started';

        var avg = scores.reduce(function(a, b) { return a + b; }, 0) / scores.length;
        var practiced = scores.length;
        var total = step.range[1] - step.range[0];

        if (practiced >= Math.ceil(total * 0.6) && avg >= step.target) return 'completed';
        if (practiced > 0) return 'in_progress';
        return 'not_started';
    },

    /**
     * Get the current step (first incomplete step).
     */
    getCurrentStep() {
        for (var i = 0; i < LEARNING_PATH.length; i++) {
            var status = this.getStepStatus(LEARNING_PATH[i]);
            if (status !== 'completed') return i;
        }
        return LEARNING_PATH.length - 1;
    },

    /**
     * Get all steps with their statuses.
     */
    getAllSteps() {
        var currentIdx = this.getCurrentStep();
        return LEARNING_PATH.map(function(step, i) {
            var status = LearningPath.getStepStatus(step);
            // Steps beyond current+1 are locked (unless completed)
            if (status === 'not_started' && i > currentIdx + 1) {
                status = 'locked';
            }
            return {
                step: step,
                index: i,
                status: status,
                isCurrent: i === currentIdx
            };
        });
    },

    /**
     * Get progress summary.
     */
    getProgress() {
        var steps = this.getAllSteps();
        var completed = steps.filter(function(s) { return s.status === 'completed'; }).length;
        return {
            completed: completed,
            total: steps.length,
            percent: Math.round((completed / steps.length) * 100)
        };
    },

    /**
     * Render the progress map HTML.
     */
    renderProgressMap() {
        var steps = this.getAllSteps();
        var progress = this.getProgress();

        var html = '<div class="lp-header">';
        html += '<h2>Learning Path</h2>';
        html += '<div class="lp-progress-bar"><div class="lp-progress-fill" style="width:' + progress.percent + '%"></div></div>';
        html += '<div class="lp-progress-text">' + progress.completed + '/' + progress.total + ' steps completed</div>';
        html += '</div>';

        html += '<div class="lp-steps">';
        steps.forEach(function(item) {
            var statusClass = 'lp-step--' + item.status;
            if (item.isCurrent) statusClass += ' lp-step--current';

            var icon = '';
            if (item.status === 'completed') icon = '&#10003;';
            else if (item.status === 'in_progress') icon = '&#9654;';
            else if (item.status === 'locked') icon = '&#128274;';
            else icon = String(item.index + 1);

            var clickable = item.status !== 'locked';

            html += '<a class="lp-step ' + statusClass + '"';
            if (clickable) html += ' href="' + item.step.href + '"';
            html += '>';
            html += '<span class="lp-step-icon">' + icon + '</span>';
            html += '<span class="lp-step-label">' + item.step.label + '</span>';
            if (item.status === 'completed') {
                html += '<span class="lp-step-badge">Done</span>';
            } else if (item.status === 'in_progress') {
                html += '<span class="lp-step-badge lp-step-badge--progress">In Progress</span>';
            }
            html += '</a>';
        });
        html += '</div>';

        return html;
    }
};

window.LearningPath = LearningPath;
