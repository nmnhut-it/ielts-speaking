// IELTS Speaking Lessons - Comprehensive Learning Modules
// Combines pre-recorded teacher audio with AI-aided practice
// Student learns strategies, then practices with personalized AI feedback

const LESSON_CONSTANTS = {
    STORAGE_KEY: 'ielts_lesson_progress',
    AUDIO_DB_NAME: 'IELTSLessonAudioDB',
    AUDIO_STORE_NAME: 'audioFiles'
};

const IELTS_LESSONS = {
    // Module 1: Understanding the IELTS Speaking Test
    module1: {
        id: 'module1',
        title: 'Understanding the IELTS Speaking Test',
        duration: 10,
        description: 'Learn what examiners look for and common mistakes to avoid',

        sections: [
            {
                id: 'm1_intro',
                type: 'audio_lesson',
                title: 'Welcome to IELTS Speaking Mastery',
                audioScript: {
                    text: `Hello! I'm your IELTS speaking teacher, and I'm here to help you master the speaking test. Many students feel nervous about speaking tests, but with the right strategies, you can feel confident and perform well. In this course, you'll learn exactly what examiners look for, how to organize your thoughts quickly, and how to express yourself clearly and naturally. Let's begin by understanding what the test is really about.`,
                    duration: 30
                },
                content: {
                    text: 'The IELTS Speaking test evaluates your ability to communicate effectively in English. It consists of three parts and lasts 11-14 minutes.'
                }
            },
            {
                id: 'm1_criteria',
                type: 'audio_lesson',
                title: 'The Four Scoring Criteria',
                audioScript: {
                    text: `Examiners evaluate you on four criteria: Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, and Pronunciation. Let me explain what each one really means. Fluency is about speaking smoothly without too many pauses. Coherence means your ideas connect logically. Lexical Resource is your vocabulary range - can you use different words naturally? Grammar is about using various sentence structures correctly. And pronunciation isn't about having a perfect accent - it's about being clear and understandable. The key insight is this: examiners want to see you communicate naturally, not perfectly. A few small mistakes are completely okay if you keep speaking confidently.`,
                    duration: 45
                },
                content: {
                    visualAid: 'band_descriptors',
                    text: 'Understanding these criteria helps you focus your practice effectively.'
                }
            },
            {
                id: 'm1_mistakes',
                type: 'audio_lesson',
                title: 'Common Mistakes Students Make',
                audioScript: {
                    text: `Let me share the most common mistakes I see. First, memorizing answers. Examiners can easily tell when you're reciting memorized text, and this actually lowers your score. Second, giving very short answers in Part One. The examiner wants to hear you speak, so extend your answers naturally. Third, panicking when you don't know a word. Instead, learn to paraphrase and explain what you mean. Fourth, speaking too fast because of nervousness. It's better to speak at a natural pace. And finally, not asking for clarification when you don't understand a question. It's perfectly fine to say "Could you repeat that, please?" Remember, the test is designed to see how you communicate in real situations.`,
                    duration: 50
                },
                content: {
                    examples: [
                        { wrong: 'Yes.', right: 'Yes, I really enjoy reading, especially mystery novels.' },
                        { wrong: '[memorized speech]', right: '[natural, spontaneous response]' }
                    ]
                }
            },
            {
                id: 'm1_quiz',
                type: 'interactive_quiz',
                title: 'Test Your Understanding',
                questions: [
                    {
                        question: 'Which is MORE important: perfect grammar or fluent communication?',
                        options: ['Perfect grammar', 'Fluent communication', 'Both equally'],
                        correct: 1,
                        explanation: 'Fluent communication is more important. Small grammar mistakes are acceptable if you communicate clearly.'
                    },
                    {
                        question: 'What should you do if you don\'t understand a question?',
                        options: ['Guess and answer anyway', 'Ask for clarification', 'Stay silent'],
                        correct: 1,
                        explanation: 'Always ask for clarification! This shows good communication skills.'
                    },
                    {
                        question: 'Is it okay to have a non-native accent?',
                        options: ['No, you must sound native', 'Yes, clarity matters more than accent', 'Only British or American accents accepted'],
                        correct: 1,
                        explanation: 'Your accent is fine! Pronunciation scoring focuses on clarity, not native-like accent.'
                    }
                ]
            }
        ]
    },

    // Module 2: Finding Ideas Fast (Part 1)
    module2: {
        id: 'module2',
        title: 'Finding Ideas Fast',
        duration: 20,
        description: 'Learn the 5W1H method and never run out of ideas',

        sections: [
            {
                id: 'm2_intro',
                type: 'audio_lesson',
                title: 'The Idea Problem',
                audioScript: {
                    text: `One of the biggest challenges students face is this: the examiner asks a simple question like "Do you like sports?" and suddenly your mind goes blank. You know you should say more than just "yes" or "no," but what should you talk about? This happens because you're trying to think of the perfect answer. Let me teach you a simple system that will give you ideas for ANY topic in just seconds. It's called the 5W1H method, and once you learn it, you'll never run out of things to say.`,
                    duration: 35
                }
            },
            {
                id: 'm2_5w1h',
                type: 'audio_lesson',
                title: 'The 5W1H Method',
                audioScript: {
                    text: `5W1H stands for: Who, What, When, Where, Why, and How. When you get a question, quickly think through these six points. Let me demonstrate. Question: "Do you like cooking?" Let's use 5W1H. WHAT do I cook? Pasta, vegetables, sometimes desserts. WHEN do I cook? Usually on weekends when I have more time. WHERE? In my kitchen at home, sometimes I cook outdoors. WHO do I cook for? Myself, my family, occasionally friends. WHY do I enjoy it? It's relaxing and creative. HOW do I feel when cooking? I feel calm and focused. See? In just a few seconds, I have six different angles to talk about. You don't need to use all six every time - just pick two or three that feel natural. This method works for ANY topic.`,
                    duration: 60
                },
                content: {
                    visualAid: 'mind_map',
                    example: {
                        question: 'Do you like cooking?',
                        ideas: {
                            what: 'pasta, vegetables, desserts',
                            when: 'weekends, free time',
                            where: 'home kitchen, outdoors',
                            who: 'family, friends, myself',
                            why: 'relaxing, creative',
                            how: 'feel calm, focused'
                        }
                    }
                }
            },
            {
                id: 'm2_demo',
                type: 'audio_lesson',
                title: 'Teacher Demonstration',
                audioScript: {
                    text: `Let me show you this in action. Question: "Do you enjoy traveling?" Watch how I think through this. First, WHERE have I traveled? I've been to Japan and several European countries. WHEN do I usually travel? Usually during summer vacation. WHY do I enjoy it? I love experiencing different cultures and trying new foods. WHO do I travel with? Sometimes with friends, sometimes alone. HOW does traveling make me feel? It makes me feel excited and curious about the world. WHAT kind of travel do I prefer? I prefer city exploration over beach vacations. Now I have plenty of ideas! I could turn any of these into a good answer. The key is not to overthink it - just quickly scan through the six questions and pick what comes to mind first.`,
                    duration: 55
                }
            },
            {
                id: 'm2_practice1',
                type: 'ai_practice',
                title: 'Your Turn: Generate Ideas',
                instructions: 'Use the 5W1H method to generate ideas for the question below. Type your ideas, then get AI feedback.',
                practiceQuestion: 'Do you enjoy reading books?',
                aiPromptTemplate: `The student learned the 5W1H method (Who, What, When, Where, Why, How) for generating ideas.

Question: {{question}}
Student's ideas: {{studentResponse}}

As an encouraging IELTS teacher:
1. Identify which W/H elements they covered
2. Praise what they did well
3. Suggest 1-2 missing elements they could add
4. Keep it brief and supportive

Format your response clearly with checkmarks (✓) for covered elements.`
            },
            {
                id: 'm2_compare',
                type: 'dual_view',
                title: 'Compare Your Approach',
                studentView: 'Your ideas will appear here',
                teacherView: {
                    audioScript: {
                        text: `Here's how I approached the reading question using 5W1H. WHAT do I read? Mystery novels, biographies, sometimes science articles. WHEN? Every night before bed, and during commutes. WHERE? At home in my favorite chair, or on the train. WHO influences my reading choices? Friends recommend books, and I follow some book reviewers. WHY do I enjoy reading? It helps me relax and learn new things. HOW does reading make me feel? It makes me feel calm and intellectually stimulated. Notice I didn't use all six in my final answer - I'll pick the three most interesting ones.`,
                        duration: 45
                    },
                    ideas: {
                        what: 'mystery novels, biographies, science articles',
                        when: 'before bed, during commute',
                        where: 'home, on train',
                        who: 'friends, book reviewers',
                        why: 'relax, learn',
                        how: 'calm, intellectually stimulated'
                    }
                }
            },
            {
                id: 'm2_practice2',
                type: 'ai_practice',
                title: 'Practice More Topics (100 Questions)',
                instructions: 'Try the 5W1H method with different topics. The AI will track your progress. Complete as many as you want!',
                practiceQuestions: [
                    // Hobbies & Interests (5)
                    {
                        question: 'What kind of music do you like?',
                        sampleAnswer: 'I\'d say I\'m really drawn to jazz. There\'s something about the smooth, improvisational melodies that helps me wind down after a hectic day at work. I tend to put it on in the evenings while I\'m cooking or just lounging around at home. It\'s the kind of music you can appreciate on different levels — sometimes I\'m just enjoying the vibe, and other times I catch myself really listening to the complexity of the arrangements.',
                        w5h1: { what: 'jazz music', when: 'in the evenings', where: 'at home while cooking or relaxing', who: 'by myself', why: 'helps wind down, appreciates complexity', how: 'enjoys on different levels depending on mood' }
                    },
                    {
                        question: 'Do you enjoy watching movies?',
                        sampleAnswer: 'Oh, absolutely. I\'m a big fan of thrillers and sci-fi — anything with a gripping plot that keeps you guessing. My family and I usually have a movie night on weekends, though for big releases I prefer the full cinema experience. What I enjoy most is how a good film can completely transport you to another world and make you forget about the stresses of everyday life.',
                        w5h1: { what: 'thrillers and sci-fi films', when: 'weekends, cinema for big releases', where: 'at home or cinema', who: 'with family', why: 'gripping plots, transports you to another world', how: 'forget daily stress, keeps you guessing' }
                    },
                    {
                        question: 'What do you like to do on weekends?',
                        sampleAnswer: 'Well, it varies quite a bit actually. If the weather\'s nice, my friends and I like to check out new cafés or brunch spots around the city — we\'re always on the lookout for hidden gems. It\'s become a bit of a Saturday tradition for us, and it\'s a great way to unwind and catch up after a busy week.',
                        w5h1: { what: 'checking out new cafés and brunch spots', when: 'Saturdays', where: 'around the city', who: 'with friends', why: 'unwind and catch up after busy week', how: 'became a tradition, always looking for hidden gems' },
                        alternativeSamples: [
                            {
                                technique: 'Contrast',
                                text: 'Honestly, it depends entirely on my energy levels. Some weekends I\'m in the mood to just stay in, curl up with a book, and recharge my batteries. But other times, I get restless and want to be out and about — trying a new restaurant, going for a hike, or catching up with friends. I suppose I need that mix to feel properly balanced.',
                                breakdown: { type: 'situation-based', sideA: 'quiet weekends at home reading/movies', sideB: 'active weekends out exploring/hiking/friends', marker: 'but on other weekends' }
                            }
                        ]
                    },
                    {
                        question: 'Do you have any hobbies?',
                        sampleAnswer: 'Yes, I\'ve been quite into photography for the past three years or so. I tend to grab my camera whenever I\'m exploring new places or just wandering around my neighbourhood on weekends. What I love about it is that it\'s completely changed the way I see things — I notice details now that I would have walked straight past before, like interesting light patterns or textures.',
                        w5h1: { what: 'photography for three years', when: 'when exploring or on weekends', where: 'new places and neighbourhood', who: 'solo creative pursuit', why: 'changed the way I see the world', how: 'notices details like light patterns and textures' }
                    },
                    {
                        question: 'What do you do in your free time?',
                        sampleAnswer: 'I\'d say I split my free time between two quite different things — reading and tennis. I usually wind down with a mystery novel before bed; it\'s become a kind of ritual that helps me switch off. And then twice a week, I play tennis with a few friends at a local court, which is brilliant for burning off energy and staying in shape.',
                        w5h1: { what: 'reading mystery novels and playing tennis', when: 'before bed / twice a week', where: 'at home / local court', who: 'alone / with friends', why: 'reading to switch off, tennis for energy and fitness', how: 'ritual-like habit, good balance of mind and body' },
                        alternativeSamples: [
                            {
                                technique: 'Past vs Present',
                                text: 'Actually, my free time looks completely different from a few years ago. I used to be glued to video games — we\'re talking four or five hours on a weekend, easily. But gradually I shifted towards reading, exploring the city, and spending time at cafés. I think as I matured, I started craving activities that left me feeling like I\'d actually gained something by the end of the day.',
                                breakdown: { past: 'video games 4-5 hours daily on weekends', present: 'reading, cafés, exploring city', why: 'sought more enriching activities with age' }
                            }
                        ]
                    },

                    // Daily Life (5)
                    {
                        question: 'Do you prefer studying alone or with others?',
                        sampleAnswer: 'On the whole, I\'d say I prefer studying alone, especially for anything that requires deep concentration. I usually settle into a quiet corner at the library or my room and just focus. That said, group study sessions can be really valuable when we\'re working through tricky concepts — hearing someone else\'s perspective often helps things click.',
                        w5h1: { what: 'studying alone for deep focus', when: 'evenings or weekends', where: 'library or room', who: 'alone, sometimes group for tricky concepts', why: 'quiet helps concentration, others offer fresh perspectives', how: 'settles into focused state, things click with collaboration' }
                    },
                    {
                        question: 'What time do you usually wake up?',
                        sampleAnswer: 'On weekdays, my alarm goes off at half six, which gives me enough time to get ready without rushing. I\'m not exactly a natural early riser, but I\'ve found that having a calm morning sets the tone for the whole day. On weekends though, I let myself sleep in until eight or nine — I think the body needs that chance to properly recover.',
                        w5h1: { what: 'waking at 6:30 weekdays, sleeping in weekends', when: '6:30 AM weekdays / 8-9 AM weekends', where: 'at home', who: 'alone', why: 'calm morning sets the tone, weekends for recovery', how: 'not a natural early riser but values the routine' }
                    },
                    {
                        question: 'How do you usually spend your evenings?',
                        sampleAnswer: 'Most evenings are pretty low-key for me. After finishing work around six, I usually cook something and then settle in for an episode or two of whatever series I\'m into at the moment. Sometimes my partner joins me, and occasionally I\'ll ring a friend or family member to catch up. It\'s nothing glamorous, but it\'s how I recharge.',
                        w5h1: { what: 'cooking and watching series', when: 'after work from about 6 PM', where: 'at home', who: 'sometimes with partner, calls friends', why: 'recharge after work, stay connected', how: 'low-key routine that works well' }
                    },
                    {
                        question: 'Do you prefer eating at home or at restaurants?',
                        sampleAnswer: 'Generally, I\'m a home-cooking person during the week — I tend to make fairly simple things like stir-fries or pasta, which is healthier and easier on the wallet. But come the weekend, I really look forward to dining out with friends or family. There\'s a social element to restaurants that you just can\'t replicate at home, plus it\'s always fun to try dishes I\'d never attempt to make myself.',
                        w5h1: { what: 'home cooking weekdays, restaurants weekends', when: 'weekdays at home, weekends out', where: 'kitchen / restaurants', who: 'alone or with partner / friends or family', why: 'healthier and cheaper at home, social and adventurous dining out', how: 'looks forward to the contrast between both' }
                    },
                    {
                        question: 'What do you usually do after work/school?',
                        sampleAnswer: 'The first thing I do is go for a quick jog in the park near my office — even just thirty minutes makes a huge difference in terms of clearing my head after a full day. After that, I head home, throw something together for dinner, and just take it easy for the rest of the evening. It\'s a simple routine, but it helps me draw a clear line between work mode and personal time.',
                        w5h1: { what: 'quick jog then dinner and relaxing', when: 'right after work, about 30 minutes', where: 'park near office, then home', who: 'alone', why: 'clears head, separates work from personal time', how: 'simple routine that creates clear boundaries' }
                    },

                    // Activities & Sports (5)
                    {
                        question: 'Do you like playing sports?',
                        sampleAnswer: 'Definitely — I\'m a big badminton fan. A few friends from university and I play twice a week at a community sports centre, usually on Tuesday and Thursday evenings. It\'s one of those things I genuinely look forward to because it\'s competitive enough to get a proper workout, but also just a really fun way to socialise.',
                        w5h1: { what: 'playing badminton', when: 'twice a week, Tuesday and Thursday evenings', where: 'community sports centre', who: 'with university friends', why: 'competitive workout and social outlet', how: 'genuinely looks forward to it each week' }
                    },
                    {
                        question: 'Do you enjoy outdoor activities?',
                        sampleAnswer: 'I really do, yes. Hiking is probably my favourite — a group of friends and I try to hit a new trail most weekends, especially during spring and autumn when the conditions are ideal. There\'s something incredibly restorative about being out in nature; I always come back feeling like my batteries have been fully recharged.',
                        w5h1: { what: 'hiking new trails', when: 'most weekends, spring and autumn', where: 'mountains and trails', who: 'with a group of friends', why: 'restorative, recharges batteries', how: 'always comes back feeling renewed' }
                    },
                    {
                        question: 'Have you ever tried swimming?',
                        sampleAnswer: 'Yes, I actually learned when I was about seven, and it\'s stuck with me ever since. I still swim from time to time, mainly in summer when the heat becomes unbearable. What I like about it is that it\'s gentle on the joints but still gives you a proper workout — you get out of the pool feeling both tired and oddly energised.',
                        w5h1: { what: 'swimming since age seven', when: 'mainly in summer', where: 'local pool', who: 'usually alone', why: 'gentle on joints, proper workout', how: 'paradox of feeling tired yet energised' }
                    },
                    {
                        question: 'Do you like going to the gym?',
                        sampleAnswer: 'I do, though I wouldn\'t call myself a gym fanatic. I go about three times a week after work and focus on a mix of cardio and weights. Honestly, it started as a way to manage stress, but over time it\'s become part of my routine — if I skip it, I actually notice a dip in both my mood and energy levels.',
                        w5h1: { what: 'cardio and weights three times a week', when: 'evenings after work', where: 'gym near home', who: 'alone to focus', why: 'started for stress, now essential for mood and energy', how: 'notices the difference when sessions are skipped' }
                    },
                    {
                        question: 'What kind of exercise do you do?',
                        sampleAnswer: 'I have a bit of a dual routine going on. Most mornings I jog in the park near my flat — it\'s a nice way to start the day before things get hectic. On alternate days I do yoga at home, which is more about flexibility and mental clarity. The two complement each other surprisingly well; the running builds stamina and the yoga keeps everything loose.',
                        w5h1: { what: 'jogging and yoga on alternate days', when: 'most mornings for jogging, other days for yoga', where: 'park near flat / at home', who: 'solo routine', why: 'jogging for stamina, yoga for flexibility and clarity', how: 'the two complement each other well' }
                    },

                    // Technology & Media (5)
                    {
                        question: 'Do you use social media?',
                        sampleAnswer: 'I do, mainly Instagram and Facebook, though I try to keep it in check. I tend to scroll through during lunch breaks or in the evening to see what friends are up to. It\'s useful for staying in the loop, but I\'ve learned the hard way that too much screen time can be a real drain, so I try to set boundaries.',
                        w5h1: { what: 'Instagram and Facebook with limits', when: 'lunch breaks and evenings', where: 'at work and home', who: 'connecting with friends', why: 'staying in the loop', how: 'sets boundaries to avoid draining effects' }
                    },
                    {
                        question: 'What do you use your phone for most?',
                        sampleAnswer: 'Messaging and emails, without a doubt — especially for work. Beyond that, I rely on it heavily for navigation when I\'m driving and for music during my commute. It\'s honestly become a bit of an extension of my hand at this point, which I\'m not entirely proud of, but it does keep things running smoothly.',
                        w5h1: { what: 'messaging, emails, navigation, music', when: 'throughout the day and commute', where: 'work, driving, on the go', who: 'communicating with colleagues and clients', why: 'keeps things organised and running smoothly', how: 'feels almost too dependent but practically essential' }
                    },
                    {
                        question: 'Do you like watching TV shows?',
                        sampleAnswer: 'I do, especially crime dramas and documentaries. I usually watch an episode or two after dinner as a way to wind down before bed. The beauty of streaming is that you can go at your own pace — no waiting a whole week for the next instalment. Although I have to admit, the downside is that it\'s far too easy to binge.',
                        w5h1: { what: 'crime dramas and documentaries', when: 'evenings after dinner', where: 'at home', who: 'usually alone', why: 'wind down before bed', how: 'appreciates own-pace streaming, but admits binge risk' }
                    },
                    {
                        question: 'Do you prefer online shopping or in-store shopping?',
                        sampleAnswer: 'For most things, I\'d go with online — it\'s hard to beat the convenience of browsing from your sofa and having things delivered to your door. But when it comes to clothes and shoes, I still prefer going into a shop. You really need to try things on to know if they\'ll work; I\'ve had too many disappointing returns from buying clothes online.',
                        w5h1: { what: 'online for most things, in-store for clothes', when: 'weekends for browsing', where: 'home for online, physical stores for clothing', who: 'usually alone', why: 'online is convenient, but clothes need trying on', how: 'learned from disappointing online clothing returns' }
                    },
                    {
                        question: 'How often do you use the internet?',
                        sampleAnswer: 'Constantly, if I\'m being honest. Between work, where I need it for research and communicating with colleagues, and my personal life, where I use it for everything from streaming to staying up to date with the news — I\'d estimate I\'m online at least six or seven hours a day. I think that\'s just the reality of modern life though.',
                        w5h1: { what: 'internet for work research, communication, streaming, news', when: 'six or seven hours daily', where: 'office and home', who: 'alone, communicating with colleagues', why: 'work demands and personal entertainment', how: 'accepts it as modern reality' }
                    },

                    // People & Relationships (5)
                    {
                        question: 'Do you spend a lot of time with your family?',
                        sampleAnswer: 'I make a real effort to, especially on weekends. We usually get together for dinner at my parents\' place, and sometimes we\'ll do something like go hiking or catch a film. With everyone\'s schedules being so hectic, it takes a bit of planning, but I think maintaining that connection is genuinely important.',
                        w5h1: { what: 'dinner and activities together', when: 'weekends', where: 'parents\' place, outdoors, cinemas', who: 'with family', why: 'maintaining connection despite busy schedules', how: 'takes planning but worth the effort' }
                    },
                    {
                        question: 'Do you have many friends?',
                        sampleAnswer: 'Not a huge number, but the ones I have are quite close. We\'ve known each other for years and tend to meet up once or twice a month for dinner or coffee. I\'ve always been someone who values depth over breadth when it comes to friendships — I\'d much rather have a handful of people I can truly count on.',
                        w5h1: { what: 'small circle of close, long-term friends', when: 'meet once or twice a month', where: 'restaurants and cafés', who: 'close friends known for years', why: 'values depth over breadth in friendships', how: 'prefers few reliable people over many acquaintances' }
                    },
                    {
                        question: 'Do you like meeting new people?',
                        sampleAnswer: 'On the whole, yes. I find it stimulating to hear about different people\'s experiences and perspectives, particularly in professional settings like conferences. It can be a bit daunting at first, especially in large groups, but once the conversation gets going, I usually enjoy it — you never know what interesting things you might learn.',
                        w5h1: { what: 'meeting people at events and conferences', when: 'through work and social gatherings', where: 'conferences, parties, professional events', who: 'colleagues and new acquaintances', why: 'stimulating to hear different perspectives', how: 'initially daunting but rewarding once engaged' }
                    },
                    {
                        question: 'Do you keep in touch with childhood friends?',
                        sampleAnswer: 'I do, actually — two of them in particular. We don\'t see each other as much as we used to since we all live in different cities now, but we chat online regularly and make a point of meeting up a few times a year. There\'s something irreplaceable about friends who\'ve known you since you were a kid.',
                        w5h1: { what: 'maintaining two close childhood friendships', when: 'chat regularly, meet a few times yearly', where: 'online and in person when schedules align', who: 'two closest childhood friends', why: 'irreplaceable bond from shared childhood', how: 'adapted to distance with online contact and reunions' }
                    },
                    {
                        question: 'Do you prefer spending time alone or with others?',
                        sampleAnswer: 'It honestly fluctuates. I\'m naturally quite sociable and love spending weekends out with friends — it really energises me. But I also need that quiet time to recharge, whether it\'s reading, going for a solo walk, or just doing nothing in particular at home. I think a healthy balance between the two is key.',
                        w5h1: { what: 'balancing social time and solitude', when: 'social on weekends, alone time during week', where: 'out with friends / quiet at home', who: 'friends for social, solo for recharging', why: 'sociable nature needs balance with recharge time', how: 'recognises healthy balance is key' }
                    },

                    // Learning & Work (5)
                    {
                        question: 'What do you find most interesting about your studies?',
                        sampleAnswer: 'I think it\'s the practical side of things that really grabs me. In my business course, we often analyse real companies and their strategies, which brings all the theory to life. It\'s far more engaging than just memorising concepts from a textbook because you can actually see how everything plays out in the real world.',
                        w5h1: { what: 'analysing real companies in business course', when: 'during class and group projects', where: 'at university', who: 'with classmates', why: 'brings theory to life, more engaging than textbooks', how: 'sees how concepts play out in real world' }
                    },
                    {
                        question: 'Do you enjoy learning new things?',
                        sampleAnswer: 'Very much so. I\'m actually teaching myself graphic design at the moment through online courses, which has been really rewarding. I think there\'s a real buzz that comes from picking up a new skill and watching yourself improve over time — it keeps your mind sharp and stops things from getting stale.',
                        w5h1: { what: 'learning graphic design through online courses', when: 'in free time currently', where: 'at home online', who: 'self-taught', why: 'rewarding to build new skills and improve', how: 'keeps mind sharp, prevents stagnation' }
                    },
                    {
                        question: 'What was your favorite subject at school?',
                        sampleAnswer: 'History, hands down. Our teacher had this wonderful storytelling approach that made events from centuries ago feel vivid and relevant. Beyond the stories though, it taught me to think about cause and effect, to question why things happened — which is a skill I still rely on in everyday life.',
                        w5h1: { what: 'history with storytelling teacher', when: 'during school years', where: 'in the classroom', who: 'with classmates and inspiring teacher', why: 'vivid storytelling made it relevant, taught critical thinking', how: 'still uses cause-and-effect thinking today' }
                    },
                    {
                        question: 'Do you think your job is interesting?',
                        sampleAnswer: 'Yes, genuinely. I work as a marketing coordinator, and every project is a completely different puzzle to solve. One week I might be working on a campaign for a tech startup, the next for a food brand. That variety is what keeps it fresh — I\'m constantly learning about new industries, and the creative side really appeals to me.',
                        w5h1: { what: 'marketing coordinator with varied projects', when: 'different projects each week', where: 'office and client sites', who: 'with clients across industries', why: 'variety keeps it fresh, constantly learning', how: 'each project is a different puzzle to solve' }
                    },
                    {
                        question: 'Would you like to change your job in the future?',
                        sampleAnswer: 'Eventually, yes. I\'m quite content where I am at the moment, but I\'d love to move into a management role down the line — leading projects, mentoring junior colleagues, that sort of thing. I think the experience I\'m building now is setting me up well for that transition.',
                        w5h1: { what: 'aspiring to management role', when: 'down the line', where: 'within career path', who: 'leading projects and mentoring juniors', why: 'natural progression, current experience is building foundation', how: 'content now but forward-looking' }
                    },

                    // Places & Travel (5)
                    {
                        question: 'Do you like traveling to new places?',
                        sampleAnswer: 'Oh, absolutely. I try to take one or two trips a year, either around my own country or to neighbouring ones. What draws me to travel is that combination of unfamiliar sights, different cuisines, and the sense that you\'re expanding your horizons. Even a short weekend trip somewhere new can completely shift your perspective.',
                        w5h1: { what: 'one or two trips yearly, domestic and international', when: 'once or twice a year', where: 'own country and neighbouring countries', who: 'with friends or family', why: 'unfamiliar sights, cuisines, expanding horizons', how: 'even short trips shift perspective' }
                    },
                    {
                        question: 'What is your hometown like?',
                        sampleAnswer: 'It\'s a medium-sized coastal city with a really laid-back atmosphere. You\'ve got the beaches on one side and a surprisingly vibrant urban centre on the other, with quite a few historical sites scattered throughout. Growing up there was a nice balance — close enough to nature to appreciate it, but with enough going on to keep things interesting.',
                        w5h1: { what: 'medium-sized coastal city, beaches and urban centre', when: 'grew up there', where: 'coastal hometown', who: 'with family', why: 'balance of nature and urban life', how: 'laid-back atmosphere with enough variety' }
                    },
                    {
                        question: 'Do you prefer the city or the countryside?',
                        sampleAnswer: 'I\'d say the city, primarily because I value having everything at my fingertips — good restaurants, career opportunities, cultural events. That said, I genuinely enjoy escaping to the countryside from time to time for a change of scenery. Ideally, I\'d love to live on the outskirts of a city — close enough to access everything, but with a bit more peace and quiet.',
                        w5h1: { what: 'city living with countryside escapes', when: 'daily city life, occasional countryside visits', where: 'city for amenities, countryside for peace', who: 'city alone, countryside with friends or family', why: 'values convenience and access, but needs nature too', how: 'ideal would be city outskirts for best of both' }
                    },
                    {
                        question: 'Have you ever been abroad?',
                        sampleAnswer: 'Yes, I\'ve been lucky enough to visit a few Southeast Asian countries — Thailand and Singapore in particular left a real impression on me. Each trip has taught me something different about how other cultures approach life, food, and social customs. It\'s one of those experiences that genuinely broadens your thinking.',
                        w5h1: { what: 'visited Southeast Asian countries', when: 'during annual vacations', where: 'Thailand, Singapore', who: 'with friends or companions', why: 'each trip teaches something about other cultures', how: 'genuinely broadens thinking and perspective' }
                    },
                    {
                        question: 'Where would you like to visit in the future?',
                        sampleAnswer: 'Japan is top of my list, ideally during cherry blossom season. I\'m fascinated by how the country manages to blend deep-rooted traditions with cutting-edge technology so seamlessly. I\'ve been doing my research on Tokyo and Kyoto, and honestly, the more I read, the more excited I get about the trip.',
                        w5h1: { what: 'visiting Japan during cherry blossom season', when: 'hoping within next couple of years', where: 'Tokyo and Kyoto', who: 'planning solo research', why: 'fascinated by tradition-technology blend', how: 'excitement grows with each bit of research' }
                    },

                    // Food & Cooking (5)
                    {
                        question: 'Do you like cooking?',
                        sampleAnswer: 'I do, actually — it\'s one of those weekend pleasures I really look forward to. I tend to gravitate towards Italian and Asian dishes because they\'re flavourful without being overly complicated. There\'s something deeply satisfying about taking raw ingredients and turning them into a proper meal from scratch.',
                        w5h1: { what: 'Italian and Asian dishes from scratch', when: 'weekends', where: 'at home', who: 'solo cooking', why: 'flavourful yet not too complicated', how: 'deeply satisfying creative process' }
                    },
                    {
                        question: 'What is your favorite food?',
                        sampleAnswer: 'Sushi, without question. I love the freshness and the sheer variety — there\'s always something new to try. I usually have it at restaurants since making authentic sushi at home is quite an art form. What fascinates me is how something so seemingly simple can have so many layers of flavour and craftsmanship.',
                        w5h1: { what: 'sushi for freshness and variety', when: 'regularly when dining out', where: 'at restaurants', who: 'with friends or solo', why: 'freshness, variety, craftsmanship', how: 'fascinated by simplicity hiding complexity' }
                    },
                    {
                        question: 'Do you often eat out?',
                        sampleAnswer: 'Probably two or three times a week, mostly on weekends or when work runs late and I can\'t be bothered to cook. I usually stick to casual places near home or the office with friends or colleagues. It\'s a nice way to mix things up and try cuisines I\'d never attempt in my own kitchen.',
                        w5h1: { what: 'eating out at casual places', when: 'two or three times weekly', where: 'near home or office', who: 'with friends or colleagues', why: 'convenience and variety beyond own cooking', how: 'a way to mix things up' }
                    },
                    {
                        question: 'Do you like trying new foods?',
                        sampleAnswer: 'Definitely — I\'d call myself a fairly adventurous eater. Whenever I\'m somewhere new, whether it\'s a different country or just an unfamiliar restaurant, I make a point of ordering something I\'ve never had before. It\'s broadened my palate enormously, and some of my best food memories have come from taking a chance on a dish I couldn\'t even pronounce.',
                        w5h1: { what: 'trying unfamiliar dishes wherever possible', when: 'when traveling or at new restaurants', where: 'different countries and restaurants', who: 'alone or with friends', why: 'broadens palate, creates memorable experiences', how: 'takes chances on unknown dishes' }
                    },
                    {
                        question: 'Can you cook traditional food from your country?',
                        sampleAnswer: 'Yes, I picked up quite a few traditional recipes from my mother growing up. I usually make them for special occasions or when I\'m feeling a bit homesick. It\'s a nice way to stay connected to my roots, and friends always seem to appreciate it when I cook something from my culture — it becomes a conversation piece as much as a meal.',
                        w5h1: { what: 'traditional recipes learned from mother', when: 'special occasions or when homesick', where: 'at home', who: 'learned from mother, shared with friends', why: 'connection to cultural roots', how: 'becomes a conversation piece when shared' }
                    },

                    // Weather & Seasons (5)
                    {
                        question: 'What is the weather like in your hometown?',
                        sampleAnswer: 'It\'s tropical — hot and humid pretty much year-round, with temperatures hovering around thirty degrees. We get a rainy season from roughly June to October and a dry season the rest of the year. You get used to it eventually, but I won\'t pretend the humidity doesn\'t get to me during the peak of the dry months.',
                        w5h1: { what: 'tropical climate, thirty degrees year-round', when: 'rainy June-October, dry November-May', where: 'hometown', who: 'grew up there', why: 'geographic location', how: 'adapted but humidity still challenging at peak' }
                    },
                    {
                        question: 'Do you prefer hot or cold weather?',
                        sampleAnswer: 'Cooler weather, definitely. I find the heat quite draining, whereas a crisp autumn day — around twenty to twenty-five degrees — gives me so much more energy. It\'s the ideal temperature for being outdoors, whether that\'s going for a walk or just sitting in a park with a book.',
                        w5h1: { what: 'prefers cooler weather around 20-25°C', when: 'especially autumn', where: 'outdoors, parks', who: 'personal preference', why: 'heat is draining, cool weather energises', how: 'ideal for outdoor activities and relaxation' },
                        alternativeSamples: [
                            {
                                technique: 'Contrast',
                                text: 'It\'s funny, because most people seem to love summer, but I\'m the opposite — give me a cool, breezy day over a scorching one any time. The heat just saps my energy, whereas cooler weather has this revitalising effect that makes me want to get out and do things. Everyone has their sweet spot, I suppose.',
                                breakdown: { type: 'self vs others + temperature', sideA: 'others love hot weather for activities', sideB: 'I prefer cool weather, feels energizing vs lethargic', marker: 'whereas, while' }
                            }
                        ]
                    },
                    {
                        question: 'What is your favorite season?',
                        sampleAnswer: 'Autumn, without a doubt. The weather is pleasant, the leaves turn these incredible shades of gold and red, and there\'s a kind of cosiness in the air that I really enjoy. After months of summer heat, it feels like a welcome reset — perfect for long walks or spending the afternoon in a café.',
                        w5h1: { what: 'autumn for foliage, pleasant weather, cosiness', when: 'autumn months', where: 'parks, cafés, outdoors', who: 'alone or with friends', why: 'welcome reset after summer heat', how: 'perfect for walks and café afternoons' }
                    },
                    {
                        question: 'Does the weather affect your mood?',
                        sampleAnswer: 'More than I\'d like to admit, actually. On a sunny day, I feel noticeably more energetic and motivated — I want to be out doing things. But when it\'s grey and drizzly, I tend to slow down and feel a bit more introspective. I think most people experience that to some degree, even if they don\'t always realise it.',
                        w5h1: { what: 'weather noticeably affects mood', when: 'daily depending on conditions', where: 'anywhere', who: 'personal experience', why: 'sun energises, grey weather slows down', how: 'recognises it as common human experience' }
                    },
                    {
                        question: 'Do you check the weather forecast regularly?',
                        sampleAnswer: 'Almost every morning, actually — it\'s one of the first things I do when I pick up my phone. It\'s mainly a practical thing: deciding what to wear, whether to grab an umbrella. But it\'s also helpful for planning weekend activities, especially if I\'m trying to organise something outdoors with friends.',
                        w5h1: { what: 'checking forecast on phone each morning', when: 'every morning', where: 'at home on phone', who: 'alone, but useful for group planning', why: 'practical clothing decisions and weekend planning', how: 'became part of morning routine' }
                    },

                    // Shopping & Fashion (5)
                    {
                        question: 'Do you enjoy shopping for clothes?',
                        sampleAnswer: 'It\'s a bit of a mixed bag for me, honestly. When I stumble across something that fits perfectly, it\'s great — but the process of browsing through racks for hours can feel quite tedious. I tend to do it just a few times a year when the seasons change, and I stick to shops where I already know the styles suit me.',
                        w5h1: { what: 'clothes shopping a few times yearly', when: 'when seasons change', where: 'familiar shops and malls', who: 'alone', why: 'need seasonal updates, sticks to known stores', how: 'great when successful, tedious when browsing' }
                    },
                    {
                        question: 'What kind of clothes do you usually wear?',
                        sampleAnswer: 'On weekdays it\'s business casual for the office, and on weekends I go for jeans and a comfortable t-shirt. I\'ve always leaned towards simple, classic pieces in neutral colours — they\'re versatile and you can throw together an outfit without overthinking it. Comfort comes first for me; I\'d rather look understated than uncomfortable.',
                        w5h1: { what: 'business casual for work, jeans and tees on weekends', when: 'daily, occasion-dependent', where: 'office and casual settings', who: 'personal style choice', why: 'versatile, easy to combine, comfort first', how: 'prefers understated over uncomfortable' }
                    },
                    {
                        question: 'Do you follow fashion trends?',
                        sampleAnswer: 'Not particularly, no. I keep a vague eye on what\'s current through social media, but I don\'t feel any urge to chase every new trend. I\'d rather invest in a personal style that actually reflects who I am than constantly reinvent my wardrobe. It\'s also far more sustainable and much easier on the wallet.',
                        w5h1: { what: 'personal style over trend-chasing', when: 'ongoing approach', where: 'aware via social media', who: 'independent choice', why: 'authentic, sustainable, cost-effective', how: 'no urge to follow, invests in own style' }
                    },
                    {
                        question: 'Where do you usually buy things?',
                        sampleAnswer: 'Online, for the most part. I find it hard to justify spending a whole afternoon in a shop when I can compare prices and read reviews from my sofa. The exception would be bigger purchases like electronics or furniture, where I prefer to see the product in person before committing. And for groceries, I still pop into the local supermarket regularly.',
                        w5h1: { what: 'mostly online, in-store for big items and groceries', when: 'online anytime, supermarket regularly', where: 'home for online, stores for specific items', who: 'alone', why: 'convenience of comparing from home, but needs to see big items', how: 'efficient approach with sensible exceptions' }
                    },
                    {
                        question: 'Do you prefer shopping alone or with friends?',
                        sampleAnswer: 'For everyday shopping, I prefer going alone because I can browse at my own pace without worrying about holding anyone up. But if I\'m buying something special — a gift or a big purchase — I quite like having a friend along for a second opinion. It adds a social element and you tend to make better decisions with some input.',
                        w5h1: { what: 'alone for everyday, friends for special purchases', when: 'routine vs special occasions', where: 'various stores and malls', who: 'alone usually, friends for big decisions', why: 'own pace alone, second opinions with friends', how: 'better decisions with input on important purchases' }
                    },

                    // Home & Living (5)
                    {
                        question: 'Do you live in a house or an apartment?',
                        sampleAnswer: 'I\'m in a two-bedroom apartment in the city centre at the moment. It\'s on the fifth floor, so the view is quite nice, and everything I need is within walking distance. Apartment living suits my current lifestyle well — there\'s practically no maintenance to worry about, which is a huge plus when you\'re working long hours.',
                        w5h1: { what: 'living in a two-bedroom apartment', when: 'currently, ongoing', where: 'in the city center on the fifth floor', who: 'by myself', why: 'convenient for work, within walking distance of amenities, managed maintenance', how: 'feel comfortable and hassle-free' }
                    },
                    {
                        question: 'What is your favorite room in your home?',
                        sampleAnswer: 'My bedroom, hands down. I\'ve done it up in a minimalist style with soft, calming colours, and it\'s really become my sanctuary. That\'s where I do all my reading and just generally decompress after a long day — it feels like stepping into a completely different headspace.',
                        w5h1: { what: 'spending time in my bedroom', when: 'after work, evenings, personal time', where: 'in my bedroom at home', who: 'by myself', why: 'need privacy, relaxation, and space for personal activities', how: 'feel peaceful and content' }
                    },
                    {
                        question: 'Do you like decorating your room?',
                        sampleAnswer: 'I do, though I tend to make small changes rather than big overhauls — adding a new plant here, swapping a print there. I find it\'s a nice creative outlet, and having a space that feels truly personal really does make a difference to how you feel day to day.',
                        w5h1: { what: 'decorating with plants, artwork, and cushions', when: 'occasionally to refresh the space', where: 'in my room at home', who: 'by myself', why: 'keep space fresh and reflect personal tastes', how: 'feel creative and satisfied' }
                    },
                    {
                        question: 'Would you like to move to a different place?',
                        sampleAnswer: 'At some point, yes. I\'m quite happy where I am for now, but I\'d love somewhere with a bit more space and better natural light, maybe in a quieter part of town. I\'m giving it another year or two to save up, but it\'s definitely something I\'m working towards.',
                        w5h1: { what: 'moving to a larger place with more natural light', when: 'in another year or two', where: 'in a quieter neighborhood', who: 'by myself', why: 'want more space and light, better for long-term needs', how: 'feel hopeful and forward-thinking' }
                    },
                    {
                        question: 'Do you prefer living with family or alone?',
                        sampleAnswer: 'Right now, living alone works well for me. I value the independence — being able to set my own schedule and have things exactly the way I like them. That said, I do miss the everyday companionship of living with family, which is why I make sure to visit them most weekends. It\'s a good balance.',
                        w5h1: { what: 'living alone but visiting family', when: 'living alone daily, visiting family on weekends', where: 'in my apartment, visiting family\'s place', who: 'by myself at home, with family on visits', why: 'value independence but also want family connection', how: 'feel independent yet connected' }
                    },

                    // Arts & Entertainment (5)
                    {
                        question: 'Do you enjoy going to museums?',
                        sampleAnswer: 'Yes, particularly art and history museums. I find them a wonderfully immersive way to learn about different cultures and time periods, especially when I\'m visiting a new city. There\'s something about seeing artefacts and artworks in person that no book or documentary can quite replicate.',
                        w5h1: { what: 'visiting art and history museums', when: 'on weekends or during vacations', where: 'at museums in new cities', who: 'with friends or by myself', why: 'learn about cultures and time periods, appreciate creativity', how: 'feel enriched, curious, and inspired' }
                    },
                    {
                        question: 'Have you ever been to a concert?',
                        sampleAnswer: 'Several times, actually — mostly rock and pop shows. There\'s an energy at live concerts that you simply can\'t get from a recording; the crowd, the sound, the atmosphere — it all comes together in a way that\'s genuinely thrilling. I usually go with friends whenever an artist we like comes to town.',
                        w5h1: { what: 'attending rock and pop concerts', when: 'over the years when favorite artists visit', where: 'at various concert venues in my city', who: 'with friends', why: 'experience live music and atmosphere', how: 'feel exhilarated and connected to the music' }
                    },
                    {
                        question: 'Do you like taking photographs?',
                        sampleAnswer: 'I really do, especially landscape and street photography. I tend to take my camera along whenever I\'m travelling or just out on a weekend walk. What photography\'s taught me is to slow down and really observe my surroundings — I notice textures, light, and compositions that I\'d completely miss otherwise.',
                        w5h1: { what: 'taking landscape and street photographs', when: 'when traveling or during weekend walks', where: 'at new places and around the city', who: 'by myself', why: 'preserve memories, notice details, share experiences', how: 'feel creative and observant' }
                    },
                    {
                        question: 'Do you enjoy drawing or painting?',
                        sampleAnswer: 'I dabble in it, though I wouldn\'t call myself particularly talented. I occasionally do simple watercolours or sketches on weekends when I\'m in the mood. What I enjoy about it is the process rather than the result — it\'s almost meditative, a nice way to switch off from screens and just focus on something tactile.',
                        w5h1: { what: 'doing watercolor paintings and sketches', when: 'free time on weekends', where: 'at home', who: 'by myself', why: 'express creativity without pressure', how: 'feel calm, centered, and therapeutic' }
                    },
                    {
                        question: 'What kind of art do you appreciate?',
                        sampleAnswer: 'I\'m particularly drawn to contemporary art and impressionist work — anything with bold use of colour and strong emotional undertones. I visit galleries a few times a year, and what I love is that everyone interprets the same piece differently. Art doesn\'t need words to communicate something powerful, and that really appeals to me.',
                        w5h1: { what: 'appreciating contemporary art and impressionist paintings', when: 'a few times a year', where: 'at art galleries', who: 'by myself or with friends', why: 'love use of color, emotional expression, and personal interpretation', how: 'feel thoughtful and emotionally engaged' }
                    },

                    // Nature & Environment (5)
                    {
                        question: 'Do you like spending time in nature?',
                        sampleAnswer: 'Very much so. I try to get outdoors at least once a week, whether it\'s a hike through the forest or a walk along the coast. It\'s probably the most effective stress reliever I know — something about fresh air and open space just clears the mind in a way nothing else quite does.',
                        w5h1: { what: 'hiking in forests and walking on beaches', when: 'at least once a week, usually weekends', where: 'in forests and along beaches', who: 'by myself or with friends', why: 'clear mind, reduce stress, essential for mental health', how: 'feel refreshed and peaceful' }
                    },
                    {
                        question: 'Do you have any plants at home?',
                        sampleAnswer: 'Quite a few, actually — mostly succulents and a couple of small indoor trees. I keep them on the balcony and near the windows where they get decent sunlight. They brighten up the flat and there\'s something oddly therapeutic about looking after them, even if it\'s just watering them and watching them grow.',
                        w5h1: { what: 'taking care of succulents and small trees', when: 'regularly for plant maintenance', where: 'on balcony and near windows at home', who: 'by myself', why: 'relaxing, purify air, add natural touch to space', how: 'feel calm and connected to nature' }
                    },
                    {
                        question: 'Are you concerned about the environment?',
                        sampleAnswer: 'Very much so. I try to do my bit — recycling, cutting down on single-use plastics, opting for public transport when I can. I\'m under no illusion that individual actions alone will solve things, but I do believe that if enough people make small changes, it adds up to something meaningful.',
                        w5h1: { what: 'reducing waste, recycling, using public transportation', when: 'regularly in daily life', where: 'at home, work, and around the city', who: 'by myself and encouraging others', why: 'protect environment and address climate change and pollution', how: 'feel responsible and hopeful' }
                    },
                    {
                        question: 'Do you prefer mountains or beaches?',
                        sampleAnswer: 'Mountains, I\'d say. I love the hiking, the cooler climate, and that sense of quiet you get at altitude. Beaches are lovely for a day of relaxation, but mountains offer more in terms of adventure and exploration. There\'s nothing quite like reaching a summit and taking in the view — it\'s incredibly rewarding.',
                        w5h1: { what: 'hiking in mountains', when: 'regularly for outdoor activities', where: 'in mountain areas', who: 'by myself or with friends', why: 'enjoy cooler climate, quiet atmosphere, adventure opportunities', how: 'feel energized and adventurous' }
                    },
                    {
                        question: 'Do you think it\'s important to protect wildlife?',
                        sampleAnswer: 'Absolutely, and I think it\'s quite urgent, frankly. So many species are threatened by habitat loss and pollution, and when you lose one species, it has knock-on effects across entire ecosystems. I believe both governments and individuals need to take conservation more seriously if we want to leave anything worth inheriting for future generations.',
                        w5h1: { what: 'supporting wildlife protection and conservation efforts', when: 'ongoing concern and action needed', where: 'everywhere on Earth, various natural habitats', who: 'governments and individuals including myself', why: 'maintain ecological balance, prevent extinction, protect for future', how: 'feel concerned yet motivated to make a difference' }
                    },

                    // Transportation (5)
                    {
                        question: 'How do you usually travel to work or school?',
                        sampleAnswer: 'I take the subway, which is the quickest and most reliable option in my city. The commute\'s about thirty minutes, which I\'ve actually come to appreciate — it gives me a window to read or catch up on the news before the day starts. Plus, it\'s far less stressful than sitting in traffic.',
                        w5h1: { what: 'taking the subway', when: 'daily commute, about 30 minutes', where: 'from home to office in the city', who: 'by myself', why: 'most efficient, reliable, less stressful, environmentally friendly', how: 'feel productive and environmentally conscious' }
                    },
                    {
                        question: 'Do you prefer public transportation or driving?',
                        sampleAnswer: 'For daily commuting, public transport wins easily — no parking hassles, no sitting in gridlock. But I do enjoy driving when I\'m heading somewhere more remote or taking a trip outside the city where buses and trains don\'t really reach. Each has its place, I think.',
                        w5h1: { what: 'using public transportation daily, driving for special trips', when: 'public transport daily, driving occasionally', where: 'public transport in city, driving outside city', who: 'by myself', why: 'public transport convenient in city, driving offers flexibility elsewhere', how: 'feel adaptable and practical' }
                    },
                    {
                        question: 'Have you ever traveled by train?',
                        sampleAnswer: 'Many times, and I\'m a big fan. There\'s something about train travel that feels more civilised than other options — you can stretch out, enjoy the scenery, even get some work done. I find it strikes a nice balance between speed and comfort, especially for journeys between cities.',
                        w5h1: { what: 'traveling by train for commutes and longer journeys', when: 'many times for various trips', where: 'between cities and for commutes', who: 'by myself or with companions', why: 'scenic views, more comfortable, can work or relax', how: 'feel relaxed and efficient' }
                    },
                    {
                        question: 'Do you enjoy long journeys?',
                        sampleAnswer: 'It depends on the circumstances. A long train ride or flight to somewhere exciting doesn\'t bother me at all — I bring a book or download a few films and the time flies. But a long car journey can get quite tedious, especially if you\'re stuck on a motorway with nothing to look at. So the destination and the comfort level make all the difference.',
                        w5h1: { what: 'taking long journeys by train, plane, or car', when: 'when traveling to exciting destinations', where: 'various locations for travel', who: 'by myself or with travel companions', why: 'anticipation makes it worthwhile, though cars can be tiring', how: 'feel entertained and less restless with books/movies' }
                    },
                    {
                        question: 'Would you like to learn to drive?',
                        sampleAnswer: 'Yes, it\'s something I\'m planning for the near future. Not having a licence doesn\'t cause too many problems in the city, but it would open up a lot more options for weekend getaways and exploring places that public transport can\'t reach. I\'m hoping to start lessons once my schedule eases up a bit.',
                        w5h1: { what: 'learning to drive', when: 'next year when schedule is less busy', where: 'at a driving school, for trips outside the city', who: 'by myself taking lessons', why: 'gain independence, flexibility, access to more places', how: 'feel excited and forward-looking' }
                    },

                    // Health & Lifestyle (5)
                    {
                        question: 'Do you think you have a healthy lifestyle?',
                        sampleAnswer: 'For the most part, yes — I exercise regularly and try to eat well. But if I\'m honest, my sleep pattern could do with some work; I tend to stay up later than I should. I think maintaining a healthy lifestyle is one of those things you have to keep actively working at rather than assuming it\'ll just happen on its own.',
                        w5h1: { what: 'maintaining healthy lifestyle with exercise and balanced diet', when: 'regularly, ongoing process', where: 'at the gym or at home', who: 'by myself', why: 'want good health, though needs improvement in sleep', how: 'feel mindful and committed to self-improvement' }
                    },
                    {
                        question: 'How much sleep do you usually get?',
                        sampleAnswer: 'About six or seven hours on weeknights, which I know isn\'t quite enough. I usually compensate a bit on weekends by sleeping in until eight or nine. I\'ve noticed a real difference in my concentration and mood when I\'m well-rested versus when I\'m running on too little sleep, so it\'s something I\'m actively trying to improve.',
                        w5h1: { what: 'sleeping 6-7 hours weeknights, 8-9 hours weekends', when: 'nightly, with more on weekends', where: 'at home in my bedroom', who: 'by myself', why: 'affects mood and productivity, trying to improve schedule', how: 'feel more aware of health needs' }
                    },
                    {
                        question: 'Do you take any vitamins or supplements?',
                        sampleAnswer: 'Just a daily multivitamin and some vitamin D, especially in winter when the sunlight is scarce. I started taking them a few years ago on my doctor\'s recommendation, mainly to cover any nutritional gaps. I can\'t say I\'ve noticed a dramatic difference, but I figure it can\'t hurt.',
                        w5h1: { what: 'taking daily multivitamin and vitamin D supplements', when: 'daily, especially during winter, started a few years ago', where: 'at home, prescribed at clinic', who: 'by myself, after consulting with doctor', why: 'fill nutritional gaps and maintain health', how: 'feel proactive about health' }
                    },
                    {
                        question: 'Do you prefer to relax at home or go out?',
                        sampleAnswer: 'It really depends on my energy levels. After an exhausting week, there\'s nothing better than staying in with a good book or a film. But if I\'ve got some energy to spare, I\'d much rather head out to a café or a park, or meet up with friends. I need a bit of both to feel properly rested.',
                        w5h1: { what: 'relaxing at home or going out to cafés and parks', when: 'at home after work week, going out on weekends', where: 'at home or at cafés, parks, and meeting places', who: 'by myself at home, with friends when going out', why: 'need relaxation after work, enjoy socializing when energetic', how: 'feel balanced and flexible' }
                    },
                    {
                        question: 'What do you do when you feel stressed?',
                        sampleAnswer: 'My go-to is physical activity — a run in the park or a yoga session at home usually does the trick. There\'s something about working up a sweat that just clears the mental fog. If it\'s more of an emotional kind of stress, talking things through with a close friend over coffee tends to help me get some perspective.',
                        w5h1: { what: 'running, doing yoga, talking to friends, or listening to music', when: 'when feeling stressed', where: 'at the park for running, at home for yoga, cafés for friends', who: 'by myself for exercise and music, with close friends for talking', why: 'clear mind, manage stress, regain perspective', how: 'feel relieved and centered' }
                    },

                    // Celebrations & Festivals (5)
                    {
                        question: 'What is your favorite festival or celebration?',
                        sampleAnswer: 'It has to be the Lunar New Year. The whole family gathers at my parents\' place for a big reunion dinner, we exchange red envelopes, and then visit relatives over the following days. It\'s the one time of year when everyone\'s schedules align, and there\'s a warmth and festivity in the air that I genuinely look forward to.',
                        w5h1: { what: 'celebrating Lunar New Year with family', when: 'annually during Lunar New Year', where: 'at parents\' home and relatives\' houses', who: 'with whole family and relatives', why: 'gather together, enjoy festive atmosphere and traditions', how: 'feel joyful and connected to cultural roots' }
                    },
                    {
                        question: 'How do you usually celebrate your birthday?',
                        sampleAnswer: 'I keep it fairly low-key — usually a dinner at a nice restaurant with close friends and family. I\'ve never been much of a big-party person; I\'d rather have meaningful conversations with people I really care about than try to host something elaborate. A good meal and good company is really all I need.',
                        w5h1: { what: 'celebrating birthday with small dinner gathering', when: 'on my birthday annually', where: 'at a nice restaurant or at home', who: 'with close friends and family', why: 'prefer intimate celebrations for meaningful connections', how: 'feel loved and appreciated' }
                    },
                    {
                        question: 'Do you enjoy public holidays?',
                        sampleAnswer: 'Definitely. Beyond the obvious appeal of a day off, they give me a chance to step back and recharge properly. I might use the time to travel somewhere, work on personal projects, or simply catch up on rest. I think those breaks are essential for maintaining some kind of work-life balance.',
                        w5h1: { what: 'enjoying public holidays for travel, family time, or personal projects', when: 'during public holidays throughout the year', where: 'at different travel destinations, home, or relatives\' places', who: 'by myself or with family', why: 'get break from work, maintain work-life balance', how: 'feel refreshed and grateful' }
                    },
                    {
                        question: 'Do you give gifts to friends and family?',
                        sampleAnswer: 'Yes, for birthdays, holidays, and major milestones. I put quite a bit of thought into choosing something that reflects the person\'s interests rather than just spending a lot. I think a thoughtful gift, even a modest one, says much more than something expensive and generic.',
                        w5h1: { what: 'giving thoughtful gifts', when: 'during birthdays, holidays, and important milestones', where: 'shopping at stores or online', who: 'by myself, giving to friends and family', why: 'show appreciation and strengthen relationships', how: 'feel thoughtful and generous' }
                    },
                    {
                        question: 'What traditional celebrations does your country have?',
                        sampleAnswer: 'There are quite a few, but the biggest ones are Independence Day, with its parades and fireworks, and various harvest festivals and religious holidays that have been observed for generations. These celebrations are really important for keeping cultural traditions alive and bringing communities together — they\'re often the highlight of the year for many people.',
                        w5h1: { what: 'celebrating Independence Day, harvest festivals, and religious holidays', when: 'throughout the year on specific dates', where: 'in cities across the country', who: 'with communities and fellow citizens', why: 'preserve cultural heritage and bring communities together', how: 'feel proud and culturally connected' }
                    },

                    // Pets & Animals (5)
                    {
                        question: 'Do you have any pets?',
                        sampleAnswer: 'Not at the moment, unfortunately — my apartment doesn\'t allow them, and my work schedule is pretty demanding. But I grew up with a dog, so I know firsthand how much joy a pet can bring. I\'m definitely planning to get one once my living situation is more suited to it.',
                        w5h1: { what: 'not having pets currently', when: 'currently, hoping for future', where: 'at my apartment, grew up with dog at family home', who: 'by myself now, had dog with family before', why: 'apartment restrictions and demanding work schedule', how: 'feel hopeful for future, would feel fulfilled with pet' }
                    },
                    {
                        question: 'Do you like animals?',
                        sampleAnswer: 'Very much so, especially dogs and cats. Whenever I visit friends who have pets, I end up spending half the time playing with them. There\'s something about animals that\'s incredibly calming — they have this ability to live completely in the moment, which I think we could all learn from.',
                        w5h1: { what: 'loving and observing animals, especially dogs and cats', when: 'whenever visiting friends', where: 'at friends\' homes', who: 'by myself or with pet owners', why: 'animals bring joy and teach valuable lessons', how: 'feel happy and peaceful' }
                    },
                    {
                        question: 'What is your favorite animal?',
                        sampleAnswer: 'Elephants, I\'d say. I find their intelligence and strong family bonds fascinating — the way they communicate and look after one another is really quite remarkable. They\'re also symbols of wisdom in many cultures, which adds another dimension to my appreciation of them.',
                        w5h1: { what: 'appreciating elephants', when: 'ongoing fascination', where: 'in the wild or at wildlife sanctuaries', who: 'observing them by myself or learning about them', why: 'their intelligence, family bonds, gentle nature, cultural significance', how: 'feel inspired and connected to nature' }
                    },
                    {
                        question: 'Did you have pets when you were a child?',
                        sampleAnswer: 'Yes — a golden retriever called Max, who was part of our family for about twelve years. He was the highlight of my childhood, honestly. My siblings and I would race home from school to play with him in the garden. Those are some of my fondest memories, and looking after him taught me a lot about responsibility and empathy.',
                        w5h1: { what: 'having a golden retriever named Max', when: 'during childhood for 12 years, every day after school', where: 'at my family home in the backyard', who: 'with my family and siblings', why: 'family pet that taught responsibility and empathy', how: 'feel nostalgic and warm' }
                    },
                    {
                        question: 'Would you like to have a pet in the future?',
                        sampleAnswer: 'Absolutely — a dog, ideally a rescue. I love the idea of giving an animal a second chance at a good home. Beyond that, having a dog would get me outdoors more often and provide some wonderful companionship. I just need to wait until my schedule and living space can properly support it.',
                        w5h1: { what: 'having a dog, adopting a rescue dog', when: 'in the future when have more space and time', where: 'at home and at parks for activities', who: 'by myself caring for the dog', why: 'encourages activity, provides companionship, give animal second chance', how: 'feel compassionate and purposeful' }
                    },

                    // Language & Communication (5)
                    {
                        question: 'What languages can you speak?',
                        sampleAnswer: 'I\'m fluent in Vietnamese, which is my native language, and English, which I use quite a lot for work. I\'ve also been dabbling in Spanish through an app — it\'s slow going, but I find having even basic knowledge of another language really enriches your travel experiences.',
                        w5h1: { what: 'speaking English, Vietnamese, learning Spanish', when: 'use daily, learning Spanish in free time', where: 'various contexts, learning at home', who: 'by myself', why: 'useful for travel, career, understanding different cultures', how: 'feel accomplished and globally connected' }
                    },
                    {
                        question: 'Do you think learning languages is important?',
                        sampleAnswer: 'Hugely important, yes. Beyond the obvious practical benefits for work and travel, learning a language gives you insight into a completely different way of thinking. It opens doors to understanding cultures at a much deeper level, and in an increasingly connected world, that\'s incredibly valuable.',
                        w5h1: { what: 'learning languages for practical and cognitive benefits', when: 'ongoing process throughout life', where: 'in various contexts globally', who: 'by myself and communicating with others', why: 'career opportunities, travel, understanding cultures, cognitive benefits', how: 'feel empowered and culturally aware' }
                    },
                    {
                        question: 'How are you learning English?',
                        sampleAnswer: 'Through a mix of things, really. I take formal classes twice a week, but I\'d say I learn just as much from watching English films and series with subtitles, reading articles, and chatting with native speakers online. I think that variety of exposure is what makes the difference — you pick up different things from each source.',
                        w5h1: { what: 'taking classes, watching movies, practicing conversation, reading', when: 'classes twice a week, other activities regularly', where: 'at language school, at home, online', who: 'by myself, with teachers and native speakers', why: 'improve language skills through varied exposure', how: 'feel motivated and progressively more confident' }
                    },
                    {
                        question: 'Do you enjoy writing?',
                        sampleAnswer: 'I do, particularly journaling. I tend to jot things down in the evenings — reflections on the day, ideas that have been floating around in my head. It\'s a surprisingly effective way to organise your thoughts and process things. There\'s also a creative satisfaction to finding exactly the right words to express an idea.',
                        w5h1: { what: 'journaling and creative writing', when: 'in the evenings during free time', where: 'at home', who: 'by myself', why: 'organize thoughts, express myself clearly, therapeutic', how: 'feel centered and creative' }
                    },
                    {
                        question: 'Do you prefer texting or calling?',
                        sampleAnswer: 'For quick, practical things — confirming plans, sharing links — texting is perfect. But for anything more substantial, I much prefer a phone call. Tone and nuance get lost so easily in text, and a five-minute conversation often achieves what twenty messages couldn\'t. So I\'d say it depends entirely on the context.',
                        w5h1: { what: 'texting for quick communication, calling for important discussions', when: 'texting anytime, calling for important conversations', where: 'at home or on the go', who: 'by myself communicating with friends, family, others', why: 'texting is convenient, calling is personal and clearer', how: 'feel flexible and communicative' }
                    },

                    // Memory & Childhood (5)
                    {
                        question: 'What is your earliest childhood memory?',
                        sampleAnswer: 'I think it\'s playing in my grandparents\' garden when I was about four — chasing butterflies and picking flowers with my grandmother on a summer afternoon. It\'s a really vivid, warm memory, probably because it captures that completely carefree feeling of early childhood that you never quite get back.',
                        w5h1: { what: 'playing in garden, chasing butterflies, picking flowers', when: 'when I was about four years old, during summer vacation', where: 'in my grandparents\' garden', who: 'with my grandmother', why: 'enjoying summer vacation and bonding with grandmother', how: 'feel nostalgic and grateful' }
                    },
                    {
                        question: 'Do you have a good memory?',
                        sampleAnswer: 'It\'s selective, I\'d say. I\'m quite good with faces and experiences — I can recall the atmosphere of places I visited years ago. But names and specific dates tend to slip through the cracks, which is why I lean on reminder apps and notes to compensate. I think my memory works best when there\'s an emotional connection to what I\'m trying to remember.',
                        w5h1: { what: 'remembering faces and experiences, using reminder apps and notes', when: 'ongoing, daily memory management', where: 'at home or work', who: 'by myself', why: 'stay organized, compensate for detail memory weakness', how: 'feel capable and aware of limitations' }
                    },
                    {
                        question: 'What did you enjoy doing as a child?',
                        sampleAnswer: 'I was an outdoors kid — always playing hide-and-seek, riding my bike around the neighbourhood with friends until it got dark. Those long afternoons of unstructured play were brilliant for learning things like teamwork and creative problem-solving, even though at the time we just thought we were having fun.',
                        w5h1: { what: 'playing hide-and-seek and riding bicycle', when: 'as a child, hours until dark', where: 'around the neighborhood outdoors', who: 'with friends', why: 'enjoy outdoor activities, learn teamwork and creativity', how: 'feel nostalgic and happy' }
                    },
                    {
                        question: 'Are you still in contact with childhood friends?',
                        sampleAnswer: 'Two of my closest ones, yes. We\'re in different cities now so we don\'t meet as often as we\'d like, but we keep in touch online and get together a few times a year. There\'s a kind of shorthand with childhood friends that you don\'t have with anyone else — they knew you before you became the person you are now, which makes the bond quite unique.',
                        w5h1: { what: 'staying in touch with childhood friends', when: 'regularly online, meet up occasionally', where: 'online and at cafés or restaurants when meeting', who: 'with two closest friends from primary school', why: 'share long history and mutual understanding', how: 'feel connected and valued' }
                    },
                    {
                        question: 'What games did you play when you were young?',
                        sampleAnswer: 'The classics — hopscotch, tag, jump rope, and on rainy days we\'d switch to board games like Monopoly at someone\'s house. They were simple games, but looking back, they taught us a surprising amount about cooperation, fair play, and how to be a gracious loser — skills that are just as relevant now.',
                        w5h1: { what: 'playing hopscotch, tag, jump rope, and Monopoly', when: 'when young, outdoor games regularly, board games on rainy days', where: 'outdoors in neighborhood, at home or friends\' houses', who: 'with kids in neighborhood', why: 'have fun and learn social skills', how: 'feel nostalgic and appreciative' }
                    },

                    // Colors & Preferences (5)
                    {
                        question: 'What is your favorite color?',
                        sampleAnswer: 'Blue — particularly deeper shades like navy, though I also love sky blue. I think I\'m drawn to it because it reminds me of the ocean and open skies, which I associate with a sense of calm and freedom. It\'s also incredibly versatile in terms of clothing and décor, which is a practical bonus.',
                        w5h1: { what: 'liking blue color, especially navy and sky blue', when: 'ongoing preference', where: 'in clothing and interior design at home and stores', who: 'my personal preference', why: 'calming, versatile, reminds of ocean and sky, tranquility', how: 'feel peaceful and serene' }
                    },
                    {
                        question: 'Do different colors affect your mood?',
                        sampleAnswer: 'I believe so, yes. Bright, warm tones like yellow and orange tend to lift my spirits, whereas blues and greens have more of a calming effect. I\'ve actually become quite conscious of this — I choose colours for my clothes and home with that in mind, almost like setting the mood for the day.',
                        w5h1: { what: 'experiencing mood effects from different colors', when: 'throughout daily life', where: 'at home, while going out, in various environments', who: 'by myself experiencing and choosing colors', why: 'colors influence energy and calmness', how: 'feel in control of environment and moods' }
                    },
                    {
                        question: 'What color would you paint your room?',
                        sampleAnswer: 'Probably a soft sage green or a warm light grey. I find those tones incredibly soothing, which is exactly what you want in a space designed for rest and relaxation. I tend to steer away from anything too bold for bedrooms — it needs to be something you won\'t tire of quickly.',
                        w5h1: { what: 'painting room soft sage green or light grey', when: 'future plan or hypothetical', where: 'in my room at home', who: 'by myself doing the painting', why: 'create soothing, peaceful atmosphere for relaxation', how: 'feel calm and comfortable' }
                    },
                    {
                        question: 'Do you wear bright or dark colors?',
                        sampleAnswer: 'Mostly dark and neutral — black, navy, grey. They\'re easy to mix and match, work for both office and casual settings, and there\'s a certain understated elegance to them. That said, I\'ll occasionally throw in a pop of colour with accessories or during the summer months when the mood strikes.',
                        w5h1: { what: 'wearing dark or neutral colors like black, navy, grey', when: 'usually, with occasional color pops in summer', where: 'at work and in casual settings', who: 'by myself choosing clothing', why: 'practical, versatile, easy to match, suits personal style', how: 'feel confident and put-together' }
                    },
                    {
                        question: 'Has your favorite color changed over time?',
                        sampleAnswer: 'It has, actually. As a child I was mad about red — the bolder the better. But as I\'ve gotten older, I\'ve gravitated towards blues and greens, which I find much more calming. I think your colour preferences say a lot about where you are in life; mine have definitely mellowed as I\'ve matured.',
                        w5h1: { what: 'changing favorite color from red to blue and green', when: 'from childhood to now', where: 'in toys and clothes as child, in home and wardrobe now', who: 'by myself experiencing preference evolution', why: 'personality maturity and changing emotional needs', how: 'feel mature and self-aware' }
                    },

                    // Time Management (5)
                    {
                        question: 'Are you good at managing your time?',
                        sampleAnswer: 'Reasonably, I\'d say. I rely on a digital calendar and to-do lists to keep things in order, and planning ahead has become second nature. That said, unexpected things crop up all the time, so I\'ve also had to get comfortable with adjusting on the fly — rigid planning only gets you so far.',
                        w5h1: { what: 'managing time with digital calendar and to-do lists', when: 'daily and ongoing', where: 'at home and work', who: 'by myself', why: 'balance work and personal activities effectively', how: 'feel organized yet adaptable' }
                    },
                    {
                        question: 'Do you make daily or weekly plans?',
                        sampleAnswer: 'Both, actually. At the start of each week, I map out the big priorities, and then each morning I drill down into the details for that day. Having that two-tier approach helps me keep sight of the bigger picture while staying focused on what needs doing right now. It takes a bit of discipline, but it definitely reduces stress.',
                        w5h1: { what: 'making daily and weekly plans', when: 'at start of each week, then each morning', where: 'at home for planning', who: 'by myself', why: 'stay organized, see big picture, focus on immediate tasks', how: 'feel in control and efficient' }
                    },
                    {
                        question: 'Are you usually punctual?',
                        sampleAnswer: 'Yes, it\'s something I take quite seriously. I\'d rather arrive five minutes early than risk being late — partly out of respect for other people\'s time, and partly because rushing at the last minute puts me in a terrible headspace. Being early gives you a moment to settle in and feel composed.',
                        w5h1: { what: 'being punctual and arriving early', when: 'for appointments and meetings', where: 'at various locations', who: 'by myself', why: 'show respect for others, avoid stress', how: 'feel responsible, respectful, and in control' }
                    },
                    {
                        question: 'Do you prefer mornings or evenings?',
                        sampleAnswer: 'I\'m very much a morning person. There\'s something about the early hours that feels incredibly productive — my mind is fresh and distractions are minimal. By evening I\'ve usually run out of steam for anything demanding, so I switch to lighter activities like reading or catching up on a show.',
                        w5h1: { what: 'preferring mornings for work, evenings for relaxation', when: 'early hours for important work, evenings for winding down', where: 'at home or at work in mornings, at home in evenings', who: 'by myself', why: 'most alert and productive in mornings, need to wind down in evenings', how: 'feel energized in mornings, relaxed in evenings' }
                    },
                    {
                        question: 'How do you organize your schedule?',
                        sampleAnswer: 'I use a combination of Google Calendar for appointments and deadlines and a physical planner for daily to-do items. I also set reminders on my phone for anything I absolutely can\'t afford to forget. It might sound like overkill, but the system works for me — things rarely slip through the cracks.',
                        w5h1: { what: 'using Google Calendar, physical planner, and phone reminders', when: 'daily and ongoing schedule management', where: 'on phone and computer, physical planner at home', who: 'by myself', why: 'stay on track and not forget important events', how: 'feel systematic and well-prepared' }
                    }
                ],
                aiPromptTemplate: `Student is practicing the 5W1H method (Who, What, When, Where, Why, How).

Question: {{question}}
Student's ideas: {{studentResponse}}
This is attempt #{{attemptNumber}} of {{totalAttempts}}.

Provide brief, specific feedback:
- Count how many W/H elements they used (out of 6)
- Praise specific good choices
- Suggest 1-2 missing elements to add
- Note improvement from previous attempts (if applicable)
- Encourage them to keep practicing

Keep it concise (3-5 sentences max). Use checkmarks ✓ for covered elements.`
            },
            {
                id: 'm2_prep',
                type: 'audio_lesson',
                title: 'The PREP Method',
                audioScript: {
                    text: `Now let's learn another powerful technique called PREP. It stands for Point, Reason, Example, Point. This is perfect when you want a clear, structured answer. Here's how it works: First, make your POINT - give a direct answer. "Yes, I enjoy reading." Second, give a REASON - why? "Because it helps me relax." Third, add an EXAMPLE - be specific. "For instance, last week I read a mystery novel that kept me engaged for hours." Finally, restate or extend your POINT. "So yes, reading is definitely one of my favorite activities." See how clear and complete that is? PREP works especially well for opinion questions and preference questions. The structure keeps you organized and ensures you give a full answer. Let me show you another example. Question: "Do you prefer studying alone or with others?" POINT: "I generally prefer studying alone." REASON: "Because I can focus better without distractions." EXAMPLE: "For example, when I studied for my last exam at the library by myself, I covered twice as much material as when I studied with classmates." POINT: "So for serious study sessions, alone works best for me." That's PREP in action!`,
                    duration: 70
                },
                content: {
                    structure: {
                        p: 'Point - Direct answer to the question',
                        r: 'Reason - Why you think/feel this way',
                        e: 'Example - Specific instance or detail',
                        p2: 'Point - Restate or extend your answer'
                    },
                    example: {
                        question: 'Do you enjoy reading?',
                        point: 'Yes, I enjoy reading.',
                        reason: 'Because it helps me relax.',
                        example: 'For instance, last week I read a mystery novel that kept me engaged for hours.',
                        pointAgain: 'So yes, reading is definitely one of my favorite activities.'
                    }
                }
            },
            {
                id: 'm2_prep_practice',
                type: 'ai_practice',
                title: 'PREP Method Practice',
                instructions: 'Answer using the PREP structure: Point → Reason → Example → Point',
                practiceQuestions: [
                    {
                        question: 'Do you think children should learn to play musical instruments?',
                        sampleAnswer: 'Yes, I definitely think children should learn musical instruments. The reason is that music education helps develop cognitive skills, creativity, and discipline from an early age. For example, I learned piano as a child, and it taught me patience and the value of regular practice, skills that have helped me in many areas of life. So yes, I believe musical training is valuable for children\'s overall development.',
                        prep: { point: 'Yes, definitely', reason: 'develops cognitive skills, creativity, discipline', example: 'I learned piano - taught patience and practice', pointAgain: 'valuable for overall development' }
                    },
                    {
                        question: 'Is it better to live in the city or countryside?',
                        sampleAnswer: 'I think it depends on personal priorities, but for me, city living is better. The reason is that cities offer more career opportunities, entertainment options, and convenient access to services. For instance, in my city, I can reach my office in 20 minutes, and there are countless restaurants, theaters, and cultural events nearby. So overall, while the countryside has its charm, the city provides the lifestyle and opportunities I value most.',
                        prep: { point: 'City living is better for me', reason: 'more opportunities, entertainment, convenient services', example: '20 min commute, countless options nearby', pointAgain: 'city provides lifestyle I value' }
                    },
                    {
                        question: 'Do you prefer to shop online or in physical stores?',
                        sampleAnswer: 'I prefer shopping online for most purchases. The reason is that it saves time, offers better price comparisons, and delivers directly to my door. For example, last month I needed a laptop, and I spent an hour comparing prices and reviews online before finding the best deal, which would have been impossible visiting multiple stores. So yes, online shopping is definitely my preferred method for convenience and efficiency.',
                        prep: { point: 'Prefer online shopping', reason: 'saves time, better comparisons, convenient delivery', example: 'laptop shopping - found best deal in 1 hour online', pointAgain: 'preferred for convenience and efficiency' }
                    },
                    {
                        question: 'Should students wear uniforms at school?',
                        sampleAnswer: 'Yes, I believe school uniforms are beneficial. The reason is that they promote equality among students and eliminate distractions related to fashion competition. For instance, when I wore a uniform at school, I never worried about what to wear or felt judged based on clothing brands, which helped me focus more on studying. So overall, I think uniforms create a better learning environment.',
                        prep: { point: 'Uniforms are beneficial', reason: 'promote equality, eliminate fashion distractions', example: 'I never worried about clothing - focused on studying', pointAgain: 'create better learning environment' }
                    },
                    {
                        question: 'Is it important to learn about history?',
                        sampleAnswer: 'Absolutely, learning history is very important. The reason is that it helps us understand how societies developed and avoid repeating past mistakes. For example, studying historical events like wars and revolutions has taught me about the consequences of political decisions and the importance of diplomacy. So yes, history education is essential for developing informed, thoughtful citizens.',
                        prep: { point: 'History is very important', reason: 'understand development, avoid past mistakes', example: 'wars/revolutions taught about consequences and diplomacy', pointAgain: 'essential for informed citizens' }
                    },
                    {
                        question: 'Do you think people watch too much TV nowadays?',
                        sampleAnswer: 'I think many people do watch excessive TV, yes. The reason is that streaming services make it too easy to binge-watch entire series, which can be quite addictive and time-consuming. For instance, I know several friends who spend 4-5 hours every evening watching shows, which leaves little time for exercise, socializing, or other productive activities. So I do believe TV consumption has become excessive for many people.',
                        prep: { point: 'Many people watch excessive TV', reason: 'streaming makes binge-watching addictive', example: 'friends spend 4-5 hours nightly, no time for other activities', pointAgain: 'TV consumption has become excessive' }
                    },
                    {
                        question: 'Should people save money or spend it on experiences?',
                        sampleAnswer: 'I think a balance is ideal, but I lean toward spending on experiences. The reason is that experiences create lasting memories and personal growth, while material possessions often lose their appeal quickly. For example, I once spent money on a trip to Japan, and those memories and cultural insights have enriched my life far more than any gadget I\'ve bought. So while saving is important, investing in meaningful experiences is equally valuable.',
                        prep: { point: 'Lean toward experiences', reason: 'create lasting memories and growth vs temporary appeal', example: 'Japan trip enriched life more than gadgets', pointAgain: 'experiences are equally valuable to savings' }
                    },
                    {
                        question: 'Is it better to have a few close friends or many acquaintances?',
                        sampleAnswer: 'I believe having a few close friends is better. The reason is that deep friendships provide genuine support, trust, and meaningful connection that superficial relationships cannot match. For instance, when I faced a difficult time last year, it was my two closest friends who truly helped me through it, while my many acquaintances offered only surface-level sympathy. So quality definitely matters more than quantity in friendships.',
                        prep: { point: 'Few close friends is better', reason: 'provide genuine support and deep connection', example: 'difficult time - close friends truly helped, acquaintances just sympathized', pointAgain: 'quality over quantity in friendships' }
                    },
                    {
                        question: 'Do you think learning a foreign language is important?',
                        sampleAnswer: 'Yes, I think language learning is extremely important. The reason is that it opens up career opportunities, enables cultural understanding, and enhances cognitive abilities. For example, learning English has allowed me to access international job markets, communicate with people worldwide, and even improved my problem-solving skills according to research. So yes, foreign language proficiency is a valuable asset in today\'s globalized world.',
                        prep: { point: 'Extremely important', reason: 'career opportunities, cultural understanding, cognitive benefits', example: 'English opened job markets, global communication, better problem-solving', pointAgain: 'valuable in globalized world' }
                    },
                    {
                        question: 'Should companies allow employees to work from home?',
                        sampleAnswer: 'Yes, I believe companies should offer work-from-home options. The reason is that remote work increases flexibility, reduces commute stress, and often improves productivity for many roles. For instance, during the pandemic, my company switched to remote work, and we actually saw a 15% increase in output while employees reported better work-life balance. So yes, remote work options are beneficial for both companies and employees.',
                        prep: { point: 'Should offer remote options', reason: 'increases flexibility, reduces stress, improves productivity', example: 'company saw 15% increase + better work-life balance', pointAgain: 'beneficial for both sides' }
                    },
                    {
                        question: 'Is it better to plan vacations in advance or be spontaneous?',
                        sampleAnswer: 'I think planning in advance is generally better. The reason is that advance planning allows you to secure better prices, ensure availability, and create a more organized itinerary. For example, when I planned a European trip three months ahead, I saved about 40% on flights and hotels compared to last-minute bookings, and I could reserve popular attractions. So while spontaneity has its appeal, planning usually leads to better and more economical trips.',
                        prep: { point: 'Planning advance is better', reason: 'better prices, ensure availability, organized itinerary', example: 'European trip - saved 40%, secured attractions', pointAgain: 'planning leads to better, economical trips' }
                    },
                    {
                        question: 'Do you think social media has more positive or negative effects?',
                        sampleAnswer: 'I think social media has mixed effects, but the negatives are concerning. The reason is that while it connects people globally, it also spreads misinformation, creates addiction, and negatively impacts mental health, especially among young users. For instance, studies show increased anxiety and depression rates correlate with heavy social media use among teenagers. So while social media has benefits, I believe we need to be more cautious about its negative psychological impacts.',
                        prep: { point: 'Mixed but negatives are concerning', reason: 'connects people BUT spreads misinformation, addiction, mental health issues', example: 'studies show anxiety/depression in heavy-user teenagers', pointAgain: 'need caution about psychological impacts' }
                    },
                    {
                        question: 'Should children have smartphones?',
                        sampleAnswer: 'I think children should have smartphones but with restrictions. The reason is that phones can be educational tools and safety devices, but unrestricted access can lead to addiction and exposure to inappropriate content. For example, giving a child a phone with parental controls and time limits allows them to learn digital skills and stay in contact with parents, while protecting them from harm. So yes, smartphones for children are acceptable with proper supervision.',
                        prep: { point: 'Yes but with restrictions', reason: 'educational and safety benefits BUT risk of addiction and inappropriate content', example: 'phone with parental controls allows learning + safety while protecting', pointAgain: 'acceptable with proper supervision' }
                    },
                    {
                        question: 'Is it important to eat breakfast every day?',
                        sampleAnswer: 'Yes, I believe eating breakfast is important. The reason is that it provides energy for the morning, improves concentration, and helps maintain a healthy metabolism. For instance, on days when I skip breakfast, I notice I feel sluggish by mid-morning and tend to overeat at lunch, whereas a good breakfast keeps me energized and focused. So yes, breakfast is definitely an important meal that shouldn\'t be skipped regularly.',
                        prep: { point: 'Breakfast is important', reason: 'provides energy, improves concentration, healthy metabolism', example: 'skipping makes me sluggish + overeat, eating keeps me energized', pointAgain: 'important meal, shouldn\'t skip' }
                    },
                    {
                        question: 'Do you prefer reading books or watching movies?',
                        sampleAnswer: 'I prefer reading books to watching movies. The reason is that books engage imagination more deeply, provide richer detail, and allow you to set your own pace. For example, when I read "The Lord of the Rings," I could visualize the world in my own way and take time to appreciate the language, whereas movies condense everything and control the experience. So while I enjoy both, reading offers a more immersive and personal experience.',
                        prep: { point: 'Prefer reading books', reason: 'engage imagination, richer detail, own pace', example: 'LOTR - visualized my own way, appreciated language vs condensed movies', pointAgain: 'reading offers more immersive experience' }
                    }
                ],
                aiPromptTemplate: `Student learned PREP method: Point → Reason → Example → Point (restate/extend)

Question: {{question}}
Student answer: {{studentResponse}}

Provide feedback:
✓ Structure Check: Did they follow PREP? (identify each part)
📊 Completeness: All 4 elements present?
💡 Quality: Is the example specific enough?
🎯 One Improvement: How to enhance their answer
✨ Band Estimate: [5.5-7.5]

Be encouraging and specific.`
            },
            {
                id: 'm2_past_present',
                type: 'audio_lesson',
                title: 'Past vs Present Comparison',
                audioScript: {
                    text: `Another excellent way to extend your answers is comparing past and present. This works beautifully for questions about habits, preferences, or changes over time. The structure is simple: talk about how things WERE before, then contrast with how they ARE now, and optionally mention WHY things changed. Let me demonstrate. Question: "Do you enjoy cooking?" Answer: "Actually, my feelings about cooking have changed over time. When I was younger, I found cooking boring and saw it as just a chore. But nowadays, I really enjoy it. I think the change happened when I moved out and had to cook for myself - I started experimenting with different recipes and discovered it's actually quite creative and relaxing. So yes, I definitely enjoy cooking now, though that wasn't always the case." This technique shows sophistication because you're not giving a simple yes/no - you're showing development and reflection. It also naturally creates more content. Another example: "Do you read much?" "I used to read all the time as a child - I'd finish several books a week during school holidays. However, these days I read less frequently, maybe one or two books a month, mainly because work keeps me quite busy. That said, I still value reading and I'm trying to make more time for it." See how natural this sounds?`,
                    duration: 75
                }
            },
            {
                id: 'm2_past_present_practice',
                type: 'ai_practice',
                title: 'Past vs Present Practice',
                instructions: 'Answer by comparing BEFORE and NOW. Show how your habits/preferences have changed.',
                practiceQuestions: [
                    {
                        question: 'What kind of music do you listen to?',
                        sampleAnswer: 'My music taste has really evolved over the years. When I was younger, I was really into pop and dance music - I used to listen to it constantly, especially during high school. But nowadays, I prefer jazz and classical music because I find them more relaxing and sophisticated. I think the change happened as I matured and started appreciating more complex melodies and instrumental arrangements.',
                        pastPresent: { past: 'pop and dance music constantly in high school', present: 'prefer jazz and classical now', why: 'matured, appreciate complex melodies' }
                    },
                    {
                        question: 'Do you enjoy sports?',
                        sampleAnswer: 'Actually, my attitude toward sports has changed quite dramatically. In the past, I was never interested in sports - I used to think they were boring and I avoided physical activities. However, these days I really enjoy playing badminton and going for runs. The change came when my doctor recommended exercise for health reasons, and I discovered that sports can actually be fun when you find the right ones.',
                        pastPresent: { past: 'never interested, thought boring, avoided physical activity', present: 'enjoy badminton and running', why: 'doctor recommendation, discovered can be fun' }
                    },
                    {
                        question: 'How much time do you spend with your family?',
                        sampleAnswer: 'My family time has decreased over the years, though I try to compensate. When I was a child and teenager, I spent every day with my family since we all lived together. Now that I\'ve moved out for work, I only see them on weekends or special occasions. While I miss the daily interaction, the quality of our time together has actually improved because we make more effort to do meaningful activities when we meet.',
                        pastPresent: { past: 'every day living together as child', present: 'only weekends/occasions now', why: 'moved out for work, but quality improved' }
                    },
                    {
                        question: 'What do you do in your free time?',
                        sampleAnswer: 'My free time activities have shifted quite a bit. In the past, I used to spend most of my free time playing video games - sometimes 4-5 hours a day on weekends. These days, I prefer reading books, going to cafés, or exploring new parts of the city. I think I started seeking more enriching activities as I got older and realized video games, while fun, weren\'t adding much value to my life.',
                        pastPresent: { past: 'video games 4-5 hours daily on weekends', present: 'reading, cafés, exploring city', why: 'sought more enriching activities with age' }
                    },
                    {
                        question: 'Do you like traveling?',
                        sampleAnswer: 'Yes, though my enthusiasm for travel has grown significantly. When I was younger, I found traveling stressful - the planning, packing, and unfamiliar environments made me anxious. But now I absolutely love it. I think the change happened when I started traveling solo and realized I could go at my own pace. Nowadays, I travel at least twice a year and find it incredibly enriching.',
                        pastPresent: { past: 'found stressful, anxious about planning and unfamiliar places', present: 'absolutely love it, travel twice yearly', why: 'solo travel taught going at own pace' }
                    },
                    {
                        question: 'What types of TV shows do you watch?',
                        sampleAnswer: 'My TV preferences have become more serious over time. I used to watch mainly sitcoms and reality shows for light entertainment - things like Friends or cooking competitions. These days, I\'m more drawn to documentaries and political dramas because I want content that\'s both entertaining and educational. I suppose my tastes matured as I wanted to use my leisure time more productively.',
                        pastPresent: { past: 'sitcoms and reality shows for light entertainment', present: 'documentaries and political dramas', why: 'want entertaining + educational content' }
                    },
                    {
                        question: 'How do you stay in touch with friends?',
                        sampleAnswer: 'The way I connect with friends has changed dramatically with technology. In the past, we used to meet in person regularly or make phone calls - that was the only way to stay connected. Nowadays, we primarily use messaging apps and social media, with occasional video calls. While I sometimes miss the face-to-face interaction, the convenience of instant messaging means we actually communicate more frequently, even if it\'s briefer.',
                        pastPresent: { past: 'in-person meetings and phone calls only', present: 'messaging apps, social media, video calls', why: 'technology enables more frequent contact' }
                    },
                    {
                        question: 'What do you usually eat for breakfast?',
                        sampleAnswer: 'My breakfast habits have become healthier over the years. I used to skip breakfast entirely or just grab sugary cereals when I was a student because I was always rushing. But these days, I make time for a proper breakfast with eggs, fruit, and whole grain toast. The change happened when I learned about nutrition and noticed how much better I feel throughout the day when I eat a balanced morning meal.',
                        pastPresent: { past: 'skipped or sugary cereals when rushing as student', present: 'proper breakfast: eggs, fruit, whole grain toast', why: 'learned about nutrition, feel better all day' }
                    },
                    {
                        question: 'How often do you use social media?',
                        sampleAnswer: 'My social media usage has actually decreased significantly. A few years ago, I was constantly on social media - checking Instagram and Facebook every few minutes throughout the day. These days, I limit myself to about 30 minutes in the evening. I made this change after realizing how much time I was wasting and how it was affecting my productivity and mental health. Now I feel much more focused and less anxious.',
                        pastPresent: { past: 'constantly checking every few minutes all day', present: 'limited to 30 minutes evening only', why: 'realized time waste, affected productivity and mental health' }
                    },
                    {
                        question: 'Do you prefer studying in the morning or evening?',
                        sampleAnswer: 'Interestingly, my optimal study time has shifted. When I was in high school and university, I was definitely a night owl - I used to study best between 10 PM and 2 AM when everything was quiet. However, now I find I\'m much more productive in the early morning, usually between 6 and 9 AM. I think my body clock has adjusted as I\'ve gotten older and adopted more regular working hours.',
                        pastPresent: { past: 'night owl, studied 10 PM-2 AM in school/university', present: 'early morning 6-9 AM more productive', why: 'body clock adjusted with age and regular work hours' }
                    },
                    {
                        question: 'What kind of movies do you enjoy?',
                        sampleAnswer: 'My movie preferences have matured quite a bit. In my teenage years, I used to love action movies and superhero films - the more explosions and special effects, the better. Nowadays, I prefer independent films and foreign cinema that offer deeper storytelling and character development. I think my tastes changed as I started appreciating substance over spectacle, and I wanted films that made me think rather than just entertained me.',
                        pastPresent: { past: 'action and superhero films with explosions in teens', present: 'independent and foreign films with depth', why: 'appreciate substance over spectacle, want thought-provoking content' }
                    },
                    {
                        question: 'How do you usually spend your weekends?',
                        sampleAnswer: 'My weekend routine has become much more active. I used to spend weekends mostly at home, sleeping in late and watching TV or browsing the internet. But these days, I try to go out and be productive - visiting museums, hiking, or meeting friends for brunch. The change came when I realized I was wasting my precious free time. Now I feel much more fulfilled by Monday morning.',
                        pastPresent: { past: 'home, sleeping late, TV and internet', present: 'active: museums, hiking, brunch with friends', why: 'realized wasting free time, feel more fulfilled' }
                    },
                    {
                        question: 'Do you play any video games?',
                        sampleAnswer: 'My gaming habits have changed completely. When I was younger, I was an avid gamer - I would play competitive online games for hours every day, sometimes even neglecting homework. These days, I rarely play, maybe just casual mobile games during my commute. The change happened when I started working full-time and realized I had other priorities. While I still appreciate games, they\'re no longer central to my life.',
                        pastPresent: { past: 'avid gamer, competitive online games for hours, neglected homework', present: 'rarely play, just casual mobile games on commute', why: 'full-time work brought other priorities' }
                    },
                    {
                        question: 'What do you like to do after work/school?',
                        sampleAnswer: 'My after-work routine has evolved significantly. Right after graduating, I used to go straight home and collapse on the couch, too exhausted to do anything. But now I\'ve made exercise a priority - I go to the gym or for a run right after work. This change came from understanding that physical activity actually gives me energy rather than depleting it. I feel much better now than when I was sedentary.',
                        pastPresent: { past: 'straight home, collapse on couch, too exhausted', present: 'gym or running right after work', why: 'learned exercise gives energy, feel much better' }
                    },
                    {
                        question: 'How often do you go shopping?',
                        sampleAnswer: 'My shopping frequency has changed quite dramatically. In the past, especially during my university years, I used to go shopping almost every weekend - it was my main hobby and social activity. Nowadays, I shop much less frequently, maybe once a month or only when I really need something. This shift happened as I became more financially conscious and realized I was buying things impulsively. Now I\'m much more intentional with my purchases.',
                        pastPresent: { past: 'almost every weekend in university, main hobby', present: 'once monthly or only when needed', why: 'became financially conscious, stopped impulsive buying' }
                    }
                ],
                aiPromptTemplate: `Student learned Past vs Present comparison technique.

Question: {{question}}
Student answer: {{studentResponse}}

Evaluate:
⏮️ Past: Did they describe how things were before?
⏭️ Present: Did they describe how things are now?
🔄 Transition: Smooth comparison?
📈 Development: Did they explain what changed or why?
💬 Naturalness: Does it sound conversational?
🎯 Band Estimate: [5.5-7.5]

Provide specific feedback and one suggestion for improvement.`
            },
            {
                id: 'm2_personal_general',
                type: 'audio_lesson',
                title: 'Personal + General Approach',
                audioScript: {
                    text: `Here's a sophisticated technique that Band 7 and 8 candidates often use: start with personal experience, then broaden to a general observation. This shows you can think beyond just yourself. The structure: first, answer from YOUR perspective with specific details. Then, add what you've noticed about OTHER people or society in general. Let me show you. Question: "Do people in your country enjoy sports?" Answer: "Well, speaking personally, I'm quite into badminton and I try to play twice a week with friends. As for the broader picture, I'd say sports are quite popular in my country. You can see parks filled with people jogging or playing football on weekends, and major sporting events always draw huge crowds. So yes, there's definitely a strong sports culture here." Notice what I did? Started with "I," then zoomed out to "people in general." This technique is especially useful for questions that ask about "people" or "your country" - don't just give general observations, make it personal first. Another example: "Is reading popular among young people?" "From my own experience, I read regularly and several of my friends do too, especially on their commutes. However, I've noticed that many young people now prefer shorter content like articles or social media posts rather than full books. So I'd say reading is still popular, but the format has changed." This shows balanced, thoughtful consideration.`,
                    duration: 80
                }
            },
            {
                id: 'm2_personal_general_practice',
                type: 'ai_practice',
                title: 'Personal + General Practice',
                instructions: 'Start with YOUR experience, then broaden to what you observe about others/society.',
                practiceQuestions: [
                    {
                        question: 'Do people in your country like to travel?',
                        sampleAnswer: 'Speaking from my own experience, I absolutely love traveling and try to take at least two trips a year to explore new places. As for the broader picture, I\'d say travel is quite popular in my country. You can see this from how packed airports and tourist destinations get during holiday seasons, and travel agencies are everywhere. People seem to value experiencing different cultures and taking breaks from routine.',
                        personalGeneral: { personal: 'I love traveling, 2 trips yearly', general: 'popular in country - packed destinations, many travel agencies', observation: 'people value culture and breaks' }
                    },
                    {
                        question: 'Is technology important in your country?',
                        sampleAnswer: 'From my personal perspective, technology is absolutely essential - I use my smartphone, laptop, and various apps throughout the day for work and personal life. When I look at society more broadly, I see that my country has embraced technology rapidly. Almost everyone has a smartphone, digital payments are common even in small shops, and tech startups are flourishing. So yes, technology plays a central role in our daily lives.',
                        personalGeneral: { personal: 'absolutely essential, use smartphone/laptop/apps daily', general: 'country embraced rapidly - everyone has phones, digital payments everywhere, startups flourishing', observation: 'central role in daily life' }
                    },
                    {
                        question: 'Do young people eat healthy food?',
                        sampleAnswer: 'Personally, I try to maintain a healthy diet with fruits, vegetables, and whole grains, though I do indulge in junk food occasionally. However, when I observe my peers and younger generation generally, I notice a concerning trend. Many young people rely heavily on fast food and processed snacks due to busy lifestyles and convenience. Though there\'s growing health awareness, I\'d say unhealthy eating is still quite common among youth.',
                        personalGeneral: { personal: 'I try healthy diet with occasional indulgence', general: 'peers rely on fast food/processed snacks', observation: 'convenience trumps health, though awareness growing' }
                    },
                    {
                        question: 'Are people in your country interested in learning English?',
                        sampleAnswer: 'For me personally, learning English has been a priority since childhood because I knew it would open up opportunities. Looking at the bigger picture, there\'s definitely strong interest in English across my country. You see English learning centers in every neighborhood, parents enroll children in English classes from a young age, and English proficiency is often required for good jobs. It\'s viewed as a gateway to better careers and global connections.',
                        personalGeneral: { personal: 'priority since childhood for opportunities', general: 'strong interest nationwide - centers everywhere, early enrollment, job requirement', observation: 'viewed as career and global gateway' }
                    },
                    {
                        question: 'Do people prefer traditional or modern entertainment?',
                        sampleAnswer: 'Personally, I find myself drawn to both - I enjoy streaming modern shows but also appreciate traditional theater performances occasionally. From what I observe in society, there\'s been a clear shift toward modern entertainment. Most people, especially younger generations, prefer Netflix, YouTube, and online gaming over traditional forms. However, traditional entertainment still has its devoted audience, particularly among older people and during cultural festivals.',
                        personalGeneral: { personal: 'drawn to both - streaming + occasional traditional theater', general: 'clear shift to modern - Netflix/YouTube/gaming popular, traditional has older devoted audience', observation: 'generational divide in preferences' }
                    },
                    {
                        question: 'Is family important in your culture?',
                        sampleAnswer: 'From my personal experience, family is extremely important - I stay in close contact with my parents and extended family, and we gather regularly for meals and celebrations. This seems to reflect broader cultural values in my country. Family bonds remain very strong here, with multiple generations often living together or nearby, and major decisions are typically discussed with family members. Family remains the cornerstone of our society.',
                        personalGeneral: { personal: 'extremely important, close contact, regular gatherings', general: 'strong bonds nationwide - multi-generational living, collective decisions', observation: 'cornerstone of society' }
                    },
                    {
                        question: 'Do people in your city use public transportation?',
                        sampleAnswer: 'I personally use public transportation daily - taking the subway to work because it\'s faster and cheaper than driving. From what I can see, public transport is quite popular in my city. During rush hours, trains and buses are packed with commuters, and the government continues investing in expanding the network. While some people still prefer cars for convenience, I\'d say the majority rely on public transit.',
                        personalGeneral: { personal: 'use daily - subway faster and cheaper than driving', general: 'quite popular - packed during rush hour, government investing', observation: 'majority rely on it despite car preference by some' }
                    },
                    {
                        question: 'Are people environmentally conscious?',
                        sampleAnswer: 'Personally, I try to be environmentally conscious - I recycle, use reusable bags, and minimize plastic usage where possible. When I look at society generally, I see growing but still limited environmental awareness. More people are talking about environmental issues and some are making changes, but many still prioritize convenience over sustainability. Younger people tend to be more eco-conscious than older generations, so I think awareness is gradually improving.',
                        personalGeneral: { personal: 'I try - recycle, reusable bags, minimize plastic', general: 'growing but limited - more talk than action, convenience prioritized', observation: 'youth more aware, gradually improving' }
                    },
                    {
                        question: 'Do young people save money or spend it?',
                        sampleAnswer: 'From my own habits, I try to save at least 20% of my income each month while still enjoying life occasionally. Looking at my peers and younger generation broadly, I see a mixed picture. Some young people are quite financially responsible and invest early, but many tend to spend freely on experiences, gadgets, and lifestyle, often living paycheck to paycheck. Economic pressures and consumer culture seem to encourage spending over saving.',
                        personalGeneral: { personal: 'save 20% monthly while enjoying life', general: 'mixed - some responsible investors, many spend freely paycheck to paycheck', observation: 'economic pressure and consumer culture encourage spending' }
                    },
                    {
                        question: 'Is eating out popular in your country?',
                        sampleAnswer: 'I personally eat out quite frequently, probably 3-4 times a week, because I enjoy trying different cuisines and socializing over meals. This seems to be a common pattern across my country. Restaurants are always busy, food delivery services are booming, and dining out has become a major social activity. With more dual-income households and busy lifestyles, eating out has become more of a norm than an occasional treat.',
                        personalGeneral: { personal: 'eat out 3-4 times weekly, enjoy variety and socializing', general: 'common pattern - busy restaurants, booming delivery, major social activity', observation: 'busy lifestyles made it norm vs occasional' }
                    },
                    {
                        question: 'Do people like to read newspapers?',
                        sampleAnswer: 'Personally, I rarely read physical newspapers anymore - I get all my news from online sources and apps on my phone. This reflects a broader trend I observe in society. Physical newspaper readership has declined significantly, especially among younger people who prefer digital news, social media, and instant updates. Older generations still buy newspapers, but overall, traditional print media is definitely declining.',
                        personalGeneral: { personal: 'rarely physical papers, all news from online/apps', general: 'significant decline especially in youth, prefer digital/social media', observation: 'older still buy, but print declining overall' }
                    },
                    {
                        question: 'Are people interested in fashion?',
                        sampleAnswer: 'For me, I have moderate interest in fashion - I like to dress well but don\'t follow every trend obsessively. When I look around, fashion seems quite important in my society, particularly in urban areas. Social media has amplified this interest, with fashion influencers having huge followings. Shopping malls are always crowded, and people pay attention to brands and style. I\'d say fashion consciousness is definitely high, especially among young people.',
                        personalGeneral: { personal: 'moderate interest, dress well without obsessing', general: 'quite important in cities, social media amplified, influencers popular', observation: 'malls crowded, high consciousness especially in youth' }
                    },
                    {
                        question: 'Do people in your country work long hours?',
                        sampleAnswer: 'From my experience, I typically work 9-10 hours a day including commute, which I find quite exhausting. Unfortunately, this seems to be the norm rather than exception in my country. Long working hours are common, with many people working late into the evening or even weekends. Work-life balance is often sacrificed for career advancement. While there\'s growing discussion about reducing hours, the culture of overwork remains deeply ingrained.',
                        personalGeneral: { personal: '9-10 hours daily with commute, quite exhausting', general: 'norm in country - late evenings, weekends common, work-life balance sacrificed', observation: 'growing discussion but overwork culture ingrained' }
                    },
                    {
                        question: 'Is exercise popular among young people?',
                        sampleAnswer: 'I personally make exercise a priority, going to the gym three times a week and running on weekends. When I observe young people generally, I see increasing interest in fitness. Gyms are proliferating, fitness apps are popular, and social media is full of workout content. However, I\'d say it\'s more of a trend among some groups rather than universal - many young people still lead sedentary lifestyles due to work and study pressures.',
                        personalGeneral: { personal: 'priority for me - gym 3x weekly, weekend runs', general: 'increasing interest - gyms proliferating, apps popular, social media content', observation: 'trend among some, but many still sedentary due to pressures' }
                    },
                    {
                        question: 'Do people prefer shopping online or in stores?',
                        sampleAnswer: 'I personally do about 80% of my shopping online because it saves time and offers better variety and prices. From what I observe in society, online shopping has grown dramatically, especially after the pandemic. E-commerce platforms are thriving, and delivery services are everywhere. However, physical stores still have their place, particularly for items people want to see or try first, like clothes and furniture. I\'d say the trend is definitely shifting toward online.',
                        personalGeneral: { personal: '80% online for time, variety, and prices', general: 'dramatic growth post-pandemic, e-commerce thriving, delivery everywhere', observation: 'physical stores for try-first items, but shifting online' }
                    }
                ],
                aiPromptTemplate: `Student learned Personal + General approach.

Question: {{question}}
Student answer: {{studentResponse}}

Check:
👤 Personal: Did they share their own experience first?
🌍 General: Did they broaden to wider observation?
🔗 Connection: Smooth transition between personal and general?
📊 Balance: Good mix of both perspectives?
🎓 Sophistication: Shows thoughtful consideration?
🎯 Band Estimate: [6.0-8.0]

Provide constructive feedback with one enhancement suggestion.`
            },
            {
                id: 'm2_contrast',
                type: 'audio_lesson',
                title: 'The Contrast Technique',
                audioScript: {
                    text: `The contrast technique is brilliant for creating interesting, extended answers. You compare two things to highlight differences. Common contrasts include: yourself versus others, weekdays versus weekends, past versus present, different situations, or different preferences. Let me demonstrate. Question: "How do you spend your free time?" Answer: "It really depends on the day. On weekdays, I tend to stay home and do quiet activities like reading or watching series because I'm usually tired from work. But on weekends, I'm much more active - I meet friends, go to cafés, or explore new places in the city. So my free time activities vary quite a bit depending on how much energy I have." See the contrast? Weekdays versus weekends. Another example: "Do you like cooking?" Answer: "Unlike many of my friends who see cooking as a chore, I actually find it quite enjoyable. While they prefer ordering takeout or eating at restaurants, I like experimenting with recipes at home. I think it's more about personal preference and how much time you have." This compares yourself to others. The word "unlike," "while," "whereas," "but," and "however" are your friends here. They signal contrast. One more: "Do you prefer studying alone or with others?" "For routine studying, I prefer working alone because I can focus better. However, when preparing for exams or working on difficult topics, I find group study more helpful because we can discuss different perspectives. So it really depends on the situation." Situation-based contrast. This technique makes your answers more nuanced and interesting.`,
                    duration: 85
                }
            },
            {
                id: 'm2_contrast_practice',
                type: 'ai_practice',
                title: 'Contrast Technique Practice',
                instructions: 'Use contrast in your answer: yourself vs others, weekdays vs weekends, different situations, etc.',
                practiceQuestions: [
                    {
                        question: 'What do you like to do on weekends?',
                        sampleAnswer: 'It really depends on how I\'m feeling. On some weekends, when I need to recharge, I prefer staying home and doing quiet activities like reading or watching movies. But on other weekends, when I\'m feeling more energetic, I like to go out and explore - visiting new restaurants, hiking, or meeting friends. So my weekend activities vary quite a bit depending on my energy levels.',
                        contrast: { type: 'situation-based', sideA: 'quiet weekends at home reading/movies', sideB: 'active weekends out exploring/hiking/friends', marker: 'but on other weekends' }
                    },
                    {
                        question: 'How do you prefer to communicate with friends?',
                        sampleAnswer: 'Unlike many people my age who rely heavily on texting, I actually prefer voice or video calls for meaningful conversations. While quick messages are fine for simple updates, I find that hearing someone\'s voice creates a much deeper connection. However, I do understand that texts are more convenient, so I use both depending on the situation.',
                        contrast: { type: 'self vs others', sideA: 'others rely on texting', sideB: 'I prefer voice/video for depth', marker: 'unlike, while, however' }
                    },
                    {
                        question: 'Do you like shopping?',
                        sampleAnswer: 'My feelings about shopping depend entirely on what I\'m buying. For everyday items like groceries, I find shopping quite tedious and I just want to get it done quickly. But when I\'m shopping for something special like gifts or tech gadgets, I actually enjoy the research and selection process. So I can\'t say I universally like or dislike shopping - it varies.',
                        contrast: { type: 'different items', sideA: 'everyday groceries tedious, get done quickly', sideB: 'special items/gifts enjoy research process', marker: 'but when, so I can\'t say universally' }
                    },
                    {
                        question: 'What kind of movies do you enjoy?',
                        sampleAnswer: 'My movie preferences are quite mood-dependent. When I want to unwind after a stressful week, I go for lighthearted comedies that don\'t require much thinking. However, when I\'m in a more contemplative mood, I prefer thought-provoking dramas or documentaries that challenge my perspective. So I don\'t stick to just one genre.',
                        contrast: { type: 'mood-based', sideA: 'stressful times = lighthearted comedies', sideB: 'contemplative mood = dramas/documentaries', marker: 'however, when' }
                    },
                    {
                        question: 'How do you usually travel around the city?',
                        sampleAnswer: 'During the work week, I always take the subway because it\'s faster and more predictable than driving in rush hour traffic. But on weekends, I prefer to drive my car since parking is easier and I have more flexibility with my schedule. So my transportation choice really depends on whether it\'s a weekday or weekend.',
                        contrast: { type: 'weekday vs weekend', sideA: 'weekday subway for speed in rush hour', sideB: 'weekend car for parking and flexibility', marker: 'but on weekends' }
                    },
                    {
                        question: 'Do you prefer hot or cold weather?',
                        sampleAnswer: 'Whereas many people love hot summer weather for swimming and outdoor activities, I actually prefer cooler temperatures. Hot weather makes me feel lethargic and uncomfortable, while cool weather energizes me and makes me feel more productive. I suppose everyone has their ideal temperature range, and mine is definitely on the cooler side.',
                        contrast: { type: 'self vs others + temperature', sideA: 'others love hot weather for activities', sideB: 'I prefer cool weather, feels energizing vs lethargic', marker: 'whereas, while' }
                    },
                    {
                        question: 'What time of day do you prefer to study?',
                        sampleAnswer: 'For routine studying and review, I work best in the morning when my mind is fresh and there are fewer distractions. However, for creative tasks or essay writing, I find the evening more productive because I feel more relaxed and ideas flow more naturally. So my ideal study time really depends on the type of work I\'m doing.',
                        contrast: { type: 'task-based', sideA: 'routine study = morning, fresh mind', sideB: 'creative tasks = evening, relaxed and flowing', marker: 'however, for' }
                    },
                    {
                        question: 'Do you like eating at home or at restaurants?',
                        sampleAnswer: 'During busy weekdays, I prefer eating at home because it\'s healthier, cheaper, and I can control what goes into my food. But on weekends or special occasions, I really enjoy going to restaurants because it\'s a social experience and a chance to try dishes I wouldn\'t cook myself. So both have their place in my life.',
                        contrast: { type: 'weekday vs special occasions', sideA: 'weekdays home for health/cost/control', sideB: 'weekends/special restaurants for social/variety', marker: 'but on, so both' }
                    },
                    {
                        question: 'How do you stay informed about news?',
                        sampleAnswer: 'For breaking news and quick updates, I rely on news apps and social media because they deliver information instantly. However, for in-depth analysis and understanding complex issues, I prefer reading long-form articles or watching documentaries. So I use different sources depending on whether I need quick facts or deep understanding.',
                        contrast: { type: 'purpose-based', sideA: 'breaking news = apps/social media for speed', sideB: 'deep understanding = long-form/documentaries', marker: 'however, for' }
                    },
                    {
                        question: 'Do you prefer indoor or outdoor activities?',
                        sampleAnswer: 'In good weather, I definitely prefer being outdoors - hiking, cycling, or even just reading in a park. But when it\'s rainy or extremely hot, I\'m quite happy to stay indoors with activities like cooking, gaming, or watching movies. So my preference really changes with the weather conditions.',
                        contrast: { type: 'weather-based', sideA: 'good weather = outdoor hiking/cycling/park', sideB: 'bad weather = indoor cooking/gaming/movies', marker: 'but when, so my preference' }
                    },
                    {
                        question: 'What type of music do you listen to?',
                        sampleAnswer: 'While I\'m working or studying, I listen to instrumental music or lo-fi beats because lyrics distract me from concentrating. But in my free time, I enjoy vocal music across various genres - pop, rock, jazz - because I can fully appreciate the lyrics and melodies. So my music choice is very context-dependent.',
                        contrast: { type: 'context-based', sideA: 'work/study = instrumental/lo-fi, no distraction', sideB: 'free time = vocal music, appreciate lyrics', marker: 'while, but in' }
                    },
                    {
                        question: 'Do you like visiting museums?',
                        sampleAnswer: 'My interest varies by museum type. Art museums can sometimes feel tedious to me because I don\'t always connect with visual art emotionally. In contrast, I find science and history museums fascinating because they tell stories and explain how things work. So yes, I like museums, but it depends on the subject matter.',
                        contrast: { type: 'museum type', sideA: 'art museums sometimes tedious, don\'t connect', sideB: 'science/history fascinating, tell stories', marker: 'in contrast, but it depends' }
                    },
                    {
                        question: 'How do you celebrate special occasions?',
                        sampleAnswer: 'For family-oriented occasions like birthdays or anniversaries, I prefer intimate gatherings at home or restaurants with close relatives. However, for achievements like graduations or promotions, I like to celebrate with larger groups of friends in more lively settings. So the way I celebrate really depends on the nature of the occasion.',
                        contrast: { type: 'occasion type', sideA: 'family occasions = intimate home/restaurant', sideB: 'achievements = large groups, lively settings', marker: 'however, for' }
                    },
                    {
                        question: 'Do you prefer watching sports or playing them?',
                        sampleAnswer: 'Unlike my brother who loves watching sports on TV for hours, I much prefer actually playing sports myself. Watching feels passive to me, whereas playing gives me exercise, social interaction, and a real sense of achievement. That said, I do occasionally watch major events like the Olympics, but active participation is definitely my preference.',
                        contrast: { type: 'self vs others + activity type', sideA: 'brother loves watching TV for hours', sideB: 'I prefer playing for exercise/social/achievement', marker: 'unlike, whereas, but' }
                    },
                    {
                        question: 'What do you do to relax?',
                        sampleAnswer: 'After mentally exhausting days at work, I relax through physical activities like going for a run or doing yoga because they help me disconnect from mental stress. But after physically tiring days, I prefer passive relaxation like watching series or listening to music. So my relaxation method depends on what type of fatigue I\'m experiencing.',
                        contrast: { type: 'fatigue type', sideA: 'mental exhaustion = physical activities to disconnect', sideB: 'physical tiredness = passive watching/listening', marker: 'but after, so my method depends' }
                    }
                ],
                aiPromptTemplate: `Student learned the Contrast Technique.

Question: {{question}}
Student answer: {{studentResponse}}

Analyze:
⚖️ Contrast Used: What are they comparing?
🔤 Signal Words: Did they use contrast markers (unlike, while, whereas, but, however)?
📐 Balance: Are both sides explained clearly?
✨ Natural Flow: Does the contrast enhance the answer?
🎯 Band Estimate: [6.0-7.5]

Give specific feedback and show how to strengthen the contrast.`
            },
            {
                id: 'm2_feelings',
                type: 'audio_lesson',
                title: 'Feelings + Reasons Method',
                audioScript: {
                    text: `Many students forget the emotional aspect of answers, but expressing feelings makes your responses more engaging and natural. The Feelings plus Reasons method is simple: say how something makes you FEEL, then explain WHY it creates that feeling. This works especially well for questions about preferences and experiences. Let me demonstrate. Question: "Do you enjoy traveling?" Answer: "Yes, absolutely! Traveling makes me feel excited and curious about the world. I think it's because every new place offers different experiences and perspectives. When I visit somewhere new, I feel energized by trying local food, meeting people, and seeing different ways of life. It's that sense of discovery that I find so thrilling." Notice how feelings are central here - excited, curious, energized, thrilling. Another example: "What's your favorite time of year?" Answer: "I really love autumn because it makes me feel peaceful and reflective. There's something calming about the cooler weather and the changing colors of the leaves. I feel more comfortable doing outdoor activities when it's not too hot or too cold, and I enjoy that cozy feeling of wearing sweaters and drinking warm beverages. The whole season just puts me in a good mood." Key feelings vocabulary: excited, calm, energized, relaxed, motivated, inspired, happy, comfortable, stressed, overwhelmed. Use these naturally and always connect them to specific reasons. Don't just say "It makes me happy" - explain WHY it makes you happy. "It makes me happy because I feel accomplished when I finish a good book" - see the difference?`,
                    duration: 80
                }
            },
            {
                id: 'm2_feelings_practice',
                type: 'ai_practice',
                title: 'Feelings + Reasons Practice',
                instructions: 'Focus on expressing HOW things make you feel and explain WHY they create those feelings.',
                practiceQuestions: [
                    {
                        question: 'How do you feel about learning English?',
                        sampleAnswer: 'Learning English makes me feel both excited and challenged at the same time. I feel excited because I know it opens up so many opportunities for my career and allows me to connect with people worldwide. However, it can also feel overwhelming sometimes because there\'s always so much more to learn - new vocabulary, expressions, and cultural nuances. Overall though, the sense of progress I feel when I understand something new is incredibly rewarding.',
                        feelings: { emotions: 'excited, challenged, overwhelmed, rewarding', reasons: 'career opportunities, global connections; but endless learning; progress feels rewarding' }
                    },
                    {
                        question: 'What makes you feel relaxed?',
                        sampleAnswer: 'Reading before bed always makes me feel calm and peaceful. I think it\'s because when I\'m absorbed in a good story, I completely forget about my daily worries and stress from work. The quiet ritual of sitting with a book in my comfortable chair creates this soothing atmosphere that helps my mind unwind. By the time I\'m ready to sleep, I feel completely relaxed and my racing thoughts have settled.',
                        feelings: { emotions: 'calm, peaceful, soothed, relaxed', reasons: 'absorbed in story, forget worries; quiet ritual creates atmosphere; mind unwinds, thoughts settle' }
                    },
                    {
                        question: 'How does music affect your mood?',
                        sampleAnswer: 'Music has a powerful effect on how I feel throughout the day. Upbeat pop music in the morning makes me feel energized and motivated to start my day productively. When I\'m stressed, classical or jazz music helps me feel more centered and calm because the smooth melodies seem to slow down my racing thoughts. Even when I\'m feeling sad, the right music can make me feel understood and less alone, which is strangely comforting.',
                        feelings: { emotions: 'energized, motivated, centered, calm, understood, comforted', reasons: 'upbeat morning boosts energy; smooth melodies slow racing thoughts; sad music creates understanding connection' }
                    },
                    {
                        question: 'What activity makes you feel most energized?',
                        sampleAnswer: 'Going for a run early in the morning makes me feel incredibly energized and alive. I think it\'s because the physical movement gets my blood pumping and releases endorphins, which naturally boost my mood. There\'s also something refreshing about being outside in the cool morning air while the city is just waking up. After my run, I feel ready to tackle anything the day throws at me, and that confidence is really empowering.',
                        feelings: { emotions: 'energized, alive, refreshed, confident, empowered', reasons: 'blood pumping + endorphins boost mood; cool morning air refreshing; ready to tackle challenges' }
                    },
                    {
                        question: 'How do you feel about your daily routine?',
                        sampleAnswer: 'I have mixed feelings about my daily routine. On one hand, it makes me feel secure and organized because I know what to expect each day and can plan accordingly. However, sometimes it makes me feel a bit trapped or monotonous, especially when every day feels exactly the same. I think what I need is some variety to break the pattern, which would help me feel more spontaneous and excited about life.',
                        feelings: { emotions: 'secure, organized, trapped, monotonous, need for spontaneity and excitement', reasons: 'predictability gives security; but sameness feels trapping; variety would create excitement' }
                    },
                    {
                        question: 'What type of weather makes you feel good?',
                        sampleAnswer: 'Cool, sunny weather with a light breeze always makes me feel happy and optimistic. I think it\'s because this kind of weather is perfect for being active outdoors - not too hot to be uncomfortable, but bright enough to lift my spirits. The sunshine specifically makes me feel more cheerful and energetic, probably because of the vitamin D and natural light. Rainy or grey days, in contrast, tend to make me feel sluggish and unmotivated.',
                        feelings: { emotions: 'happy, optimistic, cheerful, energetic; vs sluggish, unmotivated', reasons: 'perfect for outdoor activity; sunshine lifts spirits; vitamin D + natural light boost mood; grey dampens motivation' }
                    },
                    {
                        question: 'How does spending time in nature affect you?',
                        sampleAnswer: 'Being in nature makes me feel incredibly peaceful and grounded. I think it\'s because natural environments provide a break from the constant noise and stimulation of city life, allowing my mind to truly rest. When I\'m hiking in the forest or sitting by a lake, I feel connected to something bigger than my daily concerns, which puts things in perspective. It\'s almost meditative and always leaves me feeling refreshed and mentally clearer.',
                        feelings: { emotions: 'peaceful, grounded, connected, refreshed, mentally clear', reasons: 'break from city noise allows mind to rest; connection to bigger picture; meditative quality clears mind' }
                    },
                    {
                        question: 'What makes you feel stressed?',
                        sampleAnswer: 'Tight deadlines at work always make me feel anxious and overwhelmed. I think it\'s because I\'m naturally a perfectionist, so when I don\'t have enough time to do something properly, I feel frustrated and pressured. The constant worry about not meeting expectations or disappointing people creates this heavy tension in my chest. Even though I usually manage to complete tasks on time, the stress during the process makes me feel emotionally drained.',
                        feelings: { emotions: 'anxious, overwhelmed, frustrated, pressured, tense, drained', reasons: 'perfectionist needs time for quality; worry about expectations; constant pressure emotionally exhausting' }
                    },
                    {
                        question: 'How do you feel about meeting new people?',
                        sampleAnswer: 'Meeting new people makes me feel both excited and nervous at the same time. I feel excited because I enjoy learning about different perspectives and potentially forming new friendships, which makes life more interesting. However, I also feel a bit nervous initially because I\'m not sure how the interaction will go or if we\'ll connect well. Once the conversation starts flowing though, I usually feel more comfortable and the nervousness fades into genuine interest.',
                        feelings: { emotions: 'excited, nervous, interested, comfortable', reasons: 'enjoy new perspectives and friendships; but uncertain about connection; flowing conversation builds comfort' }
                    },
                    {
                        question: 'What hobby makes you feel most satisfied?',
                        sampleAnswer: 'Photography makes me feel incredibly satisfied and accomplished. I think it\'s because when I capture a beautiful moment or composition, there\'s this sense of having created something meaningful that will last. The process of improving my skills over time makes me feel proud of my progress, and when others appreciate my photos, it validates my effort. It\'s one of the few activities that leaves me feeling both creatively fulfilled and technically challenged.',
                        feelings: { emotions: 'satisfied, accomplished, proud, validated, creatively fulfilled, challenged', reasons: 'creating lasting meaningful moments; visible skill progress; others\' appreciation validates effort; creative + technical balance' }
                    },
                    {
                        question: 'How does exercise make you feel?',
                        sampleAnswer: 'Exercise always makes me feel better, both physically and mentally. During the workout, I initially feel challenged and sometimes uncomfortable, but there\'s also a sense of determination and strength building. Afterward, I feel accomplished and proud for pushing through, and the endorphin release creates this natural high that makes me feel happy and energized. Even on days I don\'t want to exercise, I never regret it because I always feel more positive and confident afterward.',
                        feelings: { emotions: 'challenged, uncomfortable, determined, strong, accomplished, proud, happy, energized, positive, confident', reasons: 'pushing limits builds strength; completion brings pride; endorphins create natural high; boosts overall mood and confidence' }
                    },
                    {
                        question: 'What type of food makes you feel happy?',
                        sampleAnswer: 'Comfort foods like pasta or homemade soup make me feel warm and happy inside. I think it\'s because these foods are associated with positive memories from childhood when my family would gather for meals. The familiar tastes and aromas create a sense of nostalgia that feels comforting and secure. Even when I\'m feeling down, a bowl of my favorite pasta makes me feel cared for and content, almost like a warm hug.',
                        feelings: { emotions: 'warm, happy, nostalgic, comforting, secure, cared for, content', reasons: 'childhood family memories; familiar tastes/aromas; creates sense of being cared for like warm hug' }
                    },
                    {
                        question: 'How do you feel about working in teams?',
                        sampleAnswer: 'Working in teams makes me feel energized but sometimes frustrated. I feel energized because bouncing ideas off others sparks creativity and we can achieve more together than individually. The collaborative energy and shared goals create a sense of camaraderie that I find motivating. However, I can feel frustrated when team members don\'t pull their weight or when decision-making takes too long due to conflicting opinions. Overall though, when teams work well, I feel inspired and more productive.',
                        feelings: { emotions: 'energized, frustrated, creative, motivated, inspired, productive', reasons: 'collaboration sparks creativity and achievement; camaraderie motivates; but unequal effort frustrates; slow decisions due to conflicts; good teams inspire' }
                    },
                    {
                        question: 'What makes you feel proud of yourself?',
                        sampleAnswer: 'Overcoming challenges makes me feel most proud of myself. I think it\'s because when I push through difficult situations - whether it\'s a tough project at work or a personal goal - I prove to myself that I\'m capable and resilient. The sense of achievement when I succeed after struggling makes me feel strong and confident in my abilities. It also gives me courage to tackle future challenges because I know I have the determination to overcome obstacles.',
                        feelings: { emotions: 'proud, capable, resilient, strong, confident, courageous, determined', reasons: 'proving capability through struggle; achievement after difficulty; builds confidence; gives courage for future challenges' }
                    },
                    {
                        question: 'How does your home environment affect your mood?',
                        sampleAnswer: 'My home environment has a huge impact on how I feel. When my space is clean and organized, I feel calm, focused, and in control of my life. The orderliness creates a sense of peace that helps me think clearly and feel less stressed. However, when things are messy or cluttered, I feel anxious and overwhelmed because the physical chaos seems to mirror mental chaos. That\'s why I always try to maintain a tidy space - it directly affects my emotional well-being.',
                        feelings: { emotions: 'calm, focused, in control, peaceful, clear-minded; vs anxious, overwhelmed', reasons: 'clean/organized creates peace and control; helps thinking clarity; mess mirrors mental chaos; direct link to emotional well-being' }
                    }
                ],
                aiPromptTemplate: `Student learned Feelings + Reasons method.

Question: {{question}}
Student answer: {{studentResponse}}

Evaluate:
💙 Feelings Expressed: What emotions did they mention?
🔍 Reasons Given: Did they explain WHY those feelings occur?
🎭 Authenticity: Does it sound genuine and personal?
📚 Vocabulary: Appropriate feelings words used?
🎯 Band Estimate: [5.5-7.5]

Provide feedback with suggestions for more emotional vocabulary if needed.`
            },
            {
                id: 'm2_frequency',
                type: 'audio_lesson',
                title: 'Frequency + Details Method',
                audioScript: {
                    text: `The Frequency plus Details method is perfect for extending answers about activities and habits. Instead of just saying "yes" or "no," you specify HOW OFTEN and add SPECIFIC CIRCUMSTANCES or variations. This creates natural, extended responses. Here's the pattern: state the frequency, then add details about different scenarios or exceptions. Let me show you. Question: "Do you exercise?" Answer: "Yes, I exercise regularly - usually about three times a week. I typically go jogging on Monday and Wednesday mornings before work, and then I do yoga at home on Saturday afternoons. Occasionally, if I'm particularly busy, I might skip a session, but I try to maintain that routine because it helps me feel energized throughout the week." See what I did? Frequency words: regularly, usually, typically, occasionally. Then specific details: what days, what times, what types of exercise. Another example: "Do you eat out much?" Answer: "I eat out fairly often, probably two or three times a week. During the work week, I sometimes grab lunch at cafés near my office, especially on busy days when I don't have time to prepare food. On weekends, I usually go to restaurants with friends or family for dinner. But I do cook at home most evenings because it's healthier and more economical." Notice the variations: weekdays versus weekends, lunch versus dinner, with friends versus alone. Key frequency expressions: always, usually, often, regularly, sometimes, occasionally, rarely, seldom, never, every day, twice a week, from time to time, once in a while. Use these to show patterns and variations in your habits.`,
                    duration: 85
                }
            },
            {
                id: 'm2_frequency_practice',
                type: 'ai_practice',
                title: 'Frequency + Details Practice',
                instructions: 'State HOW OFTEN you do something, then add specific details and variations.',
                practiceQuestions: [
                    {
                        question: 'How often do you use your phone?',
                        sampleAnswer: 'I use my phone constantly throughout the day - probably checking it every 10-15 minutes on average. During work hours, I mainly use it for professional communication like emails and messaging colleagues. In the evenings, my usage shifts to social media and entertainment. On weekends, I try to reduce my phone time and only check it occasionally, maybe once every hour or two, because I want to be more present with family and friends.',
                        frequency: { main: 'constantly, every 10-15 minutes', variations: 'work hours = emails/messaging; evenings = social media/entertainment; weekends = occasionally, once per hour to be present' }
                    },
                    {
                        question: 'Do you watch TV regularly?',
                        sampleAnswer: 'Yes, I watch TV quite regularly - about 1-2 hours each evening after dinner. On weekdays, I usually stick to one or two episodes of a series because I have limited time before bed. However, on weekends, I sometimes binge-watch shows for 3-4 hours, especially if it\'s a new season of something I\'ve been waiting for. Occasionally, during busy work weeks, I might skip TV entirely for a few days.',
                        frequency: { main: 'regularly, 1-2 hours nightly', variations: 'weekdays = 1-2 episodes only; weekends = 3-4 hour binges; busy weeks = skip entirely' }
                    },
                    {
                        question: 'How often do you go shopping?',
                        sampleAnswer: 'I go grocery shopping once a week, typically on Saturday mornings when stores are less crowded. For clothes and other items, I shop much less frequently - maybe once every 2-3 months or only when I need something specific. Online shopping is more frequent though, probably 2-3 times a month for various items. During sale seasons, I admit I shop more often, sometimes weekly, to catch good deals.',
                        frequency: { main: 'groceries weekly; clothes every 2-3 months; online 2-3 times monthly', variations: 'Saturday mornings for groceries; only when needed for clothes; sale seasons = weekly for deals' }
                    },
                    {
                        question: 'Do you read books often?',
                        sampleAnswer: 'I read daily, usually for about 30-45 minutes before bed. During the week, I stick to lighter fiction that\'s easy to follow when I\'m tired. On weekends, I sometimes read for longer stretches, up to 2 hours at a time, especially if the book is really engaging. During holidays, my reading increases significantly - I can finish a book every 2-3 days when I have free time.',
                        frequency: { main: 'daily 30-45 minutes before bed', variations: 'weekdays = light fiction; weekends = up to 2 hours if engaging; holidays = book every 2-3 days' }
                    },
                    {
                        question: 'How frequently do you see your friends?',
                        sampleAnswer: 'I see my close friends about 2-3 times a month, usually on weekends for dinner or coffee. With work colleagues, we occasionally grab lunch together once or twice a week. During busy periods like exam seasons or project deadlines, I might not see friends for 2-3 weeks. However, we stay in touch daily through messaging even when we can\'t meet in person.',
                        frequency: { main: 'close friends 2-3 times monthly; colleagues 1-2 times weekly', variations: 'weekends for dinner/coffee; busy periods = 2-3 weeks gap; daily messaging regardless' }
                    },
                    {
                        question: 'Do you use social media much?',
                        sampleAnswer: 'I use social media moderately - about 30-60 minutes total per day, spread throughout the day. In the morning, I spend 10-15 minutes scrolling through updates while having coffee. During lunch breaks, I check for about 15-20 minutes. In the evening, I might spend 20-30 minutes catching up on posts and stories. I deliberately avoid social media after 9 PM to maintain better sleep.',
                        frequency: { main: '30-60 minutes daily, spread out', variations: 'morning 10-15 min with coffee; lunch 15-20 min; evening 20-30 min; after 9 PM = avoid for sleep' }
                    },
                    {
                        question: 'How often do you travel?',
                        sampleAnswer: 'I take major trips about 2-3 times a year, usually during holiday seasons and my annual leave. For weekend getaways to nearby cities, I travel more frequently, roughly once every 2 months. Business trips happen occasionally, maybe 3-4 times a year depending on work requirements. During summer, my travel frequency peaks - I might take 2-3 trips in just that season.',
                        frequency: { main: 'major trips 2-3 times yearly; weekend getaways every 2 months', variations: 'holidays and annual leave; business 3-4 times yearly; summer peak = 2-3 trips in season' }
                    },
                    {
                        question: 'Do you cook regularly?',
                        sampleAnswer: 'Yes, I cook almost every day - typically 5-6 days a week for dinner. On weeknights, I prepare simple meals like stir-fries or pasta that take 20-30 minutes. Weekends are when I cook more elaborate dishes and might spend 1-2 hours trying new recipes. On particularly busy or exhausting days, I order takeout instead, which happens maybe once a week.',
                        frequency: { main: 'almost daily, 5-6 days weekly', variations: 'weeknights = simple 20-30 min meals; weekends = elaborate 1-2 hour recipes; once weekly = takeout when busy/tired' }
                    },
                    {
                        question: 'How often do you exercise?',
                        sampleAnswer: 'I exercise 4-5 times a week, usually in the morning before work. Three of those days, I do cardio like running or cycling for 30-40 minutes. The other 1-2 days, I focus on strength training or yoga for about 45 minutes. Occasionally, when I\'m traveling or very busy, I might miss a week entirely, but I always get back to my routine as soon as possible.',
                        frequency: { main: '4-5 times weekly, morning before work', variations: '3 days cardio 30-40 min; 1-2 days strength/yoga 45 min; travel/busy = might miss full week but resume' }
                    },
                    {
                        question: 'Do you go to the cinema much?',
                        sampleAnswer: 'I go to the cinema about once a month on average, though it varies depending on movie releases. When there are several good movies out, I might go 2-3 times in a month. During quiet periods with fewer interesting releases, I might not go for 2-3 months. I typically go on weekend evenings to avoid crowds, and occasionally for weekday matinees when I have time off.',
                        frequency: { main: 'about once monthly average', variations: 'good releases = 2-3 times monthly; quiet periods = skip 2-3 months; weekend evenings usual; occasional weekday matinees' }
                    },
                    {
                        question: 'How frequently do you eat fast food?',
                        sampleAnswer: 'I eat fast food fairly rarely - maybe 2-3 times a month at most. It\'s usually when I\'m in a rush and need a quick meal between appointments. On road trips or when traveling, I might have it more frequently, perhaps once a day if there aren\'t better options. However, I actively try to avoid it during normal weeks because I prefer healthier options.',
                        frequency: { main: 'rarely, 2-3 times monthly max', variations: 'when rushing between appointments; road trips = once daily if limited options; normal weeks = actively avoid for health' }
                    },
                    {
                        question: 'Do you listen to music often?',
                        sampleAnswer: 'Yes, I listen to music almost constantly - probably 4-6 hours a day in total. During my morning and evening commutes, I always have music or podcasts playing for about an hour each way. While working, I play instrumental music in the background for 4-5 hours to help concentration. At the gym, I listen to upbeat music for 30-45 minutes. Only during meetings or focused tasks do I not listen to anything.',
                        frequency: { main: 'almost constantly, 4-6 hours daily', variations: 'commute 1 hour each way; work 4-5 hours instrumental; gym 30-45 min upbeat; silent during meetings/focused work' }
                    },
                    {
                        question: 'How often do you clean your room?',
                        sampleAnswer: 'I do light cleaning daily - making my bed every morning and tidying up clutter each evening before bed. A more thorough cleaning happens once a week, usually on Sunday mornings, including vacuuming, dusting, and organizing. Deep cleaning with tasks like washing windows or reorganizing closets happens monthly or every 6 weeks. When I\'m very busy with work, I might skip the weekly deep clean and just do the daily maintenance.',
                        frequency: { main: 'light daily; thorough weekly; deep monthly', variations: 'bed + clutter daily; Sunday thorough cleaning; windows/closets every 6 weeks; busy times = skip thorough, keep daily' }
                    },
                    {
                        question: 'Do you play sports regularly?',
                        sampleAnswer: 'Yes, I play badminton regularly - twice a week on Tuesday and Thursday evenings at a local sports center. During summer, I increase to three times a week because the weather is nice and I have more energy. In winter, sometimes I reduce to once a week or take breaks when it\'s too cold or I\'m not feeling well. Occasionally, I also play casual games with friends on weekends, though this is less regular.',
                        frequency: { main: 'regularly twice weekly, Tuesday/Thursday evenings', variations: 'summer = three times weekly; winter = once weekly or breaks; occasional weekend casual games' }
                    },
                    {
                        question: 'How often do you check your email?',
                        sampleAnswer: 'I check my work email constantly during office hours - probably every 30 minutes to stay on top of important messages. First thing in the morning, I spend 15-20 minutes going through overnight emails. Throughout the workday, I check it briefly between tasks. Personal email, I check much less frequently - usually once in the evening and maybe once on weekend mornings. During vacations, I try to check work email only once daily, just for urgent matters.',
                        frequency: { main: 'work email every 30 min during office hours; personal once evening + weekend mornings', variations: 'morning 15-20 min review; between tasks brief checks; vacations = once daily urgent only' }
                    }
                ],
                aiPromptTemplate: `Student learned Frequency + Details method.

Question: {{question}}
Student answer: {{studentResponse}}

Check:
⏰ Frequency: Did they specify how often? (used frequency words?)
📝 Details: Did they add specific circumstances?
🔄 Variations: Did they mention different scenarios/exceptions?
🎯 Specificity: Concrete details vs vague statements?
📊 Band Estimate: [5.5-7.5]

Provide feedback showing how to add more specific variations if needed.`
            },
            {
                id: 'm2_selection_guide',
                type: 'interactive_guide',
                title: 'Technique Selection Guide',
                description: 'Learn when to use which technique for maximum impact',
                content: {
                    guide: [
                        {
                            questionType: 'Opinion/Preference Questions (Do you think...? Do you prefer...?)',
                            bestTechniques: ['PREP Method', 'Contrast Technique'],
                            reason: 'PREP gives clear structure for opinions. Contrast shows nuanced thinking.'
                        },
                        {
                            questionType: 'Habit/Frequency Questions (How often...? Do you usually...?)',
                            bestTechniques: ['Frequency + Details', '5W1H'],
                            reason: 'Frequency + Details directly addresses the question. 5W1H adds depth.'
                        },
                        {
                            questionType: 'Change Over Time (Have your habits changed...?)',
                            bestTechniques: ['Past vs Present', '5W1H'],
                            reason: 'Past vs Present is perfect for showing development over time.'
                        },
                        {
                            questionType: 'About "People" or "Your Country" (Do people in your country...?)',
                            bestTechniques: ['Personal + General', 'Contrast'],
                            reason: 'Personal + General shows sophisticated thinking. Contrast shows awareness of differences.'
                        },
                        {
                            questionType: 'Experience Questions (What do you enjoy...? How do you feel...?)',
                            bestTechniques: ['Feelings + Reasons', '5W1H'],
                            reason: 'Feelings + Reasons creates engaging, authentic answers.'
                        },
                        {
                            questionType: 'Any General Question',
                            bestTechniques: ['5W1H', 'PREP'],
                            reason: 'These are versatile techniques that work for almost any question.'
                        }
                    ]
                },
                practiceSection: {
                    instructions: 'Look at each question and decide which technique would work best. Then answer using that technique.',
                    questions: [
                        { q: 'Do you think children should spend more time outdoors?', type: 'opinion' },
                        { q: 'How has technology changed the way you communicate?', type: 'change' },
                        { q: 'Do people in your country enjoy cooking?', type: 'people' },
                        { q: 'How often do you visit your relatives?', type: 'frequency' },
                        { q: 'What makes you feel motivated to work hard?', type: 'experience' }
                    ]
                }
            },
            {
                id: 'm2_mixed_practice',
                type: 'ai_conversation',
                title: 'Mixed Practice: Use Different Techniques',
                instructions: 'Practice Part 1 with variety. Try to use DIFFERENT techniques for each question to show versatility.',
                conversationSettings: {
                    numberOfQuestions: 8,
                    focusArea: 'technique_variety',
                    feedbackStyle: 'technique_identification'
                },
                aiSystemPrompt: `You are an IELTS examiner. The student learned 6 techniques:
1. 5W1H (Who, What, When, Where, Why, How)
2. PREP (Point, Reason, Example, Point)
3. Past vs Present Comparison
4. Personal + General Approach
5. Contrast Technique
6. Feelings + Reasons Method
7. Frequency + Details

Conduct Part 1 with 8 questions covering different question types.

After EACH answer:
1. Identify which technique(s) they used
2. Brief praise for what worked well
3. Suggest which technique might have been even better if they chose a suboptimal one

After ALL 8 questions:
Give comprehensive feedback:
- Technique variety score (did they mix techniques?)
- Band estimate (6.0-8.0)
- Strengths (2-3 points)
- Suggestions for improvement

Encourage versatility and natural use of different approaches.`
            }
        ]
    },

    // Module 3: Building Better Sentences (Part 1)
    module3: {
        id: 'module3',
        title: 'Building Better Sentences',
        duration: 25,
        description: 'Transform simple sentences into Band 7+ responses',

        sections: [
            {
                id: 'm3_intro',
                type: 'audio_lesson',
                title: 'From Ideas to Sentences',
                audioScript: {
                    text: `Now you know how to generate ideas quickly using the 5W1H method. But how do you turn those ideas into impressive sentences? Many students know WHAT to say but struggle with HOW to say it effectively. In this module, I'll teach you how to transform basic sentences into Band 7 and Band 8 level responses. The secret is not about using complicated words or grammar - it's about adding detail, connecting ideas smoothly, and speaking naturally. Let's start with a simple example and gradually build it up together.`,
                    duration: 40
                }
            },
            {
                id: 'm3_transformation',
                type: 'audio_lesson',
                title: 'The Sentence Transformation Technique',
                audioScript: {
                    text: `Let's take a basic sentence: "I like reading." This is Band 5 level - it's grammatically correct but very simple. How do we improve it? Step one: upgrade the verb. Instead of "like," try "enjoy," "love," or "am really into." So: "I really enjoy reading." Better! Step two: add specificity. What do you read? "I really enjoy reading mystery novels." Even better! Step three: add when or where. "I really enjoy reading mystery novels, especially before bed." Step four: add why or how it makes you feel. "I really enjoy reading mystery novels, especially before bed, as they help me unwind after a long day." Now we have a Band 7 response! Same idea, but we've added layers of detail that make it more interesting and natural. The technique is: Basic verb, then WHAT specifically, then WHEN or WHERE, then WHY or HOW you feel. Let's practice this together.`,
                    duration: 70
                },
                content: {
                    transformation: {
                        level1: { band: 5.0, text: 'I like reading.' },
                        level2: { band: 5.5, text: 'I really enjoy reading.' },
                        level3: { band: 6.0, text: 'I really enjoy reading mystery novels.' },
                        level4: { band: 6.5, text: 'I really enjoy reading mystery novels, especially before bed.' },
                        level5: { band: 7.0, text: 'I really enjoy reading mystery novels, especially before bed, as they help me unwind after a long day.' }
                    }
                }
            },
            {
                id: 'm3_connectors',
                type: 'audio_lesson',
                title: 'Using Connectors Naturally',
                audioScript: {
                    text: `Good speakers use connectors to link their ideas smoothly. But here's the key: don't force them in artificially. Use them when they naturally fit. For adding information, use: "and," "also," "as well," "moreover." For contrasting, use: "but," "however," "on the other hand," "although." For giving reasons, use: "because," "since," "as," "due to the fact that." For giving examples: "for example," "for instance," "such as," "like." For sequencing: "first," "then," "after that," "finally." The mistake students make is trying to use too many fancy connectors. It sounds unnatural. Choose simple, common ones and use them confidently. Let me demonstrate with our reading example: "I really enjoy reading, particularly mystery novels. Also, I find that reading before bed helps me relax. For instance, last night I finished a thriller that kept me engaged for hours." See? Natural and flowing, not forced.`,
                    duration: 65
                },
                content: {
                    connectorTypes: {
                        adding: ['and', 'also', 'as well', 'moreover', 'furthermore'],
                        contrasting: ['but', 'however', 'on the other hand', 'although', 'while'],
                        reason: ['because', 'since', 'as', 'due to'],
                        example: ['for example', 'for instance', 'such as', 'like'],
                        sequence: ['first', 'then', 'after that', 'finally', 'eventually']
                    }
                }
            },
            {
                id: 'm3_practice1',
                type: 'ai_practice',
                title: 'Sentence Building Practice (25 Exercises)',
                instructions: 'Transform basic sentences into Band 7+ responses. Add: better verbs, specific details, WHEN/WHERE, and WHY/HOW you feel.',
                exercises: [
                    // Hobbies & Interests (5)
                    {
                        basic: 'I like sports.',
                        topic: 'sports',
                        hints: ['What sports?', 'When do you play?', 'How does it make you feel?']
                    },
                    {
                        basic: 'I watch movies.',
                        topic: 'movies',
                        hints: ['What kind of movies?', 'When/where do you watch?', 'Why do you like them?']
                    },
                    {
                        basic: 'I listen to music.',
                        topic: 'music',
                        hints: ['What genre?', 'When do you listen?', 'How does it affect you?']
                    },
                    {
                        basic: 'I like reading.',
                        topic: 'reading',
                        hints: ['What do you read?', 'When?', 'Why do you enjoy it?']
                    },
                    {
                        basic: 'I have hobbies.',
                        topic: 'hobbies',
                        hints: ['What hobbies?', 'How often?', 'What do you get from them?']
                    },

                    // Daily Activities (5)
                    {
                        basic: 'I enjoy cooking.',
                        topic: 'cooking',
                        hints: ['What do you cook?', 'When do you cook?', 'Why do you enjoy it?']
                    },
                    {
                        basic: 'I exercise regularly.',
                        topic: 'exercise',
                        hints: ['What exercise?', 'Where/when?', 'What benefits?']
                    },
                    {
                        basic: 'I use my phone.',
                        topic: 'phone',
                        hints: ['What for?', 'How often?', 'Is it useful?']
                    },
                    {
                        basic: 'I spend time with friends.',
                        topic: 'friends',
                        hints: ['What do you do together?', 'How often?', 'Why is it important?']
                    },
                    {
                        basic: 'I shop online.',
                        topic: 'shopping',
                        hints: ['What do you buy?', 'How often?', 'Why prefer online?']
                    },

                    // Work & Study (5)
                    {
                        basic: 'I study English.',
                        topic: 'study',
                        hints: ['How?', 'When?', 'Why?']
                    },
                    {
                        basic: 'I like my job.',
                        topic: 'work',
                        hints: ['What job?', 'What do you like about it?', 'How long?']
                    },
                    {
                        basic: 'I learn new things.',
                        topic: 'learning',
                        hints: ['What things?', 'How?', 'Why important?']
                    },
                    {
                        basic: 'I work hard.',
                        topic: 'work ethic',
                        hints: ['How hard?', 'Why?', 'What results?']
                    },
                    {
                        basic: 'I want to improve.',
                        topic: 'improvement',
                        hints: ['Improve what?', 'How?', 'What goals?']
                    },

                    // Places & Travel (5)
                    {
                        basic: 'I like traveling.',
                        topic: 'travel',
                        hints: ['Where?', 'How often?', 'What do you gain?']
                    },
                    {
                        basic: 'I live in a city.',
                        topic: 'city',
                        hints: ['Which city?', 'What\'s it like?', 'Do you like it?']
                    },
                    {
                        basic: 'I visit parks.',
                        topic: 'parks',
                        hints: ['Which parks?', 'When?', 'What do you do there?']
                    },
                    {
                        basic: 'My hometown is nice.',
                        topic: 'hometown',
                        hints: ['Where is it?', 'What makes it nice?', 'Do you miss it?']
                    },
                    {
                        basic: 'I like nature.',
                        topic: 'nature',
                        hints: ['What aspects?', 'Where do you experience it?', 'How does it make you feel?']
                    },

                    // Technology & Modern Life (5)
                    {
                        basic: 'I use social media.',
                        topic: 'social media',
                        hints: ['Which platforms?', 'What for?', 'How much time?']
                    },
                    {
                        basic: 'Technology is important.',
                        topic: 'technology',
                        hints: ['How is it important?', 'Examples?', 'Impact on your life?']
                    },
                    {
                        basic: 'I watch videos online.',
                        topic: 'online videos',
                        hints: ['What videos?', 'How often?', 'Why?']
                    },
                    {
                        basic: 'I play video games.',
                        topic: 'gaming',
                        hints: ['What games?', 'When?', 'Why enjoyable?']
                    },
                    {
                        basic: 'I prefer digital books.',
                        topic: 'e-books',
                        hints: ['Why prefer digital?', 'What device?', 'What advantages?']
                    }
                ],
                aiPromptTemplate: `The student learned to transform simple sentences by:
1. Upgrading verbs (like → enjoy/love/am into)
2. Adding WHAT specifically
3. Adding WHEN or WHERE
4. Adding WHY or HOW they feel

Basic sentence: {{basicSentence}}
Student's improved version: {{studentResponse}}

As an IELTS teacher, provide:
📊 Band Level: [5.0-8.0] with brief reason
✓ Strengths: What they did well (be specific)
→ One Improvement: Specific suggestion for next band level
✏️ Enhanced Version: Show improved sentence
📚 Why Better: Brief explanation

Be encouraging and specific. Keep it concise.`
            },
            {
                id: 'm3_realtime',
                type: 'interactive_builder',
                title: 'Interactive Sentence Builder',
                description: 'Build sentences step-by-step with real-time AI coaching',
                template: {
                    step1: 'Choose your main verb',
                    step2: 'Add specific details (WHAT)',
                    step3: 'Add WHEN or WHERE',
                    step4: 'Add WHY or HOW you feel'
                }
            },
            {
                id: 'm3_practice2',
                type: 'ai_conversation',
                title: 'Practice with AI Teacher',
                instructions: 'The AI teacher will ask you Part 1 questions. Respond using the techniques you learned.',
                conversationSettings: {
                    numberOfQuestions: 4,
                    focusArea: 'sentence_building',
                    feedbackStyle: 'encouraging_specific'
                },
                aiSystemPrompt: `You are an IELTS speaking teacher practicing with a student who just learned:
1. The 5W1H method for generating ideas
2. The sentence transformation technique (add detail, when/where, why/how)
3. Using connectors naturally

Conduct a mini Part 1 interview:
- Ask 4 common IELTS Part 1 questions
- After each response, give BRIEF feedback (1-2 sentences)
- Highlight what they did well
- Suggest one small improvement if needed
- Then ask the next question naturally

Be warm, encouraging, and specific. Keep feedback concise.`
            }
        ]
    },

    // Module 4: Mastering Part 2 (Cue Card)
    module4: {
        id: 'module4',
        title: 'Mastering Part 2: The Cue Card',
        duration: 30,
        description: 'Learn how to speak for 2 minutes confidently on any topic',

        sections: [
            {
                id: 'm4_intro',
                type: 'audio_lesson',
                title: 'Understanding Part 2',
                audioScript: {
                    text: `Part 2 is different from Part 1. The examiner gives you a topic card with four bullet points. You have one minute to prepare, then you must speak for up to two minutes. Many students find this challenging because two minutes feels like a long time! But with the right strategy, you'll find two minutes passes quickly. The key is having a clear structure in your mind. In this module, I'll teach you exactly how to use that one-minute preparation time, how to organize your thoughts, and how to keep speaking naturally for two minutes without running out of ideas. Let's start with the preparation strategy.`,
                    duration: 45
                }
            },
            {
                id: 'm4_prep_strategy',
                type: 'audio_lesson',
                title: 'The One-Minute Preparation Strategy',
                audioScript: {
                    text: `You have one minute to prepare and you can make notes. Here's exactly what to do in those 60 seconds. Spend 10 seconds reading the topic carefully and understanding all four bullet points. Spend 30 seconds making quick notes for each bullet point - just keywords, not full sentences. Spend 10 seconds deciding your opening and conclusion. And keep 10 seconds to take a breath and feel ready. Let me show you an example. Topic: Describe a person who influenced you. Bullet points: who, how you know them, what they did, why important. My notes might look like: "Mrs. Chen - high school teacher - encouraged reading - opened new world - grateful." Just keywords! Don't write sentences. These keywords will trigger your memory when you speak. The mistake students make is trying to write too much. You don't have time, and you don't need to. Keywords are enough.`,
                    duration: 65
                },
                content: {
                    timeBreakdown: {
                        reading: '10 seconds - Read and understand',
                        notes: '30 seconds - Keyword notes for each point',
                        structure: '10 seconds - Plan opening/closing',
                        prepare: '10 seconds - Mental preparation'
                    },
                    exampleNotes: {
                        topic: 'Describe a person who influenced you',
                        notes: ['Mrs. Chen', 'high school English', 'encouraged reading', 'recommended books', 'opened new perspectives', 'grateful, inspired']
                    }
                }
            },
            {
                id: 'm4_structure',
                type: 'audio_lesson',
                title: 'The 2-Minute Structure',
                audioScript: {
                    text: `Here's a reliable structure for your two-minute response. Spend about 15 seconds on a brief introduction - state what you'll talk about. Then spend about 20-30 seconds on each of the four bullet points from the card. That's roughly two minutes total. For each bullet point, give specific details and examples. Don't just say "She was kind" - say "She was incredibly kind; for example, she would stay after class to help students who were struggling." The more specific you are, the easier it is to fill two minutes. Finally, end with a brief conclusion if you have time - maybe 10 seconds summarizing why this topic is meaningful to you. Remember, if you finish before two minutes, that's okay! The examiner might ask a follow-up question. The goal is to speak naturally and confidently, not to hit exactly 120 seconds. Quality matters more than hitting a specific time.`,
                    duration: 60
                },
                content: {
                    structure: [
                        { section: 'Introduction', time: '15 seconds', tip: 'State your topic clearly' },
                        { section: 'Point 1', time: '20-30 seconds', tip: 'Give specific details and examples' },
                        { section: 'Point 2', time: '20-30 seconds', tip: 'Use connectors to link ideas' },
                        { section: 'Point 3', time: '20-30 seconds', tip: 'Add personal feelings/reactions' },
                        { section: 'Point 4', time: '20-30 seconds', tip: 'Explain significance/impact' },
                        { section: 'Conclusion (optional)', time: '10 seconds', tip: 'Brief summary or reflection' }
                    ]
                }
            },
            {
                id: 'm4_demo',
                type: 'audio_lesson',
                title: 'Full Demonstration',
                audioScript: {
                    text: `Let me demonstrate a complete Part 2 response. The topic is: Describe a place you like to visit. You should say: where it is, how often you go there, what you do there, and why you like it. I'll speak for about two minutes. Here we go: "I'd like to talk about a small café near my home that I visit quite regularly. It's located just a ten-minute walk from where I live, tucked away on a quiet side street. I try to go there at least once or twice a week, usually on weekend mornings when I have more free time. What I really enjoy about this place is the peaceful atmosphere. When I'm there, I usually bring a book or my laptop, order a cappuccino, and spend a couple of hours either reading or working on personal projects. The café has large windows that let in natural light, and they play soft jazz music in the background, which helps me concentrate. The staff are really friendly too, and they remember my usual order, which makes me feel welcome. The reason I like this café so much is that it's become my go-to place when I need to escape from the busy pace of life. Unlike working at home where I can get distracted, or going to a crowded coffee chain, this café strikes the perfect balance. It's quiet enough to focus but has enough gentle background activity to keep me motivated. It's become almost like a second home for me, a place where I can be productive and relaxed at the same time." Notice how I addressed all four points with specific details, and I spoke naturally without rushing. That was about two minutes.`,
                    duration: 95
                },
                transcript: `I'd like to talk about a small café near my home that I visit quite regularly. It's located just a ten-minute walk from where I live, tucked away on a quiet side street. I try to go there at least once or twice a week, usually on weekend mornings when I have more free time.

What I really enjoy about this place is the peaceful atmosphere. When I'm there, I usually bring a book or my laptop, order a cappuccino, and spend a couple of hours either reading or working on personal projects. The café has large windows that let in natural light, and they play soft jazz music in the background, which helps me concentrate. The staff are really friendly too, and they remember my usual order, which makes me feel welcome.

The reason I like this café so much is that it's become my go-to place when I need to escape from the busy pace of life. Unlike working at home where I can get distracted, or going to a crowded coffee chain, this café strikes the perfect balance. It's quiet enough to focus but has enough gentle background activity to keep me motivated. It's become almost like a second home for me, a place where I can be productive and relaxed at the same time.`
            },
            {
                id: 'm4_practice1',
                type: 'ai_practice',
                title: 'Practice: Making Notes',
                instructions: 'You have 1 minute to make notes for this topic. Type your keyword notes, then the AI will give feedback.',
                cueCard: {
                    topic: 'Describe a skill you would like to learn',
                    points: [
                        'What the skill is',
                        'Why you want to learn it',
                        'How you would learn it',
                        'And explain how learning this skill would benefit you'
                    ]
                },
                timerDuration: 60,
                aiPromptTemplate: `The student practiced making keyword notes for a Part 2 cue card (1-minute prep time).

Cue card topic: {{topic}}
Four points: {{points}}
Student's notes: {{studentNotes}}

As their teacher:
1. Check if they have notes for all four points
2. Evaluate if notes are appropriate (keywords, not full sentences)
3. Suggest if any notes could be more specific
4. Praise what they did well

Keep feedback brief and constructive.`
            },
            {
                id: 'm4_practice2',
                type: 'ai_practice',
                title: 'Practice: Full Response',
                instructions: 'Now speak/type your full 2-minute response based on your notes. The AI will analyze your structure and content.',
                practiceMode: 'full_response',
                cueCards: [
                    {
                        topic: 'Describe a memorable journey you have made',
                        points: ['Where you went', 'Who you went with', 'What you did during the journey', 'Why it was memorable']
                    },
                    {
                        topic: 'Describe a hobby you had as a child',
                        points: ['What the hobby was', 'When you started it', 'How often you did it', 'Why you enjoyed it']
                    }
                ],
                aiPromptTemplate: `Student learned the Part 2 structure: brief intro, 20-30s per bullet point, specific details, optional conclusion.

Their response: {{studentResponse}}

Analyze and provide:
1. Estimated speaking time (word count ÷ 150 words/min)
2. Did they address all four points?
3. Band estimate (6.0-8.0) based on structure, detail, coherence
4. One strength and one improvement suggestion
5. Specific example of how to improve one section

Be constructive and encouraging.`
            }
        ]
    },

    // Module 5: Part 3 Discussion Skills
    module5: {
        id: 'module5',
        title: 'Part 3: Discussion Skills',
        duration: 25,
        description: 'Master abstract questions and give sophisticated answers',

        sections: [
            {
                id: 'm5_intro',
                type: 'audio_lesson',
                title: 'Understanding Part 3',
                audioScript: {
                    text: `Part 3 is the most challenging section because the questions become more abstract and complex. The examiner asks about broader issues related to your Part 2 topic. For example, if you talked about a teacher who influenced you, Part 3 might ask: "Do you think teachers or parents have more influence on children?" These questions require you to discuss ideas, give opinions, and explain reasons in more depth. But don't worry - you've already learned the fundamental skills you need. In Part 3, we'll build on your idea generation and sentence building skills, and add strategies for handling abstract topics, giving balanced viewpoints, and sounding sophisticated without using complicated vocabulary. Let's begin.`,
                    duration: 50
                }
            },
            {
                id: 'm5_strategies',
                type: 'audio_lesson',
                title: 'Answer Strategies for Part 3',
                audioScript: {
                    text: `Here are three powerful strategies for Part 3 questions. Strategy One: The Direct Answer Plus. Start with a direct answer to the question, then expand with reasons and examples. For instance: "Do teachers have more influence than parents?" Answer: "I think both play crucial roles, but parents probably have more lasting influence." Then explain why. Strategy Two: The Two-Sides Approach. For comparison questions, discuss both sides before giving your opinion. "On one hand, teachers provide academic knowledge. On the other hand, parents shape core values. Personally, I believe..." This shows balanced thinking. Strategy Three: The Past-Present-Future method. For questions about changes or trends, structure your answer across time. "In the past, families were larger. Nowadays, many couples have fewer children. In the future, this trend will likely continue because..." These three strategies will help you organize your thoughts quickly and speak coherently for the longer answers Part 3 requires.`,
                    duration: 70
                },
                content: {
                    strategies: [
                        {
                            name: 'Direct Answer Plus',
                            structure: 'Direct answer → Reason 1 → Example 1 → Reason 2 → Example 2',
                            example: 'Question: Is technology making us less social?\nAnswer: I don\'t think so. While some people spend a lot of time online, technology actually helps us stay connected with distant friends and family. For example, I video call my grandmother weekly, which wouldn\'t be possible otherwise.'
                        },
                        {
                            name: 'Two-Sides Approach',
                            structure: 'On one hand... → On the other hand... → Personally, I think...',
                            example: 'Question: Should universities be free?\nAnswer: On one hand, free education would give everyone equal opportunities. On the other hand, universities need funding for quality programs. Personally, I think a mixed system works best, where talented students get scholarships but others contribute based on their means.'
                        },
                        {
                            name: 'Past-Present-Future',
                            structure: 'In the past... → Nowadays/Currently... → In the future...',
                            example: 'Question: How has technology changed education?\nAnswer: In the past, students relied entirely on textbooks and teachers. Nowadays, they can access online courses and resources from anywhere. In the future, I think AI will personalize learning even more, adapting to each student\'s pace.'
                        }
                    ]
                }
            },
            {
                id: 'm5_language',
                type: 'audio_lesson',
                title: 'Language for Abstract Discussions',
                audioScript: {
                    text: `Part 3 requires slightly more sophisticated language, but you don't need fancy vocabulary - you need clear expressions for discussing ideas. For giving opinions, use: "I believe," "I think," "In my opinion," "From my perspective," "It seems to me that." For adding nuance, use: "to some extent," "generally speaking," "in most cases," "it depends on." For contrasting: "whereas," "while," "although," "despite the fact that." For showing cause and effect: "As a result," "Consequently," "This leads to," "Due to this." And for speculating about possibilities: "might," "could," "it's possible that," "there's a chance that." Practice using these expressions naturally, and you'll sound more sophisticated without memorizing complex vocabulary. The key is clarity and coherence, not complicated words.`,
                    duration: 60
                },
                content: {
                    languageFunctions: {
                        opinion: ['I believe', 'I think', 'In my opinion', 'From my perspective', 'It seems to me that', 'I would say that'],
                        nuance: ['to some extent', 'generally speaking', 'in most cases', 'it depends on', 'to a certain degree'],
                        contrast: ['whereas', 'while', 'although', 'despite', 'however', 'on the contrary'],
                        causeEffect: ['as a result', 'consequently', 'therefore', 'this leads to', 'due to', 'because of this'],
                        speculation: ['might', 'could', 'may', 'it\'s possible that', 'perhaps', 'there\'s a chance that']
                    }
                }
            },
            {
                id: 'm5_practice1',
                type: 'ai_practice',
                title: 'Strategy Practice',
                instructions: 'Answer this Part 3 question using one of the three strategies. The AI will identify which strategy you used and give feedback.',
                questions: [
                    'Do you think children today have better educational opportunities than previous generations?',
                    'Should governments spend more money on arts or sports?',
                    'How has social media affected the way people communicate?'
                ],
                aiPromptTemplate: `Student learned three Part 3 strategies:
1. Direct Answer Plus (answer → reasons → examples)
2. Two-Sides Approach (one hand → other hand → personal view)
3. Past-Present-Future (temporal structure)

Question: {{question}}
Student's answer: {{studentResponse}}

Analyze:
1. Which strategy did they use (or attempt)?
2. Did they execute it well?
3. Band estimate (6.0-8.0)
4. One specific improvement
5. Example of enhanced phrasing for one part

Be specific and encouraging.`
            },
            {
                id: 'm5_practice2',
                type: 'ai_conversation',
                title: 'Part 3 Simulation',
                instructions: 'Practice a full Part 3 discussion with the AI examiner. Try to use the strategies and language you learned.',
                conversationSettings: {
                    numberOfQuestions: 5,
                    difficulty: 'progressive',
                    feedbackTiming: 'after_all_questions'
                },
                aiSystemPrompt: `You are an IELTS examiner conducting Part 3. The student just learned:
1. Three answer strategies (Direct Answer Plus, Two-Sides, Past-Present-Future)
2. Sophisticated expressions for opinions, contrast, cause-effect, speculation

Conduct Part 3:
- Ask 5 progressively more abstract questions
- Questions should relate to education, technology, society, or culture
- Let the student answer without interruption
- After all 5 questions, provide comprehensive feedback:
  * Overall band estimate (6.0-8.0)
  * Strengths (2-3 points)
  * Areas for improvement (2-3 points)
  * Specific examples from their responses
  * Actionable tips

During questions: Just ask, don't give feedback yet.
After all questions: Give detailed, constructive feedback.`
            },
            {
                id: 'm5_advanced',
                type: 'ai_practice',
                title: 'Advanced Challenge',
                instructions: 'Handle difficult Part 3 questions that students often struggle with. The AI will help you improve your response.',
                challengeQuestions: [
                    'What role should tradition play in modern society?',
                    'Do you think economic growth is always beneficial for a country?',
                    'How can societies balance individual freedom with collective responsibility?',
                    'Is it more important for a country to focus on current problems or future development?'
                ],
                aiPromptTemplate: `This is an advanced Part 3 question requiring sophisticated thinking.

Question: {{question}}
Student's answer: {{studentResponse}}

Provide detailed feedback:
1. Content: Did they address the question thoughtfully?
2. Structure: Was their answer well-organized?
3. Language: Did they use appropriate expressions?
4. Band estimate with justification
5. Specific suggestions for improvement
6. A model response showing how to enhance their answer

Be thorough and constructive. Show them how to elevate their response.`
            }
        ]
    }
};

// Lesson progress management
class LessonProgress {
    constructor() {
        this.storageKey = LESSON_CONSTANTS.STORAGE_KEY;
        this.progress = this.load();
    }

    load() {
        const saved = localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : {
            completedSections: [],
            moduleProgress: {},
            practiceScores: {},
            totalTimeSpent: 0,
            lastAccessed: null
        };
    }

    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
    }

    markSectionComplete(moduleId, sectionId) {
        const key = `${moduleId}_${sectionId}`;
        if (!this.progress.completedSections.includes(key)) {
            this.progress.completedSections.push(key);
        }
        this.updateModuleProgress(moduleId);
        this.save();
    }

    updateModuleProgress(moduleId) {
        const module = IELTS_LESSONS[moduleId];
        if (!module) return;

        const totalSections = module.sections.length;
        const completedSections = this.progress.completedSections.filter(
            key => key.startsWith(moduleId)
        ).length;

        this.progress.moduleProgress[moduleId] = {
            completed: completedSections,
            total: totalSections,
            percentage: Math.round((completedSections / totalSections) * 100)
        };
    }

    savePracticeScore(sectionId, score) {
        if (!this.progress.practiceScores[sectionId]) {
            this.progress.practiceScores[sectionId] = [];
        }
        this.progress.practiceScores[sectionId].push({
            score,
            timestamp: Date.now()
        });
        this.save();
    }

    isSectionComplete(moduleId, sectionId) {
        return this.progress.completedSections.includes(`${moduleId}_${sectionId}`);
    }

    getModuleProgress(moduleId) {
        return this.progress.moduleProgress[moduleId] || { completed: 0, total: 0, percentage: 0 };
    }

    updateLastAccessed() {
        this.progress.lastAccessed = Date.now();
        this.save();
    }

    reset() {
        localStorage.removeItem(this.storageKey);
        this.progress = this.load();
    }
}

// Export to window for global access
if (typeof window !== 'undefined') {
    window.IELTS_LESSONS = IELTS_LESSONS;
    window.LESSON_CONSTANTS = LESSON_CONSTANTS;
}

// Initialize progress tracker
if (typeof window !== 'undefined') {
    window.lessonProgress = new LessonProgress();
}
