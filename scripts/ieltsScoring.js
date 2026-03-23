// IELTS Speaking Scoring System
// AI-powered + offline heuristic analysis across 4 IELTS criteria

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
    5.0: 'Limited range, frequent errors, noticeable hesitation',
    5.5: 'Modest range, some errors, occasional hesitation',
    6.0: 'Adequate range, some errors but meaning is clear',
    6.5: 'Fair range, generally accurate with some lapses',
    7.0: 'Good range, mostly accurate, speaks at length',
    7.5: 'Wide range, high accuracy, flexible language use',
    8.0: 'Wide range, rare errors, fluent and natural'
};

/**
 * Calculate structured IELTS band scores from transcript text only (no API).
 * Returns scores for 4 criteria + overall, with strengths/weaknesses/tips.
 * @param {string} transcript - The transcribed speech text
 * @param {number} [durationSeconds] - Optional speaking duration in seconds
 * @returns {object} Band scores and analysis details
 */
function calculateBandScores(transcript, durationSeconds) {
    if (!transcript || transcript.trim().length < 10) {
        return createEmptyScores();
    }

    const text = transcript.trim();
    const fluencyResult = scoreFluency(text, durationSeconds);
    const vocabResult = scoreVocabulary(text);
    const grammarResult = scoreGrammar(text);
    const pronResult = scorePronunciation(text);

    const weights = { fluency: 0.25, vocab: 0.25, grammar: 0.25, pronunciation: 0.25 };
    const weightedAvg = +(
        fluencyResult.band * weights.fluency +
        vocabResult.band * weights.vocab +
        grammarResult.band * weights.grammar +
        pronResult.band * weights.pronunciation
    ).toFixed(1);

    // Round to nearest 0.5
    const overall = Math.round(weightedAvg * 2) / 2;

    const details = buildDetails(fluencyResult, vocabResult, grammarResult, pronResult);

    return {
        overall: Math.max(5.0, Math.min(8.0, overall)),
        fluency: fluencyResult.band,
        vocabulary: vocabResult.band,
        grammar: grammarResult.band,
        pronunciation: pronResult.band,
        details,
        wordCount: text.split(/\s+/).filter(w => w).length
    };
}

/** Score Fluency & Coherence (5.0-8.0) */
function scoreFluency(text, durationSeconds) {
    const words = text.split(/\s+/).filter(w => w);
    const wordCount = words.length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

    // Words per minute
    const durationMin = durationSeconds ? durationSeconds / 60 : estimateDuration(wordCount);
    const wpm = durationMin > 0 ? wordCount / durationMin : 0;

    // Filler word ratio
    const fillerPatterns = ['um', 'uh', 'er', 'erm', 'like', 'you know', 'i mean', 'basically', 'actually', 'sort of', 'kind of'];
    let fillerCount = 0;
    fillerPatterns.forEach(f => {
        const regex = new RegExp(`\\b${f}\\b`, 'gi');
        const matches = text.match(regex);
        if (matches) fillerCount += matches.length;
    });
    const fillerRatio = wordCount > 0 ? fillerCount / wordCount : 0;

    // Sentence length variation (standard deviation)
    const sentLengths = sentences.map(s => s.trim().split(/\s+/).length);
    const avgSentLen = sentLengths.reduce((a, b) => a + b, 0) / (sentLengths.length || 1);
    const sentVariance = sentLengths.reduce((sum, l) => sum + Math.pow(l - avgSentLen, 2), 0) / (sentLengths.length || 1);
    const sentStdDev = Math.sqrt(sentVariance);

    // Discourse markers usage
    let discourseCount = 0;
    DISCOURSE_MARKERS.forEach(marker => {
        const regex = new RegExp(`\\b${marker.replace(/\s+/g, '\\s+')}\\b`, 'gi');
        const matches = text.match(regex);
        if (matches) discourseCount += matches.length;
    });
    const discourseRatio = wordCount > 0 ? discourseCount / wordCount : 0;

    // Calculate band
    let score = 5.0;

    // WPM scoring: 120-150 is ideal for Band 7
    if (wpm >= 110 && wpm <= 160) score += 0.8;
    else if (wpm >= 90 && wpm <= 180) score += 0.4;

    // Filler ratio: < 3% for Band 7
    if (fillerRatio < 0.02) score += 0.8;
    else if (fillerRatio < 0.03) score += 0.5;
    else if (fillerRatio < 0.05) score += 0.2;

    // Sentence variety
    if (sentStdDev > 5) score += 0.5;
    else if (sentStdDev > 3) score += 0.3;

    // Discourse markers
    if (discourseRatio > 0.04) score += 0.9;
    else if (discourseRatio > 0.02) score += 0.5;
    else if (discourseRatio > 0.01) score += 0.2;

    const band = clampBand(score);

    return {
        band,
        wpm: Math.round(wpm),
        fillerRatio: +(fillerRatio * 100).toFixed(1),
        fillerCount,
        discourseCount,
        sentenceVariety: +sentStdDev.toFixed(1),
        sentenceCount: sentences.length
    };
}

/** Score Lexical Resource (5.0-8.0) */
function scoreVocabulary(text) {
    const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    const uniqueWords = new Set(words);

    // Type-token ratio
    const ttr = wordCount > 0 ? uniqueWords.size / wordCount : 0;

    // Average word length
    const avgWordLen = wordCount > 0 ? words.reduce((s, w) => s + w.length, 0) / wordCount : 0;

    // Advanced vocabulary (words > 8 chars)
    const longWords = [...uniqueWords].filter(w => w.length > 8);
    const longWordRatio = wordCount > 0 ? longWords.length / wordCount : 0;

    // Academic word list matches
    const academicSet = new Set(ACADEMIC_WORD_LIST);
    const academicFound = [...uniqueWords].filter(w => academicSet.has(w));
    const academicRatio = wordCount > 0 ? academicFound.length / wordCount : 0;

    // Phrasal verbs / collocations (simple detection)
    const phrasalVerbs = [
        'look forward', 'come across', 'bring up', 'carry out', 'find out',
        'give up', 'go through', 'keep up', 'make up', 'point out',
        'put off', 'set up', 'take on', 'turn out', 'work out',
        'deal with', 'look into', 'rely on', 'result in', 'lead to'
    ];
    let phrasalCount = 0;
    phrasalVerbs.forEach(pv => {
        const regex = new RegExp(`\\b${pv}\\b`, 'gi');
        if (text.match(regex)) phrasalCount++;
    });

    let score = 5.0;

    // TTR scoring: > 0.5 for Band 7
    if (ttr > 0.6) score += 0.8;
    else if (ttr > 0.5) score += 0.5;
    else if (ttr > 0.4) score += 0.2;

    // Average word length
    if (avgWordLen > 5.5) score += 0.5;
    else if (avgWordLen > 4.5) score += 0.3;

    // Advanced vocabulary
    if (longWordRatio > 0.08) score += 0.6;
    else if (longWordRatio > 0.04) score += 0.3;

    // Academic words
    if (academicRatio > 0.05) score += 0.6;
    else if (academicRatio > 0.02) score += 0.3;
    else if (academicFound.length > 0) score += 0.1;

    // Phrasal verbs
    if (phrasalCount >= 3) score += 0.5;
    else if (phrasalCount >= 1) score += 0.2;

    const band = clampBand(score);

    return {
        band,
        ttr: +ttr.toFixed(2),
        uniqueWords: uniqueWords.size,
        avgWordLength: +avgWordLen.toFixed(1),
        longWords: longWords.slice(0, 15),
        academicWords: academicFound.slice(0, 15),
        phrasalCount
    };
}

/** Score Grammatical Range & Accuracy (5.0-8.0) */
function scoreGrammar(text) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentCount = sentences.length || 1;

    // Complex sentence markers
    const complexPatterns = {
        conditionals: /\b(if|unless|provided that|as long as|supposing)\b/gi,
        passive: /\b(was|were|is|are|been|being|get|got|gets)\s+\w+(ed|en|t)\b/gi,
        relativeClauses: /\b(which|who|whom|whose|where|when)\b/gi,
        subordinate: /\b(although|though|even though|while|whereas|since|because|as|so that|in order to)\b/gi,
        comparatives: /\b(more|less|most|least|better|worse|best|worst)\b.*\b(than|of)\b/gi,
        perfectTenses: /\b(have|has|had)\s+(been|never|always|already|just|ever)?\s*\w+(ed|en|t)\b/gi,
        modals: /\b(would|could|should|might|may|must|ought to)\b/gi
    };

    const detected = {};
    let totalComplex = 0;
    for (const [name, regex] of Object.entries(complexPatterns)) {
        const matches = text.match(regex);
        detected[name] = matches ? matches.length : 0;
        totalComplex += detected[name];
    }

    // Complex sentence ratio
    const complexRatio = totalComplex / sentCount;

    // Sentence length variation (mix of simple/complex)
    const avgWordsPerSent = text.split(/\s+/).length / sentCount;

    // Mixed tense detection
    const pastTense = (text.match(/\b\w+ed\b/gi) || []).length;
    const presentTense = (text.match(/\b(is|are|am|do|does|have|has)\b/gi) || []).length;
    const futureTense = (text.match(/\b(will|going to|shall)\b/gi) || []).length;
    const tenseMix = (pastTense > 0 ? 1 : 0) + (presentTense > 0 ? 1 : 0) + (futureTense > 0 ? 1 : 0);

    let score = 5.0;

    // Complex structure density
    if (complexRatio > 3) score += 0.8;
    else if (complexRatio > 2) score += 0.5;
    else if (complexRatio > 1) score += 0.3;

    // Variety of complex types used
    const typesUsed = Object.values(detected).filter(v => v > 0).length;
    if (typesUsed >= 5) score += 0.8;
    else if (typesUsed >= 3) score += 0.5;
    else if (typesUsed >= 2) score += 0.2;

    // Sentence length (not too short, not too long)
    if (avgWordsPerSent >= 12 && avgWordsPerSent <= 20) score += 0.5;
    else if (avgWordsPerSent >= 8 && avgWordsPerSent <= 25) score += 0.3;

    // Mixed tenses
    if (tenseMix >= 3) score += 0.4;
    else if (tenseMix >= 2) score += 0.2;

    // Total complexity bonus
    if (totalComplex > 15) score += 0.5;
    else if (totalComplex > 8) score += 0.2;

    const band = clampBand(score);

    return {
        band,
        complexStructures: detected,
        totalComplex,
        complexRatio: +complexRatio.toFixed(1),
        typesUsed,
        avgWordsPerSentence: +avgWordsPerSent.toFixed(1),
        tenseMix,
        sentenceCount: sentCount
    };
}

/** Score Pronunciation (estimated from text - limited proxy) */
function scorePronunciation(text) {
    const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w);
    const wordCount = words.length;
    const uniqueWords = new Set(words);

    // Word complexity as proxy for pronunciation ambition
    const complexWords = [...uniqueWords].filter(w => w.length > 6 && countSyllables(w) >= 3);
    const complexRatio = wordCount > 0 ? complexWords.length / wordCount : 0;

    // Variety of sounds (proxy: diverse word beginnings)
    const beginnings = new Set(words.map(w => w.substring(0, 2)));
    const soundVariety = beginnings.size;

    // Attempted advanced vocabulary (proxy for confident pronunciation)
    const advancedAttempted = [...uniqueWords].filter(w => w.length > 9);

    let score = 5.5; // Base: text-only analysis is inherently limited

    if (complexRatio > 0.06) score += 0.7;
    else if (complexRatio > 0.03) score += 0.4;

    if (soundVariety > 40) score += 0.5;
    else if (soundVariety > 25) score += 0.3;

    if (advancedAttempted.length > 5) score += 0.5;
    else if (advancedAttempted.length > 2) score += 0.3;

    // Natural phrasing: contractions suggest natural speech
    const contractions = (text.match(/\b\w+'(t|s|re|ve|ll|d|m)\b/gi) || []).length;
    if (contractions > 3) score += 0.3;
    else if (contractions > 0) score += 0.1;

    const band = clampBand(score);

    return {
        band,
        complexWords: complexWords.slice(0, 10),
        advancedAttempted: advancedAttempted.slice(0, 10),
        contractions,
        note: 'Estimated from text only - actual pronunciation may differ'
    };
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

/** Build strengths, weaknesses, tips from sub-scores */
function buildDetails(fluency, vocab, grammar, pron) {
    const strengths = [];
    const weaknesses = [];
    const tips = [];

    // Fluency analysis
    if (fluency.band >= 7.0) {
        strengths.push('Good speaking pace and fluency');
    }
    if (fluency.discourseCount >= 5) {
        strengths.push('Effective use of discourse markers');
    }
    if (fluency.fillerRatio > 3) {
        weaknesses.push('High filler word usage (' + fluency.fillerRatio + '%)');
        tips.push('Practice reducing filler words (um, uh, like) by pausing silently instead');
    }
    if (fluency.discourseCount < 3) {
        weaknesses.push('Limited use of linking words');
        tips.push('Use connectors like "however", "moreover", "for instance" to improve coherence');
    }

    // Vocabulary analysis
    if (vocab.band >= 7.0) {
        strengths.push('Good vocabulary range (TTR: ' + vocab.ttr + ')');
    }
    if (vocab.academicWords.length > 3) {
        strengths.push('Uses academic vocabulary effectively');
    }
    if (vocab.ttr < 0.45) {
        weaknesses.push('Limited vocabulary variety');
        tips.push('Try paraphrasing repeated words with synonyms');
    }
    if (vocab.academicWords.length === 0) {
        weaknesses.push('No academic vocabulary detected');
        tips.push('Incorporate words like "significant", "contribute", "perspective" into your responses');
    }

    // Grammar analysis
    if (grammar.band >= 7.0) {
        strengths.push('Good range of grammatical structures');
    }
    if (grammar.typesUsed >= 4) {
        strengths.push('Uses varied complex sentence types');
    }
    if (grammar.totalComplex < 3) {
        weaknesses.push('Mostly simple sentence structures');
        tips.push('Add complexity with clauses: "Although...", "If I had...", "which means..."');
    }
    if (grammar.tenseMix < 2) {
        weaknesses.push('Limited tense variety');
        tips.push('Mix past, present and future tenses in your answers');
    }

    // Pronunciation analysis
    if (pron.band >= 7.0) {
        strengths.push('Attempts sophisticated vocabulary confidently');
    }
    if (pron.contractions > 2) {
        strengths.push('Uses natural contractions in speech');
    }

    // Ensure at least one of each
    if (strengths.length === 0) {
        strengths.push('Communicates basic ideas clearly');
    }
    if (weaknesses.length === 0) {
        weaknesses.push('Could further develop range and complexity');
    }
    if (tips.length === 0) {
        tips.push('Continue practicing with varied topics to build confidence');
    }

    return { strengths, weaknesses, tips };
}

/** Get band descriptor text for a score */
function getBandDescriptor(band) {
    const rounded = Math.round(band * 2) / 2;
    return BAND_DESCRIPTORS[rounded] || BAND_DESCRIPTORS[Math.floor(band)] || 'Score unavailable';
}

/** Clamp band to 5.0-8.0 range, rounded to nearest 0.5 */
function clampBand(score) {
    const clamped = Math.max(5.0, Math.min(8.0, score));
    return Math.round(clamped * 2) / 2;
}

/** Estimate speaking duration from word count (assuming ~130 wpm) */
function estimateDuration(wordCount) {
    const WPM_ESTIMATE = 130;
    return wordCount / WPM_ESTIMATE;
}

/** Return empty scores structure */
function createEmptyScores() {
    return {
        overall: 0, fluency: 0, vocabulary: 0, grammar: 0, pronunciation: 0,
        details: { strengths: [], weaknesses: [], tips: [] },
        wordCount: 0
    };
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
        { label: 'Pronunciation (est.)', key: 'pronunciation', prevKey: 'pronunciation' }
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
        const pct = ((val - 4) / 5) * 100; // 4-9 range mapped to 0-100%
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

    html += '<div style="margin-top:10px;font-size:0.75em;color:#aaa;">' + scores.wordCount + ' words analyzed</div>';
    html += '</div>';

    return html;
}

/** Get color based on band score */
function getScoreColor(band) {
    if (band >= 7.0) return '#28a745';
    if (band >= 6.0) return '#ffc107';
    return '#dc3545';
}

// Expose globally
window.calculateBandScores = calculateBandScores;
window.renderScoreHTML = renderScoreHTML;
window.getBandDescriptor = getBandDescriptor;
window.BAND_DESCRIPTORS = BAND_DESCRIPTORS;

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

    // Simple client-side analysis (quick feedback) - now delegates to calculateBandScores
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
