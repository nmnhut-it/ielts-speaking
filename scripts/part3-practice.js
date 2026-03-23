/**
 * Part 3 Discussion Practice - Main logic
 * 40 discussion questions across 5 categories with 3 answer strategies
 */

// --- Constants ---

const WORDS_PER_SECOND = 2.5;
const TOTAL_QUESTIONS = 40;
const STORAGE_PREFIX_FAV = 'p3_fav_';
const STORAGE_PREFIX_ATTEMPTS = 'p3_attempts_';
const STORAGE_PREFIX_TRANSCRIPT = 'p3_transcript_';

// --- Discussion Strategies ---

const PART3_STRATEGIES = {
    'direct-plus': {
        id: 'direct-plus',
        name: 'Direct Answer Plus',
        description: 'State opinion → Give reason → Provide example → Extend/qualify',
        fields: [
            { id: 'opinion', label: 'Your Opinion', icon: '💬', placeholder: 'State your position clearly (e.g., "I believe that..." or "In my view...")' },
            { id: 'reason', label: 'Reason', icon: '🔍', placeholder: 'Explain why you hold this view with a clear reason' },
            { id: 'example', label: 'Example', icon: '📌', placeholder: 'Give a specific example to support your point' },
            { id: 'extension', label: 'Extension/Qualification', icon: '➕', placeholder: 'Add nuance, acknowledge exceptions, or extend the idea' }
        ]
    },
    'two-sides': {
        id: 'two-sides',
        name: 'Two Sides',
        description: 'Acknowledge both perspectives → State preference → Justify',
        fields: [
            { id: 'sideA', label: 'Side A (One perspective)', icon: '⚖️', placeholder: 'Present the first viewpoint (e.g., "On the one hand...")' },
            { id: 'sideB', label: 'Side B (Other perspective)', icon: '🔄', placeholder: 'Present the opposing viewpoint (e.g., "On the other hand...")' },
            { id: 'myView', label: 'Your View', icon: '🎯', placeholder: 'State which side you lean toward and why' },
            { id: 'justification', label: 'Justification', icon: '✅', placeholder: 'Provide evidence or reasoning for your position' }
        ]
    },
    'past-present-future': {
        id: 'past-present-future',
        name: 'Past-Present-Future',
        description: 'Describe how things were → How they are now → How they might change',
        fields: [
            { id: 'past', label: 'In the Past', icon: '⏮️', placeholder: 'Describe how things used to be (e.g., "In previous generations...")' },
            { id: 'present', label: 'Present Situation', icon: '▶️', placeholder: 'Describe the current state of affairs' },
            { id: 'future', label: 'Future Outlook', icon: '⏭️', placeholder: 'Predict or speculate about future changes' },
            { id: 'significance', label: 'Significance', icon: '💡', placeholder: 'Explain why this change matters or what it means' }
        ]
    }
};

const CONNECTOR_EXAMPLES = {
    'direct-plus': `<strong>Direct Answer Plus Connectors:</strong><br><br>
<strong>Opinion:</strong><br>
• I would argue that...<br>
• From my perspective,...<br>
• I firmly believe that...<br>
• In my view,...<br><br>
<strong>Reason:</strong><br>
• The main reason for this is...<br>
• This is primarily because...<br>
• I think this stems from...<br><br>
<strong>Example:</strong><br>
• For instance,...<br>
• A good example of this would be...<br>
• To illustrate this point,...<br><br>
<strong>Extension:</strong><br>
• Having said that,...<br>
• That being said,...<br>
• It's worth noting, however, that...<br>
• Of course, there are exceptions...`,

    'two-sides': `<strong>Two Sides Connectors:</strong><br><br>
<strong>Side A:</strong><br>
• On the one hand,...<br>
• Some people argue that...<br>
• It could be said that...<br><br>
<strong>Side B:</strong><br>
• On the other hand,...<br>
• Conversely,...<br>
• However, others maintain that...<br><br>
<strong>Your View:</strong><br>
• Personally, I tend to think...<br>
• On balance, I would say...<br>
• Weighing both sides,...<br><br>
<strong>Justification:</strong><br>
• This is because...<br>
• The evidence suggests...<br>
• My reasoning is that...`,

    'past-present-future': `<strong>Past-Present-Future Connectors:</strong><br><br>
<strong>Past:</strong><br>
• In previous generations,...<br>
• Traditionally,...<br>
• Historically speaking,...<br><br>
<strong>Present:</strong><br>
• Nowadays,...<br>
• In today's society,...<br>
• At present,...<br><br>
<strong>Future:</strong><br>
• Looking ahead,...<br>
• In the years to come,...<br>
• I anticipate that...<br><br>
<strong>Significance:</strong><br>
• What this means is...<br>
• The implication of this is...<br>
• This matters because...`
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
        question: "Whose responsibility is it to protect the environment — individuals or governments?",
        category: "opinion",
        bestStrategy: "two-sides",
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
        sampleAnswer: {
            text: "Workplace competition is a double-edged sword that can produce either excellent or destructive outcomes depending on how it is managed. On the one hand, healthy competition can drive innovation, motivate employees to perform at their best, and lead to better outcomes for organisations and their customers. When people are challenged by their peers, they often push beyond their comfort zones and achieve things they might not have attempted otherwise. On the other hand, excessive or poorly managed competition can create toxic work environments characterised by sabotage, stress, and a reluctance to collaborate or share knowledge. It can also lead to unethical behaviour when employees feel pressured to win at any cost. On balance, I believe competition is healthy when it is accompanied by a collaborative culture and fair rules. The most successful organisations I have observed encourage healthy rivalry while ensuring that individual competition never undermines teamwork or the overall mission of the company.",
            breakdown: {
                sideA: "Healthy competition drives innovation, motivates peak performance, pushes people beyond comfort zones",
                sideB: "Excessive competition creates toxic environments: sabotage, stress, reluctance to collaborate, unethical behaviour",
                myView: "Competition is healthy when accompanied by collaborative culture and fair rules",
                justification: "Successful organisations encourage rivalry while ensuring individual competition never undermines teamwork or company mission"
            }
        }
    }
];

// --- State ---

let allQuestions = [];
let currentIndex = 0;
let currentStrategy = 'direct-plus';
let currentMode = 'sequential';
let favorites = new Set();
let sampleExpanded = false;
let connectorExpanded = false;
let isAnswerRecording = false;
let answerRecordingBlob = null;
let recordingTimerInterval = null;
let recordingStartTime = null;

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

    if (typeof botToken === 'undefined' || !botToken || typeof groupId === 'undefined' || !groupId) {
        setTimeout(() => {
            document.querySelectorAll('[onclick*="Telegram"]').forEach(el => el.style.display = 'none');
            const sendBtns = document.querySelectorAll('.btn-telegram, #sendTelegramBtn');
            sendBtns.forEach(el => el.style.display = 'none');
        }, 100);
    }
});

function initModule() {
    loadQuestions();
    renderCurrentQuestion();
}

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
    }
    updateProgress();
}

function setupEventListeners() {
    document.querySelectorAll('.btn-mode').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.btn-mode').forEach(b => b.classList.remove('active'));
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
            renderStrategyInfo();
            renderForm();
            updatePreview();
            if (connectorExpanded) {
                updateConnectorDisplay();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (e.key === 'ArrowLeft' || e.key === 'p') previousQuestion();
        if (e.key === 'ArrowRight' || e.key === 'n') nextQuestion();
        if (e.key === 's') toggleSample();
        if (e.key === 'j') {
            const modal = document.getElementById('jumpModal');
            if (!modal.classList.contains('active')) openJumpModal();
        }
    });
}

// --- Rendering ---

function renderStrategyInfo() {
    const config = PART3_STRATEGIES[currentStrategy];
    document.getElementById('strategyName').textContent = config.name;
    document.getElementById('strategyDesc').textContent = config.description;
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

function renderCurrentQuestion() {
    if (!allQuestions || allQuestions.length === 0) return;
    const q = allQuestions[currentIndex];

    document.getElementById('questionNum').textContent = 'Question ' + (currentIndex + 1);

    const badge = document.getElementById('categoryBadge');
    badge.textContent = q.topic;
    badge.className = 'category-badge ' + getCategoryClass(q.topic);

    document.getElementById('typeBadge').textContent = q.category;
    document.getElementById('relatedTopic').textContent = 'Related to: ' + q.relatedPart2;
    document.getElementById('questionText').textContent = q.question;

    const favBtn = document.getElementById('favBtn');
    const qId = getQuestionId(q, currentIndex);
    favBtn.textContent = favorites.has(qId) ? '\u2605' : '\u2606';
    favBtn.classList.toggle('active', favorites.has(qId));

    if (q.bestStrategy && q.bestStrategy !== currentStrategy) {
        currentStrategy = q.bestStrategy;
        document.getElementById('strategySelect').value = currentStrategy;
    }

    renderStrategyInfo();
    renderStrategyGuide();
    renderForm();

    if (q.sampleAnswer) {
        document.getElementById('sampleSection').style.display = 'block';
        renderSampleAnswer(q.sampleAnswer);
    } else {
        document.getElementById('sampleSection').style.display = 'none';
    }

    resetRecordingUI();
    updateAttemptBadge(currentIndex);
    if (sampleExpanded) toggleSample();
    updateProgress();
}

function renderStrategyGuide() {
    const config = PART3_STRATEGIES[currentStrategy];
    document.getElementById('guideTitle').textContent =
        'Recommended approach: ' + config.name;
    const stepsEl = document.getElementById('guideSteps');
    stepsEl.innerHTML = '';
    config.fields.forEach((field, i) => {
        const li = document.createElement('li');
        li.setAttribute('data-step', (i + 1) + '.');
        li.textContent = field.label + ' \u2014 ' + field.placeholder;
        stepsEl.appendChild(li);
    });
}

function renderForm() {
    const config = PART3_STRATEGIES[currentStrategy];
    if (!config) return;
    const container = document.getElementById('formContainer');
    container.innerHTML = '';
    config.fields.forEach(field => {
        const div = document.createElement('div');
        div.className = 'form-field';

        const label = document.createElement('label');
        label.className = 'field-label';
        label.textContent = field.icon + ' ' + field.label;
        label.htmlFor = 'input-' + field.id;

        const textarea = document.createElement('textarea');
        textarea.id = 'input-' + field.id;
        textarea.className = 'field-textarea';
        textarea.placeholder = field.placeholder;
        textarea.rows = 3;
        textarea.addEventListener('input', updatePreview);

        div.appendChild(label);
        div.appendChild(textarea);
        container.appendChild(div);
    });
    updatePreview();
}

function renderSampleAnswer(sampleAnswer) {
    const config = PART3_STRATEGIES[currentStrategy];
    document.getElementById('sampleAnswer').textContent = sampleAnswer.text;
    const breakdownDiv = document.getElementById('sampleBreakdown');
    breakdownDiv.innerHTML = '<strong>Strategy Breakdown:</strong><br><br>';
    config.fields.forEach(field => {
        const key = field.id;
        if (sampleAnswer.breakdown && sampleAnswer.breakdown[key]) {
            breakdownDiv.innerHTML +=
                '<strong>' + field.icon + ' ' + field.label + ':</strong><br>' +
                sampleAnswer.breakdown[key] + '<br><br>';
        }
    });
}

function updatePreview() {
    const config = PART3_STRATEGIES[currentStrategy];
    if (!config) return;

    const values = {};
    let filledCount = 0;
    config.fields.forEach(field => {
        const input = document.getElementById('input-' + field.id);
        if (input) {
            const value = input.value.trim();
            values[field.id] = value;
            if (value) filledCount++;
        }
    });

    const parts = config.fields
        .map(f => values[f.id])
        .filter(v => v);
    const answer = parts.join(' ');
    const wordCount = answer ? answer.split(/\s+/).filter(w => w).length : 0;
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

    document.getElementById('elementCount').textContent =
        filledCount + '/' + config.fields.length + ' elements';
    document.getElementById('wordCount').textContent = wordCount + ' words';
    document.getElementById('timeEstimate').textContent =
        '~' + minutes + ':' + seconds.toString().padStart(2, '0') + ' speaking time';

    const timeEl = document.getElementById('timeEstimate');
    if (timeEstimate < 20) {
        timeEl.style.color = '#dc2626';
    } else if (timeEstimate >= 20 && timeEstimate <= 60) {
        timeEl.style.color = '#16a34a';
    } else {
        timeEl.style.color = '#d97706';
    }
}

function updateProgress() {
    const total = allQuestions.length || TOTAL_QUESTIONS;
    document.getElementById('progressCount').textContent =
        (currentIndex + 1) + '/' + total;
}

function updateAttemptBadge(index) {
    PracticeCommon.updateAttemptBadge({
        badgeId: 'p3AttemptBadge',
        headerId: 'questionNum',
        prefix: STORAGE_PREFIX_ATTEMPTS,
        index: index
    });
}

// --- Navigation ---

function previousQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        renderCurrentQuestion();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function nextQuestion() {
    if (currentIndex < allQuestions.length - 1) {
        currentIndex++;
        renderCurrentQuestion();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// --- Settings ---

function toggleSettings() {
    document.getElementById('settingsPanel').classList.toggle('active');
    document.getElementById('settingsOverlay').classList.toggle('active');
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

// --- Sample Answer ---

function toggleSample() {
    sampleExpanded = !sampleExpanded;
    const content = document.getElementById('sampleContent');
    const icon = document.getElementById('sampleToggleIcon');
    content.style.display = sampleExpanded ? 'block' : 'none';
    icon.textContent = sampleExpanded ? '\u25BC' : '\u25B6';
}

// --- Connector Guide ---

function toggleConnectors() {
    connectorExpanded = !connectorExpanded;
    const content = document.getElementById('connectorContent');
    const btn = document.getElementById('connectorToggleBtn');
    content.style.display = connectorExpanded ? 'block' : 'none';
    btn.textContent = connectorExpanded ? 'Hide' : 'Show';
    if (connectorExpanded) updateConnectorDisplay();
}

function updateConnectorDisplay() {
    const text = CONNECTOR_EXAMPLES[currentStrategy] || '';
    document.getElementById('connectorText').innerHTML = text;
}

// --- Recording (reuses PracticeCommon patterns) ---

function resetRecordingUI() {
    if (isAnswerRecording) stopAnswerRecording();
    answerRecordingBlob = null;
    document.getElementById('recordingResult').classList.add('hidden');
    document.getElementById('recordAnswerBtn').classList.remove('hidden');
    document.getElementById('stopRecordingBtn').classList.add('hidden');
    document.getElementById('recordingTimer').classList.add('hidden');
    document.getElementById('liveTranscriptArea').classList.add('hidden');
    document.getElementById('manualAnswerArea').classList.add('hidden');

    const scoreDisplay = document.getElementById('p3ScoreDisplay');
    if (scoreDisplay) scoreDisplay.classList.add('hidden');

    const comparison = document.getElementById('answerComparison');
    if (comparison) comparison.classList.add('hidden');

    const transcription = document.getElementById('transcriptionArea');
    if (transcription) transcription.classList.add('hidden');
}

async function startAnswerRecording() {
    if (typeof AudioRecorderService === 'undefined') {
        document.getElementById('manualAnswerArea').classList.remove('hidden');
        return;
    }
    try {
        await AudioRecorderService.startRecording();
        isAnswerRecording = true;
        document.getElementById('recordAnswerBtn').classList.add('hidden');
        document.getElementById('stopRecordingBtn').classList.remove('hidden');
        document.getElementById('recordingTimer').classList.remove('hidden');
        startAnswerRecordingTimer();

        if (typeof SpeechToTextService !== 'undefined' && SpeechToTextService.isSupported()) {
            document.getElementById('liveTranscriptArea').classList.remove('hidden');
            SpeechToTextService.startListening(
                (text) => {
                    document.getElementById('liveTranscriptText').textContent = text;
                },
                () => {}
            );
        }
    } catch (err) {
        document.getElementById('manualAnswerArea').classList.remove('hidden');
    }
}

async function stopAnswerRecording() {
    if (!isAnswerRecording) return;
    isAnswerRecording = false;
    stopAnswerRecordingTimer();

    document.getElementById('stopRecordingBtn').classList.add('hidden');
    document.getElementById('recordingTimer').classList.add('hidden');

    if (typeof SpeechToTextService !== 'undefined') {
        SpeechToTextService.stopListening();
    }

    try {
        const blob = await AudioRecorderService.stopRecording();
        answerRecordingBlob = blob;
        const url = URL.createObjectURL(blob);
        document.getElementById('recordingPlayback').src = url;
        document.getElementById('recordingResult').classList.remove('hidden');

        const liveText = document.getElementById('liveTranscriptText').textContent.trim();
        if (liveText) {
            handleTranscriptResult(liveText);
        }
    } catch (err) {
        console.error('Recording stop error:', err);
    }
}

function startAnswerRecordingTimer() {
    recordingStartTime = Date.now();
    recordingTimerInterval = setInterval(() => {
        const elapsed = Date.now() - recordingStartTime;
        document.getElementById('recordingElapsed').textContent =
            PracticeCommon.formatDuration(elapsed);
        if (elapsed >= 90000) {
            stopAnswerRecording();
        }
    }, 200);
}

function stopAnswerRecordingTimer() {
    if (recordingTimerInterval) {
        clearInterval(recordingTimerInterval);
        recordingTimerInterval = null;
    }
}

function transcribeRecording() {
    document.getElementById('manualAnswerArea').classList.remove('hidden');
    document.getElementById('transcribeBtn').style.display = 'none';
}

function submitManualAnswer() {
    const textarea = document.getElementById('manualAnswerInput');
    const text = (textarea.value || '').trim();
    if (!text) {
        alert('Please type your answer first.');
        return;
    }
    document.getElementById('manualAnswerArea').classList.add('hidden');
    handleTranscriptResult(text);
}

function handleTranscriptResult(transcript) {
    PracticeCommon.showTranscriptResult(transcript, {
        areaEl: 'transcriptionArea',
        textEl: 'transcriptionText',
        wordcountEl: 'transcriptionWordcount',
        storagePrefix: STORAGE_PREFIX_TRANSCRIPT,
        index: currentIndex,
        onAfterDisplay: (text, idx) => {
            showComparison(text, idx);
            runScoring(text, idx);
        }
    });
}

function showComparison(transcript, index) {
    const q = allQuestions[index];
    if (!q || !q.sampleAnswer) return;

    document.getElementById('answerComparison').classList.remove('hidden');
    document.getElementById('comparisonYours').textContent = transcript;
    document.getElementById('comparisonSample').textContent = q.sampleAnswer.text;

    const yourWords = transcript.split(/\s+/).filter(w => w).length;
    const sampleWords = q.sampleAnswer.text.split(/\s+/).filter(w => w).length;
    document.getElementById('comparisonYoursWords').textContent = yourWords + ' words';
    document.getElementById('comparisonSampleWords').textContent = sampleWords + ' words';
}

function runScoring(transcript, index) {
    PracticeCommon.runBandScoring(transcript, index, {
        moduleId: 'part3',
        scoreDisplayEl: 'p3ScoreDisplay',
        attemptPrefix: STORAGE_PREFIX_ATTEMPTS,
        transcriptPrefix: STORAGE_PREFIX_TRANSCRIPT,
        getQuestionId: (idx) => getQuestionId(allQuestions[idx], idx),
        onAfterScore: () => {
            PracticeCommon.showTryAgainButton({
                btnId: 'p3TryAgainBtn',
                containerEl: 'p3ScoreDisplay',
                onTryAgain: () => tryAgainHandler()
            });
        }
    });
}

function tryAgainHandler() {
    PracticeCommon.tryAgain({
        prefix: STORAGE_PREFIX_ATTEMPTS,
        index: currentIndex,
        updateBadge: () => updateAttemptBadge(currentIndex),
        resetElements: [
            { id: 'recordingResult', action: 'hideClass' },
            { id: 'recordAnswerBtn', action: 'showClass' },
            { id: 'transcriptionArea', action: 'hideClass' },
            { id: 'answerComparison', action: 'hideClass' },
            { id: 'p3ScoreDisplay', action: 'hideClass' },
            { id: 'p3TryAgainBtn', action: 'remove' },
            { id: 'liveTranscriptArea', action: 'hideClass' },
            { id: 'manualAnswerArea', action: 'hideClass' }
        ],
        onReset: () => {
            answerRecordingBlob = null;
            document.getElementById('liveTranscriptText').textContent = '';
            document.getElementById('manualAnswerInput').value = '';
            const transcribeBtn = document.getElementById('transcribeBtn');
            if (transcribeBtn) transcribeBtn.style.display = '';
        }
    });
}

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
    const transcript = localStorage.getItem(STORAGE_PREFIX_TRANSCRIPT + currentIndex) || '';
    const wordCount = transcript ? transcript.trim().split(/\s+/).length : 0;

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
        '<b>Question #' + (currentIndex + 1) + ':</b> ' + q.question + '\n\n' +
        '<b>\ud83d\udcdd Transcription:</b>\n' +
        (transcript || 'No transcription available') + '\n\n' +
        '<b>\ud83d\udcca Band Score:</b> ' + scoreText + '\n' +
        '<b>Words:</b> ' + wordCount;

    TelegramSender.sendAudio(answerRecordingBlob, caption);
}

// --- Jump Modal ---

let currentJumpFilter = 'all';

function openJumpModal() {
    document.getElementById('jumpModalOverlay').classList.add('active');
    document.getElementById('jumpModal').classList.add('active');
    document.getElementById('searchInput').value = '';
    renderQuestionList();
    document.getElementById('searchInput').focus();

    document.getElementById('searchInput').addEventListener('input', renderQuestionList);
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function renderQuestionList() {
    const search = (document.getElementById('searchInput').value || '').toLowerCase();
    const list = document.getElementById('questionList');
    list.innerHTML = '';

    DISCUSSION_QUESTIONS.forEach((q, i) => {
        const qId = getQuestionId(q, i);
        const hasAttempt = PracticeCommon.getAttemptCount(STORAGE_PREFIX_ATTEMPTS, i) > 0;
        const isFav = favorites.has(qId);

        if (currentJumpFilter === 'favorites' && !isFav) return;
        if (currentJumpFilter === 'completed' && !hasAttempt) return;
        if (search && !q.question.toLowerCase().includes(search) &&
            !q.topic.toLowerCase().includes(search)) return;

        const item = document.createElement('div');
        item.className = 'question-item' + (i === currentIndex ? ' current' : '');
        item.innerHTML =
            '<span class="question-status">' + (hasAttempt ? '\u2705' : '\u2B55') + '</span>' +
            '<span class="question-num-badge">#' + (i + 1) + '</span>' +
            '<span class="question-preview">' + q.question + '</span>';
        item.onclick = () => {
            currentIndex = i;
            renderCurrentQuestion();
            closeJumpModal();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        list.appendChild(item);
    });
}
