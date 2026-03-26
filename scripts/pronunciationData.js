/**
 * Pronunciation drill content data.
 * 5 categories: TH sounds, R vs L, Word Stress, Final Consonants, Vowel Pairs.
 * Each category has minimal pairs for quizzes and practice words for drills.
 */
const PRONUNCIATION_DRILLS = {
    th_sounds: {
        name: 'TH Sounds',
        icon: '\u{1F445}',
        description: 'Master voiceless /\u03B8/ (think) and voiced /\u00F0/ (this)',
        tips: 'Place your tongue tip between your upper and lower teeth. For voiceless /\u03B8/ (think, three), blow air gently without vibrating your vocal cords. For voiced /\u00F0/ (this, that), do the same but vibrate your vocal cords. A common mistake is replacing these with /s/, /z/, /t/, or /d/.',
        minimalPairs: [
            { word1: 'think', word2: 'sink', ipa1: '/\u03B8\u026A\u014Bk/', ipa2: '/s\u026A\u014Bk/' },
            { word1: 'thick', word2: 'sick', ipa1: '/\u03B8\u026Ak/', ipa2: '/s\u026Ak/' },
            { word1: 'three', word2: 'tree', ipa1: '/\u03B8ri\u02D0/', ipa2: '/tri\u02D0/' },
            { word1: 'thought', word2: 'taught', ipa1: '/\u03B8\u0254\u02D0t/', ipa2: '/t\u0254\u02D0t/' },
            { word1: 'thin', word2: 'tin', ipa1: '/\u03B8\u026An/', ipa2: '/t\u026An/' },
            { word1: 'then', word2: 'den', ipa1: '/\u00F0\u025Bn/', ipa2: '/d\u025Bn/' },
            { word1: 'those', word2: 'doze', ipa1: '/\u00F0\u0259\u028Az/', ipa2: '/d\u0259\u028Az/' },
            { word1: 'breathe', word2: 'breeze', ipa1: '/bri\u02D0\u00F0/', ipa2: '/bri\u02D0z/' },
            { word1: 'math', word2: 'mass', ipa1: '/m\u00E6\u03B8/', ipa2: '/m\u00E6s/' },
            { word1: 'worthy', word2: 'wordy', ipa1: '/\u02C8w\u025C\u02D0\u00F0i/', ipa2: '/\u02C8w\u025C\u02D0di/' }
        ],
        practiceWords: [
            { word: 'think', ipa: '/\u03B8\u026A\u014Bk/', sound: 'voiceless' },
            { word: 'through', ipa: '/\u03B8ru\u02D0/', sound: 'voiceless' },
            { word: 'health', ipa: '/h\u025Bl\u03B8/', sound: 'voiceless' },
            { word: 'method', ipa: '/\u02C8m\u025B\u03B8\u0259d/', sound: 'voiceless' },
            { word: 'anything', ipa: '/\u02C8\u025Bni\u03B8\u026A\u014B/', sound: 'voiceless' },
            { word: 'growth', ipa: '/\u0261r\u0259\u028A\u03B8/', sound: 'voiceless' },
            { word: 'this', ipa: '/\u00F0\u026As/', sound: 'voiced' },
            { word: 'that', ipa: '/\u00F0\u00E6t/', sound: 'voiced' },
            { word: 'together', ipa: '/t\u0259\u02C8\u0261\u025B\u00F0\u0259r/', sound: 'voiced' },
            { word: 'weather', ipa: '/\u02C8w\u025B\u00F0\u0259r/', sound: 'voiced' },
            { word: 'rather', ipa: '/\u02C8r\u00E6\u00F0\u0259r/', sound: 'voiced' },
            { word: 'breathe', ipa: '/bri\u02D0\u00F0/', sound: 'voiced' }
        ]
    },

    r_l: {
        name: 'R vs L',
        icon: '\u{1F5E3}\uFE0F',
        description: 'Distinguish between /r/ and /l/ sounds',
        tips: 'For /r/, curl your tongue tip back without touching the roof of your mouth. Your lips may round slightly. For /l/, press your tongue tip firmly against the ridge behind your upper front teeth. Practice slowly, feeling the tongue position change between the two sounds.',
        minimalPairs: [
            { word1: 'right', word2: 'light', ipa1: '/ra\u026At/', ipa2: '/la\u026At/' },
            { word1: 'red', word2: 'led', ipa1: '/r\u025Bd/', ipa2: '/l\u025Bd/' },
            { word1: 'road', word2: 'load', ipa1: '/r\u0259\u028Ad/', ipa2: '/l\u0259\u028Ad/' },
            { word1: 'rock', word2: 'lock', ipa1: '/r\u0252k/', ipa2: '/l\u0252k/' },
            { word1: 'rake', word2: 'lake', ipa1: '/re\u026Ak/', ipa2: '/le\u026Ak/' },
            { word1: 'rice', word2: 'lice', ipa1: '/ra\u026As/', ipa2: '/la\u026As/' },
            { word1: 'ramp', word2: 'lamp', ipa1: '/r\u00E6mp/', ipa2: '/l\u00E6mp/' },
            { word1: 'crown', word2: 'clown', ipa1: '/kra\u028An/', ipa2: '/kla\u028An/' },
            { word1: 'fry', word2: 'fly', ipa1: '/fra\u026A/', ipa2: '/fla\u026A/' },
            { word1: 'pray', word2: 'play', ipa1: '/pre\u026A/', ipa2: '/ple\u026A/' }
        ],
        practiceWords: [
            { word: 'really', ipa: '/\u02C8ri\u02D0\u0259li/', sound: 'r' },
            { word: 'rarely', ipa: '/\u02C8re\u0259li/', sound: 'r' },
            { word: 'library', ipa: '/\u02C8la\u026Abr\u0259ri/', sound: 'both' },
            { word: 'literally', ipa: '/\u02C8l\u026At\u0259r\u0259li/', sound: 'both' },
            { word: 'regularly', ipa: '/\u02C8r\u025B\u0261j\u028Al\u0259li/', sound: 'both' },
            { word: 'parallel', ipa: '/\u02C8p\u00E6r\u0259l\u025Bl/', sound: 'both' },
            { word: 'relax', ipa: '/r\u026A\u02C8l\u00E6ks/', sound: 'both' },
            { word: 'ruler', ipa: '/\u02C8ru\u02D0l\u0259r/', sound: 'both' },
            { word: 'lovely', ipa: '/\u02C8l\u028Cvli/', sound: 'l' },
            { word: 'world', ipa: '/w\u025C\u02D0rld/', sound: 'both' },
            { word: 'rule', ipa: '/ru\u02D0l/', sound: 'both' },
            { word: 'relative', ipa: '/\u02C8r\u025Bl\u0259t\u026Av/', sound: 'both' }
        ]
    },

    word_stress: {
        name: 'Word Stress',
        icon: '\u{1F4E2}',
        description: 'Learn how stress shifts change word meaning',
        tips: 'In English, moving the stress can change a word from a noun to a verb. Nouns tend to be stressed on the first syllable (REcord), verbs on the second (reCORD). Listen carefully and exaggerate the stressed syllable when practicing.',
        minimalPairs: [
            { word1: 'PREsent (noun)', word2: 'preSENT (verb)', ipa1: '/\u02C8pr\u025Bz\u0259nt/', ipa2: '/pr\u026A\u02C8z\u025Bnt/' },
            { word1: 'REcord (noun)', word2: 'reCORD (verb)', ipa1: '/\u02C8r\u025Bk\u0254\u02D0d/', ipa2: '/r\u026A\u02C8k\u0254\u02D0d/' },
            { word1: 'OBject (noun)', word2: 'obJECT (verb)', ipa1: '/\u02C8\u0252bd\u0292\u026Akt/', ipa2: '/\u0259b\u02C8d\u0292\u025Bkt/' },
            { word1: 'PROduce (noun)', word2: 'proDUCE (verb)', ipa1: '/\u02C8pr\u0252dju\u02D0s/', ipa2: '/pr\u0259\u02C8dju\u02D0s/' },
            { word1: 'CONtrast (noun)', word2: 'conTRAST (verb)', ipa1: '/\u02C8k\u0252ntr\u00E6st/', ipa2: '/k\u0259n\u02C8tr\u00E6st/' },
            { word1: 'PERmit (noun)', word2: 'perMIT (verb)', ipa1: '/\u02C8p\u025C\u02D0m\u026At/', ipa2: '/p\u0259\u02C8m\u026At/' },
            { word1: 'CONduct (noun)', word2: 'conDUCT (verb)', ipa1: '/\u02C8k\u0252nd\u028Akt/', ipa2: '/k\u0259n\u02C8d\u028Akt/' },
            { word1: 'CONflict (noun)', word2: 'conFLICT (verb)', ipa1: '/\u02C8k\u0252nfl\u026Akt/', ipa2: '/k\u0259n\u02C8fl\u026Akt/' },
            { word1: 'IMport (noun)', word2: 'imPORT (verb)', ipa1: '/\u02C8\u026Amp\u0254\u02D0t/', ipa2: '/\u026Am\u02C8p\u0254\u02D0t/' },
            { word1: 'INcrease (noun)', word2: 'inCREASE (verb)', ipa1: '/\u02C8\u026Ankri\u02D0s/', ipa2: '/\u026An\u02C8kri\u02D0s/' }
        ],
        practiceWords: [
            { word: 'photograph', ipa: '/\u02C8f\u0259\u028At\u0259\u0261r\u00E6f/', sound: 'PHO-to-graph' },
            { word: 'photography', ipa: '/f\u0259\u02C8t\u0252\u0261r\u0259fi/', sound: 'pho-TO-gra-phy' },
            { word: 'photographic', ipa: '/\u02CCf\u0259\u028At\u0259\u02C8\u0261r\u00E6f\u026Ak/', sound: 'pho-to-GRA-phic' },
            { word: 'economy', ipa: '/\u026A\u02C8k\u0252n\u0259mi/', sound: 'e-CO-no-my' },
            { word: 'economic', ipa: '/\u02CC\u025Bk\u0259\u02C8n\u0252m\u026Ak/', sound: 'e-co-NO-mic' },
            { word: 'develop', ipa: '/d\u026A\u02C8v\u025Bl\u0259p/', sound: 'de-VE-lop' },
            { word: 'development', ipa: '/d\u026A\u02C8v\u025Bl\u0259pm\u0259nt/', sound: 'de-VE-lop-ment' },
            { word: 'communicate', ipa: '/k\u0259\u02C8mju\u02D0n\u026Ake\u026At/', sound: 'co-MMU-ni-cate' },
            { word: 'communication', ipa: '/k\u0259\u02CCmju\u02D0n\u026A\u02C8ke\u026A\u0283\u0259n/', sound: 'co-mmu-ni-CA-tion' },
            { word: 'environment', ipa: '/\u026An\u02C8va\u026Ar\u0259nm\u0259nt/', sound: 'en-VI-ron-ment' },
            { word: 'opportunity', ipa: '/\u02CC\u0252p\u0259\u02C8tju\u02D0n\u026Ati/', sound: 'op-por-TU-ni-ty' },
            { word: 'education', ipa: '/\u02CC\u025Bd\u0292\u028A\u02C8ke\u026A\u0283\u0259n/', sound: 'e-du-CA-tion' }
        ]
    },

    final_consonants: {
        name: 'Final Consonants',
        icon: '\u{1F3AF}',
        description: 'Practice pronouncing word endings clearly',
        tips: 'Many learners drop final consonant sounds, especially -ed, -s, and consonant clusters. Make sure you release the final sound clearly. For past tense -ed: after /t/ or /d/ say /\u026Ad/ (wanted); after voiceless consonants say /t/ (walked); after voiced consonants say /d/ (played).',
        minimalPairs: [
            { word1: 'walk', word2: 'walked', ipa1: '/w\u0254\u02D0k/', ipa2: '/w\u0254\u02D0kt/' },
            { word1: 'stop', word2: 'stopped', ipa1: '/st\u0252p/', ipa2: '/st\u0252pt/' },
            { word1: 'ask', word2: 'asked', ipa1: '/\u00E6sk/', ipa2: '/\u00E6skt/' },
            { word1: 'help', word2: 'helped', ipa1: '/h\u025Blp/', ipa2: '/h\u025Blpt/' },
            { word1: 'play', word2: 'played', ipa1: '/ple\u026A/', ipa2: '/ple\u026Ad/' },
            { word1: 'want', word2: 'wanted', ipa1: '/w\u0252nt/', ipa2: '/\u02C8w\u0252nt\u026Ad/' },
            { word1: 'need', word2: 'needed', ipa1: '/ni\u02D0d/', ipa2: '/\u02C8ni\u02D0d\u026Ad/' },
            { word1: 'book', word2: 'books', ipa1: '/b\u028Ak/', ipa2: '/b\u028Aks/' },
            { word1: 'friend', word2: 'friends', ipa1: '/fr\u025Bnd/', ipa2: '/fr\u025Bndz/' },
            { word1: 'month', word2: 'months', ipa1: '/m\u028Cn\u03B8/', ipa2: '/m\u028Cn\u03B8s/' }
        ],
        practiceWords: [
            { word: 'walked', ipa: '/w\u0254\u02D0kt/', sound: '-ed /t/' },
            { word: 'stopped', ipa: '/st\u0252pt/', sound: '-ed /t/' },
            { word: 'asked', ipa: '/\u00E6skt/', sound: '-ed /t/' },
            { word: 'helped', ipa: '/h\u025Blpt/', sound: '-ed /t/' },
            { word: 'played', ipa: '/ple\u026Ad/', sound: '-ed /d/' },
            { word: 'changed', ipa: '/t\u0283e\u026And\u0292d/', sound: '-ed /d/' },
            { word: 'wanted', ipa: '/\u02C8w\u0252nt\u026Ad/', sound: '-ed /\u026Ad/' },
            { word: 'needed', ipa: '/\u02C8ni\u02D0d\u026Ad/', sound: '-ed /\u026Ad/' },
            { word: 'strengths', ipa: '/str\u025B\u014Bk\u03B8s/', sound: 'cluster' },
            { word: 'months', ipa: '/m\u028Cn\u03B8s/', sound: 'cluster' },
            { word: 'texts', ipa: '/t\u025Bksts/', sound: 'cluster' },
            { word: 'twelfths', ipa: '/tw\u025Blf\u03B8s/', sound: 'cluster' }
        ]
    },

    vowel_pairs: {
        name: 'Vowel Pairs',
        icon: '\u{1F442}',
        description: 'Distinguish short and long vowel sounds',
        tips: 'The key difference between short and long vowels is duration and tongue position. For /\u026A/ (ship), your tongue is slightly lower and more central. For /i\u02D0/ (sheep), your tongue is high and forward, and you hold the sound longer. Practice by exaggerating the length difference.',
        minimalPairs: [
            { word1: 'ship', word2: 'sheep', ipa1: '/\u0283\u026Ap/', ipa2: '/\u0283i\u02D0p/' },
            { word1: 'bed', word2: 'bad', ipa1: '/b\u025Bd/', ipa2: '/b\u00E6d/' },
            { word1: 'cup', word2: 'cop', ipa1: '/k\u028Cp/', ipa2: '/k\u0252p/' },
            { word1: 'full', word2: 'fool', ipa1: '/f\u028Al/', ipa2: '/fu\u02D0l/' },
            { word1: 'hit', word2: 'heat', ipa1: '/h\u026At/', ipa2: '/hi\u02D0t/' },
            { word1: 'pull', word2: 'pool', ipa1: '/p\u028Al/', ipa2: '/pu\u02D0l/' },
            { word1: 'sit', word2: 'seat', ipa1: '/s\u026At/', ipa2: '/si\u02D0t/' },
            { word1: 'live', word2: 'leave', ipa1: '/l\u026Av/', ipa2: '/li\u02D0v/' },
            { word1: 'hat', word2: 'hut', ipa1: '/h\u00E6t/', ipa2: '/h\u028Ct/' },
            { word1: 'cat', word2: 'cut', ipa1: '/k\u00E6t/', ipa2: '/k\u028Ct/' }
        ],
        practiceWords: [
            { word: 'ship', ipa: '/\u0283\u026Ap/', sound: 'short /\u026A/' },
            { word: 'sheep', ipa: '/\u0283i\u02D0p/', sound: 'long /i\u02D0/' },
            { word: 'bit', ipa: '/b\u026At/', sound: 'short /\u026A/' },
            { word: 'beat', ipa: '/bi\u02D0t/', sound: 'long /i\u02D0/' },
            { word: 'pull', ipa: '/p\u028Al/', sound: 'short /\u028A/' },
            { word: 'pool', ipa: '/pu\u02D0l/', sound: 'long /u\u02D0/' },
            { word: 'bed', ipa: '/b\u025Bd/', sound: 'short /\u025B/' },
            { word: 'bad', ipa: '/b\u00E6d/', sound: 'short /\u00E6/' },
            { word: 'cup', ipa: '/k\u028Cp/', sound: 'short /\u028C/' },
            { word: 'cop', ipa: '/k\u0252p/', sound: 'short /\u0252/' },
            { word: 'hat', ipa: '/h\u00E6t/', sound: 'short /\u00E6/' },
            { word: 'hut', ipa: '/h\u028Ct/', sound: 'short /\u028C/' }
        ]
    }
};

/** Category IDs in display order */
const PRONUNCIATION_CATEGORY_ORDER = [
    'th_sounds', 'r_l', 'word_stress', 'final_consonants', 'vowel_pairs'
];

window.PRONUNCIATION_DRILLS = PRONUNCIATION_DRILLS;
window.PRONUNCIATION_CATEGORY_ORDER = PRONUNCIATION_CATEGORY_ORDER;
