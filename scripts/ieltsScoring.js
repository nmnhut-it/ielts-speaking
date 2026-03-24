// IELTS Speaking Scoring System
// AI-powered + offline heuristic analysis across 4 IELTS criteria
// v3.0 — Floor/ceiling model replacing base-6.0 additive approach
//         Evidence-ratio scoring, response-level banding, basic-word detection

// Target word counts per part type
const TARGET_WORDS = { part1: 50, part2: 200, part3: 80 };

// ~300 most common English words — if ALL words are from this list, cap vocab ceiling at 5.0
const BASIC_WORD_LIST = new Set([
    'the', 'a', 'an', 'is', 'am', 'are', 'was', 'were', 'be', 'been',
    'have', 'has', 'had', 'do', 'did', 'will', 'would', 'can', 'could',
    'should', 'may', 'might', 'must', 'shall', 'i', 'you', 'he', 'she',
    'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your',
    'his', 'its', 'our', 'their', 'this', 'that', 'these', 'those',
    'what', 'which', 'who', 'whom', 'how', 'when', 'where', 'why',
    'not', 'no', 'yes', 'and', 'but', 'or', 'so', 'if', 'because',
    'about', 'after', 'before', 'between', 'from', 'in', 'into', 'of',
    'on', 'to', 'with', 'at', 'by', 'for', 'up', 'down', 'out', 'off',
    'over', 'under', 'again', 'all', 'also', 'always', 'another', 'any',
    'back', 'big', 'come', 'day', 'each', 'even', 'every', 'find',
    'first', 'get', 'give', 'go', 'good', 'great', 'here', 'high',
    'just', 'know', 'last', 'let', 'life', 'like', 'little', 'long',
    'look', 'make', 'man', 'many', 'more', 'most', 'much', 'name',
    'never', 'new', 'next', 'now', 'number', 'old', 'only', 'other',
    'own', 'part', 'people', 'place', 'point', 'right', 'same', 'say',
    'see', 'small', 'some', 'still', 'such', 'take', 'tell', 'than',
    'then', 'there', 'thing', 'think', 'time', 'too', 'try', 'turn',
    'two', 'use', 'very', 'want', 'way', 'well', 'work', 'world',
    'year', 'around', 'away', 'being', 'better', 'both', 'call', 'came',
    'change', 'children', 'city', 'close', 'country', 'different', 'does',
    'done', "don't", 'during', 'end', 'enough', 'eyes', 'family', 'far',
    'feel', 'few', 'food', 'found', 'friend', 'girl', 'going', 'got',
    'group', 'hand', 'head', 'help', 'home', 'house', 'idea', 'important',
    'keep', 'kind', 'large', 'later', 'left', 'less', 'live', 'made',
    'mind', 'money', 'morning', 'move', 'music', 'need', 'night', 'often',
    'open', 'order', 'play', 'put', 'quite', 'read', 'real', 'really',
    'room', 'run', 'school', 'second', 'set', 'show', 'side', 'since',
    'something', 'sometimes', 'soon', 'start', 'state', 'stop', 'story',
    'study', 'sure', 'talk', 'thought', 'three', 'today', 'together',
    'told', 'took', 'understand', 'until', 'upon', 'used', 'usually',
    'walk', 'water', 'went', 'while', 'without', 'woman', 'word', 'words',
    'young', 'boy', 'girl', 'eat', 'drink', 'sleep', 'sit', 'stand',
    'wait', 'watch', 'hear', 'speak', 'write', 'ask', 'answer', 'learn',
    'teach', 'buy', 'sell', 'pay', 'send', 'bring', 'leave', 'stay',
    'meet', 'begin', 'seem', 'car', 'door', 'book', 'table', 'bed',
    'chair', 'dog', 'cat', 'tree', 'sun', 'rain', 'snow', 'hot', 'cold',
    'happy', 'sad', 'nice', 'bad', 'hard', 'easy', 'fast', 'slow',
    'clean', 'white', 'black', 'red', 'blue', 'green', 'one', 'four',
    'five', 'six', 'seven', 'eight', 'nine', 'ten', 'hundred', 'thousand'
]);

// ~200 common academic/IELTS words for vocabulary detection
const ACADEMIC_WORD_LIST = [
    'analyze', 'approach', 'area', 'assess', 'assume', 'authority', 'available',
    'benefit', 'concept', 'consist', 'constitute', 'context', 'contract', 'contribute',
    'create', 'data', 'define', 'derive', 'distribute', 'economy', 'environment',
    'establish', 'estimate', 'evident', 'export', 'factor', 'finance', 'formula',
    'function', 'identify', 'income', 'indicate', 'individual', 'interpret', 'involve',
    'issue', 'labour', 'legal', 'legislate', 'major', 'method', 'occur', 'percent',
    'period', 'policy', 'principle', 'proceed', 'process', 'require', 'research',
    'respond', 'role', 'section', 'sector', 'significant', 'similar', 'source',
    'specific', 'structure', 'theory', 'vary', 'achieve', 'acquisition', 'adapt',
    'adequate', 'adjacent', 'alternative', 'annual', 'apparent', 'appreciate',
    'appropriate', 'approximate', 'aspect', 'assist', 'attitude', 'attribute',
    'category', 'chapter', 'commission', 'community', 'compensate', 'complex',
    'component', 'comprehensive', 'compute', 'conclusion', 'conduct', 'conference',
    'consequence', 'considerable', 'constant', 'constraint', 'construct', 'consult',
    'consume', 'contact', 'contemporary', 'contrast', 'controversial', 'convention',
    'coordinate', 'corporate', 'correspond', 'criteria', 'crucial', 'cultural',
    'currency', 'debate', 'decade', 'demonstrate', 'dimension', 'domestic',
    'dominant', 'draft', 'dynamic', 'element', 'eliminate', 'emerge', 'emphasis',
    'enable', 'enforce', 'enhance', 'enormous', 'ensure', 'entity', 'equip',
    'equivalent', 'evaluate', 'eventually', 'evolve', 'exceed', 'expand', 'expose',
    'external', 'facilitate', 'federal', 'foundation', 'framework', 'fundamental',
    'generate', 'generation', 'global', 'guarantee', 'hierarchy', 'hypothesis',
    'ideology', 'illustrate', 'immigrate', 'implement', 'implicate', 'implicit',
    'incentive', 'inclination', 'incorporate', 'inevitable', 'infrastructure',
    'inherent', 'initiative', 'innovation', 'insight', 'instance', 'institute',
    'integrate', 'integrity', 'intelligence', 'interact', 'intermediate', 'internal',
    'intervene', 'investigate', 'investment', 'isolate', 'justify', 'liberal',
    'license', 'likewise', 'maintain', 'manipulate', 'mechanism', 'media', 'mediate',
    'migrate', 'minimum', 'ministry', 'monitor', 'motivation', 'mutual', 'nevertheless',
    'nonetheless', 'notion', 'objective', 'obtain', 'obvious', 'participate',
    'perspective', 'phenomenon', 'philosophy', 'predominantly', 'preliminary',
    'presume', 'previous', 'primarily', 'priority', 'professional', 'prohibit',
    'promote', 'proportion', 'prospect', 'psychology', 'publication', 'pursue',
    'radical', 'random', 'range', 'ratio', 'regime', 'regulate', 'reinforce',
    'relevant', 'reluctance', 'resource', 'restore', 'restrain', 'restrict',
    'revenue', 'revolution', 'schedule', 'scheme', 'scope', 'sequence', 'shift',
    'simulate', 'sophisticated', 'subsequent', 'sufficient', 'supplement', 'survey',
    'sustain', 'symbol', 'target', 'technique', 'technology', 'temporary', 'theme',
    'transform', 'transition', 'trend', 'ultimate', 'undertake', 'utilize', 'vehicle',
    'virtual', 'visible', 'voluntary', 'widespread'
];

// Discourse markers and linking words for fluency detection
const DISCOURSE_MARKERS = [
    'however', 'moreover', 'furthermore', 'additionally', 'consequently',
    'nevertheless', 'nonetheless', 'therefore', 'thus', 'hence',
    'meanwhile', 'subsequently', 'alternatively', 'otherwise', 'accordingly',
    'in addition', 'on the other hand', 'in contrast', 'as a result',
    'for instance', 'for example', 'in particular', 'in fact', 'indeed',
    'similarly', 'likewise', 'in other words', 'that is to say',
    'to begin with', 'first of all', 'secondly', 'finally', 'in conclusion',
    'to sum up', 'overall', 'basically', 'essentially', 'primarily',
    'specifically', 'particularly', 'generally speaking', 'on the whole',
    'as far as I know', 'in my opinion', 'from my perspective',
    'having said that', 'apart from that', 'not only', 'but also',
    'despite', 'although', 'even though', 'whereas', 'while',
    'provided that', 'as long as', 'in terms of', 'with regard to',
    'as a matter of fact', 'to be honest', 'frankly speaking'
];

// Band descriptor mapping for display
const BAND_DESCRIPTORS = {
    0: 'No response given',
    0.5: 'Essentially no communicative ability',
    1.0: 'Non-user: isolated words only',
    1.5: 'Extremely limited: a few isolated words',
    2.0: 'Intermittent: single words or memorized phrases only',
    2.5: 'Extremely limited: fragmented response',
    3.0: 'Extremely limited: short phrases, frequent breakdowns',
    3.5: 'Very limited: fragmented sentences, very basic vocabulary',
    4.0: 'Very limited: frequent errors, long pauses, basic vocabulary only',
    4.5: 'Limited: many errors, hesitant, repetitive',
    5.0: 'Modest: noticeable errors, limited range, some hesitation',
    5.5: 'Developing: errors present but ideas communicated',
    6.0: 'Competent: adequate range, errors present but meaning clear',
    6.5: 'Fair: generally accurate, good range with some lapses',
    7.0: 'Good: wide range, mostly accurate, speaks at length',
    7.5: 'Very good: flexible language, high accuracy, fluent',
    8.0: 'Excellent: very wide range, rare errors, fully fluent',
    8.5: 'Expert: near-native, effortless, sophisticated',
    9.0: 'Native-like: full command of language'
};

// ============================================================
// Scoring Functions (v3.0) — Floor/Ceiling Model
// ============================================================

/**
 * Determine response level (floor/ceiling band range) from word count and structure.
 * @param {string} text - The response text
 * @param {number} wordCount - Number of words
 * @param {string} partType - 'part1'|'part2'|'part3'
 * @returns {{floor: number, ceiling: number, vocabCeiling: number|null}}
 */
function determineResponseLevel(text, wordCount, partType) {
    // Base floor/ceiling from word count
    let floor, ceiling;
    if (wordCount <= 3) { floor = 0; ceiling = 2.0; }
    else if (wordCount <= 7) { floor = 2.0; ceiling = 3.5; }
    else if (wordCount <= 15) { floor = 3.0; ceiling = 4.5; }
    else if (wordCount <= 25) { floor = 4.0; ceiling = 5.5; }
    else if (wordCount <= 40) { floor = 4.5; ceiling = 6.5; }
    else if (wordCount <= 80) { floor = 5.0; ceiling = 7.5; }
    else { floor = 5.0; ceiling = 9.0; }

    // Part 1 has lower word expectations — boost ceiling for shorter answers
    if (partType === 'part1' && wordCount >= 26 && wordCount <= 40) {
        ceiling = 7.0;
    } else if (partType === 'part1' && wordCount >= 16 && wordCount <= 25) {
        ceiling = 6.0;
    }

    let vocabCeiling = null;

    // Structural ceiling reductions
    const hasSubjectVerb = /\b(i|you|he|she|it|we|they|there)\s+\w+/i.test(text);
    if (!hasSubjectVerb) {
        ceiling = Math.min(ceiling, 3.5);
    }

    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const allShort = sentences.every(
        s => s.trim().split(/\s+/).length < 5
    );
    if (allShort && sentences.length > 0) {
        ceiling = Math.min(ceiling, 4.5);
    }

    // No subordinate clauses AND wordCount > 25 => ceiling min 5.5
    const hasSubordinate = /\b(although|though|even though|while|whereas|since|because|as|so that|in order to|if|unless|provided that|as long as|that|which|who|whom|whose|when|where|after|before|until)\b/i.test(text);
    if (!hasSubordinate && wordCount > 25) {
        ceiling = Math.min(ceiling, 5.5);
    }

    // Only one tense used AND wordCount > 25 => ceiling min 5.5
    const pastTense = /\b\w+ed\b/i.test(text);
    const presentTense = /\b(is|are|am|do|does|have|has)\b/i.test(text);
    const futureTense = /\b(will|going to|shall)\b/i.test(text);
    const tenseCount = (pastTense ? 1 : 0) + (presentTense ? 1 : 0) + (futureTense ? 1 : 0);
    if (tenseCount <= 1 && wordCount > 25) {
        ceiling = Math.min(ceiling, 5.5);
    }

    // All words from basic list => cap vocab ceiling at 5.0
    const words = text.toLowerCase().replace(/[^\w\s']/g, '').split(/\s+/).filter(w => w);
    const allBasic = words.every(w => BASIC_WORD_LIST.has(w));
    if (allBasic && wordCount > 3) {
        vocabCeiling = Math.min(ceiling, 5.0);
    }

    return { floor, ceiling, vocabCeiling };
}

/**
 * Map an evidence ratio (0-1) to a band score within floor/ceiling range.
 * @param {number} ratio - Evidence strength 0.0 to 1.0
 * @param {number} floor - Minimum possible band
 * @param {number} ceiling - Maximum possible band
 * @returns {number} Band score rounded to nearest 0.5
 */
function mapToBand(ratio, floor, ceiling) {
    const band = floor + (ceiling - floor) * ratio;
    return Math.round(band * 2) / 2;
}

/**
 * Create minimal scores for very short answers (ceiling <= 3.0).
 * @param {{floor: number, ceiling: number}} level - Response level
 * @param {number} wordCount - Word count
 * @param {string} text - The response text
 * @returns {object} Band scores and details
 */
function createMinimalScores(level, wordCount, text) {
    const band = Math.max(0, Math.round(level.ceiling * 2) / 2);
    return {
        overall: band,
        fluency: band,
        vocabulary: band,
        grammar: band,
        pronunciation: band,
        pronunciationChallenges: [],
        details: {
            strengths: [],
            weaknesses: ['Response too short to demonstrate English ability'],
            tips: ['Aim for at least 3-4 sentences in your answer']
        },
        wordCount,
        errors: []
    };
}

/**
 * Calculate structured IELTS band scores from transcript text.
 * Uses floor/ceiling model: word count sets the band range, evidence ratios place within it.
 * @param {string} transcript - The transcribed speech text
 * @param {number} [durationSeconds] - Optional speaking duration in seconds
 * @param {string} [partType] - 'part1'|'part2'|'part3' (default: 'part2')
 * @param {Blob} [audioBlob] - Optional audio for MFCC pronunciation assessment
 * @returns {object} Band scores and analysis details
 */
function calculateBandScores(transcript, durationSeconds, partType, audioBlob) {
    if (!transcript || transcript.trim().length < 3) {
        return createEmptyScores();
    }

    partType = partType || 'part2';
    const text = transcript.trim();
    const words = text.split(/\s+/).filter(w => w);
    const wordCount = words.length;

    // Step 1: Determine band range from response adequacy
    const level = determineResponseLevel(text, wordCount, partType);

    // Step 2: If ceiling is very low, return minimal scores
    if (level.ceiling <= 3.0) {
        return createMinimalScores(level, wordCount, text);
    }

    // Step 3: Calculate evidence ratios for each criterion (0.0 to 1.0)
    const lengthRatio = wordCount / TARGET_WORDS[partType];
    const fluencyEvidence = scoreFluencyEvidence(text, durationSeconds, lengthRatio);
    const vocabEvidence = scoreVocabularyEvidence(text, wordCount);
    const grammarEvidence = scoreGrammarEvidence(text);
    const pronEvidence = scorePronunciationEvidence(text, grammarEvidence.errorCount);

    // Step 4: Map evidence to band within floor/ceiling range
    let fluencyBand = mapToBand(fluencyEvidence.ratio, level.floor, level.ceiling);
    let vocabBand = mapToBand(vocabEvidence.ratio, level.floor, level.vocabCeiling || level.ceiling);
    let grammarBand = mapToBand(grammarEvidence.ratio, level.floor, level.ceiling);
    let pronBand = mapToBand(pronEvidence.ratio, level.floor, Math.min(level.ceiling, 7.0));

    // Step 5: Cross-criterion adjustments
    if (grammarEvidence.errorCount > 5) {
        vocabBand = Math.min(vocabBand, 5.5);
        fluencyBand = Math.min(fluencyBand, 5.5);
    } else if (grammarEvidence.errorCount > 3) {
        vocabBand = Math.min(vocabBand, 6.0);
    }

    // Step 6: Calculate overall
    const raw = (fluencyBand + vocabBand + grammarBand + pronBand) / 4;
    const overall = Math.round(raw * 2) / 2;

    const result = {
        overall: Math.max(2.0, Math.min(9.0, overall)),
        fluency: fluencyBand,
        vocabulary: vocabBand,
        grammar: grammarBand,
        pronunciation: pronBand,
        pronunciationChallenges: pronEvidence.pronunciationChallenges || [],
        details: buildDetails(fluencyEvidence, vocabEvidence, grammarEvidence, pronEvidence),
        wordCount,
        errors: grammarEvidence.errors || []
    };

    // If audio is provided, schedule async pronunciation enhancement
    if (audioBlob) {
        result.pronunciationPromise = assessPronunciation(
            audioBlob, text, null
        ).then(pronResult => {
            if (pronResult) {
                result.pronunciation = pronResult.band;
                result.pronunciationDetails = pronResult;
                const updatedRaw = (result.fluency + result.vocabulary +
                    result.grammar + result.pronunciation) / 4;
                result.overall = Math.max(
                    2.0, Math.min(9.0, Math.round(updatedRaw * 2) / 2)
                );
            }
        });
    }

    return result;
}

// ============================================================
// Fluency & Coherence — evidence ratio model (0-100 points -> 0.0-1.0)
// ============================================================

/**
 * Score Fluency & Coherence evidence. Returns ratio 0.0-1.0 plus detail fields.
 * Points: WPM(20) + low fillers(15) + discourse(20) + variety(15) + length(15) + multi-sentence(15)
 */
function scoreFluencyEvidence(text, durationSeconds, lengthRatio) {
    let points = 0;

    const words = text.split(/\s+/).filter(w => w);
    const wordCount = words.length;
    const durationMin = durationSeconds
        ? durationSeconds / 60
        : wordCount / 130;
    const wpm = durationMin > 0 ? wordCount / durationMin : 0;

    // Good WPM (110-160): +20 points
    if (wpm >= 110 && wpm <= 160) points += 20;
    else if (wpm >= 90 && wpm <= 180) points += 12;
    else if (wpm >= 70) points += 5;

    // Context-aware filler detection
    const fillerCount = countFillers(text);
    const fillerRatio = wordCount > 0 ? fillerCount / wordCount : 0;

    // Low filler ratio (<2%): +15 points
    if (fillerRatio < 0.02) points += 15;
    else if (fillerRatio < 0.03) points += 10;
    else if (fillerRatio < 0.05) points += 5;

    // Sentence variety
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentLengths = sentences.map(s => s.trim().split(/\s+/).length);
    const avgLen = sentLengths.reduce((a, b) => a + b, 0) / (sentLengths.length || 1);
    const variance = sentLengths.reduce((s, l) => s + Math.pow(l - avgLen, 2), 0) / (sentLengths.length || 1);
    const stdDev = Math.sqrt(variance);

    // Sentence variety (stddev >5): +15 points
    if (stdDev > 5) points += 15;
    else if (stdDev > 3) points += 10;
    else if (stdDev > 1) points += 5;

    // Discourse markers
    let discourseCount = 0;
    DISCOURSE_MARKERS.forEach(marker => {
        const regex = new RegExp('\\b' + marker.replace(/\s+/g, '\\s+') + '\\b', 'gi');
        const m = text.match(regex);
        if (m) discourseCount += m.length;
    });
    const discourseRatio = wordCount > 0 ? discourseCount / wordCount : 0;

    // Discourse markers (>4%): +20 points
    if (discourseRatio > 0.04) points += 20;
    else if (discourseRatio > 0.02) points += 14;
    else if (discourseCount > 0) points += 7;

    // Adequate length (ratio >0.75): +15 points
    if (lengthRatio > 0.75) points += 15;
    else if (lengthRatio > 0.6) points += 10;
    else if (lengthRatio > 0.4) points += 5;

    // Multiple sentences: +15 points
    if (sentences.length >= 5) points += 15;
    else if (sentences.length >= 3) points += 10;
    else if (sentences.length >= 2) points += 5;

    const ratio = Math.min(1.0, Math.max(0.0, points / 100));

    return {
        ratio,
        band: clampBand(mapToBand(ratio, 4.0, 9.0)),
        wpm: Math.round(wpm),
        fillerRatio: +(fillerRatio * 100).toFixed(1),
        fillerCount,
        discourseCount,
        sentenceVariety: +stdDev.toFixed(1),
        sentenceCount: sentences.length,
        lengthRatio: +lengthRatio.toFixed(2)
    };
}

// ============================================================
// Context-aware filler detection
// ============================================================

/** Count filler words with context awareness (avoids false positives) */
function countFillers(text) {
    let count = 0;
    const lower = text.toLowerCase();

    // Always fillers
    const alwaysFillers = ['\\bum\\b', '\\buh\\b', '\\ber\\b', '\\berm\\b', '\\byou know\\b', '\\bi mean\\b'];
    alwaysFillers.forEach(pattern => {
        const m = lower.match(new RegExp(pattern, 'gi'));
        if (m) count += m.length;
    });

    // "like" — only filler when NOT preceded by a verb/pronoun that takes "like" as object
    const likeMatches = [...lower.matchAll(/\blike\b/gi)];
    likeMatches.forEach(match => {
        const before = lower.substring(Math.max(0, match.index - 20), match.index).trim();
        if (/\b(i|we|they|you|he|she|it|would|could|don't|didn't|doesn't|really|looks?|feels?|seems?|sounds?)\s*$/.test(before)) {
            return; // real word usage
        }
        count++;
    });

    // "basically", "actually", "sort of", "kind of" — only fillers at sentence start or after comma
    const contextualFillers = ['basically', 'actually', 'sort of', 'kind of'];
    contextualFillers.forEach(filler => {
        const regex = new RegExp('(?:^|[.,;!?]\\s*)' + filler + '\\b', 'gi');
        const m = text.match(regex);
        if (m) count += m.length;
    });

    return count;
}

// ============================================================
// Vocabulary — evidence ratio model (0-100 points -> 0.0-1.0)
// ============================================================

/**
 * Score Lexical Resource evidence. Returns ratio 0.0-1.0 plus detail fields.
 * Points: TTR(20) + academic(20) + avgLen(15) + longWords(15) + phrasal(15) + beyond-basic(15)
 */
function scoreVocabularyEvidence(text, wordCount) {
    let points = 0;

    const words = text.toLowerCase().replace(/[^\w\s']/g, '').split(/\s+/).filter(w => w.length > 0);
    const wc = words.length;
    const uniqueWords = new Set(words);
    const ttr = wc > 0 ? uniqueWords.size / wc : 0;

    // Good TTR: +20 points (adjusted by length)
    if (wc < 50) {
        if (ttr > 0.80) points += 20;
        else if (ttr > 0.65) points += 14;
        else if (ttr > 0.50) points += 8;
    } else if (wc < 100) {
        if (ttr > 0.60) points += 20;
        else if (ttr > 0.50) points += 14;
        else if (ttr > 0.40) points += 8;
    } else {
        if (ttr > 0.55) points += 20;
        else if (ttr > 0.45) points += 14;
        else if (ttr > 0.35) points += 8;
    }

    // Academic words found: +20 points
    const academicSet = new Set(ACADEMIC_WORD_LIST);
    const academicFound = [...uniqueWords].filter(w => academicSet.has(w));
    const academicRatio = wc > 0 ? academicFound.length / wc : 0;

    if (academicRatio > 0.05) points += 20;
    else if (academicRatio > 0.02) points += 14;
    else if (academicFound.length > 0) points += 7;

    // Average word length >5.5: +15 points
    const avgWordLen = wc > 0 ? words.reduce((s, w) => s + w.length, 0) / wc : 0;
    if (avgWordLen > 5.5) points += 15;
    else if (avgWordLen > 4.5) points += 10;
    else if (avgWordLen > 4.0) points += 5;

    // Long words (>8 chars): +15 points
    const longWords = [...uniqueWords].filter(w => w.length > 8);
    const longRatio = wc > 0 ? longWords.length / wc : 0;
    if (longRatio > 0.08) points += 15;
    else if (longRatio > 0.04) points += 10;
    else if (longWords.length > 0) points += 5;

    // Phrasal verbs: +15 points
    const phrasalVerbs = [
        'look forward', 'come across', 'bring up', 'carry out', 'find out',
        'give up', 'go through', 'keep up', 'make up', 'point out',
        'put off', 'set up', 'take on', 'turn out', 'work out',
        'deal with', 'look into', 'rely on', 'result in', 'lead to'
    ];
    let phrasalCount = 0;
    phrasalVerbs.forEach(pv => {
        if (new RegExp('\\b' + pv + '\\b', 'gi').test(text)) phrasalCount++;
    });
    if (phrasalCount >= 3) points += 15;
    else if (phrasalCount >= 1) points += 8;

    // Words beyond basic list: +15 points
    const nonBasicWords = words.filter(w => !BASIC_WORD_LIST.has(w));
    const nonBasicRatio = wc > 0 ? nonBasicWords.length / wc : 0;
    if (nonBasicRatio > 0.30) points += 15;
    else if (nonBasicRatio > 0.15) points += 10;
    else if (nonBasicRatio > 0.05) points += 5;

    const ratio = Math.min(1.0, Math.max(0.0, points / 100));

    return {
        ratio,
        band: clampBand(mapToBand(ratio, 4.0, 9.0)),
        ttr: +ttr.toFixed(2),
        uniqueWords: uniqueWords.size,
        avgWordLength: +avgWordLen.toFixed(1),
        longWords: longWords.slice(0, 15),
        academicWords: academicFound.slice(0, 15),
        phrasalCount
    };
}

// ============================================================
// Grammar — evidence ratio model (0-100 points -> 0.0-1.0)
// ============================================================

/**
 * Score Grammatical Range & Accuracy evidence. Returns ratio 0.0-1.0 plus detail fields.
 * Points: complex(25) + tenses(15) + sentLen(15) + lowErrors(30) + variety(15)
 */
function scoreGrammarEvidence(text) {
    let points = 0;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentCount = sentences.length || 1;

    // === Complex structure detection (reused from v2) ===
    const complexPatterns = {
        conditionals: /\b(if|unless|provided that|as long as|supposing)\b/gi,
        passive: /\b(was|were|is|are|been|being|get|got|gets)\s+\w+(ed|en|t)\b/gi,
        relativeClauses: /\b(which|who|whom|whose|that)\s+\w+\s+\w+/gi,
        subordinate: /\b(although|though|even though|while|whereas|since|because|as|so that|in order to)\b/gi,
        comparatives: /\b(more|less|most|least|better|worse|best|worst)\b/gi,
        perfectTenses: /\b(have|has|had)\s+(been|never|always|already|just|ever|recently)?\s*\w+(ed|en|t)\b/gi,
        modals: /\b(would|could|should|might|may|must|ought to)\b/gi
    };

    const detected = {};
    let totalComplex = 0;
    for (const [name, regex] of Object.entries(complexPatterns)) {
        const matches = text.match(regex);
        detected[name] = matches ? matches.length : 0;
        totalComplex += detected[name];
    }

    const typesUsed = Object.values(detected).filter(v => v > 0).length;

    // Complex structures found: +25 points (more types = more points)
    if (typesUsed >= 5) points += 25;
    else if (typesUsed >= 4) points += 20;
    else if (typesUsed >= 3) points += 16;
    else if (typesUsed >= 2) points += 12;
    else if (typesUsed >= 1) points += 6;

    // Multiple tenses: +15 points
    const pastTense = (text.match(/\b\w+ed\b/gi) || []).length;
    const presentTense = (text.match(/\b(is|are|am|do|does|have|has)\b/gi) || []).length;
    const futureTense = (text.match(/\b(will|going to|shall)\b/gi) || []).length;
    const tenseMix = (pastTense > 0 ? 1 : 0) + (presentTense > 0 ? 1 : 0) + (futureTense > 0 ? 1 : 0);

    if (tenseMix >= 3) points += 15;
    else if (tenseMix >= 2) points += 10;
    else if (tenseMix >= 1) points += 4;

    // Good sentence length (12-22 avg): +15 points
    const avgWordsPerSent = text.split(/\s+/).length / sentCount;
    if (avgWordsPerSent >= 12 && avgWordsPerSent <= 22) points += 15;
    else if (avgWordsPerSent >= 8 && avgWordsPerSent <= 28) points += 10;
    else if (avgWordsPerSent >= 5) points += 4;

    // === Error detection ===
    const errors = detectGrammarErrors(text);
    const errorCount = errors.length;

    // Low error density: +30 points (no errors = full, many errors = 0)
    const errorRate = sentCount > 0 ? errorCount / sentCount : 0;
    if (errorCount === 0) points += 30;
    else if (errorRate <= 0.15) points += 22;
    else if (errorRate <= 0.3) points += 14;
    else if (errorRate <= 0.5) points += 7;
    // >0.5 errorRate = 0 points

    // Sentence variety: +15 points
    const sentLengths = sentences.map(s => s.trim().split(/\s+/).length);
    const avgLen = sentLengths.reduce((a, b) => a + b, 0) / (sentLengths.length || 1);
    const variance = sentLengths.reduce((s, l) => s + Math.pow(l - avgLen, 2), 0) / (sentLengths.length || 1);
    const stdDev = Math.sqrt(variance);

    if (stdDev > 5) points += 15;
    else if (stdDev > 3) points += 10;
    else if (stdDev > 1) points += 5;

    const ratio = Math.min(1.0, Math.max(0.0, points / 100));

    return {
        ratio,
        band: clampBand(mapToBand(ratio, 4.0, 9.0)),
        complexStructures: detected,
        totalComplex,
        typesUsed,
        avgWordsPerSentence: +avgWordsPerSent.toFixed(1),
        tenseMix,
        sentenceCount: sentCount,
        errors,
        errorCount
    };
}

// ============================================================
// Grammar Error Detection
// ============================================================

/** Detect common grammar errors in text, returns array of error objects */
function detectGrammarErrors(text) {
    const errors = [];

    // Subject-verb disagreement
    const svErrors = [
        { pattern: /\b(he|she|it)\s+(don't|have|go|make|take|come|run|do|want|need|like|think|know|get|give|say|try|use|find|tell|ask|seem|feel|leave|call|keep|let|begin|show|hear|play|move|live|believe|happen)\b/gi,
          type: 'Subject-verb agreement', desc: 'Third person singular needs -s/-es' },
        { pattern: /\b(they|we|you)\s+(was|has|does|goes|makes|takes|comes|runs|wants|needs|likes|thinks|knows|gets|gives|says|tries|uses|finds|tells|asks|seems|feels|leaves|calls|keeps|lets|begins|shows|hears|plays|moves|lives|believes|happens)\b/gi,
          type: 'Subject-verb agreement', desc: 'Plural subject with singular verb' },
    ];

    svErrors.forEach(({pattern, type, desc}) => {
        const matches = [...text.matchAll(pattern)];
        matches.forEach(m => {
            errors.push({ type, desc, text: m[0], position: m.index });
        });
    });

    // Wrong verb forms (common ESL errors)
    const wrongForms = [
        { pattern: /\b(goed|wented|runned|catched|bringed|thinked|builded|teached|speaked|writed|drived|finded|heared|leaved|meaned|payed|putted|readed|sayed|sitted|sleeped|standed|swimmed|telled|understanded)\b/gi,
          type: 'Irregular verb error', desc: 'Incorrect past tense form' },
        { pattern: /\bmore\s+(better|worse|bigger|smaller|easier|harder|faster|slower|nicer|cheaper|simpler|older|younger|taller|shorter|longer|wider|deeper)\b/gi,
          type: 'Double comparative', desc: 'Don\'t use "more" with -er comparatives' },
        { pattern: /\bmost\s+(best|worst|biggest|smallest|easiest|hardest|fastest|slowest|nicest|cheapest|simplest|oldest|youngest|tallest|shortest|longest|widest|deepest)\b/gi,
          type: 'Double superlative', desc: 'Don\'t use "most" with -est superlatives' },
    ];

    wrongForms.forEach(({pattern, type, desc}) => {
        const matches = [...text.matchAll(pattern)];
        matches.forEach(m => {
            errors.push({ type, desc, text: m[0], position: m.index });
        });
    });

    // Wrong prepositions (common ESL)
    const wrongPreps = [
        { pattern: /\b(depend|depends|depended|depending)\s+of\b/gi, type: 'Wrong preposition', desc: '"depend on" not "depend of"' },
        { pattern: /\b(arrive|arrived|arrives|arriving)\s+to\b/gi, type: 'Wrong preposition', desc: '"arrive at/in" not "arrive to"' },
        { pattern: /\b(discuss|discussed|discusses|discussing)\s+about\b/gi, type: 'Wrong preposition', desc: '"discuss X" not "discuss about X"' },
        { pattern: /\b(explain|explained|explains|explaining)\s+me\b/gi, type: 'Wrong preposition', desc: '"explain to me" not "explain me"' },
        { pattern: /\b(enter|entered|enters|entering)\s+into\s+the\s+(room|house|building|office|school|class)\b/gi, type: 'Wrong preposition', desc: '"enter the room" not "enter into the room"' },
        { pattern: /\b(married|marry)\s+with\b/gi, type: 'Wrong preposition', desc: '"married to" not "married with"' },
    ];

    wrongPreps.forEach(({pattern, type, desc}) => {
        const matches = [...text.matchAll(pattern)];
        matches.forEach(m => {
            errors.push({ type, desc, text: m[0], position: m.index });
        });
    });

    // Missing articles (cautious — only flag obvious cases)
    const needsArticle = [
        { pattern: /\b(went|go|goes|going|been|be|visit|visited|visiting)\s+to\s+(park|beach|hospital|airport|cinema|theatre|museum|library|zoo|market|restaurant|supermarket|mall|gym|pool|station|hotel|bank)\b/gi,
          type: 'Missing article', desc: 'Needs "the" before this noun' },
    ];

    needsArticle.forEach(({pattern, type, desc}) => {
        const matches = [...text.matchAll(pattern)];
        matches.forEach(m => {
            errors.push({ type, desc, text: m[0], position: m.index });
        });
    });

    // Double negatives
    const doubleNeg = /\b(don't|doesn't|didn't|can't|won't|shouldn't|wouldn't|couldn't|haven't|hasn't|hadn't)\s+\w+\s+(no|nothing|nobody|nowhere|none|never)\b/gi;
    const dnMatches = [...text.matchAll(doubleNeg)];
    dnMatches.forEach(m => {
        errors.push({ type: 'Double negative', desc: 'Avoid double negatives', text: m[0], position: m.index });
    });

    return errors;
}

// ============================================================
// Pronunciation — evidence ratio model (0-100 points -> 0.0-1.0)
// ============================================================

/**
 * Score Pronunciation evidence from text only. Returns ratio 0.0-1.0 plus detail fields.
 * Points: multiSyllable(25) + contractions(20) + soundVariety(20) + lowGrammarCorrelation(20) + length(15)
 */
function scorePronunciationEvidence(text, grammarErrorCount) {
    let points = 0;

    const words = text.toLowerCase().replace(/[^\w\s']/g, '').split(/\s+/).filter(w => w);
    const wordCount = words.length;
    const uniqueWords = new Set(words);

    // Multi-syllable words: +25 points
    const multiSyllable = [...uniqueWords].filter(w => countSyllables(w) >= 3);
    const multiRatio = wordCount > 0 ? multiSyllable.length / wordCount : 0;

    if (multiRatio > 0.08) points += 25;
    else if (multiRatio > 0.04) points += 17;
    else if (multiSyllable.length > 0) points += 8;

    // Contractions (natural speech): +20 points
    const contractions = (text.match(/\b\w+'(t|s|re|ve|ll|d|m)\b/gi) || []).length;
    if (contractions >= 4) points += 20;
    else if (contractions >= 2) points += 14;
    else if (contractions >= 1) points += 7;

    // Sound variety: +20 points
    const beginnings = new Set(words.map(w => w.substring(0, 2)));
    if (beginnings.size > 35) points += 20;
    else if (beginnings.size > 20) points += 14;
    else if (beginnings.size > 10) points += 7;

    // Low grammar error correlation: +20 points
    const errCount = grammarErrorCount || 0;
    if (errCount === 0) points += 20;
    else if (errCount <= 1) points += 14;
    else if (errCount <= 3) points += 7;
    // >3 errors = 0 points

    // Adequate length: +15 points
    if (wordCount >= 50) points += 15;
    else if (wordCount >= 30) points += 10;
    else if (wordCount >= 15) points += 5;

    const ratio = Math.min(1.0, Math.max(0.0, points / 100));

    // Detect pronunciation challenges in the text
    const pronunciationChallenges = findPronunciationChallenges(text);

    return {
        ratio,
        band: Math.min(7.0, clampBand(mapToBand(ratio, 4.0, 9.0))),
        multiSyllableCount: multiSyllable.length,
        contractions,
        soundVariety: beginnings.size,
        pronunciationChallenges,
        note: 'Text-based estimate only. Record audio for accurate pronunciation assessment.',
        isTextOnly: true
    };
}

// ============================================================
// MFCC-based pronunciation assessment (async, uses audio)
// ============================================================

/**
 * Assess pronunciation using word-mismatch detection and optional MFCC spectral comparison.
 * Combines transcription accuracy with audio spectral analysis when available.
 * @param {Blob} audioBlob - Student's recorded audio
 * @param {string} transcribedText - What Whisper heard the student say
 * @param {string} expectedText - What the student intended to say (cue card / question)
 * @returns {Promise<object>} Pronunciation score with mismatches and optional MFCC data
 */
async function assessPronunciation(audioBlob, transcribedText, expectedText) {
    const result = {
        band: 6.0,
        mismatchedWords: [],
        mfccScore: null,
        note: '',
        isAudioBased: false
    };

    // METHOD 1: Word mismatch detection (works if both texts available)
    if (transcribedText && expectedText) {
        const mismatches = detectPronunciationMismatches(
            transcribedText, expectedText
        );
        result.mismatchedWords = mismatches;

        const expectedWordCount = expectedText.split(/\s+/).length;
        const mismatchRatio = mismatches.length / Math.max(1, expectedWordCount);

        if (mismatchRatio === 0) result.band = 7.0;
        else if (mismatchRatio < 0.05) result.band = 6.5;
        else if (mismatchRatio < 0.1) result.band = 6.0;
        else if (mismatchRatio < 0.2) result.band = 5.5;
        else result.band = 5.0;
    }

    // METHOD 2: MFCC spectral comparison (if audio + TTS available)
    if (audioBlob) {
        try {
            const studentAudio = await decodeAudioBlob(audioBlob);
            const refText = transcribedText || expectedText;
            const referenceAudio = await generateReferenceAudio(refText);

            if (referenceAudio) {
                const studentMFCC = extractMFCC(
                    studentAudio.data, studentAudio.sampleRate
                );
                const referenceMFCC = extractMFCC(
                    referenceAudio.data, referenceAudio.sampleRate
                );
                const distance = dtwDistance(studentMFCC, referenceMFCC);

                const MAX_DISTANCE = 300;
                const normalized = Math.min(1, distance / MAX_DISTANCE);
                const mfccBand = Math.round(
                    (8.0 - normalized * 4.0) * 2
                ) / 2;

                result.mfccScore = {
                    band: Math.max(4.0, Math.min(8.0, mfccBand)),
                    distance: +distance.toFixed(1),
                    normalized: +normalized.toFixed(3)
                };
                result.isAudioBased = true;

                // Blend: 60% MFCC, 40% mismatch when both available
                const MFCC_WEIGHT = 0.6;
                const MISMATCH_WEIGHT = 0.4;
                if (result.mismatchedWords.length > 0) {
                    result.band = Math.round(
                        (result.mfccScore.band * MFCC_WEIGHT +
                         result.band * MISMATCH_WEIGHT) * 2
                    ) / 2;
                } else {
                    result.band = result.mfccScore.band;
                }
            }
        } catch (e) {
            console.warn('MFCC assessment failed:', e);
        }
    }

    result.note = result.isAudioBased
        ? 'Based on spectral analysis + word accuracy'
        : 'Based on transcription accuracy (load audio models for full assessment)';

    return result;
}

/** Decode audio blob to Float32Array */
async function decodeAudioBlob(blob) {
    const arrayBuffer = await blob.arrayBuffer();
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    const data = audioBuffer.getChannelData(0);
    const sampleRate = audioBuffer.sampleRate;
    await ctx.close();
    return { data, sampleRate };
}

/**
 * Generate reference audio using SpeechT5 TTS or browser fallback.
 * @param {string} text - Text to synthesize
 * @returns {Promise<{data: Float32Array, sampleRate: number}|null>}
 */
async function generateReferenceAudio(text) {
    // Use SpeechT5 if available (loaded via ttsService)
    const tts = window.ttsService;
    if (tts && tts.isLoaded && tts.ttsModel) {
        try {
            const output = await tts.ttsModel(text, {
                speaker_embeddings: tts.speakerEmbeddings
            });
            return {
                data: output.audio,
                sampleRate: output.sampling_rate || 16000
            };
        } catch (e) {
            console.warn('SpeechT5 reference generation failed:', e);
        }
    }

    // Fallback: browser speechSynthesis capture
    return await captureReferenceSpeechSynthesis(text);
}

/**
 * Fallback: attempt to capture browser speechSynthesis output.
 * Browser speechSynthesis doesn't expose raw audio directly,
 * so this returns null — MFCC comparison requires raw audio data.
 * @param {string} text - Text to synthesize
 * @returns {Promise<null>}
 */
async function captureReferenceSpeechSynthesis(text) {
    // Browser speechSynthesis does not provide raw PCM data.
    // Without raw audio, MFCC extraction is not possible.
    // The word-mismatch approach will be used instead.
    return null;
}

// ============================================================
// Word-level pronunciation mismatch detection
// ============================================================

/** Common English pronunciation issues for ESL speakers */
const PRONUNCIATION_TIPS = {
    th: 'Practice the "th" sound: tongue between teeth, blow air (think, that, three)',
    v_w: '"v" = top teeth on lower lip; "w" = round lips (very vs. wary)',
    r_l: '"r" = tongue curled back, no contact; "l" = tongue tip touches ridge (right vs. light)',
    i_ee: 'Short "i" (sit) vs. long "ee" (seat) — jaw position matters',
    a_e: 'Short "a" (bat) vs. short "e" (bet) — mouth wider for "a"',
    s_sh: '"s" = teeth together, tongue tip up; "sh" = lips slightly rounded (see vs. she)',
    b_p: '"b" = voiced (feel vibration); "p" = unvoiced with puff of air',
    final_consonants: 'Don\'t drop final consonants: pronounce the -t, -d, -s at word endings',
    word_stress: 'English has stressed syllables: "imPORtant" not "IMportant"',
    linking: 'Link words smoothly: "an apple" sounds like "a-napple"'
};

/**
 * Detect word-level pronunciation mismatches between transcription and expected text.
 * If Whisper heard "jars" but user meant "jazz", that signals a pronunciation issue.
 * @param {string} transcribed - What the STT heard
 * @param {string} expected - What the student intended to say
 * @returns {Array<object>} List of mismatched words with feedback
 */
function detectPronunciationMismatches(transcribed, expected) {
    const mismatches = [];

    const tWords = transcribed.toLowerCase()
        .replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w);
    const eWords = expected.toLowerCase()
        .replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w);

    const minLen = Math.min(tWords.length, eWords.length);
    const SIMILARITY_THRESHOLD = 0.4;

    for (let i = 0; i < minLen; i++) {
        if (tWords[i] !== eWords[i]) {
            const similarity = wordSimilarity(tWords[i], eWords[i]);
            if (similarity > SIMILARITY_THRESHOLD) {
                mismatches.push({
                    expected: eWords[i],
                    heard: tWords[i],
                    similarity: +similarity.toFixed(2),
                    position: i,
                    feedback: getPronunciationTip(eWords[i], tWords[i])
                });
            }
        }
    }

    return mismatches;
}

/**
 * Word similarity using Dice coefficient on character bigrams.
 * @param {string} word1 - First word
 * @param {string} word2 - Second word
 * @returns {number} Similarity score 0-1
 */
function wordSimilarity(word1, word2) {
    if (word1 === word2) return 1;
    if (!word1 || !word2) return 0;

    const bigrams1 = new Set();
    const bigrams2 = new Set();
    for (let i = 0; i < word1.length - 1; i++) {
        bigrams1.add(word1.substring(i, i + 2));
    }
    for (let i = 0; i < word2.length - 1; i++) {
        bigrams2.add(word2.substring(i, i + 2));
    }

    let intersection = 0;
    bigrams1.forEach(b => { if (bigrams2.has(b)) intersection++; });

    return (2.0 * intersection) / (bigrams1.size + bigrams2.size);
}

/**
 * Get a pronunciation tip based on the expected vs. heard word pair.
 * Detects common ESL confusion patterns (th, v/w, r/l, etc.).
 * @param {string} expected - The intended word
 * @param {string} heard - What was transcribed
 * @returns {string} Actionable pronunciation tip
 */
function getPronunciationTip(expected, heard) {
    const e = expected.toLowerCase();
    const h = heard.toLowerCase();

    if ((e.includes('th') && !h.includes('th')) ||
        (h.includes('t') && e.includes('th'))) {
        return PRONUNCIATION_TIPS.th;
    }
    if ((e.startsWith('v') && h.startsWith('w')) ||
        (e.startsWith('w') && h.startsWith('v'))) {
        return PRONUNCIATION_TIPS.v_w;
    }
    if ((e.includes('r') && h.includes('l')) ||
        (e.includes('l') && h.includes('r'))) {
        return PRONUNCIATION_TIPS.r_l;
    }
    if ((e.includes('sh') && h.includes('s') && !h.includes('sh')) ||
        (e.includes('s') && !e.includes('sh') && h.includes('sh'))) {
        return PRONUNCIATION_TIPS.s_sh;
    }
    if ((e.startsWith('b') && h.startsWith('p')) ||
        (e.startsWith('p') && h.startsWith('b'))) {
        return PRONUNCIATION_TIPS.b_p;
    }

    return 'Practice saying "' + expected + '" clearly — you said "' + heard + '"';
}

// ============================================================
// Pronunciation challenge detection (text-based)
// ============================================================

/** Words with tricky pronunciation patterns for ESL speakers */
const CHALLENGING_PATTERNS = {
    th_words: /\b(the|this|that|these|those|think|thought|through|though|them|they|their|there|than|then|three|thing|throw|thousand|theater|therapy|theory|therefore|throughout|thoroughly)\b/gi,
    consonant_clusters: /\b(strengths|months|sixths|twelfths|lengths|depths|breadths|widths|worlds|asks|desks|masks|risks|tasks|texts|contexts|scripts)\b/gi,
    silent_letters: /\b(psychology|knife|know|knight|write|wrong|listen|castle|whistle|island|debt|doubt|subtle|receipt|pneumonia|Wednesday|February|colonel)\b/gi,
    stress_variable: /\b(record|present|object|project|produce|conduct|contract|conflict|contest|convert|decrease|desert|digest|discount|export|import|increase|insult|permit|progress|protest|rebel|refund|reject|subject|suspect|survey|transfer|transport)\b/gi
};

/**
 * Find pronunciation challenges in the text — tricky words for ESL speakers.
 * @param {string} text - The transcript text
 * @returns {Array<object>} List of challenging words with categories
 */
function findPronunciationChallenges(text) {
    const challenges = [];
    const seen = new Set();

    const categories = {
        th_words: { label: '"th" sound', tip: PRONUNCIATION_TIPS.th },
        consonant_clusters: {
            label: 'Consonant cluster',
            tip: 'Pronounce every consonant — don\'t simplify clusters'
        },
        silent_letters: {
            label: 'Silent letter',
            tip: 'This word has silent letters — learn the correct pronunciation'
        },
        stress_variable: {
            label: 'Stress pattern',
            tip: PRONUNCIATION_TIPS.word_stress
        }
    };

    for (const [key, regex] of Object.entries(CHALLENGING_PATTERNS)) {
        const matches = text.match(regex) || [];
        matches.forEach(word => {
            const lower = word.toLowerCase();
            if (!seen.has(lower)) {
                seen.add(lower);
                challenges.push({
                    word: lower,
                    category: categories[key].label,
                    tip: categories[key].tip
                });
            }
        });
    }

    return challenges;
}

// ============================================================
// MFCC-based spectral features
// ============================================================

/**
 * Extract MFCC features from audio signal.
 * Simplified 13-coefficient MFCC extraction.
 * @param {Float32Array} signal - Audio samples
 * @param {number} sampleRate - Sample rate in Hz
 * @returns {number[][]} Array of MFCC coefficient vectors
 */
function extractMFCC(signal, sampleRate) {
    const frameSize = Math.round(sampleRate * 0.025); // 25ms frames
    const hopSize = Math.round(sampleRate * 0.010);   // 10ms hop
    const numMelBands = 26;
    const numCoeffs = 13;
    const frames = [];

    for (let i = 0; i + frameSize <= signal.length; i += hopSize) {
        const frame = new Float32Array(frameSize);
        for (let j = 0; j < frameSize; j++) {
            const window = 0.54 - 0.46 * Math.cos(2 * Math.PI * j / (frameSize - 1));
            frame[j] = signal[i + j] * window;
        }

        const power = computePowerSpectrum(frame);
        const melEnergies = applyMelFilterbank(power, sampleRate, numMelBands);
        const logMel = melEnergies.map(e => Math.log(Math.max(e, 1e-10)));
        const mfcc = dct(logMel, numCoeffs);

        frames.push(mfcc);
    }

    return frames;
}

/** Simplified power spectrum (magnitude squared of DFT) */
function computePowerSpectrum(frame) {
    const N = frame.length;
    const power = new Float32Array(N / 2 + 1);
    for (let k = 0; k <= N / 2; k++) {
        let real = 0, imag = 0;
        for (let n = 0; n < N; n++) {
            const angle = -2 * Math.PI * k * n / N;
            real += frame[n] * Math.cos(angle);
            imag += frame[n] * Math.sin(angle);
        }
        power[k] = (real * real + imag * imag) / N;
    }
    return power;
}

/** Convert frequency to mel scale */
function hzToMel(hz) { return 2595 * Math.log10(1 + hz / 700); }
function melToHz(mel) { return 700 * (Math.pow(10, mel / 2595) - 1); }

/** Apply triangular mel filterbank */
function applyMelFilterbank(power, sampleRate, numBands) {
    const N = (power.length - 1) * 2;
    const maxFreq = sampleRate / 2;
    const melMax = hzToMel(maxFreq);
    const melMin = hzToMel(0);

    const centers = [];
    for (let i = 0; i <= numBands + 1; i++) {
        const mel = melMin + (melMax - melMin) * i / (numBands + 1);
        centers.push(Math.round(melToHz(mel) * N / sampleRate));
    }

    const energies = new Float32Array(numBands);
    for (let i = 0; i < numBands; i++) {
        const left = centers[i];
        const center = centers[i + 1];
        const right = centers[i + 2];

        for (let k = left; k < right && k < power.length; k++) {
            let weight = 0;
            if (k < center) {
                weight = (k - left) / Math.max(1, center - left);
            } else {
                weight = (right - k) / Math.max(1, right - center);
            }
            energies[i] += power[k] * weight;
        }
    }
    return energies;
}

/** Discrete Cosine Transform (type II) */
function dct(input, numCoeffs) {
    const N = input.length;
    const output = new Float32Array(numCoeffs);
    for (let k = 0; k < numCoeffs; k++) {
        let sum = 0;
        for (let n = 0; n < N; n++) {
            sum += input[n] * Math.cos(Math.PI * k * (n + 0.5) / N);
        }
        output[k] = sum;
    }
    return output;
}

/** Dynamic Time Warping distance between two MFCC sequences */
function dtwDistance(seq1, seq2) {
    if (!seq1.length || !seq2.length) return Infinity;

    const maxLen = 200;
    const s1 = seq1.length > maxLen ? downsampleFrames(seq1, maxLen) : seq1;
    const s2 = seq2.length > maxLen ? downsampleFrames(seq2, maxLen) : seq2;

    const N = s1.length;
    const M = s2.length;

    const dtw = Array.from({length: N + 1}, () => new Float32Array(M + 1).fill(Infinity));
    dtw[0][0] = 0;

    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= M; j++) {
            const cost = euclideanDistance(s1[i - 1], s2[j - 1]);
            dtw[i][j] = cost + Math.min(dtw[i - 1][j], dtw[i][j - 1], dtw[i - 1][j - 1]);
        }
    }

    return dtw[N][M] / (N + M);
}

/** Euclidean distance between two vectors */
function euclideanDistance(a, b) {
    let sum = 0;
    const len = Math.min(a.length, b.length);
    for (let i = 0; i < len; i++) {
        sum += (a[i] - b[i]) * (a[i] - b[i]);
    }
    return Math.sqrt(sum);
}

/** Downsample MFCC frames to target length */
function downsampleFrames(frames, targetLen) {
    const step = frames.length / targetLen;
    const result = [];
    for (let i = 0; i < targetLen; i++) {
        result.push(frames[Math.floor(i * step)]);
    }
    return result;
}

// ============================================================
// Details builder — includes error info
// ============================================================

/** Build strengths, weaknesses, tips from sub-scores */
function buildDetails(fluency, vocab, grammar, pron) {
    const strengths = [];
    const weaknesses = [];
    const tips = [];

    // Fluency
    if (fluency.band >= 7.0) strengths.push('Fluent and well-paced (' + fluency.wpm + ' wpm)');
    else if (fluency.band >= 6.5) strengths.push('Generally fluent pace');

    if (fluency.discourseCount >= 5) strengths.push('Effective use of discourse markers (' + fluency.discourseCount + ' found)');

    if (fluency.fillerRatio > 3) {
        weaknesses.push('High filler word usage (' + fluency.fillerRatio + '%)');
        tips.push('Replace fillers (um, uh) with brief pauses — silence is better than fillers');
    }
    if (fluency.discourseCount < 2 && fluency.sentenceCount > 2) {
        weaknesses.push('Few linking words — ideas feel disconnected');
        tips.push('Use connectors: "however", "moreover", "for instance", "having said that"');
    }
    if (fluency.lengthRatio < 0.6) {
        weaknesses.push('Answer too short for this part type');
        tips.push('Develop your ideas more — add examples, reasons, and personal experiences');
    }

    // Vocabulary
    if (vocab.band >= 7.0) strengths.push('Good vocabulary range (TTR: ' + vocab.ttr + ', ' + vocab.uniqueWords + ' unique words)');
    if (vocab.academicWords.length >= 4) strengths.push('Strong academic vocabulary: ' + vocab.academicWords.slice(0, 5).join(', '));
    if (vocab.phrasalCount >= 2) strengths.push('Uses phrasal verbs naturally');

    if (vocab.ttr < 0.40 && vocab.uniqueWords > 20) {
        weaknesses.push('Repetitive word choice (TTR: ' + vocab.ttr + ')');
        tips.push('Paraphrase repeated words — use synonyms and related expressions');
    }
    if (vocab.academicWords.length === 0 && vocab.band < 7) {
        weaknesses.push('No academic/advanced vocabulary detected');
        tips.push('Incorporate words like "significant", "perspective", "consequently", "enhance"');
    }

    // Grammar
    if (grammar.band >= 7.0) strengths.push('Good grammatical range (' + grammar.typesUsed + ' complex structure types)');
    if (grammar.typesUsed >= 4) strengths.push('Varied sentence structures');
    if (grammar.errorCount === 0 && grammar.sentenceCount > 3) strengths.push('No grammar errors detected');

    if (grammar.errorCount > 0) {
        const errorTypes = [...new Set(grammar.errors.map(e => e.type))];
        weaknesses.push(grammar.errorCount + ' grammar error(s) detected: ' + errorTypes.join(', '));
        grammar.errors.slice(0, 3).forEach(e => {
            tips.push('Fix: "' + e.text + '" — ' + e.desc);
        });
    }
    if (grammar.typesUsed <= 1) {
        weaknesses.push('Mostly simple sentence structures');
        tips.push('Add complexity: "Although...", "If I had...", "which means that..."');
    }
    if (grammar.tenseMix < 2) {
        weaknesses.push('Limited tense variety');
        tips.push('Mix past, present, and future tenses to show grammatical range');
    }

    // Pronunciation
    if (pron.isTextOnly) {
        if (pron.band >= 6.5) strengths.push('Uses multi-syllable words confidently');
        if (pron.contractions >= 3) strengths.push('Natural contractions suggest spoken fluency');
        if (pron.contractions === 0 && pron.band < 6.5) {
            weaknesses.push('No contractions — may sound overly formal');
            tips.push('Use contractions (I\'m, don\'t, it\'s) for more natural speech');
        }
        if (pron.pronunciationChallenges && pron.pronunciationChallenges.length > 0) {
            const challengeCount = pron.pronunciationChallenges.length;
            const categories = [...new Set(pron.pronunciationChallenges.map(c => c.category))];
            tips.push('Practice ' + challengeCount + ' tricky word(s): ' + categories.join(', '));
        }
    }

    // Ensure at least one of each
    if (strengths.length === 0) strengths.push('Communicates basic ideas');
    if (weaknesses.length === 0) weaknesses.push('Could further develop range and complexity');
    if (tips.length === 0) tips.push('Practice speaking on varied topics to build confidence');

    return { strengths, weaknesses, tips };
}

// ============================================================
// Utility functions
// ============================================================

/** Get band descriptor text for a score */
function getBandDescriptor(band) {
    const rounded = Math.round(band * 2) / 2;
    return BAND_DESCRIPTORS[rounded] || BAND_DESCRIPTORS[Math.floor(band)] || 'Score unavailable';
}

/** Clamp band to 2.0-9.0 range, rounded to nearest 0.5 */
function clampBand(score) {
    const clamped = Math.max(2.0, Math.min(9.0, score));
    return Math.round(clamped * 2) / 2;
}

/** Estimate speaking duration from word count (assuming ~130 wpm) */
function estimateDuration(wordCount) {
    const WPM_ESTIMATE = 130;
    return wordCount / WPM_ESTIMATE;
}

/** Estimate syllables in a word (rough English heuristic) */
function countSyllables(word) {
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
}

/** Return empty scores structure */
function createEmptyScores() {
    return {
        overall: 0, fluency: 0, vocabulary: 0, grammar: 0, pronunciation: 0,
        details: { strengths: [], weaknesses: [], tips: [] },
        wordCount: 0,
        errors: []
    };
}

/** Get color based on band score */
function getScoreColor(band) {
    if (band >= 7.0) return '#28a745';
    if (band >= 5.5) return '#ffc107';
    return '#dc3545';
}

/**
 * Render scoring results as HTML with visual bars.
 * @param {object} scores - Output from calculateBandScores()
 * @param {object} [previousScores] - Optional previous scores for trend display
 * @returns {string} HTML string
 */
function renderScoreHTML(scores, previousScores) {
    if (!scores || scores.overall === 0) {
        return '<p style="color: #999;">Not enough text to score.</p>';
    }

    const criteria = [
        { label: 'Fluency & Coherence', key: 'fluency', prevKey: 'fluency' },
        { label: 'Lexical Resource', key: 'vocabulary', prevKey: 'vocab' },
        { label: 'Grammatical Range', key: 'grammar', prevKey: 'grammar' },
        { label: (scores.pronunciationDetails && scores.pronunciationDetails.isAudioBased) ? 'Pronunciation' : 'Pronunciation (est.)', key: 'pronunciation', prevKey: 'pronunciation' }
    ];

    let html = '<div class="ielts-score-display">';

    // Overall band
    const overallColor = getScoreColor(scores.overall);
    html += '<div class="score-overall" style="text-align:center;margin-bottom:16px;">';
    html += '<div style="font-size:2.2em;font-weight:700;color:' + overallColor + ';">' + scores.overall + '</div>';
    html += '<div style="font-size:0.85em;color:#666;">Overall Band Score</div>';
    html += '<div style="font-size:0.8em;color:#888;margin-top:2px;">' + getBandDescriptor(scores.overall) + '</div>';
    html += '</div>';

    // Criteria bars
    criteria.forEach(c => {
        const val = scores[c.key];
        const pct = ((val - 3) / 6) * 100; // 3-9 range mapped to 0-100%
        const color = getScoreColor(val);

        let trendHTML = '';
        if (previousScores && previousScores[c.prevKey]) {
            const prev = previousScores[c.prevKey];
            const delta = +(val - prev).toFixed(1);
            if (delta > 0) {
                trendHTML = ' <span style="color:#28a745;font-size:0.8em;">+' + delta + '</span>';
            } else if (delta < 0) {
                trendHTML = ' <span style="color:#dc3545;font-size:0.8em;">' + delta + '</span>';
            }
        }

        html += '<div style="margin-bottom:10px;">';
        html += '<div style="display:flex;justify-content:space-between;font-size:0.85em;margin-bottom:3px;">';
        html += '<span>' + c.label + '</span>';
        html += '<span style="font-weight:600;">' + val + trendHTML + '</span>';
        html += '</div>';
        html += '<div style="background:#e9ecef;border-radius:4px;height:8px;overflow:hidden;">';
        html += '<div style="width:' + Math.max(5, pct) + '%;height:100%;background:' + color + ';border-radius:4px;transition:width 0.3s;"></div>';
        html += '</div>';
        html += '</div>';
    });

    // Strengths & Weaknesses
    if (scores.details) {
        if (scores.details.strengths.length > 0) {
            html += '<div style="margin-top:12px;"><strong style="color:#28a745;font-size:0.85em;">Strengths:</strong>';
            html += '<ul style="margin:4px 0;padding-left:18px;font-size:0.83em;color:#555;">';
            scores.details.strengths.forEach(s => { html += '<li>' + s + '</li>'; });
            html += '</ul></div>';
        }
        if (scores.details.weaknesses.length > 0) {
            html += '<div style="margin-top:8px;"><strong style="color:#dc3545;font-size:0.85em;">Areas to Improve:</strong>';
            html += '<ul style="margin:4px 0;padding-left:18px;font-size:0.83em;color:#555;">';
            scores.details.weaknesses.forEach(w => { html += '<li>' + w + '</li>'; });
            html += '</ul></div>';
        }
        if (scores.details.tips.length > 0) {
            html += '<div style="margin-top:8px;"><strong style="color:#007bff;font-size:0.85em;">Tips:</strong>';
            html += '<ul style="margin:4px 0;padding-left:18px;font-size:0.83em;color:#555;">';
            scores.details.tips.forEach(t => { html += '<li>' + t + '</li>'; });
            html += '</ul></div>';
        }
    }

    // Pronunciation details (mismatched words from audio assessment)
    if (scores.pronunciationDetails &&
        scores.pronunciationDetails.mismatchedWords &&
        scores.pronunciationDetails.mismatchedWords.length > 0) {
        html += '<div style="margin-top:12px;border:1px solid #f0ad4e;border-radius:6px;padding:10px;background:#fff8e1;">';
        html += '<strong style="color:#e65100;font-size:0.85em;">Pronunciation Notes:</strong>';
        html += '<ul style="margin:6px 0 0;padding-left:18px;font-size:0.82em;color:#555;">';
        scores.pronunciationDetails.mismatchedWords.forEach(m => {
            html += '<li>You said "<strong>' + m.heard +
                '</strong>" — did you mean "<strong>' + m.expected +
                '</strong>"?';
            if (m.feedback) {
                html += ' <em style="color:#888;">' + m.feedback + '</em>';
            }
            html += '</li>';
        });
        html += '</ul></div>';
    }

    // Pronunciation challenges (tricky words detected in text)
    if (scores.pronunciationChallenges &&
        scores.pronunciationChallenges.length > 0) {
        html += '<div style="margin-top:8px;border:1px solid #90caf9;border-radius:6px;padding:10px;background:#e3f2fd;">';
        html += '<strong style="color:#1565c0;font-size:0.85em;">Pronunciation Challenges Found:</strong>';
        html += '<ul style="margin:6px 0 0;padding-left:18px;font-size:0.82em;color:#555;">';
        const MAX_CHALLENGES_SHOWN = 5;
        scores.pronunciationChallenges.slice(0, MAX_CHALLENGES_SHOWN).forEach(c => {
            html += '<li><strong>' + c.word + '</strong> (' +
                c.category + ') — ' + c.tip + '</li>';
        });
        if (scores.pronunciationChallenges.length > MAX_CHALLENGES_SHOWN) {
            html += '<li style="color:#999;">...and ' +
                (scores.pronunciationChallenges.length - MAX_CHALLENGES_SHOWN) +
                ' more</li>';
        }
        html += '</ul></div>';
    }

    // MFCC score info if available
    if (scores.pronunciationDetails &&
        scores.pronunciationDetails.mfccScore) {
        const mfcc = scores.pronunciationDetails.mfccScore;
        html += '<div style="margin-top:6px;font-size:0.75em;color:#777;">';
        html += 'Spectral analysis: distance=' + mfcc.distance +
            ' (normalized: ' + mfcc.normalized + ')';
        html += '</div>';
    }

    html += '<div style="margin-top:10px;font-size:0.75em;color:#aaa;">' + scores.wordCount + ' words analyzed</div>';
    html += '</div>';

    return html;
}

// ============================================================
// Expose globally
// ============================================================

window.calculateBandScores = calculateBandScores;
window.renderScoreHTML = renderScoreHTML;
window.getBandDescriptor = getBandDescriptor;
window.BAND_DESCRIPTORS = BAND_DESCRIPTORS;
window.assessPronunciation = assessPronunciation;
window.detectPronunciationMismatches = detectPronunciationMismatches;
window.findPronunciationChallenges = findPronunciationChallenges;
window.testScoringAccuracy = testScoringAccuracy;

// ============================================================
// Test function — callable from browser console
// ============================================================

/*
 * SCORING VALIDATION TEST CASES
 * Run: testScoringAccuracy() in browser console
 */
function testScoringAccuracy() {
    const tests = [
        {
            name: 'Band 0-2.0 (single word)',
            text: "hello",
            duration: 3,
            expectedRange: [0, 2.0]
        },
        {
            name: 'Band 2.0-3.5 (minimal phrase)',
            text: "I like music",
            duration: 3,
            expectedRange: [2.0, 3.5]
        },
        {
            name: 'Band 3.0-4.5 (short basic sentence)',
            text: "I like music because it is good and nice",
            duration: 5,
            expectedRange: [3.0, 4.5]
        },
        {
            name: 'Band 4.5-5.5 (very weak)',
            text: "I like music. Music is good. I listen music every day. Um, I like pop music. Pop music is very good. Um, I think music is important.",
            duration: 20,
            expectedRange: [4.5, 5.5]
        },
        {
            name: 'Band 5.0-6.5 (basic competence)',
            text: "Well, I really enjoy listening to music, especially pop and rock. I usually listen to music when I'm traveling to work on the bus. It helps me relax and I think most young people like music a lot.",
            duration: 25,
            expectedRange: [5.0, 6.5]
        },
        {
            name: 'Band 6.0-7.5 (good)',
            text: "To be honest, I'm quite passionate about music, particularly jazz and classical. I've been playing guitar since I was about twelve, and it's something that really helps me unwind after a stressful day. Moreover, I find that listening to different genres broadens my perspective and exposes me to various cultures.",
            duration: 30,
            expectedRange: [6.0, 7.5]
        },
        {
            name: 'Band 7.0-8.5 (very good)',
            text: "I'd say I'm somewhat of a music enthusiast, actually. My tastes have evolved considerably over the years — I grew up listening to pop, but I've gradually developed an appreciation for jazz and classical compositions. What I find particularly fascinating about music is how it transcends cultural boundaries. For instance, I recently attended a concert featuring traditional Vietnamese instruments alongside Western orchestral pieces, and the fusion was absolutely captivating. Having said that, I think the emotional impact of music is what truly resonates with me — it has this remarkable ability to evoke memories and shift your entire mood within seconds.",
            duration: 55,
            expectedRange: [7.0, 8.5]
        },
        {
            name: 'Band 4.0-5.5 (many errors)',
            text: "He don't like music. She go to school every day. I goed to the park yesterday. The musics is more better than before. I was arrive to the school late. They was happy because they don't have nothing to do.",
            duration: 20,
            expectedRange: [4.0, 5.5]
        }
    ];

    console.log('=== IELTS SCORING ACCURACY TEST (v3.0 Floor/Ceiling Model) ===');
    let allPass = true;
    tests.forEach(test => {
        const scores = calculateBandScores(test.text, test.duration, 'part1');
        const pass = scores.overall >= test.expectedRange[0] && scores.overall <= test.expectedRange[1];
        if (!pass) allPass = false;
        console.log(
            (pass ? 'PASS' : 'FAIL') + ' ' + test.name +
            ' -> Got: ' + scores.overall +
            ' (expected ' + test.expectedRange[0] + '-' + test.expectedRange[1] + ')' +
            ' | F:' + scores.fluency + ' V:' + scores.vocabulary + ' G:' + scores.grammar + ' P:' + scores.pronunciation +
            (scores.errors && scores.errors.length ? ' | Errors: ' + scores.errors.length : '')
        );
    });
    console.log(allPass ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED');
    return allPass;
}

// ============================================================
// Original IELTSScoring class (Gemini AI-powered, kept intact)
// ============================================================

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

    // Simple client-side analysis (quick feedback) - delegates to calculateBandScores
    quickAnalysis(text) {
        const targetText = text || this.getUserResponses();
        return calculateBandScores(targetText);
    }

    // Analyze vocabulary range (client-side heuristic)
    analyzeVocabularyRange(text) {
        const words = text.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
            .filter(w => w.length > 0);

        const uniqueWords = new Set(words);
        const lexicalDensity = (uniqueWords.size / words.length * 100).toFixed(1);

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
            if (word.length > 4) {
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
