// IELTS Coach AI - Gemini-powered personalized practice and feedback
// Provides adaptive feedback based on what the teacher taught in lessons

const GEMINI_MODEL = 'gemini-2.5-flash';
const GENAI_CDN = 'https://cdn.jsdelivr.net/npm/@google/genai@latest/+esm';

// Strict IELTS examiner prompt — anchored to public band descriptors,
// forces evidence-before-score and a self-challenge pass to prevent inflation.
// Placeholders: {{PART_LABEL}}, {{QUESTION}}, {{TRANSCRIPT}}, {{AUDIO_LINE}}.
const STRICT_EXAMINER_PROMPT = `You are a certified IELTS Speaking examiner marking a {{PART_LABEL}} response.
Apply the PUBLIC band descriptors STRICTLY. When evidence is ambiguous, ALWAYS
default to the lower band — the official rule is: the band that fits must match
its descriptor in full; any unmet requirement drops to the next band down.

DO NOT be encouraging. DO NOT round up. DO NOT soften. Accuracy, not motivation.

QUESTION: "{{QUESTION}}"

STUDENT RESPONSE (transcript):
"""
{{TRANSCRIPT}}
"""

{{AUDIO_LINE}}

=== BAND DESCRIPTORS (reference) ===

Fluency & Coherence (FC):
  9 — Fluent; any hesitation is content-related, not word-search.
  8 — Fluent; rare repetition/self-correction; develops topic coherently.
  7 — Long turns without noticeable effort; some hesitation/self-correction for language; flexible discourse markers.
  6 — Willing to produce long turns but coherence lost at times via hesitation, repetition, self-correction; overuses connectives.
  5 — Flow maintained but noticeable repetition/self-correction; overuses simple markers; breakdowns occur.
  4 — Cannot respond without noticeable pauses; slow, frequent repetition; links only simple sentences.

Lexical Resource (LR):
  9 — Total flexibility, precise in all contexts; sustained idiomatic/accurate use.
  8 — Flexible across varied topics; precise paraphrase; occasional inappropriacy.
  7 — Flexible across a range of topics; SOME less-common and idiomatic items with occasional inaccuracy; paraphrases effectively.
  6 — Wide enough for extended discussion despite inappropriacy; some successful paraphrase; lacks less-common items.
  5 — Sufficient for familiar topics only; limited flexibility; attempts paraphrase with limited success.
  4 — Basic vocab; frequent inappropriacy; little paraphrase.

Grammatical Range & Accuracy (GRA):
  9 — Accurate at all times (native-like slips only).
  8 — Wide range with flexibility; majority error-free; rare slips.
  7 — Range of complex structures with flexibility; frequent error-free sentences; some errors in complex forms don't impede.
  6 — Mix of short + complex; limited flexibility; frequent errors in complex forms that rarely impede communication.
  5 — Basic forms accurate; limited complex range; frequent errors in complex forms that SOMETIMES cause problems.
  4 — Basic sentence forms; rare subordinate clauses; frequent errors that can lead to misunderstanding.

Pronunciation (PR):
  9 — Full range of phonological features; effortless to understand.
  8 — Wide range; sustained appropriate rhythm/intonation; L1 does not reduce intelligibility.
  7 — Positives of band 6 + some of band 8; occasional lapses; generally easy to understand.
  6 — Range of features with mixed control; understood throughout, but mispronunciations reduce clarity at times.
  5 — Limited range; mispronunciations cause some difficulty for the listener.
  4 — Limited range; frequent mispronunciations cause strain for the listener.

=== SCORING PROCEDURE (follow in order, DO NOT skip passes) ===

PASS 1 — Evidence collection (DO NOT score yet).
For each criterion, list at least 3 pieces of EVIDENCE quoted verbatim from the
transcript (or audio for Pronunciation), each labelled (+) strength or (-) weakness,
with a one-line classification of what it shows.

PASS 2 — Tentative band per criterion.
Match your evidence to the descriptor above. Quote the exact descriptor phrase that
fits. Give a tentative band.

PASS 3 — Self-challenge (mandatory).
Re-read your own evidence. For each criterion ask:
  "Does my evidence genuinely meet EVERY requirement of band X,
   or does even one unmet requirement mean band X-0.5 is the honest mark?"
If in doubt → lower by 0.5. Write one sentence per criterion justifying keep-or-lower.

PASS 4 — Final bands.
Final FC, LR, GRA, PR. Overall = average rounded to nearest 0.5
(.25 rounds DOWN, .75 rounds UP).

=== OUTPUT (markdown, exactly this structure; emit the separator line literally) ===

## Your Band Score
| Criterion | Band | Descriptor matched |
|---|---|---|
| Fluency & Coherence | X.X | short quote from descriptor |
| Lexical Resource | X.X | short quote from descriptor |
| Grammatical Range & Accuracy | X.X | short quote from descriptor |
| Pronunciation ({{PR_BASIS}}) | X.X | short quote from descriptor |
| **Overall** | **X.X** | — |

## What you did well
- You said "exact quote from their answer" — explain in ONE line why this works (e.g. natural connector, precise word, good complex structure).
- You said "exact quote" — explain why it works.
- (optional third)

## What to work on
- You said "exact quote" — this is a [hesitation / word-choice / grammar / pronunciation] issue. Try: "corrected version" — and here is why.
- You said "exact quote" — issue + fix the same way.
- (optional third)

Write every bullet in SECOND PERSON ("you said…", "try…"). Every bullet MUST contain a verbatim quote from the student's actual words — no generic advice.

## Inline corrections

Paste the ENTIRE transcript verbatim, then mark changes inline using these exact token brackets:
- Wrap removals in ⟪del:original text⟫ (the exact words the student said)
- Wrap insertions or replacements in ⟪ins:new text⟫
- Adjacent ⟪del:X⟫⟪ins:Y⟫ means "replace X with Y"
- Only mark real problems: grammar, wrong word choice, awkward phrasing, missing cohesion. Do NOT rewrite stylistically acceptable speech.
- For Speaking, keep natural contractions and spoken rhythm — only fix what would impact the band.
- Aim for 3–10 corrections on a typical low-to-mid band response; fewer if strong.
- Do not use any other markup inside this section.

Example: I ⟪del:go⟫⟪ins:went⟫ to the park yesterday and ⟪del:it was very good⟫⟪ins:had a great time⟫⟪ins:, especially when it started raining⟫.

(your corrected transcript below, preserving every word of the original except those wrapped in ⟪del:⟫)

## Your focus for next time
ONE sentence. The single most impactful thing to practise, targeting the weakest criterion. Be concrete (e.g. "Practise answering in 3-part structure: statement, reason, example — you kept stopping after the reason.").

## Model answer at Band {{TARGET_BAND_HINT}}
Write a natural answer to the SAME question, ONE half-band above their final overall
(e.g. 5.5 → 6.0, 6.5 → 7.0). Keep their ideas where possible. The model answer must
demonstrate the target band — no higher. Replace {{TARGET_BAND_HINT}} in your heading with the actual target band (e.g. "Band 6.0").

---EXAMINER-BREAKDOWN---

## Evidence & Reasoning

### Fluency & Coherence — Band X.X
- (±) "quote" — classification
- (±) "quote" — classification
- (±) "quote" — classification
**Self-challenge:** one sentence on keep-or-lower.

### Lexical Resource — Band X.X
(same shape; note any less-common/idiomatic items actually used correctly; flag collocation errors)

### Grammatical Range & Accuracy — Band X.X
(same shape; list complex structures attempted; show at least one error + correction)

### Pronunciation — Band X.X
(same shape; if audio, cite specific mispronounced words + stress/intonation notes; if text-based, label "text-based estimate")

Remember: a strict band is more useful than a flattering one. If you feel tempted
to round up, that is the signal to round DOWN.`;

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
            // Detect quota exceeded (429)
            const is429 = error?.message?.includes('429') ||
                error?.message?.toLowerCase().includes('quota') ||
                error?.message?.toLowerCase().includes('rate limit') ||
                error?.status === 429;
            if (is429) {
                this.handleQuotaExceeded();
            }
            throw error;
        }
    }

    // Show UI warning and notify Telegram when Gemini quota is exceeded
    handleQuotaExceeded() {
        // Only fire once per session
        if (this._quotaWarned) return;
        this._quotaWarned = true;

        // UI banner
        let banner = document.getElementById('quotaBanner');
        if (!banner) {
            banner = document.createElement('div');
            banner.id = 'quotaBanner';
            banner.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:9999;background:#dc2626;color:white;padding:10px 16px;font-size:0.875rem;font-weight:600;text-align:center;';
            banner.textContent = 'Gemini AI quota exceeded — feedback will use offline scoring until quota resets (midnight PT)';
            document.body.prepend(banner);
            // Auto-dismiss after 15s
            setTimeout(() => banner.remove(), 15000);
        }

        // Telegram notification
        if (typeof telegramSender !== 'undefined' && telegramSender) {
            const session = typeof studentSession !== 'undefined' && studentSession
                ? studentSession.getSession() : null;
            const name = session ? session.name : 'Unknown';
            telegramSender.sendTextMessage(
                '<b>⚠️ Gemini Quota Exceeded</b>\n\n' +
                '<b>Student:</b> ' + name + '\n' +
                '<b>Time:</b> ' + new Date().toLocaleString() + '\n' +
                'AI feedback will fall back to offline scoring until quota resets at midnight PT.'
            ).catch(() => {});
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

    // Fill the strict examiner prompt template for one response.
    buildExaminerPrompt(transcript, partType, question, hasAudio) {
        const partLabel = { part1: 'Part 1 (Interview)', part2: 'Part 2 (Long Turn)', part3: 'Part 3 (Discussion)' }[partType] || 'Part 1';
        const audioLine = hasAudio
            ? 'AUDIO is attached. Score Pronunciation from the recording (stress, intonation, L1 interference, intelligibility).'
            : 'No audio attached. Score Pronunciation from text clues only and mark it "text-based estimate".';
        const prBasis = hasAudio ? 'audio-based' : 'text-based estimate';
        return STRICT_EXAMINER_PROMPT
            .replace('{{PART_LABEL}}', partLabel)
            .replace('{{QUESTION}}', question || 'Unknown')
            .replace('{{TRANSCRIPT}}', transcript)
            .replace('{{AUDIO_LINE}}', audioLine)
            .replace('{{PR_BASIS}}', prBasis);
    }

    // Strict IELTS examiner feedback anchored to public band descriptors.
    // Evidence-first + self-challenge pass to prevent band inflation.
    // Input: transcript, partType (part1|part2|part3), question, optional audioBlob.
    // Output: markdown string (consumed by markdownToHtml), or null if unavailable.
    async getExaminerFeedback(transcript, partType, question, audioBlob = null) {
        if (!this.hasApiKey()) return null;
        const hasAudio = audioBlob && audioBlob.size > 0;
        const prompt = this.buildExaminerPrompt(transcript, partType, question, hasAudio);
        try {
            const extraParts = [];
            if (hasAudio) {
                const base64Audio = await this.blobToBase64(audioBlob);
                const mimeType = audioBlob.type || 'audio/webm';
                extraParts.push({ inline_data: { mime_type: mimeType, data: base64Audio } });
            }
            return await this.callGemini(prompt, {
                temperature: 0.1,
                maxTokens: 4096,
                extraParts: extraParts.length > 0 ? extraParts : undefined
            });
        } catch (error) {
            console.warn('Gemini examiner feedback failed:', error.message);
            if (hasAudio) return this.getExaminerFeedback(transcript, partType, question, null);
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
