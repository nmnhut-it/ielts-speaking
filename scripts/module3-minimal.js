/**
 * Module 3: IELTS Speaking Part 2 - Long Turn (Cue Card)
 * Teaches 2-minute continuous speaking strategies
 */

// Connector examples for each strategy
const CONNECTOR_EXAMPLES = {
    star: `<strong>STAR Structure Connectors:</strong><br><br>
<strong>Starting (Situation):</strong><br>
• I'd like to talk about...<br>
• Let me tell you about...<br>
• I want to describe...<br>
• I remember...<br><br>
<strong>Challenge (Task):</strong><br>
• At that time, [challenge]<br>
• The challenge was that...<br>
• The problem was...<br>
• What I needed to do was...<br><br>
<strong>Steps (Action):</strong><br>
• So, I decided to...<br>
• What I did was...<br>
• To solve this, I...<br>
• My approach was to...<br><br>
<strong>Outcome (Result):</strong><br>
• In the end,...<br>
• As a result,...<br>
• Finally,...<br>
• The outcome was that...<br><br>
<em style="color: #666;">💡 Tip: These connectors are automatically randomized in your generated answers!</em>`,

    ppf: `<strong>Past-Present-Future Connectors:</strong><br><br>
<strong>Past:</strong><br>
• In the past,...<br>
• When I first started,...<br>
• Initially,...<br>
• Back then,...<br><br>
<strong>Present:</strong><br>
• These days,...<br>
• Now,...<br>
• Currently,...<br>
• Nowadays,...<br><br>
<strong>Future:</strong><br>
• In the future,...<br>
• Looking ahead,...<br>
• My plan is to...<br>
• I hope to...<br><br>
<strong>Significance:</strong><br>
• This is important to me because...<br>
• The reason this matters is...<br>
• What makes this significant is...<br><br>
<em style="color: #666;">💡 Tip: Time-based connectors help structure your 2-minute response naturally!</em>`,

    '5wf': `<strong>5W + Feelings Connectors:</strong><br><br>
<strong>Introduction:</strong><br>
• I'd like to describe...<br>
• Let me talk about...<br>
• I want to tell you about...<br>
• The topic I'll discuss is...<br><br>
<strong>Context (Where/When):</strong><br>
• This happened...<br>
• It took place...<br>
• This was...<br>
• I experienced this...<br><br>
<strong>Reason (Why):</strong><br>
• The reason was...<br>
• What motivated me was...<br>
• I did this because...<br>
• My purpose was...<br><br>
<strong>Emotions:</strong><br>
• This made me feel...<br>
• I felt...<br>
• The experience left me feeling...<br>
• It made me...<br><br>
<em style="color: #666;">💡 Tip: Adding emotions makes your answer more engaging and authentic!</em>`,

    psi: `<strong>Problem-Solution-Impact Connectors:</strong><br><br>
<strong>Problem:</strong><br>
• The challenge was...<br>
• I faced a problem where...<br>
• The issue I encountered was...<br>
• What happened was...<br><br>
<strong>Solution:</strong><br>
• To solve this,...<br>
• My solution was to...<br>
• What I did was...<br>
• I decided to...<br><br>
<strong>Impact:</strong><br>
• As a result,...<br>
• This led to...<br>
• The impact was...<br>
• Because of this,...<br><br>
<strong>Learning:</strong><br>
• I learned that...<br>
• This taught me...<br>
• From this experience,...<br>
• What I realized was...<br><br>
<em style="color: #666;">💡 Tip: Problem-solution structure is perfect for decision and challenge topics!</em>`,

    ibc: `<strong>Introduction-Body-Conclusion Connectors:</strong><br><br>
<strong>Introduction:</strong><br>
• I'd like to talk about...<br>
• Let me describe...<br>
• I want to discuss...<br>
• The topic is...<br><br>
<strong>Main Point 1:</strong><br>
• First of all,...<br>
• To begin with,...<br>
• Firstly,...<br>
• One important aspect is...<br><br>
<strong>Main Point 2:</strong><br>
• Additionally,...<br>
• Another point is...<br>
• Furthermore,...<br>
• Also,...<br><br>
<strong>Conclusion:</strong><br>
• Overall,...<br>
• In conclusion,...<br>
• To sum up,...<br>
• All in all,...<br><br>
<em style="color: #666;">💡 Tip: This universal structure works for any topic when you're not sure which strategy to use!</em>`
};

// Part 2 Strategy Configurations
const STRATEGY_CONFIG = {
    star: {
        id: 'star',
        name: 'STAR Structure',
        description: 'Storytelling framework: Situation → Task → Action → Result',
        bestFor: 'Experience & event topics',
        fields: [
            {
                id: 'situation',
                label: 'Situation (Set the scene)',
                icon: '🎬',
                placeholder: 'When and where did this happen? Who was involved?'
            },
            {
                id: 'task',
                label: 'Task/Challenge',
                icon: '🎯',
                placeholder: 'What needed to be done? What was the challenge?'
            },
            {
                id: 'action',
                label: 'Action (What you did)',
                icon: '⚡',
                placeholder: 'What steps did you take? How did you handle it?'
            },
            {
                id: 'result',
                label: 'Result & Reflection',
                icon: '✨',
                placeholder: 'What was the outcome? How did you feel? What did you learn?'
            }
        ]
    },

    ppf: {
        id: 'ppf',
        name: 'Past-Present-Future',
        description: 'Time-based structure to extend ideas chronologically',
        bestFor: 'Skills, hobbies, places',
        fields: [
            {
                id: 'past',
                label: 'Past (How it started)',
                icon: '⏮️',
                placeholder: 'When did you first encounter this? Your first experience?'
            },
            {
                id: 'present',
                label: 'Present (Current situation)',
                icon: '▶️',
                placeholder: 'How is it now? What do you currently do? How has it developed?'
            },
            {
                id: 'future',
                label: 'Future (Plans & hopes)',
                icon: '⏭️',
                placeholder: 'What are your future plans? How do you see it developing?'
            },
            {
                id: 'significance',
                label: 'Significance (Why it matters)',
                icon: '💫',
                placeholder: 'Why is this important to you? What impact has it had?'
            }
        ]
    },

    '5wf': {
        id: '5wf',
        name: '5W + Feelings (Extended)',
        description: 'Comprehensive description using all aspects + emotions',
        bestFor: 'People, places, objects',
        fields: [
            {
                id: 'what_who',
                label: 'What/Who (Detailed description)',
                icon: '📌',
                placeholder: 'Describe it in detail - appearance, characteristics, specifics'
            },
            {
                id: 'where_when',
                label: 'Where/When (Context)',
                icon: '📍',
                placeholder: 'Location, time period, circumstances, background'
            },
            {
                id: 'why',
                label: 'Why (Importance)',
                icon: '❓',
                placeholder: 'Why is it special/memorable? Why did you choose this?'
            },
            {
                id: 'how_feelings',
                label: 'How & Feelings',
                icon: '💭',
                placeholder: 'How do you interact with it? Your emotions and personal connection'
            }
        ]
    },

    psi: {
        id: 'psi',
        name: 'Problem-Solution-Impact',
        description: 'Analytical structure for challenge-based topics',
        bestFor: 'Decisions, problems, changes',
        fields: [
            {
                id: 'problem',
                label: 'Problem/Situation',
                icon: '⚠️',
                placeholder: 'What was the challenge or difficult situation?'
            },
            {
                id: 'solution',
                label: 'Solution/Process',
                icon: '💡',
                placeholder: 'How did you approach it? What steps did you take?'
            },
            {
                id: 'impact',
                label: 'Impact & Results',
                icon: '🎯',
                placeholder: 'What were the results? What changed?'
            },
            {
                id: 'learning',
                label: 'Learning & Reflection',
                icon: '📚',
                placeholder: 'What did you learn? How has this affected you since?'
            }
        ]
    },

    ibc: {
        id: 'ibc',
        name: 'Introduction-Body-Conclusion',
        description: 'Classic speech structure - universal fallback',
        bestFor: 'Any topic - universal structure',
        fields: [
            {
                id: 'intro',
                label: 'Introduction',
                icon: '👋',
                placeholder: 'Paraphrase the topic + give brief overview of what you\'ll discuss'
            },
            {
                id: 'body1',
                label: 'Main Point 1',
                icon: '1️⃣',
                placeholder: 'First main aspect with details and examples'
            },
            {
                id: 'body2',
                label: 'Main Point 2',
                icon: '2️⃣',
                placeholder: 'Second main aspect with details and examples'
            },
            {
                id: 'conclusion',
                label: 'Conclusion',
                icon: '🏁',
                placeholder: 'Summary + final thought or feeling about the topic'
            }
        ]
    }
};

// 75 Authentic IELTS Part 2 Cue Cards
const CUE_CARDS = [
    // Experience & Events (0-9)
    {
        topic: 'Describe a time when you helped someone',
        prompts: ['Who you helped', 'How you helped them', 'Why you helped them', 'And explain how you felt about it'],
        category: 'Experience', bestStrategy: 'star',
        followUpQuestions: ["Did helping that person change your relationship with them?","Do you think people nowadays are less willing to help others than in the past?"],
        keyVocabulary: [{"word":"compassion","meaning":"sympathy and concern for others"},{"word":"selfless","meaning":"putting others' needs before your own"},{"word":"lend a hand","meaning":"to help someone"},{"word":"gratitude","meaning":"the quality of being thankful"},{"word":"fulfilling","meaning":"making you feel satisfied and happy"},{"word":"empathy","meaning":"the ability to understand others' feelings"}],
        sampleAnswer: {
            text: 'I\'d like to talk about a time last year when I helped my elderly neighbor, Mrs. Chen, who lives alone in the apartment next to mine. One evening, I heard her calling for help, and when I checked on her, I discovered she had fallen and injured her ankle. I immediately called an ambulance and stayed with her until the paramedics arrived, trying to keep her calm and comfortable. After she was treated at the hospital, I visited her daily for about two weeks, helping her with grocery shopping, cooking meals, and doing household chores that she couldn\'t manage with her injured ankle. I helped her because I felt it was the right thing to do - she had no family nearby, and I couldn\'t imagine leaving her to struggle alone. Throughout this experience, I felt a deep sense of fulfillment and purpose. It reminded me how small acts of kindness can make a significant difference in someone\'s life, and it actually brought us closer together as neighbors. Even now, we have regular tea together and look out for each other.',
            breakdown: {
                situation: 'Last year, elderly neighbor Mrs. Chen fell and injured ankle, lives alone',
                task: 'Needed immediate help and ongoing support during recovery',
                action: 'Called ambulance, stayed with her, then visited daily for 2 weeks - shopping, cooking, chores',
                result: 'Felt fulfilled and purposeful, realized impact of small kindnesses, developed close friendship'
            }
        }
    },
    {
        topic: 'Describe an important decision you made',
        prompts: ['What the decision was', 'When you made it', 'How you made the decision', 'And explain why it was important'],
        category: 'Experience', bestStrategy: 'psi',
        followUpQuestions: ["Do you think young people make decisions differently from older people?","Would you give the same advice to someone facing a similar choice?"],
        keyVocabulary: [{"word":"weigh up","meaning":"to consider the advantages and disadvantages"},{"word":"turning point","meaning":"a time when an important change happens"},{"word":"dilemma","meaning":"a situation requiring a difficult choice"},{"word":"decisive","meaning":"able to make decisions quickly and confidently"},{"word":"consequences","meaning":"the results of an action"},{"word":"hindsight","meaning":"understanding of a situation after it has happened"}],
        sampleAnswer: {
            text: 'The most important decision I\'ve made was choosing to change my university major from engineering to business administration during my second year of studies. I was struggling with engineering courses and felt increasingly unhappy, even though my family had high expectations for me to become an engineer. The decision-making process was quite difficult and took me about three months. I started by honestly assessing my strengths and interests, and I realized I was much more passionate about subjects like marketing and management. I also spoke with my academic advisor, attended business school seminars, and even talked to graduates from both fields to understand the career prospects. The hardest part was having a frank conversation with my parents about changing my path. The impact of this decision has been tremendously positive. My grades improved dramatically because I was genuinely interested in what I was learning, and I became much happier overall. I also discovered talents I didn\'t know I had, particularly in public speaking and project management. Looking back, this taught me that success comes from following your genuine interests rather than meeting others\' expectations. It was a pivotal moment that shaped my entire career direction.',
            breakdown: {
                problem: 'Struggling in engineering, unhappy but facing family expectations',
                solution: '3-month process: assessed strengths/interests, consulted advisor, attended seminars, researched careers, talked to parents',
                impact: 'Grades improved dramatically, became happier, discovered new talents',
                learning: 'Success comes from following genuine interests, not others\' expectations - shaped entire career'
            }
        }
    },
    {
        topic: 'Describe a time when you were very busy',
        prompts: ['When this was', 'What you had to do', 'How you managed your time', 'And explain how you felt about being so busy'],
        category: 'Experience', bestStrategy: 'star',
        followUpQuestions: ["Do you think being busy is always a bad thing?","How do you decide what to prioritise when everything feels urgent?"],
        keyVocabulary: [{"word":"hectic","meaning":"full of activity, very busy"},{"word":"juggle","meaning":"to handle several things at once"},{"word":"overwhelmed","meaning":"feeling too much pressure"},{"word":"time management","meaning":"organising how you spend your time"},{"word":"prioritise","meaning":"to decide which tasks are most important"},{"word":"burnout","meaning":"exhaustion from prolonged stress"}],
        sampleAnswer: {
            text: 'I\'d like to describe a period about two years ago when I was juggling my final university exams with a part-time internship at a marketing firm. For roughly six weeks, my schedule was absolutely packed from dawn until midnight, and I barely had a moment to breathe. My task was to maintain high grades while also delivering quality work at the internship, which meant I had to be incredibly strategic with my time. I created a detailed weekly planner, colour-coded by priority, and broke each day into focused blocks of ninety minutes followed by short breaks. I also learned to say no to social invitations and cut back on screen time, which freed up precious hours. What really saved me was batch-cooking meals on Sundays and cycling to the office instead of taking the bus, so I combined exercise with commuting. By the end of that period, I passed all my exams with distinction and received a full-time job offer from the company. Honestly, although I felt exhausted at the time, looking back I\'m grateful for the experience because it taught me that I\'m far more resilient than I thought, and the time-management habits I developed have stayed with me ever since.',
            breakdown: {
                situation: 'About two years ago, I was juggling final university exams with a part-time internship at a marketing firm. For roughly six weeks, my schedule was absolutely packed from dawn until midnight, and I barely had a moment to breathe.',
                task: 'My task was to maintain high grades while also delivering quality work at the internship, which meant I had to be incredibly strategic with my time and find ways to handle both commitments without compromising either one.',
                action: 'I created a detailed weekly planner, colour-coded by priority, and broke each day into focused ninety-minute blocks followed by short breaks. I learned to say no to social events, batch-cooked meals on Sundays, and cycled to work to combine exercise with commuting.',
                result: 'By the end, I passed all my exams with distinction and received a full-time job offer. Although exhausted at the time, I\'m grateful because it taught me I\'m more resilient than I thought, and those time-management habits have stayed with me ever since.'
            }
        }
    },
    {
        topic: 'Describe a positive change in your life',
        prompts: ['What the change was', 'When it happened', 'How it happened', 'And explain how you felt about this change'],
        category: 'Experience', bestStrategy: 'psi',
        followUpQuestions: ["Do you think people generally resist change or welcome it?","What advice would you give someone who wants to make a positive change?"],
        keyVocabulary: [{"word":"transformative","meaning":"causing a major change"},{"word":"breakthrough","meaning":"an important discovery or development"},{"word":"gradually","meaning":"slowly, over a period of time"},{"word":"mindset","meaning":"a person's way of thinking"},{"word":"catalyst","meaning":"something that causes an important change"},{"word":"well-being","meaning":"the state of being comfortable and healthy"}],
        sampleAnswer: {
            text: 'A positive change that transformed my life was adopting a regular morning exercise routine about eighteen months ago. Before that, I was leading a fairly sedentary lifestyle, spending most of my day sitting at a desk and feeling perpetually sluggish and unmotivated. The problem was that my energy levels were consistently low, I was gaining weight, and I noticed my mood had become quite flat, which was starting to affect both my work performance and personal relationships. A colleague suggested I try joining her for early morning jogs, and although I was sceptical at first, I decided to give it a shot for just two weeks as an experiment. I started with gentle twenty-minute runs three times a week, gradually building up to forty-five-minute sessions five days a week. What surprised me was how quickly I noticed changes beyond just physical fitness. Within a month, my sleep quality improved dramatically, my concentration at work sharpened, and I found myself feeling genuinely happier and more optimistic. The impact has been far-reaching and lasting. I\'ve lost about eight kilograms, but more importantly, I\'ve gained confidence and mental clarity that I never had before. This experience taught me that sometimes the smallest adjustments to your daily habits can trigger a cascade of positive changes you never anticipated.',
            breakdown: {
                problem: 'I was leading a sedentary lifestyle, spending most of my day at a desk, feeling perpetually sluggish and unmotivated. My energy levels were low, I was gaining weight, and my flat mood was affecting work performance and personal relationships.',
                solution: 'A colleague suggested early morning jogs, and I committed to a two-week experiment. I started with gentle twenty-minute runs three times a week and gradually built up to forty-five-minute sessions five days a week, staying consistent despite initial reluctance.',
                impact: 'Within a month, sleep quality improved dramatically, concentration at work sharpened, and I felt genuinely happier. I\'ve lost about eight kilograms and gained confidence and mental clarity I never had before. The changes have been far-reaching and lasting.',
                learning: 'This experience taught me that sometimes the smallest adjustments to daily habits can trigger a cascade of positive changes you never anticipated. It showed me the powerful connection between physical health and mental wellbeing.'
            }
        }
    },
    {
        topic: 'Describe an occasion when you received good news',
        prompts: ['What the news was', 'When you received it', 'Who gave you this news', 'And explain why this was good news for you'],
        category: 'Experience', bestStrategy: 'star',
        followUpQuestions: ["Do you think good news is more meaningful when it comes after a difficult period?","How do people in your country typically celebrate good news?"],
        keyVocabulary: [{"word":"ecstatic","meaning":"extremely happy and excited"},{"word":"milestone","meaning":"an important event in someone's life"},{"word":"relief","meaning":"a feeling of reassurance after anxiety"},{"word":"anticipation","meaning":"excited expectation"},{"word":"overwhelming","meaning":"very strong in effect or emotion"},{"word":"validation","meaning":"recognition that something is worthwhile"}],
        sampleAnswer: {
            text: 'I\'d like to share the time I received the news that I\'d been accepted into my top-choice postgraduate programme at the University of Melbourne. This happened about two years ago, during a period when I was feeling quite anxious because I\'d already been rejected by two other universities and was beginning to doubt my abilities. I remember the exact moment vividly — I was sitting in a café with my laptop, refreshing my email obsessively, when I finally saw the subject line "Congratulations on your admission." My heart started racing and I had to read the email three times before it truly sank in. I immediately called my parents, and my mother actually started crying with happiness on the phone because she knew how hard I\'d worked on the application, spending months perfecting my personal statement and gathering recommendation letters. The reason this was such incredible news was that this programme offered a partial scholarship, which meant my family wouldn\'t have to bear the full financial burden. Beyond the practical benefits, the acceptance validated all the effort I\'d invested and restored my confidence after those earlier rejections. It felt like a door opening to an entirely new chapter of my life.',
            breakdown: {
                situation: 'About two years ago, I was anxiously waiting for postgraduate admission results after being rejected by two universities. I was sitting in a café obsessively refreshing my email when I finally saw the acceptance message from the University of Melbourne.',
                task: 'I had spent months perfecting my personal statement, gathering recommendation letters, and working incredibly hard on my application because this was my top-choice programme and the stakes felt enormous after previous rejections.',
                action: 'When I saw the subject line "Congratulations on your admission," my heart raced and I read the email three times before it sank in. I immediately called my parents, and my mother started crying with happiness on the phone.',
                result: 'This was incredible news because the programme offered a partial scholarship, easing the financial burden on my family. The acceptance validated all my effort and restored my confidence after earlier rejections, opening an entirely new chapter of my life.'
            }
        }
    },
    {
        topic: 'Describe a difficult challenge you faced',
        prompts: ['What the challenge was', 'When and where it happened', 'How you dealt with it', 'And explain why it was difficult for you'],
        category: 'Experience', bestStrategy: 'psi',
        followUpQuestions: ["Do you think challenges are necessary for personal growth?","How do you usually deal with stress when facing difficulties?"],
        keyVocabulary: [{"word":"perseverance","meaning":"continued effort despite difficulty"},{"word":"resilience","meaning":"ability to recover from setbacks"},{"word":"daunting","meaning":"seeming difficult and intimidating"},{"word":"overcome","meaning":"to successfully deal with a problem"},{"word":"determination","meaning":"firmness of purpose"},{"word":"setback","meaning":"a difficulty that delays progress"}],
        sampleAnswer: {
            text: 'The most difficult challenge I\'ve faced was overcoming a severe fear of public speaking during my third year at university, when I was required to deliver a thirty-minute presentation to an audience of over two hundred students and faculty members. The problem was deeply rooted — ever since secondary school, I\'d experienced crippling anxiety whenever I had to speak in front of groups, with symptoms like trembling hands, a racing heartbeat, and a completely blank mind. I\'d managed to avoid presentations for years by choosing written assessments, but this time there was simply no alternative. My approach to tackling this challenge was methodical and gradual. I enrolled in a public speaking workshop offered by the university\'s student services, practised my presentation in front of a mirror at least fifty times, and recorded myself on video to identify nervous habits. I also asked three close friends to act as a test audience so I could get comfortable speaking to actual people. On the day itself, I arrived early, did breathing exercises backstage, and reminded myself that the audience wanted me to succeed. The presentation went far better than I\'d imagined — I stumbled a couple of times but recovered smoothly, and several classmates complimented me afterwards. This experience taught me that courage isn\'t the absence of fear but the willingness to act despite it, and that systematic preparation can overcome almost any obstacle if you commit to the process.',
            breakdown: {
                problem: 'I had a severe fear of public speaking rooted since secondary school — trembling hands, racing heartbeat, blank mind. In my third year at university, I was required to deliver a thirty-minute presentation to over two hundred people with no alternative.',
                solution: 'I enrolled in a public speaking workshop, practised my presentation at least fifty times in front of a mirror, recorded myself on video to spot nervous habits, and asked three close friends to be a test audience. On the day, I arrived early and did breathing exercises.',
                impact: 'The presentation went far better than I\'d imagined. I stumbled a couple of times but recovered smoothly, and several classmates complimented me afterwards. It was a breakthrough moment that dramatically reduced my anxiety about future presentations.',
                learning: 'This taught me that courage isn\'t the absence of fear but the willingness to act despite it. Systematic preparation can overcome almost any obstacle if you commit to the process, and avoidance only makes fears grow stronger over time.'
            }
        }
    },
    {
        topic: 'Describe a time when you learned something new',
        prompts: ['What you learned', 'When and where you learned it', 'How you learned it', 'And explain how you felt about learning this'],
        category: 'Experience', bestStrategy: 'star',
        followUpQuestions: ["Do you prefer learning from others or figuring things out on your own?","Is there anything you tried to learn but gave up on?"],
        keyVocabulary: [{"word":"steep learning curve","meaning":"a lot to learn in a short time"},{"word":"trial and error","meaning":"learning by experimenting"},{"word":"hands-on","meaning":"involving practical experience"},{"word":"pick up","meaning":"to learn something informally"},{"word":"proficiency","meaning":"a high degree of skill"},{"word":"resourceful","meaning":"good at finding ways to solve problems"}],
        sampleAnswer: {
            text: 'I\'d like to describe the time I learned to cook Thai cuisine from scratch, which happened during the lockdown period about three years ago. The situation was that I was stuck at home with nothing but time on my hands, and I was getting thoroughly bored of ordering takeaway every night. I\'d always loved Thai food but assumed it was too complex to make at home, with all those unfamiliar ingredients and techniques. My goal was to master at least five authentic Thai dishes within two months, starting with something relatively simple like pad Thai and working my way up to green curry from scratch. I began by watching a Thai grandmother\'s YouTube channel where she explained everything in painstaking detail, from how to balance sweet, sour, salty, and spicy flavours to the correct way to prepare a wok. I sourced ingredients from an Asian supermarket nearby and kept a cooking journal where I noted what worked and what didn\'t after each attempt. My first pad Thai was honestly terrible — far too sweet and the noodles clumped together — but I persisted and by my tenth attempt, it tasted remarkably close to restaurant quality. By the end of my two-month challenge, I could confidently prepare seven Thai dishes, which actually exceeded my original target. The experience left me feeling tremendously accomplished and gave me a lifelong skill that I now use to entertain friends and family regularly.',
            breakdown: {
                situation: 'About three years ago during lockdown, I was stuck at home bored of ordering takeaway every night. I\'d always loved Thai food but assumed it was too complex to make at home with all those unfamiliar ingredients and techniques.',
                task: 'My goal was to master at least five authentic Thai dishes within two months, starting with something relatively simple like pad Thai and working up to green curry from scratch, learning proper techniques along the way.',
                action: 'I watched a Thai grandmother\'s YouTube channel for detailed guidance, sourced ingredients from an Asian supermarket, and kept a cooking journal. My first pad Thai was terrible, but I persisted and by my tenth attempt it tasted close to restaurant quality.',
                result: 'By the end of two months, I could confidently prepare seven Thai dishes, exceeding my target. The experience left me feeling tremendously accomplished and gave me a lifelong skill I now use to entertain friends and family regularly.'
            }
        }
    },
    {
        topic: 'Describe an achievement you are proud of',
        prompts: ['What you achieved', 'When you achieved it', 'What you did to achieve it', 'And explain why you are proud of it'],
        category: 'Experience', bestStrategy: 'star',
        followUpQuestions: ["Do you think achievements are more satisfying when they take longer to accomplish?","How important is it to celebrate achievements?"],
        keyVocabulary: [{"word":"accomplishment","meaning":"something achieved successfully"},{"word":"dedication","meaning":"commitment to a task"},{"word":"self-discipline","meaning":"the ability to control yourself"},{"word":"rewarding","meaning":"giving satisfaction"},{"word":"milestone","meaning":"a significant stage in development"},{"word":"surpass","meaning":"to exceed or go beyond"}],
        sampleAnswer: {
            text: 'An achievement I\'m particularly proud of is completing a half-marathon last spring, which was something I never imagined myself capable of doing. The situation was that I\'d always considered myself unathletic — in school, I was the kid who dreaded PE lessons and could barely run a kilometre without gasping for air. When a friend casually suggested we sign up for a local half-marathon, I initially laughed it off, but something sparked inside me and I decided to prove to myself that I could do it. The challenge was immense because I had virtually zero running experience and only four months to prepare. I downloaded a structured training plan designed for complete beginners and committed to following it religiously, running four times a week regardless of the weather. In the early weeks, even a slow two-kilometre jog left me aching for days, but I gradually built up my endurance. I also adjusted my diet, started sleeping earlier, and joined a local running club for motivation and accountability. On race day, the atmosphere was electric, and despite hitting a brutal wall at the fifteen-kilometre mark, I pushed through by focusing on one step at a time. Crossing that finish line after two hours and twelve minutes was one of the most emotional moments of my life. I\'m proud because it proved that discipline and persistence can shatter the limiting beliefs we carry about ourselves.',
            breakdown: {
                situation: 'I\'d always considered myself unathletic — the kid who dreaded PE and could barely run a kilometre. When a friend suggested signing up for a local half-marathon, something sparked inside me and I decided to prove I could do it.',
                task: 'The challenge was immense because I had virtually zero running experience and only four months to prepare. I needed to transform from a complete beginner into someone capable of running twenty-one kilometres continuously.',
                action: 'I downloaded a structured training plan for beginners and ran four times a week regardless of weather. I adjusted my diet, started sleeping earlier, and joined a local running club for motivation. On race day, I hit a brutal wall at fifteen kilometres but pushed through one step at a time.',
                result: 'Crossing the finish line after two hours and twelve minutes was one of the most emotional moments of my life. I\'m proud because it proved that discipline and persistence can shatter the limiting beliefs we carry about ourselves.'
            }
        }
    },
    {
        topic: 'Describe a memorable journey you made',
        prompts: ['Where you went', 'When you went there', 'Who you went with', 'And explain why this journey was memorable'],
        category: 'Experience', bestStrategy: 'star',
        followUpQuestions: ["Do you prefer planned trips or spontaneous travel?","How has travel changed the way you see the world?"],
        keyVocabulary: [{"word":"breathtaking","meaning":"extremely impressive or beautiful"},{"word":"spontaneous","meaning":"done without planning"},{"word":"off the beaten track","meaning":"in a place that is not well known"},{"word":"picturesque","meaning":"visually attractive, like a picture"},{"word":"wanderlust","meaning":"a strong desire to travel"},{"word":"reminisce","meaning":"to think about pleasant past experiences"}],
        sampleAnswer: {
            text: 'I\'d like to talk about a memorable road trip I took with my two closest friends along the coastal highway from my hometown to a remote fishing village about five hundred kilometres north. This was three summers ago, right after we\'d all finished our university degrees and wanted to celebrate before going our separate ways for different careers. We had an old second-hand car, a cooler full of snacks, and an intentionally vague plan — the idea was to drive slowly over five days, stopping wherever looked interesting. The first day, we discovered a hidden waterfall after following a hand-painted sign down a dirt road, and we spent the entire afternoon swimming in the crystal-clear pool beneath it. On the third night, we camped on a deserted beach and cooked fresh fish we\'d bought from a roadside stall, watching shooting stars streak across an impossibly clear sky. What made the journey truly special was the conversations we had during those long stretches of driving — we talked about our fears, our dreams, and memories from our years together in a way we never had before. The trip reminded me that the most meaningful travel experiences aren\'t about luxury hotels or famous landmarks but about the people you share them with and the unexpected moments that unfold when you let go of rigid plans.',
            breakdown: {
                situation: 'Three summers ago, right after finishing university, my two closest friends and I set off on a five-day road trip along the coastal highway to a remote fishing village five hundred kilometres north, with an intentionally vague plan.',
                task: 'We wanted to celebrate our graduation before going our separate ways for different careers. The idea was to drive slowly, stopping wherever looked interesting, with just an old car and a cooler full of snacks.',
                action: 'We discovered a hidden waterfall down a dirt road and spent an afternoon swimming. We camped on a deserted beach, cooked fresh fish from a roadside stall, and watched shooting stars. During long drives, we had deep conversations about fears, dreams, and shared memories.',
                result: 'The trip reminded me that the most meaningful travel experiences aren\'t about luxury or landmarks but about the people you share them with and the unexpected moments that unfold when you let go of rigid plans.'
            }
        }
    },
    {
        topic: 'Describe a time when you had to wait for something',
        prompts: ['What you were waiting for', 'How long you waited', 'What you did while waiting', 'And explain how you felt about waiting'],
        category: 'Experience', bestStrategy: 'star',
        followUpQuestions: ["Are you generally a patient person?","Do you think modern technology has made people less patient?"],
        keyVocabulary: [{"word":"anticipation","meaning":"excited or anxious expectation"},{"word":"patience","meaning":"the ability to wait calmly"},{"word":"agonising","meaning":"causing great pain or worry"},{"word":"suspense","meaning":"a feeling of excited uncertainty"},{"word":"restless","meaning":"unable to relax or be still"},{"word":"worthwhile","meaning":"worth the time or effort spent"}],
        sampleAnswer: {
            text: 'Let me tell you about the time I had to wait nearly three months for the results of a professional certification exam that was crucial for my career progression. The situation was that I\'d spent six months preparing for this industry-recognised qualification in data analytics, attending evening classes and studying for at least two hours every night. When I finally sat the exam, I felt cautiously optimistic, but the examining body announced that results wouldn\'t be released for twelve weeks due to the volume of candidates. The challenge was managing the anxiety of not knowing whether all that effort had paid off, especially since my employer had agreed to promote me only if I passed. During those three months, I tried various strategies to keep myself distracted and sane. I threw myself into work projects with extra enthusiasm, picked up swimming as a new hobby, and made a conscious rule not to check the exam board\'s website more than once a week. I also connected with other candidates through an online forum, which helped because we could share our nervousness and reassure each other. Despite these efforts, the final week before results day was agonising — I barely slept and kept imagining worst-case scenarios. When the email finally arrived confirming I\'d passed with merit, the relief was overwhelming. The whole experience taught me that patience is genuinely a skill you can develop, and that the anticipation of an outcome is often far worse than any actual result.',
            breakdown: {
                situation: 'I\'d spent six months preparing for an industry-recognised data analytics certification, attending evening classes and studying two hours nightly. After sitting the exam, the examining body announced results wouldn\'t come for twelve weeks due to candidate volume.',
                task: 'The challenge was managing anxiety about not knowing whether my effort had paid off, especially since my employer had agreed to promote me only if I passed. I needed to stay productive and sane for three long months.',
                action: 'I threw myself into work projects, picked up swimming as a new hobby, and limited checking the exam website to once weekly. I connected with other candidates through an online forum to share nervousness. The final week was still agonising with barely any sleep.',
                result: 'When the email confirming I\'d passed with merit finally arrived, the relief was overwhelming. The experience taught me that patience is genuinely a skill you can develop, and that anticipation of an outcome is often far worse than any actual result.'
            }
        }
    },

    // People (10-14)
    {
        topic: 'Describe a person who has influenced you',
        prompts: ['Who this person is', 'How you know them', 'What they have done', 'And explain how they have influenced you'],
        category: 'People', bestStrategy: '5wf',
        followUpQuestions: ["Do you think people are influenced more by family or friends?","Is it important to have role models in life?"],
        keyVocabulary: [{"word":"profoundly","meaning":"in a very great or intense way"},{"word":"inspirational","meaning":"providing motivation or encouragement"},{"word":"mentor","meaning":"an experienced person who guides others"},{"word":"role model","meaning":"a person whose behaviour is imitated"},{"word":"shape","meaning":"to influence the development of"},{"word":"admiration","meaning":"respect and warm approval"}],
        sampleAnswer: {
            text: 'The person who has influenced me most profoundly is my high school literature teacher, Mr. Thompson, who taught me during my final two years of school. He was quite different from other teachers - in his mid-forties, always wearing colorful bow ties, with an infectious enthusiasm that made even the most reluctant students engage with literature. What made him exceptional was his teaching philosophy: he never just taught us what books meant, but rather encouraged us to think critically and form our own interpretations. I met him when I was 16, during a particularly difficult period when I was struggling with self-confidence and direction in life. Mr. Thompson\'s classes were held in a classroom filled with books, comfortable chairs, and inspirational quotes on the walls, creating an atmosphere more like a cozy library than a traditional classroom. He would often stay after school to discuss books with students who were interested, and I became one of his regular visitors. His influence on me has been transformative. He introduced me to authors and ideas that shaped my worldview, teaching me that literature isn\'t just entertainment but a tool for understanding human nature and society. More importantly, he believed in my potential when I didn\'t believe in myself, encouraging me to write and think creatively. I feel deeply grateful whenever I think about his impact on my life. His passion for teaching and genuine care for his students\' growth showed me the kind of person I wanted to become - someone who inspires and empowers others. The way he listened to students, really listened, without judgment, taught me the value of empathy and understanding. Even now, years later, when I face difficult decisions or challenges, I often think "What would Mr. Thompson advise?" His influence extends beyond academics; he fundamentally changed how I approach life and interact with others.',
            breakdown: {
                what_who: 'High school literature teacher Mr. Thompson, mid-forties, colorful bow ties, infectious enthusiasm, different teaching philosophy',
                where_when: 'Met age 16 during difficult period, cozy classroom with books and quotes, stayed after school for discussions',
                why: 'Introduced transformative authors/ideas, believed in my potential, taught me literature as tool for understanding',
                how_feelings: 'Feel deeply grateful, showed me who I want to become, taught empathy and understanding, changed how I approach life'
            }
        }
    },
    {
        topic: 'Describe a family member you admire',
        prompts: ['Who this person is', 'What they are like', 'What they have achieved', 'And explain why you admire them'],
        category: 'People', bestStrategy: '5wf',
        followUpQuestions: ["Do you think family values have changed across generations?","What qualities do you most admire in older family members?"],
        keyVocabulary: [{"word":"resilient","meaning":"able to recover quickly from difficulties"},{"word":"selfless","meaning":"concerned more with others' needs than oneself"},{"word":"persevere","meaning":"to continue despite difficulty"},{"word":"humble","meaning":"having a modest view of one's importance"},{"word":"enduring","meaning":"lasting over a long period"},{"word":"unconditional","meaning":"without any conditions or limits"}],
        sampleAnswer: {
            text: 'The family member I admire most is my maternal grandmother, who is now eighty-two years old and still one of the sharpest, most energetic people I know. She\'s a petite woman with silver hair always neatly pinned back, warm brown eyes that crinkle when she laughs, and an air of quiet dignity that immediately puts people at ease. Despite her age, she still tends her vegetable garden every morning and insists on cooking elaborate Sunday lunches for the entire family. She grew up in a small rural village where opportunities for women were extremely limited, and she was married at seventeen with no formal education beyond primary school. What makes her truly remarkable is what she achieved despite those circumstances. She taught herself to read by borrowing books from neighbours, eventually started a small tailoring business from her living room, and single-handedly put all four of her children through university after my grandfather passed away when she was just forty-three. Her tailoring shop became so successful that she employed five other women from the village, essentially creating livelihoods for families who had very few options. The reason I admire her so deeply goes beyond her accomplishments. It\'s her attitude toward life — she never complains, always finds humour in difficult situations, and has this extraordinary ability to make everyone around her feel valued and loved. Whenever I face setbacks, I think of what she overcame and it puts my own challenges into perspective.',
            breakdown: {
                whatWho: 'My maternal grandmother, eighty-two years old, petite with silver hair and warm brown eyes, quiet dignity, still tends her garden daily and cooks elaborate Sunday lunches for the whole family despite her age.',
                whereWhen: 'She grew up in a small rural village with limited opportunities for women, married at seventeen with only primary education. After my grandfather passed when she was forty-three, she raised four children alone.',
                why: 'She taught herself to read, started a tailoring business from her living room, put all four children through university, and eventually employed five other women, creating livelihoods for families with few options.',
                howFeelings: 'I admire her attitude — she never complains, finds humour in difficulty, and makes everyone feel valued. Whenever I face setbacks, thinking of what she overcame puts my own challenges into perspective.'
            }
        }
    },
    {
        topic: 'Describe a friend you have had for a long time',
        prompts: ['Who this friend is', 'How you met', 'What you do together', 'And explain why this friendship has lasted so long'],
        category: 'People', bestStrategy: 'ppf',
        followUpQuestions: ["Do you think it is harder to maintain friendships as an adult?","What is the most important quality in a long-term friendship?"],
        keyVocabulary: [{"word":"bond","meaning":"a close connection between people"},{"word":"loyalty","meaning":"a strong feeling of support"},{"word":"mutual","meaning":"experienced by both people"},{"word":"trustworthy","meaning":"able to be relied on"},{"word":"companionship","meaning":"the state of having a companion"},{"word":"inseparable","meaning":"always together, unable to be separated"}],
        sampleAnswer: {
            text: 'I\'d like to talk about my best friend Sarah, whom I\'ve known for over 15 years now. We first met in middle school when we were both 12 years old - we were assigned to sit next to each other in English class, and we immediately clicked. In those early years, we were inseparable at school, spending every break together, studying for exams as a team, and sharing all our teenage dramas and dreams. We both loved reading and would exchange books constantly, discussing characters and plots for hours. Currently, even though we live in different cities due to our careers, we remain incredibly close. We video chat at least twice a week, usually on weekend evenings, catching up on everything happening in our lives. Whenever we visit each other, which is typically every two or three months, we fall right back into our old rhythm - we cook together, go for long walks while talking non-stop, and binge-watch our favorite series. We also maintain a tradition of taking an annual trip together, just the two of us, which has become sacred time we both protect in our calendars. I believe our friendship will continue to grow stronger in the future. We\'ve already talked about how we want our children to grow up knowing each other, and we dream about eventually living in the same city again when we retire. This friendship has endured because we share fundamental values and have always been completely honest with each other, even when the truth is uncomfortable. We\'ve supported each other through difficult times - breakups, family problems, career setbacks - and celebrated all the good moments together, which has created an unbreakable bond.',
            breakdown: {
                past: 'Met 15 years ago age 12, sat together in English class, inseparable, studied together, shared books and teenage dreams',
                present: 'Live in different cities, video chat twice weekly, visit every 2-3 months, cook/walk/watch series, annual trip tradition',
                future: 'Friendship will grow stronger, want children to know each other, hope to live in same city when retired',
                significance: 'Share values, complete honesty, supported through difficulties and celebrations, created unbreakable bond'
            }
        }
    },
    {
        topic: 'Describe someone who is good at their job',
        prompts: ['Who this person is', 'What their job is', 'What they do in their job', 'And explain why they are good at their job'],
        category: 'People', bestStrategy: '5wf',
        followUpQuestions: ["What makes someone truly excellent at their job?","Do you think passion or training matters more for job performance?"],
        keyVocabulary: [{"word":"dedicated","meaning":"devoted to a task or purpose"},{"word":"expertise","meaning":"expert skill or knowledge"},{"word":"meticulous","meaning":"showing great attention to detail"},{"word":"passionate","meaning":"having strong feelings about something"},{"word":"professionalism","meaning":"the competence of a professional"},{"word":"go above and beyond","meaning":"to do more than expected"}],
        sampleAnswer: {
            text: 'I\'d like to describe a barista named David who works at a specialty coffee shop near my office. He\'s in his early thirties, always impeccably dressed in a crisp apron, with a neat beard and an infectious smile that greets every single customer regardless of how busy the shop is. What sets David apart is his encyclopaedic knowledge of coffee — he can tell you the altitude at which beans were grown, the flavour profile you should expect, and the optimal brewing method for each variety. I\'ve been visiting this café for about two years, usually stopping by every weekday morning before work, and in that time I\'ve watched him handle the morning rush of fifty-plus customers without ever appearing flustered or cutting corners. The reason he\'s exceptional at his job goes beyond technical skill. He remembers regular customers\' names and orders, genuinely engages in brief conversations that brighten people\'s mornings, and has this remarkable ability to train new staff with patience rather than pressure. I once saw him spend fifteen minutes helping an elderly customer choose a blend for a gift, asking thoughtful questions about the recipient\'s taste preferences. What I feel when I watch David work is genuine admiration mixed with inspiration. He demonstrates that excellence isn\'t about having a prestigious title but about bringing passion and care to whatever you do, turning a routine transaction into a meaningful human interaction.',
            breakdown: {
                whatWho: 'David is a barista in his early thirties at a specialty coffee shop near my office — impeccably dressed, neat beard, infectious smile. He has encyclopaedic knowledge of coffee origins, flavour profiles, and brewing methods.',
                whereWhen: 'I\'ve visited this café for about two years, stopping by every weekday morning. I\'ve watched him handle morning rushes of fifty-plus customers without ever appearing flustered or cutting corners on quality.',
                why: 'He remembers regulars\' names and orders, engages in conversations that brighten mornings, and trains new staff with patience. I once watched him spend fifteen minutes helping an elderly customer choose a gift blend with thoughtful questions.',
                howFeelings: 'Watching David work fills me with admiration and inspiration. He demonstrates that excellence isn\'t about prestigious titles but about bringing passion and care to whatever you do, turning routine transactions into meaningful human interactions.'
            }
        }
    },
    {
        topic: 'Describe a person who taught you something important',
        prompts: ['Who this person was', 'What they taught you', 'How they taught you', 'And explain why this was important to you'],
        category: 'People', bestStrategy: 'star',
        followUpQuestions: ["Do you think the best lessons come from formal education or real life?","Is there something you would like to teach others?"],
        keyVocabulary: [{"word":"eye-opening","meaning":"surprisingly informative or revealing"},{"word":"invaluable","meaning":"extremely useful, priceless"},{"word":"hands-on","meaning":"involving practical experience"},{"word":"enlightening","meaning":"giving greater understanding"},{"word":"perspective","meaning":"a particular way of viewing things"},{"word":"wisdom","meaning":"knowledge gained through experience"}],
        sampleAnswer: {
            text: 'I want to talk about my uncle Raj, who taught me the importance of financial literacy when I was just sixteen years old. The situation was that I\'d received a fairly generous cash gift for my birthday and was planning to spend it all on a new gaming console. My uncle, who works as a financial advisor, happened to be visiting that weekend and overheard me excitedly discussing my purchase plans. Instead of lecturing me, he sat down with me at the kitchen table and proposed a challenge. He suggested I invest half the money and spend the other half however I wanted, promising that if I followed his guidance for one year, I\'d understand something valuable about how money works. What he did was truly eye-opening — he helped me open a simple investment account, showed me how compound interest works using real numbers from my own money, and taught me to track my spending in a small notebook. Every month, he\'d call me and we\'d review how my investment was performing compared to the gaming console, which was already outdated within six months. By the end of the year, my invested money had grown modestly, but the real gain was the mindset shift. I learned that delayed gratification and understanding where your money goes are skills that compound over a lifetime, just like interest itself. That lesson from Uncle Raj fundamentally changed my relationship with money and saving.',
            breakdown: {
                situation: 'When I was sixteen, I received a generous birthday cash gift and planned to spend it all on a gaming console. My uncle Raj, a financial advisor, was visiting that weekend and overheard my purchase plans.',
                task: 'Instead of lecturing me, he proposed a challenge: invest half the money and spend the other half freely. If I followed his guidance for one year, I\'d understand something valuable about how money works.',
                action: 'He helped me open an investment account, showed me compound interest using my own numbers, and taught me to track spending in a notebook. Monthly, we\'d review my investment\'s performance compared to the gaming console, which was outdated within six months.',
                result: 'By year\'s end, my money had grown modestly, but the real gain was a mindset shift. I learned that delayed gratification and financial awareness compound over a lifetime. That lesson fundamentally changed my relationship with money and saving.'
            }
        }
    },

    // Places (15-19)
    {
        topic: 'Describe a place you like to visit',
        prompts: ['Where this place is', 'When you go there', 'What you do there', 'And explain why you like to visit this place'],
        category: 'Places', bestStrategy: '5wf',
        followUpQuestions: ["How has that place changed over the years?","Do you think it will still be popular in the future?"],
        keyVocabulary: [{"word":"sanctuary","meaning":"a place of refuge or safety"},{"word":"tranquil","meaning":"free from disturbance, peaceful"},{"word":"atmospheric","meaning":"creating a distinctive mood"},{"word":"charming","meaning":"very pleasant or attractive"},{"word":"retreat","meaning":"a quiet, private place"},{"word":"nostalgic","meaning":"feeling a longing for the past"}],
        sampleAnswer: {
            text: 'There\'s a particular place I absolutely love visiting - it\'s a small, family-run bookshop café called "The Reading Corner" located in the historic district of my city, about 20 minutes from my home. The shop occupies a beautifully restored two-story colonial building with exposed brick walls, wooden beams, and large windows that let in wonderful natural light. On the first floor, there are shelves packed with both new and second-hand books, while the second floor serves as a cozy café with mismatched vintage furniture, plants hanging from the ceiling, and the constant aroma of fresh coffee and baked goods. The atmosphere is incredibly warm and welcoming, and the owners, an elderly couple, know most of their regular customers by name. I discovered this place about three years ago while exploring the old quarter of the city, and since then, I\'ve been visiting at least twice a month, usually on Saturday afternoons when I have more free time. When I go there, I follow a sort of ritual: I start by browsing the book shelves for about 30 minutes, often discovering hidden literary gems or old editions of classics. Then I head upstairs, order my favorite cappuccino and a slice of their homemade carrot cake, and settle into one of the comfortable armchairs near the window. I spend the next few hours either reading a book I\'ve purchased or brought with me, or sometimes just people-watching and letting my mind wander. Occasionally, I strike up conversations with other regulars who share my love of books. The reason this place is so special to me goes beyond just the books and coffee. It represents an escape from the fast-paced, digital world we live in - there\'s no WiFi, which encourages genuine disconnection and reflection. The place evokes feelings of nostalgia and contentment, reminding me of simpler times. It\'s become my personal sanctuary where I can recharge mentally and emotionally, and I always leave feeling more centered and peaceful than when I arrived.',
            breakdown: {
                what_who: '"The Reading Corner" bookshop café, family-run by elderly couple, two-story colonial building, first floor books, second floor café with vintage furniture',
                where_when: 'Historic district 20 mins away, discovered 3 years ago, visit twice monthly on Saturday afternoons',
                why: 'Special because offers escape from fast-paced digital world, no WiFi encourages reflection, represents simpler times',
                how_feelings: 'Personal sanctuary, evokes nostalgia and contentment, can recharge mentally/emotionally, leave feeling centered and peaceful'
            }
        }
    },
    {
        topic: 'Describe a beautiful city you have visited',
        prompts: ['Where the city is', 'When you visited it', 'What you did there', 'And explain why you think it is beautiful'],
        category: 'Places', bestStrategy: '5wf',
        followUpQuestions: ["Do you think tourism can damage the beauty of a city?","Would you consider living in that city permanently?"],
        keyVocabulary: [{"word":"stunning","meaning":"extremely impressive or attractive"},{"word":"architectural","meaning":"relating to the design of buildings"},{"word":"vibrant","meaning":"full of energy and life"},{"word":"cosmopolitan","meaning":"including people from many countries"},{"word":"enchanting","meaning":"delightfully charming"},{"word":"heritage","meaning":"valued traditions passed down"}],
        sampleAnswer: {
            text: 'The most beautiful city I\'ve ever visited is Prague in the Czech Republic, which genuinely felt like stepping into a fairy tale. The city is a stunning blend of Gothic, Baroque, and Art Nouveau architecture, with terracotta rooftops stretching as far as the eye can see, the Vltava River winding gracefully through the centre, and the magnificent Prague Castle perched on a hill overlooking everything. The cobblestone streets of the Old Town are lined with ornate buildings painted in pastel shades of cream, peach, and pale blue, and around every corner there\'s another breathtaking church spire or sculptured fountain. I visited Prague during early autumn about two years ago, spending five days exploring the city with my partner. The weather was crisp and golden, with leaves turning amber and copper, which made the already picturesque streets look even more magical. We wandered across the iconic Charles Bridge at sunrise when there were hardly any tourists, explored the winding lanes of the Jewish Quarter, and spent hours in charming cafés drinking rich Czech hot chocolate. What made Prague especially beautiful wasn\'t just the architecture but the atmosphere — there was live classical music drifting from open windows, street artists painting scenes of the riverbank, and a gentle pace of life that encouraged you to simply slow down and absorb your surroundings. I felt utterly enchanted the entire time and left with a deep longing to return.',
            breakdown: {
                whatWho: 'Prague, Czech Republic — a stunning blend of Gothic, Baroque, and Art Nouveau architecture with terracotta rooftops, the Vltava River winding through the centre, Prague Castle on a hill, and cobblestone streets lined with pastel-painted ornate buildings.',
                whereWhen: 'Visited during early autumn about two years ago, spending five days exploring with my partner. The weather was crisp and golden with amber leaves, making the already picturesque streets look even more magical.',
                why: 'Beyond the architecture, the atmosphere made it special — live classical music from open windows, street artists by the riverbank, and a gentle pace of life that encouraged you to slow down and absorb your surroundings.',
                howFeelings: 'I felt utterly enchanted the entire time. Walking across Charles Bridge at sunrise with hardly any tourists was a near-spiritual experience. I left Prague with a deep longing to return that I still feel today.'
            }
        }
    },
    {
        topic: 'Describe your ideal home',
        prompts: ['What it would look like', 'Where it would be', 'Who would live there with you', 'And explain why this would be your ideal home'],
        category: 'Places', bestStrategy: '5wf',
        followUpQuestions: ["How important is it for a home to reflect the owner's personality?","Do you think people's idea of an ideal home changes with age?"],
        keyVocabulary: [{"word":"spacious","meaning":"having plenty of room"},{"word":"cosy","meaning":"giving a feeling of comfort and warmth"},{"word":"contemporary","meaning":"belonging to the present time, modern"},{"word":"minimalist","meaning":"using the smallest range of materials"},{"word":"functional","meaning":"designed to be practical"},{"word":"sustainable","meaning":"able to be maintained without harming the environment"}],
        sampleAnswer: {
            text: 'My ideal home would be a modern two-storey house with large floor-to-ceiling windows, built from natural materials like timber and stone, surrounded by a modest garden with mature trees and a small vegetable patch. I envision it having an open-plan kitchen and living area on the ground floor, designed for cooking and entertaining, with a cosy reading nook tucked beside a wood-burning fireplace. Upstairs, there\'d be three bedrooms, each with its own character, and a study with built-in bookshelves covering an entire wall. I\'d want it to be located on the outskirts of a medium-sized city, close enough to enjoy restaurants, theatres, and cultural events within a twenty-minute drive, yet far enough to have genuine peace and quiet, perhaps on a quiet lane overlooking rolling hills or near a river. I\'d live there with my partner and eventually our children, and I\'d love to have a golden retriever roaming the garden. The reason this would be my ideal home is that it balances the things I value most — connection to nature without isolation from city life, space for creativity and solitude alongside areas designed for gathering with loved ones. I feel genuinely excited imagining mornings spent reading by that fireplace with a cup of coffee and evenings hosting friends for long dinners in the garden.',
            breakdown: {
                whatWho: 'A modern two-storey house with floor-to-ceiling windows, built from timber and stone, with an open-plan kitchen, a reading nook beside a wood-burning fireplace, three bedrooms, and a study with wall-to-wall bookshelves.',
                whereWhen: 'On the outskirts of a medium-sized city, close enough for restaurants and culture within twenty minutes, yet on a quiet lane overlooking rolling hills or near a river, with genuine peace and quiet.',
                why: 'It balances my core values — connection to nature without isolation, space for creativity and solitude alongside areas for gathering with loved ones. It represents the life I\'m working toward rather than just a building.',
                howFeelings: 'I feel genuinely excited imagining mornings reading by the fireplace with coffee, evenings hosting friends for long garden dinners, and weekends tending the vegetable patch with a golden retriever at my feet.'
            }
        }
    },
    {
        topic: 'Describe a place where you like to relax',
        prompts: ['Where this place is', 'How often you go there', 'What you do there', 'And explain why it helps you relax'],
        category: 'Places', bestStrategy: '5wf',
        followUpQuestions: ["Do you think everyone needs a special place to unwind?","Has your way of relaxing changed over time?"],
        keyVocabulary: [{"word":"serene","meaning":"calm, peaceful, and untroubled"},{"word":"unwind","meaning":"to relax after a period of stress"},{"word":"secluded","meaning":"sheltered and private"},{"word":"rejuvenate","meaning":"to give new energy or vigour"},{"word":"meditative","meaning":"involving deep thought"},{"word":"haven","meaning":"a place of safety or refuge"}],
        sampleAnswer: {
            text: 'The place where I like to relax most is a small park near my apartment that sits on a gentle hillside overlooking the river. It\'s not a famous park by any means — just a quiet green space about the size of a football pitch, with a few ancient oak trees, wooden benches scattered along winding gravel paths, and a tiny pond where ducks congregate in the warmer months. What makes it special is that it\'s slightly hidden behind a row of residential buildings, so most people in the neighbourhood don\'t even know it exists, which means it\'s rarely crowded. I go there at least three or four times a week, usually in the late afternoon after finishing work, and I spend about an hour just sitting on my favourite bench under the largest oak tree. Sometimes I bring a book, but more often I simply sit and watch the light change over the river, listen to the birds, and let my thoughts settle after a hectic day. On weekends, I occasionally bring a thermos of tea and my journal and write for a while. This place helps me relax because it provides a complete sensory contrast to my working environment — instead of screens and fluorescent lighting, there\'s natural light, fresh air, and gentle sounds. I always leave feeling mentally recharged, as though someone has pressed a reset button inside my head.',
            breakdown: {
                whatWho: 'A small, hidden park near my apartment on a gentle hillside overlooking the river — about the size of a football pitch, with ancient oak trees, wooden benches along gravel paths, and a tiny duck pond. Rarely crowded because most neighbours don\'t know it exists.',
                whereWhen: 'Behind a row of residential buildings in my neighbourhood. I visit three or four times a week, usually late afternoon after work for about an hour, and on weekends I bring tea and my journal.',
                why: 'It provides a complete sensory contrast to my working environment — natural light, fresh air, and gentle sounds instead of screens and fluorescent lighting. It serves as a mental reset after hectic days.',
                howFeelings: 'I always leave feeling mentally recharged, as though someone has pressed a reset button inside my head. Sitting under the oak tree watching light change over the river and listening to birds brings me a profound sense of calm and presence.'
            }
        }
    },
    {
        topic: 'Describe a building you find interesting',
        prompts: ['Where it is', 'What it looks like', 'What it is used for', 'And explain why you find it interesting'],
        category: 'Places', bestStrategy: '5wf',
        followUpQuestions: ["Do you think modern architecture is more interesting than traditional?","Should cities preserve old buildings or replace them with new ones?"],
        keyVocabulary: [{"word":"facade","meaning":"the front of a building"},{"word":"innovative","meaning":"introducing new ideas or methods"},{"word":"landmark","meaning":"an easily recognisable feature"},{"word":"aesthetic","meaning":"concerned with beauty or art"},{"word":"imposing","meaning":"grand and impressive in appearance"},{"word":"restoration","meaning":"the process of repairing a building"}],
        sampleAnswer: {
            text: 'A building I find absolutely fascinating is the central library in my city, which was redesigned and reopened about six years ago by a renowned Danish architecture firm. From the outside, it looks like a stack of enormous glass boxes slightly offset from one another, creating terraces on each level where people can sit outside and read. The façade is covered in a geometric pattern of translucent and opaque glass panels that shift in colour depending on the sunlight, appearing silver in the morning and golden in the late afternoon. Inside, the building is equally striking — a vast central atrium rises through all five floors, flooded with natural light from a skylighted roof. Instead of traditional rows of shelves, books are arranged in intimate alcoves and curved reading rooms that feel almost like private caves. There are also digital media labs, a children\'s storytelling amphitheatre, and a rooftop café with panoramic city views. The library sits right in the centre of the old town square, which creates a dramatic contrast between the ultra-modern design and the centuries-old buildings surrounding it. What I find most interesting is how the architects managed to make a public building feel both grand and intimate simultaneously. Every time I visit, I notice new design details — hidden staircases, unexpected windows framing specific views of the city — and I feel a sense of wonder at how thoughtful architecture can transform something as ordinary as a library into an inspiring experience.',
            breakdown: {
                whatWho: 'The city\'s central library, redesigned by a renowned Danish firm — looks like stacked glass boxes with terraces, a geometric façade that shifts colour with sunlight, a vast five-floor atrium flooded with natural light, and intimate curved reading alcoves.',
                whereWhen: 'Located in the centre of the old town square, reopened about six years ago. The ultra-modern design creates a dramatic contrast with the centuries-old buildings surrounding it, making it a striking landmark.',
                why: 'The architects made a public building feel both grand and intimate simultaneously. It houses digital media labs, a children\'s amphitheatre, and a rooftop café, transforming a library into a cultural hub.',
                howFeelings: 'Every visit, I notice new design details — hidden staircases, unexpected windows framing city views. I feel genuine wonder at how thoughtful architecture can transform something as ordinary as a library into an inspiring, almost magical experience.'
            }
        }
    },

    // Objects & Possessions (20-24)
    {
        topic: 'Describe something you own that is important to you',
        prompts: ['What it is', 'When you got it', 'How you use it', 'And explain why it is important to you'],
        category: 'Objects', bestStrategy: '5wf',
        followUpQuestions: ["Do you think people place too much value on material possessions?","Is there anything you own that you would never give away?"],
        sampleAnswer: {
            text: 'Something I own that holds tremendous importance to me is a vintage leather-bound journal that my late grandfather gave me on my eighteenth birthday. It\'s a beautiful A5-sized notebook with a dark brown cover that\'s become wonderfully worn and soft over the years, held shut by a simple leather strap. Inside the front cover, my grandfather wrote an inscription in his distinctive slanted handwriting that reads "Fill these pages with your adventures and your truth." The paper is thick, cream-coloured, and slightly textured — the kind that feels satisfying to write on with a proper pen. I received this journal about seven years ago during a small family dinner at my grandparents\' house. My grandfather pulled me aside after the meal and handed it to me wrapped in simple brown paper, explaining that he\'d kept a journal throughout his entire adult life and believed it was a habit worth passing on. Sadly, he passed away just two years later. I use this journal almost daily — it\'s where I write my thoughts, sketch ideas, record meaningful conversations, and work through problems. I\'ve actually filled this particular journal and moved on to others, but I keep the original one on my bedside table as a kind of talisman. It matters so deeply to me because it represents my connection to my grandfather and his belief in the power of reflection. Every time I see his handwriting inside that cover, I feel his presence and his quiet encouragement to live a thoughtful, examined life.',
            breakdown: {
                whatWho: 'A vintage leather-bound A5 journal with a dark brown cover, wonderfully worn and soft, held by a leather strap. Inside, my late grandfather\'s distinctive slanted handwriting reads "Fill these pages with your adventures and your truth." Thick, cream-coloured textured paper.',
                whereWhen: 'Received about seven years ago on my eighteenth birthday during a family dinner at my grandparents\' house. My grandfather pulled me aside, handed it wrapped in brown paper, and explained he\'d kept journals his whole adult life. He passed away two years later.',
                why: 'It represents my connection to my grandfather and his belief in the power of reflection. I\'ve filled this journal and moved on to others, but I keep the original on my bedside table as a talisman of his quiet encouragement.',
                howFeelings: 'Every time I see his handwriting inside the cover, I feel his presence and encouragement to live a thoughtful, examined life. This journal transformed how I process the world, and it remains my most treasured possession despite having no monetary value.'
            }
        }
    },
    {
        topic: 'Describe a gift you gave to someone',
        prompts: ['What the gift was', 'Who you gave it to', 'Why you chose this gift', 'And explain how the person felt about it'],
        category: 'Objects', bestStrategy: 'star',
        followUpQuestions: ["Do you think homemade gifts are better than bought ones?","Is gift-giving an important tradition in your culture?"],
        sampleAnswer: {
            text: 'I\'d like to describe a gift I gave my mother for her fiftieth birthday last year, which took me weeks of planning and turned out to be incredibly meaningful. The situation was that my mother had been going through a particularly stressful period at work and hadn\'t taken a proper holiday in over three years, always putting the family\'s needs before her own. I wanted to give her something that went beyond a typical birthday present — something that would show her how much we appreciated her sacrifices. My plan was to create a personalised "memory book" combined with a surprise spa weekend. I secretly contacted about twenty of her closest friends and family members and asked each person to write a letter expressing what my mother meant to them, along with a favourite photograph. I spent three weeks compiling these into a beautifully bound book, designing each page with different colours and layouts. For the spa weekend, I coordinated with my siblings to split the cost of a two-night stay at a countryside retreat she\'d mentioned wanting to visit years earlier. On her birthday morning, I presented the memory book first, and she started crying on the second page. When she reached the final page, which revealed the spa weekend details, she was completely overwhelmed with emotion. She later told me it was the most thoughtful gift she\'d ever received and that reading those letters helped her realise just how many lives she\'d positively touched.',
            breakdown: {
                situation: 'My mother\'s fiftieth birthday was approaching, and she\'d been going through a stressful period at work without a proper holiday in over three years, always putting the family\'s needs before her own.',
                task: 'I wanted to give her something beyond a typical present — something that would genuinely show how much we appreciated her sacrifices and help her feel valued after such a demanding period.',
                action: 'I secretly contacted twenty of her closest friends and family for personal letters and photographs, spent three weeks compiling them into a bound memory book, and coordinated with my siblings to fund a two-night countryside spa weekend she\'d mentioned years ago.',
                result: 'She started crying on the second page of the book, and when the final page revealed the spa weekend, she was overwhelmed. She later told me it was the most thoughtful gift she\'d ever received and that the letters helped her realise how many lives she\'d touched.'
            }
        }
    },
    {
        topic: 'Describe a piece of technology you find useful',
        prompts: ['What it is', 'When you got it', 'How you use it', 'And explain why you find it useful'],
        category: 'Objects', bestStrategy: '5wf',
        followUpQuestions: ["Do you think people have become too dependent on technology?","What piece of technology could you not live without?"],
        sampleAnswer: {
            text: 'A piece of technology I find incredibly useful is my e-reader, specifically a Kindle Paperwhite that I\'ve owned for about three years now. It\'s a slim, lightweight device about the size of a paperback book, with a matte screen that looks remarkably like real paper and doesn\'t strain your eyes even after hours of reading. It holds thousands of books in a device that weighs less than two hundred grams, and the battery lasts for weeks on a single charge, which still amazes me. I carry it everywhere — in my bag during commutes, in my suitcase when travelling, and it sits on my bedside table every night. I bought it on a whim during a sale after my partner kept recommending it, and initially I was sceptical because I\'ve always loved the feel of physical books. However, within a week I was completely converted. The built-in dictionary is fantastic for looking up unfamiliar words instantly, the adjustable backlight means I can read in bed without disturbing my partner, and the ability to highlight passages and export notes has been invaluable for my professional development reading. I find it useful because it has genuinely transformed my reading habits — I now read about three times more than I did before owning it, simply because having an entire library in my pocket removes every possible excuse not to read. It\'s eliminated the "I don\'t have a book with me" problem entirely and made reading as convenient as checking my phone.',
            breakdown: {
                whatWho: 'A Kindle Paperwhite e-reader — slim, lightweight, with a matte paper-like screen that doesn\'t strain eyes. Holds thousands of books in under two hundred grams, battery lasts weeks. Has a built-in dictionary, adjustable backlight, and note-highlighting features.',
                whereWhen: 'Bought it about three years ago on a whim during a sale after my partner\'s recommendation. I was initially sceptical as a physical book lover but was completely converted within a week. I carry it everywhere — commutes, travel, bedside table.',
                why: 'It has genuinely transformed my reading habits — I read about three times more than before because having an entire library in my pocket removes every excuse not to read. The dictionary and highlighting features are invaluable for professional development.',
                howFeelings: 'I feel grateful for this device because it eliminated the "I don\'t have a book with me" problem and made reading as convenient as checking my phone. What started as scepticism has turned into genuine appreciation for how technology can enhance a beloved habit.'
            }
        }
    },
    {
        topic: 'Describe a book that had an impact on you',
        prompts: ['What the book was about', 'When you read it', 'Why you read it', 'And explain what impact it had on you'],
        category: 'Objects', bestStrategy: 'star',
        followUpQuestions: ["Do you think reading is becoming less popular among young people?","Would you recommend this book to everyone?"],
        sampleAnswer: {
            text: 'I\'d like to talk about a book called "Man\'s Search for Meaning" by Viktor Frankl, which I read during my gap year between university and starting my first job. The situation was that I was feeling quite lost and directionless at the time — I\'d finished my degree but wasn\'t sure what kind of career I wanted, and I was questioning the purpose of everything I\'d studied. A professor I respected had recommended this book during our final seminar, calling it "the most important book you\'ll ever read." The book describes Frankl\'s experiences as a prisoner in Nazi concentration camps and his psychological theory that finding meaning is the primary motivational force in human beings. What struck me most was how Frankl observed that the prisoners who survived longest weren\'t necessarily the physically strongest but those who maintained a sense of purpose, even in the most horrific circumstances. His central argument — that we cannot avoid suffering but we can choose how we respond to it and find meaning within it — completely reframed how I viewed my own relatively minor struggles. After reading it, I spent weeks reflecting on what gave my own life meaning and started journaling regularly about my values and goals. The impact has been profound and lasting. It shifted my career decision-making from "What job pays the most?" to "What work feels meaningful?" and ultimately led me toward a career in education. Even now, whenever I feel overwhelmed by life\'s challenges, I return to Frankl\'s central insight that meaning can be found anywhere if you\'re willing to look for it.',
            breakdown: {
                situation: 'During my gap year between university and my first job, I was feeling lost and directionless, questioning my purpose. A respected professor had recommended "Man\'s Search for Meaning" by Viktor Frankl, calling it the most important book I\'d ever read.',
                task: 'The book describes Frankl\'s experiences in Nazi concentration camps and his theory that finding meaning is the primary motivational force in human beings. It challenged me to examine my own sense of purpose during a period of uncertainty.',
                action: 'What struck me was that survivors weren\'t the strongest but those who maintained purpose. His argument that we can choose how we respond to suffering completely reframed my perspective. I spent weeks journaling about my values and goals afterwards.',
                result: 'The impact has been profound and lasting. It shifted my career thinking from "What pays most?" to "What feels meaningful?" leading me toward education. Whenever I feel overwhelmed, I return to Frankl\'s insight that meaning can be found anywhere.'
            }
        }
    },
    {
        topic: 'Describe something you bought that was difficult to use',
        prompts: ['What you bought', 'Why you bought it', 'What difficulties you had', 'And explain how you learned to use it'],
        category: 'Objects', bestStrategy: 'psi',
        followUpQuestions: ["Do you think products today are too complicated?","Have you ever considered returning something because it was too hard to use?"],
        sampleAnswer: {
            text: 'I\'d like to talk about my espresso machine, which I purchased about a year ago but found surprisingly challenging to master. The problem was that I\'m a real coffee enthusiast, and I was spending a fortune at coffee shops every day, sometimes up to $5-6 per cup. I decided to invest in a semi-automatic espresso machine, thinking it would pay for itself within a few months. However, I quickly discovered that making quality espresso is much more complex than I had anticipated. The difficulties came from multiple angles. First, there were numerous variables to control - the grind size, water temperature, extraction time, milk steaming technique, and pressure levels. My initial attempts were disastrous: the coffee was either too bitter from over-extraction, too weak, or the milk would either be too hot and scalded or not properly frothed. The instruction manual was technical and unhelpful, filled with jargon I didn\'t understand. I felt frustrated because I\'d spent a significant amount of money on something I couldn\'t use properly. My learning process involved several strategies. I started by watching countless YouTube tutorials from professional baristas, taking detailed notes on their techniques. I also joined an online coffee enthusiast forum where experienced users answered my specific questions and troubleshot my problems. Most importantly, I committed to practicing daily, keeping a coffee journal where I recorded my settings and results for each attempt. Gradually, I began understanding how small adjustments affected the final taste. After about two months of dedicated practice, I finally started producing café-quality espresso consistently. The positive results have been remarkable. Not only have I saved hundreds of dollars, but I\'ve also developed a genuine skill and deeper appreciation for the craft of coffee making. The experience taught me valuable lessons about patience and the learning curve involved in mastering any new skill. Now, making my morning espresso has become a meditative ritual I actually look forward to, and friends often comment that my coffee rivals what they get at professional cafés. This challenge transformed from a frustrating purchase into one of my most rewarding investments.',
            breakdown: {
                problem: 'Bought expensive espresso machine to save money, but too complex - multiple variables to control, initial attempts disastrous, felt frustrated after spending significant money',
                solution: 'Watched YouTube tutorials, joined online forum for expert help, practiced daily, kept coffee journal tracking settings and results, learned through gradual adjustments',
                impact: 'After 2 months produced café-quality coffee consistently, saved hundreds of dollars, developed genuine skill and appreciation',
                learning: 'Taught patience and learning curves in mastering skills, morning espresso became meditative ritual, transformed frustrating purchase into rewarding investment'
            }
        }
    },

    // Activities & Hobbies (25-29)
    {
        topic: 'Describe a hobby you enjoy',
        prompts: ['What the hobby is', 'When you started it', 'How you do it', 'And explain why you enjoy this hobby'],
        category: 'Hobbies', bestStrategy: 'ppf',
        followUpQuestions: ["Do you think hobbies are important for mental health?","Would you ever turn your hobby into a career?"],
        sampleAnswer: {
            text: 'I\'d like to talk about my hobby of photography, which has become a significant part of my life. I first got interested in photography about five years ago when a friend lent me his camera during a trip to the mountains. I was fascinated by how you could capture a moment and preserve it forever, and I realized I had a natural eye for composition. At first, I just used my phone camera and took random shots, but gradually I became more serious about learning proper techniques through online tutorials and photography books. These days, I\'m quite dedicated to photography and have even invested in a professional DSLR camera with several lenses. I typically go out shooting at least twice a week, either early in the morning for sunrise shots or during the golden hour before sunset. I particularly enjoy landscape and street photography because they allow me to document the world around me. I\'ve also joined a local photography club where we share techniques and organize photo walks together. Looking ahead, I\'m planning to create an online portfolio and perhaps even exhibit my work at a local gallery next year. I might also start teaching basic photography to beginners, as I\'d love to share this passion with others. Photography is significant to me because it\'s taught me to slow down and truly observe my surroundings, noticing beauty in everyday moments that I would have previously overlooked.',
            breakdown: {
                past: 'Started 5 years ago, friend lent camera on mountain trip, fascinated by capturing moments, used phone at first, learned through tutorials',
                present: 'Dedicated hobby, have professional DSLR, shoot twice weekly (sunrise/sunset), enjoy landscape and street, joined photography club',
                future: 'Planning online portfolio, gallery exhibition next year, might teach beginners',
                significance: 'Taught me to slow down, observe surroundings, notice beauty in everyday moments'
            }
        }
    },
    {
        topic: 'Describe a sport you like to watch',
        prompts: ['What the sport is', 'How you watch it', 'Why you like watching it', 'And explain how it makes you feel'],
        category: 'Hobbies', bestStrategy: '5wf',
        followUpQuestions: ["Do you think watching sport is as beneficial as playing it?","Has the way people watch sport changed in recent years?"],
        sampleAnswer: {
            text: 'I\'d like to talk about watching tennis, which has become something of an obsession for me over the past few years. What I love about tennis is that it\'s both physically demanding and deeply strategic — it\'s essentially a chess match played at incredible speed, where players must read their opponent\'s body language, anticipate shots, and make split-second tactical decisions. Unlike team sports, there\'s nowhere to hide in tennis; it\'s one person against another, which creates extraordinary psychological drama. My favourite players to watch are those with contrasting styles — the aggressive power of a big server versus the elegant defensive retrieving of a counter-puncher — because the tactical battle is endlessly fascinating. I typically watch matches during the four Grand Slam tournaments throughout the year, which means I\'m glued to my screen for about eight weeks annually. I follow the Australian Open in January, the French Open in May, Wimbledon in July, and the US Open in September. I usually watch at home, often staying up until the early hours for matches in different time zones, armed with snacks and my phone to discuss key points with friends in our group chat. Tennis makes me feel genuinely thrilled and emotionally invested. During a tight fifth set, my heart rate rises as if I\'m playing myself. The sport has also taught me about resilience and mental toughness — watching how elite players recover from seemingly impossible positions is genuinely inspiring.',
            breakdown: {
                whatWho: 'Tennis — both physically demanding and deeply strategic, essentially a chess match at incredible speed. Players read body language, anticipate shots, and make split-second decisions. I love watching contrasting styles clash, like power servers against elegant counter-punchers.',
                whereWhen: 'I follow the four Grand Slam tournaments annually — Australian Open, French Open, Wimbledon, US Open — totalling about eight weeks of viewing. I watch at home, often staying up late for different time zones, with snacks and a group chat with friends.',
                why: 'Unlike team sports, there\'s nowhere to hide — it\'s one person against another, creating extraordinary psychological drama. The tactical battle between different playing styles is endlessly fascinating and never gets repetitive.',
                howFeelings: 'During a tight fifth set, my heart rate rises as if I\'m playing myself. The sport has taught me about resilience and mental toughness — watching elite players recover from seemingly impossible positions is genuinely inspiring and emotionally thrilling.'
            }
        }
    },
    {
        topic: 'Describe a skill you would like to learn',
        prompts: ['What the skill is', 'Why you want to learn it', 'How you plan to learn it', 'And explain how this skill would help you'],
        category: 'Hobbies', bestStrategy: 'ppf',
        followUpQuestions: ["What stops most people from learning new skills?","Do you think it is ever too late to learn something new?"],
        sampleAnswer: {
            text: 'A skill I\'d love to learn is playing the piano, something I\'ve been curious about for as long as I can remember. In the past, I had a few brief encounters with the instrument — my grandmother had an old upright piano in her living room, and as a child I\'d press the keys randomly, fascinated by the sounds. When I was about twelve, I begged my parents for lessons, but our family couldn\'t afford them at the time, and the desire quietly faded into the background of a busy adolescence. I\'d occasionally hear a beautiful piano piece in a film soundtrack or coffee shop and feel a pang of regret about never having pursued it. Currently, I\'m in a much better position to learn, both financially and in terms of time management. I\'ve been researching options and I\'m torn between hiring a private tutor for structured weekly lessons and using online platforms like Simply Piano, which offer flexibility for my irregular schedule. I\'ve even started watching YouTube tutorials to learn basic music theory, and I\'ve been visiting piano shops to test different keyboards, which I find tremendously exciting. Looking ahead, my plan is to start formal lessons within the next three months and commit to practising for at least thirty minutes daily. Within a year, I\'d love to be able to play a few complete pieces by composers like Chopin or Debussy. This skill would benefit me enormously because music has been shown to reduce stress, improve cognitive function, and enhance creativity — all things I value deeply in both my personal and professional life.',
            breakdown: {
                past: 'I\'ve been curious since childhood — my grandmother had an upright piano I\'d play randomly. At twelve, I begged for lessons but our family couldn\'t afford them. The desire faded during adolescence, though I\'d feel regret hearing beautiful piano pieces in films.',
                present: 'I\'m now in a better position financially and with time. I\'ve been researching private tutors versus online platforms, watching YouTube tutorials for basic music theory, and visiting piano shops to test keyboards, which is tremendously exciting.',
                future: 'My plan is to start formal lessons within three months and practise thirty minutes daily. Within a year, I\'d love to play complete pieces by Chopin or Debussy, building toward a skill I can enjoy for the rest of my life.',
                significance: 'This skill would benefit me enormously because music reduces stress, improves cognitive function, and enhances creativity — all things I value in personal and professional life. It would also fulfil a childhood dream I\'ve carried for over fifteen years.'
            }
        }
    },
    {
        topic: 'Describe an outdoor activity you enjoy',
        prompts: ['What the activity is', 'Where you do it', 'Who you do it with', 'And explain why you enjoy it'],
        category: 'Hobbies', bestStrategy: '5wf',
        followUpQuestions: ["Do you think children today spend enough time outdoors?","How do outdoor activities benefit people compared to indoor ones?"],
        sampleAnswer: {
            text: 'An outdoor activity I genuinely enjoy is hiking, which has become one of my favourite ways to spend a weekend. Hiking involves walking along trails through natural landscapes — forests, mountains, coastal paths — usually for several hours at a time, and it can range from gentle walks to challenging mountain ascents depending on the terrain and your fitness level. I typically hike on trails in the national park about an hour\'s drive from my city, where there are routes winding through dense pine forests, along ridge lines with spectacular valley views, and past glacial lakes with impossibly blue water. The park has dozens of marked trails ranging from easy two-hour loops to demanding full-day treks. I usually go hiking every other weekend, mostly on Saturdays, and I alternate between going with a small group of friends who share this interest and going alone when I need solitude and reflection time. With friends, we make it social — packing a picnic lunch, taking photos, and chatting along the trail. When I go alone, I put in my earphones, listen to a podcast or just the sounds of nature, and walk at my own pace without any agenda. The reason I enjoy hiking so much is that it satisfies multiple needs simultaneously — it\'s excellent exercise without feeling like a workout, it clears my head completely after a stressful work week, and it reconnects me with nature in a way that city living simply cannot. There\'s something profoundly satisfying about reaching a summit and seeing the world spread out below you that puts all your daily worries into perspective.',
            breakdown: {
                whatWho: 'Hiking — walking along trails through forests, mountains, and coastal paths for several hours. Ranges from gentle walks to challenging mountain ascents. I hike in a national park an hour from my city, with routes through pine forests, along ridge lines, and past glacial lakes.',
                whereWhen: 'The national park has dozens of marked trails from easy two-hour loops to demanding full-day treks. I go every other weekend, mostly Saturdays, alternating between hiking with friends and going alone for solitude and reflection.',
                why: 'It satisfies multiple needs simultaneously — excellent exercise without feeling like a workout, completely clears my head after stressful weeks, and reconnects me with nature in ways city living cannot provide.',
                howFeelings: 'There\'s something profoundly satisfying about reaching a summit and seeing the world spread out below you that puts daily worries into perspective. Whether social with friends or meditative alone, hiking leaves me feeling recharged and grounded every single time.'
            }
        }
    },
    {
        topic: 'Describe a creative activity you do',
        prompts: ['What the activity is', 'When you do it', 'How you learned to do it', 'And explain why you like doing it'],
        category: 'Hobbies', bestStrategy: 'ppf',
        followUpQuestions: ["Do you think creativity can be taught or is it natural?","How important is creativity in everyday life?"],
        sampleAnswer: {
            text: 'I\'d like to describe my hobby of watercolour painting, which I\'ve been doing for about four years now. My journey with painting began quite unexpectedly — I was on holiday in a small coastal town and wandered into a drop-in art workshop run by a local artist. She handed me a brush and a set of watercolours and guided me through painting a simple seascape. I was terrible at it, but something about the process felt incredibly calming and meditative, and I was hooked from that very first afternoon. When I returned home, I bought a basic watercolour set and watched beginner tutorials online. Those early paintings were honestly embarrassing — blotchy skies and wonky trees — but I persisted. Nowadays, I paint regularly, usually two or three evenings a week after dinner, and my skills have improved considerably. I\'ve moved from simple landscapes to more complex subjects like portraits and still-life compositions. I set up a small painting corner in my spare room with proper lighting and a wooden easel, and I\'ve accumulated quite a collection of brushes and pigments. I also attend a weekly watercolour class at a community centre where I\'ve met wonderful like-minded people. In the future, I\'d love to develop my skills enough to illustrate a children\'s book — that\'s been a secret dream of mine. I\'m also considering selling prints of my work at local craft markets. This hobby matters to me because it provides a creative outlet that\'s completely different from my analytical day job, and it\'s taught me that progress comes from embracing imperfection rather than fearing it.',
            breakdown: {
                past: 'Started unexpectedly four years ago during a holiday drop-in art workshop in a coastal town. A local artist guided me through a simple seascape — I was terrible but hooked by how calming and meditative it felt. Bought supplies and watched tutorials at home.',
                present: 'I paint two or three evenings weekly, progressing from simple landscapes to portraits and still-life. I have a dedicated painting corner with proper lighting and an easel, and I attend a weekly watercolour class at a community centre.',
                future: 'I\'d love to develop enough skill to illustrate a children\'s book — a secret dream of mine. I\'m also considering selling prints at local craft markets and perhaps taking an advanced workshop with a professional watercolourist.',
                significance: 'This hobby provides a creative outlet completely different from my analytical day job. It\'s taught me that progress comes from embracing imperfection rather than fearing it, and the meditative quality of painting keeps me mentally balanced.'
            }
        }
    },

    // Work & Education (30-34)
    {
        topic: 'Describe a subject you enjoyed studying',
        prompts: ['What the subject was', 'When you studied it', 'What you learned', 'And explain why you enjoyed it'],
        category: 'Education', bestStrategy: 'ppf',
        followUpQuestions: ["Do you think the education system focuses too much on exams?","How could schools make learning more enjoyable?"],
        sampleAnswer: {
            text: 'A subject I truly enjoyed studying was psychology, which I took as an elective during my second year at university. When I first signed up for the course, I\'ll admit my motivation was partly practical — I needed an elective credit and the timetable fitted my schedule. However, from the very first lecture on cognitive biases and how our brains systematically trick us, I was completely captivated. I remember learning about the bystander effect and feeling genuinely shocked that people are less likely to help someone in distress when others are present. Those early weeks opened my eyes to a field I\'d never seriously considered, and I started voluntarily reading textbooks and research papers beyond what was assigned. As the course progressed, I became increasingly engaged with topics like memory formation, behavioural conditioning, and social influence. Currently, although I didn\'t pursue psychology as my major, I apply what I learned almost daily. Understanding cognitive biases helps me make better decisions at work, knowledge of persuasion techniques makes me a more critical consumer of advertising and media, and awareness of group dynamics has improved how I collaborate in teams. Looking ahead, I\'m actually considering enrolling in an online psychology certificate programme to deepen my understanding, particularly in the area of organisational psychology. What made this subject so enjoyable was that it was simultaneously intellectually rigorous and deeply personal — every concept we studied could be observed in everyday life, which made the learning feel immediately relevant and endlessly fascinating.',
            breakdown: {
                past: 'Took psychology as a university elective partly for practical reasons, but was captivated from the first lecture on cognitive biases. Learning about the bystander effect genuinely shocked me, and I started voluntarily reading beyond assigned materials.',
                present: 'Although I didn\'t major in psychology, I apply it daily — cognitive bias awareness helps decisions at work, persuasion knowledge makes me a more critical consumer, and understanding group dynamics has improved my team collaboration.',
                future: 'I\'m considering enrolling in an online psychology certificate programme to deepen my understanding, particularly in organisational psychology, which would directly complement my career development and leadership aspirations.',
                significance: 'The subject was simultaneously intellectually rigorous and deeply personal — every concept could be observed in everyday life, making learning feel immediately relevant. It fundamentally changed how I understand human behaviour and my own thinking patterns.'
            }
        }
    },
    {
        topic: 'Describe a course you would like to take',
        prompts: ['What course it is', 'Where you could take it', 'Why you are interested in it', 'And explain how it would benefit you'],
        category: 'Education', bestStrategy: 'ppf',
        followUpQuestions: ["Do you think online courses are as valuable as traditional classes?","What prevents people from pursuing courses they are interested in?"],
        sampleAnswer: {
            text: 'A course I\'d really love to take is a hands-on woodworking programme offered at a craft school in my city. In the past, my interest in woodworking was sparked by watching my grandfather in his workshop when I was a child. He could transform rough planks into beautiful furniture using nothing but hand tools and decades of experience. I was mesmerised by the process but never had the opportunity to learn properly — we moved away when I was ten, and my grandfather passed away before I was old enough to apprentice with him. I\'ve carried a quiet fascination with the craft ever since, collecting woodworking magazines and watching countless YouTube videos of skilled craftspeople at work. At the moment, I\'ve been seriously looking into the six-month evening programme at the local craft school, which covers everything from selecting timber and understanding grain patterns to joinery techniques and finishing methods. The course costs about five hundred pounds and runs twice a week in the evenings, which would fit perfectly around my work schedule. I\'ve already visited the workshop and spoken with the instructor, who seemed incredibly knowledgeable and passionate. In the future, I envision this course giving me the foundational skills to build my own furniture — starting with simple shelving and working up to a dining table. This course would benefit me because working with my hands would provide a wonderful counterbalance to my screen-heavy office job, and creating tangible objects from raw materials would give me a sense of accomplishment that digital work simply cannot match.',
            breakdown: {
                past: 'My interest began watching my grandfather transform rough planks into beautiful furniture using hand tools. We moved away when I was ten and he passed away before I could apprentice. I\'ve carried this fascination ever since, collecting magazines and watching craftspeople online.',
                present: 'I\'ve been researching a six-month evening programme at a local craft school covering timber selection, grain patterns, joinery, and finishing. It costs five hundred pounds, runs twice weekly, and fits my work schedule. I\'ve visited the workshop and met the instructor.',
                future: 'I envision gaining foundational skills to build my own furniture — starting with simple shelving and eventually crafting a dining table. Long-term, I\'d love to have a small workshop at home where I can create pieces for family and friends.',
                significance: 'Working with my hands would counterbalance my screen-heavy office job, and creating tangible objects from raw materials would give me accomplishment that digital work cannot match. It would also honour my grandfather\'s memory through continuing his craft.'
            }
        }
    },
    {
        topic: 'Describe a project you worked on',
        prompts: ['What the project was', 'When you did it', 'Who you worked with', 'And explain what you learned from it'],
        category: 'Work', bestStrategy: 'star',
        followUpQuestions: ["Do you prefer working on projects alone or in a team?","What makes a project successful in your opinion?"],
        sampleAnswer: {
            text: 'I\'d like to describe a community garden project I worked on during my final year at university, which turned out to be one of the most rewarding experiences of my studies. The situation was that our neighbourhood had an abandoned lot behind the campus that had become an eyesore — overgrown with weeds, littered with rubbish, and generally avoided by everyone. A group of five students, including myself, proposed converting it into a community vegetable garden as our capstone social enterprise project. Our task was ambitious — we had just three months to design the space, secure funding, recruit volunteers, and get the garden operational before the growing season ended. I took on the role of project coordinator, which meant managing timelines, delegating tasks, and liaising between the university, the local council, and community members. What we did was break the project into clear phases. First, we ran a crowdfunding campaign that raised about two thousand pounds, supplemented by a small university grant. Then we organised weekend clean-up days where over forty volunteers helped clear the site. We built twelve raised beds from recycled timber, installed a rainwater collection system, and created a simple booking system so local families could reserve plots. The result exceeded all our expectations — within two months of opening, every plot was claimed, and families who\'d never spoken to each other were suddenly sharing gardening tips and surplus vegetables. I learned that effective leadership isn\'t about doing everything yourself but about empowering others and creating structures that allow a shared vision to flourish.',
            breakdown: {
                situation: 'During my final university year, an abandoned lot behind campus had become an overgrown, littered eyesore. Five students, including myself, proposed converting it into a community vegetable garden as our capstone social enterprise project.',
                task: 'We had just three months to design the space, secure funding, recruit volunteers, and get the garden operational before growing season ended. I took on the role of project coordinator, managing timelines and liaising between university, council, and community.',
                action: 'We ran a crowdfunding campaign raising two thousand pounds, organised weekend clean-ups with forty-plus volunteers, built twelve raised beds from recycled timber, installed rainwater collection, and created a plot booking system for local families.',
                result: 'Within two months, every plot was claimed and previously disconnected families were sharing gardening tips and surplus vegetables. I learned that effective leadership means empowering others and creating structures that let a shared vision flourish.'
            }
        }
    },
    {
        topic: 'Describe your dream job',
        prompts: ['What the job is', 'What you would do', 'What skills you would need', 'And explain why this would be your dream job'],
        category: 'Work', bestStrategy: '5wf',
        followUpQuestions: ["Do you think most people end up in their dream job?","Is job satisfaction more important than salary?"],
        sampleAnswer: {
            text: 'My dream job would be working as a documentary filmmaker, travelling the world to tell stories about people, cultures, and social issues that deserve wider attention. A documentary filmmaker researches compelling subjects, conducts interviews, captures footage on location, and crafts narratives that inform and move audiences. I envision myself specialising in environmental and cultural documentaries — exploring topics like disappearing indigenous languages, the impact of climate change on remote communities, or the revival of traditional crafts in the modern world. The work would involve spending weeks or months embedded in different communities, building trust with local people, and finding the universal human threads within specific stories. I\'d need a combination of technical skills — camera operation, sound recording, editing software proficiency — alongside softer skills like storytelling instinct, cultural sensitivity, and the patience to let stories unfold organically rather than forcing a predetermined narrative. Strong research abilities and the resilience to work in challenging conditions would also be essential. This would be my dream job because it combines everything I\'m passionate about — creativity, travel, human connection, and the potential to create genuine impact through storytelling. I\'ve always believed that documentaries have a unique power to build empathy by showing audiences lives and perspectives radically different from their own. The idea of spending my career doing work that both fulfils me personally and contributes something meaningful to public understanding feels like the ultimate professional aspiration.',
            breakdown: {
                whatWho: 'A documentary filmmaker — researching subjects, conducting interviews, capturing footage on location, and crafting narratives that inform and move audiences. I\'d specialise in environmental and cultural documentaries about disappearing languages, climate impact, and traditional craft revival.',
                whereWhen: 'The work would involve spending weeks or months embedded in different communities worldwide, building trust with local people, and finding universal human threads within specific stories told across diverse locations and cultures.',
                why: 'It combines everything I\'m passionate about — creativity, travel, human connection, and potential for genuine impact through storytelling. Documentaries have unique power to build empathy by showing audiences radically different lives and perspectives.',
                howFeelings: 'The idea of spending my career doing work that fulfils me personally while contributing meaningfully to public understanding feels like the ultimate professional aspiration. I feel genuinely excited imagining a life where curiosity and compassion drive my daily work.'
            }
        }
    },
    {
        topic: 'Describe a lesson or class that was particularly interesting',
        prompts: ['What the lesson was about', 'When you attended it', 'What you did in the lesson', 'And explain why it was interesting'],
        category: 'Education', bestStrategy: 'star',
        followUpQuestions: ["What makes a teacher truly memorable?","Do you think teaching methods need to change for the modern world?"],
        sampleAnswer: {
            text: 'I want to talk about a history lesson on the fall of the Berlin Wall that our teacher delivered in a way I\'ll never forget. This was during my A-level years, and I remember the situation vividly — it was a grey Tuesday afternoon, the kind where most students were fighting to stay awake, and none of us expected anything remarkable from what sounded like a dry Cold War history topic. Our teacher, Mr. Davies, walked in carrying a portable speaker and a stack of photocopied documents rather than his usual textbook. Instead of lecturing, he began by playing an actual radio broadcast from November 1989, when thousands of East Berliners were streaming through the checkpoints. The audio was crackling and chaotic, filled with cheering crowds and bewildered reporters struggling to describe what they were witnessing. He then distributed firsthand accounts he\'d collected from people who\'d actually been at the Wall that night — personal letters and diary entries describing the fear, the euphoria, and the disbelief of families reuniting after decades of separation. What made the lesson truly unforgettable was that Mr. Davies asked us to role-play a press conference, assigning each student a different perspective — a border guard, a West German politician, a separated grandmother, a Stasi officer. The room transformed from a sleepy classroom into a heated debate about freedom, duty, and the human cost of political ideology. The result was that I went home that evening and voluntarily spent three hours reading about the Cold War, something I\'d never have done otherwise. That lesson taught me that history isn\'t just dates and treaties — it\'s real people making choices under extraordinary pressure.',
            breakdown: {
                situation: 'During my A-levels on a grey Tuesday afternoon, our history teacher Mr. Davies walked in with a portable speaker and photocopied documents instead of his usual textbook for a lesson on the fall of the Berlin Wall.',
                task: 'None of us expected anything remarkable from what sounded like a dry Cold War topic. Most students were fighting to stay awake, and the class needed something extraordinary to engage with this pivotal historical moment.',
                action: 'He played an actual 1989 radio broadcast with cheering crowds and bewildered reporters, distributed firsthand accounts from people at the Wall, then had us role-play a press conference as border guards, politicians, separated grandmothers, and Stasi officers.',
                result: 'I went home and voluntarily spent three hours reading about the Cold War. That lesson taught me history isn\'t just dates and treaties but real people making choices under extraordinary pressure. It fundamentally changed how I engage with the past.'
            }
        }
    },

    // Media & Entertainment (35-39)
    {
        topic: 'Describe a movie that made an impression on you',
        prompts: ['What the movie was', 'When you watched it', 'What it was about', 'And explain why it made an impression on you'],
        category: 'Entertainment', bestStrategy: 'star',
        followUpQuestions: ["Do you think movies can change the way people think?","Are movies better enjoyed at home or in a cinema?"],
        sampleAnswer: {
            text: 'A movie that left a lasting impression on me is "The Pursuit of Happyness," which I watched about four years ago during a particularly challenging period in my own life. At that time, I was struggling with my job search after graduation and feeling quite discouraged about my future prospects. One evening, feeling especially down, I decided to watch this film, not knowing how much it would resonate with me. The movie tells the true story of Chris Gardner, played brilliantly by Will Smith, a struggling salesman who becomes homeless while caring for his young son. The challenge he faces is heartbreaking - he needs to maintain his dignity and hope while dealing with extreme poverty, homelessness, and the pressure of being a single father. Despite having almost nothing, he secures an unpaid internship at a prestigious stockbrokerage firm, competing against highly educated candidates while secretly living in shelters and even subway bathrooms with his son. What really struck me was how the film portrayed Gardner\'s response to these circumstances. Rather than giving up or becoming bitter, he demonstrated incredible resilience and determination. The scenes showing him studying for his broker exam late at night in homeless shelters, all while ensuring his son felt loved and secure, were particularly moving. He protected his child from the harsh reality of their situation, turning their hardships into adventures and never losing sight of his goal to build a better life for them both. His positivity in the face of seemingly insurmountable odds was truly inspiring. The result of his perseverance was ultimately triumphant - Gardner not only completed the internship but also secured the full-time position, eventually building his own multi-million dollar brokerage firm. However, the movie\'s power isn\'t just in this happy ending, but in showing the daily struggle and sacrifice required to achieve it. The impact this film had on me was profound and continues to this day. It gave me perspective on my own struggles, making me realize that my challenges were manageable compared to what others face. More importantly, it taught me that success isn\'t about avoiding failure or hardship, but about how you respond to it and whether you maintain hope and keep working toward your goals despite setbacks. Whenever I face difficulties now, I remember Gardner\'s journey and find renewed motivation. The film changed my attitude from "Why is this happening to me?" to "What can I learn from this and how can I overcome it?" It\'s a reminder that circumstances don\'t define us; our responses to them do.',
            breakdown: {
                situation: 'Watched "The Pursuit of Happyness" 4 years ago during difficult job search period, felt discouraged',
                task: 'Movie about Chris Gardner - homeless single father facing extreme poverty while competing for unpaid stockbrokerage internship',
                action: 'Gardner showed incredible resilience, studied in shelters, protected son from harsh reality, maintained positivity and determination despite odds',
                result: 'Film profoundly impacted me - gave perspective on struggles, taught success is about response not avoiding failure, changed attitude from victim to problem-solver'
            }
        }
    },
    {
        topic: 'Describe a song that has special meaning for you',
        prompts: ['What the song is', 'When you first heard it', 'What it is about', 'And explain why it is special to you'],
        category: 'Entertainment', bestStrategy: '5wf',
        followUpQuestions: ["Why do you think certain songs are connected to memories?","Has music become more or less meaningful in the digital age?"],
        sampleAnswer: {
            text: 'A song that holds incredibly special meaning for me is "Fix You" by Coldplay. It\'s a slow, building ballad that starts with a gentle organ melody and Chris Martin\'s vulnerable vocals before gradually swelling into a powerful crescendo of guitars and drums in the final chorus. The lyrics speak about trying to comfort someone who\'s going through a difficult time — lines like "When you try your best but you don\'t succeed" and "Lights will guide you home" are beautifully simple yet profoundly moving. I first heard this song about eight years ago during a particularly tough period when my parents were going through a divorce and I was struggling to hold myself together emotionally. I was seventeen, sitting alone in my room late at night, scrolling through music playlists, when this song came on randomly. I remember pressing replay about fifteen times in a row because every single lyric seemed to describe exactly what I was feeling — the frustration, the sadness, and yet this tiny flicker of hope that things would eventually improve. Since then, I\'ve listened to it hundreds of times, and it\'s become a kind of emotional anchor for me. Whenever I face a setback or feel overwhelmed, I put on this song and it reminds me that difficult periods are temporary and that healing is always possible. It also reminds me of that seventeen-year-old version of myself who survived something really hard, which gives me strength.',
            breakdown: {
                whatWho: '"Fix You" by Coldplay — a slow, building ballad starting with gentle organ and vulnerable vocals, swelling into a powerful guitar crescendo. Lyrics about comforting someone struggling, with beautifully simple yet profoundly moving lines.',
                whereWhen: 'First heard it about eight years ago when I was seventeen, during my parents\' divorce. Late at night, alone in my room, it came on randomly from a playlist. I pressed replay about fifteen times because every lyric described exactly what I was feeling.',
                why: 'The song captured my frustration, sadness, and tiny flicker of hope that things would improve. It became an emotional anchor — whenever I face setbacks, it reminds me that difficult periods are temporary and healing is always possible.',
                howFeelings: 'Listening to it reminds me of my seventeen-year-old self who survived something really hard, which gives me strength. Even after hundreds of listens, it still moves me deeply and connects me to both my vulnerability and my resilience.'
            }
        }
    },
    {
        topic: 'Describe a TV program you enjoy watching',
        prompts: ['What the program is', 'What it is about', 'How often you watch it', 'And explain why you enjoy it'],
        category: 'Entertainment', bestStrategy: '5wf',
        followUpQuestions: ["Do you think TV has a positive or negative influence on society?","How has the way people watch TV changed in recent years?"],
        sampleAnswer: {
            text: 'A TV programme I genuinely enjoy watching is a cooking competition called MasterChef, which has been airing for years and features amateur home cooks competing through a series of increasingly difficult challenges to win the title of MasterChef champion. Each episode typically involves contestants preparing dishes within tight time limits, being judged on creativity, technique, and flavour by a panel of professional chefs. What I find compelling about the show is that it\'s not just about food — it\'s about the personal stories behind each contestant, their passion for cooking, and the psychological pressure of performing under scrutiny. The contestants come from all walks of life — accountants, nurses, students, retired teachers — and watching them push beyond their comfort zones is genuinely inspiring. I watch it religiously every week during the season, usually on Wednesday and Thursday evenings. My partner and I have made it into a ritual — we cook something ourselves first, then sit down to watch the episode together, often pausing to debate whether we agree with the judges\' critiques. It\'s become one of those shared experiences that we both look forward to throughout the week. I enjoy it because it combines entertainment with education — I\'ve actually learned numerous cooking techniques and been inspired to try dishes I\'d never have considered otherwise. It\'s one of the few programmes that leaves me feeling motivated rather than passively entertained.',
            breakdown: {
                whatWho: 'MasterChef — a cooking competition where amateur home cooks face increasingly difficult challenges judged by professional chefs on creativity, technique, and flavour. Contestants from all walks of life push beyond their comfort zones.',
                whereWhen: 'I watch religiously every Wednesday and Thursday evening during the season. My partner and I have a ritual — we cook something first, then watch together, pausing to debate whether we agree with the judges\' critiques.',
                why: 'It\'s not just about food but personal stories, passion, and psychological pressure. Watching an accountant or nurse discover hidden culinary talent is genuinely inspiring, and it combines entertainment with genuine education.',
                howFeelings: 'I\'ve learned numerous cooking techniques and been inspired to try dishes I\'d never have considered. It\'s one of the few programmes that leaves me feeling motivated rather than passively entertained, and it\'s become a cherished shared experience with my partner.'
            }
        }
    },
    {
        topic: 'Describe a website you use regularly',
        prompts: ['What website it is', 'How often you use it', 'What you use it for', 'And explain why you find it useful'],
        category: 'Technology', bestStrategy: '5wf',
        followUpQuestions: ["Do you think the internet has made education more accessible?","Are there any websites you think are a waste of time?"],
        sampleAnswer: {
            text: 'A website I use regularly and find incredibly valuable is Khan Academy, which is a free educational platform offering courses and tutorials on an enormous range of subjects, from mathematics and science to economics and art history. The website has a clean, intuitive interface with video lessons typically lasting between five and fifteen minutes, followed by practice exercises that adapt to your skill level. What sets it apart from other educational sites is that everything is completely free, funded by donations, which means there are no paywalls or premium tiers — everyone gets the same quality content regardless of their financial situation. I use Khan Academy at least three or four times a week, usually in the evenings for about forty-five minutes per session. Currently, I\'m working through their statistics course to supplement my professional development, and I occasionally dip into their finance section when I want to understand investment concepts better. I discovered the site about four years ago when a colleague recommended it for brushing up on data analysis skills. The feature I appreciate most is their progress-tracking dashboard, which shows exactly where you are in each course and highlights areas where you need more practice. I find it useful because it allows me to learn at my own pace without the pressure or expense of formal classes. It\'s essentially democratised education in a way that feels genuinely revolutionary, and it\'s made me a firm believer that high-quality learning should be accessible to everyone, regardless of their background.',
            breakdown: {
                whatWho: 'Khan Academy — a free educational platform with video lessons of five to fifteen minutes followed by adaptive practice exercises. Covers mathematics, science, economics, art history, and more. Clean interface, no paywalls or premium tiers.',
                whereWhen: 'I use it three or four times weekly, usually evenings for forty-five minutes. Discovered it four years ago via a colleague\'s recommendation. Currently working through statistics for professional development and occasionally exploring finance and investment concepts.',
                why: 'Everything is free and funded by donations, meaning equal quality for everyone regardless of finances. The progress-tracking dashboard highlights areas needing practice. It allows self-paced learning without pressure or expense of formal classes.',
                howFeelings: 'I feel it\'s genuinely democratised education in a revolutionary way. It\'s made me a firm believer that high-quality learning should be accessible to everyone regardless of background, and I feel grateful every time I log on for the generosity of that model.'
            }
        }
    },
    {
        topic: 'Describe an advertisement that caught your attention',
        prompts: ['What the advertisement was for', 'Where you saw it', 'What it showed', 'And explain why it caught your attention'],
        category: 'Media', bestStrategy: 'star',
        followUpQuestions: ["Do you think advertising has too much influence on people?","Should there be stricter rules about advertising to children?"],
        sampleAnswer: {
            text: 'An advertisement that really caught my attention was a campaign by a Thai insurance company that I saw on YouTube about two years ago. The situation was that I was waiting for a music video to load and this ad started playing before it — normally I\'d skip after five seconds, but something about the opening scene made me stay. It showed a scruffy young man walking through a busy Bangkok street, and you could see people dismissing him as just another stranger. The story the advertisement told was beautifully simple — this man performs small, seemingly insignificant acts of kindness throughout his day: he shares his food with a stray dog, helps an elderly street vendor push her heavy cart, gives money to a mother begging for her daughter\'s school fees, and waters a neglected plant hanging above his front door. Each act takes only moments, and nobody thanks him or even notices. What made this ad remarkable was the payoff. Weeks pass in a time-lapse sequence, and gradually we see the impact of his kindness rippling outward — the dog follows him home and becomes his companion, the street vendor\'s business improves, the little girl is shown in a school uniform, and the plant bursts into beautiful flowers. The man himself gains nothing material, but the final shot shows him smiling with genuine contentment, and the tagline reads "What is the most valuable thing you can give?" I was genuinely moved — in fact, I had tears in my eyes by the end, which I\'d never have expected from an insurance advertisement. It caught my attention because it told a human story rather than pushing a product, and its message about the unseen value of kindness has stayed with me ever since.',
            breakdown: {
                situation: 'About two years ago, a Thai insurance company ad played before a YouTube video. Normally I\'d skip, but the opening scene of a scruffy young man walking through busy Bangkok streets while being dismissed by everyone made me stay and watch.',
                task: 'The ad told a beautifully simple story — the man performs small kindnesses throughout his day: sharing food with a stray dog, helping an elderly vendor, giving money to a begging mother, and watering a neglected plant. Nobody thanks him or notices.',
                action: 'Weeks pass in a time-lapse, and his kindness ripples outward — the dog becomes his companion, the vendor\'s business improves, the girl wears a school uniform, the plant bursts into flowers. The man gains nothing material but smiles with genuine contentment.',
                result: 'I had tears in my eyes by the end — unprecedented for an insurance ad. It caught my attention by telling a human story rather than pushing a product, and its message about the unseen value of kindness has stayed with me ever since.'
            }
        }
    },

    // Special Occasions & Festivals (40-44)
    {
        topic: 'Describe a festival or celebration in your country',
        prompts: ['What the festival is', 'When it takes place', 'What people do', 'And explain why it is important'],
        category: 'Festivals', bestStrategy: '5wf',
        followUpQuestions: ["Do you think traditional festivals are losing their significance?","How do younger generations feel about traditional celebrations?"],
        sampleAnswer: {
            text: 'I\'d like to talk about the Mid-Autumn Festival, which is one of the most beloved celebrations in my country, observed on the fifteenth day of the eighth lunar month, typically falling in September or October. It\'s essentially a harvest festival that dates back over three thousand years and is centred around family reunion, the full moon, and a sense of gratitude for the year\'s blessings. The most iconic symbol is the mooncake — a round, dense pastry filled with sweet lotus seed paste or red bean, sometimes containing a salted egg yolk in the centre to represent the moon. During the festival, families gather for elaborate dinners, exchange boxes of mooncakes as gifts, and then go outdoors to admire the full moon together, often in parks or on rooftops. Children carry colourful paper lanterns in various shapes — rabbits, fish, stars — creating a magical atmosphere in the streets after dark. In many cities, there are also lion dances, lantern riddle competitions, and cultural performances in public squares. The reason this festival is important goes beyond tradition — in a modern society where family members often live and work in different cities, the Mid-Autumn Festival serves as a powerful anchor that brings everyone home. It reminds people to pause their busy lives, reconnect with loved ones, and appreciate the simple beauty of sharing food and conversation under a luminous moon. For many families, including mine, the emotional significance of this gathering rivals that of the New Year celebration.',
            breakdown: {
                whatWho: 'The Mid-Autumn Festival — a harvest celebration dating back over three thousand years, centred on family reunion, the full moon, and gratitude. Its iconic symbol is the mooncake — round pastry with lotus seed paste or red bean, sometimes containing a salted egg yolk representing the moon.',
                whereWhen: 'Observed on the fifteenth day of the eighth lunar month, typically September or October. Families gather for elaborate dinners, exchange mooncakes, and go outdoors to admire the full moon in parks or on rooftops. Children carry colourful paper lanterns after dark.',
                why: 'In modern society where family members live in different cities, the festival serves as a powerful anchor bringing everyone home. It reminds people to pause busy lives, reconnect with loved ones, and appreciate the beauty of sharing food under a luminous moon.',
                howFeelings: 'For many families including mine, the emotional significance rivals the New Year celebration. There\'s something profoundly comforting about knowing that no matter how scattered we become, this festival will always gather us together under the same moon.'
            }
        }
    },
    {
        topic: 'Describe a special meal you had',
        prompts: ['What you ate', 'Where you had this meal', 'Who you were with', 'And explain why it was special'],
        category: 'Food', bestStrategy: 'star',
        followUpQuestions: ["Do you think sharing a meal brings people closer together?","Is food culture important for preserving traditions?"],
        sampleAnswer: {
            text: 'I\'d like to describe a special meal I had at a tiny family-run restaurant in a fishing village during a trip to southern Portugal about eighteen months ago. The situation was that my partner and I had been driving along the Algarve coast and stumbled upon this place entirely by accident — it was just a whitewashed building with blue shutters, about eight tables crammed onto a terrace overlooking the harbour, with fishing boats bobbing gently in the water below. There was no printed menu; instead, the owner, a weathered man in his sixties named Manuel, simply told us what his wife was cooking that day based on the morning\'s catch. Our task was easy — we just nodded and said yes to everything he suggested, trusting his obvious passion and expertise completely. What arrived was extraordinary. We started with grilled sardines so fresh they practically melted, drizzled with olive oil and lemon, alongside crusty bread still warm from the oven. The main course was a traditional cataplana — a copper pot filled with clams, prawns, chorizo, and potatoes in a fragrant tomato and white wine broth. Every bite was bursting with flavour, and the simplicity of the ingredients made the quality even more impressive. Manuel kept appearing with unlabelled bottles of local wine, refusing to let our glasses stay empty. The entire meal cost surprisingly little, but its value was immeasurable. It was special because it combined perfect food with a perfect setting and the warmth of genuine hospitality, reminding me that the most memorable dining experiences are never about Michelin stars but about authenticity and human connection.',
            breakdown: {
                situation: 'Eighteen months ago in southern Portugal, my partner and I stumbled upon a tiny family-run restaurant in a fishing village — eight tables on a terrace overlooking the harbour, whitewashed walls with blue shutters, fishing boats bobbing below.',
                task: 'The owner Manuel, a weathered man in his sixties, told us what his wife was cooking based on the morning\'s catch. There was no printed menu, so we simply trusted his obvious passion and said yes to everything he suggested.',
                action: 'We started with grilled sardines so fresh they melted, with olive oil, lemon, and warm crusty bread. The main course was a traditional cataplana — clams, prawns, chorizo, and potatoes in fragrant tomato and white wine broth. Manuel kept refilling our glasses with local wine.',
                result: 'The meal cost surprisingly little but was immeasurably valuable. It was special because it combined perfect food, a perfect setting, and genuine hospitality, reminding me that the most memorable dining experiences are about authenticity and human connection, not Michelin stars.'
            }
        }
    },
    {
        topic: 'Describe a party or celebration you attended',
        prompts: ['What the occasion was', 'Where it took place', 'Who was there', 'And explain why it was memorable'],
        category: 'Events', bestStrategy: 'star',
        followUpQuestions: ["Do you prefer large parties or small gatherings?","How have celebrations changed compared to your parents' generation?"],
        sampleAnswer: {
            text: 'I\'d like to talk about a surprise thirtieth birthday party I attended for my older sister, which was organised by her husband and took weeks of secret planning. The situation was that my sister had been saying for months that she didn\'t want any fuss for her birthday and just wanted a quiet dinner at home. Her husband, however, knew her well enough to understand that she secretly hoped for something special, so he quietly recruited about fifteen of us — family members and close friends — to plan a surprise celebration at a rooftop restaurant downtown. The task of keeping everything secret was genuinely challenging because my sister is incredibly perceptive and suspicious by nature. We created a fake group chat without her, coordinated alibis for the evening, and I personally had to lie to her face three times about my weekend plans, which I found surprisingly stressful. On the night itself, her husband told her they were going out for a casual dinner at a new restaurant. When she walked through the door and saw all of us standing there shouting "Surprise!", she literally froze for about five seconds before bursting into tears of happiness. We\'d decorated the entire terrace with fairy lights, printed childhood photos of her on banners, and each guest had written a personal message in a memory book. The evening was filled with laughter, dancing, heartfelt speeches, and far too much champagne. It was memorable because it showed how many people genuinely love my sister, and the look of pure joy on her face when she realised what we\'d done is an image I\'ll carry with me forever.',
            breakdown: {
                situation: 'My sister\'s husband secretly recruited fifteen family members and friends to plan a surprise thirtieth birthday at a rooftop restaurant, despite my sister insisting she wanted no fuss and just a quiet dinner at home.',
                task: 'Keeping everything secret was genuinely challenging because my sister is incredibly perceptive. We created a fake group chat, coordinated alibis, and I had to lie to her face three times about my weekend plans, which was surprisingly stressful.',
                action: 'Her husband said they were going for a casual dinner. When she walked in and saw us shouting "Surprise!", she froze for five seconds then burst into tears. We\'d decorated with fairy lights, childhood photo banners, and a memory book with personal messages from each guest.',
                result: 'The evening was filled with laughter, dancing, speeches, and champagne. It was memorable because it showed how many people genuinely love my sister, and the look of pure joy on her face is an image I\'ll carry with me forever.'
            }
        }
    },
    {
        topic: 'Describe a tradition in your family',
        prompts: ['What the tradition is', 'How long it has existed', 'How you celebrate it', 'And explain why it is important to your family'],
        category: 'Traditions', bestStrategy: 'ppf',
        followUpQuestions: ["Do you think family traditions are important for children?","Are there any traditions you would like to start in your own family?"],
        sampleAnswer: {
            text: 'I\'d like to describe a wonderful tradition in my family — our annual New Year\'s Day brunch, which has been going on for as long as I can remember. This tradition started over twenty-five years ago when my grandparents decided they wanted a guaranteed occasion each year that would bring the entire extended family together under one roof. In the early years, it was a relatively small affair held at my grandparents\' house, with perhaps twelve or fifteen people gathering around a long table in their dining room. My grandmother would prepare her famous cinnamon rolls, freshly squeezed orange juice, and an enormous frittata, while my grandfather made his signature Turkish coffee. As children, my cousins and I would race around the garden while the adults caught up over endless cups of coffee. These days, the tradition has grown considerably — we now have about thirty family members attending, and we rotate hosting duties between five households since no single home can comfortably fit everyone. Each family brings a dish, so the brunch has evolved into a magnificent feast reflecting our family\'s diverse tastes. We\'ve also added a new element where everyone shares their highlights from the past year and their hopes for the coming one, which always produces a lovely mix of laughter and occasional tears. Looking ahead, I\'m confident this tradition will continue for generations. My cousins and I have already discussed how we\'ll keep it going when our grandparents can no longer host, and some of us are introducing our own children to the ritual. This tradition is profoundly important because it serves as an unbreakable thread connecting three generations, reminding us that despite busy lives pulling us in different directions, we always have this one day that brings us back together.',
            breakdown: {
                past: 'Started over twenty-five years ago when grandparents wanted a guaranteed annual gathering. Originally small — twelve to fifteen people at their house with grandmother\'s cinnamon rolls, frittata, and grandfather\'s Turkish coffee while cousins raced around the garden.',
                present: 'Now about thirty family members attend, rotating between five households. Each family brings a dish creating a magnificent feast. We\'ve added sharing yearly highlights and hopes, producing a lovely mix of laughter and occasional tears.',
                future: 'Confident it will continue for generations. Cousins and I have discussed keeping it going when grandparents can no longer host, and some of us are already introducing our own children to the ritual and its meaning.',
                significance: 'This tradition serves as an unbreakable thread connecting three generations. Despite busy lives pulling us in different directions, we always have this one day that brings us back together, reminding us what truly matters.'
            }
        }
    },
    {
        topic: 'Describe a wedding you attended',
        prompts: ['Whose wedding it was', 'Where it took place', 'What happened', 'And explain how you felt about it'],
        category: 'Events', bestStrategy: 'star',
        followUpQuestions: ["Do you think weddings have become too expensive nowadays?","How are wedding traditions changing in your country?"],
        sampleAnswer: {
            text: 'I\'d like to talk about a beautiful outdoor wedding I attended last autumn for my university friend Mei and her partner Tom, which took place at a converted barn surrounded by rolling countryside about two hours from the city. The situation was that Mei and Tom had been together for eight years and had deliberately waited until they could afford the wedding they\'d always dreamed of — something intimate, natural, and far from the typical hotel banquet hall. They invited only sixty guests, which gave the whole event an incredibly warm, personal atmosphere. My role was to be one of the readers during the ceremony, which meant I had to prepare a passage from a novel that was meaningful to the couple — they\'d chosen a paragraph from "Captain Corelli\'s Mandolin" about the nature of enduring love. Reading those words aloud while looking at two people who clearly adored each other was genuinely one of the most moving experiences of my life, and I had to pause twice to compose myself. The ceremony was held under an enormous oak tree decorated with hanging lanterns, and the reception featured long wooden tables covered in wildflowers, candles, and handwritten place cards. Instead of a formal sit-down dinner, they served food family-style — huge platters of roasted meats, salads, fresh bread, and local cheeses that guests passed around, which encouraged conversation between strangers. The evening ended with dancing under fairy lights in the barn while a folk band played. I felt deeply honoured to have witnessed and participated in their celebration, and it reinforced my belief that weddings are at their best when they reflect the genuine personality of the couple rather than conforming to expensive conventions.',
            breakdown: {
                situation: 'Last autumn, my university friend Mei and her partner Tom held an intimate outdoor wedding at a converted barn in rolling countryside, with only sixty guests. They\'d waited eight years to afford the natural, personal celebration they\'d always dreamed of.',
                task: 'I was chosen as a reader during the ceremony, preparing a passage from "Captain Corelli\'s Mandolin" about enduring love. Reading those words aloud while looking at two people who clearly adored each other was one of the most moving experiences of my life.',
                action: 'The ceremony was under an enormous oak tree with hanging lanterns. Reception featured long wooden tables with wildflowers and family-style platters of roasted meats, salads, and local cheeses that encouraged strangers to talk. The evening ended with folk band dancing under fairy lights.',
                result: 'I felt deeply honoured to witness and participate. It reinforced my belief that weddings are at their best when they reflect the couple\'s genuine personality rather than conforming to expensive conventions. The intimacy made every moment feel meaningful.'
            }
        }
    },

    // Environmental & Social (45-49)
    {
        topic: 'Describe an environmental problem in your country',
        prompts: ['What the problem is', 'What causes it', 'What effects it has', 'And explain what could be done about it'],
        category: 'Environment', bestStrategy: 'psi',
        followUpQuestions: ["Do you think individuals or governments should take more responsibility for the environment?","Are young people more concerned about environmental issues than older generations?"],
        sampleAnswer: {
            text: 'One of the most pressing environmental issues in my country is urban air pollution, particularly in major cities where millions of people live and work. The problem is severe enough that we often have to check air quality indices before going outside, and people wear masks not because of illness, but because of poor air quality. The causes of this problem are multiple and interconnected. The primary factor is the massive increase in vehicles on our roads - in the past two decades, car ownership has tripled, and the majority of these vehicles still run on conventional fuels rather than clean energy. Additionally, many factories and industrial plants operate with outdated technology that releases excessive emissions. Construction sites generate enormous amounts of dust, and during certain seasons, agricultural burning in surrounding regions contributes to the problem. Our geographic location in a valley also means pollutants tend to get trapped rather than dispersed. The impacts on daily life and health are significant and concerning. Respiratory illnesses, especially asthma and bronchitis, have increased dramatically among both children and elderly populations. On severely polluted days, schools sometimes cancel outdoor activities, and hospitals see a spike in emergency room visits. The visibility is reduced, affecting transportation safety, and there\'s growing evidence linking air pollution to cardiovascular problems and reduced life expectancy. Tourism has also suffered, as visitors are increasingly concerned about health risks. Addressing this crisis requires a comprehensive, multi-faceted approach. First, the government needs to invest heavily in public transportation infrastructure - expanding metro systems, introducing more electric buses, and creating dedicated bike lanes to reduce car dependency. Stricter emission standards for vehicles and industrial operations must be enforced with meaningful penalties for violations. We should offer tax incentives for companies that adopt clean technology and for individuals who purchase electric vehicles. Urban planning needs to incorporate more green spaces, as trees and plants naturally filter air pollutants. Education campaigns can raise public awareness about personal contributions to pollution and encourage behavioral changes. While these solutions require significant investment and political will, the cost of inaction is far higher - both in terms of public health expenses and quality of life for millions of citizens.',
            breakdown: {
                problem: 'Severe urban air pollution in major cities, check air quality daily, people wear masks, affects millions',
                solution: 'Multi-faceted approach: invest in public transport (metro, electric buses, bike lanes), enforce stricter emission standards with penalties, tax incentives for clean tech and electric vehicles, more urban green spaces, education campaigns',
                impact: 'Respiratory illnesses increased, schools cancel outdoor activities, hospital emergencies spike, reduced visibility, tourism suffers, cardiovascular problems',
                learning: 'Solutions require investment and political will, but cost of inaction is higher in health expenses and quality of life'
            }
        }
    },
    {
        topic: 'Describe a law you think is good',
        prompts: ['What the law is', 'How you know about it', 'Who it affects', 'And explain why you think it is good'],
        category: 'Society', bestStrategy: 'ibc',
        followUpQuestions: ["Do you think laws always reflect what is best for society?","Should citizens have more say in the laws that are made?"],
        sampleAnswer: {
            text: 'I\'d like to discuss a law in my country that I believe is particularly beneficial - the mandatory parental leave policy that was introduced about five years ago. This law requires all employers to provide at least six months of paid parental leave, which can be shared between both parents, and it applies to companies of all sizes. I first learned about this law through news coverage when it was being debated in parliament, and since then I\'ve witnessed its implementation and effects firsthand as several colleagues and friends have utilized it. The first major benefit of this law is that it promotes gender equality in the workplace and at home. Traditionally, only mothers took extended time off after having a baby, which often hurt their career progression. Now, with both parents entitled to leave and encouraged to share it, fathers are becoming more involved in early childcare, which helps break down gender stereotypes. This shared responsibility means women are less likely to face discrimination in hiring or promotion decisions, as employers know men might also take extended leave. The second significant advantage is the positive impact on child development and family bonding. Research consistently shows that children benefit enormously when parents can be present during the crucial early months of life. The law recognizes that those first six months are critical for establishing secure attachments, and it shouldn\'t be a luxury only available to wealthy families. Parents can focus on their newborn without the stress of financial hardship or fear of losing their jobs. Additionally, this policy has broader economic implications that might not be immediately obvious. While some businesses initially complained about the costs, studies have shown that generous parental leave actually increases employee loyalty and reduces turnover, which saves companies money in recruitment and training. Parents who feel supported by their employers tend to be more productive and committed when they return to work. The policy also supports population growth, which is crucial for our aging society - couples are more willing to have children when they know they\'ll receive adequate support. In conclusion, I believe this parental leave law is excellent because it balances multiple important considerations: children\'s wellbeing, gender equality, family stability, and even long-term economic health. It reflects a society that values both family life and professional development, recognizing that supporting parents ultimately benefits everyone.',
            breakdown: {
                intro: 'Beneficial law: 6-month paid parental leave policy introduced 5 years ago, applies to all companies, both parents can share it',
                body1: 'Promotes gender equality - fathers involved in childcare, breaks stereotypes, women face less career discrimination, shared responsibility',
                body2: 'Positive for child development - critical first 6 months for attachment, not just for wealthy families, removes financial stress and job loss fear',
                conclusion: 'Excellent law balancing children\'s wellbeing, gender equality, family stability, and economic health - supports parents benefits everyone'
            }
        }
    },
    {
        topic: 'Describe something you do to stay healthy',
        prompts: ['What you do', 'When you do it', 'How you learned about it', 'And explain why it helps you stay healthy'],
        category: 'Health', bestStrategy: 'ppf',
        followUpQuestions: ["Do you think people today are healthier or less healthy than previous generations?","What is the biggest obstacle to living a healthy lifestyle?"],
        sampleAnswer: {
            text: 'Something I do to stay healthy is practise yoga, which has become a cornerstone of my daily routine over the past three years. Before I discovered yoga, I\'d tried various forms of exercise to stay fit — I went through phases of gym memberships, running, and home workout videos — but nothing stuck because I found them either boring or punishing on my joints. My relationship with exercise was basically one of guilt and obligation rather than genuine enjoyment. A friend who noticed I was constantly complaining about back pain and poor sleep dragged me to a beginner\'s yoga class at a studio near our workplace, and I was surprised by how different it felt from what I\'d expected. Currently, I practise yoga six mornings a week, waking up at six o\'clock for a forty-five-minute session in my living room. I follow a mix of online classes and sequences I\'ve memorised over the years, alternating between energising vinyasa flows on mornings when I need a boost and gentler restorative sessions when my body needs recovery. I\'ve also started incorporating ten minutes of meditation at the end of each practice, which has dramatically improved my ability to handle stress at work. In the future, I plan to complete a yoga teacher training course, not necessarily to teach professionally but to deepen my understanding of the practice and its philosophy. Yoga helps me stay healthy because it addresses the whole person — it strengthens muscles and improves flexibility, certainly, but it also calms the nervous system, improves sleep quality, and teaches you to listen to your body rather than constantly pushing through discomfort. My chronic back pain has virtually disappeared, and I genuinely feel ten years younger than I did before starting.',
            breakdown: {
                past: 'Before yoga, I cycled through gym memberships, running, and home workouts but nothing stuck — exercise felt like guilt and obligation. A friend dragged me to a beginner\'s class when I complained about chronic back pain and poor sleep, and I was surprised by the experience.',
                present: 'I practise six mornings weekly at six o\'clock for forty-five minutes, alternating energising vinyasa flows with restorative sessions. I\'ve added ten minutes of meditation afterwards, which has dramatically improved my stress management at work.',
                future: 'I plan to complete a yoga teacher training course — not necessarily to teach professionally but to deepen my understanding of the practice and its philosophy, and perhaps eventually guide friends and family through sessions.',
                significance: 'Yoga addresses the whole person — strengthening muscles and flexibility while calming the nervous system and improving sleep. My chronic back pain has virtually disappeared and I genuinely feel ten years younger. It taught me to listen to my body rather than constantly pushing through.'
            }
        }
    },
    {
        topic: 'Describe a time when you helped the environment',
        prompts: ['What you did', 'When you did it', 'Why you did it', 'And explain how you felt about helping the environment'],
        category: 'Environment', bestStrategy: 'star',
        followUpQuestions: ["Do you think small individual actions can really make a difference?","Should environmental education be compulsory in schools?"],
        sampleAnswer: {
            text: 'I\'d like to describe the time I organised a beach clean-up with a group of friends along a stretch of coastline near my hometown, which turned out to be both eye-opening and deeply satisfying. The situation was that I\'d gone for a walk along this particular beach after a bank holiday weekend and was genuinely horrified by the amount of litter left behind — plastic bottles, food wrappers, cigarette butts, and even abandoned camping equipment scattered across what is normally a beautiful natural area. I\'d always considered myself environmentally conscious but had never actually done anything proactive about it, and seeing that mess triggered something in me. My goal was to clean up at least a kilometre of coastline the following Saturday and hopefully raise awareness among the local community. I created an event on social media, invited everyone I knew, and contacted the local council for rubbish bags and collection support. To my surprise, twenty-three people showed up on the day, including several strangers who\'d seen the post being shared. We spent four hours working our way along the beach, filling over forty large bin bags with waste. I was particularly disturbed by the amount of microplastics mixed into the sand — tiny fragments that were nearly impossible to collect and clearly dangerous to marine life. By the end of the day, the beach looked transformed, and several local walkers stopped to thank us and ask how they could help next time. I felt a powerful combination of anger at the carelessness that created the mess and pride in what our small group had accomplished. The experience motivated me to make the clean-up a monthly event, and we\'ve now done twelve sessions with a growing group of regular volunteers.',
            breakdown: {
                situation: 'After a bank holiday weekend, I walked along a beach near my hometown and was horrified by the litter — plastic bottles, food wrappers, cigarette butts, and abandoned camping equipment across what is normally beautiful coastline.',
                task: 'I\'d always considered myself environmentally conscious but had never done anything proactive. My goal was to clean at least a kilometre of coastline the following Saturday and raise community awareness about the issue.',
                action: 'I created a social media event, contacted the local council for rubbish bags, and twenty-three people showed up including strangers. We spent four hours filling over forty bin bags, finding disturbing amounts of microplastics mixed into the sand.',
                result: 'The beach looked transformed and local walkers stopped to thank us. I felt both anger at the carelessness and pride in our accomplishment. It motivated me to make it monthly — we\'ve now done twelve sessions with a growing group of regular volunteers.'
            }
        }
    },
    {
        topic: 'Describe a change you would like to see in your local area',
        prompts: ['What the change would be', 'Why you want this change', 'How it could be achieved', 'And explain what benefits this change would bring'],
        category: 'Society', bestStrategy: 'psi',
        followUpQuestions: ["How can ordinary citizens influence local government decisions?","Do you think communities are better at solving problems than governments?"],
        sampleAnswer: {
            text: 'A change I\'d dearly love to see in my local area is the creation of a proper network of cycling lanes connecting the residential neighbourhoods to the city centre and major workplaces. The problem is that currently, cycling in my area is genuinely dangerous — there are virtually no dedicated bike lanes, so cyclists are forced to share narrow roads with heavy traffic, squeezing between parked cars and buses. I\'ve personally had several near-misses while cycling to work, and last year a young student was seriously injured at an intersection just two blocks from my apartment. The lack of safe infrastructure means that most people who might otherwise cycle are too afraid to do so, contributing to more cars on the road, worse air quality, and increased congestion — it\'s a vicious cycle, if you\'ll pardon the pun. The solution would involve the local council investing in a connected network of protected cycling lanes — not just painted lines on existing roads, but physically separated paths with barriers, clear signage, and priority at intersections. Cities like Amsterdam and Copenhagen have demonstrated that when you build proper cycling infrastructure, people use it in enormous numbers. The council could start with three or four key routes connecting the largest residential areas to the business district and university, then expand from there based on usage data. This could be funded through a combination of national transport grants and a modest congestion charge on cars entering the centre. The positive impact would be substantial and wide-ranging. Air pollution would decrease, traffic congestion would ease, public health would improve as more people exercise during their commute, and the city would become a more pleasant place to live. I\'ve seen the transformation in other cities and I firmly believe it\'s achievable here with the right political will and community support.',
            breakdown: {
                problem: 'Cycling in my area is genuinely dangerous — no dedicated lanes, cyclists share narrow roads with heavy traffic. A student was seriously injured nearby last year. Fear keeps potential cyclists in cars, worsening congestion and air quality in a vicious cycle.',
                solution: 'The council should invest in physically separated cycling lanes with barriers and priority at intersections, starting with key routes between residential areas, business district, and university. Funded through national transport grants and a modest congestion charge.',
                impact: 'Air pollution would decrease, congestion would ease, public health would improve through active commuting, and the city would become more pleasant. Amsterdam and Copenhagen have proven that proper infrastructure attracts massive cycling uptake.',
                learning: 'I\'ve seen transformations in other cities and firmly believe it\'s achievable here with political will and community support. Sometimes the most impactful changes require initial investment but deliver returns that far exceed the cost over time.'
            }
        }
    },

    // Technology Changes (50-54)
    {
        topic: 'Describe an app on your phone that you use frequently',
        prompts: ['What the app is', 'When you started using it', 'What you use it for', 'And explain why you find it useful'],
        category: 'Technology', bestStrategy: 'ppf',
        followUpQuestions: ["Do you think people have become too dependent on mobile apps?","How might apps change in the next ten years?"],
        keyVocabulary: [{"word":"user-friendly","meaning":"easy to learn and use"},{"word":"intuitive","meaning":"easy to understand without instructions"},{"word":"indispensable","meaning":"absolutely necessary"},{"word":"notification","meaning":"an alert or message from an app"},{"word":"streamline","meaning":"to make a process simpler and more efficient"},{"word":"functionality","meaning":"the range of operations a program can perform"}],
        sampleAnswer: {
            text: 'I\'d like to talk about a language-learning app called Anki that I use on my phone virtually every single day. I first discovered it about three years ago when I was struggling to memorise English vocabulary for my IELTS preparation. A friend who had scored band eight recommended it, explaining that it uses a spaced repetition algorithm to help you retain information long-term rather than just cramming and forgetting. When I first started using it, I found the interface quite basic compared to flashier apps like Duolingo, and I honestly almost gave up after the first week because creating my own flashcard decks felt tedious. However, once I got into the habit of reviewing my cards every morning during my commute, I started noticing a remarkable improvement in my vocabulary retention. Words that used to slip out of my memory within days were now sticking for weeks and months. Nowadays, Anki has become an absolutely indispensable part of my daily routine. I\'ve expanded beyond just vocabulary and now use it for grammar structures, collocations, and even pronunciation practice by attaching audio recordings to my cards. I typically spend about twenty to thirty minutes each morning working through my review queue, and I\'ve built up a collection of over two thousand cards across multiple decks. The app\'s algorithm automatically adjusts how frequently each card appears based on how well I remember it, which means I spend more time on difficult items and less on ones I\'ve already mastered. Looking ahead, I plan to continue using it long after my IELTS exam because the habit of daily review has become genuinely enjoyable rather than a chore. The reason I find it so useful is that it has fundamentally changed the way I approach learning — instead of passive reading, I now actively test myself, which research shows is far more effective for long-term retention.',
            breakdown: {
                past: 'Discovered Anki three years ago for IELTS vocab preparation on a friend\'s recommendation; initially found the basic interface off-putting and almost quit',
                present: 'Now an indispensable daily habit — 20-30 minutes each morning reviewing 2000+ cards across vocabulary, grammar, collocations, and pronunciation',
                future: 'Plans to continue using it beyond IELTS because the daily review habit has become genuinely enjoyable',
                significance: 'Fundamentally changed approach to learning from passive reading to active self-testing, which is far more effective for long-term retention'
            }
        }
    },
    {
        topic: 'Describe a gadget or piece of technology you own',
        prompts: ['What the gadget is', 'When you got it', 'How often you use it', 'And explain why this gadget is important to you'],
        category: 'Technology', bestStrategy: '5wf',
        followUpQuestions: ["Do you think people spend too much money on gadgets?","How do you decide when to upgrade your technology?"],
        keyVocabulary: [{"word":"cutting-edge","meaning":"very advanced and innovative"},{"word":"versatile","meaning":"able to be used for many different purposes"},{"word":"built-in","meaning":"included as part of the design"},{"word":"portable","meaning":"easy to carry around"},{"word":"upgrade","meaning":"to replace with a newer or better version"},{"word":"battery life","meaning":"how long a device can operate before needing to be recharged"}],
        sampleAnswer: {
            text: 'I\'d like to describe my noise-cancelling headphones, which are a pair of Sony WH-1000XM5s that I consider one of my most valuable possessions. They\'re over-ear headphones with a sleek matte black design, incredibly lightweight at around two hundred and fifty grams, and they fold flat for easy storage in my bag. The build quality is exceptional — the headband has a soft cushioning that doesn\'t press uncomfortably even after hours of wear, and the ear cups are covered in synthetic leather that feels premium without being sweaty. I received them as a birthday gift from my parents about eighteen months ago, and I remember being absolutely thrilled when I unboxed them because I\'d been eyeing that particular model for months but couldn\'t justify the expense on my student budget. I use them every single day without exception — during my morning commute on the crowded metro, while studying at the library, during video calls for my part-time remote job, and in the evenings when I want to listen to podcasts or music without disturbing my flatmates. The noise-cancelling feature is what truly sets them apart. When I activate it on a noisy train, the cacophony of conversations, announcements, and rattling carriages simply melts away, replaced by blissful silence or whatever audio I choose to play. This has been transformative for my productivity because I can now study effectively in environments that would have previously been impossible. The reason they\'re so important to me goes beyond mere convenience. These headphones have genuinely improved my quality of life by giving me control over my acoustic environment. As someone who is easily distracted by background noise, having the ability to create a bubble of concentration whenever and wherever I need it has been a game-changer for both my academic performance and my mental wellbeing.',
            breakdown: {
                what_who: 'Sony WH-1000XM5 noise-cancelling headphones — sleek matte black, lightweight at 250g, foldable, soft cushioned headband, premium synthetic leather ear cups',
                where_when: 'Received as birthday gift 18 months ago; used daily on metro commute, at library, during video calls, and evenings at home',
                why: 'The noise-cancelling feature transforms noisy environments into productive spaces; gives control over acoustic environment which is transformative for concentration',
                how_feelings: 'Genuinely improved quality of life — as someone easily distracted by noise, having a concentration bubble anywhere has been a game-changer for academics and mental wellbeing'
            }
        }
    },
    {
        topic: 'Describe a website you visit often',
        prompts: ['What the website is', 'What type of content it offers', 'How you first discovered it', 'And explain why you visit it regularly'],
        category: 'Technology', bestStrategy: 'ppf',
        followUpQuestions: ["Do you think websites will eventually be replaced by apps?","How do you evaluate whether information on a website is trustworthy?"],
        keyVocabulary: [{"word":"user interface","meaning":"the visual layout and design of a website"},{"word":"navigate","meaning":"to move around a website or system"},{"word":"bookmark","meaning":"to save a webpage for quick access later"},{"word":"algorithm","meaning":"a set of rules a computer follows to solve problems"},{"word":"curated content","meaning":"information carefully selected and organised"},{"word":"subscription","meaning":"a regular payment to access a service"}],
        sampleAnswer: {
            text: 'I\'d like to talk about a website I visit almost daily, which is The Guardian\'s online news platform. I first discovered it about four years ago when I was looking for reliable English-language news sources to improve my reading skills and stay informed about international affairs simultaneously. At that time, I was primarily using local Vietnamese news websites, but I found that reading news in English served the dual purpose of expanding my vocabulary and deepening my understanding of global issues. When I initially started browsing The Guardian, I was drawn to its clean layout and the depth of its journalism — unlike many news websites cluttered with clickbait headlines and intrusive advertisements, The Guardian presents articles in a straightforward manner with thoughtful analysis rather than sensationalism. Nowadays, visiting The Guardian has become a firmly established part of my morning routine. I typically spend about thirty to forty minutes each morning reading three or four articles while having breakfast. I\'ve developed particular interest in their opinion section, where columnists present well-argued perspectives on controversial topics, and their long-form weekend features, which explore subjects in extraordinary depth. The website\'s comment section is also valuable because it exposes me to diverse viewpoints from readers around the world, which has significantly broadened my critical thinking skills. Looking ahead, I plan to start a digital subscription to support their journalism because I believe quality reporting deserves financial support. The reason I keep returning is that The Guardian consistently provides intelligent, well-researched coverage that challenges me intellectually while simultaneously helping me develop my English proficiency in a natural, enjoyable way.',
            breakdown: {
                past: 'Discovered The Guardian four years ago while seeking English-language news to improve reading skills and global awareness; was drawn to its clean layout and depth of journalism',
                present: 'Firmly established morning routine — 30-40 minutes reading 3-4 articles daily; particularly enjoys opinion columns and long-form weekend features; comment section broadens critical thinking',
                future: 'Plans to start a digital subscription to support quality journalism financially',
                significance: 'Consistently provides intelligent, well-researched coverage that challenges intellectually while naturally developing English proficiency'
            }
        }
    },
    {
        topic: 'Describe an online course you have taken',
        prompts: ['What the course was about', 'Where you found it', 'How long it took to complete', 'And explain what you gained from it'],
        category: 'Technology', bestStrategy: 'star',
        followUpQuestions: ["Do you think online learning is as effective as classroom learning?","What subjects are best suited for online courses?"],
        keyVocabulary: [{"word":"self-paced","meaning":"allowing learners to progress at their own speed"},{"word":"curriculum","meaning":"the subjects and content covered in a course"},{"word":"certificate","meaning":"a document proving completion of a course"},{"word":"interactive","meaning":"involving communication and participation"},{"word":"module","meaning":"a unit or section of a course"},{"word":"practical application","meaning":"using knowledge in real-world situations"}],
        sampleAnswer: {
            text: 'I\'d like to describe an online course I completed last year on data analysis using Python, which was offered through Coursera by the University of Michigan. The situation was that I was working in a marketing role where data-driven decision-making was becoming increasingly important, but I had virtually no programming experience and felt I was falling behind my colleagues who could manipulate spreadsheets and databases with ease. My manager suggested I upskill in data analysis, and after researching various options, I chose this particular course because it was designed specifically for beginners and had overwhelmingly positive reviews from over fifty thousand previous students. The course consisted of five modules spread over approximately twelve weeks, covering everything from basic Python syntax to data visualisation using libraries like Pandas and Matplotlib. Each module included video lectures, reading materials, and hands-on coding assignments that required me to analyse real datasets. The most challenging aspect was the final capstone project, where I had to collect, clean, and analyse a dataset of my choosing and present my findings in a professional report. I chose to analyse customer engagement patterns on our company\'s social media platforms, which made the project directly relevant to my work. I dedicated about eight to ten hours per week to the course, usually studying in the evenings after work and on weekend mornings. There were moments when I felt completely overwhelmed, particularly when debugging code that refused to run correctly, but the course\'s online forum was incredibly helpful — both instructors and fellow students would respond to questions within hours. Upon completing the course, I received a verified certificate that I added to my LinkedIn profile. More importantly, the skills I gained transformed my approach to work. I now regularly use Python scripts to automate repetitive data tasks that used to take hours manually, and my manager has noted a significant improvement in the quality of insights I bring to team meetings.',
            breakdown: {
                situation: 'Working in marketing with no programming experience, feeling left behind as data-driven decisions became essential; manager suggested upskilling in data analysis',
                task: 'Chose a 12-week Coursera course on Python data analysis from University of Michigan — 5 modules covering syntax through to data visualisation with Pandas and Matplotlib',
                action: 'Dedicated 8-10 hours weekly studying evenings and weekends; completed hands-on coding assignments and a capstone project analysing company social media engagement patterns; used online forums for support',
                result: 'Earned verified certificate; transformed work approach by automating repetitive data tasks with Python; manager noted significant improvement in quality of insights at team meetings'
            }
        }
    },
    {
        topic: 'Describe a technology that has changed your life',
        prompts: ['What the technology is', 'When you first started using it', 'How you use it in your daily life', 'And explain how it has changed your life'],
        category: 'Technology', bestStrategy: 'ppf',
        followUpQuestions: ["Do you think technology makes people lazier?","What technology do you think will have the biggest impact in the future?"],
        keyVocabulary: [{"word":"revolutionary","meaning":"completely new and having a great effect"},{"word":"transform","meaning":"to change completely"},{"word":"seamlessly","meaning":"smoothly and without interruption"},{"word":"reliant","meaning":"dependent on something"},{"word":"breakthrough","meaning":"an important development or discovery"},{"word":"digital literacy","meaning":"the ability to use digital technology effectively"}],
        sampleAnswer: {
            text: 'I\'d like to talk about cloud storage technology, specifically Google Drive, which has genuinely transformed the way I work, study, and organise my life. Before I started using cloud storage about five years ago, my digital life was chaotic and anxiety-inducing. I stored everything on my laptop\'s hard drive and occasionally backed up important files to a USB stick that I frequently misplaced. I vividly remember the panic I felt when my laptop crashed during my second year at university and I lost an entire semester\'s worth of notes and a half-finished dissertation chapter because I hadn\'t backed up for three weeks. That traumatic experience was actually the catalyst that pushed me to adopt cloud storage seriously. Nowadays, Google Drive is at the centre of virtually everything I do. All my documents, spreadsheets, presentations, and photos are stored in the cloud and organised into a meticulously structured system of folders and subfolders. I can access any file from any device — my laptop, phone, or even a borrowed computer at a library — which has given me a level of flexibility I never had before. The collaborative features have been equally transformative. When I was working on my final-year group project, four of us could edit the same document simultaneously from different locations, leave comments for each other, and track every change in the version history. This eliminated the nightmare of emailing attachments back and forth and trying to merge different versions manually. Looking ahead, I expect cloud technology to become even more integral to daily life as storage becomes cheaper and internet connectivity improves globally. The way it has changed my life is profound — it has eliminated the fear of data loss, dramatically improved my organisational habits, and enabled a level of collaboration that would have been unimaginable just a decade ago. I genuinely cannot imagine reverting to a world without it.',
            breakdown: {
                past: 'Five years ago, stored everything on laptop hard drive with occasional USB backups; lost a semester of notes when laptop crashed — that trauma catalysed adopting cloud storage',
                present: 'Google Drive is central to everything — meticulously organised folders accessible from any device; collaborative editing eliminated attachment nightmares for group projects',
                future: 'Expects cloud technology to become even more integral as storage costs drop and global connectivity improves',
                significance: 'Eliminated fear of data loss, dramatically improved organisational habits, and enabled collaboration that would have been unimaginable a decade ago'
            }
        }
    },

    // Historical/Cultural (55-59)
    {
        topic: 'Describe a tradition in your country that you enjoy',
        prompts: ['What the tradition is', 'When it takes place', 'What people typically do', 'And explain why you enjoy it'],
        category: 'Culture', bestStrategy: '5wf',
        followUpQuestions: ["Do you think young people are losing interest in traditional customs?","How can traditions be preserved for future generations?"],
        keyVocabulary: [{"word":"ritual","meaning":"a ceremony or series of acts performed regularly"},{"word":"heritage","meaning":"traditions and values passed down through generations"},{"word":"ancestral","meaning":"relating to ancestors or family history"},{"word":"customary","meaning":"according to tradition or usual practice"},{"word":"commemorate","meaning":"to honour the memory of someone or something"},{"word":"festivity","meaning":"celebration and rejoicing"}],
        sampleAnswer: {
            text: 'I\'d like to describe the Mid-Autumn Festival, known as Tet Trung Thu in Vietnamese, which is one of my absolute favourite traditions and one I look forward to every year. It takes place on the fifteenth day of the eighth lunar month, which usually falls in September or early October, when the moon is at its fullest and brightest. The festival has ancient roots dating back over two thousand years and was originally a celebration of the harvest season, though it has evolved primarily into a celebration for children. During the festival, the streets in my neighbourhood come alive with colour and excitement. Children parade through the streets carrying star-shaped lanterns made of coloured cellophane and bamboo, singing traditional songs about the moon and a legendary figure called Cuoi who sits under a banyan tree on the moon\'s surface. Families gather to enjoy mooncakes — dense, richly filled pastries that come in dozens of varieties from traditional mung bean and lotus seed to modern flavours like chocolate and green tea. The most magical moment for me is always the lion dance performances, where dancers in elaborate costumes move to the rhythm of thundering drums, weaving through the crowd and bringing what locals believe is good luck and prosperity. The reason I enjoy this tradition so deeply is that it connects me to my childhood in a visceral way. Every September, when I smell mooncakes baking and hear the distant drumming, I\'m instantly transported back to being seven years old, clutching my lantern and running through the streets with my cousins, completely enchanted by the spectacle. In our increasingly digital and fast-paced world, this festival is a precious annual reminder to slow down, gather with family, and celebrate the simple joy of community and togetherness.',
            breakdown: {
                what_who: 'Mid-Autumn Festival (Tet Trung Thu) — an ancient harvest celebration evolved into a children\'s festival featuring lantern parades, mooncakes, lion dances, and traditional songs',
                where_when: 'Takes place on the 15th day of the 8th lunar month (September/October) when the moon is fullest; streets come alive with colour as children parade with star-shaped lanterns',
                why: 'Connects to childhood memories viscerally — the smell of mooncakes and sound of drums transport back to being seven years old running through streets with cousins',
                how_feelings: 'In our digital, fast-paced world, this festival is a precious annual reminder to slow down, gather with family, and celebrate community and togetherness'
            }
        }
    },
    {
        topic: 'Describe a historical place you have visited',
        prompts: ['Where the place is', 'When you visited it', 'What you saw there', 'And explain why this place is historically important'],
        category: 'Culture', bestStrategy: '5wf',
        followUpQuestions: ["Should historical sites charge entrance fees?","How can technology help preserve historical places?"],
        keyVocabulary: [{"word":"archaeological","meaning":"relating to the study of ancient remains"},{"word":"artefact","meaning":"an object made by humans in earlier times"},{"word":"monument","meaning":"a structure built to commemorate a person or event"},{"word":"restoration","meaning":"the process of repairing and returning to original condition"},{"word":"antiquity","meaning":"the ancient past, especially before the Middle Ages"},{"word":"UNESCO World Heritage","meaning":"a site designated as having cultural or natural significance"}],
        sampleAnswer: {
            text: 'I\'d like to describe my visit to the Imperial Citadel of Hue, which is located in central Vietnam along the banks of the Perfume River. I visited it during a family trip about two years ago, and it left a profound impression on me that I still think about frequently. The Imperial Citadel is an enormous fortified complex that served as the seat of the Nguyen Dynasty, Vietnam\'s last ruling dynasty, from 1802 to 1945. The complex is truly vast — it covers an area of over five hundred hectares and is surrounded by massive stone walls and a wide moat. As we walked through the imposing Ngo Mon Gate, the main entrance, I was immediately struck by the grandeur of the architecture. The Throne Palace, where emperors once held court, features intricate woodcarvings, lacquered columns decorated with golden dragons, and a magnificent roof with layered eaves in the distinctive Vietnamese imperial style. We spent nearly four hours exploring the various palaces, temples, gardens, and courtyards, each with its own unique character and story. The Royal Theatre, where traditional court music and dance were once performed, has been beautifully restored and now hosts live performances for visitors. What struck me most poignantly was the visible damage from the 1968 Tet Offensive during the Vietnam War, which destroyed many of the original structures. Walking through partially ruined halls where you could see the scorch marks and bullet holes alongside painstakingly restored sections gave me a powerful sense of the fragility of cultural heritage. The reason this place is historically significant extends beyond its architectural beauty. It represents the political, cultural, and spiritual centre of an entire dynasty that shaped modern Vietnam. The complex was designated a UNESCO World Heritage Site in 1993, and the ongoing restoration work symbolises Vietnam\'s commitment to preserving its identity while acknowledging the complex layers of its history.',
            breakdown: {
                what_who: 'Imperial Citadel of Hue — an enormous fortified complex over 500 hectares, seat of the Nguyen Dynasty (1802-1945), featuring the Throne Palace with intricate woodcarvings and golden dragons',
                where_when: 'Located in central Vietnam along the Perfume River; visited two years ago on a family trip, spending nearly four hours exploring palaces, temples, gardens, and courtyards',
                why: 'UNESCO World Heritage Site representing the political, cultural, and spiritual centre of Vietnam\'s last dynasty; visible war damage alongside restoration symbolises commitment to preserving identity',
                how_feelings: 'The contrast between scorch marks and bullet holes alongside painstakingly restored sections gave a powerful sense of the fragility of cultural heritage — left a profound, lasting impression'
            }
        }
    },
    {
        topic: 'Describe a cultural event you attended',
        prompts: ['What the event was', 'Where and when it took place', 'What happened at the event', 'And explain what you learned from this experience'],
        category: 'Culture', bestStrategy: 'star',
        followUpQuestions: ["Do you think cultural events help bring communities together?","How can governments support cultural activities?"],
        keyVocabulary: [{"word":"immersive","meaning":"providing a completely absorbing experience"},{"word":"vibrant","meaning":"full of energy and life"},{"word":"showcase","meaning":"to display or present something in an attractive way"},{"word":"diverse","meaning":"showing great variety"},{"word":"enriching","meaning":"improving the quality of life or knowledge"},{"word":"spectacle","meaning":"a visually striking performance or display"}],
        sampleAnswer: {
            text: 'I\'d like to talk about a Japanese cultural festival I attended in my city last autumn, which was organised by the local Japanese community association in collaboration with the city council. The event was held in the central park over an entire weekend, and I went on the Saturday with a group of friends who share my interest in East Asian culture. When we arrived, the park had been completely transformed — there were traditional torii gate replicas at the entrance, cherry blossom decorations strung between the trees, and the aroma of Japanese street food wafting through the air. The festival featured an impressive variety of activities and performances throughout the day. We watched a mesmerising taiko drumming performance where the rhythmic thundering of the enormous drums was so powerful you could feel the vibrations in your chest. There were also demonstrations of ikebana flower arranging, calligraphy workshops where participants could try writing their names in Japanese characters, and a tea ceremony conducted by a certified tea master who explained the philosophical significance of every gesture and movement. The food section was enormous, with stalls offering everything from freshly made takoyaki and yakisoba to matcha ice cream and mochi. I tried my hand at origami at one of the workshop stations and was surprised at how meditative and satisfying the process of folding paper into intricate shapes could be. What struck me most was the warmth and enthusiasm of the Japanese community members who were running the stalls and workshops — they were visibly proud to share their culture and genuinely delighted when visitors showed interest. I learned that cultural exchange doesn\'t require travelling thousands of kilometres; sometimes the most enriching cross-cultural experiences can happen in your own neighbourhood when communities are given the space and support to celebrate their heritage openly.',
            breakdown: {
                situation: 'Last autumn, a Japanese cultural festival was held in the central park over a weekend, organised by the local Japanese community association and city council; attended on Saturday with friends',
                task: 'The park was transformed with torii gates, cherry blossom decorations, and Japanese street food aromas — an immersive cultural experience with performances, workshops, and food stalls',
                action: 'Watched mesmerising taiko drumming, attended ikebana and calligraphy workshops, observed a tea ceremony with a certified tea master, tried origami, and sampled takoyaki, yakisoba, and matcha ice cream',
                result: 'Learned that enriching cross-cultural exchange doesn\'t require travelling far — communities given space to celebrate heritage openly can create profoundly meaningful experiences in your own neighbourhood'
            }
        }
    },
    {
        topic: 'Describe a famous person from history you admire',
        prompts: ['Who this person is', 'What they are famous for', 'How you learned about them', 'And explain why you admire them'],
        category: 'Culture', bestStrategy: '5wf',
        followUpQuestions: ["Do you think we can learn useful lessons from historical figures?","Are modern heroes different from historical ones?"],
        keyVocabulary: [{"word":"legacy","meaning":"something handed down from the past"},{"word":"pioneering","meaning":"being the first to do or develop something new"},{"word":"influential","meaning":"having great impact on people or events"},{"word":"visionary","meaning":"a person with original ideas about the future"},{"word":"perseverance","meaning":"persistence despite difficulties"},{"word":"groundbreaking","meaning":"innovative and introducing new ideas"}],
        sampleAnswer: {
            text: 'I\'d like to talk about Marie Curie, the Polish-born physicist and chemist who became the first woman to win a Nobel Prize and remains the only person in history to have won Nobel Prizes in two different scientific fields — physics and chemistry. I first learned about her in secondary school during a science class, but my admiration deepened considerably when I read a detailed biography of her life a few years ago. Marie Curie was born Maria Sklodowska in Warsaw in 1867, at a time when women in Poland were barred from attending university. Undeterred, she studied secretly in underground classes before eventually moving to Paris, where she enrolled at the Sorbonne and earned degrees in both physics and mathematics, often studying by candlelight in a freezing attic apartment because she could barely afford food and heating. Together with her husband Pierre, she conducted pioneering research on radioactivity — a term she herself coined — leading to the discovery of two new elements, polonium and radium. Her work was conducted under incredibly primitive conditions, handling radioactive materials without any protective equipment, which ultimately contributed to her death from aplastic anaemia in 1934. What I find most remarkable about Marie Curie is not just her extraordinary scientific achievements but her unwavering determination in the face of systemic discrimination and personal tragedy. After Pierre\'s death in a road accident in 1906, she continued her research while raising two daughters alone, eventually succeeding him as professor at the Sorbonne — the first woman to hold that position. She also donated her Nobel Prize money to fund research and refused to patent the radium isolation process so that the scientific community could freely benefit. The reason I admire her is that she embodied the belief that knowledge should serve humanity rather than personal gain, and she proved through sheer perseverance that neither gender nor poverty should determine a person\'s potential to change the world.',
            breakdown: {
                what_who: 'Marie Curie — Polish-born physicist and chemist, first woman to win a Nobel Prize and only person to win in two different scientific fields; coined the term radioactivity and discovered polonium and radium',
                where_when: 'Born in Warsaw 1867, moved to Paris to study at the Sorbonne; first learned about her in secondary school science class, admiration deepened through reading a biography',
                why: 'Embodied the belief that knowledge should serve humanity — donated Nobel money, refused to patent radium isolation process, proved gender and poverty shouldn\'t limit potential',
                how_feelings: 'Most remarkable is her unwavering determination against systemic discrimination and personal tragedy — continued research after husband\'s death, became first female Sorbonne professor'
            }
        }
    },
    {
        topic: 'Describe a piece of art you find interesting',
        prompts: ['What the artwork is', 'Where you saw it', 'What it looks like', 'And explain why you find it interesting'],
        category: 'Culture', bestStrategy: '5wf',
        followUpQuestions: ["Do you think art education is important in schools?","Has the internet changed how people experience art?"],
        keyVocabulary: [{"word":"aesthetic","meaning":"concerned with beauty or artistic taste"},{"word":"evocative","meaning":"bringing strong feelings or memories to mind"},{"word":"composition","meaning":"the arrangement of elements in a work of art"},{"word":"masterpiece","meaning":"a work of outstanding artistry"},{"word":"contemporary","meaning":"belonging to the present time"},{"word":"thought-provoking","meaning":"stimulating careful consideration"}],
        sampleAnswer: {
            text: 'I\'d like to describe a painting that made a profound impression on me — "The Starry Night" by Vincent van Gogh, which I had the privilege of seeing in person at the Museum of Modern Art in New York during a trip to the United States about three years ago. I had seen countless reproductions of this painting in books, on posters, and online, but nothing could have prepared me for the experience of standing in front of the original. The painting depicts a swirling night sky over a small village, with a luminous crescent moon and blazing stars surrounded by dynamic, spiralling patterns of light that seem to pulse with energy. In the foreground, a dark cypress tree rises like a flame, reaching toward the turbulent sky, while the village below sits in peaceful contrast with its tiny lit windows and a church steeple. What struck me most when seeing the original was the texture — van Gogh applied the paint in thick, visible brushstrokes that create an almost three-dimensional effect you simply cannot appreciate in reproductions. Standing close to the canvas, I could see the individual ridges of paint, some raised nearly a centimetre from the surface, and the way he layered different shades of blue, purple, and yellow to create an extraordinary sense of movement and depth. The painting was created in June 1889 while van Gogh was staying at a psychiatric asylum in Saint-Remy-de-Provence, France, following a severe mental health crisis. He painted the view from his window, though he added the village from imagination and memory. I find this painting fascinating because it represents a moment where personal anguish was transformed into transcendent beauty. The swirling sky suggests inner turmoil, yet the overall effect is not one of despair but of wonder and awe. It reminds me that art has the remarkable power to transmute suffering into something that brings joy and comfort to millions of people across centuries, and that the most authentic creative expression often emerges from our most vulnerable moments.',
            breakdown: {
                what_who: '"The Starry Night" by Vincent van Gogh — swirling night sky over a village with luminous moon, blazing stars, spiralling light patterns, dark cypress tree, and peaceful village with church steeple',
                where_when: 'Saw the original at the Museum of Modern Art in New York about three years ago; painted in June 1889 at a psychiatric asylum in Saint-Remy-de-Provence from the view outside van Gogh\'s window',
                why: 'Represents personal anguish transformed into transcendent beauty; the swirling sky suggests turmoil yet the overall effect is wonder and awe; art\'s power to transmute suffering into joy',
                how_feelings: 'The thick, three-dimensional brushstrokes visible only in person were revelatory — ridges of paint nearly a centimetre high creating extraordinary movement and depth impossible to appreciate in reproductions'
            }
        }
    },

    // Childhood/Memory (60-64)
    {
        topic: 'Describe a childhood friend you remember well',
        prompts: ['Who this friend was', 'How you met them', 'What you used to do together', 'And explain why you remember them so well'],
        category: 'People', bestStrategy: 'ppf',
        followUpQuestions: ["Do you think childhood friendships are different from adult ones?","Is it important to stay in touch with old friends?"],
        keyVocabulary: [{"word":"inseparable","meaning":"unable to be separated; very close friends"},{"word":"mischievous","meaning":"playfully causing trouble"},{"word":"nostalgic","meaning":"feeling a sentimental longing for the past"},{"word":"bond","meaning":"a strong connection between people"},{"word":"drift apart","meaning":"to gradually become less close"},{"word":"formative years","meaning":"the period of childhood that shapes who you become"}],
        sampleAnswer: {
            text: 'I\'d like to talk about my childhood friend Minh, who was my closest companion from the age of six until we were about thirteen. We first met on the very first day of primary school when we were assigned seats next to each other in class, and within a week we were virtually inseparable. Minh was a skinny kid with an enormous grin and an infectious laugh that could brighten the gloomiest day. In the past, during our primary school years, we did absolutely everything together. After school, we would race our bicycles through the narrow alleyways of our neighbourhood, play elaborate games of make-believe in the abandoned lot behind his house, and spend hours catching tadpoles in the canal near the rice paddies at the edge of town. On rainy days, we would sit on his veranda playing chess — his grandfather had taught him, and he patiently taught me — or we would read comic books, trading them back and forth until we\'d both memorised every panel. What made our friendship special was the unspoken understanding between us. We could communicate with just a glance, and we had an ironclad pact to always back each other up, whether that meant sharing homework answers or defending each other from the older boys who occasionally tried to bully us. As we grew older and entered secondary school, we were placed in different classes, and our paths gradually diverged. Minh\'s family eventually moved to Ho Chi Minh City when his father got a new job, and although we promised to write and call regularly, the distance inevitably caused us to drift apart. Nowadays, we are connected on social media, and we exchange messages on birthdays and holidays, but the daily intimacy of our childhood friendship exists only in memory. Looking ahead, I hope to visit him one day and reconnect properly. The reason I remember Minh so well is that he was present during my most formative years, and the loyalty, trust, and simple joy of that friendship set the standard for every relationship I\'ve had since.',
            breakdown: {
                past: 'Met on first day of primary school at age six; inseparable for seven years — racing bicycles, catching tadpoles, playing chess on his veranda, reading comic books together',
                present: 'Connected on social media, exchanging messages on birthdays and holidays, but the daily intimacy exists only in memory after his family moved away',
                future: 'Hopes to visit Minh one day and reconnect properly, rekindling the bond that distance has stretched but never truly broken',
                significance: 'Present during the most formative years; the loyalty, trust, and simple joy of that friendship set the standard for every relationship since'
            }
        }
    },
    {
        topic: 'Describe a toy you loved as a child',
        prompts: ['What the toy was', 'Who gave it to you', 'How you played with it', 'And explain why it was special to you'],
        category: 'Objects', bestStrategy: '5wf',
        followUpQuestions: ["Do you think modern toys are better than those from the past?","Should parents limit the number of toys children have?"],
        keyVocabulary: [{"word":"cherished","meaning":"held dear, greatly valued"},{"word":"imaginative play","meaning":"creative pretend games children engage in"},{"word":"sentimental value","meaning":"worth based on emotions rather than money"},{"word":"hand-me-down","meaning":"something passed from one person to another"},{"word":"well-worn","meaning":"showing signs of much use"},{"word":"keepsake","meaning":"something kept as a reminder of a person or event"}],
        sampleAnswer: {
            text: 'I\'d like to describe a toy that holds an incredibly special place in my heart — a small wooden sailing boat that my grandfather carved for me by hand when I was about five years old. The boat was roughly thirty centimetres long, carved from a single piece of teak wood that my grandfather had salvaged from an old piece of furniture. It had a pointed bow, a flat deck with tiny carved railings, and a mast made from a thin bamboo stick with a small cloth sail that my grandmother had sewn from a scrap of white cotton. My grandfather had painted the hull a bright blue and added my name in careful yellow letters along the side. He gave it to me during Tet, the Vietnamese New Year, and I remember the pride in his eyes as he watched me unwrap it. I played with that boat constantly for years. Every afternoon during the rainy season, when the puddles in our courtyard grew large enough to become imaginary oceans, I would launch my boat and narrate elaborate adventures involving pirates, sea monsters, and treasure islands. During dry weather, it sailed in the bathtub or in the large water basin my mother used for washing vegetables. I also took it everywhere — to my grandparents\' house, to the park, even to school once, which earned me a mild scolding from my teacher. The reason this toy was so special wasn\'t about the object itself but about what it represented. My grandfather was a carpenter by trade who had rough, calloused hands from decades of working with wood, yet he spent hours carefully shaping and smoothing this tiny boat with such delicacy and attention to detail purely out of love for his grandson. He passed away when I was eleven, and although the boat\'s paint has long since faded and the sail has been replaced twice, I still keep it on my bookshelf today. Every time I look at it, I feel connected to him and to the simple, uncomplicated happiness of my childhood.',
            breakdown: {
                what_who: 'A small wooden sailing boat (~30cm) carved from teak by grandfather — pointed bow, tiny railings, bamboo mast with cloth sail, bright blue hull with name painted in yellow letters',
                where_when: 'Given during Tet when narrator was five; played with constantly for years — in courtyard puddles during rainy season, bathtub during dry weather, taken everywhere including school',
                why: 'Represented grandfather\'s love — a carpenter with rough calloused hands who spent hours carefully crafting a tiny boat purely for his grandson; he passed away when narrator was eleven',
                how_feelings: 'Still kept on bookshelf today despite faded paint and replaced sail; every glance creates a connection to grandfather and to the simple, uncomplicated happiness of childhood'
            }
        }
    },
    {
        topic: 'Describe a memorable school experience',
        prompts: ['What happened', 'When it took place', 'Who was involved', 'And explain why this experience is memorable'],
        category: 'Experience', bestStrategy: 'star',
        followUpQuestions: ["Do you think school experiences shape our personality?","What makes a school memory positive versus negative?"],
        keyVocabulary: [{"word":"pivotal","meaning":"of crucial importance"},{"word":"camaraderie","meaning":"mutual trust and friendship among people"},{"word":"reminisce","meaning":"to think about pleasant past experiences"},{"word":"extracurricular","meaning":"activities outside the normal curriculum"},{"word":"mentor","meaning":"an experienced person who guides others"},{"word":"formative","meaning":"having a lasting influence on development"}],
        sampleAnswer: {
            text: 'I\'d like to share a school experience that remains one of my most treasured memories — participating in my school\'s annual science fair during my final year of secondary school, when I was about seventeen. The situation was that our physics teacher, Mr. Tran, announced that the school would be hosting a science competition open to all year groups, with the winning project representing our school at a regional competition. He specifically encouraged me to participate because he had noticed my enthusiasm for physics experiments in class, and his confidence in me was a powerful motivator. My project focused on building a small-scale wind turbine from recycled materials to demonstrate renewable energy principles. The task was genuinely challenging — I had only six weeks to research, design, build, and present a working prototype, all while keeping up with regular coursework. I spent my lunchtimes and after-school hours in the science laboratory, cutting plastic bottles into turbine blades, wiring a small motor to generate electricity, and testing different blade angles to maximise power output. My classmate Linh volunteered to help with the visual presentation board, and together we created detailed diagrams explaining the physics behind wind energy conversion. There were several setbacks along the way — my first turbine design vibrated so violently it shook itself apart, and I had to completely redesign the blade mounting system. On the day of the fair, I was incredibly nervous presenting to the judging panel, which included a professor from the local university. But as I explained my project and demonstrated the turbine lighting up a small LED, I felt a growing sense of pride and excitement. To my absolute amazement, I won first place, and the professor specifically praised the ingenuity of using recycled materials. This experience was pivotal because it showed me that I could tackle complex problems independently and that academic passion combined with persistence could produce genuinely impressive results. It also cemented my relationship with Mr. Tran, who became a lasting mentor and eventually wrote my university recommendation letter.',
            breakdown: {
                situation: 'Final year of secondary school; physics teacher Mr. Tran encouraged participation in the annual science fair, with the winner representing the school at a regional competition',
                task: 'Built a small-scale wind turbine from recycled materials in six weeks to demonstrate renewable energy principles, while maintaining regular coursework',
                action: 'Spent lunchtimes and after-school hours in the lab — cut plastic bottles into blades, wired a motor, tested blade angles; classmate Linh helped with presentation board; redesigned after first prototype shook apart',
                result: 'Won first place; a university professor praised the recycled-materials ingenuity; showed that passion combined with persistence produces impressive results; cemented a lasting mentorship with Mr. Tran'
            }
        }
    },
    {
        topic: 'Describe a family trip you remember from childhood',
        prompts: ['Where your family went', 'When this trip took place', 'What you did during the trip', 'And explain why this trip is still memorable'],
        category: 'Experience', bestStrategy: 'star',
        followUpQuestions: ["Do you think family holidays are important for children?","How have family trips changed compared to previous generations?"],
        keyVocabulary: [{"word":"cherish","meaning":"to hold something dear"},{"word":"adventure","meaning":"an exciting and unusual experience"},{"word":"bonding","meaning":"developing a close relationship"},{"word":"scenic","meaning":"having beautiful natural views"},{"word":"unforgettable","meaning":"impossible to forget"},{"word":"itinerary","meaning":"a planned route or journey"}],
        sampleAnswer: {
            text: 'I\'d like to describe a family trip to Da Lat, a highland city in southern Vietnam, which we took during the summer holiday when I was about nine years old. The situation was that my father had been working exceptionally long hours for months, and my mother convinced him that the whole family needed a proper holiday together. My parents, my younger sister, and I piled into our small car very early one morning and drove for about six hours through increasingly mountainous terrain, watching the landscape transform from flat coastal plains into rolling hills covered in pine forests and coffee plantations. The task of keeping two excited children entertained during a long car ride fell to my mother, who organised a series of road trip games and had packed a cooler of homemade snacks. When we finally arrived in Da Lat, the cool mountain air felt like stepping into a different world — after the sweltering heat of our coastal hometown, the crisp freshness was absolutely exhilarating. Over the five days we spent there, we visited the Valley of Love, a park with manicured gardens and a lake where we pedalled swan-shaped boats; explored the Crazy House, a surreal building designed like a giant tree with winding passages and unexpected rooms; and rode a cable car over dense pine forests that seemed to stretch endlessly in every direction. My favourite moment was when my father took my sister and me strawberry picking at a farm on the outskirts of the city. I remember the intense sweetness of eating a strawberry straight from the plant, still warm from the sun, and my father laughing as my sister\'s face became completely covered in red juice. We also visited a night market where my parents bought us matching woolly hats because we hadn\'t packed warm enough clothing, not expecting how cold the evenings could get at altitude. This trip remains so memorable because it was one of the rare occasions when my father was completely present — no phone calls, no work emails, just undivided attention for his family. The simple joy of having both parents relaxed and happy, exploring a new place together, created a feeling of security and happiness that I can still access vividly whenever I close my eyes and think about that week.',
            breakdown: {
                situation: 'At age nine, family drove six hours to Da Lat in the Vietnamese highlands for a summer holiday after father had been working extremely long hours for months',
                task: 'Five days of family exploration — Valley of Love with swan boats, the Crazy House, cable car rides, strawberry picking, and a night market where they bought matching woolly hats',
                action: 'Father was completely present with no work distractions; ate warm strawberries from the plant; sister\'s face covered in juice; parents relaxed and gave undivided attention to family',
                result: 'One of the rare occasions of complete family togetherness, creating a feeling of security and happiness still vividly accessible — proved that the most memorable holidays are about connection, not destination'
            }
        }
    },
    {
        topic: 'Describe an important lesson you learned as a child',
        prompts: ['What the lesson was', 'How you learned it', 'Who taught you this lesson', 'And explain how it has affected your life'],
        category: 'Experience', bestStrategy: 'psi',
        followUpQuestions: ["Do you think children learn more from experience or from being told?","What is the most important value parents should teach?"],
        keyVocabulary: [{"word":"integrity","meaning":"the quality of being honest and having strong moral principles"},{"word":"accountability","meaning":"being responsible for your actions"},{"word":"consequence","meaning":"a result or effect of an action"},{"word":"moral compass","meaning":"an inner sense of right and wrong"},{"word":"instil","meaning":"to gradually but firmly establish a quality in someone"},{"word":"character-building","meaning":"helping to develop a strong, moral personality"}],
        sampleAnswer: {
            text: 'I\'d like to describe an important lesson I learned about honesty when I was about eight years old, which was taught to me by my mother in a way that has stayed with me ever since. The problem started when I accidentally broke my mother\'s favourite ceramic vase while playing football inside the house, something I had been specifically told not to do. The vase shattered into dozens of pieces, and in a moment of panic, I quickly swept up the fragments, hid them at the bottom of the kitchen bin, and moved a potted plant to cover the empty spot on the shelf. When my mother came home and eventually noticed the missing vase, I lied and said I had no idea what had happened to it, suggesting that perhaps my younger sister had moved it. My mother\'s solution was not to punish me immediately. Instead, she sat quietly for a moment, then told me a story about when she was a young girl and had broken her own mother\'s mirror. She described how she had lied about it and how the guilt had eaten away at her for weeks until she finally confessed, and how her mother had said something she never forgot: the vase can be replaced, but once people stop trusting your words, that trust is almost impossible to rebuild. She then looked at me gently and asked if I had anything I wanted to tell her. I burst into tears and confessed everything — the football, the vase, hiding the pieces, and blaming my sister. The impact of that conversation was profound and immediate. My mother didn\'t shout or punish me for breaking the vase; instead, she calmly explained that she was disappointed not by the accident but by the dishonesty that followed it. She made me apologise to my sister for trying to shift the blame and asked me to use my pocket money to contribute toward replacing the vase, not as punishment but as a lesson in taking responsibility. What I learned from this experience has become a fundamental part of who I am today. I understood that honesty isn\'t just about telling the truth when it\'s convenient — it\'s about having the courage to be truthful especially when there are consequences. My mother taught me that mistakes are forgivable but deliberate deception erodes the foundation of every relationship.',
            breakdown: {
                problem: 'At age eight, broke mother\'s favourite ceramic vase while playing football inside, then panicked — hid the pieces, covered the empty spot, and blamed younger sister',
                solution: 'Mother didn\'t punish immediately; told a story about breaking her own mother\'s mirror and lying about it; gently asked if there was anything to confess, leading to tearful honesty',
                impact: 'Made to apologise to sister for shifting blame and contribute pocket money toward replacement — not as punishment but as a lesson in responsibility; no shouting, just calm disappointment about dishonesty',
                learning: 'Honesty isn\'t about truth when convenient — it\'s courage to be truthful when there are consequences; mistakes are forgivable but deliberate deception erodes every relationship\'s foundation'
            }
        }
    },

    // Future/Goals (65-69)
    {
        topic: 'Describe a goal you hope to achieve in the future',
        prompts: ['What the goal is', 'How long you have had this goal', 'What steps you plan to take', 'And explain why this goal is important to you'],
        category: 'Future', bestStrategy: 'ppf',
        followUpQuestions: ["Do you think it is better to have big ambitious goals or small achievable ones?","How do you stay motivated when progress is slow?"],
        keyVocabulary: [{"word":"aspiration","meaning":"a hope or ambition to achieve something"},{"word":"long-term","meaning":"occurring over a long period of time"},{"word":"milestone","meaning":"an important stage in development"},{"word":"feasible","meaning":"possible and practical to achieve"},{"word":"commitment","meaning":"dedication to a cause or activity"},{"word":"fulfilment","meaning":"the achievement of something desired"}],
        sampleAnswer: {
            text: 'I\'d like to talk about a goal I\'ve been working toward for several years now, which is to establish my own small educational technology startup focused on making English language learning more accessible to students in rural areas of Vietnam. This aspiration first took root about four years ago when I was volunteering as an English tutor in a remote village in the central highlands. I was shocked to discover that children there had virtually no access to quality English learning resources — no trained teachers, no textbooks beyond outdated government-issued ones, and certainly no digital tools. Yet these children were just as bright and eager to learn as any student in Ho Chi Minh City. That experience planted a seed that has been growing ever since. In my present situation, I\'m actively building the foundation for this venture. I\'ve been studying business management alongside my main degree, taking online courses in app development, and researching existing edtech solutions to understand what works and what doesn\'t. I\'ve also been saving money from my part-time tutoring work and have recently begun drafting a business plan. Last month, I entered a university startup competition and was thrilled to reach the semi-finals, which gave me valuable feedback from experienced entrepreneurs. Looking ahead, my plan is to launch a minimum viable product within the next two years — a mobile app that delivers bite-sized English lessons optimised for low-bandwidth connections, since many rural areas have limited internet access. I want to incorporate speech recognition technology so students can practise pronunciation without needing a human teacher present, and I plan to keep the app either free or extremely affordable. This goal is important to me because I fundamentally believe that where a child is born should not determine the quality of education they receive. Technology has the power to bridge geographical divides, and I want to be part of making that happen.',
            breakdown: {
                past: 'Aspiration began four years ago while volunteering as English tutor in a remote highland village — shocked that bright, eager children had no access to quality English resources',
                present: 'Actively building foundations — studying business management, learning app development, saving from tutoring work, drafting a business plan; reached semi-finals in university startup competition',
                future: 'Plans to launch a mobile app within two years delivering bite-sized English lessons for low-bandwidth areas with speech recognition for pronunciation practice, free or very affordable',
                significance: 'Believes where a child is born should not determine education quality; technology can bridge geographical divides and wants to be part of making that happen'
            }
        }
    },
    {
        topic: 'Describe a place you would like to visit in the future',
        prompts: ['Where this place is', 'How you learned about it', 'What you would like to do there', 'And explain why you want to visit this place'],
        category: 'Future', bestStrategy: '5wf',
        followUpQuestions: ["Do you think travel broadens the mind?","Is it better to travel domestically or internationally?"],
        keyVocabulary: [{"word":"bucket list","meaning":"a list of things to do before you die"},{"word":"awe-inspiring","meaning":"filling you with wonder and admiration"},{"word":"immerse yourself","meaning":"to become completely involved in something"},{"word":"wanderlust","meaning":"a strong desire to travel and explore"},{"word":"off the beaten path","meaning":"in a place not commonly visited by tourists"},{"word":"once-in-a-lifetime","meaning":"an experience that is unlikely to happen again"}],
        sampleAnswer: {
            text: 'I\'d like to describe a place that has been at the top of my bucket list for as long as I can remember — Iceland, the small Nordic island nation in the North Atlantic. I first became fascinated with Iceland when I was about fourteen and watched a documentary about the Northern Lights. The footage of those shimmering curtains of green, purple, and pink light dancing across a dark Arctic sky was so breathtaking that I immediately started researching everything about the country. Since then, my fascination has only deepened through travel blogs, photography collections, and conversations with a colleague who visited last year and described it as the most surreal landscape she had ever seen. Iceland sits on the Mid-Atlantic Ridge where two tectonic plates are slowly pulling apart, which creates an extraordinary landscape of active volcanoes, vast glaciers, steaming geothermal springs, and dramatic black sand beaches — a combination found nowhere else on Earth. If I were to visit, I would want to spend at least two weeks there to do justice to its incredible diversity. I would drive the famous Ring Road that circles the entire island, stopping at the Golden Circle to see the Geysir geothermal area and the thundering Gullfoss waterfall. I would hike on Vatnajokull, Europe\'s largest glacier, explore ice caves with their impossibly blue crystalline walls, and soak in natural hot springs surrounded by snow-covered mountains. Most importantly, I would time my visit for winter to maximise my chances of witnessing the Northern Lights — I imagine standing in the freezing darkness and watching the sky erupt in colour would be an almost spiritual experience. The reason I want to visit Iceland so deeply is that it represents a kind of raw, elemental beauty that is completely absent from my everyday urban environment. In a world where so many places are becoming homogenised by globalisation, Iceland remains defiantly unique — a reminder that our planet is still capable of astonishing us.',
            breakdown: {
                what_who: 'Iceland — a Nordic island on the Mid-Atlantic Ridge with active volcanoes, vast glaciers, geothermal springs, and black sand beaches; a combination found nowhere else on Earth',
                where_when: 'Fascination began at age fourteen watching a Northern Lights documentary; deepened through travel blogs and a colleague\'s description of it as the most surreal landscape she\'d seen',
                why: 'Represents raw, elemental beauty absent from everyday urban life; in a homogenised world, Iceland remains defiantly unique — a reminder that our planet can still astonish',
                how_feelings: 'Imagines standing in freezing darkness watching the sky erupt in colour as an almost spiritual experience; would spend two weeks driving the Ring Road, hiking glaciers, and soaking in hot springs'
            }
        }
    },
    {
        topic: 'Describe a skill you would like to learn in the future',
        prompts: ['What the skill is', 'Why you want to learn it', 'How you plan to learn it', 'And explain how this skill would benefit you'],
        category: 'Future', bestStrategy: 'ppf',
        followUpQuestions: ["Is it ever too late to learn a new skill?","Do you think practical skills or academic knowledge is more important?"],
        keyVocabulary: [{"word":"proficient","meaning":"competent or skilled in doing something"},{"word":"hands-on","meaning":"involving practical experience"},{"word":"steep learning curve","meaning":"a lot to learn in a short time"},{"word":"self-taught","meaning":"having learned without formal instruction"},{"word":"discipline","meaning":"the ability to train yourself consistently"},{"word":"transferable skill","meaning":"an ability useful across different situations"}],
        sampleAnswer: {
            text: 'I\'d like to talk about a skill I\'m very keen to learn, which is playing the piano. Music has been a constant presence in my life — I grew up listening to my mother play classical pieces on our old upright piano every evening, and some of my warmest childhood memories involve falling asleep to the sound of Chopin nocturnes drifting through the house. In the past, I actually had a few informal lessons from my mother when I was about seven, but I lacked the patience and discipline to practise regularly, and I abandoned the instrument in favour of more exciting outdoor activities. I\'ve regretted that decision ever since. Nowadays, my desire to learn piano has been reignited by several factors. I recently attended a jazz concert where the pianist\'s improvisation was so captivating that I felt physically moved, and I realised I wanted to be able to create that kind of emotional connection through music myself. I\'ve also read numerous studies about the cognitive benefits of learning a musical instrument as an adult, including improved memory, enhanced coordination, and reduced stress levels. Looking ahead, my plan is to begin formal lessons once I\'ve settled into my new job and established a stable routine, which I expect will be in about three months. I intend to find a qualified teacher for weekly lessons and supplement those with daily practice of at least thirty minutes. I\'m particularly interested in learning both classical technique and jazz improvisation, which I understand requires a solid foundation in music theory. I\'ve already started by learning to read sheet music through an online course and have been watching tutorial videos to familiarise myself with basic finger positioning. This skill would benefit me in multiple ways — it would provide a creative outlet completely different from my analytical day job, give me a meditative practice to manage stress, and eventually allow me to play for family and friends, reconnecting with a musical tradition that has always been important in my household.',
            breakdown: {
                past: 'Grew up with mother playing Chopin nocturnes; had informal lessons at age seven but lacked patience and abandoned piano — has regretted it ever since',
                present: 'Desire reignited by a captivating jazz concert and research on cognitive benefits of learning music as an adult; already started learning sheet music online',
                future: 'Plans to begin formal weekly lessons in three months with daily 30-minute practice; wants both classical technique and jazz improvisation with solid music theory foundation',
                significance: 'Would provide a creative outlet different from analytical work, a meditative stress-management practice, and reconnection with the musical tradition important in the family'
            }
        }
    },
    {
        topic: 'Describe a change you would like to make in your life',
        prompts: ['What the change is', 'Why you want to make it', 'What steps you need to take', 'And explain how you think this change would improve your life'],
        category: 'Future', bestStrategy: 'psi',
        followUpQuestions: ["Why do you think people find it hard to change their habits?","Is it better to make changes gradually or all at once?"],
        keyVocabulary: [{"word":"resolution","meaning":"a firm decision to do something"},{"word":"sustainable","meaning":"able to be maintained over time"},{"word":"accountability","meaning":"being responsible for your actions"},{"word":"incremental","meaning":"increasing gradually by small amounts"},{"word":"procrastinate","meaning":"to delay doing something important"},{"word":"self-improvement","meaning":"the process of making yourself better"}],
        sampleAnswer: {
            text: 'A change I\'d really like to make in my life is reducing my screen time and developing a healthier relationship with my digital devices. The problem is quite severe and I suspect many people my age can relate to it. On an average day, I spend roughly seven to eight hours on my phone outside of work-related tasks, mindlessly scrolling through social media feeds, watching short videos, and jumping between messaging apps. I\'ve noticed that this habit has been eroding the quality of my life in tangible ways — my sleep has deteriorated because I often lie in bed scrolling until well past midnight, my concentration span has shortened noticeably, and I frequently find myself choosing the immediate dopamine hit of my phone screen over activities I genuinely value, like reading books, exercising, or spending quality time with the people around me. There have been evenings when I\'ve sat in the same room as my family for hours without having a single meaningful conversation because everyone was absorbed in their own devices. The solution I\'ve been developing involves several concrete steps. First, I plan to set daily screen time limits on my phone using the built-in digital wellbeing tools and remove the most addictive apps from my home screen. Second, I want to establish phone-free zones and times — no devices during meals, no screens in the bedroom after nine o\'clock, and one completely offline day per month. Third, I intend to replace scrolling with specific alternative activities, so that when I feel the urge to reach for my phone, I have a book, a journal, or a puzzle ready as a substitute. The impact I anticipate would be substantial. I expect my sleep quality would improve within weeks, my ability to focus on deep work would gradually return, and my relationships would become richer and more present. I\'ve read accounts from people who have successfully reduced their screen time, and they consistently report feeling calmer, more creative, and more connected to the physical world around them. What I\'ve learned from thinking about this change is that the first step is acknowledging that the problem exists and that it won\'t resolve itself — digital devices are deliberately designed to be addictive, and breaking free requires conscious, sustained effort.',
            breakdown: {
                problem: 'Spends 7-8 hours daily on phone outside work — scrolling social media, watching videos; sleep has deteriorated, concentration shortened, choosing screens over books, exercise, and family connection',
                solution: 'Setting screen time limits, removing addictive apps from home screen, establishing phone-free zones (no devices at meals, no screens in bedroom after 9pm, one offline day monthly), replacing scrolling with books and journals',
                impact: 'Expects improved sleep within weeks, return of deep focus, richer and more present relationships; others who reduced screen time report feeling calmer, more creative, and more connected',
                learning: 'Digital devices are deliberately designed to be addictive; first step is acknowledging the problem exists and won\'t resolve itself — breaking free requires conscious, sustained effort'
            }
        }
    },
    {
        topic: 'Describe your dream job',
        prompts: ['What the job is', 'What it involves', 'What qualifications or skills you would need', 'And explain why this is your dream job'],
        category: 'Future', bestStrategy: 'ibc',
        followUpQuestions: ["Do you think it is realistic for everyone to pursue their dream job?","Is job satisfaction more important than salary?"],
        keyVocabulary: [{"word":"fulfilling","meaning":"making you feel satisfied and happy"},{"word":"vocation","meaning":"a strong feeling of being suited to a particular career"},{"word":"rewarding","meaning":"giving satisfaction and a sense of achievement"},{"word":"entrepreneurial","meaning":"willing to take risks to start a business"},{"word":"work-life balance","meaning":"the division between work time and personal time"},{"word":"career progression","meaning":"advancement through a series of jobs"}],
        sampleAnswer: {
            text: 'I\'d like to describe my dream job, which is to become an environmental documentary filmmaker. This might seem like an unusual aspiration, but it combines the three things I\'m most passionate about — storytelling, visual art, and environmental conservation — into a single career that I believe could genuinely make a difference in the world. The job would involve travelling to remote and ecologically significant locations around the world to film and document stories about wildlife, ecosystems under threat, and the communities working to protect them. A typical project might involve spending several weeks in a particular region — perhaps the coral reefs of Raja Ampat in Indonesia or the rapidly melting glaciers of Patagonia — researching the environmental issues, interviewing local scientists and activists, capturing footage in challenging conditions, and then spending months in post-production editing the material into a compelling narrative. The qualifications and skills required are diverse and demanding. I would need strong technical proficiency in cinematography, including underwater and aerial drone filming, as well as expertise in video editing software and sound design. Equally important would be skills in research, interviewing, and scriptwriting to craft stories that inform and emotionally engage audiences. A background in environmental science would be invaluable for understanding the issues I\'d be covering, and I would need physical fitness and resilience to work in harsh and remote environments for extended periods. Language skills would also be essential for working across different cultures and regions. The reason this is my dream job is that environmental documentaries have the unique power to make people care about issues they might otherwise ignore. A well-crafted documentary can take a viewer from complete indifference to passionate concern in just ninety minutes, and that emotional transformation is what drives real change in behaviour and policy. Films like "My Octopus Teacher" and "Chasing Coral" have demonstrably shifted public attitudes toward marine conservation, and I want to contribute to that tradition. Ultimately, I want my career to be defined not by profit or prestige but by the positive impact it has on the natural world I love so deeply.',
            breakdown: {
                intro: 'Dream job is environmental documentary filmmaker — combines three passions: storytelling, visual art, and environmental conservation into a career that could make a genuine difference',
                body1: 'Involves travelling to ecologically significant locations worldwide, filming wildlife and threatened ecosystems, interviewing scientists and activists, then spending months in post-production crafting compelling narratives',
                body2: 'Requires technical cinematography skills (underwater and drone), video editing and sound design, research and scriptwriting, environmental science knowledge, physical fitness, and multilingual abilities',
                conclusion: 'Environmental documentaries can transform indifference into passionate concern in ninety minutes; films like "My Octopus Teacher" shifted public attitudes — wants career defined by positive impact, not profit'
            }
        }
    },

    // Nature/Environment (70-74)
    {
        topic: 'Describe a natural place you have visited that impressed you',
        prompts: ['Where this place is', 'When you went there', 'What you saw and did there', 'And explain why it made a strong impression on you'],
        category: 'Nature', bestStrategy: '5wf',
        followUpQuestions: ["Do you think people spend enough time in nature?","How can cities incorporate more natural spaces?"],
        keyVocabulary: [{"word":"pristine","meaning":"in its original condition; unspoiled"},{"word":"awe-struck","meaning":"filled with wonder and amazement"},{"word":"biodiversity","meaning":"the variety of plant and animal life in an area"},{"word":"tranquil","meaning":"free from disturbance; calm"},{"word":"wilderness","meaning":"an uncultivated, uninhabited natural area"},{"word":"ecosystem","meaning":"a biological community of interacting organisms and their environment"}],
        sampleAnswer: {
            text: 'I\'d like to describe a visit to Phong Nha-Ke Bang National Park in central Vietnam, which left me absolutely awe-struck and fundamentally changed the way I think about the natural world. The park is located in Quang Binh Province and is home to some of the oldest and most spectacular cave systems on Earth, formed over four hundred million years ago in ancient limestone karst terrain. I visited about two years ago with a small group of friends during a week-long trip to the region. The national park covers an area of over eighty-five thousand hectares and contains more than three hundred caves and grottoes, including Son Doong, the largest cave in the world, which is so enormous that it has its own weather system and a jungle growing inside it. Although we didn\'t visit Son Doong itself — that requires a multi-day expedition and costs several thousand dollars — we explored several other caves that were equally breathtaking in their own right. Paradise Cave was the highlight for me. We descended steep steps into the earth and emerged into a cathedral-like chamber stretching over thirty-one kilometres in length, filled with towering stalagmites and delicate stalactites that glittered under carefully positioned lights like a subterranean crystal palace. The formations had been sculpted by water over millions of years, creating shapes that resembled frozen waterfalls, organ pipes, and curtains of translucent stone. The silence inside was profound — the only sounds were the distant dripping of water and our own awed whispers. Outside the caves, the park\'s surface landscape was equally impressive. We kayaked along a river that wound through dense tropical forest alive with birdsong, and we hiked through ancient woodland where enormous trees draped in moss and vines created a canopy so thick that the forest floor existed in permanent twilight. The reason this place made such a strong impression is that it confronted me with a timescale I could barely comprehend — standing inside a cave that had been forming for hundreds of millions of years made my own life feel like a single heartbeat in the vast pulse of geological time, and that perspective was both humbling and strangely liberating.',
            breakdown: {
                what_who: 'Phong Nha-Ke Bang National Park — 85,000+ hectares with 300+ caves in ancient limestone karst; Paradise Cave stretches 31km with towering stalagmites and crystal-like stalactite formations sculpted over millions of years',
                where_when: 'Located in Quang Binh Province, central Vietnam; visited two years ago with friends on a week-long trip; the park contains Son Doong, the world\'s largest cave with its own weather system',
                why: 'Confronted with a timescale barely comprehensible — standing inside a cave forming for hundreds of millions of years made life feel like a single heartbeat in geological time; both humbling and liberating',
                how_feelings: 'The profound silence inside — only distant dripping water and awed whispers; outside, kayaked through tropical forest alive with birdsong and hiked ancient woodland in permanent twilight under thick canopy'
            }
        }
    },
    {
        topic: 'Describe a season of the year you enjoy most',
        prompts: ['Which season it is', 'What the weather is like during this season', 'What activities you do in this season', 'And explain why you enjoy this season'],
        category: 'Nature', bestStrategy: 'ibc',
        followUpQuestions: ["Do you think climate change is affecting the seasons?","How do seasons influence people\'s mood and productivity?"],
        keyVocabulary: [{"word":"crisp","meaning":"pleasantly cool and fresh"},{"word":"foliage","meaning":"the leaves of a plant or tree"},{"word":"temperate","meaning":"relating to a mild climate"},{"word":"overcast","meaning":"covered with clouds"},{"word":"bloom","meaning":"to produce flowers; to flourish"},{"word":"refreshing","meaning":"welcome and pleasantly different"}],
        sampleAnswer: {
            text: 'I\'d like to talk about my favourite season, which is autumn — or as we experience it in Vietnam, the period from roughly September to November when the intense summer heat finally begins to subside and the air takes on a noticeably different quality. To begin with, what I love most about autumn is the weather itself. After months of sweltering temperatures that regularly exceed thirty-five degrees and oppressive humidity that makes even sitting still uncomfortable, autumn arrives like a gentle reprieve. The mornings become pleasantly cool, often around twenty to twenty-two degrees in the north, and there\'s a crispness to the air that makes you want to take deep breaths. The light changes too — instead of the harsh, bleached-white glare of summer, autumn brings a softer, golden quality to the sunshine that makes everything look warmer and more beautiful, particularly in the late afternoon when the city is bathed in amber light. Another aspect I particularly enjoy is the way autumn transforms my daily activities. During summer, I tend to retreat indoors to escape the heat, but in autumn I rediscover the pleasure of being outside. I start cycling to work again instead of taking air-conditioned taxis, I go for long walks along the lake near my apartment in the evenings, and I spend weekend mornings sitting in outdoor cafes reading and people-watching. The food changes with the season too — street vendors start selling roasted sweet potatoes and corn, and there\'s a particular type of flat green rice called com, which is only available during autumn and is absolutely delicious when wrapped in lotus leaves. In conclusion, what makes autumn genuinely special to me is its emotional resonance. There\'s a gentle melancholy to the season that I find deeply appealing — the shorter days, the falling leaves, the sense of transition between the exuberance of summer and the quietness of winter. It\'s a season that naturally encourages reflection and gratitude, and I find that my most creative and productive periods consistently coincide with these months.',
            breakdown: {
                intro: 'Favourite season is autumn (September-November in Vietnam) when intense summer heat finally subsides and the air takes on a noticeably different quality',
                body1: 'Weather transforms from sweltering 35°C humidity to pleasant 20-22°C mornings with crisp air; light shifts from harsh summer glare to soft golden quality, particularly beautiful in late afternoon',
                body2: 'Activities shift outdoors — cycling to work, evening lakeside walks, outdoor cafe reading; seasonal foods appear including roasted sweet potatoes and com (flat green rice) wrapped in lotus leaves',
                conclusion: 'Autumn\'s gentle melancholy is deeply appealing — shorter days, falling leaves, and a sense of transition encourage reflection and gratitude; most creative and productive periods coincide with these months'
            }
        }
    },
    {
        topic: 'Describe an animal you find interesting',
        prompts: ['What the animal is', 'Where it lives', 'What you know about it', 'And explain why you find it interesting'],
        category: 'Nature', bestStrategy: '5wf',
        followUpQuestions: ["Should animals be kept in zoos?","What can be done to protect endangered species?"],
        keyVocabulary: [{"word":"endangered","meaning":"at serious risk of extinction"},{"word":"habitat","meaning":"the natural home of an animal or plant"},{"word":"adaptation","meaning":"a change that makes an organism better suited to its environment"},{"word":"migration","meaning":"seasonal movement from one region to another"},{"word":"conservation","meaning":"the protection of animals and the environment"},{"word":"species","meaning":"a group of similar organisms that can breed together"}],
        sampleAnswer: {
            text: 'I\'d like to talk about an animal that has fascinated me since I was a child — the octopus. The octopus is a marine invertebrate belonging to the cephalopod family, and there are roughly three hundred known species found in oceans worldwide, from shallow tropical reefs to the deep, freezing waters of the abyssal zone. What makes the octopus extraordinary is its almost alien level of intelligence and its remarkable physical capabilities. An octopus has three hearts — two pump blood to the gills while the third sends it to the rest of the body — and blue blood containing copper-based hemocyanin rather than the iron-based hemoglobin found in mammals. Its eight arms contain two-thirds of its neurons, meaning each arm can essentially taste, touch, and make decisions semi-independently from the brain. Perhaps most impressively, the octopus can change both the colour and texture of its skin in milliseconds using specialised cells called chromatophores and papillae, allowing it to vanish against virtually any background — coral, sand, seaweed, or rocky surfaces. I first became fascinated with octopuses when I watched the documentary "My Octopus Teacher," which follows a filmmaker\'s year-long relationship with a wild octopus in a South African kelp forest. The documentary showed the octopus solving problems, using tools, playing with objects out of apparent curiosity, and even recognising and interacting with the filmmaker as an individual — behaviours we typically associate only with mammals and birds. Since watching that film, I\'ve read extensively about cephalopod cognition and have been astonished to learn that octopuses can navigate mazes, unscrew jar lids from the inside, and have been observed escaping from aquariums by squeezing through impossibly small gaps and walking across the floor to reach the ocean. The reason I find the octopus so interesting is that it challenges our anthropocentric assumptions about intelligence. Here is a creature that evolved intelligence along a completely different evolutionary path from humans, separated by over five hundred million years, yet arrived at remarkably sophisticated problem-solving abilities. It reminds me that intelligence can take forms we might not recognise or expect.',
            breakdown: {
                what_who: 'The octopus — a marine cephalopod with 300+ species; three hearts, blue copper-based blood, eight arms containing two-thirds of its neurons, and chromatophore cells enabling instant colour and texture changes',
                where_when: 'Found in oceans worldwide from shallow tropical reefs to the deep abyssal zone; fascination began with the documentary "My Octopus Teacher" and deepened through reading about cephalopod cognition',
                why: 'Challenges anthropocentric assumptions about intelligence — evolved sophisticated problem-solving along a completely different evolutionary path separated from humans by 500+ million years',
                how_feelings: 'Astonished by behaviours: solving mazes, unscrewing jars from inside, escaping aquariums, recognising individual humans, using tools, and displaying apparent curiosity — intelligence in forms we might not expect'
            }
        }
    },
    {
        topic: 'Describe a weather event you experienced that was memorable',
        prompts: ['What type of weather it was', 'When and where it happened', 'What you did during it', 'And explain why this weather event was memorable'],
        category: 'Nature', bestStrategy: 'star',
        followUpQuestions: ["Do you think extreme weather events are becoming more common?","How well do you think your country is prepared for natural disasters?"],
        keyVocabulary: [{"word":"torrential","meaning":"falling rapidly and in large quantities (rain)"},{"word":"devastation","meaning":"great destruction or damage"},{"word":"aftermath","meaning":"the consequences or after-effects of a significant event"},{"word":"precaution","meaning":"a measure taken in advance to prevent harm"},{"word":"resilience","meaning":"the ability to recover quickly from difficulties"},{"word":"forecast","meaning":"a prediction of future weather conditions"}],
        sampleAnswer: {
            text: 'I\'d like to describe a typhoon I experienced about four years ago when I was visiting my grandparents in a coastal city in central Vietnam. The situation began when weather forecasts started warning about a powerful typhoon approaching the coast, and within twenty-four hours the atmosphere in the city completely changed. The sky turned an eerie grey-green colour, the wind began picking up steadily, and shop owners started boarding up their windows and moving merchandise to higher ground. My grandparents, who had lived through many typhoons, calmly but efficiently began their preparations — filling every available container with fresh water, charging all electronic devices, securing loose objects in the garden, and stocking up on canned food and candles. Their practiced efficiency was both reassuring and sobering. The task of helping them prepare the house fell to my father and me. We spent several hours taping windows in cross patterns to prevent shattering, moving furniture away from windows, and helping neighbours secure their roof panels with additional ropes and sandbags. By evening, the typhoon made landfall and the intensity was unlike anything I had ever experienced. The wind howled at what felt like an inhuman pitch, rain hammered against the walls so violently it sounded like gravel being thrown at the house, and the entire building creaked and shuddered. We huddled in the interior room with no windows, listening to what sounded like the world being torn apart outside. At one point, we heard a tremendous crash and later discovered that the old mango tree in the courtyard — a tree my grandfather had planted when he was a young man — had been ripped out of the ground and thrown against the neighbour\'s wall. The power went out early and didn\'t return for three days. When the typhoon finally passed the following morning and we emerged to assess the damage, the neighbourhood looked like a war zone — roofing materials scattered across streets, flooded intersections, downed power lines, and debris everywhere. Yet what struck me most was the immediate community response. Within hours, neighbours were helping each other clear debris, sharing food and water, and checking on elderly residents who lived alone. This experience was memorable because it showed me both the terrifying power of nature and the extraordinary resilience of human communities when they face adversity together.',
            breakdown: {
                situation: 'Visiting grandparents in a central Vietnamese coastal city when a powerful typhoon was forecast; the atmosphere changed — eerie grey-green sky, rising wind, shops boarding up windows',
                task: 'Helped prepare the house — taping windows, moving furniture, helping neighbours secure roof panels with ropes and sandbags; grandparents efficiently filled water containers and stocked supplies',
                action: 'During the typhoon, huddled in an interior room as wind howled, rain sounded like gravel, and the building shuddered; grandfather\'s mango tree was ripped from the ground; power lost for three days',
                result: 'The neighbourhood looked like a war zone afterward, but neighbours immediately helped each other — clearing debris, sharing food, checking on elderly; showed both nature\'s terrifying power and human community resilience'
            }
        }
    },
    {
        topic: 'Describe an environmental issue you care about',
        prompts: ['What the issue is', 'How you became aware of it', 'What effects it has', 'And explain why you feel strongly about this issue'],
        category: 'Nature', bestStrategy: 'psi',
        followUpQuestions: ["Should individuals or governments take more responsibility for the environment?","Do you think environmental education should be mandatory in schools?"],
        keyVocabulary: [{"word":"sustainability","meaning":"meeting present needs without compromising future generations"},{"word":"carbon footprint","meaning":"the amount of greenhouse gases produced by a person or activity"},{"word":"deforestation","meaning":"the clearing of forests"},{"word":"renewable energy","meaning":"energy from sources that are not depleted when used"},{"word":"pollution","meaning":"the introduction of harmful substances into the environment"},{"word":"ecological","meaning":"relating to the relationship between organisms and their environment"}],
        sampleAnswer: {
            text: 'I\'d like to talk about an environmental issue I feel deeply passionate about, which is plastic pollution in the oceans. The problem is staggering in scale and growing worse every year. An estimated eight million tonnes of plastic waste enter the world\'s oceans annually — that\'s roughly equivalent to emptying a rubbish truck of plastic into the sea every single minute. This plastic doesn\'t biodegrade; instead, it breaks down into increasingly tiny fragments called microplastics that contaminate the entire marine food chain, from microscopic plankton to the largest whales. I first became acutely aware of this issue about five years ago when I participated in a beach cleanup organised by a local environmental group in my hometown. I was shocked by the sheer volume and variety of plastic we collected in just a few hours — bags, bottles, food wrappers, fishing line, and countless unidentifiable fragments embedded in the sand. What disturbed me most was finding a dead seabird with its stomach full of coloured plastic pieces that it had mistaken for food. That visceral, physical encounter with the consequences of our throwaway culture affected me in a way that reading statistics never had. The effects of ocean plastic pollution are devastating and far-reaching. Marine animals become entangled in plastic debris or ingest it, leading to starvation, suffocation, and death — an estimated one hundred thousand marine mammals and one million seabirds die from plastic pollution every year. Microplastics have now been found in tap water, table salt, honey, and even human blood, meaning the problem is no longer confined to the ocean but has become a direct threat to human health. The solution requires action at every level. Governments need to implement bans on single-use plastics and invest in waste management infrastructure, particularly in developing countries where collection systems are inadequate. Companies must be held accountable for the packaging they produce through extended producer responsibility schemes. And as individuals, we can reduce our plastic consumption, support businesses that prioritise sustainable packaging, and participate in cleanup efforts. What I\'ve learned from engaging with this issue is that environmental problems are never purely environmental — they are deeply intertwined with economics, inequality, and political will. The communities most affected by plastic pollution are often the poorest, and any solution must address these systemic imbalances alongside the physical pollution itself.',
            breakdown: {
                problem: 'Eight million tonnes of plastic enter oceans annually — equivalent to a rubbish truck every minute; breaks into microplastics contaminating the entire marine food chain from plankton to whales',
                solution: 'Government bans on single-use plastics, investment in waste management infrastructure, extended producer responsibility for companies, individual reduction in plastic consumption and participation in cleanups',
                impact: '100,000 marine mammals and 1 million seabirds die annually; microplastics found in tap water, salt, honey, and human blood — no longer just an ocean problem but a direct human health threat',
                learning: 'Environmental problems are intertwined with economics, inequality, and political will; the poorest communities are most affected; solutions must address systemic imbalances alongside physical pollution'
            }
        }
    }
];

// State
let currentStrategy = 'star';
let currentMode = 'sequential';
let currentIndex = 0;
let allCards = [];
let favorites = new Set();
let completed = new Set();
let sampleExpanded = false;
let connectorExpanded = false;

// Timer state
let timerInterval = null;
let timerSeconds = 0;
let timerMode = 'idle'; // 'idle', 'prep', 'speaking'

// Audio recording state
let answerRecorder = null;
let answerRecordingBlob = null;
let answerRecordingTimer = null;
let isAnswerRecording = false;

const MAX_RECORDING_SECONDS = 150; // 2:30

// Storage keys
const STORAGE_KEY = 'module3_part2_progress';
const FAVORITES_KEY = 'module3_part2_favorites';

// Speaking speed (average: 150 words per minute = 2.5 words per second)
const WORDS_PER_SECOND = 2.5;

// Student identification state
let studentSession = null;
let telegramSender = null;
let identificationCamera = null;
let capturedPhotoData = null;

// Initialize
document.addEventListener('DOMContentLoaded', init);

function init() {
    studentSession = new StudentSession();
    if (typeof botToken !== 'undefined' && typeof groupId !== 'undefined' && botToken && groupId) {
        telegramSender = new TelegramSender(botToken, groupId);
    }
    if (!botToken || !groupId) {
        setTimeout(() => {
            document.querySelectorAll('[onclick*="Telegram"]').forEach(el => el.style.display = 'none');
            const sendBtns = document.querySelectorAll('.btn-telegram, #sendTelegramBtn');
            sendBtns.forEach(el => el.style.display = 'none');
        }, 100);
    }
    var hasSession = studentSession.hasActiveSession();
    var hasPending = studentSession.hasPendingSession();
    if (hasSession) {
        hideIdentificationModal();
        initModule();
    } else if (hasPending) {
        showIdentificationModal();
        showApprovalWaiting();
        startApprovalPolling(studentSession.getSession().sessionId);
    } else {
        showIdentificationModal();
        setupIdentificationListeners();
    }
}

function initModule() {
    loadProgress();
    loadFavorites();
    loadCards();
    setupEventListeners();
    renderCurrentCard();
}

function showIdentificationModal() {
    PracticeCommon.showIdentificationModal();
}

function hideIdentificationModal() {
    PracticeCommon.hideIdentificationModal();
}

function setupIdentificationListeners() {
    var nameInput = document.getElementById('studentName');
    if (nameInput) nameInput.addEventListener('input', updateSubmitButtonState);
}

function updateSubmitButtonState() {
    var nameInput = document.getElementById('studentName');
    var submitBtn = document.getElementById('submitIdentificationBtn');
    if (submitBtn) submitBtn.disabled = !(nameInput && nameInput.value.trim() && capturedPhotoData);
}

function startIdentificationCamera() {
    identificationCamera = new CameraCapture('cameraVideo');
    identificationCamera.startCamera().then(function() {
        document.getElementById('cameraPlaceholder').style.display = 'none';
        document.getElementById('startCameraBtn').style.display = 'none';
        document.getElementById('capturePhotoBtn').style.display = 'inline-block';
    }).catch(function(err) { alert('Camera access failed: ' + err.message); });
}

function captureIdentificationPhoto() {
    if (!identificationCamera) return;
    capturedPhotoData = identificationCamera.capturePhoto();
    document.getElementById('capturedPhoto').src = capturedPhotoData;
    document.getElementById('photoPreview').style.display = 'block';
    document.getElementById('cameraPreview').style.display = 'none';
    document.getElementById('capturePhotoBtn').style.display = 'none';
    document.getElementById('retakePhotoBtn').style.display = 'inline-block';
    identificationCamera.stopCamera();
    updateSubmitButtonState();
}

function retakeIdentificationPhoto() {
    capturedPhotoData = null;
    document.getElementById('photoPreview').style.display = 'none';
    document.getElementById('cameraPreview').style.display = 'block';
    document.getElementById('retakePhotoBtn').style.display = 'none';
    document.getElementById('startCameraBtn').style.display = 'inline-block';
    updateSubmitButtonState();
}

async function submitIdentification() {
    var nameInput = document.getElementById('studentName');
    var studentName = nameInput.value.trim();
    if (!studentName || !capturedPhotoData) {
        alert('Please enter your name and take a photo');
        return;
    }
    var submitBtn = document.getElementById('submitIdentificationBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Starting session...';
    try {
        studentSession.createSession(studentName, capturedPhotoData);
        await sendSessionStartToTelegram(studentName, capturedPhotoData);
        await sendApprovalRequest(studentName, studentSession.getSession().sessionId);
        showApprovalWaiting();
        startApprovalPolling(studentSession.getSession().sessionId);
    } catch (error) {
        alert('Failed to start session: ' + error.message);
        studentSession.clearSession();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Start Practice Session';
    }
}

async function sendSessionStartToTelegram(sName, photoDataUrl) {
    await PracticeCommon.sendSessionStartToTelegram({
        telegramSender: telegramSender,
        studentName: sName,
        photoDataUrl: photoDataUrl,
        moduleName: 'Module 3 - Part 2 Long Turn'
    });
}

async function sendApprovalRequest(sName, sessionId) {
    await PracticeCommon.sendApprovalRequest({
        telegramSender: telegramSender,
        studentName: sName,
        sessionId: sessionId,
        moduleName: 'Module 3 - Part 2 Long Turn',
        studentSession: studentSession
    });
}

function showApprovalWaiting() {
    PracticeCommon.showApprovalWaiting();
}

function showApprovalRejected() {
    PracticeCommon.showApprovalRejected();
}

function showApprovalTimeout() {
    PracticeCommon.showApprovalTimeout();
}

function retryIdentification() {
    capturedPhotoData = null;
    PracticeCommon.retryIdentification(studentSession);
}

async function startApprovalPolling(sessionId) {
    await PracticeCommon.startApprovalPolling({
        telegramSender: telegramSender,
        sessionId: sessionId,
        onComplete: onApprovalComplete
    });
}

function onApprovalComplete(result) {
    if (result.approved) {
        studentSession.setApprovalStatus('approved');
        hideIdentificationModal();
        initModule();
    } else if (result.timeout) {
        studentSession.clearSession();
        showApprovalTimeout();
    } else {
        studentSession.setApprovalStatus('rejected');
        studentSession.clearSession();
        showApprovalRejected();
    }
}

function m3DataURLtoBlob(dataURL) {
    return PracticeCommon.dataURLtoBlob(dataURL);
}

// Load cue cards
function loadCards() {
    allCards = [...CUE_CARDS];

    if (currentMode === 'random') {
        allCards = shuffleArray([...allCards]);
    } else if (currentMode === 'favorites') {
        allCards = CUE_CARDS.filter((card, i) => favorites.has(getCardId(card, i)));
    } else if (currentMode === 'review') {
        if (window.SpacedRepetition) {
            var dueIndices = SpacedRepetition.getDueIndices('module3');
            allCards = dueIndices.map(i => CUE_CARDS[i]).filter(Boolean);
        }
        if (allCards.length === 0) {
            allCards = [...CUE_CARDS];
            alert('No cards due for review. Showing all cards.');
        }
    }

    updateProgress();
}

// Event listeners
function setupEventListeners() {
    // Mode buttons
    document.querySelectorAll('.btn-mode').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.btn-mode').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentMode = e.target.dataset.mode;
            currentIndex = 0;
            loadCards();
            renderCurrentCard();
        });
    });

    // Strategy selector
    const strategySelect = document.getElementById('strategySelect');
    if (strategySelect) {
        strategySelect.addEventListener('change', (e) => {
            currentStrategy = e.target.value;
            renderStrategyInfo();
            renderForm();
            updatePreview();

            // Update connectors if expanded
            if (connectorExpanded) {
                updateConnectorDisplay();
            }
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.key === 'ArrowLeft' || e.key === 'p') previousCard();
        if (e.key === 'ArrowRight' || e.key === 'n') nextCard();
        if (e.key === 'j') {
            const modal = document.getElementById('jumpModal');
            if (!modal.classList.contains('active')) openJumpModal();
        }
    });
}

// Render strategy info (no-op in new phase UI, kept for compatibility)
function renderStrategyInfo() {
    // Strategy info card removed in phase redesign
}

// ========== PHASE STATE MACHINE ==========

let currentPhase = 'prep'; // prep, speaking, review
let prepTimerInterval = null;
let speakTimerInterval = null;
let prepSeconds = 60;
let speakSeconds = 120;
let lastTranscript = '';

/** Transition between states using CSS classes on the card container */
function setState(state) {
    currentPhase = state;
    var container = document.getElementById('cuecardContainer');

    // Remove all state classes
    container.classList.remove('cuecard--idle', 'cuecard--prep', 'cuecard--speaking', 'cuecard--review');

    // Map phase names to state classes
    var stateMap = {
        'prep': 'cuecard--prep',
        'idle': 'cuecard--idle',
        'speaking': 'cuecard--speaking',
        'review': 'cuecard--review'
    };
    container.classList.add(stateMap[state] || 'cuecard--idle');

    // Toggle section visibility (belt-and-suspenders with CSS)
    document.getElementById('prepPhase').style.display = (state === 'prep' || state === 'idle') ? '' : 'none';
    document.getElementById('speakPhase').style.display = state === 'speaking' ? '' : 'none';
    document.getElementById('reviewPhase').style.display = state === 'review' ? '' : 'none';

    // Update phase bar indicators
    ['phase1', 'phase2', 'phase3'].forEach(function(id) {
        document.getElementById(id).classList.remove('active', 'done');
    });

    if (state === 'idle' || state === 'prep') {
        document.getElementById('phase1').classList.add('active');
    } else if (state === 'speaking') {
        document.getElementById('phase1').classList.add('done');
        document.getElementById('phase2').classList.add('active');
    } else if (state === 'review') {
        document.getElementById('phase1').classList.add('done');
        document.getElementById('phase2').classList.add('done');
        document.getElementById('phase3').classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/** Legacy alias for backward compatibility */
function setPhase(phase) {
    setState(phase);
}

// ========== RENDER CURRENT CARD ==========

function renderCurrentCard() {
    if (!allCards || allCards.length === 0) return;

    const card = allCards[currentIndex];

    // Reset to prep phase
    clearAllTimers();
    setState('prep');

    // Update cue card hero
    document.getElementById('cardNumber').textContent = 'Card ' + (currentIndex + 1);
    document.getElementById('cardCategory').textContent = card.category;
    document.getElementById('cardTopic').textContent = card.topic;

    // Update prompts
    const promptsList = document.getElementById('promptsList');
    promptsList.innerHTML = card.prompts.map(function(p) {
        return '<li>' + p + '</li>';
    }).join('');

    // Update favorite button
    const favBtn = document.getElementById('favBtn');
    const cardId = getCardId(card, currentIndex);
    favBtn.textContent = favorites.has(cardId) ? '\u2605' : '\u2606';
    favBtn.classList.toggle('active', favorites.has(cardId));

    // Set suggested strategy
    if (card.bestStrategy && card.bestStrategy !== currentStrategy) {
        currentStrategy = card.bestStrategy;
        var sel = document.getElementById('strategySelect');
        if (sel) sel.value = currentStrategy;
    }

    // Reset prep timer display
    resetPrepTimer();

    // Clear notes
    document.getElementById('prepNotes').value = '';

    // Reset prep button
    var prepBtn = document.getElementById('startPrepBtn');
    prepBtn.textContent = 'Start 1-Minute Preparation';
    prepBtn.disabled = false;

    // Update vocabulary section
    updateVocabSection(card);

    // Show attempt badge
    updateAttemptBadge(currentIndex);

    updateProgress();
}

/** Populate vocab details section */
function updateVocabSection(card) {
    var section = document.getElementById('vocabSection');
    if (!card.keyVocabulary || card.keyVocabulary.length === 0) {
        section.style.display = 'none';
        return;
    }
    section.style.display = 'block';
    var html = '';
    card.keyVocabulary.forEach(function(v) {
        html += '<div style="display:flex;gap:8px;margin-bottom:6px;align-items:baseline;">';
        html += '<span style="font-weight:600;color:#1e40af;">' + v.word + '</span>';
        html += '<span style="color:#666;font-size:0.9em;"> -- ' + v.meaning + '</span>';
        html += '</div>';
    });
    document.getElementById('vocabContent').innerHTML = html;
}

// ========== PREP PHASE ==========

/** Reset the prep timer SVG ring and display */
function resetPrepTimer() {
    prepSeconds = 60;
    document.getElementById('prepTimerValue').textContent = '1:00';
    document.getElementById('prepTimerValue').style.color = '#16a34a';
    var ring = document.getElementById('prepTimerProgress');
    if (ring) ring.setAttribute('stroke-dashoffset', '0');
}

/** Start 1-minute preparation countdown */
function startPrep() {
    clearAllTimers();
    resetPrepTimer();

    var btn = document.getElementById('startPrepBtn');
    btn.disabled = true;
    btn.textContent = 'Preparation in progress...';

    var circumference = 2 * Math.PI * 54; // r=54
    prepTimerInterval = setInterval(function() {
        prepSeconds--;
        updatePrepTimerDisplay(circumference);

        if (prepSeconds <= 0) {
            clearInterval(prepTimerInterval);
            prepTimerInterval = null;
            playBeep();
            transitionToSpeaking();
        }
    }, 1000);
}

/** Update prep timer value and ring */
function updatePrepTimerDisplay(circumference) {
    var el = document.getElementById('prepTimerValue');
    var m = Math.floor(prepSeconds / 60);
    var s = prepSeconds % 60;
    el.textContent = m + ':' + s.toString().padStart(2, '0');

    // Color warning in last 10 seconds
    el.style.color = prepSeconds <= 10 ? '#dc2626' : '#16a34a';

    // Update ring
    var ring = document.getElementById('prepTimerProgress');
    if (ring) {
        var progress = (60 - prepSeconds) / 60;
        ring.setAttribute('stroke-dashoffset', circumference * (1 - progress));
    }
}

// ========== SPEAKING PHASE ==========

/** Transition from prep to speaking phase */
function transitionToSpeaking() {
    var card = allCards[currentIndex];

    // Populate mini cue card
    var mini = document.getElementById('cuecardMini');
    mini.innerHTML = '<strong>' + card.topic + '</strong>';

    // Reset speak timer
    speakSeconds = 120;
    document.getElementById('speakTimerValue').textContent = '2:00';
    document.getElementById('speakTimerValue').style.color = '#16a34a';
    var ring = document.getElementById('speakTimerProgress');
    if (ring) ring.setAttribute('stroke-dashoffset', '0');

    // Reset transcript
    document.getElementById('liveTranscript').textContent =
        'Speak now -- your words will appear here...';
    document.getElementById('liveWordCount').textContent = '0 words';
    lastTranscript = '';

    setState('speaking');
    startSpeakingPhase();
}

/** Start recording + 2-min countdown */
async function startSpeakingPhase() {
    // Start recording
    try {
        answerRecorder = new AudioRecorder();
        await answerRecorder.initialize();
        answerRecorder.startRecording();
        isAnswerRecording = true;
    } catch (e) {
        console.error('Recording init error:', e);
    }

    // Start live STT using the liveTranscript element
    try {
        var sttHandle = window.sttService
            ? window.sttService.startLiveTranscription(
                function(interim) {
                    if (interim) {
                        document.getElementById('liveTranscript').textContent = interim;
                        lastTranscript = interim;
                    }
                },
                function(final) {
                    if (final) {
                        document.getElementById('liveTranscript').textContent = final;
                        lastTranscript = final;
                    }
                }
            )
            : null;
        window.liveSTT = sttHandle ? { handle: sttHandle } : null;
    } catch (e) {
        console.log('STT not available:', e.message);
        window.liveSTT = null;
    }

    // Word count update poll
    window.liveTranscriptPoll = setInterval(function() {
        if (lastTranscript) {
            var words = lastTranscript.trim().split(/\s+/).filter(function(w) { return w; });
            document.getElementById('liveWordCount').textContent = words.length + ' words';
        }
    }, 1000);

    // Start 2-min countdown
    var circumference = 2 * Math.PI * 90; // r=90
    speakTimerInterval = setInterval(function() {
        speakSeconds--;
        updateSpeakTimerDisplay(circumference);

        if (speakSeconds <= 0) {
            clearInterval(speakTimerInterval);
            speakTimerInterval = null;
            playBeep();
            stopSpeaking();
        }
    }, 1000);
}

/** Update the large speaking timer ring and value */
function updateSpeakTimerDisplay(circumference) {
    var el = document.getElementById('speakTimerValue');
    var m = Math.floor(speakSeconds / 60);
    var s = speakSeconds % 60;
    el.textContent = m + ':' + s.toString().padStart(2, '0');

    var elapsed = 120 - speakSeconds;
    var progress = Math.min(elapsed / 120, 1);
    var ring = document.getElementById('speakTimerProgress');
    if (ring) {
        ring.setAttribute('stroke-dashoffset', circumference * (1 - progress));
        if (elapsed < 90) {
            ring.setAttribute('stroke', '#16a34a');
            el.style.color = '#16a34a';
        } else if (elapsed < 110) {
            ring.setAttribute('stroke', '#ca8a04');
            el.style.color = '#ca8a04';
        } else {
            ring.setAttribute('stroke', '#dc2626');
            el.style.color = '#dc2626';
        }
    }

    if (speakSeconds <= 0) {
        el.textContent = "Time's up!";
        el.style.color = '#dc2626';
    }
}

/** Update live transcript from STT */
function updateLiveTranscript() {
    if (!window.liveSTT) return;

    var stt = window.liveSTT;
    var text = '';
    if (stt.recognition && stt.fullTranscript !== undefined) {
        text = stt.fullTranscript || '';
    } else if (stt.transcript !== undefined) {
        text = stt.transcript || '';
    }

    if (text && text !== lastTranscript) {
        lastTranscript = text;
        document.getElementById('liveTranscript').textContent = text;
        var words = text.trim().split(/\s+/).filter(function(w) { return w; });
        document.getElementById('liveWordCount').textContent = words.length + ' words';
    }
}

/** Stop speaking: end recording, get transcript, go to review */
async function stopSpeaking() {
    // Stop timers
    if (speakTimerInterval) {
        clearInterval(speakTimerInterval);
        speakTimerInterval = null;
    }
    if (window.liveTranscriptPoll) {
        clearInterval(window.liveTranscriptPoll);
        window.liveTranscriptPoll = null;
    }

    // Stop live STT
    var liveTranscript = '';
    if (window.liveSTT && window.liveSTT.handle && window.sttService) {
        try {
            liveTranscript = window.sttService.stopLiveTranscription(window.liveSTT.handle) || '';
        } catch (e) {
            console.log('STT stop error:', e.message);
        }
    }
    window.liveSTT = null;
    // Use lastTranscript as fallback
    if (!liveTranscript) liveTranscript = lastTranscript;

    // Stop recording
    var recordingBlob = null;
    if (answerRecorder) {
        try {
            var recording = await answerRecorder.stopRecording();
            if (recording) recordingBlob = recording.blob;
        } catch (e) {
            console.error('Stop recording error:', e);
        }
        answerRecorder.cleanup();
        answerRecorder = null;
    }
    isAnswerRecording = false;
    answerRecordingBlob = recordingBlob;

    // Use live transcript or last captured text
    var transcript = liveTranscript || lastTranscript || '';
    localStorage.setItem('m3_last_transcript_' + currentIndex, transcript);

    transitionToReview(transcript);
}

// ========== REVIEW PHASE ==========

/** Build and show review phase */
function transitionToReview(transcript) {
    var card = allCards[currentIndex];
    var wordCount = transcript ? transcript.trim().split(/\s+/).length : 0;

    // -- Score display --
    var scoreHTML = '';
    if (window.calculateBandScores && transcript.length > 20) {
        var duration = 120 - speakSeconds;
        var scores = calculateBandScores(transcript, duration);
        scoreHTML += '<div style="text-align:center;margin-bottom:16px;">';
        scoreHTML += '<div style="font-size:2.2rem;font-weight:700;color:#16a34a;">Band ' + scores.overall + '</div>';
        scoreHTML += '<div style="display:flex;justify-content:center;gap:16px;margin-top:8px;flex-wrap:wrap;">';
        scoreHTML += buildCriterionBadge('Fluency', scores.fluency);
        scoreHTML += buildCriterionBadge('Vocabulary', scores.vocabulary);
        scoreHTML += buildCriterionBadge('Grammar', scores.grammar);
        scoreHTML += buildCriterionBadge('Pronunciation', scores.pronunciation);
        scoreHTML += '</div>';
        scoreHTML += '<div style="margin-top:8px;font-size:0.85rem;color:#6b7280;">' + wordCount + ' words | ~' + Math.round(wordCount / 2.5) + 's speaking time</div>';
        scoreHTML += '</div>';

        // Save score
        var cardId = getCardId(card, currentIndex);
        completed.add(cardId);
        saveProgress();
        incrementAttempt(currentIndex);

        if (window.SpacedRepetition) {
            SpacedRepetition.recordScore('module3_' + currentIndex, scores.overall);
        }

        if (window.ScoreHistory) {
            ScoreHistory.save({
                moduleId: 'module3',
                questionId: cardId,
                scores: scores,
                wordCount: wordCount,
                transcript: transcript
            });
        }
    } else {
        scoreHTML = '<div style="text-align:center;color:#6b7280;padding:16px;">No transcript captured. Try speaking louder or use the manual input below.</div>';
        scoreHTML += '<div style="text-align:center;margin-top:8px;">';
        scoreHTML += '<textarea id="manualReviewInput" rows="4" style="width:100%;max-width:500px;padding:10px;border:1px solid #d1d5db;border-radius:8px;font-size:1rem;" placeholder="Type your answer here..."></textarea>';
        scoreHTML += '<button onclick="submitManualReview()" style="display:block;margin:8px auto;padding:10px 24px;background:#16a34a;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:600;">Submit & Score</button>';
        scoreHTML += '</div>';
    }
    document.getElementById('reviewScore').innerHTML = scoreHTML;

    // -- Comparison --
    var compHTML = '';
    if (transcript && card.sampleAnswer && card.sampleAnswer.text) {
        compHTML += '<div class="comparison-col">';
        compHTML += '<h4>Your Answer</h4>';
        compHTML += '<div class="comparison-text">' + escapeHTML(transcript) + '</div>';
        compHTML += '<div class="comparison-words">' + wordCount + ' words</div>';
        compHTML += '</div>';
        compHTML += '<div class="comparison-col">';
        compHTML += '<h4>Band 7-8 Sample</h4>';
        compHTML += '<div class="comparison-text">' + escapeHTML(card.sampleAnswer.text) + '</div>';
        var sampleWords = card.sampleAnswer.text.trim().split(/\s+/).length;
        compHTML += '<div class="comparison-words">' + sampleWords + ' words</div>';
        compHTML += '</div>';
    }
    document.getElementById('reviewComparison').innerHTML = compHTML;

    // -- Follow-up questions --
    var followup = document.getElementById('reviewFollowup');
    if (card.followUpQuestions && card.followUpQuestions.length > 0) {
        var fHTML = '<ol style="margin:0;padding-left:20px;">';
        card.followUpQuestions.forEach(function(q) {
            fHTML += '<li style="margin-bottom:6px;color:#78350f;">' + q + '</li>';
        });
        fHTML += '</ol>';
        document.getElementById('followupContent').innerHTML = fHTML;
        followup.style.display = 'block';
    } else {
        followup.style.display = 'none';
    }

    // -- Sample answer in details --
    var sampleEl = document.getElementById('sampleContent');
    if (card.sampleAnswer && card.sampleAnswer.text) {
        sampleEl.innerHTML = '<p style="line-height:1.7;">' + escapeHTML(card.sampleAnswer.text) + '</p>';
    } else {
        sampleEl.innerHTML = '<p style="color:#999;">No sample answer available for this card.</p>';
    }

    // -- Audio playback --
    if (answerRecordingBlob) {
        var audioHTML = '<div style="margin-top:12px;text-align:center;">';
        audioHTML += '<audio controls style="width:100%;max-width:400px;margin-bottom:8px;"></audio>';
        audioHTML += '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">';
        audioHTML += '<button onclick="downloadAnswerRecording()" style="padding:8px 16px;border:1px solid #d1d5db;border-radius:8px;background:white;cursor:pointer;font-size:0.85rem;">Download</button>';
        audioHTML += '<button onclick="sendRecordingToTelegram()" style="padding:8px 16px;border:1px solid #d1d5db;border-radius:8px;background:white;cursor:pointer;font-size:0.85rem;">Send to Telegram</button>';
        audioHTML += '</div></div>';
        var scoreDiv = document.getElementById('reviewScore');
        scoreDiv.insertAdjacentHTML('beforeend', audioHTML);
        var audioEl = scoreDiv.querySelector('audio');
        if (audioEl) audioEl.src = URL.createObjectURL(answerRecordingBlob);
    }

    setState('review');
    updateProgress();
}

/** Build a small criterion badge for the score card */
function buildCriterionBadge(label, score) {
    return '<div style="text-align:center;">' +
        '<div style="font-size:1.1rem;font-weight:600;">' + score + '</div>' +
        '<div style="font-size:0.7rem;color:#6b7280;">' + label + '</div>' +
        '</div>';
}

/** Escape HTML for safe insertion */
function escapeHTML(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/** Submit manual answer from review phase */
function submitManualReview() {
    var ta = document.getElementById('manualReviewInput');
    if (!ta || ta.value.trim().length < 20) {
        alert('Please type at least a few sentences.');
        return;
    }
    var transcript = ta.value.trim();
    localStorage.setItem('m3_last_transcript_' + currentIndex, transcript);
    lastTranscript = transcript;
    transitionToReview(transcript);
}

/** Try again: reset to prep phase for current card */
function tryAgain() {
    incrementAttempt(currentIndex);
    answerRecordingBlob = null;
    lastTranscript = '';
    renderCurrentCard();
}

// Keep legacy function name for PracticeCommon compatibility
function tryAgainM3() {
    tryAgain();
}

// ========== TIMER UTILITIES ==========

function clearAllTimers() {
    if (prepTimerInterval) {
        clearInterval(prepTimerInterval);
        prepTimerInterval = null;
    }
    if (speakTimerInterval) {
        clearInterval(speakTimerInterval);
        speakTimerInterval = null;
    }
    if (window.liveTranscriptPoll) {
        clearInterval(window.liveTranscriptPoll);
        window.liveTranscriptPoll = null;
    }
    // Stop any active recording
    if (isAnswerRecording && answerRecorder) {
        try {
            answerRecorder.stopRecording();
            answerRecorder.cleanup();
        } catch (e) { /* ignore */ }
        answerRecorder = null;
        isAnswerRecording = false;
    }
    if (window.liveSTT && window.liveSTT.handle && window.sttService) {
        try { window.sttService.stopLiveTranscription(window.liveSTT.handle); } catch (e) { /* ignore */ }
        window.liveSTT = null;
    }
}

function playBeep() {
    try {
        var audioContext = new (window.AudioContext || window.webkitAudioContext)();
        var oscillator = audioContext.createOscillator();
        var gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log('Audio not supported');
    }
}

// ========== REMOVED FUNCTIONS (stubs for compatibility) ==========

// These old functions are no longer used but kept as no-ops
// so any lingering references don't throw errors.
function renderForm() {}
function updatePreview() {
    // No-op in phase redesign
}

// ========== NAVIGATION & CORE FUNCTIONS ==========

function previousCard() {
    if (currentIndex > 0) {
        currentIndex--;
        renderCurrentCard();
    }
}

function nextCard() {
    if (currentIndex < allCards.length - 1) {
        currentIndex++;
        renderCurrentCard();
    }
}

function toggleSettings() {
    var overlay = document.getElementById('settingsOverlay');
    var panel = document.getElementById('settingsPanel');
    overlay.classList.toggle('active');
    panel.classList.toggle('active');
}

function toggleFavorite() {
    var card = allCards[currentIndex];
    var cardId = getCardId(card, currentIndex);
    if (favorites.has(cardId)) {
        favorites.delete(cardId);
    } else {
        favorites.add(cardId);
    }
    saveFavorites();
    renderCurrentCard();
}

// Progress
function updateProgress() {
    var count = document.getElementById('progressCount');
    count.textContent = completed.size + '/' + allCards.length;
}

// Storage
function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        completed: Array.from(completed),
        currentIndex: currentIndex
    }));
}

function loadProgress() {
    try {
        var data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        completed = new Set(data.completed || []);
        currentIndex = data.currentIndex || 0;
    } catch (e) {
        console.error('Error loading progress:', e);
    }
}

function saveFavorites() {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
}

function loadFavorites() {
    try {
        var data = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
        favorites = new Set(data);
    } catch (e) {
        console.error('Error loading favorites:', e);
    }
}

// Utilities
function getCardId(card, index) {
    return currentStrategy + '_' + index + '_' + card.topic.substring(0, 20);
}

function shuffleArray(array) {
    return PracticeCommon.shuffleArray(array);
}

// ========== AUDIO DOWNLOAD & TELEGRAM ==========

function downloadAnswerRecording() {
    if (!answerRecordingBlob) {
        alert('No recording available');
        return;
    }
    var card = allCards[currentIndex];
    var safeTopic = card.topic.replace(/[^a-zA-Z0-9\s]/g, '')
        .trim().substring(0, 30).replace(/\s+/g, '_');
    var fileName = 'IELTS_Part2_' + safeTopic + '.webm';
    var a = document.createElement('a');
    a.href = URL.createObjectURL(answerRecordingBlob);
    a.download = fileName;
    a.click();
}

async function sendRecordingToTelegram() {
    if (!answerRecordingBlob) {
        alert('No recording available');
        return;
    }
    if (!telegramSender) {
        alert('Telegram not configured');
        return;
    }
    try {
        var card = allCards[currentIndex];
        var session = studentSession ? studentSession.getSession() : null;
        var studentName = session ? session.name : 'Unknown';
        var transcript = localStorage.getItem('m3_last_transcript_' + currentIndex) || '';
        var wordCount = transcript ? transcript.trim().split(/\s+/).length : 0;

        var scoreText = 'Not scored';
        if (transcript && window.calculateBandScores) {
            var scores = calculateBandScores(transcript);
            scoreText = scores.overall + ' (F:' + scores.fluency +
                ' V:' + scores.vocabulary + ' G:' + scores.grammar +
                ' P:' + scores.pronunciation + ')';
        }

        var caption = '<b>IELTS Part 2 Recording</b>\n\n' +
            '<b>Student:</b> ' + studentName + '\n' +
            '<b>Topic:</b> ' + card.topic + '\n' +
            '<b>Card #' + (currentIndex + 1) + ':</b> ' + card.category + '\n\n' +
            '<b>Transcription:</b>\n' +
            (transcript || 'No transcription available') + '\n\n' +
            '<b>Band Score:</b> ' + scoreText + '\n' +
            '<b>Words:</b> ' + wordCount;

        await telegramSender.sendAudio(
            answerRecordingBlob, caption,
            studentName + '_part2_' + (currentIndex + 1) + '.ogg'
        );
        alert('Sent to Telegram successfully!');
    } catch (error) {
        alert('Failed to send: ' + error.message);
    }
}

// ========== JUMP MODAL ==========

let currentJumpFilter = 'all';
let jumpSearchText = '';

function openJumpModal() {
    const overlay = document.getElementById('jumpModalOverlay');
    const modal = document.getElementById('jumpModal');

    overlay.classList.add('active');
    modal.classList.add('active');

    populateJumpList();

    setTimeout(() => {
        document.getElementById('searchInput').focus();
    }, 100);
}

function closeJumpModal() {
    const overlay = document.getElementById('jumpModalOverlay');
    const modal = document.getElementById('jumpModal');

    overlay.classList.remove('active');
    modal.classList.remove('active');

    document.getElementById('searchInput').value = '';
    document.getElementById('jumpNumber').value = '';
    jumpSearchText = '';
}

function setJumpFilter(filter) {
    currentJumpFilter = filter;

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    populateJumpList();
}

function populateJumpList() {
    const listContainer = document.getElementById('questionList');
    listContainer.innerHTML = '';

    if (!allCards || allCards.length === 0) return;

    allCards.forEach((card, index) => {
        const cardId = getCardId(card, index);
        const cardText = card.topic;

        if (currentJumpFilter === 'favorites' && !favorites.has(cardId)) return;
        if (currentJumpFilter === 'completed' && !completed.has(cardId)) return;

        if (jumpSearchText && !cardText.toLowerCase().includes(jumpSearchText.toLowerCase())) return;

        let statusIcon = '○';
        if (completed.has(cardId)) statusIcon = '✓';
        if (favorites.has(cardId)) statusIcon = '★';

        const item = document.createElement('div');
        item.className = 'question-item';
        if (index === currentIndex) item.classList.add('current');

        item.innerHTML = `
            <span class="question-status">${statusIcon}</span>
            <span class="question-num-badge">C${index + 1}</span>
            <span class="question-preview">${cardText}</span>
        `;

        item.onclick = () => jumpToCard(index);
        listContainer.appendChild(item);
    });

    const count = listContainer.children.length;
    if (count === 0) {
        listContainer.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">No topics found</p>';
    }
}

function jumpToCard(index) {
    if (index < 0 || index >= allCards.length) return;

    currentIndex = index;
    renderCurrentCard();
    closeJumpModal();
}

function jumpToNumber() {
    const input = document.getElementById('jumpNumber');
    const num = parseInt(input.value);

    if (isNaN(num) || num < 1 || num > allCards.length) {
        alert(`Please enter a number between 1 and ${allCards.length}`);
        return;
    }

    jumpToCard(num - 1);
}

// Setup search input
function setupJumpSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            jumpSearchText = e.target.value;
            populateJumpList();
        });
    }

    const jumpNumberInput = document.getElementById('jumpNumber');
    if (jumpNumberInput) {
        jumpNumberInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') jumpToNumber();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('jumpModal');
            if (modal.classList.contains('active')) {
                closeJumpModal();
            }
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupJumpSearch);
} else {
    setupJumpSearch();
}

// ========== PHASE 4: TRY AGAIN & ATTEMPT TRACKING ==========

/** Get attempt count for a card index */
function getAttemptCount(cardIndex) {
    return PracticeCommon.getAttemptCount('m3_attempts_', cardIndex);
}

/** Increment attempt counter for a card index */
function incrementAttempt(cardIndex) {
    return PracticeCommon.incrementAttempt('m3_attempts_', cardIndex);
}

/** Update the attempt badge display next to cue card header */
function updateAttemptBadge(cardIndex) {
    var count = getAttemptCount(cardIndex);
    var badge = document.getElementById('attemptBadge');
    if (!badge) return;
    if (count > 0) {
        badge.style.display = 'inline';
        badge.textContent = 'Attempt #' + (count + 1);
        badge.style.cssText = 'display:inline;font-size:0.75rem;background:#e0f2fe;color:#0369a1;padding:2px 8px;border-radius:10px;';
    } else {
        badge.style.display = 'none';
    }
}

// ========== AI IDEAS GENERATION ==========

/** Ask Gemini for speaking ideas for the current cue card */
async function getAIIdeas() {
    var hasGemini = window.ieltsCoachAI && window.ieltsCoachAI.hasApiKey();
    if (!hasGemini) {
        alert('Please set your Gemini API key in settings first.');
        return;
    }

    var card = allCards[currentIndex];
    var btn = document.getElementById('aiIdeasBtn');
    var panel = document.getElementById('aiIdeasPanel');
    var content = document.getElementById('aiIdeasContent');

    btn.classList.add('loading');
    btn.textContent = '💡 Generating ideas...';
    panel.style.display = 'block';
    content.innerHTML = '<div style="text-align:center;color:var(--color-text-muted);">AI is thinking...</div>';

    var prompt = 'You are an IELTS Speaking Part 2 coach. The student has this cue card:\n\n' +
        'Topic: ' + card.topic + '\n' +
        'They should say:\n' + card.prompts.map(function(p) { return '- ' + p; }).join('\n') + '\n\n' +
        'Give concise, practical speaking ideas in this format:\n' +
        '**Key Ideas** (3-4 bullet points of specific things to talk about)\n' +
        '**Useful Vocabulary** (5-6 advanced words/phrases relevant to this topic)\n' +
        '**Opening Sentence** (one strong opening line they can use)\n\n' +
        'Keep it brief — this is for a 1-minute prep. Use simple markdown.';

    try {
        var result = await window.ieltsCoachAI.callGemini(prompt, { temperature: 0.8, maxTokens: 512 });
        content.innerHTML = '<div class="gemini-feedback">' + markdownToHtml(result) + '</div>';
    } catch (err) {
        content.innerHTML = '<div style="color:var(--color-danger);">Failed to get AI ideas. ' + err.message + '</div>';
    }

    btn.classList.remove('loading');
    btn.textContent = '💡 Get AI Ideas';
}

/** Close the AI ideas panel */
function closeAIIdeas() {
    document.getElementById('aiIdeasPanel').style.display = 'none';
}

/** Convert basic markdown to HTML (reuse if exists, else simple fallback) */
function markdownToHtml(md) {
    if (window.markdownToHtml) return window.markdownToHtml(md);
    return md
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/^- (.+)$/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
        .replace(/\n/g, '<br>')
        // Track-changes tokens → <del>/<ins>
        .replace(/⟪del:([^⟫]+)⟫/g, '<del class="correction-del">$1</del>')
        .replace(/⟪ins:([^⟫]+)⟫/g, '<ins class="correction-ins">$1</ins>');
}

// ========== PHASE 5: BAND SCORING INTEGRATION ==========

/** Run band scoring on a transcript and display results */
function runBandScoring(transcript, cardIndex) {
    PracticeCommon.runBandScoring(transcript, cardIndex, {
        moduleId: 'module3',
        scoreDisplayEl: 'm3ScoreDisplay',
        attemptPrefix: 'm3_attempts_',
        transcriptPrefix: 'm3_last_transcript_',
        getQuestionId: function(idx) {
            return getCardId(allCards[idx], idx);
        },
        extraHTML: buildHistoryButton(),
        onAfterScore: function() { showScoreTrend('module3'); }
    });
}

/** Build History button HTML */
function buildHistoryButton() {
    return '<div style="margin-top:10px;text-align:center;">' +
        '<button onclick="showScoreHistoryModal()" style="padding:6px 16px;border:1px solid #007bff;background:#fff;color:#007bff;border-radius:4px;cursor:pointer;font-size:0.85em;">View Score History</button>' +
        '</div>';
}

/** Show score trend summary if data exists */
function showScoreTrend(moduleName) {
    if (!window.scoreHistory) return;

    const trend = window.scoreHistory.getProgressTrend(10);
    if (!trend) return;

    let trendDiv = document.getElementById('m3ScoreTrend');
    if (!trendDiv) {
        trendDiv = document.createElement('div');
        trendDiv.id = 'm3ScoreTrend';
        trendDiv.style.cssText = 'margin-top:8px;padding:8px 12px;background:#fff3cd;border-radius:6px;font-size:0.83em;';
        const container = document.getElementById('m3ScoreDisplay');
        if (container) container.appendChild(trendDiv);
    }

    const items = [];
    if (trend.vocab.delta !== 0) {
        items.push('Vocabulary: ' + trend.vocab.from + ' -> ' + trend.vocab.to);
    }
    if (trend.fluency.delta !== 0) {
        items.push('Fluency: ' + trend.fluency.from + ' -> ' + trend.fluency.to);
    }
    if (trend.grammar.delta !== 0) {
        items.push('Grammar: ' + trend.grammar.from + ' -> ' + trend.grammar.to);
    }

    if (items.length > 0) {
        trendDiv.innerHTML = '<strong>Recent trend (' + trend.entries + ' sessions):</strong><br>' + items.join(' | ');
        trendDiv.style.display = 'block';
    } else {
        trendDiv.style.display = 'none';
    }
}

/** Show a modal with full score history */
function showScoreHistoryModal() {
    if (!window.scoreHistory) return;

    const all = window.scoreHistory.getLatest(20);
    if (all.length === 0) {
        alert('No score history yet.');
        return;
    }

    // Create modal overlay
    let overlay = document.getElementById('scoreHistoryOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'scoreHistoryOverlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:999;display:flex;align-items:center;justify-content:center;';
        overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };
        document.body.appendChild(overlay);
    }

    let html = '<div style="background:#fff;border-radius:12px;max-width:500px;width:90%;max-height:80vh;overflow-y:auto;padding:20px;">';
    html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">';
    html += '<h3 style="margin:0;">Score History</h3>';
    html += '<button onclick="document.getElementById(\'scoreHistoryOverlay\').remove()" style="border:none;background:none;font-size:1.5em;cursor:pointer;">x</button>';
    html += '</div>';

    // Average scores
    const avg = window.scoreHistory.getAverageScores();
    if (avg) {
        html += '<div style="padding:10px;background:#e3f2fd;border-radius:6px;margin-bottom:12px;font-size:0.85em;">';
        html += '<strong>Average Scores (' + avg.count + ' sessions):</strong><br>';
        html += 'Overall: ' + avg.overall + ' | F: ' + avg.fluency + ' | V: ' + avg.vocab + ' | G: ' + avg.grammar + ' | P: ' + avg.pronunciation;
        html += '</div>';
    }

    // Recent entries
    all.reverse().forEach(entry => {
        const date = new Date(entry.date).toLocaleDateString();
        const s = entry.scores || {};
        html += '<div style="padding:8px;border-bottom:1px solid #eee;font-size:0.83em;">';
        html += '<div style="display:flex;justify-content:space-between;">';
        html += '<span>' + date + ' - ' + (entry.module || '') + '</span>';
        html += '<strong style="color:' + getScoreColor(s.overall || 0) + ';">' + (s.overall || '-') + '</strong>';
        html += '</div>';
        html += '<div style="color:#888;">F:' + (s.fluency || '-') + ' V:' + (s.vocab || '-') + ' G:' + (s.grammar || '-') + ' P:' + (s.pronunciation || '-') + ' | ' + (entry.wordCount || 0) + ' words</div>';
        html += '</div>';
    });

    html += '<div style="margin-top:12px;text-align:center;">';
    html += '<button onclick="if(confirm(\'Clear all history?\')) { window.scoreHistory.clear(); document.getElementById(\'scoreHistoryOverlay\').remove(); }" style="padding:6px 16px;border:1px solid #dc3545;background:#fff;color:#dc3545;border-radius:4px;cursor:pointer;font-size:0.83em;">Clear History</button>';
    html += '</div></div>';

    overlay.innerHTML = html;
}
