/**
 * Spaced Repetition — tracks per-question mastery and schedules reviews.
 * Interval logic: Band >= 7.0 doubles interval, 6.0-6.9 holds, < 6.0 resets to 1 day.
 * Intervals: 1 → 3 → 7 → 14 → 30 days → mastered.
 */

const SR_STORAGE_KEY = 'ielts_sr_data';
const SR_INTERVALS = [1, 3, 7, 14, 30];
const SR_MASTERED_THRESHOLD = 30;
const MS_PER_DAY = 86400000;

const SpacedRepetition = {

    /** Get all SR data from localStorage */
    _getData() {
        try {
            return JSON.parse(localStorage.getItem(SR_STORAGE_KEY) || '{}');
        } catch (e) {
            return {};
        }
    },

    /** Save SR data to localStorage */
    _saveData(data) {
        localStorage.setItem(SR_STORAGE_KEY, JSON.stringify(data));
    },

    /**
     * Record a score for a question. Updates interval and next due date.
     * @param {string} questionKey - e.g. 'module2_14', 'module3_7', 'part3_22'
     * @param {number} bandScore - overall band score (0-9)
     */
    recordScore(questionKey, bandScore) {
        var data = this._getData();
        var entry = data[questionKey] || { interval: 0, lastScore: 0, lastPracticed: 0, nextDue: 0 };
        var now = Date.now();

        entry.lastScore = bandScore;
        entry.lastPracticed = now;

        if (bandScore >= 7.0) {
            var currentIdx = SR_INTERVALS.indexOf(entry.interval);
            if (currentIdx < 0) {
                entry.interval = SR_INTERVALS[0];
            } else if (currentIdx < SR_INTERVALS.length - 1) {
                entry.interval = SR_INTERVALS[currentIdx + 1];
            }
            // else stays at 30 (mastered)
        } else if (bandScore < 6.0) {
            entry.interval = SR_INTERVALS[0]; // reset to 1 day
        }
        // 6.0-6.9: interval stays the same (or starts at 1 if new)
        if (entry.interval === 0) {
            entry.interval = SR_INTERVALS[0];
        }

        entry.nextDue = now + entry.interval * MS_PER_DAY;
        data[questionKey] = entry;
        this._saveData(data);
    },

    /**
     * Get questions due for review in a given module.
     * @param {string} modulePrefix - e.g. 'module2', 'module3', 'part3'
     * @returns {Array<{key: string, entry: object}>}
     */
    getDueQuestions(modulePrefix) {
        var data = this._getData();
        var now = Date.now();
        var due = [];
        for (var key in data) {
            if (key.startsWith(modulePrefix + '_') && data[key].nextDue <= now) {
                due.push({ key: key, entry: data[key] });
            }
        }
        // Sort by most overdue first
        due.sort(function(a, b) { return a.entry.nextDue - b.entry.nextDue; });
        return due;
    },

    /**
     * Get due count for a module (for badge display).
     * @param {string} modulePrefix
     * @returns {number}
     */
    getDueCount(modulePrefix) {
        return this.getDueQuestions(modulePrefix).length;
    },

    /**
     * Get mastery level for a question.
     * @param {string} questionKey
     * @returns {'new'|'learning'|'reviewing'|'mastered'}
     */
    getMasteryLevel(questionKey) {
        var data = this._getData();
        var entry = data[questionKey];
        if (!entry) return 'new';
        if (entry.interval >= SR_MASTERED_THRESHOLD && entry.lastScore >= 7.0) return 'mastered';
        if (entry.interval >= 7) return 'reviewing';
        return 'learning';
    },

    /**
     * Get mastery map for a module — all question keys with their mastery levels.
     * @param {string} modulePrefix
     * @returns {Object<string, {level: string, lastScore: number, nextDue: number}>}
     */
    getMasteryMap(modulePrefix) {
        var data = this._getData();
        var map = {};
        for (var key in data) {
            if (key.startsWith(modulePrefix + '_')) {
                map[key] = {
                    level: this.getMasteryLevel(key),
                    lastScore: data[key].lastScore,
                    nextDue: data[key].nextDue,
                    interval: data[key].interval
                };
            }
        }
        return map;
    },

    /**
     * Get summary stats for a module.
     * @param {string} modulePrefix
     * @returns {{total: number, mastered: number, reviewing: number, learning: number, due: number, avgScore: number}}
     */
    getModuleStats(modulePrefix) {
        var data = this._getData();
        var stats = { total: 0, mastered: 0, reviewing: 0, learning: 0, due: 0, scoreSum: 0 };
        var now = Date.now();
        for (var key in data) {
            if (key.startsWith(modulePrefix + '_')) {
                stats.total++;
                stats.scoreSum += data[key].lastScore;
                var level = this.getMasteryLevel(key);
                if (level === 'mastered') stats.mastered++;
                else if (level === 'reviewing') stats.reviewing++;
                else stats.learning++;
                if (data[key].nextDue <= now) stats.due++;
            }
        }
        stats.avgScore = stats.total > 0 ? +(stats.scoreSum / stats.total).toFixed(1) : 0;
        return stats;
    },

    /**
     * Get indices of due questions for a module (for review mode filtering).
     * @param {string} modulePrefix
     * @returns {number[]} array of question indices
     */
    getDueIndices(modulePrefix) {
        return this.getDueQuestions(modulePrefix).map(function(item) {
            var parts = item.key.split('_');
            return parseInt(parts[parts.length - 1], 10);
        });
    }
};

window.SpacedRepetition = SpacedRepetition;
