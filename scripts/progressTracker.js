// IELTS Speaking Progress Tracker
// Stores test history and tracks improvement over time

const PROGRESS_STORAGE_KEY = 'ielts_progress_data';

class ProgressTracker {
    constructor() {
        this.testHistory = [];
        this.loadProgress();
    }

    // Save test result
    saveTestResult(result) {
        const testRecord = {
            id: Date.now(),
            date: new Date().toISOString(),
            overallBand: result.overallBand,
            fluencyBand: result.fluencyBand,
            vocabularyBand: result.vocabularyBand,
            grammarBand: result.grammarBand,
            pronunciationBand: result.pronunciationBand,
            statistics: result.statistics || {},
            testDuration: result.statistics?.testDurationMinutes || 0,
            totalWords: result.statistics?.totalWords || 0
        };

        this.testHistory.push(testRecord);
        this.saveProgress();

        return testRecord;
    }

    // Get all test history
    getHistory() {
        return this.testHistory.sort((a, b) => b.date.localeCompare(a.date));
    }

    // Get latest test
    getLatestTest() {
        if (this.testHistory.length === 0) return null;
        return this.testHistory[this.testHistory.length - 1];
    }

    // Get improvement statistics
    getImprovementStats() {
        if (this.testHistory.length < 2) {
            return {
                hasImprovement: false,
                message: 'Take more tests to see progress'
            };
        }

        const sorted = this.getHistory();
        const latest = sorted[0];
        const previous = sorted[1];

        const improvement = {
            overall: latest.overallBand - previous.overallBand,
            fluency: latest.fluencyBand - previous.fluencyBand,
            vocabulary: latest.vocabularyBand - previous.vocabularyBand,
            grammar: latest.grammarBand - previous.grammarBand,
            pronunciation: latest.pronunciationBand - previous.pronunciationBand
        };

        return {
            hasImprovement: true,
            current: latest,
            previous: previous,
            improvement: improvement,
            totalTests: this.testHistory.length
        };
    }

    // Get average scores
    getAverageScores() {
        if (this.testHistory.length === 0) return null;

        const totals = this.testHistory.reduce((acc, test) => {
            acc.overall += test.overallBand;
            acc.fluency += test.fluencyBand;
            acc.vocabulary += test.vocabularyBand;
            acc.grammar += test.grammarBand;
            acc.pronunciation += test.pronunciationBand;
            return acc;
        }, { overall: 0, fluency: 0, vocabulary: 0, grammar: 0, pronunciation: 0 });

        const count = this.testHistory.length;

        return {
            overall: (totals.overall / count).toFixed(1),
            fluency: (totals.fluency / count).toFixed(1),
            vocabulary: (totals.vocabulary / count).toFixed(1),
            grammar: (totals.grammar / count).toFixed(1),
            pronunciation: (totals.pronunciation / count).toFixed(1),
            testCount: count
        };
    }

    // Get band progress over time
    getBandProgression() {
        return this.testHistory.map(test => ({
            date: new Date(test.date).toLocaleDateString(),
            band: test.overallBand,
            fluency: test.fluencyBand,
            vocabulary: test.vocabularyBand,
            grammar: test.grammarBand,
            pronunciation: test.pronunciationBand
        }));
    }

    // Get weakest area
    getWeakestArea() {
        const latest = this.getLatestTest();
        if (!latest) return null;

        const criteria = {
            'Fluency & Coherence': latest.fluencyBand,
            'Lexical Resource': latest.vocabularyBand,
            'Grammar Range & Accuracy': latest.grammarBand,
            'Pronunciation': latest.pronunciationBand
        };

        let weakest = null;
        let lowestScore = 10;

        for (const [name, score] of Object.entries(criteria)) {
            if (score < lowestScore) {
                lowestScore = score;
                weakest = name;
            }
        }

        return { criterion: weakest, score: lowestScore };
    }

    // Delete test record
    deleteTest(testId) {
        this.testHistory = this.testHistory.filter(test => test.id !== testId);
        this.saveProgress();
    }

    // Clear all history
    clearHistory() {
        this.testHistory = [];
        localStorage.removeItem(PROGRESS_STORAGE_KEY);
    }

    // Save to localStorage
    saveProgress() {
        const data = {
            testHistory: this.testHistory,
            lastUpdated: Date.now()
        };
        localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(data));
    }

    // Load from localStorage
    loadProgress() {
        const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
        if (stored) {
            try {
                const data = JSON.parse(stored);
                this.testHistory = data.testHistory || [];
            } catch (error) {
                console.error('Failed to load progress:', error);
                this.testHistory = [];
            }
        }
    }

    // Export progress as text
    exportProgress() {
        const avgScores = this.getAverageScores();
        const progression = this.getBandProgression();

        let output = 'IELTS SPEAKING PROGRESS REPORT\n';
        output += '='.repeat(60) + '\n\n';
        output += `Total Tests Taken: ${this.testHistory.length}\n`;
        output += `Report Generated: ${new Date().toLocaleDateString()}\n\n`;

        if (avgScores) {
            output += 'AVERAGE SCORES\n';
            output += '-'.repeat(60) + '\n';
            output += `Overall Band: ${avgScores.overall}\n`;
            output += `Fluency & Coherence: ${avgScores.fluency}\n`;
            output += `Lexical Resource: ${avgScores.vocabulary}\n`;
            output += `Grammar Range & Accuracy: ${avgScores.grammar}\n`;
            output += `Pronunciation: ${avgScores.pronunciation}\n\n`;
        }

        output += 'TEST HISTORY\n';
        output += '-'.repeat(60) + '\n';

        progression.reverse().forEach((test, index) => {
            output += `\nTest ${index + 1} - ${test.date}\n`;
            output += `Overall: ${test.band.toFixed(1)} | `;
            output += `F: ${test.fluency.toFixed(1)} | `;
            output += `V: ${test.vocabulary.toFixed(1)} | `;
            output += `G: ${test.grammar.toFixed(1)} | `;
            output += `P: ${test.pronunciation.toFixed(1)}\n`;
        });

        return output;
    }
}

// Create singleton instance
window.progressTracker = new ProgressTracker();
