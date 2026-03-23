/**
 * Module 2 Practice Configuration
 * Contains all technique definitions, section mappings, and category data
 */

// Section Type Mapping - determines how each section is rendered
const SECTION_TYPES = {
    // Audio Lessons
    m2_intro: 'audio_lesson',
    m2_5w1h: 'audio_lesson',
    m2_demo: 'audio_lesson',
    m2_prep: 'audio_lesson',
    m2_past_present: 'audio_lesson',
    m2_personal_general: 'audio_lesson',
    m2_contrast: 'audio_lesson',
    m2_feelings: 'audio_lesson',
    m2_frequency: 'audio_lesson',

    // Practice Sections
    m2_practice1: 'practice',
    m2_practice2: 'practice',
    m2_prep_practice: 'practice',
    m2_past_present_practice: 'practice',
    m2_personal_general_practice: 'practice',
    m2_contrast_practice: 'practice',
    m2_feelings_practice: 'practice',
    m2_frequency_practice: 'practice',

    // Interactive/Guides
    m2_compare: 'interactive_guide',
    m2_selection_guide: 'interactive_guide',
    m2_mixed_practice: 'ai_conversation'
};

// Map practice sections to their corresponding techniques
const SECTION_TO_TECHNIQUE = {
    m2_practice2: '5w1h',
    m2_prep_practice: 'prep',
    m2_past_present_practice: 'past_present',
    m2_personal_general_practice: 'personal_general',
    m2_contrast_practice: 'contrast',
    m2_feelings_practice: 'feelings',
    m2_frequency_practice: 'frequency'
};

// Technique Configurations - defines form fields and behavior for each technique
const TECHNIQUE_CONFIG = {
    '5w1h': {
        id: '5w1h',
        name: '5W1H Method',
        sectionId: 'm2_practice2',
        fields: [
            {
                id: 'what',
                label: 'WHAT (specifically)?',
                icon: '📌',
                placeholder: 'e.g., jazz music, badminton, photography...',
                hint: 'Be specific about what you\'re talking about'
            },
            {
                id: 'when',
                label: 'WHEN (do you do it)?',
                icon: '⏰',
                placeholder: 'e.g., in the evenings, on weekends, every day...',
                hint: 'Mention the time or frequency'
            },
            {
                id: 'where',
                label: 'WHERE (does it happen)?',
                icon: '📍',
                placeholder: 'e.g., at home, in the park, at the gym...',
                hint: 'Specify the location or place'
            },
            {
                id: 'who',
                label: 'WHO (is involved)?',
                icon: '👥',
                placeholder: 'e.g., with friends, alone, with family...',
                hint: 'Who do you do this with? (optional)'
            },
            {
                id: 'why',
                label: 'WHY (do you like/do it)?',
                icon: '❓',
                placeholder: 'e.g., because it helps me relax, it\'s fun...',
                hint: 'Give your reason or motivation'
            },
            {
                id: 'how',
                label: 'HOW (does it make you feel)?',
                icon: '💭',
                placeholder: 'e.g., relaxed, energized, happy, inspired...',
                hint: 'Describe your feelings or the impact'
            }
        ],
        breakdownKey: 'w5h1'
    },

    prep: {
        id: 'prep',
        name: 'PREP Method',
        sectionId: 'm2_prep_practice',
        fields: [
            {
                id: 'point',
                label: 'POINT (Direct Answer)',
                icon: '🎯',
                placeholder: 'Yes, I think... / No, I believe...',
                hint: 'Give a clear, direct answer to the question'
            },
            {
                id: 'reason',
                label: 'REASON (Why?)',
                icon: '💡',
                placeholder: 'Because... / The reason is...',
                hint: 'Explain your reasoning'
            },
            {
                id: 'example',
                label: 'EXAMPLE (Be Specific)',
                icon: '📋',
                placeholder: 'For instance... / For example...',
                hint: 'Give a concrete example from your experience'
            },
            {
                id: 'point_again',
                label: 'POINT Again (Restate/Extend)',
                icon: '🔁',
                placeholder: 'So overall... / That\'s why I think...',
                hint: 'Restate your position or extend your point'
            }
        ],
        breakdownKey: 'prep'
    },

    past_present: {
        id: 'past_present',
        name: 'Past vs Present',
        sectionId: 'm2_past_present_practice',
        fields: [
            {
                id: 'past',
                label: 'PAST (How it was before)',
                icon: '⏮️',
                placeholder: 'In the past... / I used to... / When I was younger...',
                hint: 'Describe how things were before'
            },
            {
                id: 'present',
                label: 'PRESENT (How it is now)',
                icon: '⏭️',
                placeholder: 'Nowadays... / These days... / Now I...',
                hint: 'Describe how things are currently'
            },
            {
                id: 'why_changed',
                label: 'WHY Changed?',
                icon: '🔄',
                placeholder: 'The change happened because... / I think it\'s due to...',
                hint: 'Explain what caused the change (optional)'
            }
        ],
        breakdownKey: 'pastPresent'
    },

    personal_general: {
        id: 'personal_general',
        name: 'Personal + General',
        sectionId: 'm2_personal_general_practice',
        fields: [
            {
                id: 'personal',
                label: 'PERSONAL Experience',
                icon: '👤',
                placeholder: 'Personally, I... / From my own experience...',
                hint: 'Start with your own perspective and specific details'
            },
            {
                id: 'general',
                label: 'GENERAL Observation',
                icon: '🌍',
                placeholder: 'As for the broader picture... / In general, people...',
                hint: 'Broaden to what you observe about others/society'
            }
        ],
        breakdownKey: 'personalGeneral'
    },

    contrast: {
        id: 'contrast',
        name: 'Contrast Technique',
        sectionId: 'm2_contrast_practice',
        fields: [
            {
                id: 'side_a',
                label: 'SIDE A (First Option)',
                icon: '⚖️',
                placeholder: 'On weekdays... / When I... / Unlike others...',
                hint: 'Describe the first situation/perspective'
            },
            {
                id: 'side_b',
                label: 'SIDE B (Contrast)',
                icon: '⚡',
                placeholder: 'But on weekends... / However, when... / While I...',
                hint: 'Describe the contrasting situation/perspective'
            },
            {
                id: 'markers',
                label: 'Contrast Words Used',
                icon: '🔤',
                placeholder: 'but, however, whereas, while, on the other hand...',
                hint: 'Signal words that show the contrast (for reference)'
            }
        ],
        breakdownKey: 'contrast'
    },

    feelings: {
        id: 'feelings',
        name: 'Feelings + Reasons',
        sectionId: 'm2_feelings_practice',
        fields: [
            {
                id: 'feelings',
                label: 'FEELINGS (Emotions)',
                icon: '💙',
                placeholder: 'It makes me feel... / I feel excited/calm/energized...',
                hint: 'Express your emotions clearly'
            },
            {
                id: 'reasons',
                label: 'REASONS (Why those feelings?)',
                icon: '🔍',
                placeholder: 'Because... / I think it\'s because... / The reason is...',
                hint: 'Explain WHY you feel that way'
            },
            {
                id: 'impact',
                label: 'IMPACT (Effect)',
                icon: '✨',
                placeholder: 'This helps me... / As a result... / It makes me...',
                hint: 'Describe the overall impact or effect (optional)'
            }
        ],
        breakdownKey: 'feelings'
    },

    frequency: {
        id: 'frequency',
        name: 'Frequency + Details',
        sectionId: 'm2_frequency_practice',
        fields: [
            {
                id: 'main_freq',
                label: 'MAIN FREQUENCY',
                icon: '⏰',
                placeholder: 'Daily / 3 times a week / Every morning / Rarely...',
                hint: 'State how often you do this'
            },
            {
                id: 'details',
                label: 'SPECIFIC DETAILS',
                icon: '📝',
                placeholder: 'On weekdays I... / Usually at... / I prefer to...',
                hint: 'Add specific circumstances and details'
            },
            {
                id: 'variations',
                label: 'VARIATIONS/EXCEPTIONS',
                icon: '🔄',
                placeholder: 'But on weekends... / During summer... / When busy...',
                hint: 'Mention different scenarios or exceptions'
            }
        ],
        breakdownKey: 'frequency'
    }
};

// Category definitions for 5W1H practice (100 questions divided into 20 categories)
const CATEGORIES = [
    { id: 'hobbies', name: 'Hobbies & Interests', start: 0, end: 5 },
    { id: 'daily', name: 'Daily Life', start: 5, end: 10 },
    { id: 'sports', name: 'Activities & Sports', start: 10, end: 15 },
    { id: 'technology', name: 'Technology & Media', start: 15, end: 20 },
    { id: 'relationships', name: 'People & Relationships', start: 20, end: 25 },
    { id: 'work', name: 'Learning & Work', start: 25, end: 30 },
    { id: 'travel', name: 'Places & Travel', start: 30, end: 35 },
    { id: 'food', name: 'Food & Cooking', start: 35, end: 40 },
    { id: 'weather', name: 'Weather & Seasons', start: 40, end: 45 },
    { id: 'shopping', name: 'Shopping & Fashion', start: 45, end: 50 },
    { id: 'home', name: 'Home & Living', start: 50, end: 55 },
    { id: 'arts', name: 'Arts & Entertainment', start: 55, end: 60 },
    { id: 'nature', name: 'Nature & Environment', start: 60, end: 65 },
    { id: 'transport', name: 'Transportation', start: 65, end: 70 },
    { id: 'health', name: 'Health & Lifestyle', start: 70, end: 75 },
    { id: 'celebrations', name: 'Celebrations & Festivals', start: 75, end: 80 },
    { id: 'pets', name: 'Pets & Animals', start: 80, end: 85 },
    { id: 'language', name: 'Language & Communication', start: 85, end: 90 },
    { id: 'memory', name: 'Memory & Childhood', start: 90, end: 95 },
    { id: 'time', name: 'Time Management', start: 95, end: 100 }
];

/**
 * Gets category name from question index
 */
function getCategoryFromIndex(index) {
    for (const cat of CATEGORIES) {
        if (index >= cat.start && index < cat.end) {
            return cat.name;
        }
    }
    return 'General';
}

/**
 * Gets questions for a specific technique or section
 */
function getQuestionsForTechnique(techniqueId, sectionId = null) {
    const module2Data = window.IELTS_LESSONS?.module2;
    if (!module2Data) return [];

    if (techniqueId === 'all') {
        const allQuestions = [];
        Object.keys(TECHNIQUE_CONFIG).forEach(techId => {
            const config = TECHNIQUE_CONFIG[techId];
            const section = module2Data.sections.find(s => s.id === config.sectionId);
            if (section?.practiceQuestions) {
                allQuestions.push(...section.practiceQuestions);
            }
        });
        return allQuestions;
    }

    if (sectionId) {
        const section = module2Data.sections.find(s => s.id === sectionId);
        if (section) {
            if (section.practiceQuestions) {
                return section.practiceQuestions;
            } else if (section.practiceQuestion) {
                return [{ question: section.practiceQuestion, sampleAnswer: null }];
            }
        }
        return [];
    }

    const config = TECHNIQUE_CONFIG[techniqueId];
    const section = module2Data.sections.find(s => s.id === config.sectionId);
    return section?.practiceQuestions || [];
}
