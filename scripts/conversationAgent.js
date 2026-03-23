// Conversation Agent for Topic-based Practice
// Manages conversation with Gemini AI including context and topic awareness

const CONVERSATION_STORAGE_KEY = 'conversation_practice_data';

class ConversationAgent {
    constructor() {
        this.apiKey = localStorage.getItem('gemini_api_key') || '';
        this.conversationHistory = [];
        this.processedTopic = null;
        this.topicSummary = null;
        this.maxHistoryLength = 20;
        this.loadConversation();
    }

    setApiKey(key) {
        this.apiKey = key;
        localStorage.setItem('gemini_api_key', key);
    }

    hasApiKey() {
        return this.apiKey.length > 0;
    }

    // Process raw topic notes into structured summary
    async processTopic(rawNotes) {
        if (!this.apiKey) {
            throw new Error('Gemini API key not set');
        }

        const prompt = `You are an expert educator. A student has provided content which could be either:
- Regular lesson notes (topics, concepts, facts)
- Role-play scenario (dialogue practice, conversation examples)

Analyze the content and respond accordingly:

**If it's a ROLE-PLAY scenario** (contains dialogues, Q&A patterns, conversation examples):
1. **Scenario Type**: Identify the practice type (e.g., "Shopping - Asking Prices", "Restaurant Ordering")
2. **Roles**: Who are the participants? (e.g., Customer & Shopkeeper, Student & Teacher)
3. **Context Data**: Extract key information (menu items, prices, locations, etc.)
4. **Sample Patterns**: List the question-answer patterns to practice
5. **Your Role**: Specify which role the AI should play (usually the native speaker role)

**If it's REGULAR LESSON NOTES**:
1. **Main Topic**: A clear, concise title
2. **Key Concepts**: 3-5 main ideas or points (bullet points)
3. **Important Vocabulary**: 5-10 key terms with brief definitions
4. **Learning Objectives**: What should a student understand after studying this?

Keep it concise and student-friendly. Use simple language.

Content:
${rawNotes}

Provide the structured summary:`;

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
                        maxOutputTokens: 2048
                    }
                })
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Gemini API error');
        }

        const data = await response.json();
        this.topicSummary = data.candidates[0].content.parts[0].text;
        this.processedTopic = rawNotes;

        // Reset conversation when topic changes
        this.conversationHistory = [];
        this.saveConversation();

        return this.topicSummary;
    }

    // Start a new conversation
    startConversation() {
        this.conversationHistory = [];
        this.saveConversation();
    }

    // Add message to history
    addMessage(role, content) {
        this.conversationHistory.push({
            role,
            content,
            timestamp: Date.now()
        });

        // Keep only recent messages to avoid token limits
        if (this.conversationHistory.length > this.maxHistoryLength) {
            this.conversationHistory = this.conversationHistory.slice(-this.maxHistoryLength);
        }

        this.saveConversation();
    }

    // Build system context for AI
    buildSystemContext() {
        if (!this.topicSummary) {
            return `You are a friendly, knowledgeable tutor helping a student practice conversational English.
Be encouraging, ask follow-up questions, and help them explore topics in depth.
Keep responses concise (2-4 sentences) and conversational.`;
        }

        return `You are a friendly, knowledgeable tutor helping a student practice conversational English about the following topic:

${this.topicSummary}

Guidelines:
- Reference concepts from the topic summary when relevant
- Ask thoughtful follow-up questions to deepen understanding
- Explain concepts in simple, clear language
- Be encouraging and supportive
- Keep responses concise (2-4 sentences) unless the student asks for details
- Use the vocabulary from the topic naturally in your responses`;
    }

    // Build conversation context from history
    buildConversationContext() {
        if (this.conversationHistory.length === 0) {
            return 'This is the start of the conversation.';
        }

        // Get last 5 exchanges for context
        const recentMessages = this.conversationHistory.slice(-10);
        return recentMessages
            .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
            .join('\n');
    }

    // Get AI response
    async getResponse(userMessage) {
        if (!this.apiKey) {
            throw new Error('Gemini API key not set');
        }

        // Add user message to history
        this.addMessage('user', userMessage);

        // Build context-aware prompt
        const systemContext = this.buildSystemContext();
        const conversationContext = this.buildConversationContext();

        const fullPrompt = `${systemContext}

${conversationContext}

Respond naturally to continue the conversation:`;

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${this.apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{ text: fullPrompt }]
                        }],
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 512,
                            topP: 0.9
                        }
                    })
                }
            );

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'Gemini API error');
            }

            const data = await response.json();
            const aiResponse = data.candidates[0].content.parts[0].text.trim();

            // Add AI response to history
            this.addMessage('assistant', aiResponse);

            return aiResponse;

        } catch (error) {
            // Remove user message if response failed
            this.conversationHistory.pop();
            this.saveConversation();
            throw error;
        }
    }

    // Get suggested starter questions based on topic
    getSuggestedQuestions() {
        if (!this.topicSummary) {
            return [
                "What would you like to talk about?",
                "Tell me about something you're learning.",
                "What topic are you studying right now?"
            ];
        }

        return [
            "Can you explain the main concept in your own words?",
            "What do you find most interesting about this topic?",
            "How does this topic relate to real life?",
            "What questions do you have about this topic?",
            "Can you give an example to illustrate this concept?"
        ];
    }

    // Save conversation to localStorage
    saveConversation() {
        const data = {
            conversationHistory: this.conversationHistory,
            processedTopic: this.processedTopic,
            topicSummary: this.topicSummary,
            lastUpdated: Date.now()
        };
        localStorage.setItem(CONVERSATION_STORAGE_KEY, JSON.stringify(data));
    }

    // Load conversation from localStorage
    loadConversation() {
        const stored = localStorage.getItem(CONVERSATION_STORAGE_KEY);
        if (stored) {
            try {
                const data = JSON.parse(stored);
                this.conversationHistory = data.conversationHistory || [];
                this.processedTopic = data.processedTopic || null;
                this.topicSummary = data.topicSummary || null;
            } catch (error) {
                console.error('Failed to load conversation:', error);
            }
        }
    }

    // Export conversation as text
    exportConversation() {
        const header = this.topicSummary
            ? `Topic Discussion\n${'='.repeat(50)}\n\n${this.topicSummary}\n\n${'='.repeat(50)}\n\nConversation:\n\n`
            : 'Conversation Practice\n' + '='.repeat(50) + '\n\n';

        const messages = this.conversationHistory
            .map(msg => {
                const role = msg.role === 'user' ? 'You' : 'AI Tutor';
                const time = new Date(msg.timestamp).toLocaleTimeString();
                return `[${time}] ${role}:\n${msg.content}\n`;
            })
            .join('\n');

        return header + messages;
    }

    // Clear all data
    clearAll() {
        this.conversationHistory = [];
        this.processedTopic = null;
        this.topicSummary = null;
        localStorage.removeItem(CONVERSATION_STORAGE_KEY);
    }
}

// Create singleton instance
window.conversationAgent = new ConversationAgent();
