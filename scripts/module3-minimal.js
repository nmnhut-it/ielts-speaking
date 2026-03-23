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
        category: 'Experience', bestStrategy: 'star'
    },
    {
        topic: 'Describe a positive change in your life',
        prompts: ['What the change was', 'When it happened', 'How it happened', 'And explain how you felt about this change'],
        category: 'Experience', bestStrategy: 'psi'
    },
    {
        topic: 'Describe an occasion when you received good news',
        prompts: ['What the news was', 'When you received it', 'Who gave you this news', 'And explain why this was good news for you'],
        category: 'Experience', bestStrategy: 'star'
    },
    {
        topic: 'Describe a difficult challenge you faced',
        prompts: ['What the challenge was', 'When and where it happened', 'How you dealt with it', 'And explain why it was difficult for you'],
        category: 'Experience', bestStrategy: 'psi'
    },
    {
        topic: 'Describe a time when you learned something new',
        prompts: ['What you learned', 'When and where you learned it', 'How you learned it', 'And explain how you felt about learning this'],
        category: 'Experience', bestStrategy: 'star'
    },
    {
        topic: 'Describe an achievement you are proud of',
        prompts: ['What you achieved', 'When you achieved it', 'What you did to achieve it', 'And explain why you are proud of it'],
        category: 'Experience', bestStrategy: 'star'
    },
    {
        topic: 'Describe a memorable journey you made',
        prompts: ['Where you went', 'When you went there', 'Who you went with', 'And explain why this journey was memorable'],
        category: 'Experience', bestStrategy: 'star'
    },
    {
        topic: 'Describe a time when you had to wait for something',
        prompts: ['What you were waiting for', 'How long you waited', 'What you did while waiting', 'And explain how you felt about waiting'],
        category: 'Experience', bestStrategy: 'star'
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
        category: 'People', bestStrategy: '5wf'
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
        category: 'People', bestStrategy: '5wf'
    },
    {
        topic: 'Describe a person who taught you something important',
        prompts: ['Who this person was', 'What they taught you', 'How they taught you', 'And explain why this was important to you'],
        category: 'People', bestStrategy: 'star'
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
        category: 'Places', bestStrategy: '5wf'
    },
    {
        topic: 'Describe your ideal home',
        prompts: ['What it would look like', 'Where it would be', 'Who would live there with you', 'And explain why this would be your ideal home'],
        category: 'Places', bestStrategy: '5wf'
    },
    {
        topic: 'Describe a place where you like to relax',
        prompts: ['Where this place is', 'How often you go there', 'What you do there', 'And explain why it helps you relax'],
        category: 'Places', bestStrategy: '5wf'
    },
    {
        topic: 'Describe a building you find interesting',
        prompts: ['Where it is', 'What it looks like', 'What it is used for', 'And explain why you find it interesting'],
        category: 'Places', bestStrategy: '5wf'
    },

    // Objects & Possessions (20-24)
    {
        topic: 'Describe something you own that is important to you',
        prompts: ['What it is', 'When you got it', 'How you use it', 'And explain why it is important to you'],
        category: 'Objects', bestStrategy: '5wf'
    },
    {
        topic: 'Describe a gift you gave to someone',
        prompts: ['What the gift was', 'Who you gave it to', 'Why you chose this gift', 'And explain how the person felt about it'],
        category: 'Objects', bestStrategy: 'star'
    },
    {
        topic: 'Describe a piece of technology you find useful',
        prompts: ['What it is', 'When you got it', 'How you use it', 'And explain why you find it useful'],
        category: 'Objects', bestStrategy: '5wf'
    },
    {
        topic: 'Describe a book that had an impact on you',
        prompts: ['What the book was about', 'When you read it', 'Why you read it', 'And explain what impact it had on you'],
        category: 'Objects', bestStrategy: 'star'
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
        category: 'Hobbies', bestStrategy: '5wf'
    },
    {
        topic: 'Describe a skill you would like to learn',
        prompts: ['What the skill is', 'Why you want to learn it', 'How you plan to learn it', 'And explain how this skill would help you'],
        category: 'Hobbies', bestStrategy: 'ppf'
    },
    {
        topic: 'Describe an outdoor activity you enjoy',
        prompts: ['What the activity is', 'Where you do it', 'Who you do it with', 'And explain why you enjoy it'],
        category: 'Hobbies', bestStrategy: '5wf'
    },
    {
        topic: 'Describe a creative activity you do',
        prompts: ['What the activity is', 'When you do it', 'How you learned to do it', 'And explain why you like doing it'],
        category: 'Hobbies', bestStrategy: 'ppf'
    },

    // Work & Education (30-34)
    {
        topic: 'Describe a subject you enjoyed studying',
        prompts: ['What the subject was', 'When you studied it', 'What you learned', 'And explain why you enjoyed it'],
        category: 'Education', bestStrategy: 'ppf'
    },
    {
        topic: 'Describe a course you would like to take',
        prompts: ['What course it is', 'Where you could take it', 'Why you are interested in it', 'And explain how it would benefit you'],
        category: 'Education', bestStrategy: 'ppf'
    },
    {
        topic: 'Describe a project you worked on',
        prompts: ['What the project was', 'When you did it', 'Who you worked with', 'And explain what you learned from it'],
        category: 'Work', bestStrategy: 'star'
    },
    {
        topic: 'Describe your dream job',
        prompts: ['What the job is', 'What you would do', 'What skills you would need', 'And explain why this would be your dream job'],
        category: 'Work', bestStrategy: '5wf'
    },
    {
        topic: 'Describe a lesson or class that was particularly interesting',
        prompts: ['What the lesson was about', 'When you attended it', 'What you did in the lesson', 'And explain why it was interesting'],
        category: 'Education', bestStrategy: 'star'
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
        category: 'Entertainment', bestStrategy: '5wf'
    },
    {
        topic: 'Describe a TV program you enjoy watching',
        prompts: ['What the program is', 'What it is about', 'How often you watch it', 'And explain why you enjoy it'],
        category: 'Entertainment', bestStrategy: '5wf'
    },
    {
        topic: 'Describe a website you use regularly',
        prompts: ['What website it is', 'How often you use it', 'What you use it for', 'And explain why you find it useful'],
        category: 'Technology', bestStrategy: '5wf'
    },
    {
        topic: 'Describe an advertisement that caught your attention',
        prompts: ['What the advertisement was for', 'Where you saw it', 'What it showed', 'And explain why it caught your attention'],
        category: 'Media', bestStrategy: 'star'
    },

    // Special Occasions & Festivals (40-44)
    {
        topic: 'Describe a festival or celebration in your country',
        prompts: ['What the festival is', 'When it takes place', 'What people do', 'And explain why it is important'],
        category: 'Festivals', bestStrategy: '5wf'
    },
    {
        topic: 'Describe a special meal you had',
        prompts: ['What you ate', 'Where you had this meal', 'Who you were with', 'And explain why it was special'],
        category: 'Food', bestStrategy: 'star'
    },
    {
        topic: 'Describe a party or celebration you attended',
        prompts: ['What the occasion was', 'Where it took place', 'Who was there', 'And explain why it was memorable'],
        category: 'Events', bestStrategy: 'star'
    },
    {
        topic: 'Describe a tradition in your family',
        prompts: ['What the tradition is', 'How long it has existed', 'How you celebrate it', 'And explain why it is important to your family'],
        category: 'Traditions', bestStrategy: 'ppf'
    },
    {
        topic: 'Describe a wedding you attended',
        prompts: ['Whose wedding it was', 'Where it took place', 'What happened', 'And explain how you felt about it'],
        category: 'Events', bestStrategy: 'star'
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
        category: 'Health', bestStrategy: 'ppf'
    },
    {
        topic: 'Describe a time when you helped the environment',
        prompts: ['What you did', 'When you did it', 'Why you did it', 'And explain how you felt about helping the environment'],
        category: 'Environment', bestStrategy: 'star'
    },
    {
        topic: 'Describe a change you would like to see in your local area',
        prompts: ['What the change would be', 'Why you want this change', 'How it could be achieved', 'And explain what benefits this change would bring'],
        category: 'Society', bestStrategy: 'psi'
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

// Storage keys
const STORAGE_KEY = 'module3_part2_progress';
const FAVORITES_KEY = 'module3_part2_favorites';

// Speaking speed (average: 150 words per minute = 2.5 words per second)
const WORDS_PER_SECOND = 2.5;

// Initialize
document.addEventListener('DOMContentLoaded', init);

function init() {
    loadProgress();
    loadFavorites();
    loadCards();
    setupEventListeners();
    renderCurrentCard();
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

    if (!window.ieltsCoachAI?.hasApiKey()) {
        const setup = confirm('You need a free Gemini API key to get AI feedback. Set it up now?');
        if (setup) window.location.href = 'ielts-speaking-lessons.html#api-key';
        return;
    }

    const card = allCards[currentIndex];
    const strategy = STRATEGY_CONFIG[currentStrategy];

    const feedbackSection = document.getElementById('feedbackSection');
    const feedbackContent = document.getElementById('feedbackContent');

    feedbackSection.style.display = 'block';
    feedbackContent.textContent = 'Getting AI feedback...';

    try {
        const prompt = `IELTS Speaking Part 2 Cue Card: "${card.topic}"\n\nStudent's 2-minute answer: "${answer}"\n\nStrategy used: ${strategy.name}\n\nProvide brief feedback on: 1) Structure and coherence, 2) Whether it would fill 2 minutes, 3) Vocabulary and fluency, 4) How well they addressed the prompts`;

        const feedback = await window.ieltsCoachAI.feedbackOnIdeas(card.topic, answer + '\n\n' + prompt);
        feedbackContent.innerHTML = feedback.replace(/\n/g, '<br>');

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
