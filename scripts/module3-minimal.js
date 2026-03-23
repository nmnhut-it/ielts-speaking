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

// 50 Authentic IELTS Part 2 Cue Cards
const CUE_CARDS = [
    // Experience & Events (0-9)
    {
        topic: 'Describe a time when you helped someone',
        prompts: ['Who you helped', 'How you helped them', 'Why you helped them', 'And explain how you felt about it'],
        category: 'Experience', bestStrategy: 'star',
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
        sampleAnswer: {
            text: 'A change I\'d dearly love to see in my local area is the creation of a proper network of cycling lanes connecting the residential neighbourhoods to the city centre and major workplaces. The problem is that currently, cycling in my area is genuinely dangerous — there are virtually no dedicated bike lanes, so cyclists are forced to share narrow roads with heavy traffic, squeezing between parked cars and buses. I\'ve personally had several near-misses while cycling to work, and last year a young student was seriously injured at an intersection just two blocks from my apartment. The lack of safe infrastructure means that most people who might otherwise cycle are too afraid to do so, contributing to more cars on the road, worse air quality, and increased congestion — it\'s a vicious cycle, if you\'ll pardon the pun. The solution would involve the local council investing in a connected network of protected cycling lanes — not just painted lines on existing roads, but physically separated paths with barriers, clear signage, and priority at intersections. Cities like Amsterdam and Copenhagen have demonstrated that when you build proper cycling infrastructure, people use it in enormous numbers. The council could start with three or four key routes connecting the largest residential areas to the business district and university, then expand from there based on usage data. This could be funded through a combination of national transport grants and a modest congestion charge on cars entering the centre. The positive impact would be substantial and wide-ranging. Air pollution would decrease, traffic congestion would ease, public health would improve as more people exercise during their commute, and the city would become a more pleasant place to live. I\'ve seen the transformation in other cities and I firmly believe it\'s achievable here with the right political will and community support.',
            breakdown: {
                problem: 'Cycling in my area is genuinely dangerous — no dedicated lanes, cyclists share narrow roads with heavy traffic. A student was seriously injured nearby last year. Fear keeps potential cyclists in cars, worsening congestion and air quality in a vicious cycle.',
                solution: 'The council should invest in physically separated cycling lanes with barriers and priority at intersections, starting with key routes between residential areas, business district, and university. Funded through national transport grants and a modest congestion charge.',
                impact: 'Air pollution would decrease, congestion would ease, public health would improve through active commuting, and the city would become more pleasant. Amsterdam and Copenhagen have proven that proper infrastructure attracts massive cycling uptake.',
                learning: 'I\'ve seen transformations in other cities and firmly believe it\'s achievable here with political will and community support. Sometimes the most impactful changes require initial investment but deliver returns that far exceed the cost over time.'
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
    if (typeof botToken !== 'undefined' && typeof groupId !== 'undefined') {
        telegramSender = new TelegramSender(botToken, groupId);
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
    var modal = document.getElementById('identificationModal');
    var overlay = document.getElementById('identificationOverlay');
    if (modal) modal.classList.add('active');
    if (overlay) overlay.classList.add('active');
}

function hideIdentificationModal() {
    var modal = document.getElementById('identificationModal');
    var overlay = document.getElementById('identificationOverlay');
    if (modal) modal.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
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
    if (!telegramSender) return;
    try {
        var photoBlob = m3DataURLtoBlob(photoDataUrl);
        var caption = '<b>New Practice Session Started</b>\n\n' +
            '<b>Student:</b> ' + sName + '\n' +
            '<b>Module:</b> Module 3 - Part 2 Long Turn\n' +
            '<b>Time:</b> ' + new Date().toLocaleString();
        await telegramSender.sendPhoto(photoBlob, caption, sName + '_session.jpg');
    } catch (error) {
        console.error('Failed to send session start to Telegram:', error);
    }
}

async function sendApprovalRequest(sName, sessionId) {
    if (!telegramSender) return;
    var message = '<b>New Practice Session Request</b>\n\n' +
        '<b>Student:</b> ' + sName + '\n' +
        '<b>Module:</b> Module 3 - Part 2 Long Turn\n' +
        '<b>Time:</b> ' + new Date().toLocaleString() + '\n\n' +
        "Please approve or reject this student's practice session.";
    var keyboard = [[
        { text: 'Accept', callback_data: 'approve_' + sessionId },
        { text: 'Reject', callback_data: 'reject_' + sessionId }
    ]];
    var result = await telegramSender.sendMessageWithKeyboard(message, keyboard);
    studentSession.setTelegramMessageId(result.message_id);
}

function showApprovalWaiting() {
    var modalBody = document.querySelector('#identificationModal .modal-body');
    if (!modalBody) return;
    modalBody.innerHTML = '<div class="approval-waiting">' +
        '<div class="approval-spinner"></div>' +
        '<h3>Waiting for teacher approval</h3>' +
        '<p class="approval-dots">Please wait<span class="dots-anim">...</span></p>' +
        '<p class="approval-hint">Your teacher will review your session request.</p></div>';
}

function showApprovalRejected() {
    var modalBody = document.querySelector('#identificationModal .modal-body');
    if (!modalBody) return;
    modalBody.innerHTML = '<div class="approval-result">' +
        '<h3>Session Not Approved</h3>' +
        '<p>Your session was not approved. Please contact your teacher.</p>' +
        '<button class="btn-primary" onclick="retryIdentification()">Try Again</button></div>';
}

function showApprovalTimeout() {
    var modalBody = document.querySelector('#identificationModal .modal-body');
    if (!modalBody) return;
    modalBody.innerHTML = '<div class="approval-result">' +
        '<h3>Teacher Unavailable</h3>' +
        '<p>Please try again later.</p>' +
        '<button class="btn-primary" onclick="retryIdentification()">Try Again</button></div>';
}

function retryIdentification() {
    studentSession.clearSession();
    capturedPhotoData = null;
    location.reload();
}

async function startApprovalPolling(sessionId) {
    if (!telegramSender) {
        onApprovalComplete({ approved: true });
        return;
    }
    try {
        var result = await telegramSender.pollForApproval(sessionId);
        onApprovalComplete(result);
    } catch (error) {
        console.error('Approval polling error:', error);
        showApprovalTimeout();
    }
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
    var parts = dataURL.split(',');
    var mimeMatch = parts[0].match(/:(.*?);/);
    var mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
    var binary = atob(parts[1]);
    var array = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) {
        array[i] = binary.charCodeAt(i);
    }
    return new Blob([array], { type: mime });
}

// Load cue cards
function loadCards() {
    allCards = [...CUE_CARDS];

    if (currentMode === 'random') {
        allCards = shuffleArray([...allCards]);
    } else if (currentMode === 'favorites') {
        allCards = CUE_CARDS.filter((card, i) => favorites.has(getCardId(card, i)));
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
        if (e.key === 's') toggleSample();
        if (e.key === 'f') getAIFeedback();
        if (e.key === 'j') {
            const modal = document.getElementById('jumpModal');
            if (!modal.classList.contains('active')) openJumpModal();
        }
    });
}

// Render strategy info
function renderStrategyInfo() {
    const config = STRATEGY_CONFIG[currentStrategy];
    document.getElementById('strategyName').textContent = config.name;
    document.getElementById('strategyDesc').textContent = config.description;
}

// Render current cue card
function renderCurrentCard() {
    if (!allCards || allCards.length === 0) return;

    const card = allCards[currentIndex];

    // Update cue card display
    document.getElementById('cuecardNum').textContent = `Cue Card ${currentIndex + 1}`;
    document.getElementById('cuecardCategory').textContent = card.category;
    document.getElementById('cuecardTopic').textContent = card.topic;

    // Update prompts
    const promptsList = card.prompts.map(p => `<li>${p}</li>`).join('');
    document.getElementById('cuecardPrompts').innerHTML = `
        <p>You should say:</p>
        <ul>${promptsList}</ul>
    `;

    // Update favorite button
    const favBtn = document.getElementById('favBtn');
    const cardId = getCardId(card, currentIndex);
    favBtn.textContent = favorites.has(cardId) ? '★' : '☆';
    favBtn.classList.toggle('active', favorites.has(cardId));

    // Set suggested strategy if available
    if (card.bestStrategy && card.bestStrategy !== currentStrategy) {
        currentStrategy = card.bestStrategy;
        document.getElementById('strategySelect').value = currentStrategy;

        // Update connectors if expanded
        if (connectorExpanded) {
            updateConnectorDisplay();
        }
    }

    // Render form
    renderStrategyInfo();
    renderForm();

    // Reset timer
    resetTimer();

    // Clear notes
    document.getElementById('notesArea').value = '';

    // Handle sample answer
    if (card.sampleAnswer) {
        document.getElementById('sampleSection').style.display = 'block';
        renderSampleAnswer(card.sampleAnswer);
    } else {
        document.getElementById('sampleSection').style.display = 'none';
    }

    // Hide feedback
    document.getElementById('feedbackSection').style.display = 'none';

    // Reset recording state
    if (isAnswerRecording) stopAnswerRecording();
    answerRecordingBlob = null;
    document.getElementById('recordingResult').classList.add('hidden');
    document.getElementById('recordAnswerBtn').classList.remove('hidden');
    document.getElementById('stopRecordingBtn').classList.add('hidden');
    document.getElementById('recordingTimer').classList.add('hidden');

    // Reset scoring display
    const scoreDisplay = document.getElementById('m3ScoreDisplay');
    if (scoreDisplay) scoreDisplay.classList.add('hidden');

    // Show attempt badge
    updateAttemptBadge(currentIndex);

    // Reset sample expansion
    if (sampleExpanded) toggleSample();

    updateProgress();
}

// Render sample answer with breakdown
function renderSampleAnswer(sampleAnswer) {
    const config = STRATEGY_CONFIG[currentStrategy];

    // Set the sample text
    document.getElementById('sampleAnswer').textContent = sampleAnswer.text;

    // Render breakdown
    const breakdownDiv = document.getElementById('sampleBreakdown');
    breakdownDiv.innerHTML = '<strong>Strategy Breakdown:</strong><br><br>';

    // Get field labels from config
    config.fields.forEach(field => {
        const key = field.id;
        if (sampleAnswer.breakdown && sampleAnswer.breakdown[key]) {
            breakdownDiv.innerHTML += `<strong>${field.icon} ${field.label}:</strong><br>${sampleAnswer.breakdown[key]}<br><br>`;
        }
    });
}

// Render form fields
function renderForm() {
    const config = STRATEGY_CONFIG[currentStrategy];
    if (!config) return;

    const container = document.getElementById('formContainer');
    container.innerHTML = '';

    config.fields.forEach(field => {
        const fieldDiv = document.createElement('div');
        fieldDiv.className = 'form-field';

        const label = document.createElement('label');
        label.className = 'field-label';
        label.textContent = `${field.icon} ${field.label}`;
        label.htmlFor = `input-${field.id}`;

        const textarea = document.createElement('textarea');
        textarea.id = `input-${field.id}`;
        textarea.className = 'field-textarea';
        textarea.placeholder = field.placeholder;
        textarea.rows = 3;
        textarea.addEventListener('input', updatePreview);

        fieldDiv.appendChild(label);
        fieldDiv.appendChild(textarea);
        container.appendChild(fieldDiv);
    });

    updatePreview();
}

// Update live preview
function updatePreview() {
    const config = STRATEGY_CONFIG[currentStrategy];
    if (!config) return;

    const values = {};
    let filledCount = 0;

    config.fields.forEach(field => {
        const input = document.getElementById(`input-${field.id}`);
        if (input) {
            const value = input.value.trim();
            values[field.id] = value;
            if (value) filledCount++;
        }
    });

    const answer = generateAnswer(values, currentStrategy);
    const wordCount = answer ? answer.split(/\s+/).length : 0;
    const timeEstimate = Math.round(wordCount / WORDS_PER_SECOND);
    const minutes = Math.floor(timeEstimate / 60);
    const seconds = timeEstimate % 60;

    const previewBox = document.getElementById('previewBox');
    if (answer) {
        previewBox.textContent = answer;
        previewBox.style.fontStyle = 'normal';
    } else {
        previewBox.innerHTML = '<em>Start filling in the fields to see your answer...</em>';
    }

    document.getElementById('elementCount').textContent = `${filledCount}/${config.fields.length} elements`;
    document.getElementById('wordCount').textContent = `${wordCount} words`;
    document.getElementById('timeEstimate').textContent = `~${minutes}:${seconds.toString().padStart(2, '0')} speaking time`;

    // Highlight if time is too short or too long
    const timeEl = document.getElementById('timeEstimate');
    if (timeEstimate < 90) {
        timeEl.style.color = '#dc2626'; // Red if < 1:30
    } else if (timeEstimate >= 90 && timeEstimate <= 135) {
        timeEl.style.color = '#16a34a'; // Green if 1:30-2:15
    } else {
        timeEl.style.color = '#ea580c'; // Orange if > 2:15
    }
}

// Generate answer based on strategy
function generateAnswer(v, strategy) {
    const hasContent = Object.values(v).some(val => val);
    if (!hasContent) return '';

    switch (strategy) {
        case 'star':
            return generateSTAR(v);
        case 'ppf':
            return generatePPF(v);
        case '5wf':
            return generate5WF(v);
        case 'psi':
            return generatePSI(v);
        case 'ibc':
            return generateIBC(v);
        default:
            return Object.values(v).filter(val => val).join(' ');
    }
}

// Constants for STAR template variety
const STAR_INTROS = ["I'd like to talk about", "Let me tell you about", "I want to describe", "I remember"];
const STAR_TASK_CONNECTORS = ['At that time,', 'The challenge was that', 'The problem was', 'What I needed to do was'];
const STAR_ACTION_CONNECTORS = ['So, I decided to', 'What I did was', 'To solve this, I', 'My approach was to'];
const STAR_RESULT_CONNECTORS = ['In the end,', 'As a result,', 'Finally,', 'The outcome was that'];

function randomPick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateSTAR(v) {
    let answer = '';

    if (v.situation) {
        const intro = randomPick(STAR_INTROS);
        answer = `${intro} ${v.situation}. `;
    }

    if (v.task) {
        const connector = randomPick(STAR_TASK_CONNECTORS);
        answer += `${connector} ${v.task}. `;
    }

    if (v.action) {
        const connector = randomPick(STAR_ACTION_CONNECTORS);
        answer += `${connector} ${v.action}. `;
    }

    if (v.result) {
        const connector = randomPick(STAR_RESULT_CONNECTORS);
        answer += `${connector} ${v.result}.`;
    }

    return answer;
}

// Constants for PPF template variety
const PPF_PAST_CONNECTORS = ['In the past,', 'When I first started,', 'Initially,', 'Back then,'];
const PPF_PRESENT_CONNECTORS = ['These days,', 'Now,', 'Currently,', 'Nowadays,'];
const PPF_FUTURE_CONNECTORS = ['In the future,', 'Looking ahead,', 'My plan is to', 'I hope to'];

function generatePPF(v) {
    let answer = '';

    if (v.past) {
        const connector = randomPick(PPF_PAST_CONNECTORS);
        answer += `${connector} ${v.past}. `;
    }

    if (v.present) {
        const connector = randomPick(PPF_PRESENT_CONNECTORS);
        answer += `${connector} ${v.present}. `;
    }

    if (v.future) {
        const connector = randomPick(PPF_FUTURE_CONNECTORS);
        answer += `${connector} ${v.future}. `;
    }

    if (v.significance) {
        answer += `This is important to me because ${v.significance}.`;
    }

    return answer;
}

// Constants for 5WF template variety
const FWF_INTROS = ["I'd like to describe", "Let me talk about", "I want to tell you about", "The topic I'll discuss is"];
const FWF_WHERE_CONNECTORS = ['This happened', 'It took place', 'This was', 'I experienced this'];
const FWF_WHY_CONNECTORS = ['The reason was', 'What motivated me was', 'I did this because', 'My purpose was'];
const FWF_FEELING_CONNECTORS = ['This made me feel', 'I felt', 'The experience left me feeling', 'It made me'];

function generate5WF(v) {
    let answer = '';

    if (v.what_who) {
        const intro = randomPick(FWF_INTROS);
        answer += `${intro} ${v.what_who}. `;
    }

    if (v.where_when) {
        const connector = randomPick(FWF_WHERE_CONNECTORS);
        answer += `${connector} ${v.where_when}. `;
    }

    if (v.why) {
        const connector = randomPick(FWF_WHY_CONNECTORS);
        answer += `${connector} ${v.why}. `;
    }

    if (v.how_feelings) {
        const connector = randomPick(FWF_FEELING_CONNECTORS);
        answer += `${connector} ${v.how_feelings}.`;
    }

    return answer;
}

// Constants for PSI template variety
const PSI_PROBLEM_CONNECTORS = ['The challenge was', 'I faced a problem where', 'The issue I encountered was', 'What happened was'];
const PSI_SOLUTION_CONNECTORS = ['To solve this,', 'My solution was to', 'What I did was', 'I decided to'];
const PSI_IMPACT_CONNECTORS = ['As a result,', 'This led to', 'The impact was', 'Because of this,'];
const PSI_LEARNING_CONNECTORS = ['I learned that', 'This taught me', 'From this experience,', 'What I realized was'];

function generatePSI(v) {
    let answer = '';

    if (v.problem) {
        const connector = randomPick(PSI_PROBLEM_CONNECTORS);
        answer += `${connector} ${v.problem}. `;
    }

    if (v.solution) {
        const connector = randomPick(PSI_SOLUTION_CONNECTORS);
        answer += `${connector} ${v.solution}. `;
    }

    if (v.impact) {
        const connector = randomPick(PSI_IMPACT_CONNECTORS);
        answer += `${connector} ${v.impact}. `;
    }

    if (v.learning) {
        const connector = randomPick(PSI_LEARNING_CONNECTORS);
        answer += `${connector} ${v.learning}.`;
    }

    return answer;
}

// Constants for IBC template variety
const IBC_INTROS = ["I'd like to talk about", "Let me describe", "I want to discuss", "The topic is"];
const IBC_BODY1_CONNECTORS = ['First of all,', 'To begin with,', 'Firstly,', 'One important aspect is'];
const IBC_BODY2_CONNECTORS = ['Additionally,', 'Another point is', 'Furthermore,', 'Also,'];
const IBC_CONCLUSION_CONNECTORS = ['Overall,', 'In conclusion,', 'To sum up,', 'All in all,'];

function generateIBC(v) {
    let answer = '';

    if (v.intro) {
        const connector = randomPick(IBC_INTROS);
        answer += `${connector} ${v.intro}. `;
    }

    if (v.body1) {
        const connector = randomPick(IBC_BODY1_CONNECTORS);
        answer += `${connector} ${v.body1}. `;
    }

    if (v.body2) {
        const connector = randomPick(IBC_BODY2_CONNECTORS);
        answer += `${connector} ${v.body2}. `;
    }

    if (v.conclusion) {
        const connector = randomPick(IBC_CONCLUSION_CONNECTORS);
        answer += `${connector} ${v.conclusion}.`;
    }

    return answer;
}

// Timer functions
function startPreparation() {
    resetTimer();
    timerMode = 'prep';
    timerSeconds = 60;
    document.getElementById('timerLabel').textContent = 'Preparation Time';
    document.getElementById('startPrepBtn').classList.add('hidden');
    document.getElementById('resetTimerBtn').disabled = true;

    timerInterval = setInterval(() => {
        timerSeconds--;
        updateTimerDisplay();

        if (timerSeconds <= 0) {
            clearInterval(timerInterval);
            document.getElementById('startSpeakBtn').classList.remove('hidden');
            document.getElementById('resetTimerBtn').disabled = false;
            playBeep();
        }
    }, 1000);
}

function startSpeaking() {
    timerMode = 'speaking';
    timerSeconds = 120;
    document.getElementById('timerLabel').textContent = 'Speaking Time';
    document.getElementById('startSpeakBtn').classList.add('hidden');
    document.getElementById('resetTimerBtn').disabled = true;

    timerInterval = setInterval(() => {
        timerSeconds--;
        updateTimerDisplay();

        if (timerSeconds <= 0) {
            clearInterval(timerInterval);
            document.getElementById('resetTimerBtn').disabled = false;
            playBeep();
        }
    }, 1000);
}

function resetTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerMode = 'idle';
    timerSeconds = 60;
    document.getElementById('timerLabel').textContent = 'Preparation Time';
    document.getElementById('timerValue').textContent = '1:00';
    document.getElementById('startPrepBtn').classList.remove('hidden');
    document.getElementById('startSpeakBtn').classList.add('hidden');
    document.getElementById('resetTimerBtn').disabled = false;
}

function updateTimerDisplay() {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    document.getElementById('timerValue').textContent =
        `${minutes}:${seconds.toString().padStart(2, '0')}`;

    // Change color if time is running out
    const timerValue = document.getElementById('timerValue');
    if (timerSeconds <= 10 && timerSeconds > 0) {
        timerValue.style.color = '#dc2626';
    } else {
        timerValue.style.color = 'inherit';
    }
}

function playBeep() {
    // Simple beep using AudioContext
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

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

// Navigation
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

// Toggle functions
function toggleSettings() {
    const overlay = document.getElementById('settingsOverlay');
    const panel = document.getElementById('settingsPanel');
    overlay.classList.toggle('active');
    panel.classList.toggle('active');
}

function toggleFavorite() {
    const card = allCards[currentIndex];
    const cardId = getCardId(card, currentIndex);

    if (favorites.has(cardId)) {
        favorites.delete(cardId);
    } else {
        favorites.add(cardId);
    }

    saveFavorites();
    renderCurrentCard();
}

function toggleSample() {
    const content = document.getElementById('sampleContent');
    const icon = document.getElementById('sampleToggleIcon');

    sampleExpanded = !sampleExpanded;
    content.style.display = sampleExpanded ? 'block' : 'none';
    icon.textContent = sampleExpanded ? '▼' : '▶';
}

function toggleConnectors() {
    const content = document.getElementById('connectorContent');
    const btn = document.getElementById('connectorToggleBtn');

    connectorExpanded = !connectorExpanded;
    content.style.display = connectorExpanded ? 'block' : 'none';
    btn.textContent = connectorExpanded ? 'Hide' : 'Show';

    // Update connector content when opened
    if (connectorExpanded) {
        updateConnectorDisplay();
    }
}

function updateConnectorDisplay() {
    const connectorText = document.getElementById('connectorText');
    const connectors = CONNECTOR_EXAMPLES[currentStrategy] || CONNECTOR_EXAMPLES['star'];
    connectorText.innerHTML = connectors;
}

// AI Feedback
async function getAIFeedback() {
    const previewBox = document.getElementById('previewBox');
    const answer = previewBox.textContent;

    if (!answer || answer.length < 50 || answer === 'Start filling in the fields to see your answer...') {
        alert('Please fill in at least 2-3 fields before getting feedback');
        return;
    }

    // Use offline scoring - no API key needed

    const card = allCards[currentIndex];
    const strategy = STRATEGY_CONFIG[currentStrategy];

    const feedbackSection = document.getElementById('feedbackSection');
    const feedbackContent = document.getElementById('feedbackContent');

    feedbackSection.style.display = 'block';
    feedbackContent.textContent = 'Analyzing...';

    try {
        // Use offline heuristic feedback
        const words = answer.trim().split(/\s+/);
        const wordCount = words.length;
        const sentences = answer.split(/[.!?]+/).filter(s => s.trim());
        const estimatedSeconds = Math.round(wordCount / 2.5);
        const lines = [];
        lines.push('<strong>Self-Study Analysis</strong>');
        lines.push('Word count: ' + wordCount + ' (~' + estimatedSeconds + ' seconds of speaking)');
        if (estimatedSeconds < 90) {
            lines.push('Your answer may be too short for a 2-minute response. Try adding more details.');
        } else if (estimatedSeconds > 150) {
            lines.push('Good length! This would comfortably fill the 2-minute slot.');
        } else {
            lines.push('Reasonable length for Part 2.');
        }
        if (sentences.length >= 5) {
            lines.push('Good structure with ' + sentences.length + ' sentences.');
        }
        if (window.calculateBandScores) {
            const scores = calculateBandScores(answer);
            lines.push('Estimated band: ' + scores.overall);
        }
        feedbackContent.innerHTML = lines.join('<br>');

        const cardId = getCardId(card, currentIndex);
        completed.add(cardId);
        saveProgress();
    } catch (error) {
        feedbackContent.textContent = 'Error: ' + error.message;
    }
}

// Progress
function updateProgress() {
    const count = document.getElementById('progressCount');
    count.textContent = `${completed.size}/${allCards.length}`;
}

// Storage
function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        completed: Array.from(completed),
        currentIndex
    }));
}

function loadProgress() {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
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
        const data = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
        favorites = new Set(data);
    } catch (e) {
        console.error('Error loading favorites:', e);
    }
}

// Utilities
function getCardId(card, index) {
    return `${currentStrategy}_${index}_${card.topic.substring(0, 20)}`;
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// ========== AUDIO RECORDING FUNCTIONS ==========

async function startAnswerRecording() {
    try {
        answerRecorder = new AudioRecorder();
        await answerRecorder.initialize();
        answerRecorder.startRecording();
        isAnswerRecording = true;

        document.getElementById('recordAnswerBtn').classList.add('hidden');
        document.getElementById('stopRecordingBtn').classList.remove('hidden');
        document.getElementById('recordingTimer').classList.remove('hidden');
        document.getElementById('recordingResult').classList.add('hidden');
        document.getElementById('manualAnswerArea').classList.add('hidden');

        // Start live transcription
        const liveArea = document.getElementById('liveTranscriptArea');
        const liveText = document.getElementById('liveTranscriptText');
        liveText.textContent = '';

        try {
            liveArea.classList.remove('hidden');
            window.liveSTT = window.sttService.startLiveTranscription(
                (interim) => { liveText.textContent = interim; },
                (final) => { liveText.textContent = final; }
            );
        } catch (e) {
            console.warn('Live transcription not available:', e.message);
            liveArea.classList.add('hidden');
            window.liveSTT = null;
        }

        startAnswerRecordingTimer();
    } catch (error) {
        alert('Recording error: ' + error.message);
        cleanupAnswerRecording();
    }
}

async function stopAnswerRecording() {
    if (!answerRecorder) return;

    // Stop live transcription and get result
    let liveTranscript = '';
    if (window.liveSTT) {
        liveTranscript = window.liveSTT.stop();
        window.liveSTT = null;
    }
    document.getElementById('liveTranscriptArea').classList.add('hidden');

    const recording = await answerRecorder.stopRecording();
    stopAnswerRecordingTimer();
    isAnswerRecording = false;

    if (recording) {
        answerRecordingBlob = recording.blob;
        showRecordingResult(recording.blob);
    }

    answerRecorder.cleanup();
    answerRecorder = null;

    document.getElementById('recordAnswerBtn').classList.remove('hidden');
    document.getElementById('stopRecordingBtn').classList.add('hidden');
    document.getElementById('recordingTimer').classList.add('hidden');

    // If live transcription produced content, use it directly
    if (liveTranscript) {
        showLiveTranscriptResult(liveTranscript);
    }
}

function startAnswerRecordingTimer() {
    const elapsed = document.getElementById('recordingElapsed');
    let seconds = 0;
    elapsed.textContent = '0:00';

    answerRecordingTimer = setInterval(() => {
        seconds++;
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        elapsed.textContent = m + ':' + s.toString().padStart(2, '0');

        if (seconds >= MAX_RECORDING_SECONDS) {
            stopAnswerRecording();
        }
    }, 1000);
}

function stopAnswerRecordingTimer() {
    if (answerRecordingTimer) {
        clearInterval(answerRecordingTimer);
        answerRecordingTimer = null;
    }
}

function showRecordingResult(blob) {
    const resultDiv = document.getElementById('recordingResult');
    const audio = document.getElementById('recordingPlayback');

    audio.src = URL.createObjectURL(blob);
    resultDiv.classList.remove('hidden');

    // Hide comparison and transcription from previous
    document.getElementById('transcriptionArea').classList.add('hidden');
    document.getElementById('answerComparison').classList.add('hidden');

    // Show Try Again button
    showTryAgainButton();
}

function cleanupAnswerRecording() {
    if (answerRecorder) {
        answerRecorder.cleanup();
        answerRecorder = null;
    }
    isAnswerRecording = false;
    stopAnswerRecordingTimer();
}

function downloadAnswerRecording() {
    if (!answerRecordingBlob) {
        alert('No recording available');
        return;
    }
    const card = allCards[currentIndex];
    const safeTopic = card.topic.replace(/[^a-zA-Z0-9\s]/g, '')
        .trim().substring(0, 30).replace(/\s+/g, '_');
    const fileName = 'IELTS_Part2_' + safeTopic + '.webm';

    const a = document.createElement('a');
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
        const card = allCards[currentIndex];
        const session = studentSession ? studentSession.getSession() : null;
        const studentName = session ? session.name : 'Unknown';
        const caption = '<b>Module 3 Recording</b>\n' +
            '<b>Topic:</b> ' + card.topic + '\n' +
            '<b>Student:</b> ' + studentName;

        await telegramSender.sendAudio(
            answerRecordingBlob, caption,
            studentName + '_part2_' + (currentIndex + 1) + '.ogg'
        );
        alert('Sent to Telegram successfully!');
    } catch (error) {
        alert('Failed to send: ' + error.message);
    }
}

// Display live transcript result and auto-score
function showLiveTranscriptResult(transcript) {
    const area = document.getElementById('transcriptionArea');
    const textDiv = document.getElementById('transcriptionText');
    const wordcountDiv = document.getElementById('transcriptionWordcount');

    area.classList.remove('hidden');
    textDiv.textContent = transcript;
    const wordCount = transcript.split(/\s+/).filter(w => w).length;
    wordcountDiv.textContent = wordCount + ' words';

    const cardIdx = currentIndex;
    localStorage.setItem('m3_last_transcript_' + cardIdx, transcript);

    showAnswerComparison(transcript);
    runBandScoring(transcript, cardIdx);
}

// Fallback: show manual input area for typing answer
async function transcribeRecording() {
    if (!answerRecordingBlob) {
        alert('No recording available');
        return;
    }

    // Show manual textarea as fallback
    document.getElementById('manualAnswerArea').classList.remove('hidden');
}

// Submit manually typed answer
function submitManualAnswer() {
    const textarea = document.getElementById('manualAnswerInput');
    const transcript = (textarea.value || '').trim();
    if (!transcript) {
        alert('Please type your answer first.');
        return;
    }

    document.getElementById('manualAnswerArea').classList.add('hidden');
    showLiveTranscriptResult(transcript);
}

function showAnswerComparison(transcript) {
    const card = allCards[currentIndex];
    if (!card.sampleAnswer || !card.sampleAnswer.text) return;

    const compDiv = document.getElementById('answerComparison');
    const yoursText = document.getElementById('comparisonYours');
    const sampleText = document.getElementById('comparisonSample');
    const yoursWords = document.getElementById('comparisonYoursWords');
    const sampleWords = document.getElementById('comparisonSampleWords');

    const yourWC = transcript.split(/\s+/).filter(w => w).length;
    const sampleWC = card.sampleAnswer.text.split(/\s+/).filter(w => w).length;

    yoursText.textContent = transcript;
    sampleText.textContent = card.sampleAnswer.text;
    yoursWords.textContent = yourWC + ' words';
    sampleWords.textContent = sampleWC + ' words';

    compDiv.classList.remove('hidden');
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
    return parseInt(localStorage.getItem('m3_attempts_' + cardIndex) || '0', 10);
}

/** Increment attempt counter for a card index */
function incrementAttempt(cardIndex) {
    const count = getAttemptCount(cardIndex) + 1;
    localStorage.setItem('m3_attempts_' + cardIndex, String(count));
    return count;
}

/** Update the attempt badge display next to cue card header */
function updateAttemptBadge(cardIndex) {
    let badge = document.getElementById('m3AttemptBadge');
    if (!badge) {
        const header = document.getElementById('cuecardNum');
        if (!header) return;
        badge = document.createElement('span');
        badge.id = 'm3AttemptBadge';
        badge.style.cssText = 'margin-left:8px;font-size:0.75em;background:#6c757d;color:#fff;padding:2px 8px;border-radius:10px;vertical-align:middle;';
        header.parentNode.insertBefore(badge, header.nextSibling);
    }
    const count = getAttemptCount(cardIndex);
    if (count > 0) {
        badge.textContent = 'Attempt #' + count;
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
}

/** Show the "Try Again" button after recording/transcription */
function showTryAgainButton() {
    if (document.getElementById('m3TryAgainBtn')) return;

    const resultDiv = document.getElementById('recordingResult');
    if (!resultDiv) return;

    const btn = document.createElement('button');
    btn.id = 'm3TryAgainBtn';
    btn.textContent = 'Try Again';
    btn.className = 'btn-recording-action';
    btn.style.cssText = 'background:#28a745;color:#fff;font-weight:600;margin-top:8px;';
    btn.onclick = tryAgainM3;
    resultDiv.appendChild(btn);
}

/** Reset recording state for a new attempt, keep cue card visible */
function tryAgainM3() {
    const cardIdx = currentIndex;
    incrementAttempt(cardIdx);
    updateAttemptBadge(cardIdx);

    // Reset recording
    answerRecordingBlob = null;
    document.getElementById('recordingResult').classList.add('hidden');
    document.getElementById('recordAnswerBtn').classList.remove('hidden');
    document.getElementById('transcriptionArea').classList.add('hidden');
    document.getElementById('answerComparison').classList.add('hidden');

    // Hide scoring
    const scoreDisplay = document.getElementById('m3ScoreDisplay');
    if (scoreDisplay) scoreDisplay.classList.add('hidden');

    // Remove try again button
    const btn = document.getElementById('m3TryAgainBtn');
    if (btn) btn.remove();
}

// ========== PHASE 5: BAND SCORING INTEGRATION ==========

/** Run band scoring on a transcript and display results */
function runBandScoring(transcript, cardIndex) {
    if (!window.calculateBandScores) return;

    const scores = calculateBandScores(transcript);
    if (!scores || scores.overall === 0) return;

    // Check for previous scores for trend display
    let previousScores = null;
    if (window.scoreHistory) {
        const cardId = getCardId(allCards[cardIndex], cardIndex);
        const prev = window.scoreHistory.getPreviousScore('module3', cardId);
        if (prev && prev.scores) {
            previousScores = prev.scores;
        }
    }

    // Show improvement tip if 2+ attempts and previous transcript exists
    const attemptCount = getAttemptCount(cardIndex);
    let improvementHTML = '';
    if (attemptCount >= 2) {
        const prevTranscript = localStorage.getItem('m3_last_transcript_' + cardIndex);
        if (prevTranscript) {
            const prevWC = prevTranscript.split(/\s+/).filter(w => w).length;
            const currWC = transcript.split(/\s+/).filter(w => w).length;
            improvementHTML = '<div style="margin-top:8px;padding:8px;background:#e8f5e9;border-radius:6px;font-size:0.85em;">';
            improvementHTML += 'Word count: <strong>' + prevWC + '</strong> -> <strong>' + currWC + '</strong>';
            if (currWC > prevWC) {
                improvementHTML += ' <span style="color:#28a745;">(+' + (currWC - prevWC) + ')</span>';
            } else if (currWC < prevWC) {
                improvementHTML += ' <span style="color:#dc3545;">(' + (currWC - prevWC) + ')</span>';
            }
            improvementHTML += '</div>';
        }
    }

    // Render score display
    let container = document.getElementById('m3ScoreDisplay');
    if (!container) return;

    container.innerHTML = '<h4 style="margin:0 0 12px;font-size:1em;">IELTS Band Score Analysis</h4>' +
        renderScoreHTML(scores, previousScores) + improvementHTML +
        buildHistoryButton();
    container.classList.remove('hidden');

    // Save to score history
    if (window.scoreHistory) {
        const card = allCards[cardIndex];
        const cardId = getCardId(card, cardIndex);
        window.scoreHistory.addScore({
            date: new Date().toISOString(),
            module: 'module3',
            questionId: cardId,
            scores: {
                overall: scores.overall,
                fluency: scores.fluency,
                vocab: scores.vocabulary,
                grammar: scores.grammar,
                pronunciation: scores.pronunciation
            },
            wordCount: scores.wordCount,
            duration: null
        });
    }

    // Show trend if previous scores exist
    showScoreTrend('module3');
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
