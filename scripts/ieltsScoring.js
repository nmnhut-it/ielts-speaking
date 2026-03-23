// IELTS Speaking Scoring System
// AI-powered analysis of speaking performance across 4 criteria

class IELTSScoring {
    constructor() {
        this.apiKey = null;
        this.transcript = [];
        this.testDuration = 0;
        this.part1Transcript = [];
        this.part2Transcript = [];
        this.part3Transcript = [];
    }

    setApiKey(key) {
        this.apiKey = key;
    }

    // Add turn to transcript
    addTurn(role, text, part = 1) {
        const turn = { role, text, timestamp: Date.now(), part };
        this.transcript.push(turn);

        if (part === 1) this.part1Transcript.push(turn);
        else if (part === 2) this.part2Transcript.push(turn);
        else if (part === 3) this.part3Transcript.push(turn);
    }

    // Get user responses only
    getUserResponses(part = null) {
        const filtered = part
            ? this.transcript.filter(t => t.role === 'user' && t.part === part)
            : this.transcript.filter(t => t.role === 'user');
        return filtered.map(t => t.text).join('\n\n');
    }

    // Analyze transcript using Gemini AI
    async analyzePerformance() {
        if (!this.apiKey) {
            throw new Error('API key not set');
        }

        const userResponses = this.getUserResponses();

        if (!userResponses || userResponses.trim().length < 100) {
            throw new Error('Not enough speech data to analyze');
        }

        const prompt = `You are an experienced IELTS examiner. Analyze this speaking test transcript and provide detailed scoring.

TRANSCRIPT:
${userResponses}

Provide assessment in this JSON format:
{
  "overallBand": 6.5,
  "fluencyBand": 6.0,
  "vocabularyBand": 7.0,
  "grammarBand": 6.5,
  "pronunciationBand": 6.0,
  "analysis": {
    "fluency": {
      "strengths": ["list specific strengths"],
      "weaknesses": ["list specific issues"],
      "evidence": ["quote examples from transcript"]
    },
    "vocabulary": {
      "strengths": ["list specific strengths"],
      "weaknesses": ["list specific issues"],
      "evidence": ["quote examples from transcript"],
      "lessCommonWords": ["list impressive vocabulary used"]
    },
    "grammar": {
      "strengths": ["list specific strengths"],
      "weaknesses": ["list specific issues"],
      "evidence": ["quote examples from transcript"],
      "complexStructures": ["list complex grammar used"]
    },
    "pronunciation": {
      "strengths": ["based on written patterns, infer pronunciation"],
      "weaknesses": ["common issues to watch for"],
      "note": "Limited analysis from text only"
    }
  },
  "recommendations": {
    "immediate": ["3-5 specific actionable tips for quick improvement"],
    "longTerm": ["3-5 strategic areas to develop over time"]
  },
  "estimatedCEFR": "B2"
}

ASSESSMENT CRITERIA:
- Fluency: smoothness, hesitation, repetition, self-correction, pace
- Vocabulary: range, precision, less common words, paraphrasing, collocations
- Grammar: range of structures, accuracy, complexity, error frequency
- Pronunciation: (infer from text) clarity indicators, natural phrasing

Be honest but constructive. Give specific examples from the transcript. Band scores: 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0`;

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${this.apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{ text: prompt }]
                        }],
                        generationConfig: {
                            temperature: 0.3,
                            maxOutputTokens: 4096
                        }
                    })
                }
            );

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'Gemini API error');
            }

            const data = await response.json();
            const resultText = data.candidates[0].content.parts[0].text;

            // Extract JSON from markdown code blocks if present
            const jsonMatch = resultText.match(/```(?:json)?\n?([\s\S]*?)\n?```/) ||
                             resultText.match(/\{[\s\S]*\}/);

            if (!jsonMatch) {
                throw new Error('Could not parse AI response');
            }

            const scoringResult = JSON.parse(jsonMatch[1] || jsonMatch[0]);

            // Add basic statistics
            scoringResult.statistics = this.calculateStatistics();

            return scoringResult;

        } catch (error) {
            console.error('Scoring error:', error);
            throw error;
        }
    }

    // Calculate basic statistics from transcript
    calculateStatistics() {
        const userResponses = this.transcript.filter(t => t.role === 'user');

        if (userResponses.length === 0) {
            return {
                totalWords: 0,
                averageResponseLength: 0,
                responseCount: 0,
                wordsPerMinute: 0
            };
        }

        const totalWords = userResponses.reduce((sum, turn) => {
            return sum + turn.text.split(/\s+/).filter(w => w.length > 0).length;
        }, 0);

        const averageResponseLength = Math.floor(totalWords / userResponses.length);

        // Estimate WPM (words per minute) - typical IELTS test is 11-14 minutes
        const durationMinutes = this.testDuration / 60 || 12;
        const wordsPerMinute = Math.floor(totalWords / durationMinutes);

        return {
            totalWords,
            averageResponseLength,
            responseCount: userResponses.length,
            wordsPerMinute,
            testDurationMinutes: Math.floor(durationMinutes)
        };
    }

    // Simple client-side analysis (quick feedback)
    quickAnalysis() {
        const stats = this.calculateStatistics();
        const userText = this.getUserResponses();

        const feedback = {
            wordCount: stats.totalWords,
            vocabulary: this.analyzeVocabularyRange(userText),
            fluency: this.analyzeFluency(userText),
            grammar: this.analyzeGrammar(userText)
        };

        return feedback;
    }

    // Analyze vocabulary range (client-side heuristic)
    analyzeVocabularyRange(text) {
        const words = text.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
            .filter(w => w.length > 0);

        const uniqueWords = new Set(words);
        const lexicalDensity = (uniqueWords.size / words.length * 100).toFixed(1);

        // Find potentially advanced words (7+ letters, not too common)
        const commonWords = new Set(['because', 'through', 'without', 'between', 'something', 'important', 'different', 'question', 'remember', 'interest']);
        const advancedWords = [...uniqueWords].filter(w =>
            w.length >= 7 && !commonWords.has(w)
        );

        return {
            totalWords: words.length,
            uniqueWords: uniqueWords.size,
            lexicalDensity: parseFloat(lexicalDensity),
            advancedWords: advancedWords.slice(0, 20),
            estimate: lexicalDensity > 65 ? 'Good variety' :
                     lexicalDensity > 50 ? 'Moderate variety' :
                     'Limited variety'
        };
    }

    // Analyze fluency markers (client-side heuristic)
    analyzeFluency(text) {
        const fillerWords = ['um', 'uh', 'er', 'like', 'you know', 'I mean', 'actually', 'basically'];
        const repetitions = this.detectRepetitions(text);

        let fillerCount = 0;
        fillerWords.forEach(filler => {
            const regex = new RegExp(`\\b${filler}\\b`, 'gi');
            const matches = text.match(regex);
            if (matches) fillerCount += matches.length;
        });

        const wordCount = text.split(/\s+/).length;
        const fillerPercentage = (fillerCount / wordCount * 100).toFixed(1);

        return {
            fillerCount,
            fillerPercentage: parseFloat(fillerPercentage),
            repetitions: repetitions.slice(0, 10),
            estimate: fillerPercentage < 2 ? 'Fluent' :
                     fillerPercentage < 5 ? 'Moderate fluency' :
                     'Some hesitation detected'
        };
    }

    // Detect repetitions
    detectRepetitions(text) {
        const words = text.toLowerCase().split(/\s+/);
        const wordCounts = {};

        words.forEach(word => {
            if (word.length > 4) { // Only track longer words
                wordCounts[word] = (wordCounts[word] || 0) + 1;
            }
        });

        return Object.entries(wordCounts)
            .filter(([word, count]) => count > 3)
            .sort((a, b) => b[1] - a[1])
            .map(([word, count]) => ({ word, count }));
    }

    // Analyze grammar patterns (client-side heuristic)
    analyzeGrammar(text) {
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

        // Detect complex structures
        const complexMarkers = {
            'conditionals': /\b(if|unless|provided that|as long as)\b/gi,
            'passive': /\b(was|were|is|are|been|being) \w+(ed|en)\b/gi,
            'relative_clauses': /\b(which|who|whom|whose|that|where|when)\b/gi,
            'subordinate': /\b(although|though|even though|while|whereas|since|because|as)\b/gi
        };

        const detected = {};
        let totalComplex = 0;

        for (const [pattern, regex] of Object.entries(complexMarkers)) {
            const matches = text.match(regex);
            detected[pattern] = matches ? matches.length : 0;
            totalComplex += detected[pattern];
        }

        const avgWordsPerSentence = text.split(/\s+/).length / sentences.length;

        return {
            sentenceCount: sentences.length,
            avgWordsPerSentence: avgWordsPerSentence.toFixed(1),
            complexStructures: detected,
            totalComplexMarkers: totalComplex,
            estimate: totalComplex > 10 ? 'Good range of structures' :
                     totalComplex > 5 ? 'Some complex structures' :
                     'Mostly simple structures'
        };
    }

    // Generate detailed report
    generateReport(scoringResult) {
        const { overallBand, fluencyBand, vocabularyBand, grammarBand, pronunciationBand } = scoringResult;

        const report = {
            summary: {
                overallBand,
                breakdown: {
                    'Fluency & Coherence': fluencyBand,
                    'Lexical Resource': vocabularyBand,
                    'Grammatical Range & Accuracy': grammarBand,
                    'Pronunciation': pronunciationBand
                },
                cefrLevel: scoringResult.estimatedCEFR,
                statistics: scoringResult.statistics
            },
            detailedAnalysis: scoringResult.analysis,
            recommendations: scoringResult.recommendations,
            bandDescriptors: this.getBandDescriptors(overallBand)
        };

        return report;
    }

    // Get relevant band descriptors
    getBandDescriptors(band) {
        const roundedBand = Math.floor(band);

        return {
            currentLevel: {
                fluency: IELTS_LIBRARY.bandDescriptors.fluency[roundedBand],
                vocabulary: IELTS_LIBRARY.bandDescriptors.vocabulary[roundedBand],
                grammar: IELTS_LIBRARY.bandDescriptors.grammar[roundedBand],
                pronunciation: IELTS_LIBRARY.bandDescriptors.pronunciation[roundedBand]
            },
            nextLevel: roundedBand < 9 ? {
                fluency: IELTS_LIBRARY.bandDescriptors.fluency[roundedBand + 1],
                vocabulary: IELTS_LIBRARY.bandDescriptors.vocabulary[roundedBand + 1],
                grammar: IELTS_LIBRARY.bandDescriptors.grammar[roundedBand + 1],
                pronunciation: IELTS_LIBRARY.bandDescriptors.pronunciation[roundedBand + 1]
            } : null
        };
    }

    // Export transcript
    exportTranscript() {
        let output = 'IELTS SPEAKING TEST TRANSCRIPT\n';
        output += '='.repeat(60) + '\n\n';
        output += `Test Date: ${new Date().toLocaleDateString()}\n`;
        output += `Duration: ${Math.floor(this.testDuration / 60)} minutes\n\n`;

        let currentPart = 0;
        this.transcript.forEach(turn => {
            if (turn.part !== currentPart) {
                currentPart = turn.part;
                output += '\n' + '='.repeat(60) + '\n';
                output += `PART ${currentPart}\n`;
                output += '='.repeat(60) + '\n\n';
            }

            const speaker = turn.role === 'user' ? 'CANDIDATE' : 'EXAMINER';
            output += `${speaker}: ${turn.text}\n\n`;
        });

        return output;
    }

    // Reset for new test
    reset() {
        this.transcript = [];
        this.part1Transcript = [];
        this.part2Transcript = [];
        this.part3Transcript = [];
        this.testDuration = 0;
    }
}

// Create singleton instance
window.ieltsScoring = new IELTSScoring();
