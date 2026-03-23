// IELTS Speaking Library - Comprehensive Learning Resources
// Topics, vocabulary, sample answers, grammar patterns, strategies

const IELTS_LIBRARY = {
    // Band descriptors for each criterion
    bandDescriptors: {
        fluency: {
            9: "Speaks fluently with only rare repetition or self-correction; any hesitation is content-related rather than language-related; uses a full range of linking devices naturally",
            8: "Speaks fluently with occasional repetition or self-correction; hesitation is usually content-related; develops topics coherently",
            7: "Speaks at length without noticeable effort or loss of coherence; may demonstrate language-related hesitation at times; uses a range of connectives and discourse markers",
            6: "Willing to speak at length though may lose coherence at times due to occasional repetition, self-correction or hesitation; uses a range of connectives and discourse markers but not always appropriately",
            5: "Usually maintains flow of speech but uses repetition, self-correction and/or slow speech to keep going; overuses certain connectives and discourse markers"
        },
        vocabulary: {
            9: "Uses vocabulary with full flexibility and precision in all topics; uses idiomatic language naturally and accurately",
            8: "Uses a wide vocabulary resource readily and flexibly; uses less common and idiomatic items with precision; occasional inaccuracies",
            7: "Uses vocabulary resource flexibly to discuss a variety of topics; uses less common and idiomatic vocabulary; shows awareness of style and collocation with some inappropriate choices",
            6: "Has sufficient vocabulary to discuss topics at length; makes some errors in word choice but meaning is clear",
            5: "Manages to talk about familiar and unfamiliar topics but uses vocabulary with limited flexibility; attempts paraphrase but with mixed success"
        },
        grammar: {
            9: "Uses full range of structures naturally and appropriately; produces consistently accurate structures apart from 'slips'",
            8: "Uses a wide range of structures flexibly; produces a majority of error-free sentences with only very occasional inappropriacies or basic errors",
            7: "Uses a range of complex structures with some flexibility; frequently produces error-free sentences though some grammatical errors persist",
            6: "Uses mix of simple and complex structures but with limited flexibility; makes errors in complex structures though these rarely cause comprehension problems",
            5: "Produces basic sentence forms with reasonable accuracy; uses limited range of complex structures but these usually contain errors"
        },
        pronunciation: {
            9: "Uses a full range of pronunciation features with precision and subtlety; sustains flexible use throughout; fully comprehensible",
            8: "Uses a wide range of pronunciation features; sustains flexible use with only occasional lapses; easy to understand; L1 accent has minimal effect",
            7: "Shows all positive features of Band 6 and some but not all features of Band 8",
            6: "Uses a range of pronunciation features with mixed control; shows some effective use of features but not sustained; can be understood with occasional mispronunciation",
            5: "Shows some of the positive features of Band 4 and some but not all features of Band 6"
        }
    },

    // Common IELTS topics organized by theme
    topics: {
        people: [
            {
                id: 'influential_person',
                title: 'Describe a person who has influenced you',
                part2Card: {
                    topic: 'Describe a person who has influenced you',
                    prompts: [
                        'Who this person is',
                        'How you know them',
                        'What they did to influence you',
                        'And explain why this person is important to you'
                    ]
                },
                part3Questions: [
                    'Do you think parents or teachers have more influence on children?',
                    'How has the concept of role models changed over the years?',
                    'What qualities make someone a good role model?',
                    'Is it better to be influenced by real people or fictional characters?'
                ],
                vocabulary: ['inspiring', 'mentor', 'role model', 'guidance', 'wisdom', 'aspire', 'admire', 'shape', 'motivate', 'perspective']
            },
            {
                id: 'family_member',
                title: 'Describe a family member you admire',
                part2Card: {
                    topic: 'Describe a family member you admire',
                    prompts: [
                        'Who this person is',
                        'What their relationship to you is',
                        'What qualities they have',
                        'And explain why you admire them'
                    ]
                },
                part3Questions: [
                    'How important is family in your culture?',
                    'Do you think family relationships are becoming weaker in modern society?',
                    'What role do grandparents play in raising children?',
                    'How do family structures differ between cultures?'
                ],
                vocabulary: ['supportive', 'dependable', 'compassionate', 'resilient', 'dedicated', 'nurturing', 'bond', 'upbringing', 'values', 'heritage']
            }
        ],
        places: [
            {
                id: 'memorable_place',
                title: 'Describe a place you like to visit',
                part2Card: {
                    topic: 'Describe a place you like to visit',
                    prompts: [
                        'Where this place is',
                        'How often you go there',
                        'What you do there',
                        'And explain why you like this place'
                    ]
                },
                part3Questions: [
                    'Why do people like to visit natural places?',
                    'Do you think tourism can damage natural environments?',
                    'How can cities balance development with preserving natural spaces?',
                    'Will virtual reality replace physical travel in the future?'
                ],
                vocabulary: ['scenic', 'tranquil', 'picturesque', 'bustling', 'serene', 'vibrant', 'ambiance', 'landscape', 'destination', 'retreat']
            },
            {
                id: 'childhood_place',
                title: 'Describe a place from your childhood',
                part2Card: {
                    topic: 'Describe a place from your childhood',
                    prompts: [
                        'Where this place was',
                        'When you used to go there',
                        'What you did there',
                        'And explain why this place was special to you'
                    ]
                },
                part3Questions: [
                    'How important are childhood memories to people?',
                    'Do you think childhood experiences shape who we become?',
                    'Are children today having the same kind of childhood as previous generations?',
                    'What makes a good childhood environment?'
                ],
                vocabulary: ['nostalgic', 'formative', 'fond memories', 'playground', 'carefree', 'innocence', 'reminisce', 'treasure', 'upbringing', 'roots']
            }
        ],
        events: [
            {
                id: 'celebration',
                title: 'Describe a celebration you attended',
                part2Card: {
                    topic: 'Describe a celebration you attended',
                    prompts: [
                        'What the celebration was',
                        'When and where it took place',
                        'Who was there',
                        'And explain why it was memorable'
                    ]
                },
                part3Questions: [
                    'Why are celebrations important in society?',
                    'Do you think people spend too much money on celebrations?',
                    'How have celebrations changed in your country over the years?',
                    'Are traditional celebrations losing their significance?'
                ],
                vocabulary: ['festive', 'commemorate', 'gathering', 'ceremony', 'occasion', 'tradition', 'ritual', 'joyous', 'milestone', 'unity']
            },
            {
                id: 'life_changing_event',
                title: 'Describe an event that changed your life',
                part2Card: {
                    topic: 'Describe an event that changed your life',
                    prompts: [
                        'What the event was',
                        'When and where it happened',
                        'How it affected you',
                        'And explain why it was life-changing'
                    ]
                },
                part3Questions: [
                    'What kinds of events typically change people\'s lives?',
                    'Do you think people can prepare for life-changing events?',
                    'How do different age groups react to major life changes?',
                    'Is change always positive?'
                ],
                vocabulary: ['pivotal', 'turning point', 'transformative', 'profound', 'revelation', 'perspective', 'resilience', 'adapt', 'growth', 'paradigm shift']
            }
        ],
        objects: [
            {
                id: 'useful_object',
                title: 'Describe something useful you own',
                part2Card: {
                    topic: 'Describe something useful you own',
                    prompts: [
                        'What it is',
                        'How long you have had it',
                        'How you use it',
                        'And explain why it is useful to you'
                    ]
                },
                part3Questions: [
                    'Do people buy things they don\'t really need?',
                    'How has technology changed what people consider useful?',
                    'Is it better to buy expensive quality items or cheap replaceable ones?',
                    'How important is sustainability when choosing products?'
                ],
                vocabulary: ['practical', 'functional', 'versatile', 'durable', 'indispensable', 'gadget', 'appliance', 'tool', 'efficient', 'essential']
            }
        ],
        activities: [
            {
                id: 'hobby',
                title: 'Describe a hobby you enjoy',
                part2Card: {
                    topic: 'Describe a hobby you enjoy',
                    prompts: [
                        'What the hobby is',
                        'When and how you started it',
                        'How often you do it',
                        'And explain why you enjoy it'
                    ]
                },
                part3Questions: [
                    'Why are hobbies important for people?',
                    'Do people have less time for hobbies than in the past?',
                    'Should schools encourage students to have hobbies?',
                    'Can hobbies become careers?'
                ],
                vocabulary: ['pastime', 'leisure', 'pursuit', 'recreational', 'fulfilling', 'relaxation', 'skill-building', 'therapeutic', 'passion', 'dedication']
            },
            {
                id: 'sport_activity',
                title: 'Describe a sport or physical activity you like',
                part2Card: {
                    topic: 'Describe a sport or physical activity you like',
                    prompts: [
                        'What the activity is',
                        'Where and when you do it',
                        'Who you do it with',
                        'And explain why you enjoy it'
                    ]
                },
                part3Questions: [
                    'Why is physical activity important for health?',
                    'Do you think governments should invest more in sports facilities?',
                    'How can we encourage young people to be more active?',
                    'Will technology make people less active in the future?'
                ],
                vocabulary: ['athletic', 'fitness', 'endurance', 'stamina', 'coordination', 'competitive', 'team spirit', 'well-being', 'vigorous', 'active lifestyle']
            }
        ],
        media: [
            {
                id: 'book_movie',
                title: 'Describe a book or movie that influenced you',
                part2Card: {
                    topic: 'Describe a book or movie that influenced you',
                    prompts: [
                        'What it was',
                        'When you read/watched it',
                        'What it was about',
                        'And explain how it influenced you'
                    ]
                },
                part3Questions: [
                    'Do books or movies have more influence on people?',
                    'How has the internet changed reading habits?',
                    'Should children read more books or use educational apps?',
                    'Will physical books disappear in the future?'
                ],
                vocabulary: ['compelling', 'thought-provoking', 'narrative', 'protagonist', 'plot', 'themes', 'genre', 'captivating', 'interpretation', 'literary']
            }
        ]
    },

    // Sample answers with band level annotations
    sampleAnswers: {
        influential_person_band7: {
            topicId: 'influential_person',
            band: 7,
            answer: `I'd like to talk about my high school English teacher, Mrs. Chen, who had a profound influence on my life. I first met her when I was 15, and she taught me for three years during high school.

What made Mrs. Chen so special was her genuine passion for literature and her ability to make every student feel valued. She didn't just teach us grammar and vocabulary; she opened our eyes to the power of language and storytelling. I remember she would often share personal stories related to the books we were reading, which made the lessons much more engaging and relatable.

One particular instance that stands out was when I was struggling with writing essays. Instead of just pointing out my mistakes, Mrs. Chen spent her lunch breaks helping me improve. She taught me to think critically and express my ideas more clearly. Her patience and dedication were remarkable.

The reason she's so important to me is that she fundamentally changed how I view education. Before meeting her, I saw learning as just memorizing facts for exams. But she showed me that education is about developing critical thinking and finding your own voice. Her influence is why I'm now pursuing a degree in communications, and I still use the skills she taught me every day.`,
            annotations: {
                strengths: [
                    'Clear structure with introduction, development, and conclusion',
                    'Good use of past tenses and narrative structure',
                    'Specific examples (lunch breaks, essay writing)',
                    'Range of vocabulary (profound, engaging, relatable, remarkable)',
                    'Personal reflection showing depth',
                    'Appropriate use of linking devices (what made, one particular instance, the reason)'
                ],
                bandJustification: 'Band 7: Speaks at length without noticeable effort; uses a range of vocabulary flexibly; uses complex structures with good control; some minor errors do not impede communication'
            }
        },
        memorable_place_band8: {
            topicId: 'memorable_place',
            band: 8,
            answer: `I'd like to describe a small coastal town called Hoi An in central Vietnam, which has become one of my favorite places to visit over the years. I've been there about five times now, and each visit reveals something new and enchanting about this UNESCO World Heritage site.

What draws me back repeatedly is the town's unique blend of history and everyday life. Unlike many tourist destinations that feel artificial, Hoi An maintains its authenticity while welcoming visitors. The ancient architecture, with its distinctive yellow buildings and traditional wooden shophouses, creates an almost magical atmosphere, especially in the early morning when the streets are quieter.

During my visits, I typically spend time wandering through the Old Town, exploring the various temples and merchant houses that date back to the 15th century. I'm particularly fascinated by the Japanese Covered Bridge, which exemplifies the cultural fusion that defines Hoi An. I also enjoy the local cuisine – the town is renowned for its distinctive dishes like cao lau and white rose dumplings, which you can't find anywhere else in Vietnam.

What makes this place truly special to me is how it offers a perfect escape from the hectic pace of modern life. There's something incredibly soothing about cycling along the river at sunset or simply sitting in a riverside café watching the traditional boats drift by. It's a place where I can genuinely disconnect and reflect, which is increasingly rare in today's hyper-connected world. Each visit leaves me feeling refreshed and inspired, which is why I keep returning.`,
            annotations: {
                strengths: [
                    'Sophisticated vocabulary (enchanting, authenticity, exemplifies, hyper-connected)',
                    'Complex sentence structures used flexibly',
                    'Idiomatic expressions (draws me back, drift by)',
                    'Excellent cohesion and coherence',
                    'Detailed and specific examples',
                    'Natural flow with varied sentence length',
                    'Personal reflection with broader context'
                ],
                bandJustification: 'Band 8: Wide vocabulary used flexibly; complex structures with high degree of accuracy; natural and effortless delivery; minor lapses do not affect communication'
            }
        },
        family_member_band6: {
            topicId: 'family_member',
            band: 6,
            answer: `I want to talk about my grandmother who I really admire. She is my mother's mother and she is 75 years old now. She lives in my hometown in a small house near our family home.

What I admire most about my grandmother is that she is very kind and patient. When I was young, she always took care of me when my parents were busy working. She taught me many things like how to cook traditional dishes and how to be polite to older people. Even now when I visit her, she always welcomes me with a big smile.

My grandmother is also very strong. She raised five children by herself because my grandfather died when she was still young. She worked very hard as a teacher to give them all a good education. Despite all the difficulties, she never complained and always stayed positive.

I admire her because she showed me that we can overcome any challenge if we stay strong and keep a positive attitude. She taught me important values like respect, hard work, and kindness. These lessons have helped me a lot in my life.`,
            annotations: {
                strengths: [
                    'Addresses all bullet points clearly',
                    'Good use of past tense for narratives',
                    'Personal examples make it authentic',
                    'Clear organization with logical flow',
                    'Sufficient vocabulary for the topic'
                ],
                limitations: [
                    'Some repetition ("she always")',
                    'Simpler vocabulary ("very kind", "very strong")',
                    'Limited use of complex sentences',
                    'Could develop ideas more deeply',
                    'Missing some less common vocabulary'
                ],
                bandJustification: 'Band 6: Speaks at length without noticeable effort; sufficient vocabulary though limited flexibility; mix of simple and complex structures; meaning clear despite some limitations'
            }
        },
        childhood_place_band7: {
            topicId: 'childhood_place',
            band: 7,
            answer: `I'd like to describe a small park near my childhood home that holds many special memories for me. It was located just a five-minute walk from our house, and I used to go there almost every day when I was between 6 and 12 years old.

The park wasn't particularly large or fancy, but it had everything a child could want – a playground with swings and slides, a small pond with ducks, and plenty of open space for running around. What made it special was that all the neighborhood children would gather there after school. We'd play games like hide-and-seek, climb trees, and in summer, we'd try to catch dragonflies near the pond.

I have countless fond memories of this place. I remember learning to ride a bike there with my father's help, celebrating birthdays with friends under the big oak tree, and just sitting on the bench reading comic books on lazy Sunday afternoons. The park was like our own little kingdom where we could be completely free and carefree.

This place was special to me because it represents the innocence and simplicity of childhood. In today's digital age, children often spend more time indoors with devices, but back then, this park was our entire world. It taught me the value of outdoor play, friendship, and imagination. Even now, whenever I visit my hometown, I make sure to walk past that park, and the memories come flooding back.`,
            annotations: {
                strengths: [
                    'Nostalgic tone appropriate for the topic',
                    'Specific, vivid details (pond with ducks, oak tree)',
                    'Range of vocabulary (fond memories, carefree, innocence)',
                    'Good use of "used to" and "would" for past habits',
                    'Personal reflection connecting past to present',
                    'Natural progression of ideas'
                ],
                bandJustification: 'Band 7: Speaks at length with good coherence; uses vocabulary flexibly; demonstrates awareness of style; uses complex structures with some flexibility'
            }
        },
        celebration_band8: {
            topicId: 'celebration',
            band: 8,
            answer: `I'd like to talk about my cousin's traditional wedding ceremony, which took place about two years ago in my hometown. It was a three-day celebration that beautifully blended modern and traditional elements, and it remains one of the most memorable events I've ever attended.

The wedding was held in our ancestral village, which added tremendous significance to the occasion. Over 300 guests attended, including extended family members who'd traveled from different parts of the country and even some relatives from abroad. The ceremony itself was incredibly elaborate, featuring traditional rituals that have been passed down through generations – from the formal tea ceremony honoring the elders to the intricate wedding procession through the village.

What made it particularly memorable was witnessing how our family's customs were being preserved and celebrated by the younger generation. My cousin and her husband had clearly put considerable thought into maintaining these traditions while adding their own contemporary touches. For instance, they incorporated traditional folk music alongside modern entertainment, and the bride wore both a customary ceremonial gown and a contemporary wedding dress.

The celebration was significant to me on multiple levels. On a personal level, it reinforced the importance of family bonds and cultural heritage. Seeing three generations of our family gathered together, sharing stories and laughter, reminded me of the deep roots that connect us. On a broader level, it highlighted how traditions can evolve and remain relevant in modern times. In an era of increasing globalization, such celebrations serve as anchors to our cultural identity while demonstrating that tradition and modernity can coexist harmoniously.`,
            annotations: {
                strengths: [
                    'Sophisticated vocabulary (ancestral, elaborate, contemporary, coexist harmoniously)',
                    'Complex sentences with excellent control',
                    'Varied discourse markers (which added, for instance, on a broader level)',
                    'Detailed, specific examples throughout',
                    'Deep reflection with cultural awareness',
                    'Natural, effortless flow',
                    'Advanced idiomatic language (put thought into, serve as anchors)'
                ],
                bandJustification: 'Band 8: Wide range of vocabulary used precisely; complex grammatical structures with flexibility; sophisticated development of topic; natural delivery with rare hesitation'
            }
        },
        sport_activity_band7: {
            topicId: 'sport_activity',
            band: 7,
            answer: `I'd like to talk about swimming, which is my favorite physical activity and something I try to do at least three times a week. I've been swimming regularly for about five years now, ever since I joined a local swimming club near my home.

I usually go swimming at the community pool in the evenings after work, around 7 PM when it's less crowded. Sometimes I go alone, but occasionally I swim with a few friends who are also members of the club. We've formed quite a supportive group, and we often motivate each other to improve our technique and stamina.

What I particularly enjoy about swimming is that it provides a complete workout for the whole body without putting stress on the joints, which is ideal for me as I had knee problems in the past from running. There's also something incredibly relaxing about being in the water – it's almost meditative. When I'm swimming laps, I can clear my mind and forget about the day's stresses. The rhythmic nature of the strokes and breathing helps me achieve a state of flow that I don't experience with other forms of exercise.

Beyond the physical benefits, swimming has also boosted my confidence and discipline. Setting goals like improving my lap times or learning new strokes has taught me the value of consistent practice. The sense of achievement when I reach these targets is immensely satisfying. Overall, swimming has become an integral part of my lifestyle, contributing to both my physical health and mental well-being.`,
            annotations: {
                strengths: [
                    'Clear structure addressing all points',
                    'Good range of vocabulary (stamina, meditative, rhythmic, integral)',
                    'Mix of simple and complex sentences',
                    'Personal details make it authentic',
                    'Reflective conclusion',
                    'Natural use of linking phrases'
                ],
                bandJustification: 'Band 7: Speaks fluently with occasional hesitation; vocabulary range allows discussion with flexibility; uses complex structures though with some errors; develops topic coherently'
            }
        },
        book_movie_band6: {
            topicId: 'book_movie',
            band: 6,
            answer: `I want to talk about a book called "The Alchemist" by Paulo Coelho that really influenced me. I read it about three years ago when I was in university, and my friend recommended it to me.

The book is about a young shepherd boy who travels from Spain to Egypt looking for treasure. During his journey, he meets many interesting people who teach him important lessons about life. The story is quite simple but the message is very powerful.

This book influenced me in several ways. First, it taught me to follow my dreams even when things are difficult. The main character faces many challenges but he never gives up. Second, it made me think about what is really important in life. The book shows that sometimes the journey is more important than the destination.

After reading this book, I became more confident to pursue my goals. I was thinking about changing my major at university, but I was afraid. The book message gave me courage to make that change, and now I am studying something I really love. The book also taught me to pay attention to signs and opportunities in life. I think it made me more open-minded and willing to try new things.`,
            annotations: {
                strengths: [
                    'Clear structure with logical progression',
                    'Addresses all bullet points',
                    'Personal application of the book\'s lessons',
                    'Sufficient vocabulary for the task'
                ],
                limitations: [
                    'Simpler vocabulary choices',
                    'Some repetition (the book)',
                    'Limited use of advanced structures',
                    'Could provide more specific examples'
                ],
                bandJustification: 'Band 6: Willing to speak at length; sufficient vocabulary for familiar topics; uses mix of simple and complex structures; meaning is generally clear'
            }
        },
        hobby_band6: {
            topicId: 'hobby',
            band: 6,
            answer: `I want to talk about photography, which is my favorite hobby. I started doing photography about two years ago when my uncle gave me his old camera.

I usually do photography on weekends when I have free time. Sometimes I go to parks or interesting places in my city to take photos of nature and buildings. I like taking pictures of sunsets because the colors are very beautiful. I also enjoy photographing people when they are doing normal activities because these photos look more natural.

I enjoy this hobby for several reasons. First, it helps me to relax after a busy week of studying. When I'm taking photos, I forget about my problems and stress. Second, photography makes me notice beautiful things that I didn't see before. Now I pay more attention to colors, lights, and shapes around me. Third, I can share my photos on social media and my friends often say they like them, which makes me feel good.

Another reason why I like photography is that I'm learning new skills. I watch YouTube videos to learn about camera settings and composition. I think I'm getting better, and some of my recent photos are much better than my first photos. In the future, I hope to maybe do some professional photography, but for now, it's just my hobby that I really enjoy.`,
            annotations: {
                strengths: [
                    'Addresses all prompts clearly',
                    'Organized structure with clear progression',
                    'Sufficient vocabulary for the topic',
                    'Some good connectives (first, second, third, another reason)',
                    'Personal details make it authentic'
                ],
                limitations: [
                    'Simpler vocabulary (very beautiful, makes me feel good)',
                    'Less complex grammatical structures',
                    'Some repetition (I like, I enjoy)',
                    'Limited use of less common vocabulary',
                    'Could develop ideas more deeply'
                ],
                bandJustification: 'Band 6: Willing to speak at length; sufficient vocabulary; mix of simple and complex structures; meaning is clear despite some errors'
            }
        }
    },

    // Grammar patterns for each part
    grammarPatterns: {
        part1: {
            description: 'Part 1 focuses on familiar topics about yourself, family, home, work/study. Use present simple, present continuous, and simple past.',
            patterns: [
                {
                    name: 'Present Simple for habits and facts',
                    examples: [
                        'I work as a software developer.',
                        'I usually spend weekends with my family.',
                        'I live in a small apartment in the city center.'
                    ]
                },
                {
                    name: 'Present Perfect for experiences',
                    examples: [
                        'I\'ve lived here for five years.',
                        'I\'ve always been interested in music.',
                        'I\'ve recently started learning photography.'
                    ]
                },
                {
                    name: 'Simple Past for specific events',
                    examples: [
                        'I graduated from university last year.',
                        'I moved to this city in 2020.',
                        'I started this hobby when I was a teenager.'
                    ]
                },
                {
                    name: 'Like/Enjoy + -ing for preferences',
                    examples: [
                        'I enjoy reading in my free time.',
                        'I like spending time outdoors.',
                        'I prefer working independently.'
                    ]
                }
            ]
        },
        part2: {
            description: 'Part 2 requires sustained narrative. Use past tenses, descriptive language, and personal reflection.',
            patterns: [
                {
                    name: 'Past Continuous for background/context',
                    examples: [
                        'I was studying abroad when I first met him.',
                        'We were walking through the old town when we discovered this café.',
                        'I was going through a difficult time when this event happened.'
                    ]
                },
                {
                    name: 'Past Perfect for earlier events',
                    examples: [
                        'I had never seen anything like it before.',
                        'I had been looking for a place like this for months.',
                        'She had already influenced many students before I met her.'
                    ]
                },
                {
                    name: 'Would/Used to for past habits',
                    examples: [
                        'We would spend hours talking about books.',
                        'I used to visit this place every summer.',
                        'She would always encourage us to think critically.'
                    ]
                },
                {
                    name: 'Relative Clauses for description',
                    examples: [
                        'It\'s a place where I feel completely at peace.',
                        'She was someone who truly cared about her students.',
                        'This was an experience that changed my perspective.'
                    ]
                },
                {
                    name: 'The reason why... is that...',
                    examples: [
                        'The reason why this place is special is that it holds so many memories.',
                        'The reason I admire her is that she never gave up on her students.'
                    ]
                }
            ]
        },
        part3: {
            description: 'Part 3 involves abstract discussion. Use conditionals, complex structures, and hedging language.',
            patterns: [
                {
                    name: 'Conditionals for hypothetical situations',
                    examples: [
                        'If governments invested more in education, we would see better outcomes.',
                        'If people had more free time, they might pursue more hobbies.',
                        'Unless we address this issue, the situation will worsen.'
                    ]
                },
                {
                    name: 'Passive voice for formal tone',
                    examples: [
                        'It is widely believed that education shapes character.',
                        'This problem has been debated for years.',
                        'More research needs to be conducted in this area.'
                    ]
                },
                {
                    name: 'Hedging language for balanced views',
                    examples: [
                        'It seems to me that technology has both benefits and drawbacks.',
                        'I tend to think that family influence is stronger than peer influence.',
                        'It could be argued that traditional values are declining.'
                    ]
                },
                {
                    name: 'Comparative structures',
                    examples: [
                        'People today have far more opportunities than previous generations.',
                        'The more technology advances, the less privacy we have.',
                        'Online learning is becoming increasingly popular.'
                    ]
                },
                {
                    name: 'Expressing contrasts',
                    examples: [
                        'While some people prefer city life, others find it too stressful.',
                        'Although technology has benefits, we shouldn\'t ignore its downsides.',
                        'On the one hand... On the other hand...'
                    ]
                }
            ]
        }
    },

    // Strategy guides for each part
    strategies: {
        part1: {
            duration: '4-5 minutes',
            tips: [
                'Give full but concise answers - extend beyond yes/no',
                'Use 2-3 sentences per question',
                'Add a reason or example to each answer',
                'Practice common topics: work, study, hometown, hobbies',
                'Speak naturally - don\'t memorize answers',
                'Show you can use present, past, and future tenses',
                'Don\'t worry if the examiner interrupts - it\'s normal'
            ],
            commonMistakes: [
                'Giving one-word answers (too short)',
                'Speaking for too long (over 30 seconds)',
                'Using memorized answers (sounds unnatural)',
                'Being too nervous to elaborate',
                'Not answering the question asked'
            ],
            example: {
                question: 'Do you work or study?',
                poor: 'I study.',
                good: 'I\'m currently studying computer science at university. I\'m in my third year, and I find it really challenging but rewarding, especially the programming courses.'
            }
        },
        part2: {
            duration: '3-4 minutes (1 min prep + 2 min speaking)',
            tips: [
                'Use the 1-minute prep time effectively - make notes',
                'Structure: Introduction → Point 1 → Point 2 → Point 3 → Conclusion',
                'Address all bullet points on the cue card',
                'Speak for the full 2 minutes - practice at home',
                'Use past tenses for narrative topics',
                'Include specific examples and details',
                'The examiner will stop you at 2 minutes - don\'t worry',
                'Practice topics from all categories: people, places, events, objects'
            ],
            commonMistakes: [
                'Not using the preparation time',
                'Stopping after 1 minute (too short)',
                'Not addressing all bullet points',
                'Being too general - lack of specific details',
                'Losing coherence halfway through',
                'Memorizing entire answers (examiners can tell)'
            ],
            timeManagement: {
                '0-15 seconds': 'Introduction - what/who you will describe',
                '15-90 seconds': 'Develop the bullet points with details and examples',
                '90-120 seconds': 'Explain why/how it affected you (usually the last bullet point)'
            }
        },
        part3: {
            duration: '4-5 minutes',
            tips: [
                'Questions are abstract and related to Part 2 topic',
                'Give extended answers with reasoning and examples',
                'Show ability to discuss complex ideas',
                'Use a range of complex structures and vocabulary',
                'It\'s okay to ask for clarification if you don\'t understand',
                'Give balanced views - consider different perspectives',
                'Use hedging language: "It seems to me...", "I tend to think..."',
                'Connect to real-world examples or current issues'
            ],
            commonMistakes: [
                'Giving short, Part 1-style answers',
                'Not developing ideas sufficiently',
                'Being too definitive - not showing nuanced thinking',
                'Using too simple vocabulary and grammar',
                'Going off-topic',
                'Not giving reasons or examples'
            ],
            answerStructure: {
                technique: 'Direct answer → Reason/Explanation → Example → (Counter-point) → Conclusion',
                example: {
                    question: 'Why are celebrations important in society?',
                    structure: 'Answer: Celebrations are important for social cohesion. | Reason: They bring communities together and reinforce shared values. | Example: For instance, national holidays remind people of their common heritage. | Counter: However, some argue we over-commercialize celebrations. | Conclusion: Overall, when done authentically, they strengthen social bonds.'
                }
            }
        }
    },

    // Vocabulary resources by theme
    vocabularyThemes: {
        education: {
            nouns: ['curriculum', 'pedagogy', 'literacy', 'tuition', 'scholarship', 'academia', 'qualification', 'apprenticeship'],
            verbs: ['acquire knowledge', 'pursue a degree', 'excel in', 'broaden horizons', 'fall behind', 'catch up'],
            adjectives: ['academic', 'vocational', 'compulsory', 'theoretical', 'hands-on', 'well-rounded'],
            phrases: [
                'lifelong learning',
                'critical thinking skills',
                'rote learning',
                'student-centered approach',
                'practical application'
            ]
        },
        technology: {
            nouns: ['innovation', 'breakthrough', 'automation', 'artificial intelligence', 'digital divide', 'cyber security'],
            verbs: ['revolutionize', 'streamline', 'facilitate', 'transform', 'disrupt', 'integrate'],
            adjectives: ['cutting-edge', 'state-of-the-art', 'obsolete', 'user-friendly', 'wireless', 'virtual'],
            phrases: [
                'technological advancement',
                'digital native',
                'cloud computing',
                'social media platform',
                'tech-savvy'
            ]
        },
        environment: {
            nouns: ['sustainability', 'conservation', 'pollution', 'deforestation', 'biodiversity', 'emissions', 'renewable energy'],
            verbs: ['preserve', 'contaminate', 'deplete', 'restore', 'recycle', 'reduce carbon footprint'],
            adjectives: ['eco-friendly', 'sustainable', 'toxic', 'renewable', 'endangered', 'organic'],
            phrases: [
                'climate change',
                'global warming',
                'environmental degradation',
                'carbon emissions',
                'ecological balance'
            ]
        },
        society: {
            nouns: ['inequality', 'diversity', 'community', 'tradition', 'generation gap', 'urbanization', 'peer pressure'],
            verbs: ['integrate', 'segregate', 'embrace', 'conform', 'challenge norms', 'marginalize'],
            adjectives: ['multicultural', 'egalitarian', 'diverse', 'traditional', 'modern', 'inclusive'],
            phrases: [
                'social mobility',
                'quality of life',
                'work-life balance',
                'cultural heritage',
                'sense of belonging'
            ]
        }
    },

    // Pronunciation tips
    pronunciation: {
        commonProblems: [
            {
                issue: 'TH sounds (/θ/ and /ð/)',
                tip: 'Put tongue between teeth. Practice: think, thought, they, this',
                examples: ['thirty', 'theory', 'although', 'weather']
            },
            {
                issue: 'L vs R',
                tip: 'L: tongue touches roof of mouth. R: tongue doesn\'t touch anything',
                examples: ['correct vs collect', 'arrive vs alive', 'right vs light']
            },
            {
                issue: 'Word stress',
                tip: 'English is stress-timed. Stress key syllables, reduce others',
                examples: ['PHOtograph vs phoTOgraphy vs photoGRAphic', 'ECOnomy vs ecoNOmic']
            },
            {
                issue: 'Final consonants',
                tip: 'Don\'t drop final sounds. Pronounce: worked (workt), asked (askt)',
                examples: ['stopped', 'fixed', 'watched', 'helped']
            },
            {
                issue: 'Connected speech',
                tip: 'Link words smoothly. "an apple" → "a napple", "what are" → "whadder"',
                examples: ['check it out', 'give up', 'turn off', 'good idea']
            }
        ],
        intonationPatterns: [
            'Falling: statements, wh-questions → "What time is it?↓"',
            'Rising: yes/no questions → "Do you like it?↑"',
            'Fall-rise: uncertainty, politeness → "Well, I suppose so↓↑"',
            'List intonation: rise, rise, fall → "apples↑, oranges↑, and bananas↓"'
        ]
    },

    // Common Part 1 questions
    part1Questions: {
        work: [
            'Do you work or study?',
            'What do you do?',
            'Why did you choose this job/field?',
            'Do you enjoy your work?',
            'What are your responsibilities?',
            'Would you like to change jobs in the future?'
        ],
        study: [
            'What subject are you studying?',
            'Why did you choose this subject?',
            'Do you enjoy your studies?',
            'What do you find most challenging?',
            'What are your future study plans?',
            'Do you prefer practical or theoretical learning?'
        ],
        hometown: [
            'Where are you from?',
            'What is your hometown like?',
            'What do you like about your hometown?',
            'Has your hometown changed much?',
            'Would you like to live there in the future?',
            'What could be improved in your hometown?'
        ],
        home: [
            'Do you live in a house or apartment?',
            'Can you describe your home?',
            'What room do you like most?',
            'Would you like to change anything about your home?',
            'Do you plan to move in the future?',
            'What makes a house a home?'
        ],
        hobbies: [
            'What do you do in your free time?',
            'What hobbies do you have?',
            'When did you start this hobby?',
            'Why do you enjoy it?',
            'Do you think hobbies are important?',
            'Have your hobbies changed over time?'
        ]
    }
};

// Utility functions for the library
const IELTSLibraryUtils = {
    // Get all topics as flat array
    getAllTopics() {
        const allTopics = [];
        for (const category in IELTS_LIBRARY.topics) {
            IELTS_LIBRARY.topics[category].forEach(topic => {
                allTopics.push({
                    ...topic,
                    category: category
                });
            });
        }
        return allTopics;
    },

    // Get topic by ID
    getTopicById(topicId) {
        const allTopics = this.getAllTopics();
        return allTopics.find(topic => topic.id === topicId);
    },

    // Get random topic
    getRandomTopic(category = null) {
        if (category && IELTS_LIBRARY.topics[category]) {
            const topics = IELTS_LIBRARY.topics[category];
            return topics[Math.floor(Math.random() * topics.length)];
        }
        const allTopics = this.getAllTopics();
        return allTopics[Math.floor(Math.random() * allTopics.length)];
    },

    // Get sample answer for topic
    getSampleAnswer(topicId) {
        for (const key in IELTS_LIBRARY.sampleAnswers) {
            const sample = IELTS_LIBRARY.sampleAnswers[key];
            if (sample.topicId === topicId) {
                return sample;
            }
        }
        return null;
    },

    // Search topics by keyword
    searchTopics(keyword) {
        const allTopics = this.getAllTopics();
        const lowerKeyword = keyword.toLowerCase();
        return allTopics.filter(topic =>
            topic.title.toLowerCase().includes(lowerKeyword) ||
            topic.part2Card.topic.toLowerCase().includes(lowerKeyword) ||
            topic.vocabulary.some(word => word.toLowerCase().includes(lowerKeyword))
        );
    },

    // Get vocabulary by theme
    getVocabularyByTheme(theme) {
        return IELTS_LIBRARY.vocabularyThemes[theme] || null;
    },

    // Format topic as cue card text
    formatCueCard(topic) {
        const card = topic.part2Card;
        let text = `${card.topic}\n\nYou should say:\n`;
        card.prompts.forEach(prompt => {
            text += `• ${prompt}\n`;
        });
        return text;
    }
};

// Make library available globally
window.IELTS_LIBRARY = IELTS_LIBRARY;
window.IELTSLibraryUtils = IELTSLibraryUtils;
