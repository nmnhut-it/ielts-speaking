// IELTS Coach AI - Gemini-powered personalized practice and feedback
// Provides adaptive feedback based on what the teacher taught in lessons

const GEMINI_MODEL = 'gemini-2.5-flash';
const GENAI_CDN = 'https://cdn.jsdelivr.net/npm/@google/genai@latest/+esm';

class IELTSCoachAI {
    constructor() {
        this.apiKey = null;
        this.genai = null; // GoogleGenAI instance (lazy loaded)
        this.conversationHistory = [];
        this.currentLessonContext = null;
        this.studentProfile = {
            strengths: [],
            weaknesses: [],
            attemptHistory: [],
            currentLevel: null
        };
    }

    // Set API key
    setApiKey(key) {
        this.apiKey = key;
        localStorage.setItem('gemini_api_key', key);
    }

    // Load API key from storage
    loadApiKey() {
        const saved = localStorage.getItem('gemini_api_key');
        if (saved) {
            this.apiKey = saved;
            return true;
        }
        return false;
    }

    // Check if API key is set
    hasApiKey() {
        return !!this.apiKey || this.loadApiKey();
    }

    // Set current lesson context (what the teacher just taught)
    setLessonContext(moduleId, sectionId, lessonContent) {
        this.currentLessonContext = {
            moduleId,
            sectionId,
            content: lessonContent,
            timestamp: Date.now()
        };
    }

    // Convert a Blob to base64 string (without data URI prefix)
    async blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    // Lazy-load GoogleGenAI SDK from CDN
    async getGenAI() {
        if (this.genai) return this.genai;
        if (!this.hasApiKey()) throw new Error('No Gemini API key configured');
        const { GoogleGenAI } = await import(GENAI_CDN);
        this.genai = new GoogleGenAI({ apiKey: this.apiKey });
        return this.genai;
    }

    // Make API call to Gemini via SDK
    // options: temperature, maxTokens, json (boolean), extraParts (inline_data array)
    async callGemini(prompt, options = {}) {
        const ai = await this.getGenAI();

        // Build contents array: text + optional inline data (audio, images)
        const contents = [];
        if (options.extraParts && Array.isArray(options.extraParts)) {
            options.extraParts.forEach(part => {
                if (part.inline_data) {
                    contents.push({
                        inlineData: {
                            data: part.inline_data.data,
                            mimeType: part.inline_data.mime_type
                        }
                    });
                }
            });
        }
        contents.push(prompt);

        const config = {
            temperature: options.temperature || 0.7,
            maxOutputTokens: options.maxTokens || 8192,
        };

        try {
            const response = await ai.models.generateContent({
                model: GEMINI_MODEL,
                contents,
                config
            });

            const text = response.text;
            if (!text) throw new Error('No response generated');
            return text;

        } catch (error) {
            console.error('Gemini API error:', error);
            throw error;
        }
    }

    // Provide feedback on student's ideas (Module 2: Idea Generation)
    async feedbackOnIdeas(question, studentIdeas, method = '5W1H') {
        const prompt = `You are a supportive IELTS speaking teacher. The student just learned the ${method} method for generating ideas.

QUESTION: "${question}"

STUDENT'S IDEAS:
${studentIdeas}

TEACHER'S ROLE:
1. Identify which elements of ${method} they covered (be specific)
2. Praise what they did well (be genuine and specific)
3. Suggest 1-2 missing elements they could add
4. Keep your tone encouraging and constructive

FORMAT YOUR RESPONSE:
✓ Covered: [list elements they included]
💡 You did well: [specific praise]
→ To improve: [1-2 specific suggestions]

Keep it brief (4-5 sentences total). Be warm and encouraging!`;

        const response = await this.callGemini(prompt);

        // Track student's attempt
        this.studentProfile.attemptHistory.push({
            type: 'idea_generation',
            question,
            response: studentIdeas,
            feedback: response,
            timestamp: Date.now()
        });

        return response;
    }

    // Provide feedback on sentence construction (Module 3)
    async improveSentence(studentSentence, targetBand = 7.0, context = '') {
        const prompt = `You are an IELTS speaking teacher helping improve sentence quality.

STUDENT'S SENTENCE: "${studentSentence}"
${context ? `CONTEXT: ${context}` : ''}
TARGET BAND: ${targetBand}

The student learned to transform sentences by:
1. Upgrading vocabulary (like → enjoy → am really into)
2. Adding specific details (WHAT specifically)
3. Adding WHEN or WHERE
4. Adding WHY or HOW they feel

PROVIDE:
📊 Current Band Estimate: [5.0-8.0] with brief reason
✓ Strengths: [what they did well]
→ One Improvement: [specific, actionable tip]
✏️ Enhanced Version: [rewrite showing improvement]
📚 Why Better: [brief explanation]

Be specific and encouraging. Keep it concise.`;

        const response = await this.callGemini(prompt);

        this.studentProfile.attemptHistory.push({
            type: 'sentence_building',
            original: studentSentence,
            feedback: response,
            timestamp: Date.now()
        });

        return response;
    }

    // Analyze Part 2 preparation notes
    async analyzePreparationNotes(cueCardTopic, bulletPoints, studentNotes) {
        const prompt = `You are an IELTS teacher reviewing Part 2 preparation notes.

CUE CARD TOPIC: "${cueCardTopic}"
BULLET POINTS:
${bulletPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}

STUDENT'S NOTES (made in 1 minute):
${studentNotes}

The student learned to make keyword notes (not full sentences) for each bullet point.

EVALUATE:
✓ Coverage: Did they note something for all bullet points?
📝 Note Quality: Are they appropriate keywords (not full sentences)?
💡 Specificity: Could any notes be more specific/detailed?
→ Suggestions: 1-2 tips for improvement

Keep feedback brief and constructive (4-5 sentences).`;

        const response = await this.callGemini(prompt);
        return response;
    }

    // Evaluate full Part 2 response
    async evaluatePart2Response(cueCardTopic, studentResponse, bulletPoints) {
        const prompt = `You are an IELTS examiner evaluating a Part 2 response.

CUE CARD TOPIC: "${cueCardTopic}"
REQUIRED POINTS:
${bulletPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}

STUDENT'S RESPONSE:
${studentResponse}

ANALYZE:
⏱️ Estimated Time: [word count ÷ 150 = speaking time in seconds]
📋 Coverage: Did they address all 4 bullet points? [Yes/No for each]
📊 Band Estimate: [6.0-8.0]

DETAILED FEEDBACK:
✓ Strengths (2-3 points):
- [specific strength with example from their response]

→ Areas to Improve (2-3 points):
- [specific, actionable improvement]

✏️ Example Enhancement:
[Take one section and show how to improve it]

Be constructive and specific. Reference their actual response.`;

        const response = await this.callGemini(prompt);

        this.studentProfile.attemptHistory.push({
            type: 'part2_response',
            topic: cueCardTopic,
            response: studentResponse,
            feedback: response,
            timestamp: Date.now()
        });

        return response;
    }

    // Identify which Part 3 strategy student used
    async analyzeAnswerStrategy(question, studentAnswer) {
        const prompt = `You are an IELTS teacher analyzing Part 3 answer structure.

The student learned three strategies:
1. Direct Answer Plus (answer → reasons → examples)
2. Two-Sides Approach (on one hand → on the other hand → personal view)
3. Past-Present-Future (temporal structure)

QUESTION: "${question}"
STUDENT'S ANSWER: "${studentAnswer}"

ANALYZE:
🎯 Strategy Used: [which strategy or combination?]
📊 Execution: [how well did they implement it?]
💯 Band Estimate: [6.0-8.0]

FEEDBACK:
✓ What worked well:
→ One improvement:
✏️ Enhanced version of one part: [show specific improvement]

Keep it specific and actionable (5-6 sentences).`;

        const response = await this.callGemini(prompt);
        return response;
    }

    // Conduct interactive Part 1 practice conversation
    async conductPart1Practice(questionNumber, conversationHistory = [], studentResponse = null) {
        if (studentResponse) {
            // Student answered, provide brief feedback and next question
            const prompt = `You are an IELTS teacher conducting Part 1 practice.

CONVERSATION SO FAR:
${conversationHistory.map(turn => `${turn.role}: ${turn.message}`).join('\n')}

STUDENT'S LAST ANSWER: "${studentResponse}"

RESPOND AS TEACHER:
1. Brief feedback (1 sentence): What they did well or gentle improvement tip
2. Next question (natural Part 1 question that flows from conversation)

FORMAT:
💬 [Your feedback]
📝 [Next question]

Keep it natural and encouraging. Don't over-analyze, just keep conversation flowing.`;

            const response = await this.callGemini(prompt);
            return { type: 'feedback_and_question', content: response };

        } else {
            // Start new conversation
            const prompt = `You are an IELTS examiner starting Part 1. Ask a natural opening question about:
- Home/Hometown
- Work/Studies
- Hobbies/Interests
- Daily routine

Just ask ONE simple, friendly question to begin. No introduction needed.`;

            const response = await this.callGemini(prompt);
            return { type: 'question', content: response };
        }
    }

    // Conduct Part 3 discussion practice
    async conductPart3Practice(topic, difficulty = 'medium', conversationHistory = [], studentResponse = null) {
        if (!studentResponse) {
            // Ask first Part 3 question
            const prompt = `You are an IELTS examiner starting Part 3. The Part 2 topic was about: ${topic}

Ask ONE abstract, discussion-style question related to this topic.
Difficulty: ${difficulty}

Just ask the question directly, no introduction.`;

            const response = await this.callGemini(prompt);
            return { type: 'question', content: response };

        } else {
            // Respond to student's answer
            const conversationContext = conversationHistory.map(t => `${t.role}: ${t.message}`).join('\n');

            const prompt = `You are an IELTS examiner conducting Part 3.

TOPIC AREA: ${topic}
CONVERSATION:
${conversationContext}

STUDENT SAID: "${studentResponse}"

RESPOND:
- Ask a natural follow-up question (can be deeper or related angle)
- Don't give feedback yet, just keep discussion flowing
- Make it feel like natural conversation

Just ask the question directly.`;

            const response = await this.callGemini(prompt);
            return { type: 'question', content: response };
        }
    }

    // Provide comprehensive Part 3 feedback after practice session
    async providePart3Feedback(topic, conversationHistory) {
        const studentAnswers = conversationHistory
            .filter(turn => turn.role === 'student')
            .map(turn => turn.message)
            .join('\n\n');

        const prompt = `You are an IELTS teacher providing feedback after Part 3 practice.

TOPIC: ${topic}

STUDENT'S ANSWERS:
${studentAnswers}

They learned three Part 3 strategies:
1. Direct Answer Plus
2. Two-Sides Approach
3. Past-Present-Future

PROVIDE COMPREHENSIVE FEEDBACK:

📊 Overall Band Estimate: [6.0-8.0]

✓ Strengths (2-3 points):
- [specific examples from their responses]

→ Areas for Improvement (2-3 points):
- [specific, actionable tips]

💡 Strategy Usage:
- [which strategies they used well or could use more]

✏️ Example Enhancement:
[Take one answer and show improved version]

🎯 Actionable Tips for Next Practice:
1. [specific tip]
2. [specific tip]

Be thorough but encouraging. Reference specific things they said.`;

        const response = await this.callGemini(prompt, { maxTokens: 1500 });
        return response;
    }

    // Adaptive difficulty: suggest next practice level
    analyzeProgress() {
        const recentAttempts = this.studentProfile.attemptHistory.slice(-5);

        if (recentAttempts.length < 3) {
            return { level: 'beginner', suggestion: 'Keep practicing basic exercises' };
        }

        // Simple heuristic: if recent attempts show improvement, increase difficulty
        const hasConsistentSuccess = recentAttempts.length >= 3;

        return {
            level: hasConsistentSuccess ? 'intermediate' : 'beginner',
            suggestion: hasConsistentSuccess
                ? 'Try more challenging topics and Part 3 practice'
                : 'Continue with current level to build confidence',
            totalAttempts: this.studentProfile.attemptHistory.length
        };
    }

    // Generate personalized practice recommendations
    async getPersonalizedRecommendations() {
        const recentAttempts = this.studentProfile.attemptHistory.slice(-10);

        if (recentAttempts.length === 0) {
            return {
                recommendations: [
                    'Start with Module 2: Finding Ideas Fast',
                    'Practice the 5W1H method with simple topics',
                    'Build confidence with basic sentence construction'
                ],
                focus: 'foundations'
            };
        }

        // Analyze attempt types
        const attemptTypes = recentAttempts.reduce((acc, attempt) => {
            acc[attempt.type] = (acc[attempt.type] || 0) + 1;
            return acc;
        }, {});

        // Determine weak areas
        const weakAreas = [];
        if ((attemptTypes.idea_generation || 0) < 3) {
            weakAreas.push('idea_generation');
        }
        if ((attemptTypes.sentence_building || 0) < 3) {
            weakAreas.push('sentence_building');
        }
        if ((attemptTypes.part2_response || 0) < 2) {
            weakAreas.push('part2_structure');
        }

        const recommendations = [];
        if (weakAreas.includes('idea_generation')) {
            recommendations.push('Practice more idea generation with diverse topics');
            recommendations.push('Focus on using all 6 elements of 5W1H method');
        }
        if (weakAreas.includes('sentence_building')) {
            recommendations.push('Work on sentence transformation exercises');
            recommendations.push('Practice adding detail layers to simple sentences');
        }
        if (weakAreas.includes('part2_structure')) {
            recommendations.push('Complete more Part 2 full responses');
            recommendations.push('Focus on time management (2-minute structure)');
        }

        if (recommendations.length === 0) {
            recommendations.push('Great progress! Try Part 3 advanced challenges');
            recommendations.push('Practice with more abstract discussion topics');
            recommendations.push('Record yourself and self-evaluate');
        }

        return {
            recommendations,
            focus: weakAreas[0] || 'advanced_practice',
            progress: {
                totalPractice: recentAttempts.length,
                diversity: Object.keys(attemptTypes).length
            }
        };
    }

    // Get rich IELTS examiner feedback from Gemini (rendered directly as HTML)
    // Returns HTML string to display, or null if unavailable
    async getExaminerFeedback(transcript, partType, question, ruleScores, audioBlob = null) {
        if (!this.hasApiKey()) return null;

        const partLabel = { part1: 'Part 1 (Interview)', part2: 'Part 2 (Long Turn)', part3: 'Part 3 (Discussion)' }[partType] || 'Part 1';
        const hasAudio = audioBlob && audioBlob.size > 0;

        let prompt = `You are an experienced IELTS examiner giving feedback on a Speaking ${partLabel} response.

QUESTION: "${question || 'Unknown'}"

STUDENT'S RESPONSE:
"${transcript}"

Our automated scoring: Band ${ruleScores.overall} (F:${ruleScores.fluency} V:${ruleScores.vocabulary} G:${ruleScores.grammar} P:${ruleScores.pronunciation})
`;

        if (hasAudio) {
            prompt += `\nAUDIO RECORDING: I've attached the student's audio. Please assess pronunciation from the actual recording — evaluate clarity, word stress, intonation, and identify specific mispronunciations.\n`;
        }

        prompt += `
Give detailed, actionable IELTS examiner feedback. Include:

1. **Your Band Score** — give your overall band and per-criterion scores (Fluency, Vocabulary, Grammar, Pronunciation). Explain briefly why.
2. **Strengths** — what the student did well (be specific, quote their words)
3. **Areas to Improve** — specific issues with examples from their answer
4. **Pronunciation Feedback** — ${hasAudio ? 'based on the audio: specific words mispronounced, stress/intonation issues' : 'based on the text: likely pronunciation challenges'}
5. **Corrected Version** — rewrite their answer at Band 7-8 level, keeping their ideas
6. **One Key Tip** — the single most impactful thing to practice

Use markdown formatting. Be encouraging but honest. Keep it concise.`;

        try {
            const extraParts = [];
            if (hasAudio) {
                const base64Audio = await this.blobToBase64(audioBlob);
                const mimeType = audioBlob.type || 'audio/webm';
                extraParts.push({
                    inline_data: { mime_type: mimeType, data: base64Audio }
                });
            }

            const response = await this.callGemini(prompt, {
                temperature: 0.4,
                maxTokens: 4096,
                extraParts: extraParts.length > 0 ? extraParts : undefined
            });

            return response;
        } catch (error) {
            console.warn('Gemini examiner feedback failed:', error.message);
            if (hasAudio) {
                // Retry without audio
                return this.getExaminerFeedback(transcript, partType, question, ruleScores, null);
            }
            return null;
        }
    }

    // Clear conversation history
    clearConversation() {
        this.conversationHistory = [];
    }

    // Export student progress data
    exportProgress() {
        return {
            profile: this.studentProfile,
            attemptHistory: this.studentProfile.attemptHistory,
            exportDate: new Date().toISOString()
        };
    }

    // Import progress data
    importProgress(data) {
        if (data.profile) {
            this.studentProfile = data.profile;
        }
    }

    // Reset student profile
    resetProfile() {
        this.studentProfile = {
            strengths: [],
            weaknesses: [],
            attemptHistory: [],
            currentLevel: null
        };
    }
}

// Quiz validation helper
class QuizValidator {
    static checkAnswer(userAnswer, correctAnswer, explanation) {
        const isCorrect = userAnswer === correctAnswer;

        return {
            correct: isCorrect,
            feedback: isCorrect
                ? '✓ Correct! ' + explanation
                : '✗ Not quite. ' + explanation,
            emoji: isCorrect ? '🎉' : '📚'
        };
    }

    static calculateScore(answers) {
        const correct = answers.filter(a => a.correct).length;
        const total = answers.length;
        const percentage = Math.round((correct / total) * 100);

        return {
            correct,
            total,
            percentage,
            passed: percentage >= 70,
            message: percentage >= 90
                ? 'Excellent! You have a strong understanding.'
                : percentage >= 70
                    ? 'Good job! You understand the key concepts.'
                    : 'Review the material and try again.'
        };
    }
}

// Initialize global instance
if (typeof window !== 'undefined') {
    window.ieltsCoachAI = new IELTSCoachAI();
}
