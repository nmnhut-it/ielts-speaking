/**
 * Part 3 Discussion Practice - Card-based UI
 * 60 discussion questions across 5 categories with 3 answer strategies.
 * Renders one question at a time in a card with state transitions:
 *   ready -> recording -> scored
 */

// --- Constants ---

const WORDS_PER_SECOND = 2.5;
const TOTAL_QUESTIONS = 60;
const STORAGE_PREFIX_FAV = 'p3_fav_';
const STORAGE_PREFIX_ATTEMPTS = 'p3_attempts_';
const STORAGE_PREFIX_TRANSCRIPT = 'p3_transcript_';
const FOLLOW_UP_DELAY_MS = 2000;
const RECORDING_MAX_MS = 90000;

// Card states
const CARD_STATE_READY = 'ready';
const CARD_STATE_RECORDING = 'recording';
const CARD_STATE_SCORED = 'scored';

// --- Discussion Strategies ---

const PART3_STRATEGIES = {
    'direct-plus': {
        id: 'direct-plus',
        name: 'Direct Answer Plus',
        description: 'State opinion \u2192 Give reason \u2192 Provide example \u2192 Extend/qualify',
        fields: [
            { id: 'opinion', label: 'Your Opinion', icon: '\ud83d\udcac', placeholder: 'State your position clearly (e.g., "I believe that..." or "In my view...")' },
            { id: 'reason', label: 'Reason', icon: '\ud83d\udd0d', placeholder: 'Explain why you hold this view with a clear reason' },
            { id: 'example', label: 'Example', icon: '\ud83d\udccc', placeholder: 'Give a specific example to support your point' },
            { id: 'extension', label: 'Extension/Qualification', icon: '\u2795', placeholder: 'Add nuance, acknowledge exceptions, or extend the idea' }
        ]
    },
    'two-sides': {
        id: 'two-sides',
        name: 'Two Sides',
        description: 'Acknowledge both perspectives \u2192 State preference \u2192 Justify',
        fields: [
            { id: 'sideA', label: 'Side A (One perspective)', icon: '\u2696\ufe0f', placeholder: 'Present the first viewpoint (e.g., "On the one hand...")' },
            { id: 'sideB', label: 'Side B (Other perspective)', icon: '\ud83d\udd04', placeholder: 'Present the opposing viewpoint (e.g., "On the other hand...")' },
            { id: 'myView', label: 'Your View', icon: '\ud83c\udfaf', placeholder: 'State which side you lean toward and why' },
            { id: 'justification', label: 'Justification', icon: '\u2705', placeholder: 'Provide evidence or reasoning for your position' }
        ]
    },
    'past-present-future': {
        id: 'past-present-future',
        name: 'Past-Present-Future',
        description: 'Describe how things were \u2192 How they are now \u2192 How they might change',
        fields: [
            { id: 'past', label: 'In the Past', icon: '\u23ee\ufe0f', placeholder: 'Describe how things used to be (e.g., "In previous generations...")' },
            { id: 'present', label: 'Present Situation', icon: '\u25b6\ufe0f', placeholder: 'Describe the current state of affairs' },
            { id: 'future', label: 'Future Outlook', icon: '\u23ed\ufe0f', placeholder: 'Predict or speculate about future changes' },
            { id: 'significance', label: 'Significance', icon: '\ud83d\udca1', placeholder: 'Explain why this change matters or what it means' }
        ]
    }
};

const CONNECTOR_EXAMPLES = {
    'direct-plus': `<strong>Direct Answer Plus Connectors:</strong><br><br>
<strong>Opinion:</strong><br>
\u2022 I would argue that...<br>
\u2022 From my perspective,...<br>
\u2022 I firmly believe that...<br><br>
<strong>Reason:</strong><br>
\u2022 The main reason for this is...<br>
\u2022 This is primarily because...<br><br>
<strong>Example:</strong><br>
\u2022 For instance,...<br>
\u2022 A good example of this would be...<br><br>
<strong>Extension:</strong><br>
\u2022 Having said that,...<br>
\u2022 It's worth noting, however, that...`,

    'two-sides': `<strong>Two Sides Connectors:</strong><br><br>
<strong>Side A:</strong><br>
\u2022 On the one hand,...<br>
\u2022 Some people argue that...<br><br>
<strong>Side B:</strong><br>
\u2022 On the other hand,...<br>
\u2022 Conversely,...<br><br>
<strong>Your View:</strong><br>
\u2022 Personally, I tend to think...<br>
\u2022 On balance, I would say...<br><br>
<strong>Justification:</strong><br>
\u2022 This is because...<br>
\u2022 The evidence suggests...`,

    'past-present-future': `<strong>Past-Present-Future Connectors:</strong><br><br>
<strong>Past:</strong><br>
\u2022 In previous generations,...<br>
\u2022 Traditionally,...<br><br>
<strong>Present:</strong><br>
\u2022 Nowadays,...<br>
\u2022 In today's society,...<br><br>
<strong>Future:</strong><br>
\u2022 Looking ahead,...<br>
\u2022 In the years to come,...<br><br>
<strong>Significance:</strong><br>
\u2022 What this means is...<br>
\u2022 This matters because...`
};

// --- 40 Discussion Questions ---

const DISCUSSION_QUESTIONS = [
    // === Society & Culture (0-7) ===
    {
        topic: "Society & Culture",
        relatedPart2: "Describe a tradition in your culture",
        question: "Do you think traditional customs are still important in modern society?",
        category: "opinion",
        bestStrategy: "two-sides",
        followUp: "Can you give an example of a tradition that has evolved over time?",
        sampleAnswer: {
            text: "This is a thought-provoking question. On the one hand, traditional customs provide a sense of identity and belonging, connecting people to their heritage and giving communities a shared foundation. On the other hand, some traditions may seem outdated or even restrictive in a rapidly changing world. Personally, I would argue that traditions remain fundamentally important, but they need to evolve with the times. For example, many families in my country still celebrate traditional festivals, yet they adapt the way they celebrate, perhaps using video calls to include relatives who live abroad. Having said that, I think we should be willing to let go of customs that promote inequality or harm, while preserving those that strengthen social bonds and cultural identity.",
            breakdown: {
                sideA: "Traditional customs provide identity, belonging, and shared community foundation",
                sideB: "Some traditions may seem outdated or restrictive in a changing world",
                myView: "Traditions remain important but need to evolve with the times",
                justification: "Families adapt celebrations (e.g., video calls for distant relatives) while preserving social bonds; customs promoting harm should be released"
            }
        }
    },
    {
        topic: "Society & Culture",
        relatedPart2: "Describe a change in your local area",
        question: "How has the concept of community changed in recent years?",
        category: "cause-effect",
        bestStrategy: "past-present-future",
        followUp: "Do you think online communities can fully replace physical ones?",
        sampleAnswer: {
            text: "The concept of community has undergone a significant transformation over recent decades. In previous generations, community was largely defined by geography; people knew their neighbours, attended local events, and relied on each other for daily support. Nowadays, however, the rise of social media and remote working has created a shift toward online communities, where people connect based on shared interests rather than physical proximity. While this has broadened our social circles, it has arguably weakened the bonds of local neighbourhoods. Looking ahead, I anticipate a hybrid model emerging, where people maintain both digital and physical community ties. The significance of this shift is profound because it challenges us to actively invest in local relationships that once formed naturally.",
            breakdown: {
                past: "Community defined by geography; people knew neighbours, attended local events, relied on each other",
                present: "Social media and remote work created online communities based on shared interests, weakening local bonds",
                future: "A hybrid model will emerge combining digital and physical community ties",
                significance: "Challenges us to actively invest in local relationships that once formed naturally"
            }
        }
    },
    {
        topic: "Society & Culture",
        relatedPart2: "Describe a historical building you have visited",
        question: "Should governments do more to preserve cultural heritage?",
        category: "opinion",
        bestStrategy: "direct-plus",
        followUp: "Who should bear the cost of preserving cultural sites?",
        sampleAnswer: {
            text: "I would argue that governments absolutely should do more to preserve cultural heritage, though the approach needs to be carefully considered. The main reason is that cultural heritage sites, traditions, and artefacts represent irreplaceable links to our collective history, and once they are lost, they cannot be recovered. For instance, many ancient buildings across Asia are deteriorating because of insufficient funding for maintenance, and each year we lose architectural knowledge that spans centuries. Having said that, preservation efforts should not come at the expense of essential public services like healthcare and education. I believe the most effective approach is to combine government funding with private partnerships and tourism revenue, creating sustainable models that protect our heritage without overburdening public finances.",
            breakdown: {
                opinion: "Governments absolutely should do more to preserve cultural heritage",
                reason: "Cultural heritage represents irreplaceable links to collective history; once lost, cannot be recovered",
                example: "Ancient buildings across Asia deteriorating due to insufficient funding, losing centuries of architectural knowledge",
                extension: "Preservation should not come at expense of essential services; combine government funding with private partnerships and tourism revenue"
            }
        }
    },
    {
        topic: "Society & Culture",
        relatedPart2: "Describe someone in your family",
        question: "Why do you think some people prefer to live alone rather than with family?",
        category: "cause-effect",
        bestStrategy: "direct-plus",
        followUp: "Does living alone affect a person's mental health?",
        sampleAnswer: {
            text: "I believe there are several interconnected reasons why an increasing number of people choose to live independently. The primary factor, in my view, is the growing emphasis on personal autonomy and individual freedom in modern societies. People today value having their own space where they can make decisions without compromise or negotiation. For example, many young professionals in major cities choose studio apartments despite the higher cost per square metre, simply because they want the freedom to structure their daily routines as they wish. It is worth noting, however, that this trend does not necessarily indicate weakened family bonds. Many people who live alone maintain very close relationships with their families through regular visits and digital communication. The shift is more about redefining independence than rejecting family connections.",
            breakdown: {
                opinion: "Several interconnected reasons, primarily the growing emphasis on personal autonomy",
                reason: "People value having own space to make decisions without compromise",
                example: "Young professionals in cities choose studio apartments despite higher cost for freedom to structure routines",
                extension: "Does not indicate weakened family bonds; many maintain close relationships through visits and digital communication"
            }
        }
    },
    {
        topic: "Society & Culture",
        relatedPart2: "Describe a foreign country you would like to visit",
        question: "How important is it for children to learn about other cultures?",
        category: "opinion",
        bestStrategy: "direct-plus",
        followUp: "What is the best way for children to experience other cultures?",
        sampleAnswer: {
            text: "From my perspective, learning about other cultures is absolutely essential for children growing up in today's interconnected world. The fundamental reason is that cultural awareness fosters empathy, tolerance, and the ability to collaborate with people from diverse backgrounds, which are critical skills in a globalised economy. To illustrate, children who are exposed to different cultural perspectives through school exchange programmes or multicultural curricula tend to develop stronger critical thinking skills because they learn to question assumptions and consider multiple viewpoints. Having said that, I think this education should go beyond surface-level exposure to festivals and food. It needs to include genuine engagement with different value systems and worldviews, encouraging children to appreciate both the differences and the common humanity that connects all cultures.",
            breakdown: {
                opinion: "Learning about other cultures is absolutely essential for children in today's interconnected world",
                reason: "Cultural awareness fosters empathy, tolerance, and collaboration skills critical in a globalised economy",
                example: "Children in exchange programmes or multicultural curricula develop stronger critical thinking by questioning assumptions",
                extension: "Education should go beyond surface-level festivals and food to genuine engagement with different value systems"
            }
        }
    },
    {
        topic: "Society & Culture",
        relatedPart2: "Describe a person who influenced you",
        question: "Do you think social media has changed the way people form relationships?",
        category: "cause-effect",
        bestStrategy: "two-sides",
        followUp: "Are online friendships as meaningful as face-to-face ones?",
        sampleAnswer: {
            text: "There is no question that social media has fundamentally altered how relationships are formed and maintained. On the one hand, platforms like Instagram and Facebook have made it remarkably easy to connect with people who share similar interests, regardless of geographical boundaries. This has been particularly beneficial for individuals who might feel isolated in their local communities. On the other hand, there is growing evidence that social media relationships tend to be more superficial, lacking the depth that comes from face-to-face interaction and shared experiences. Personally, I believe social media is a powerful tool for initiating connections, but it cannot replace the richness of in-person relationships. The key is using these platforms as a supplement to, rather than a substitute for, genuine human interaction.",
            breakdown: {
                sideA: "Social media makes it easy to connect with people sharing interests regardless of geography; beneficial for isolated individuals",
                sideB: "Growing evidence that social media relationships tend to be more superficial, lacking depth of face-to-face interaction",
                myView: "Social media is powerful for initiating connections but cannot replace in-person relationships",
                justification: "These platforms should supplement rather than substitute genuine human interaction"
            }
        }
    },
    {
        topic: "Society & Culture",
        relatedPart2: "Describe an older person you admire",
        question: "What role do elderly people play in modern families?",
        category: "comparison",
        bestStrategy: "past-present-future",
        followUp: "Should governments do more to support elderly citizens?",
        sampleAnswer: {
            text: "The role of elderly family members has evolved considerably over time. Traditionally, grandparents held positions of authority within the family structure, serving as primary caregivers, storytellers, and keepers of cultural knowledge. Their wisdom was considered indispensable for guiding younger generations. In today's society, however, the situation has become more complex. While many grandparents remain actively involved, particularly in childcare, the rise of nuclear families and geographical mobility has reduced daily interaction between generations. Despite this, I believe elderly people still play a vital role as sources of emotional stability and lived experience. Looking to the future, I think we will see a renewed appreciation for intergenerational living, partly driven by rising housing costs and partly by a growing recognition that families function best when different generations support one another.",
            breakdown: {
                past: "Grandparents held positions of authority as caregivers, storytellers, and keepers of cultural knowledge",
                present: "Many grandparents remain involved in childcare, but nuclear families and mobility reduced daily intergenerational interaction",
                future: "Renewed appreciation for intergenerational living driven by housing costs and recognition that generations supporting each other works best",
                significance: "Elderly people remain vital sources of emotional stability and lived experience"
            }
        }
    },
    {
        topic: "Society & Culture",
        relatedPart2: "Describe a celebration you attended",
        question: "Is it better to follow traditions or create new ones?",
        category: "comparison",
        bestStrategy: "two-sides",
        followUp: "Can you think of a new tradition that has become popular recently?",
        sampleAnswer: {
            text: "This is a question that many families and communities grapple with. On the one hand, following established traditions provides continuity and a sense of shared identity. There is something deeply comforting about rituals that have been passed down through generations, as they connect us to our roots. On the other hand, creating new traditions allows communities to adapt to changing circumstances and include people from diverse backgrounds. For instance, many modern families blend customs from different cultures when they celebrate holidays, creating something entirely new yet meaningful. On balance, I would say the ideal approach is not an either-or choice but rather a thoughtful combination of both. We should honour the traditions that still resonate while being open to creating new ones that reflect our evolving values and increasingly multicultural societies.",
            breakdown: {
                sideA: "Following established traditions provides continuity, shared identity, and connection to roots",
                sideB: "Creating new traditions allows adaptation to changing circumstances and inclusion of diverse backgrounds",
                myView: "The ideal approach is a thoughtful combination of both, not an either-or choice",
                justification: "Modern families blend customs from different cultures during holidays; honour what resonates while reflecting evolving values"
            }
        }
    },

    // === Education (8-15) ===
    {
        topic: "Education",
        relatedPart2: "Describe a skill you learned at school",
        question: "Do you think the education system in your country prepares students well for the real world?",
        category: "opinion",
        bestStrategy: "two-sides",
        followUp: "What one change would most improve your country's education system?",
        sampleAnswer: {
            text: "This is a question I feel quite strongly about. On the one hand, the education system in my country does provide a solid academic foundation, particularly in subjects like mathematics and science, which are essential for many career paths. Students generally develop good analytical skills and a broad knowledge base. On the other hand, there are significant gaps when it comes to practical life skills such as financial literacy, emotional intelligence, and problem-solving in real-world contexts. Many graduates find themselves ill-prepared for tasks like managing budgets, navigating workplace dynamics, or even cooking a proper meal. Personally, I believe the system needs a significant overhaul to incorporate more experiential learning, internships, and life skills modules alongside traditional academics. The goal should be producing well-rounded individuals, not just high-scoring exam candidates.",
            breakdown: {
                sideA: "The system provides a solid academic foundation in maths and science; students develop analytical skills",
                sideB: "Significant gaps in practical life skills: financial literacy, emotional intelligence, real-world problem-solving",
                myView: "The system needs significant overhaul to incorporate experiential learning and life skills",
                justification: "Many graduates are ill-prepared for budgets, workplace dynamics; goal should be well-rounded individuals, not exam candidates"
            }
        }
    },
    {
        topic: "Education",
        relatedPart2: "Describe a technological device you use often",
        question: "How might artificial intelligence change the way we learn?",
        category: "prediction",
        bestStrategy: "past-present-future",
        followUp: "Do you think AI could ever fully replace human teachers?",
        sampleAnswer: {
            text: "Artificial intelligence is poised to revolutionise education in ways we are only beginning to understand. Historically, learning has been largely one-size-fits-all, with teachers delivering the same content to every student at the same pace. At present, we are already seeing AI-powered platforms that adapt to individual learning styles and speeds, providing personalised feedback that would be impossible for a single teacher managing thirty students. Looking ahead, I anticipate AI tutors that can identify knowledge gaps in real time, adjust difficulty levels dynamically, and even detect when a student is losing motivation. The significance of this transformation cannot be overstated, as it could potentially democratise quality education, making world-class tutoring accessible to students regardless of their socioeconomic background. However, the human element of teaching, the mentorship, inspiration, and emotional support, should never be fully replaced.",
            breakdown: {
                past: "Learning was one-size-fits-all, with teachers delivering same content to every student at same pace",
                present: "AI-powered platforms adapt to individual learning styles and speeds with personalised feedback",
                future: "AI tutors identifying knowledge gaps in real time, adjusting difficulty, detecting motivation loss",
                significance: "Could democratise quality education making world-class tutoring accessible regardless of socioeconomic background"
            }
        }
    },
    {
        topic: "Education",
        relatedPart2: "Describe a course you would like to take",
        question: "Should university education be free for everyone?",
        category: "opinion",
        bestStrategy: "two-sides",
        followUp: "How would free university education affect the quality of teaching?",
        sampleAnswer: {
            text: "This is one of the most debated topics in education policy. On the one hand, making university education free would remove financial barriers that prevent talented individuals from disadvantaged backgrounds from accessing higher education. Countries like Germany and Norway have demonstrated that free university education can work effectively and lead to a more equitable society. On the other hand, there are legitimate concerns about the financial sustainability of such a model, particularly in countries with large populations. Someone has to bear the cost, and this typically means higher taxes for everyone. Weighing both sides, I tend to think that a middle-ground approach works best, perhaps heavily subsidised tuition combined with income-based repayment schemes. This ensures accessibility while maintaining the quality of education and avoiding unsustainable fiscal burdens on governments.",
            breakdown: {
                sideA: "Free education removes financial barriers for disadvantaged students; Germany and Norway demonstrate it works",
                sideB: "Concerns about financial sustainability; higher taxes needed; someone must bear the cost",
                myView: "A middle-ground approach works best: heavily subsidised tuition with income-based repayment",
                justification: "Ensures accessibility while maintaining quality and avoiding unsustainable fiscal burdens"
            }
        }
    },
    {
        topic: "Education",
        relatedPart2: "Describe a job you would like to have",
        question: "Is practical experience more valuable than academic knowledge?",
        category: "comparison",
        bestStrategy: "two-sides",
        followUp: "In which careers is practical experience most important?",
        sampleAnswer: {
            text: "This is a question that depends heavily on context, but I will share my perspective. On the one hand, academic knowledge provides the theoretical framework that underpins professional expertise. A doctor, for instance, needs extensive theoretical knowledge before they can safely treat patients. On the other hand, practical experience develops skills that textbooks simply cannot teach, such as adaptability, interpersonal communication, and the ability to perform under pressure. In many industries, employers consistently report that they value hands-on experience more than academic credentials. On balance, I would argue that the two are complementary rather than competing. The most capable professionals I have encountered combine strong theoretical foundations with extensive practical application. The real problem arises when education systems lean too heavily toward one at the expense of the other.",
            breakdown: {
                sideA: "Academic knowledge provides theoretical framework; doctors need theory before treating patients",
                sideB: "Practical experience develops adaptability, communication, performance under pressure; employers often prefer experience",
                myView: "The two are complementary rather than competing",
                justification: "Most capable professionals combine strong theory with practical application; problems arise when systems lean too heavily one way"
            }
        }
    },
    {
        topic: "Education",
        relatedPart2: "Describe a teacher who influenced you",
        question: "How has the role of teachers changed with technology?",
        category: "cause-effect",
        bestStrategy: "past-present-future",
        followUp: "What qualities make a great teacher in the digital age?",
        sampleAnswer: {
            text: "The teaching profession has undergone a remarkable transformation alongside technological advances. In the past, teachers were primarily seen as knowledge dispensers, standing at the front of the classroom delivering lectures while students passively absorbed information. At present, technology has shifted this dynamic considerably. Teachers now act more as facilitators and guides, helping students navigate vast online resources and develop critical thinking skills rather than simply memorising facts. Interactive whiteboards, learning management systems, and educational apps have become standard tools. Looking to the future, I believe the role will continue to evolve toward mentorship and emotional support, areas where human teachers have an irreplaceable advantage over technology. The significance of this shift is that it elevates the profession, demanding higher-level skills like coaching, curriculum design, and digital literacy rather than mere content delivery.",
            breakdown: {
                past: "Teachers were knowledge dispensers; students passively absorbed lectures",
                present: "Teachers are facilitators guiding students through online resources; interactive tools are standard",
                future: "Role will evolve toward mentorship and emotional support where humans have irreplaceable advantage",
                significance: "Elevates the profession, demanding coaching, curriculum design, and digital literacy rather than content delivery"
            }
        }
    },
    {
        topic: "Education",
        relatedPart2: "Describe a subject you enjoyed at school",
        question: "Do you think children should specialize early or study broadly?",
        category: "comparison",
        bestStrategy: "two-sides",
        followUp: "At what age should students begin to specialise?",
        sampleAnswer: {
            text: "This is a debate that education systems worldwide continue to grapple with. On the one hand, early specialisation allows children to develop deep expertise in areas where they show natural talent, potentially giving them a competitive advantage later in life. Countries like South Korea have demonstrated that focused early training can produce exceptional athletes and musicians. On the other hand, a broad education exposes children to diverse disciplines, helping them discover hidden interests and develop transferable skills like creative thinking and adaptability. I would argue that broad education should be the priority during primary and lower secondary years, with gradual specialisation introduced as students mature and develop clearer interests. The reasoning is straightforward: children who specialise too early may miss opportunities to explore fields they might have excelled in, and they risk burnout from intense pressure during formative years.",
            breakdown: {
                sideA: "Early specialisation develops deep expertise and competitive advantage; South Korea demonstrates focused training success",
                sideB: "Broad education exposes children to diverse disciplines, helping discover interests and develop transferable skills",
                myView: "Broad education should be the priority during primary years with gradual specialisation as students mature",
                justification: "Children specialising too early miss opportunities and risk burnout from intense pressure during formative years"
            }
        }
    },
    {
        topic: "Education",
        relatedPart2: "Describe something you learned online",
        question: "What are the advantages and disadvantages of online learning?",
        category: "comparison",
        bestStrategy: "two-sides",
        followUp: "How can online learning be improved to reduce student isolation?",
        sampleAnswer: {
            text: "Online learning has become a defining feature of modern education, and it comes with both clear benefits and notable drawbacks. On the one hand, it offers unparalleled flexibility, allowing students to learn at their own pace from virtually anywhere in the world. This has been transformative for working professionals and people in remote areas who previously had limited access to quality education. On the other hand, online learning often lacks the social interaction and collaborative environment that traditional classrooms provide. Many students report feeling isolated and struggle with self-discipline without the structure of a physical classroom. Personally, I believe online learning works best as a complement to traditional education rather than a complete replacement. The ideal model, in my view, combines the flexibility and accessibility of digital platforms with regular face-to-face interactions that build community and accountability.",
            breakdown: {
                sideA: "Unparalleled flexibility; learn at own pace from anywhere; transformative for working professionals and remote areas",
                sideB: "Lacks social interaction and collaboration; students feel isolated and struggle with self-discipline",
                myView: "Online learning works best as a complement to traditional education, not a replacement",
                justification: "Ideal model combines digital flexibility and accessibility with face-to-face interactions for community and accountability"
            }
        }
    },
    {
        topic: "Education",
        relatedPart2: "Describe a creative activity you enjoy",
        question: "How important is creativity in education?",
        category: "opinion",
        bestStrategy: "direct-plus",
        followUp: "How can schools encourage more creative thinking?",
        sampleAnswer: {
            text: "I would argue that creativity is not just important in education but absolutely fundamental, and yet it remains one of the most neglected aspects of most school curricula. The primary reason is that creativity drives innovation, problem-solving, and adaptability, which are precisely the skills that employers and society increasingly demand in a world where routine tasks are being automated. For instance, companies like Google and Apple actively seek employees who can think outside the box, and research consistently shows that creative thinking can be cultivated through education if given proper attention. Having said that, fostering creativity requires a significant shift in how we assess students. As long as education systems remain fixated on standardised testing and rote memorisation, creative development will inevitably take a back seat. We need assessment methods that reward original thinking rather than penalising unconventional approaches.",
            breakdown: {
                opinion: "Creativity is absolutely fundamental in education yet remains one of the most neglected aspects",
                reason: "Creativity drives innovation, problem-solving, and adaptability needed in a world where routine tasks are automated",
                example: "Companies like Google and Apple seek creative thinkers; research shows creativity can be cultivated through education",
                extension: "Fostering creativity requires shifting assessment away from standardised testing; need methods that reward original thinking"
            }
        }
    },

    // === Technology (16-23) ===
    {
        topic: "Technology",
        relatedPart2: "Describe how technology has changed communication",
        question: "Do you think technology has made people more isolated or more connected?",
        category: "opinion",
        bestStrategy: "two-sides",
        followUp: "What could people do to use technology more mindfully?",
        sampleAnswer: {
            text: "This is perhaps one of the defining questions of our era. On the one hand, technology has connected us in ways that previous generations could never have imagined. We can video-call relatives across the globe, collaborate with colleagues in different time zones, and build meaningful communities around shared interests online. On the other hand, there is compelling evidence that excessive technology use, particularly social media, is associated with increased loneliness, anxiety, and a decline in deep, meaningful relationships. People may have thousands of online connections yet feel profoundly isolated. On balance, I believe technology itself is neutral; it is how we use it that determines the outcome. Those who use technology intentionally to strengthen existing relationships tend to benefit, while those who substitute screen time for genuine human connection often suffer. The challenge lies in finding the right balance.",
            breakdown: {
                sideA: "Technology connects us in unprecedented ways: video calls, global collaboration, online communities",
                sideB: "Compelling evidence that excessive use increases loneliness and anxiety; thousands of connections yet profound isolation",
                myView: "Technology is neutral; how we use it determines the outcome",
                justification: "Intentional use to strengthen relationships benefits; substituting screens for genuine connection causes suffering; balance is key"
            }
        }
    },
    {
        topic: "Technology",
        relatedPart2: "Describe a website you use regularly",
        question: "Should there be stricter regulations on social media companies?",
        category: "opinion",
        bestStrategy: "direct-plus",
        followUp: "How should social media platforms handle misinformation?",
        sampleAnswer: {
            text: "I firmly believe that stricter regulations on social media companies are not only justified but urgently needed. The main reason is that these platforms have grown to wield enormous influence over public discourse, mental health, and even democratic processes, yet they currently operate with remarkably little oversight compared to other industries of similar scale. For instance, numerous investigations have revealed that major platforms knowingly amplified harmful content because it drove engagement and profits, even when their own research showed negative effects on teenage mental health. Having said that, regulation needs to be carefully designed to avoid stifling innovation or infringing on free speech. I think the most effective approach would involve transparency requirements around algorithms, stronger data protection measures, and mandatory independent audits rather than heavy-handed censorship. The goal should be accountability, not control.",
            breakdown: {
                opinion: "Stricter regulations on social media companies are urgently needed",
                reason: "Platforms wield enormous influence over public discourse and mental health with remarkably little oversight",
                example: "Investigations revealed platforms knowingly amplified harmful content for engagement despite knowing effects on teenage mental health",
                extension: "Regulation must avoid stifling innovation; focus on transparency, data protection, and independent audits rather than censorship"
            }
        }
    },
    {
        topic: "Technology",
        relatedPart2: "Describe a journey you took by car",
        question: "How might autonomous vehicles change city life?",
        category: "prediction",
        bestStrategy: "past-present-future",
        followUp: "Would you feel safe riding in a self-driving car?",
        sampleAnswer: {
            text: "Autonomous vehicles represent one of the most transformative technologies on the horizon for urban living. Historically, cities have been designed around human-driven cars, leading to sprawling parking lots, wide roads, and suburban commuter culture that has shaped everything from housing prices to air quality. At present, we are in the early stages of this transition, with companies testing self-driving taxis in select cities and semi-autonomous features becoming standard in new vehicles. Looking ahead, fully autonomous vehicles could dramatically reshape urban landscapes. Parking structures could be converted into green spaces or housing, traffic congestion could be reduced through coordinated vehicle movement, and road accidents, the vast majority of which are caused by human error, could decrease substantially. The significance extends beyond convenience; it could fundamentally alter how we design cities, making them more liveable, sustainable, and accessible for people who currently cannot drive.",
            breakdown: {
                past: "Cities designed around human-driven cars: sprawling parking, wide roads, suburban commuter culture affecting housing and air quality",
                present: "Early transition stage with companies testing self-driving taxis; semi-autonomous features becoming standard",
                future: "Parking converted to green space, traffic reduced through coordinated movement, road accidents decreased substantially",
                significance: "Could fundamentally alter city design, making cities more liveable, sustainable, and accessible"
            }
        }
    },
    {
        topic: "Technology",
        relatedPart2: "Describe something you cannot live without",
        question: "Do you think people rely too much on technology nowadays?",
        category: "opinion",
        bestStrategy: "direct-plus",
        followUp: "What would happen if the internet went down for a week?",
        sampleAnswer: {
            text: "I would argue that while technology dependence is growing, the real issue is not the reliance itself but the uncritical way many people engage with it. The primary concern, in my view, is that excessive reliance on technology is eroding certain fundamental human capabilities such as memory, navigation skills, and sustained attention. For example, research has shown that people increasingly struggle to remember phone numbers or navigate without GPS, and the average attention span has decreased significantly in the smartphone era. Having said that, I think it would be naively romantic to suggest we should use less technology. Instead, we need to develop what I would call technological literacy, understanding when to use technology as a tool and when to rely on our own capabilities. The solution is not rejection but rather a more mindful and intentional relationship with the devices we use.",
            breakdown: {
                opinion: "The real issue is not reliance itself but the uncritical way people engage with technology",
                reason: "Excessive reliance erodes fundamental human capabilities: memory, navigation, sustained attention",
                example: "People struggle to remember phone numbers or navigate without GPS; average attention span has decreased in smartphone era",
                extension: "Solution is not rejection but technological literacy: knowing when to use technology and when to rely on own capabilities"
            }
        }
    },
    {
        topic: "Technology",
        relatedPart2: "Describe a job you think will be important in the future",
        question: "What are the implications of artificial intelligence for employment?",
        category: "cause-effect",
        bestStrategy: "two-sides",
        followUp: "Which jobs do you think are most at risk from automation?",
        sampleAnswer: {
            text: "The implications of AI for the job market are both exciting and concerning. On the one hand, AI is creating entirely new categories of employment that did not exist a decade ago, such as prompt engineers, AI ethics consultants, and machine learning specialists. It is also enhancing productivity in existing roles, allowing workers to focus on creative and strategic tasks rather than repetitive ones. On the other hand, there is legitimate anxiety about widespread job displacement, particularly in sectors like manufacturing, transportation, and data entry, where AI can perform tasks more efficiently than humans. Personally, I believe the net effect will be positive in the long run, but only if governments and educational institutions act proactively to retrain workers and create robust social safety nets. History shows that major technological shifts always create more jobs than they destroy, but the transition period can be devastating without proper support.",
            breakdown: {
                sideA: "AI creates new job categories and enhances productivity, allowing focus on creative and strategic work",
                sideB: "Legitimate anxiety about displacement in manufacturing, transportation, and data entry where AI is more efficient",
                myView: "Net effect will be positive long-term, but requires proactive government and educational action",
                justification: "History shows technological shifts create more jobs than destroyed, but transition period needs retraining and social safety nets"
            }
        }
    },
    {
        topic: "Technology",
        relatedPart2: "Describe a child you know",
        question: "Should children be limited in their use of technology?",
        category: "opinion",
        bestStrategy: "direct-plus",
        followUp: "At what age should children get their first smartphone?",
        sampleAnswer: {
            text: "In my view, setting reasonable limits on children's technology use is not only advisable but essential for healthy development. The fundamental reason is that children's brains are still developing, and excessive screen time has been linked to issues with attention span, sleep quality, social skill development, and physical health. For instance, the World Health Organisation recommends that children under five should have no more than one hour of screen time daily, yet many children significantly exceed this, often spending three to four hours or more on devices. It is worth noting, however, that not all screen time is equal. Educational apps, creative tools, and video calls with family members are fundamentally different from mindless scrolling or addictive game mechanics. I think the key is for parents to guide their children's technology use actively, focusing on quality over quantity and modelling healthy digital habits themselves.",
            breakdown: {
                opinion: "Setting reasonable limits on children's technology use is essential for healthy development",
                reason: "Developing brains are affected by excessive screen time: attention, sleep, social skills, physical health",
                example: "WHO recommends under one hour for under-fives, yet many children spend three to four hours on devices",
                extension: "Not all screen time is equal; parents should guide quality over quantity and model healthy digital habits"
            }
        }
    },
    {
        topic: "Technology",
        relatedPart2: "Describe your workplace",
        question: "How has technology changed the way people work?",
        category: "cause-effect",
        bestStrategy: "past-present-future",
        followUp: "Do you think the traditional office will disappear?",
        sampleAnswer: {
            text: "Technology has fundamentally transformed the nature of work across virtually every industry. In the past, work was overwhelmingly location-dependent; employees commuted to offices, factories, or shops, and collaboration required physical presence. Communication relied on phone calls, faxes, and face-to-face meetings. Nowadays, cloud computing, video conferencing, and project management tools have made remote work not only possible but often preferable. The pandemic accelerated this shift dramatically, proving that many roles could be performed effectively from anywhere. Looking ahead, I expect the workplace to become increasingly flexible, with hybrid models becoming the standard rather than the exception. The significance of this transformation extends beyond convenience; it is reshaping urban planning, housing markets, and even family dynamics as people gain more control over where and how they work. The challenge will be ensuring that this flexibility does not blur the boundaries between work and personal life.",
            breakdown: {
                past: "Work was location-dependent; collaboration required physical presence; communication via phone, fax, face-to-face",
                present: "Cloud computing and video conferencing enable remote work; pandemic proved many roles work from anywhere",
                future: "Hybrid models becoming standard rather than exception; increasingly flexible workplace",
                significance: "Reshaping urban planning, housing, and family dynamics; challenge is maintaining boundaries between work and personal life"
            }
        }
    },
    {
        topic: "Technology",
        relatedPart2: "Describe something personal you keep online",
        question: "Do you think privacy is possible in the digital age?",
        category: "opinion",
        bestStrategy: "direct-plus",
        followUp: "Would you trade some privacy for more convenience?",
        sampleAnswer: {
            text: "I would argue that complete privacy in the digital age is becoming increasingly difficult, though not entirely impossible, with deliberate effort. The main reason for this erosion of privacy is that our daily activities generate vast amounts of data, from our online searches and purchases to our physical movements tracked by smartphones. For instance, a recent study found that the average person's digital footprint allows companies to predict their behaviour, preferences, and even political views with remarkable accuracy, often without explicit consent. Having said that, I believe individuals still have some agency in protecting their privacy through measures like encryption, VPNs, and careful management of social media settings. The more pressing question, in my view, is whether governments will step up to enforce meaningful data protection laws that shift the balance of power from corporations back to individuals. Privacy should be treated as a fundamental right, not a luxury.",
            breakdown: {
                opinion: "Complete privacy is increasingly difficult though not impossible with deliberate effort",
                reason: "Daily activities generate vast data from searches, purchases, and smartphone-tracked movements",
                example: "Studies show digital footprints predict behaviour, preferences, and political views with remarkable accuracy without consent",
                extension: "Individuals have some agency through encryption and VPNs; governments must enforce meaningful data protection; privacy is a fundamental right"
            }
        }
    },

    // === Environment (24-31) ===
    {
        topic: "Environment",
        relatedPart2: "Describe an environmental problem in your area",
        question: "Whose responsibility is it to protect the environment \u2014 individuals or governments?",
        category: "opinion",
        bestStrategy: "two-sides",
        followUp: "What is one thing every individual can do to help the environment?",
        sampleAnswer: {
            text: "This is a question where I think the answer is quite clearly that both share the responsibility, though in different ways. On the one hand, individuals have a moral obligation to reduce their personal environmental impact through choices like reducing waste, conserving energy, and making sustainable purchasing decisions. These small actions, when multiplied across millions of people, can make a meaningful difference. On the other hand, governments have the power and responsibility to implement systemic changes that individuals simply cannot achieve alone, such as regulating industrial emissions, investing in renewable energy infrastructure, and creating economic incentives for sustainable practices. Personally, I believe governments bear the greater responsibility because individual action, however commendable, cannot compensate for systemic failures. However, the most effective environmental protection occurs when government policy and individual behaviour reinforce each other, creating a culture of sustainability from both the top down and the bottom up.",
            breakdown: {
                sideA: "Individuals have moral obligation: reduce waste, conserve energy, sustainable purchasing; small actions multiplied make a difference",
                sideB: "Governments can implement systemic changes individuals cannot: regulate emissions, invest in renewables, create incentives",
                myView: "Governments bear greater responsibility because individual action cannot compensate for systemic failures",
                justification: "Most effective protection occurs when policy and individual behaviour reinforce each other, top-down and bottom-up"
            }
        }
    },
    {
        topic: "Environment",
        relatedPart2: "Describe a habit you would like to change",
        question: "Do you think people will change their habits to fight climate change?",
        category: "prediction",
        bestStrategy: "direct-plus",
        followUp: "What motivates people more: financial incentives or moral responsibility?",
        sampleAnswer: {
            text: "I believe that people will eventually change their habits, but I am somewhat sceptical about whether this will happen quickly enough to make a significant difference. The primary reason for my cautious optimism is that we are already seeing a shift in consumer behaviour, particularly among younger generations who are more environmentally conscious. For example, there has been a notable increase in demand for plant-based foods, electric vehicles, and sustainable fashion, driven largely by growing awareness of climate issues. Having said that, the pace of change remains frustratingly slow because many sustainable choices are still more expensive or less convenient than their unsustainable alternatives. I think meaningful behavioural change will only happen at scale when governments and businesses make sustainable options the default rather than the premium choice. People are generally willing to make better choices when those choices are easy and affordable.",
            breakdown: {
                opinion: "People will eventually change habits but possibly not quickly enough to make significant difference",
                reason: "Already seeing shifts: younger generations more environmentally conscious; consumer behaviour changing",
                example: "Notable increase in demand for plant-based foods, electric vehicles, and sustainable fashion",
                extension: "Change is slow because sustainable choices are more expensive; meaningful change requires making sustainable options the default"
            }
        }
    },
    {
        topic: "Environment",
        relatedPart2: "Describe a city you have visited",
        question: "How can cities become more environmentally friendly?",
        category: "problem-solution",
        bestStrategy: "direct-plus",
        followUp: "Should private cars be banned from city centres?",
        sampleAnswer: {
            text: "I would argue that cities can become significantly more environmentally friendly through a combination of infrastructure investment, policy changes, and community engagement. The most impactful step, in my view, is investing heavily in public transportation and cycling infrastructure to reduce dependence on private cars, which are among the largest sources of urban emissions. For instance, cities like Copenhagen and Amsterdam have demonstrated that when you build extensive cycling networks and efficient public transit, car usage drops dramatically and air quality improves significantly. It is worth noting, however, that infrastructure alone is not sufficient. Cities also need to implement green building standards, expand urban green spaces, and encourage local food production through community gardens and rooftop farms. The key insight is that environmentally friendly cities are also more liveable cities, with cleaner air, less noise, and stronger community connections, which makes the investment worthwhile on multiple levels.",
            breakdown: {
                opinion: "Cities can become more environmentally friendly through infrastructure, policy, and community engagement",
                reason: "Investing in public transport and cycling reduces dependence on private cars, among largest urban emission sources",
                example: "Copenhagen and Amsterdam show extensive cycling networks and transit reduce car usage and improve air quality dramatically",
                extension: "Also need green building standards, urban green spaces, and local food production; green cities are also more liveable"
            }
        }
    },
    {
        topic: "Environment",
        relatedPart2: "Describe a developing country you know about",
        question: "Should developing countries prioritize economic growth or environmental protection?",
        category: "comparison",
        bestStrategy: "two-sides",
        followUp: "Should wealthy nations compensate developing countries for going green?",
        sampleAnswer: {
            text: "This is one of the most challenging dilemmas in global development, and I think oversimplifying it does a disservice to the complexity involved. On the one hand, developing countries have a legitimate right to economic growth that can lift millions out of poverty, improve healthcare, and provide educational opportunities. It seems unfair for wealthy nations, which industrialised without environmental constraints, to now demand that poorer countries sacrifice growth for environmental goals. On the other hand, the consequences of unchecked environmental degradation, such as flooding, drought, and air pollution, disproportionately affect developing nations themselves. Personally, I believe this should not be framed as an either-or choice. With access to modern clean technologies and international financial support, developing countries can pursue green growth pathways that achieve economic development without repeating the environmental mistakes of industrialised nations. The international community has a responsibility to make this possible through technology transfer and climate finance.",
            breakdown: {
                sideA: "Developing countries have legitimate right to growth; unfair for wealthy nations to demand sacrifice after industrialising without constraints",
                sideB: "Unchecked environmental degradation disproportionately affects developing nations through flooding, drought, pollution",
                myView: "Should not be either-or; developing countries can pursue green growth with modern clean technologies",
                justification: "International community must enable this through technology transfer and climate finance"
            }
        }
    },
    {
        topic: "Environment",
        relatedPart2: "Describe a scientific advancement you find interesting",
        question: "What role can technology play in solving environmental problems?",
        category: "opinion",
        bestStrategy: "direct-plus",
        followUp: "Is there a risk that we rely too much on technology to solve environmental issues?",
        sampleAnswer: {
            text: "I believe technology will play an absolutely critical role in addressing environmental challenges, though it should not be seen as a silver bullet. The fundamental reason is that many environmental problems exist at a scale and complexity that human effort alone cannot address without technological assistance. For instance, advances in solar panel efficiency have already made renewable energy cheaper than fossil fuels in many regions, and innovations like carbon capture technology could potentially remove existing greenhouse gases from the atmosphere. Having said that, technology also carries environmental risks if not deployed responsibly. The production of lithium batteries for electric vehicles, for example, creates its own environmental concerns related to mining and disposal. I think the most productive approach is to invest heavily in green technology while simultaneously addressing the environmental footprint of technology production itself, ensuring that our solutions do not inadvertently create new problems.",
            breakdown: {
                opinion: "Technology will play a critical role but should not be seen as a silver bullet",
                reason: "Environmental problems exist at scale and complexity that human effort alone cannot address",
                example: "Solar panels have made renewables cheaper than fossil fuels; carbon capture could remove existing greenhouse gases",
                extension: "Technology carries risks (lithium battery mining); must address environmental footprint of technology production itself"
            }
        }
    },
    {
        topic: "Environment",
        relatedPart2: "Describe something you hope to do in the future",
        question: "Do you think future generations will judge us on our environmental record?",
        category: "prediction",
        bestStrategy: "direct-plus",
        followUp: "What would you want future generations to know about our efforts?",
        sampleAnswer: {
            text: "I have little doubt that future generations will judge us quite harshly on our environmental record, and I think this judgement will be largely justified. The primary reason is that unlike previous generations, we have had access to overwhelming scientific evidence about climate change and environmental degradation for decades, yet our collective response has been woefully inadequate. For instance, despite the Paris Agreement and numerous climate summits, global carbon emissions have continued to rise, and biodiversity loss has accelerated rather than slowed. Having said that, I think future generations will also recognise that our era was a turning point where significant shifts began to take shape. The growth of renewable energy, the emergence of youth climate movements, and increasing corporate accountability are all positive developments. The ultimate judgement will likely depend on whether the actions we begin now prove sufficient to prevent the worst consequences, which remains very much an open question.",
            breakdown: {
                opinion: "Future generations will judge us quite harshly, and this judgement will be largely justified",
                reason: "We have had overwhelming scientific evidence for decades yet collective response has been woefully inadequate",
                example: "Despite Paris Agreement and climate summits, emissions continue rising and biodiversity loss has accelerated",
                extension: "Future generations will also recognise positive shifts: renewable energy growth, youth movements, corporate accountability"
            }
        }
    },
    {
        topic: "Environment",
        relatedPart2: "Describe a subject you studied at school",
        question: "How important is it to teach environmental awareness in schools?",
        category: "opinion",
        bestStrategy: "direct-plus",
        followUp: "Should environmental education be mandatory in all schools?",
        sampleAnswer: {
            text: "I would argue that environmental education should be a cornerstone of every school curriculum, not merely an elective or afterthought. The primary reason is that today's students will inherit the environmental challenges we are creating, and they need both the knowledge and the motivation to address them effectively. For instance, research from Scandinavian countries, where environmental education is deeply embedded in the curriculum, shows that students who receive comprehensive environmental education are significantly more likely to adopt sustainable behaviours as adults and to support environmental policies. Having said that, environmental education needs to go beyond simply teaching facts about climate change. It should include practical skills like growing food, reducing waste, and understanding energy systems. Most importantly, it should empower students to feel that they can make a difference rather than leaving them feeling hopeless about the state of the planet.",
            breakdown: {
                opinion: "Environmental education should be a cornerstone of every curriculum, not an elective",
                reason: "Today's students will inherit environmental challenges and need knowledge and motivation to address them",
                example: "Scandinavian countries show students with environmental education adopt sustainable behaviours and support green policies as adults",
                extension: "Must go beyond facts to include practical skills; should empower students rather than leaving them hopeless"
            }
        }
    },
    {
        topic: "Environment",
        relatedPart2: "Describe a law in your country",
        question: "Should there be international laws to protect the environment?",
        category: "opinion",
        bestStrategy: "two-sides",
        followUp: "How should countries that break environmental agreements be punished?",
        sampleAnswer: {
            text: "The need for international environmental laws is something I feel strongly about. On the one hand, environmental problems like climate change, ocean pollution, and biodiversity loss are inherently global issues that do not respect national borders. A country's emissions affect the entire planet, and overfishing in one region depletes stocks that other nations depend upon. This makes a compelling case for binding international legislation. On the other hand, enforcing international laws is extraordinarily challenging, as we have seen with existing agreements where nations routinely fail to meet their commitments without meaningful consequences. Sovereignty concerns also make many nations reluctant to submit to external authority. On balance, I believe international environmental laws are necessary, but they must be accompanied by robust enforcement mechanisms and equitable burden-sharing. Without accountability, even the most well-intentioned agreements become little more than aspirational documents.",
            breakdown: {
                sideA: "Environmental problems are global and cross borders; emissions and overfishing affect everyone; compelling case for binding legislation",
                sideB: "Enforcement is extraordinarily challenging; nations fail commitments without consequences; sovereignty concerns create reluctance",
                myView: "International environmental laws are necessary",
                justification: "Must be accompanied by robust enforcement mechanisms and equitable burden-sharing; without accountability, agreements are merely aspirational"
            }
        }
    },

    // === Work & Economy (32-39) ===
    {
        topic: "Work & Economy",
        relatedPart2: "Describe a job you would enjoy",
        question: "Do you think job satisfaction is more important than salary?",
        category: "comparison",
        bestStrategy: "two-sides",
        followUp: "Would you take a pay cut for a job you truly loved?",
        sampleAnswer: {
            text: "This is a question that I think most people will answer differently depending on their stage of life and financial circumstances. On the one hand, job satisfaction contributes enormously to overall wellbeing. People who enjoy their work tend to be more productive, healthier, and happier in their personal lives. Research consistently shows that beyond a certain income threshold, additional salary contributes very little to happiness. On the other hand, financial security is a fundamental need, and it is somewhat privileged to suggest that passion should always trump pay when many people work primarily to support their families. Weighing both perspectives, I believe the ideal is to find work that provides both reasonable compensation and genuine fulfilment. However, if forced to choose, I would argue that satisfaction edges out salary in the long term because spending forty hours a week doing something you dislike takes a tremendous toll on mental health regardless of how well you are paid.",
            breakdown: {
                sideA: "Job satisfaction contributes to wellbeing, productivity, and health; beyond a threshold, more salary adds little happiness",
                sideB: "Financial security is fundamental; suggesting passion over pay is privileged when many work to support families",
                myView: "Ideal is both reasonable compensation and fulfilment; if forced to choose, satisfaction edges out salary long-term",
                justification: "Spending forty hours weekly doing something you dislike takes tremendous toll on mental health regardless of pay"
            }
        }
    },
    {
        topic: "Work & Economy",
        relatedPart2: "Describe a local shop you like",
        question: "How has globalization affected local businesses?",
        category: "cause-effect",
        bestStrategy: "two-sides",
        followUp: "What can local businesses do to compete with global chains?",
        sampleAnswer: {
            text: "Globalisation has had a profoundly mixed impact on local businesses. On the one hand, it has opened up enormous opportunities for small businesses to reach international markets through e-commerce platforms. A craftsperson in rural Vietnam, for example, can now sell handmade products to customers in Europe through platforms like Etsy. On the other hand, globalisation has also brought intense competition from multinational corporations and cheap imports that many local businesses simply cannot match on price. Traditional neighbourhood shops, in particular, have struggled to compete with the convenience and pricing of global retail chains. Personally, I believe the net effect depends largely on how well local businesses adapt and differentiate themselves. Those that emphasise unique products, personal service, and community connection often thrive despite global competition, while those competing solely on price tend to struggle. Governments also have a role to play in creating fair conditions that prevent monopolistic practices.",
            breakdown: {
                sideA: "Opened opportunities: small businesses reach international markets through e-commerce; craftspeople sell globally",
                sideB: "Intense competition from multinationals and cheap imports; neighbourhood shops struggle with pricing and convenience of chains",
                myView: "Net effect depends on how well local businesses adapt and differentiate",
                justification: "Businesses emphasising unique products and community connection thrive; governments must prevent monopolistic practices"
            }
        }
    },
    {
        topic: "Work & Economy",
        relatedPart2: "Describe a time you worked from home",
        question: "Should people be encouraged to work from home permanently?",
        category: "opinion",
        bestStrategy: "two-sides",
        followUp: "How does remote work affect team collaboration?",
        sampleAnswer: {
            text: "The question of permanent remote work is one that has generated intense debate since the pandemic. On the one hand, working from home eliminates commuting time, reduces carbon emissions, and often improves work-life balance. Many studies have shown that remote workers report higher job satisfaction and equivalent or even improved productivity. On the other hand, permanent home working can lead to social isolation, blurred boundaries between work and personal life, and reduced opportunities for spontaneous collaboration and mentorship that happen naturally in office environments. It can also exacerbate inequalities, as not everyone has a suitable home workspace. On balance, I would advocate for encouraging flexible arrangements rather than permanent remote work. Giving employees the choice to work from home several days a week while maintaining regular in-person interaction seems to offer the best of both worlds, though the specifics should vary by industry and individual circumstances.",
            breakdown: {
                sideA: "Eliminates commuting, reduces emissions, improves work-life balance; studies show higher satisfaction and productivity",
                sideB: "Social isolation, blurred boundaries, reduced collaboration and mentorship; exacerbates inequalities in home workspace",
                myView: "Advocate for flexible arrangements rather than permanent remote work",
                justification: "Choice to work from home several days while maintaining in-person interaction offers best of both worlds"
            }
        }
    },
    {
        topic: "Work & Economy",
        relatedPart2: "Describe a skill you want to learn",
        question: "What skills will be most important in the future job market?",
        category: "prediction",
        bestStrategy: "direct-plus",
        followUp: "How should people prepare for jobs that do not yet exist?",
        sampleAnswer: {
            text: "I would argue that the skills most valued in the future job market will be those that artificial intelligence cannot easily replicate. The fundamental reason is that as automation takes over routine cognitive and physical tasks, the distinctly human abilities become more valuable by contrast. For instance, critical thinking, emotional intelligence, creativity, and complex problem-solving are already among the most sought-after skills according to World Economic Forum reports, and this trend will only intensify. A data analyst who can also communicate findings compellingly and collaborate effectively across departments will always be more valuable than one who can only crunch numbers. Having said that, I think digital literacy and adaptability will be equally crucial. The pace of technological change means that specific technical skills may become obsolete within years, so the ability to learn continuously and adapt to new tools and paradigms will distinguish successful professionals from those who fall behind.",
            breakdown: {
                opinion: "Most valued skills will be those AI cannot easily replicate",
                reason: "As automation handles routine tasks, distinctly human abilities become more valuable",
                example: "Critical thinking, emotional intelligence, creativity top WEF reports; analysts who communicate and collaborate outperform pure technical workers",
                extension: "Digital literacy and adaptability equally crucial; specific skills become obsolete fast, so continuous learning is essential"
            }
        }
    },
    {
        topic: "Work & Economy",
        relatedPart2: "Describe a problem in your community",
        question: "Do you think the gap between rich and poor is growing?",
        category: "opinion",
        bestStrategy: "direct-plus",
        followUp: "What policies could help reduce wealth inequality?",
        sampleAnswer: {
            text: "Unfortunately, I believe the evidence overwhelmingly suggests that the wealth gap is indeed widening in most countries, and this trend is deeply concerning. The primary driver, in my view, is that returns on capital investments consistently outpace wage growth, meaning those who already possess wealth accumulate more at a faster rate than those relying on employment income. For instance, during the recent pandemic, billionaire wealth increased dramatically while millions of ordinary workers lost their jobs or saw their incomes stagnate. Having said that, the picture is not uniformly bleak. Some countries, particularly in Scandinavia, have managed to maintain relatively low inequality through progressive taxation, strong social safety nets, and investment in public services. This demonstrates that growing inequality is not an inevitable consequence of economic progress but rather a policy choice. The question is whether societies have the political will to implement the redistributive measures needed to reverse this trend.",
            breakdown: {
                opinion: "Evidence overwhelmingly suggests the wealth gap is widening and this is deeply concerning",
                reason: "Returns on capital outpace wage growth; those with wealth accumulate faster than those relying on employment",
                example: "During the pandemic, billionaire wealth increased dramatically while millions of workers lost jobs or saw income stagnate",
                extension: "Scandinavian countries maintain low inequality through progressive taxation and social safety nets; growing inequality is a policy choice"
            }
        }
    },
    {
        topic: "Work & Economy",
        relatedPart2: "Describe what you imagine about the future",
        question: "How might the concept of 'work' change in the next 50 years?",
        category: "prediction",
        bestStrategy: "past-present-future",
        followUp: "Will people still need to work in the future?",
        sampleAnswer: {
            text: "The concept of work has already changed dramatically and will continue to evolve in ways that might be difficult to imagine from our current perspective. In the past, work was predominantly physical and tied to specific locations; the industrial model of fixed hours in factories and offices dominated for over a century. At present, we are witnessing a transition toward knowledge work, gig economy platforms, and portfolio careers where individuals juggle multiple income streams rather than holding a single job for life. Looking fifty years ahead, I anticipate that automation will have eliminated many jobs we consider essential today, leading to shorter working weeks and potentially new models of economic participation such as universal basic income. The significance of this transformation is that it will force us to redefine our relationship with work. If machines handle most productive tasks, humans will need to find purpose and identity through creativity, community engagement, and personal development rather than traditional employment.",
            breakdown: {
                past: "Work was predominantly physical, location-tied; industrial model of fixed hours in factories and offices dominated for a century",
                present: "Transition to knowledge work, gig economy, portfolio careers with multiple income streams instead of single lifelong job",
                future: "Automation will eliminate many current jobs; shorter working weeks and new models like universal basic income",
                significance: "Forces redefinition of our relationship with work; purpose through creativity and community rather than traditional employment"
            }
        }
    },
    {
        topic: "Work & Economy",
        relatedPart2: "Describe a government policy you know about",
        question: "Should governments provide a universal basic income?",
        category: "opinion",
        bestStrategy: "two-sides",
        followUp: "How would universal basic income change people's motivation to work?",
        sampleAnswer: {
            text: "Universal basic income is arguably one of the most radical and divisive policy proposals of our time. On the one hand, providing every citizen with a guaranteed minimum income could eliminate poverty, reduce bureaucratic complexity in welfare systems, and give people the freedom to pursue education, creative projects, or care work that benefits society but is currently unpaid. Pilot programmes in Finland and Canada have shown promising results in reducing stress and improving wellbeing. On the other hand, critics raise valid concerns about the enormous fiscal cost, potential inflationary effects, and the risk that it could reduce the incentive to work. There are also practical questions about how to fund such a programme sustainably. Personally, I think some form of basic income will become necessary as automation displaces more jobs, but it needs to be designed carefully, perhaps starting as a partial supplement rather than a full replacement for earned income, and funded through progressive taxation on wealth and corporate profits.",
            breakdown: {
                sideA: "Could eliminate poverty, simplify welfare, enable education and care work; Finland and Canada pilots show reduced stress",
                sideB: "Concerns about fiscal cost, inflation, reduced work incentive, and sustainable funding",
                myView: "Some form will become necessary as automation displaces jobs",
                justification: "Should start as partial supplement, not full replacement; funded through progressive taxation on wealth and corporate profits"
            }
        }
    },
    {
        topic: "Work & Economy",
        relatedPart2: "Describe a competitive experience you had",
        question: "Is competition in the workplace healthy or harmful?",
        category: "comparison",
        bestStrategy: "two-sides",
        followUp: "How can managers create healthy competition among employees?",
        sampleAnswer: {
            text: "Workplace competition is a double-edged sword that can produce either excellent or destructive outcomes depending on how it is managed. On the one hand, healthy competition can drive innovation, motivate employees to perform at their best, and lead to better outcomes for organisations and their customers. When people are challenged by their peers, they often push beyond their comfort zones and achieve things they might not have attempted otherwise. On the other hand, excessive or poorly managed competition can create toxic work environments characterised by sabotage, stress, and a reluctance to collaborate or share knowledge. It can also lead to unethical behaviour when employees feel pressured to win at any cost. On balance, I believe competition is healthy when it is accompanied by a collaborative culture and fair rules. The most successful organisations I have observed encourage healthy rivalry while ensuring that individual competition never undermines teamwork or the overall mission of the company.",
            breakdown: {
                sideA: "Healthy competition drives innovation, motivates peak performance, pushes people beyond comfort zones",
                sideB: "Excessive competition creates toxic environments: sabotage, stress, reluctance to collaborate, unethical behaviour",
                myView: "Competition is healthy when accompanied by collaborative culture and fair rules",
                justification: "Successful organisations encourage rivalry while ensuring individual competition never undermines teamwork or company mission"
            }
        }
    },

    // === Society & Culture (40-43) ===
    {
        topic: "Society & Culture",
        relatedPart2: "Describe a tradition in your country that you enjoy",
        question: "Do you think globalisation is causing cultures to become too similar?",
        category: "cause-effect",
        bestStrategy: "two-sides",
        followUp: "Can you think of a tradition that has been strengthened by globalisation rather than weakened?",
        sampleAnswer: {
            text: "This is a nuanced question that deserves careful consideration. On the one hand, there is compelling evidence that globalisation is homogenising cultures to a concerning degree. The same fast-food chains, clothing brands, and streaming platforms dominate high streets and screens from Tokyo to Toronto, and younger generations worldwide increasingly consume the same media, listen to the same music, and adopt similar lifestyles. This cultural convergence can erode local traditions, languages, and artistic expressions that have developed over centuries. On the other hand, globalisation has also created opportunities for cultural exchange and revitalisation that were previously impossible. Social media platforms allow indigenous communities to share their traditions with global audiences, generating both awareness and economic support. For example, traditional Vietnamese ao dai fashion has gained international recognition partly through global platforms, leading to renewed domestic pride and investment in the craft. Personally, I believe globalisation is a double-edged sword, and the outcome depends largely on how communities respond. Those that actively preserve and promote their unique cultural identity while engaging with the wider world tend to thrive, while those that passively absorb dominant cultures risk losing what makes them distinctive.",
            breakdown: {
                sideA: "Same chains, brands, and platforms dominate globally; younger generations consume identical media, eroding local traditions and languages",
                sideB: "Globalisation enables cultural exchange and revitalisation; social media helps indigenous communities share traditions globally, generating awareness and economic support",
                myView: "Globalisation is a double-edged sword; outcome depends on how communities respond",
                justification: "Communities that actively preserve unique identity while engaging globally tend to thrive; passive absorption risks losing distinctiveness (e.g., Vietnamese ao dai gaining international recognition)"
            }
        }
    },
    {
        topic: "Society & Culture",
        relatedPart2: "Describe a cultural event you attended",
        question: "How important is it for a country to invest in the arts?",
        category: "opinion",
        bestStrategy: "direct-plus",
        followUp: "Should governments fund art that most people do not understand or appreciate?",
        sampleAnswer: {
            text: "I firmly believe that investing in the arts is not a luxury but a fundamental necessity for any society that values creativity, critical thinking, and cultural identity. The primary reason is that the arts serve functions that extend far beyond entertainment. They preserve cultural memory, challenge societal assumptions, foster empathy by exposing people to perspectives different from their own, and drive innovation in ways that purely technical education cannot. For instance, cities that have invested heavily in arts infrastructure, such as Melbourne with its street art scene or Bilbao with the Guggenheim Museum, have experienced remarkable economic revitalisation, attracting tourism, creative industries, and skilled workers who value cultural vibrancy. Having said that, I recognise that arts funding must be balanced against other pressing needs like healthcare and education. The most effective approach, in my view, is to integrate arts funding into broader economic and educational strategies rather than treating it as a separate, dispensable budget line. When the arts are woven into the fabric of education and community life, they generate returns that far exceed the initial investment, both economically and in terms of social cohesion and national identity.",
            breakdown: {
                opinion: "Investing in the arts is a fundamental necessity, not a luxury, for any society valuing creativity and cultural identity",
                reason: "Arts preserve cultural memory, challenge assumptions, foster empathy, and drive innovation beyond what technical education achieves",
                example: "Melbourne's street art and Bilbao's Guggenheim demonstrate how arts investment drives economic revitalisation, tourism, and creative industries",
                extension: "Arts funding should be integrated into broader economic and educational strategies rather than treated as a dispensable budget line; returns far exceed investment"
            }
        }
    },
    {
        topic: "Society & Culture",
        relatedPart2: "Describe a famous person from history you admire",
        question: "Should we judge historical figures by today's moral standards?",
        category: "opinion",
        bestStrategy: "two-sides",
        followUp: "Is it possible to admire someone's achievements while condemning their personal behaviour?",
        sampleAnswer: {
            text: "This is a question that generates passionate debate, and I think both perspectives have considerable merit. On the one hand, applying modern moral standards to historical figures can seem anachronistic and unfair. People are products of their time, shaped by the social norms, knowledge, and belief systems available to them. Judging a fifteenth-century explorer by twenty-first-century standards of human rights ignores the vast differences in worldview and available moral frameworks. On the other hand, there is a strong argument that certain moral principles, such as the wrongness of slavery, genocide, and oppression, are not merely modern inventions but universal truths that some people in every era recognised, even if they were in the minority. Dismissing historical atrocities as merely the norms of the time risks excusing genuine moral failures. On balance, I believe we should adopt a nuanced approach: we can acknowledge the achievements of historical figures while honestly examining their failings, understanding the context without using it as a blanket excuse. This balanced view allows us to learn from history rather than either idealising or demonising the people who shaped it.",
            breakdown: {
                sideA: "People are products of their time; judging by modern standards ignores vast differences in worldview and available moral frameworks",
                sideB: "Certain moral principles like opposing slavery are universal truths recognised by minorities in every era; dismissing atrocities as norms risks excusing genuine moral failures",
                myView: "We should adopt a nuanced approach: acknowledge achievements while honestly examining failings",
                justification: "Understanding context without using it as a blanket excuse allows learning from history rather than idealising or demonising historical figures"
            }
        }
    },
    {
        topic: "Society & Culture",
        relatedPart2: "Describe a piece of art you find interesting",
        question: "Has social media changed the way people appreciate art and culture?",
        category: "cause-effect",
        bestStrategy: "past-present-future",
        followUp: "Do you think photographing art in museums enhances or diminishes the experience?",
        sampleAnswer: {
            text: "Social media has undeniably transformed cultural consumption in ways that are both exciting and concerning. In the past, appreciating art typically required physical presence — visiting galleries, attending performances, or purchasing books and records. This created a slower, more deliberate relationship with cultural works, where people would spend extended periods with a single piece, allowing it to unfold gradually. Nowadays, platforms like Instagram and TikTok have democratised access to art and culture in unprecedented ways. A street artist in Vietnam can gain a global following overnight, and museum collections that were once accessible only to those who could afford to travel are now viewable by anyone with a smartphone. However, this accessibility comes with a significant trade-off: the depth of engagement has often been replaced by breadth. People scroll past masterpieces in seconds, reducing complex works to their most photogenic angles. The phenomenon of people visiting exhibitions primarily to take selfies rather than to engage with the art itself exemplifies this shift. Looking ahead, I anticipate a bifurcation where some consumers will increasingly seek shallow, shareable content while others will deliberately pursue deeper, more immersive cultural experiences as a reaction against digital superficiality. The significance of this shift is that it challenges artists and cultural institutions to find ways of leveraging social media's reach without sacrificing the depth that gives art its transformative power.",
            breakdown: {
                past: "Appreciating art required physical presence — galleries, performances, books; created slower, deliberate relationships where people spent extended periods with single works",
                present: "Social media democratised access (global reach for any artist) but replaced depth with breadth; people scroll past masterpieces in seconds, visit exhibitions for selfies",
                future: "A bifurcation: some seeking shallow shareable content, others deliberately pursuing deeper immersive experiences as a reaction against digital superficiality",
                significance: "Challenges artists and institutions to leverage social media's reach without sacrificing the depth that gives art its transformative power"
            }
        }
    },

    // === Education (44-47) ===
    {
        topic: "Education",
        relatedPart2: "Describe an online course you have taken",
        question: "Will online learning eventually replace traditional classrooms?",
        category: "prediction",
        bestStrategy: "past-present-future",
        followUp: "What are the biggest disadvantages of learning entirely online?",
        sampleAnswer: {
            text: "The relationship between online and traditional learning has evolved dramatically and will continue to do so. Historically, education was almost exclusively a face-to-face endeavour, with students physically gathered in classrooms, lecture halls, and libraries. The teacher was the primary source of knowledge, and learning was structured around fixed schedules and locations. In the present day, particularly accelerated by the pandemic, online learning has proven itself as a viable alternative for many types of education. Platforms like Coursera, Khan Academy, and university-run MOOCs offer high-quality instruction that rivals traditional teaching in content, if not in experience. Many professionals now upskill entirely through online courses, and some universities offer fully accredited online degrees. Looking ahead, I believe we will see a hybrid model become the dominant paradigm rather than a complete replacement of classrooms. Online learning excels at delivering content, allowing self-paced study, and reaching students in remote areas, but it struggles to replicate the social learning, mentorship, spontaneous discussion, and accountability that physical classrooms provide. The significance of this evolution is profound: education will become more personalised and accessible, but societies will need to actively protect the communal aspects of learning that build social skills, resilience, and a sense of belonging.",
            breakdown: {
                past: "Education was exclusively face-to-face with teachers as primary knowledge sources; structured around fixed schedules and physical locations",
                present: "Online learning proven viable, accelerated by the pandemic; platforms offer content rivalling traditional teaching; professionals upskill entirely online",
                future: "A hybrid model will become dominant rather than complete replacement; online excels at content delivery but struggles with social learning, mentorship, and accountability",
                significance: "Education will become more personalised and accessible, but societies must actively protect communal aspects that build social skills, resilience, and belonging"
            }
        }
    },
    {
        topic: "Education",
        relatedPart2: "Describe a memorable school experience",
        question: "Is memorisation still important in education, or should we focus on critical thinking?",
        category: "comparison",
        bestStrategy: "two-sides",
        followUp: "How can teachers balance memorisation with creative thinking in their lessons?",
        sampleAnswer: {
            text: "This is a debate that has divided educators for decades, and I think both sides make compelling arguments. On the one hand, memorisation has traditionally been the backbone of education, and it remains genuinely important for building the foundational knowledge upon which deeper understanding depends. You cannot think critically about history if you don't know any historical facts, and you cannot solve complex mathematical problems without having memorised basic formulas and operations. Cognitive science research also shows that having a rich store of memorised knowledge actually enhances critical thinking because it provides the raw material for making connections and generating insights. On the other hand, an education system that prioritises memorisation at the expense of critical thinking produces students who can recite facts but cannot apply, analyse, or evaluate them. In an age where any factual question can be answered by a smartphone in seconds, the ability to think critically, solve novel problems, and evaluate information is far more valuable than the ability to memorise and recall. Personally, I believe the dichotomy is false — the best education systems integrate both. Students need a solid knowledge base built partly through memorisation, but they also need constant opportunities to apply that knowledge through discussion, debate, problem-solving, and creative projects.",
            breakdown: {
                sideA: "Memorisation builds foundational knowledge essential for deeper understanding; cognitive science shows memorised knowledge enhances critical thinking by providing raw material for connections",
                sideB: "Prioritising memorisation over critical thinking produces students who recite facts but cannot apply them; smartphones answer factual questions instantly, making analysis more valuable",
                myView: "The dichotomy is false — the best education integrates both approaches",
                justification: "Students need solid knowledge built partly through memorisation plus constant opportunities to apply it through discussion, debate, problem-solving, and creative projects"
            }
        }
    },
    {
        topic: "Education",
        relatedPart2: "Describe an important lesson you learned as a child",
        question: "Should schools teach life skills like financial literacy and mental health?",
        category: "opinion",
        bestStrategy: "direct-plus",
        followUp: "At what age should children start learning about money management?",
        sampleAnswer: {
            text: "I would strongly argue that schools should absolutely teach practical life skills, and the fact that most education systems still do not is a significant failing. The fundamental reason is that schools are supposed to prepare young people for adult life, yet they currently focus almost exclusively on academic subjects while ignoring the skills that students will use every single day after graduation. Financial literacy is perhaps the most glaring omission — most young adults leave school without understanding how to budget, save, invest, manage debt, or even read a tax return, which leaves them vulnerable to poor financial decisions that can have lifelong consequences. For example, many university graduates accumulate credit card debt simply because nobody ever taught them how interest rates compound, or they fail to start saving for retirement in their twenties because they don't understand the power of compound growth. Similarly, mental health education could equip students with coping strategies, emotional regulation techniques, and the vocabulary to discuss their feelings — tools that could prevent or mitigate the mental health crisis currently affecting young people worldwide. It is worth noting, however, that these subjects should complement rather than replace traditional academics. The challenge is finding qualified teachers and developing age-appropriate curricula, but this is a practical obstacle, not a reason to abandon the idea entirely.",
            breakdown: {
                opinion: "Schools should absolutely teach practical life skills; the current omission is a significant failing of education systems",
                reason: "Schools prepare for adult life but ignore skills used daily — financial literacy, mental health, emotional regulation — leaving graduates vulnerable",
                example: "University graduates accumulate credit card debt not understanding compound interest; young people lack coping strategies amid a global mental health crisis",
                extension: "These subjects should complement rather than replace academics; the challenge of finding qualified teachers is a practical obstacle, not a reason to abandon the idea"
            }
        }
    },
    {
        topic: "Education",
        relatedPart2: "Describe a skill you would like to learn in the future",
        question: "Is it more important to be a specialist or a generalist in today's world?",
        category: "comparison",
        bestStrategy: "two-sides",
        followUp: "How can someone balance depth of knowledge with breadth of skills?",
        sampleAnswer: {
            text: "The specialist versus generalist debate has become increasingly relevant in our rapidly changing economy. On the one hand, specialists bring deep expertise that is essential for advancing knowledge and solving complex problems within their domains. Surgeons, software engineers, and research scientists all require years of focused training that a generalist approach cannot provide. In many industries, specialists command higher salaries precisely because their rare, deep knowledge is difficult to replace. On the other hand, the modern economy increasingly rewards people who can connect ideas across disciplines, adapt to new roles, and navigate ambiguity. Generalists often make better leaders and innovators because they can see patterns and opportunities that specialists, focused narrowly on their own field, might miss. Companies like Google and Apple have historically valued employees who combine technical skills with design thinking, communication, and business acumen. On balance, I think the most valuable profile in today's world is what some call a 'T-shaped' individual — someone with deep expertise in one area combined with broad knowledge and skills across multiple domains. This allows you to contribute specialist value while collaborating effectively across disciplines and adapting as industries evolve.",
            breakdown: {
                sideA: "Specialists bring essential deep expertise for complex problems; surgeons, engineers, and scientists require focused training; command higher salaries for rare knowledge",
                sideB: "Generalists connect ideas across disciplines, adapt to new roles, see patterns specialists miss; companies like Google value combined technical, design, and business skills",
                myView: "The most valuable profile is 'T-shaped' — deep expertise in one area combined with broad knowledge across multiple domains",
                justification: "Allows contributing specialist value while collaborating across disciplines and adapting as industries evolve"
            }
        }
    },

    // === Technology (48-51) ===
    {
        topic: "Technology",
        relatedPart2: "Describe an app on your phone that you use frequently",
        question: "Are smartphones making people less socially skilled?",
        category: "cause-effect",
        bestStrategy: "two-sides",
        followUp: "Should there be age restrictions on smartphone ownership?",
        sampleAnswer: {
            text: "This is a question that concerns many parents, educators, and psychologists, and the evidence points in both directions. On the one hand, there is growing research suggesting that excessive smartphone use, particularly among young people, is indeed eroding traditional social skills. Children who spend hours on devices rather than playing face-to-face with peers may develop weaker abilities in reading body language, maintaining eye contact, navigating conflict, and sustaining conversations without the safety net of being able to edit or delete their words. The phenomenon of people sitting together in restaurants while staring at their phones rather than talking to each other has become so common that it has its own name: phubbing. On the other hand, smartphones have also created new forms of social connection that should not be dismissed. For introverted individuals, people with social anxiety, or those in geographically isolated communities, smartphones provide vital social lifelines that would otherwise not exist. Online communities can offer belonging, support, and friendship that complement face-to-face relationships. Personally, I believe smartphones are tools, and like all tools, their impact depends on how they are used. The key is teaching people, especially children, to use them intentionally rather than compulsively, and ensuring that screen-based interaction supplements rather than replaces the rich, messy, and irreplaceable experience of human face-to-face connection.",
            breakdown: {
                sideA: "Research suggests excessive use erodes social skills — weaker body language reading, eye contact, conflict navigation; 'phubbing' is now widespread",
                sideB: "Smartphones provide vital social lifelines for introverts, those with social anxiety, and geographically isolated communities; online communities offer belonging",
                myView: "Smartphones are tools whose impact depends on how they are used",
                justification: "Key is teaching intentional rather than compulsive use, ensuring screen interaction supplements rather than replaces face-to-face connection"
            }
        }
    },
    {
        topic: "Technology",
        relatedPart2: "Describe a technology that has changed your life",
        question: "Should governments regulate how technology companies use personal data?",
        category: "opinion",
        bestStrategy: "direct-plus",
        followUp: "Would you sacrifice some convenience for greater data privacy?",
        sampleAnswer: {
            text: "I would argue that government regulation of personal data usage is not merely desirable but urgently necessary in our current digital landscape. The primary reason is that the imbalance of power between technology companies and individual users has become extreme. Most people have no meaningful understanding of how their data is collected, sold, and used, and the terms of service agreements that supposedly grant consent are deliberately designed to be impenetrable. Technology companies have access to intimate details of billions of lives — location histories, health data, private messages, financial transactions — and the potential for misuse, whether through targeted manipulation, discrimination, or security breaches, is enormous. A clear example is the Cambridge Analytica scandal, where personal data from millions of Facebook users was harvested without consent and used to influence political campaigns, demonstrating how unregulated data collection can undermine democratic processes themselves. Having said that, regulation must be carefully designed to protect privacy without stifling innovation or creating barriers that only large corporations can afford to comply with. The European Union's GDPR provides a useful model, though it is not without flaws. Effective regulation should require genuine informed consent, give individuals meaningful control over their data, and impose substantial penalties for violations while remaining practical for smaller companies to implement.",
            breakdown: {
                opinion: "Government regulation is urgently necessary due to the extreme power imbalance between tech companies and individual users",
                reason: "Most people don't understand how data is collected and used; terms of service are deliberately impenetrable; potential for misuse is enormous",
                example: "Cambridge Analytica harvested millions of Facebook users' data without consent to influence political campaigns, undermining democratic processes",
                extension: "Regulation must protect privacy without stifling innovation; GDPR provides a useful model; should require genuine consent and meaningful individual control with substantial penalties"
            }
        }
    },
    {
        topic: "Technology",
        relatedPart2: "Describe a website you visit often",
        question: "How has the internet changed the way people access news and information?",
        category: "cause-effect",
        bestStrategy: "past-present-future",
        followUp: "Do you think people are better informed today than they were before the internet?",
        sampleAnswer: {
            text: "The transformation in how people access news and information has been nothing short of revolutionary. In the past, news consumption was a relatively structured activity. People read morning newspapers, watched evening television bulletins, or listened to radio broadcasts at set times. Information was curated by professional journalists and editors who acted as gatekeepers, determining what the public would see and read. While this system had its biases and limitations, it generally ensured a baseline of factual accuracy and editorial responsibility. In today's digital landscape, the situation is radically different. News is available instantaneously, twenty-four hours a day, from an almost infinite number of sources. Social media platforms have become primary news distributors for many people, particularly younger demographics, which means algorithms rather than journalists increasingly determine what information people see. This has created both unprecedented access to diverse perspectives and a dangerous proliferation of misinformation, conspiracy theories, and deliberately misleading content. Looking ahead, I believe we will see an increasing polarisation between those who actively seek verified, quality journalism and those who remain trapped in algorithmic echo chambers that reinforce existing beliefs. The significance of this shift is profound because an informed citizenry is the foundation of democracy, and when people cannot agree on basic facts, constructive public discourse becomes nearly impossible.",
            breakdown: {
                past: "News was structured — morning newspapers, evening TV bulletins, radio broadcasts; professional journalists acted as gatekeepers ensuring factual accuracy and editorial responsibility",
                present: "News is instantaneous from infinite sources; social media algorithms rather than journalists determine what people see; both diverse perspectives and dangerous misinformation proliferate",
                future: "Increasing polarisation between those seeking verified journalism and those trapped in algorithmic echo chambers reinforcing existing beliefs",
                significance: "An informed citizenry is democracy's foundation; when people cannot agree on basic facts, constructive public discourse becomes nearly impossible"
            }
        }
    },
    {
        topic: "Technology",
        relatedPart2: "Describe a gadget or piece of technology you own",
        question: "Do you think technology is making people more isolated or more connected?",
        category: "comparison",
        bestStrategy: "two-sides",
        followUp: "Can virtual reality solve the problem of technology-driven loneliness?",
        sampleAnswer: {
            text: "This is perhaps the central paradox of our digital age, and I think the honest answer is that technology is doing both simultaneously. On the one hand, technology has connected people in ways that were unimaginable a generation ago. Families separated by continents can video-call daily, diaspora communities maintain cultural ties through online groups, and people with niche interests can find like-minded individuals across the globe. For many people, particularly those with disabilities, social anxiety, or who live in remote areas, technology has dramatically expanded their social worlds. On the other hand, there is mounting evidence that increased digital connectivity correlates with rising loneliness, particularly among younger generations. The replacement of deep, sustained face-to-face relationships with shallow, performative online interactions can leave people feeling more isolated despite having hundreds of digital connections. Studies consistently show that heavy social media users report higher rates of loneliness and depression compared to moderate users. On balance, I believe technology is a magnifier of existing tendencies. For people who use it intentionally to maintain and deepen real relationships, it enhances connection. For those who use it as a substitute for genuine human contact or who become trapped in cycles of comparison and passive consumption, it intensifies isolation.",
            breakdown: {
                sideA: "Technology connects families across continents, maintains diaspora communities, expands social worlds for those with disabilities or in remote areas",
                sideB: "Mounting evidence that digital connectivity correlates with rising loneliness; shallow performative interactions replace deep face-to-face relationships; heavy social media users report more loneliness",
                myView: "Technology is a magnifier of existing tendencies — enhances connection when used intentionally, intensifies isolation when used as a substitute",
                justification: "Outcomes depend on whether people use technology to maintain real relationships or to replace genuine human contact with passive consumption and comparison"
            }
        }
    },

    // === Environment (52-55) ===
    {
        topic: "Environment",
        relatedPart2: "Describe an environmental issue you care about",
        question: "Is individual action or government policy more effective in addressing climate change?",
        category: "comparison",
        bestStrategy: "two-sides",
        followUp: "What is the single most impactful action an individual can take for the environment?",
        sampleAnswer: {
            text: "The question of individual versus governmental responsibility for climate change is one I find both important and frequently oversimplified. On the one hand, government policy has the power to create systemic change at a scale that individual actions simply cannot match. A single carbon tax policy, renewable energy mandate, or emissions regulation can affect millions of people and entire industries overnight. The ban on CFCs through the Montreal Protocol demonstrated how effective international governmental action can be in addressing environmental threats. On the other hand, individual actions matter both practically and symbolically. When millions of people change their consumption patterns, reduce waste, and choose sustainable products, the cumulative effect is significant. Moreover, individual commitment often drives the political will that leads to policy change — politicians respond to voter priorities. Personally, I believe framing this as an either-or question is counterproductive. Both are essential and mutually reinforcing. Governments must create the frameworks and incentives for sustainable behaviour, while individuals must both adopt sustainable practices and exercise their democratic power to demand stronger environmental policies. The most dangerous outcome would be individuals waiting passively for governments to act while governments wait for public demand to justify action.",
            breakdown: {
                sideA: "Government policy creates systemic change at unmatched scale; a single carbon tax affects millions; the Montreal Protocol proved international governmental action's effectiveness",
                sideB: "Individual actions matter practically and symbolically; millions changing consumption patterns creates significant cumulative effect; individual commitment drives political will for policy change",
                myView: "Framing this as either-or is counterproductive; both are essential and mutually reinforcing",
                justification: "Governments must create frameworks for sustainable behaviour; individuals must adopt practices and demand stronger policies; the worst outcome is mutual waiting for the other to act"
            }
        }
    },
    {
        topic: "Environment",
        relatedPart2: "Describe a natural place you have visited that impressed you",
        question: "Should tourism in natural areas be restricted to protect the environment?",
        category: "opinion",
        bestStrategy: "direct-plus",
        followUp: "How can technology help make tourism more sustainable?",
        sampleAnswer: {
            text: "I believe that some form of restriction on tourism in natural areas is absolutely necessary, though the specific approach must be carefully calibrated to balance environmental protection with public access and local livelihoods. The fundamental reason is that unrestricted tourism has already caused devastating damage to some of the world's most precious natural environments. Coral reefs are being destroyed by careless snorkelling and boat anchors, hiking trails are being eroded by excessive foot traffic, and wildlife behaviour is being disrupted by the constant presence of tourists and their vehicles. For instance, Maya Bay in Thailand, made famous by the film 'The Beach,' had to be closed to visitors for over three years because the daily influx of thousands of tourists had virtually destroyed the coral ecosystem and driven away the sharks and marine life that had once thrived there. When the bay reopened with strict visitor caps, the marine ecosystem showed remarkable recovery. Having said that, restrictions must be designed thoughtfully. Completely banning tourism can deprive local communities of vital income and remove the economic incentive to protect natural areas. The most effective approach, in my view, is managed access — implementing daily visitor limits, requiring permits, investing in infrastructure that minimises environmental impact, and using revenue from tourism fees to fund conservation efforts directly.",
            breakdown: {
                opinion: "Some form of tourism restriction in natural areas is absolutely necessary, though the approach must balance protection with access and livelihoods",
                reason: "Unrestricted tourism causes devastating damage — coral reef destruction, trail erosion, wildlife disruption from constant tourist and vehicle presence",
                example: "Maya Bay in Thailand closed for three years after thousands of daily tourists destroyed coral and drove away marine life; strict visitor caps enabled remarkable ecosystem recovery",
                extension: "Completely banning tourism deprives communities of income; managed access is best — daily limits, permits, minimal-impact infrastructure, and tourism revenue funding conservation directly"
            }
        }
    },
    {
        topic: "Environment",
        relatedPart2: "Describe a season of the year you enjoy most",
        question: "How seriously should we take the threat of climate change to seasonal patterns?",
        category: "opinion",
        bestStrategy: "direct-plus",
        followUp: "Have you personally noticed any changes in weather patterns in your area?",
        sampleAnswer: {
            text: "From my perspective, the threat of climate change to seasonal patterns should be taken extremely seriously because it is not a hypothetical future concern but a documented reality that is already affecting ecosystems, agriculture, and human livelihoods worldwide. The primary reason for urgency is that seasonal patterns are not merely a matter of weather preferences — they are the foundation upon which entire agricultural systems, water supplies, and ecological cycles depend. When spring arrives earlier, pollinators emerge before the flowers they depend on have bloomed, disrupting food chains. When monsoon seasons become unpredictable, farmers who rely on seasonal rains for their harvests face devastating crop failures. For example, in Vietnam, the traditional wet and dry seasons have become increasingly erratic over the past decade, with unseasonal flooding and prolonged droughts affecting rice production in the Mekong Delta, which produces over half the country's rice and feeds millions of people across Southeast Asia. It is worth acknowledging, however, that climate change affects different regions differently, and solutions must be locally adapted. While global emissions reduction is essential, communities also need to develop resilience strategies, such as drought-resistant crop varieties and improved water management systems, to cope with the seasonal disruptions that are already locked in by existing greenhouse gas concentrations.",
            breakdown: {
                opinion: "The threat should be taken extremely seriously — it is a documented reality already affecting ecosystems, agriculture, and livelihoods worldwide",
                reason: "Seasonal patterns underpin agricultural systems, water supplies, and ecological cycles; disrupted timing mismatches pollinators with flowers, causes crop failures from unpredictable rains",
                example: "Vietnam's wet and dry seasons have become erratic — unseasonal flooding and prolonged droughts affect Mekong Delta rice production that feeds millions across Southeast Asia",
                extension: "While global emissions reduction is essential, communities also need locally adapted resilience strategies like drought-resistant crops and improved water management for disruptions already locked in"
            }
        }
    },
    {
        topic: "Environment",
        relatedPart2: "Describe an animal you find interesting",
        question: "What responsibility do humans have toward other species on this planet?",
        category: "opinion",
        bestStrategy: "direct-plus",
        followUp: "Should endangered animals be bred in captivity even if they cannot be released into the wild?",
        sampleAnswer: {
            text: "I strongly believe that humans have a profound moral responsibility toward other species, and this responsibility has become more urgent than ever given the scale of the current biodiversity crisis. The core reason is both ethical and practical. Ethically, as the most powerful species on Earth with the greatest capacity to both destroy and protect, we have an obligation not to use that power recklessly. Every species represents millions of years of evolutionary development, and extinction is irreversible — when we lose a species, we lose something that can never be recreated. Practically, biodiversity is not a luxury but the foundation of functioning ecosystems that provide essential services to humans, including clean air, water purification, pollination of crops, and climate regulation. A striking example is the near-extinction of wolves in Yellowstone National Park and their subsequent reintroduction in 1995. Without wolves, elk populations had exploded, overgrazing vegetation along riverbanks, causing erosion that changed the very course of rivers. When wolves returned, the entire ecosystem recovered in what scientists call a trophic cascade, demonstrating how the loss of a single species can destabilise entire landscapes. Having said that, I recognise that conservation must consider human needs, particularly those of communities that depend directly on natural resources for survival. The most sustainable conservation models are those that align species protection with local economic benefits, ensuring that protecting wildlife is not a burden but an advantage for the people living alongside it.",
            breakdown: {
                opinion: "Humans have a profound moral responsibility toward other species, more urgent than ever given the current biodiversity crisis",
                reason: "Ethically, extinction is irreversible; practically, biodiversity provides essential ecosystem services — clean air, water purification, crop pollination, climate regulation",
                example: "Wolf reintroduction in Yellowstone after near-extinction: elk overgrazed riverbanks causing erosion that changed river courses; wolves triggered a trophic cascade restoring the entire ecosystem",
                extension: "Conservation must consider human needs; sustainable models align species protection with local economic benefits so protecting wildlife is an advantage, not a burden, for communities"
            }
        }
    },

    // === Work & Economy (56-59) ===
    {
        topic: "Work & Economy",
        relatedPart2: "Describe your dream job",
        question: "Is it more important to choose a career you are passionate about or one that pays well?",
        category: "comparison",
        bestStrategy: "two-sides",
        followUp: "Can passion for a job develop over time, or does it need to exist from the start?",
        sampleAnswer: {
            text: "This is a dilemma that virtually every young person grapples with, and I think the answer is more nuanced than either extreme suggests. On the one hand, choosing a career based on passion offers enormous benefits for long-term wellbeing and performance. People who genuinely enjoy their work tend to be more productive, more creative, and more resilient in the face of setbacks. They are willing to invest the extra effort required for mastery, and they experience their careers as a source of meaning rather than merely a means of paying bills. There is substantial research showing that job satisfaction is a stronger predictor of overall life satisfaction than income beyond a certain threshold. On the other hand, the advice to simply follow your passion can be dangerously naive, particularly for people from disadvantaged backgrounds who cannot afford the financial risk. Passion doesn't pay rent, and financial stress can erode wellbeing just as effectively as job dissatisfaction. Furthermore, many people discover passion through competence — they grow to love work they become skilled at, rather than starting with an innate passion. Personally, I think the wisest approach is to seek the intersection of three things: something you are genuinely interested in, something you can become good at, and something that provides financial stability. The ideal career satisfies all three, and when that perfect intersection is not immediately available, it is reasonable to prioritise financial security while actively working toward a more fulfilling path.",
            breakdown: {
                sideA: "Passion drives productivity, creativity, resilience, and meaning; job satisfaction predicts life satisfaction more strongly than income beyond a certain threshold",
                sideB: "Following passion can be naive for those who cannot afford financial risk; passion doesn't pay rent; many discover passion through competence rather than starting with it",
                myView: "Seek the intersection of genuine interest, developing competence, and financial stability",
                justification: "When the perfect intersection isn't immediately available, prioritise financial security while actively working toward a more fulfilling path"
            }
        }
    },
    {
        topic: "Work & Economy",
        relatedPart2: "Describe a goal you hope to achieve in the future",
        question: "How will automation affect employment in the next twenty years?",
        category: "prediction",
        bestStrategy: "past-present-future",
        followUp: "Should governments provide retraining programmes for workers displaced by automation?",
        sampleAnswer: {
            text: "The impact of automation on employment is one of the defining economic questions of our time, and understanding it requires examining the historical pattern and current trajectory. In the past, previous waves of automation, from the Industrial Revolution to the computerisation of offices, initially displaced workers but ultimately created more jobs than they destroyed. The introduction of ATMs, for example, was expected to eliminate bank teller jobs, but instead it reduced the cost of running branches, leading banks to open more branches and hire more tellers for customer service roles. At present, we are witnessing a new wave of automation powered by artificial intelligence that is qualitatively different from previous ones. AI can now perform cognitive tasks that were once considered exclusively human — writing, translating, analysing data, diagnosing diseases, and even creating art. This means that white-collar knowledge workers, who were previously insulated from automation, are now equally vulnerable alongside blue-collar workers. Looking ahead, I anticipate significant job displacement in areas such as routine administration, basic legal work, customer service, and entry-level data analysis over the next two decades. However, new roles will emerge in areas we cannot yet fully predict, just as social media management and data science were inconceivable careers thirty years ago. The significance of this transition is that its human impact will depend entirely on policy choices — societies that invest in education, retraining, and social safety nets will navigate the transition far more successfully than those that leave displaced workers to fend for themselves.",
            breakdown: {
                past: "Previous automation waves displaced workers but ultimately created more jobs; ATMs didn't eliminate tellers but led to more branches and customer service roles",
                present: "AI automation is qualitatively different — performing cognitive tasks like writing, translating, diagnosing; white-collar workers now equally vulnerable alongside blue-collar",
                future: "Significant displacement in routine administration, basic legal work, customer service; new unforeseeable roles will emerge as data science and social media management once did",
                significance: "Human impact depends entirely on policy choices — societies investing in education, retraining, and safety nets will navigate far better than those leaving workers to fend for themselves"
            }
        }
    },
    {
        topic: "Work & Economy",
        relatedPart2: "Describe a change you would like to make in your life",
        question: "Is the four-day working week a realistic goal for most countries?",
        category: "opinion",
        bestStrategy: "two-sides",
        followUp: "How do you think a shorter working week would affect work-life balance?",
        sampleAnswer: {
            text: "The four-day working week has moved from a fringe idea to a serious policy discussion in many countries, and the evidence so far is encouraging though not conclusive. On the one hand, trials conducted in Iceland, the UK, and Japan have produced remarkably positive results. In Iceland's large-scale trial involving over twenty-five hundred workers, productivity remained the same or improved while worker wellbeing increased significantly, with employees reporting reduced stress, less burnout, and more time for family and personal interests. Microsoft Japan's trial of a four-day week saw a forty percent increase in productivity. These results suggest that much of the time spent in traditional five-day weeks is unproductive and could be eliminated through better focus and more efficient meeting practices. On the other hand, a four-day week is not equally feasible across all sectors and economies. Healthcare workers, emergency services, hospitality staff, and many manufacturing roles cannot simply reduce hours without either hiring additional staff or reducing output. In developing economies where many workers are already struggling to meet basic needs, reducing working hours could mean reduced income unless productivity gains are sufficient to maintain current wages. On balance, I believe the four-day week will gradually become the norm in knowledge-based industries within developed countries over the next two decades, but it will require significant adaptation in other sectors and may not be universally applicable.",
            breakdown: {
                sideA: "Trials in Iceland, UK, and Japan show maintained or improved productivity with significantly better wellbeing; Microsoft Japan saw 40% productivity increase; much five-day time is unproductive",
                sideB: "Not equally feasible across all sectors — healthcare, emergency services, hospitality, manufacturing need additional staff or accept reduced output; developing economies risk reduced income",
                myView: "The four-day week will gradually become the norm in knowledge-based industries within developed countries over the next two decades",
                justification: "Requires significant adaptation in other sectors and may not be universally applicable; success depends on whether productivity gains can maintain current output and wages"
            }
        }
    },
    {
        topic: "Work & Economy",
        relatedPart2: "Describe an online course you have taken",
        question: "Should employers value skills and experience more than formal qualifications?",
        category: "opinion",
        bestStrategy: "two-sides",
        followUp: "How can someone without a degree demonstrate their competence to employers?",
        sampleAnswer: {
            text: "This is a question that is reshaping hiring practices across many industries. On the one hand, skills and practical experience offer a more direct indication of what a candidate can actually do in a specific role. Many of the most successful tech entrepreneurs and innovators, from Steve Jobs to self-taught programmers contributing to major open-source projects, demonstrate that formal qualifications are not always necessary for exceptional performance. The rise of online learning platforms, coding bootcamps, and portfolio-based assessment means that talented individuals can now develop and demonstrate skills outside traditional educational pathways. On the other hand, formal qualifications serve important functions that should not be dismissed. A degree represents not just knowledge but discipline, perseverance, and the ability to navigate complex systems over an extended period. In fields like medicine, law, and engineering, formal qualifications are essential safeguards ensuring that practitioners meet minimum competency standards that protect public safety. Removing qualification requirements in these areas would be reckless. Personally, I think the ideal approach depends heavily on the industry. In creative and technology sectors, skills and portfolios should carry more weight than degrees. In regulated professions, formal qualifications must remain central. For most other fields, a blended approach that considers both qualifications and demonstrated competence would produce the best hiring outcomes and expand opportunity for talented people from diverse backgrounds.",
            breakdown: {
                sideA: "Skills and experience directly indicate what candidates can do; successful innovators prove qualifications aren't always necessary; online platforms enable skill development outside traditional pathways",
                sideB: "Degrees represent discipline and perseverance; in medicine, law, and engineering, qualifications are essential safeguards for public safety; removing requirements would be reckless",
                myView: "The ideal approach depends on industry — skills matter more in creative and tech sectors, qualifications remain central in regulated professions",
                justification: "A blended approach considering both qualifications and demonstrated competence produces the best hiring outcomes and expands opportunity for diverse backgrounds"
            }
        }
    }
];

// --- Card State ---

let allQuestions = [];
let currentIndex = 0;
let currentStrategy = 'direct-plus';
let currentMode = 'sequential';
let favorites = new Set();
let isRecording = false;
let followUpAsked = false;
let examinerVoiceEnabled = true;
let answerRecordingBlob = null;
let recordingTimerInterval = null;
let recordingStartTime = null;
let sttActive = false;
let currentCardState = CARD_STATE_READY;
let lastTranscript = '';
let lastScore = null;

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();
    loadQuestions();
    setupEventListeners();
    renderCurrentQuestion();

    if (typeof studentSession !== 'undefined' && studentSession.needsIdentification) {
        studentSession.needsIdentification('part3', initModule, initModule);
    } else {
        initModule();
    }

    hideTelegramIfMissing();
});

function initModule() {
    loadQuestions();
    renderCurrentQuestion();
}

function hideTelegramIfMissing() {
    if (typeof botToken === 'undefined' || !botToken ||
        typeof groupId === 'undefined' || !groupId) {
        setTimeout(() => {
            document.querySelectorAll('[onclick*="Telegram"]').forEach(
                el => el.style.display = 'none'
            );
        }, 100);
    }
}

// --- Data Loading ---

function loadFavorites() {
    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
        const id = getQuestionId(DISCUSSION_QUESTIONS[i], i);
        if (localStorage.getItem(STORAGE_PREFIX_FAV + id)) {
            favorites.add(id);
        }
    }
}

function getQuestionId(q, index) {
    return 'p3_' + index;
}

function loadQuestions() {
    allQuestions = [...DISCUSSION_QUESTIONS];
    if (currentMode === 'random') {
        allQuestions = PracticeCommon.shuffleArray([...allQuestions]);
    } else if (currentMode === 'favorites') {
        allQuestions = DISCUSSION_QUESTIONS.filter(
            (q, i) => favorites.has(getQuestionId(q, i))
        );
    } else if (currentMode === 'review') {
        if (window.SpacedRepetition) {
            var dueIndices = SpacedRepetition.getDueIndices('part3');
            allQuestions = dueIndices.map(function(i) { return DISCUSSION_QUESTIONS[i]; }).filter(Boolean);
        }
        if (allQuestions.length === 0) {
            allQuestions = [...DISCUSSION_QUESTIONS];
            alert('No questions due for review. Showing all questions.');
        }
    }
    updateProgress();
}

// --- Event Listeners ---

function setupEventListeners() {
    document.querySelectorAll('.btn-mode').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (e.target.dataset.voice !== undefined) return;
            document.querySelectorAll('.btn-mode:not([data-voice])').forEach(
                b => b.classList.remove('active')
            );
            e.target.classList.add('active');
            currentMode = e.target.dataset.mode;
            currentIndex = 0;
            loadQuestions();
            renderCurrentQuestion();
        });
    });

    const strategySelect = document.getElementById('strategySelect');
    if (strategySelect) {
        strategySelect.addEventListener('change', (e) => {
            currentStrategy = e.target.value;
            updateStrategyHint();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (e.key === 'ArrowLeft' || e.key === 'p') previousQuestion();
        if (e.key === 'ArrowRight' || e.key === 'n') skipToNext();
        if (e.key === ' ' && !isRecording) {
            e.preventDefault();
            toggleRecording();
        }
        if (e.key === 'j') {
            const modal = document.getElementById('jumpModal');
            if (!modal.classList.contains('active')) openJumpModal();
        }
    });
}

// --- Card State Management ---

/** Sets the card's visual state class and updates visibility. */
function setState(state) {
    currentCardState = state;
    const card = document.getElementById('questionCardContainer');
    card.className = 'question-card question-card--' + state;
}

// --- Core Rendering ---

function renderCurrentQuestion() {
    if (!allQuestions || allQuestions.length === 0) return;
    const q = allQuestions[currentIndex];

    // Reset state
    followUpAsked = false;
    lastTranscript = '';
    lastScore = null;
    answerRecordingBlob = null;
    stopRecordingIfActive();

    // Set card to ready state
    setState(CARD_STATE_READY);

    // Update badge
    updateBadge(q);

    // Update meta (counter + fav)
    updateMeta(q);

    // Update question text
    document.getElementById('questionText').textContent = q.question;

    // Update dots (main question + follow-up)
    renderDots(q);

    // Clear scored areas
    document.getElementById('scoreArea').innerHTML = '';
    document.getElementById('studentTranscriptText').textContent = '';
    document.getElementById('sampleAnswerText').textContent = '';
    document.getElementById('cardActions').innerHTML = '';

    // Reset transcript area
    document.getElementById('liveText').textContent = 'Listening...';
    document.getElementById('liveWordCount').textContent = '0 words';
    document.getElementById('liveTimer').textContent = '0:00';

    // Hide manual input
    document.getElementById('manualAnswerArea').classList.add('hidden');

    // Update strategy
    if (q.bestStrategy && q.bestStrategy !== currentStrategy) {
        currentStrategy = q.bestStrategy;
        document.getElementById('strategySelect').value = currentStrategy;
    }
    updateStrategyHint();
    updateProgress();

    // Reset controls bar
    resetControlsBar();

    // Speak question
    speakExaminerText(q.question);
}

function updateBadge(q) {
    const badge = document.getElementById('topicBadge');
    badge.textContent = q.topic;
    badge.className = 'question-card__badge ' + getCategoryClass(q.topic);
}

function updateMeta(q) {
    const total = allQuestions.length || TOTAL_QUESTIONS;
    document.getElementById('qCounter').textContent =
        (currentIndex + 1) + ' / ' + total;

    const favBtn = document.getElementById('favBtn');
    const qId = getQuestionId(q, currentIndex);
    favBtn.textContent = favorites.has(qId) ? '\u2605' : '\u2606';
    favBtn.classList.toggle('active', favorites.has(qId));
}

function getCategoryClass(topic) {
    const map = {
        'Society & Culture': 'society',
        'Education': 'education',
        'Technology': 'technology',
        'Environment': 'environment',
        'Work & Economy': 'work'
    };
    return map[topic] || 'society';
}

function renderDots(q) {
    const dotsContainer = document.getElementById('followupDots');
    const hasFollowUp = Boolean(q.followUp);
    const dotCount = hasFollowUp ? 2 : 1;

    let html = '';
    for (let i = 0; i < dotCount; i++) {
        const cls = i === 0 ? 'dot active' : 'dot';
        html += '<span class="' + cls + '"></span>';
    }
    dotsContainer.innerHTML = html;
}

function updateDotState(activeDotIndex) {
    const dots = document.querySelectorAll('#followupDots .dot');
    dots.forEach((dot, i) => {
        dot.classList.remove('active', 'done');
        if (i < activeDotIndex) {
            dot.classList.add('done');
        } else if (i === activeDotIndex) {
            dot.classList.add('active');
        }
    });
}

function resetControlsBar() {
    const micBtn = document.getElementById('micBtn');
    micBtn.classList.remove('recording');
    micBtn.textContent = '\ud83c\udfa4';

    const skipBtn = document.getElementById('skipBtn');
    skipBtn.textContent = 'Skip \u2192';
    skipBtn.onclick = skipToNext;
    skipBtn.className = 'btn-skip';
}

// --- Score Display ---

/** Renders score, transcript, and sample answer in the card. */
function showScore(transcript, score, q) {
    setState(CARD_STATE_SCORED);

    // Score display
    const scoreArea = document.getElementById('scoreArea');
    if (score) {
        const overall = parseFloat(score.overall);
        let overallCls = 'mid';
        if (overall >= 6.5) overallCls = 'high';
        else if (overall < 5.5) overallCls = 'low';

        scoreArea.innerHTML =
            '<div class="score-display">' +
            '<span class="score-overall">' + score.overall + '</span>' +
            '</div>' +
            '<div class="score-breakdown">' +
            buildScoreChip('F', score.fluency) +
            buildScoreChip('V', score.vocabulary) +
            buildScoreChip('G', score.grammar) +
            buildScoreChip('P', score.pronunciation) +
            '</div>';
    }

    // Student transcript
    document.getElementById('studentTranscriptText').textContent = transcript;

    // Sample answer
    if (q.sampleAnswer) {
        document.getElementById('sampleAnswerText').textContent =
            q.sampleAnswer.text;
    }

    // Action buttons
    renderCardActions();
}

function buildScoreChip(label, value) {
    const v = parseFloat(value);
    let cls = 'score-chip mid';
    if (v >= 6.5) cls = 'score-chip high';
    else if (v < 5.5) cls = 'score-chip low';
    return '<span class="' + cls + '">' + label + ': ' + value + '</span>';
}

function renderCardActions() {
    const actions = document.getElementById('cardActions');
    actions.innerHTML = '';

    if (answerRecordingBlob) {
        const dlBtn = document.createElement('button');
        dlBtn.textContent = '\u2b07 Audio';
        dlBtn.onclick = downloadAnswerRecording;
        actions.appendChild(dlBtn);

        if (typeof TelegramSender !== 'undefined' &&
            typeof botToken !== 'undefined' && botToken) {
            const tgBtn = document.createElement('button');
            tgBtn.textContent = '\ud83d\udce4 Telegram';
            tgBtn.onclick = sendRecordingToTelegram;
            actions.appendChild(tgBtn);
        }
    }
}

// --- Follow-up Flow ---

function showFollowUpOrFinish() {
    const q = allQuestions[currentIndex];

    if (q.followUp && !followUpAsked) {
        followUpAsked = true;
        // Show score for main question
        showScore(lastTranscript, lastScore, q);

        // After delay, advance to follow-up
        setTimeout(() => {
            setState(CARD_STATE_READY);
            document.getElementById('questionText').textContent = q.followUp;
            updateDotState(1);

            // Clear scored areas for follow-up
            document.getElementById('scoreArea').innerHTML = '';
            document.getElementById('studentTranscriptText').textContent = '';
            document.getElementById('sampleAnswerText').textContent = '';
            document.getElementById('cardActions').innerHTML = '';
            document.getElementById('manualAnswerArea').classList.add('hidden');

            // Reset transcript
            document.getElementById('liveText').textContent = 'Listening...';
            document.getElementById('liveWordCount').textContent = '0 words';
            document.getElementById('liveTimer').textContent = '0:00';

            lastTranscript = '';
            lastScore = null;
            answerRecordingBlob = null;

            resetControlsBar();
            speakExaminerText(q.followUp);
        }, FOLLOW_UP_DELAY_MS);
    } else {
        // Show score for follow-up (or main if no follow-up)
        showScore(lastTranscript, lastScore, q);
        showNextQuestionPrompt();
    }
}

function showNextQuestionPrompt() {
    const skipBtn = document.getElementById('skipBtn');
    skipBtn.textContent = 'Next Question \u2192';
    skipBtn.className = 'btn-next-q';
    skipBtn.onclick = () => {
        nextQuestion();
    };
}

// --- Recording / STT ---

function toggleRecording() {
    if (isRecording) {
        stopRecordingFlow();
    } else {
        startRecordingFlow();
    }
}

async function startRecordingFlow() {
    if (typeof AudioRecorderService === 'undefined') {
        showManualInput();
        return;
    }

    try {
        await AudioRecorderService.startRecording();
        isRecording = true;
        answerRecordingBlob = null;

        setState(CARD_STATE_RECORDING);

        const micBtn = document.getElementById('micBtn');
        micBtn.classList.add('recording');
        micBtn.textContent = '\u23f9';

        document.getElementById('liveText').textContent = 'Listening...';
        startRecordingTimer();
        startSTT();
    } catch (err) {
        console.error('Mic error:', err);
        showManualInput();
    }
}

async function stopRecordingFlow() {
    if (!isRecording) return;
    isRecording = false;
    stopRecordingTimer();
    stopSTT();

    const micBtn = document.getElementById('micBtn');
    micBtn.classList.remove('recording');
    micBtn.textContent = '\ud83c\udfa4';

    try {
        const blob = await AudioRecorderService.stopRecording();
        answerRecordingBlob = blob;

        const liveText = document.getElementById('liveText')
            .textContent.trim();
        const transcript = (liveText && liveText !== 'Listening...')
            ? liveText : '';

        if (transcript) {
            processStudentAnswer(transcript);
        } else {
            setState(CARD_STATE_READY);
            showManualInput();
        }
    } catch (err) {
        console.error('Recording stop error:', err);
        setState(CARD_STATE_READY);
    }
}

function stopRecordingIfActive() {
    if (isRecording) {
        isRecording = false;
        stopRecordingTimer();
        stopSTT();
        if (typeof AudioRecorderService !== 'undefined') {
            AudioRecorderService.stopRecording().catch(() => {});
        }
    }
}

function startSTT() {
    if (typeof SpeechToTextService !== 'undefined' &&
        SpeechToTextService.isSupported()) {
        sttActive = true;
        SpeechToTextService.startListening(
            (text) => {
                document.getElementById('liveText').textContent = text;
                const wc = countWords(text);
                document.getElementById('liveWordCount').textContent =
                    wc + ' words';
            },
            () => {}
        );
    }
}

function stopSTT() {
    if (sttActive && typeof SpeechToTextService !== 'undefined') {
        SpeechToTextService.stopListening();
        sttActive = false;
    }
}

function startRecordingTimer() {
    recordingStartTime = Date.now();
    recordingTimerInterval = setInterval(() => {
        const elapsed = Date.now() - recordingStartTime;
        document.getElementById('liveTimer').textContent =
            formatDuration(elapsed);
        if (elapsed >= RECORDING_MAX_MS) {
            stopRecordingFlow();
        }
    }, 200);
}

function stopRecordingTimer() {
    if (recordingTimerInterval) {
        clearInterval(recordingTimerInterval);
        recordingTimerInterval = null;
    }
}

function showManualInput() {
    document.getElementById('manualAnswerArea').classList.remove('hidden');
    const textarea = document.getElementById('manualAnswerInput');
    textarea.value = '';
    textarea.focus();
}

function submitManualAnswer() {
    const textarea = document.getElementById('manualAnswerInput');
    const text = (textarea.value || '').trim();
    if (!text) return;
    document.getElementById('manualAnswerArea').classList.add('hidden');
    processStudentAnswer(text);
}

// --- Answer Processing ---

function processStudentAnswer(transcript) {
    lastTranscript = transcript;

    // Score the answer
    let score = null;
    if (window.calculateBandScores) {
        score = calculateBandScores(transcript);
    }
    lastScore = score;

    // Save transcript and attempts
    saveTranscriptAndAttempt(transcript, currentIndex);

    // Show follow-up or finish
    setTimeout(() => {
        showFollowUpOrFinish();
    }, 300);
}

function saveTranscriptAndAttempt(transcript, index) {
    localStorage.setItem(STORAGE_PREFIX_TRANSCRIPT + index, transcript);
    const attempts = PracticeCommon.getAttemptCount(
        STORAGE_PREFIX_ATTEMPTS, index
    );
    localStorage.setItem(
        STORAGE_PREFIX_ATTEMPTS + index,
        String(attempts + 1)
    );

    // Also save to score history if available
    if (window.calculateBandScores && typeof ScoreHistory !== 'undefined') {
        const scores = calculateBandScores(transcript);
        ScoreHistory.saveScore({
            moduleId: 'part3',
            questionIndex: index,
            questionId: getQuestionId(allQuestions[index], index),
            scores: scores,
            transcript: transcript,
            wordCount: countWords(transcript)
        });
        if (window.SpacedRepetition) {
            SpacedRepetition.recordScore('part3_' + index, scores.overall);
        }
    }
}

// --- Audio/Telegram ---

function downloadAnswerRecording() {
    if (!answerRecordingBlob) return;
    const url = URL.createObjectURL(answerRecordingBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'part3-q' + (currentIndex + 1) + '-answer.webm';
    a.click();
    URL.revokeObjectURL(url);
}

function sendRecordingToTelegram() {
    if (!answerRecordingBlob || typeof TelegramSender === 'undefined') return;
    const q = allQuestions[currentIndex];
    const studentName = localStorage.getItem('studentName') || 'Unknown';
    const transcript = localStorage.getItem(
        STORAGE_PREFIX_TRANSCRIPT + currentIndex
    ) || '';
    const wordCount = countWords(transcript);

    let scoreText = 'Not scored';
    if (transcript && window.calculateBandScores) {
        const scores = calculateBandScores(transcript);
        scoreText = scores.overall + ' (F:' + scores.fluency +
            ' V:' + scores.vocabulary + ' G:' + scores.grammar +
            ' P:' + scores.pronunciation + ')';
    }

    const caption = '<b>\ud83d\udcda IELTS Part 3 Recording</b>\n\n' +
        '<b>Student:</b> ' + studentName + '\n' +
        '<b>Topic:</b> ' + q.topic + '\n' +
        '<b>Question #' + (currentIndex + 1) + ':</b> ' +
        q.question + '\n\n' +
        '<b>\ud83d\udcdd Transcription:</b>\n' +
        (transcript || 'No transcription available') + '\n\n' +
        '<b>\ud83d\udcca Band Score:</b> ' + scoreText + '\n' +
        '<b>Words:</b> ' + wordCount;

    TelegramSender.sendAudio(answerRecordingBlob, caption);
}

// --- Navigation ---

function previousQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        renderCurrentQuestion();
    }
}

function nextQuestion() {
    if (currentIndex < allQuestions.length - 1) {
        currentIndex++;
        renderCurrentQuestion();
    }
}

function skipToNext() {
    nextQuestion();
}

// --- Settings ---

function toggleSettings() {
    document.getElementById('settingsPanel').classList.toggle('active');
    document.getElementById('settingsOverlay').classList.toggle('active');
}

function toggleExaminerVoice(enabled) {
    examinerVoiceEnabled = enabled;
    document.querySelectorAll('[data-voice]').forEach(btn => {
        btn.classList.toggle(
            'active',
            (btn.dataset.voice === 'on') === enabled
        );
    });
}

// --- Favorites ---

function toggleFavorite() {
    const q = allQuestions[currentIndex];
    const qId = getQuestionId(q, currentIndex);
    if (favorites.has(qId)) {
        favorites.delete(qId);
        localStorage.removeItem(STORAGE_PREFIX_FAV + qId);
    } else {
        favorites.add(qId);
        localStorage.setItem(STORAGE_PREFIX_FAV + qId, '1');
    }
    const favBtn = document.getElementById('favBtn');
    favBtn.textContent = favorites.has(qId) ? '\u2605' : '\u2606';
    favBtn.classList.toggle('active', favorites.has(qId));
}

// --- Strategy Hint ---

function toggleStrategyHint() {
    const content = document.getElementById('hintContent');
    const visible = content.style.display !== 'none';
    content.style.display = visible ? 'none' : 'block';
}

function updateStrategyHint() {
    const config = PART3_STRATEGIES[currentStrategy];
    if (!config) return;
    const content = document.getElementById('hintContent');
    let html = '<strong>' + config.name + '</strong><br>' +
        '<div style="font-size:0.8rem;color:var(--color-text-secondary);margin-bottom:8px;">' +
        config.description + '</div>';

    config.fields.forEach((field, i) => {
        html += '<div class="hint-step">' +
            '<span class="hint-step-num">' + (i + 1) + '.</span>' +
            field.icon + ' <strong>' + field.label + '</strong><br>' +
            '<span style="font-size:0.8rem;">' +
            field.placeholder + '</span></div>';
    });

    // Add connectors
    const connectors = CONNECTOR_EXAMPLES[currentStrategy];
    if (connectors) {
        html += '<hr style="border-color:var(--color-border);margin:12px 0;">' +
            connectors;
    }

    content.innerHTML = html;
}

// --- Progress ---

function updateProgress() {
    const total = allQuestions.length || TOTAL_QUESTIONS;
    document.getElementById('progressCount').textContent =
        (currentIndex + 1) + '/' + total;
}

// --- TTS ---

function speakExaminerText(text) {
    if (!examinerVoiceEnabled) return;
    if (typeof PracticeCommon !== 'undefined' &&
        PracticeCommon.speakAsExaminer) {
        PracticeCommon.speakAsExaminer(text);
    }
}

// --- Jump Modal ---

let currentJumpFilter = 'all';

function openJumpModal() {
    document.getElementById('jumpModalOverlay').classList.add('active');
    document.getElementById('jumpModal').classList.add('active');
    document.getElementById('searchInput').value = '';
    renderQuestionList();
    document.getElementById('searchInput').focus();
    document.getElementById('searchInput')
        .addEventListener('input', renderQuestionList);
}

function closeJumpModal() {
    document.getElementById('jumpModalOverlay').classList.remove('active');
    document.getElementById('jumpModal').classList.remove('active');
}

function setJumpFilter(filter) {
    currentJumpFilter = filter;
    document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.filter === filter);
    });
    renderQuestionList();
}

function jumpToNumber() {
    const num = parseInt(document.getElementById('jumpNumber').value, 10);
    if (num >= 1 && num <= allQuestions.length) {
        currentIndex = num - 1;
        renderCurrentQuestion();
        closeJumpModal();
    }
}

function renderQuestionList() {
    const search = (document.getElementById('searchInput').value || '')
        .toLowerCase();
    const list = document.getElementById('questionList');
    list.innerHTML = '';

    DISCUSSION_QUESTIONS.forEach((q, i) => {
        const qId = getQuestionId(q, i);
        const hasAttempt = PracticeCommon.getAttemptCount(
            STORAGE_PREFIX_ATTEMPTS, i
        ) > 0;
        const isFav = favorites.has(qId);

        if (currentJumpFilter === 'favorites' && !isFav) return;
        if (currentJumpFilter === 'completed' && !hasAttempt) return;
        if (search && !q.question.toLowerCase().includes(search) &&
            !q.topic.toLowerCase().includes(search)) return;

        const item = document.createElement('div');
        item.className = 'question-item' +
            (i === currentIndex ? ' current' : '');
        item.innerHTML =
            '<span class="question-status">' +
            (hasAttempt ? '\u2705' : '\u2b55') + '</span>' +
            '<span class="question-num-badge">#' + (i + 1) + '</span>' +
            '<span class="question-preview">' + q.question + '</span>';
        item.onclick = () => {
            currentIndex = i;
            renderCurrentQuestion();
            closeJumpModal();
        };
        list.appendChild(item);
    });
}

// --- Utilities ---

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function countWords(text) {
    return text.split(/\s+/).filter(w => w).length;
}

function formatDuration(ms) {
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return min + ':' + sec.toString().padStart(2, '0');
}
