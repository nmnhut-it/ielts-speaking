/**
 * Score History - Tracks IELTS band scores over time in localStorage.
 * Stores up to 100 entries with module, question, scores, and metadata.
 */

class ScoreHistory {
    constructor() {
        this.storageKey = 'ielts_score_history';
    }

    /** Add a score entry: { date, module, questionId, scores, wordCount, duration } */
    addScore(entry) {
        const history = this.getAll();
        history.push({ ...entry, id: Date.now() });
        if (history.length > 100) {
            history.shift();
        }
        localStorage.setItem(this.storageKey, JSON.stringify(history));
    }

    /** Get all score entries */
    getAll() {
        try {
            return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        } catch (e) {
            return [];
        }
    }

    /** Get entries filtered by module (e.g. 'module2', 'module3') */
    getByModule(module) {
        return this.getAll().filter(e => e.module === module);
    }

    /** Get the latest N entries */
    getLatest(n) {
        const all = this.getAll();
        return all.slice(-n);
    }

    /** Calculate average scores across all entries */
    getAverageScores() {
        const all = this.getAll();
        if (all.length === 0) return null;

        const totals = { overall: 0, fluency: 0, vocab: 0, grammar: 0, pronunciation: 0 };
        let count = 0;

        all.forEach(entry => {
            if (entry.scores) {
                totals.overall += entry.scores.overall || 0;
                totals.fluency += entry.scores.fluency || 0;
                totals.vocab += entry.scores.vocab || 0;
                totals.grammar += entry.scores.grammar || 0;
                totals.pronunciation += entry.scores.pronunciation || 0;
                count++;
            }
        });

        if (count === 0) return null;

        return {
            overall: +(totals.overall / count).toFixed(1),
            fluency: +(totals.fluency / count).toFixed(1),
            vocab: +(totals.vocab / count).toFixed(1),
            grammar: +(totals.grammar / count).toFixed(1),
            pronunciation: +(totals.pronunciation / count).toFixed(1),
            count
        };
    }

    /** Get last N scores to show improvement trend */
    getProgressTrend(n) {
        const latest = this.getLatest(n);
        if (latest.length < 2) return null;

        const first = latest[0].scores;
        const last = latest[latest.length - 1].scores;

        if (!first || !last) return null;

        return {
            overall: { from: first.overall, to: last.overall, delta: +(last.overall - first.overall).toFixed(1) },
            fluency: { from: first.fluency, to: last.fluency, delta: +(last.fluency - first.fluency).toFixed(1) },
            vocab: { from: first.vocab, to: last.vocab, delta: +(last.vocab - first.vocab).toFixed(1) },
            grammar: { from: first.grammar, to: last.grammar, delta: +(last.grammar - first.grammar).toFixed(1) },
            pronunciation: { from: first.pronunciation, to: last.pronunciation, delta: +(last.pronunciation - first.pronunciation).toFixed(1) },
            entries: latest.length
        };
    }

    /** Get previous score for a specific question */
    getPreviousScore(module, questionId) {
        const all = this.getAll();
        for (let i = all.length - 1; i >= 0; i--) {
            if (all[i].module === module && all[i].questionId === questionId) {
                return all[i];
            }
        }
        return null;
    }

    /** Clear all history */
    clear() {
        localStorage.removeItem(this.storageKey);
    }
}

window.scoreHistory = new ScoreHistory();
