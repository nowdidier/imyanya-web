const interviewPreparation = [
  {
    slug: "common-interview-questions-rwanda",
    category: "Interview Preparation",
    readingTime: "9 min",
    title: "50 Most Common Interview Questions in Rwanda (With Sample Answers)",
    excerpt: "The most frequently asked interview questions across Rwandan employers, with structured answer frameworks.",
    body: [
      {
        heading: "Behavioural Questions (STAR Method)",
        paragraphs: [
          "1. Tell me about yourself. (2-minute professional summary: current role → key achievements → why you're here)",
          "2. Describe a time you handled a difficult situation at work.",
          "3. Give an example of when you worked under pressure.",
          "4. Tell me about a time you failed. What did you learn?",
          "5. How do you handle conflict with a colleague?",
          "6. Describe a time you went above and beyond.",
          "7. Tell me about a time you had to adapt to change quickly.",
          "8. Give an example of when you showed initiative.",
          "9. How do you prioritise when everything feels urgent?",
          "10. Describe your greatest professional achievement.",
        ],
      },
      {
        heading: "Technical Role-Specific Questions",
        paragraphs: [
          "For Finance: Walk me through IFRS 16. How do you calculate PAYE? Explain the bank reconciliation process. What's the difference between IAS 16 and IFRS 16?",
          "For Tech: Explain the difference between REST and GraphQL. How does React's virtual DOM work? Design a URL shortener. Walk me through your debugging process.",
          "For Sales: How do you handle objections? Walk me through your sales process. Tell me about your biggest deal. How do you build pipeline?",
          "For HR: How do you handle a grievance? Walk me through your recruitment process. How do you ensure compliance with Rwanda labour law?",
          "For Marketing: How do you measure campaign ROI? Walk me through a successful campaign. How do you approach social media strategy?",
        ],
      },
      {
        heading: "Rwanda-Specific Questions",
        paragraphs: [
          "Why do you want to work at [company] specifically?",
          "How do you see Rwanda's economy developing in the next 5 years?",
          "Describe your experience working in multicultural teams.",
          "How would you handle working with limited resources?",
          "What do you know about our company's contribution to Rwanda's development?",
          "How do you stay updated on industry changes in Rwanda?",
          "What's your understanding of [company's] role in Vision 2050?",
        ],
      },
      {
        heading: "Questions to Ask the Interviewer",
        paragraphs: [
          "What does success look like in this role in the first 90 days?",
          "How would you describe the team culture?",
          "What are the biggest challenges facing the department right now?",
          "How does this role contribute to the company's goals for Rwanda?",
          "What professional development opportunities are available?",
          "What's the typical career progression from this role?",
        ],
      },
    ],
    takeaways: [
      "Use STAR method: Situation, Task, Action, Result for behavioural questions",
      "Prepare 2-minute professional summary for 'Tell me about yourself'",
      "Research company-specific and Rwanda-specific talking points",
      "Always have 3-5 thoughtful questions for the interviewer",
      "Quantify achievements in every answer",
    ],
    faq: [
      { q: "How many interview questions should I prepare for?", a: "Prepare 20-30 core questions with STAR stories. You'll typically face 8-12 per interview. Have backup stories ready for follow-ups." },
    ],
  },
  {
    slug: "star-method-interview-rwanda",
    category: "Interview Preparation",
    readingTime: "7 min",
    title: "How to Use the STAR Method in Rwandan Job Interviews",
    excerpt: "Mastering the Situation-Task-Action-Result framework with Rwanda-specific examples.",
    body: [
      {
        heading: "What is the STAR Method?",
        paragraphs: [
          "STAR is a structured way to answer behavioural interview questions — 'Tell me about a time when...' It ensures your answers are clear, concise, and impactful.",
          "Situation: Set the context. Where, when, what was the challenge.",
          "Task: What was your specific responsibility or goal.",
          "Action: What you specifically did (not the team — YOU).",
          "Result: The outcome, ideally with numbers or measurable impact.",
        ],
      },
      {
        heading: "Rwanda STAR Examples",
        paragraphs: [
          "Question: 'Tell me about a time you solved a problem.'",
          "STAR Answer: 'At BK TecHouse (Situation), our mobile money API had a 5% failure rate during peak hours, affecting 10,000+ daily transactions. I was asked to identify the root cause (Task). I analysed logs, identified a database connection pool bottleneck, implemented connection recycling, and added retry logic with exponential backoff (Action). The failure rate dropped to 0.3%, saving approximately 15M RWF monthly in failed transaction recovery costs (Result).'",
          "Question: 'Describe a time you worked with a difficult team member.'",
          "STAR Answer: 'During a USAID project audit (Situation), a colleague was defensive about documentation gaps, making the audit stressful. I was responsible for maintaining the working relationship while completing our compliance report (Task). I scheduled a one-on-one coffee meeting, acknowledged the pressure they were under, and offered to help organise their files using our shared drive structure (Action). They opened up about feeling overwhelmed. We divided the documentation work, completed the audit with zero major findings, and they later thanked me for the approach (Result).'",
        ],
      },
      {
        heading: "STAR Tips for Rwanda",
        paragraphs: [
          "Keep answers to 2-3 minutes. Rwandan interviewers appreciate concise answers.",
          "Use real numbers whenever possible: amounts, percentages, team sizes, timeframes.",
          "For entry-level candidates: University projects, internships, and volunteer work all count as STAR stories.",
          "Prepare 5-8 STAR stories that can be adapted to different questions.",
          "Always end with the result. The impact is what interviewers remember.",
        ],
      },
    ],
    takeaways: [
      "STAR: Situation → Task → Action → Result",
      "Keep answers to 2-3 minutes",
      "Use real numbers: amounts, percentages, team sizes, timeframes",
      "Prepare 5-8 adaptable stories",
      "Always end with measurable impact",
    ],
    faq: [
      { q: "What if I don't have work experience for STAR?", a: "Use university projects, volunteer work, student leadership, or personal projects. 'During my final year project...' is a valid STAR start." },
    ],
  },
  {
    slug: "technical-interview-preparation-rwanda",
    category: "Interview Preparation",
    readingTime: "10 min",
    title: "How to Prepare for Technical Interviews in Rwanda",
    excerpt: "Comprehensive preparation guide for coding tests, system design, and technical assessments at Rwandan companies.",
    body: [
      {
        heading: "Technical Interview Formats in Rwanda",
        paragraphs: [
          "Rwandan tech companies use various formats: Live coding (CoderPad, CodeSignal), take-home projects (2-5 days), system design discussions, code review exercises, and portfolio presentations.",
          "BK TecHouse, MTN, Irembo, and Andela partners typically use 2-3 stage technical processes. International remote employers add cultural fit rounds.",
        ],
      },
      {
        heading: "What to Prepare",
        paragraphs: [
          "Data Structures & Algorithms: Arrays, Hash Maps, Trees, Graphs, Heaps, Stacks, Queues. Sorting, Searching, Dynamic Programming, BFS/DFS. Practice on LeetCode (Blind 75, NeetCode 150).",
          "System Design: URL shortener, notification service, chat system, e-commerce platform, payment processing. Focus on scalability, reliability, and trade-offs.",
          "Language-Specific: JavaScript closures, React hooks lifecycle, Python GIL, Go concurrency, Java memory model.",
          "Database Design: SQL vs NoSQL, indexing, query optimization, ACID vs BASE, data modeling.",
          "DevOps: Docker, Kubernetes, CI/CD, Terraform, AWS/GCP/Azure services, monitoring (Prometheus, Grafana).",
        ],
      },
      {
        heading: "Rwanda-Specific Technical Topics",
        paragraphs: [
          "Mobile money integration (MTN MoMo, Airtel Money APIs) — frequently tested at fintech companies.",
          "Offline-first architecture — important for Rwanda's connectivity challenges.",
          "Low-bandwidth optimization — mobile users on 2G/3G.",
          "Kinyarwanda NLP/text processing — for local-facing products.",
          "Payment processing with idempotency — critical for financial systems.",
        ],
      },
    ],
    takeaways: [
      "Know the format: live coding, take-home, system design, code review",
      "Master DSA basics: LeetCode Blind 75/NeetCode 150",
      "Practice system design: scalability, trade-offs, reliability",
      "Rwanda-specific: mobile money APIs, offline-first, low-bandwidth",
      "Always discuss trade-offs, not just solutions",
    ],
    faq: [
      { q: "How long should I prepare for a technical interview?", a: "2-4 weeks of consistent practice (1-2 hours daily) for most mid-level roles. Senior roles may need 4-6 weeks for system design preparation." },
    ],
  },
  {
    slug: "interview-body-language-rwanda",
    category: "Interview Preparation",
    readingTime: "6 min",
    title: "Interview Body Language and Etiquette in Rwanda",
    excerpt: "Cultural dos and don'ts for interview behaviour in Rwanda's professional environment.",
    body: [
      {
        heading: "First Impressions Matter",
        paragraphs: [
          "In Rwanda's professional culture, first impressions carry significant weight. Punctuality, dress, and initial interactions set the tone for the entire interview.",
          "Arrive 10-15 minutes early. Being late is considered very disrespectful. If you're going to be late, call ahead.",
        ],
      },
      {
        heading: "Body Language Do's",
        paragraphs: [
          "Greet with a firm (but not crushing) handshake and direct eye contact. In Rwanda, 'Good morning/afternoon' with a handshake is standard.",
          "Sit upright, lean slightly forward to show engagement. Keep hands visible on the table.",
          "Nod while listening to show understanding. Smile naturally.",
          "Mirror the interviewer's energy level. If they're formal, be formal. If they're relaxed, match it slightly.",
          "Take a brief pause before answering complex questions — it shows thoughtfulness.",
        ],
      },
      {
        heading: "Body Language Don'ts",
        paragraphs: [
          "Don't cross your arms — it signals defensiveness.",
          "Don't fidget, tap your pen, or play with your phone.",
          "Don't interrupt the interviewer — wait for them to finish before responding.",
          "Don't avoid eye contact — it may signal dishonesty or lack of confidence.",
          "Don't slouch or lean back — it signals disinterest.",
          "Don't check your phone during the interview — even if it's on the table.",
        ],
      },
      {
        heading: "Rwanda-Specific Etiquette",
        paragraphs: [
          "Address senior interviewers as 'Mr./Ms. [Last Name]' unless invited to use first names.",
          "Use both hands or right hand when receiving a business card. Look at it briefly before putting it down respectfully.",
          "In group interviews, address the most senior person first, then others.",
          "For government interviews: Even more formal. Stand when they enter, wait to be invited to sit.",
          "If served tea/coffee during interview: Accept graciously. It's a hospitality gesture.",
        ],
      },
    ],
    takeaways: [
      "Arrive 10-15 minutes early — lateness is very disrespectful",
      "Firm handshake, direct eye contact, upright posture",
      "Address seniors as Mr./Ms. [Last Name] unless invited otherwise",
      "Use both hands when receiving business cards",
      "Accept tea/coffee graciously — it's a hospitality gesture",
      "Mirror the interviewer's energy level",
    ],
    faq: [
      { q: "Should I stand when the interviewer enters?", a: "Yes, especially for formal interviews (banking, government). Stand, greet, shake hands, then sit when invited." },
    ],
  },
  {
    slug: "virtual-interview-tips-rwanda",
    category: "Interview Preparation",
    readingTime: "7 min",
    title: "How to Ace Virtual Interviews in Rwanda",
    excerpt: "Technical setup, etiquette, and strategies for video interviews with Rwandan and international employers.",
    body: [
      {
        heading: "Virtual Interviews Are Here to Stay",
        paragraphs: [
          "Post-COVID, virtual interviews are standard for first rounds at most Rwandan companies, especially for remote and international roles. MTN, BK TecHouse, Andela, and international NGOs frequently use Zoom, Google Meet, or Teams.",
          "Technical issues during a virtual interview signal poor preparation — even if it's your internet connection that's the problem.",
        ],
      },
      {
        heading: "Technical Setup",
        paragraphs: [
          "Test your setup 30 minutes before: camera, microphone, speakers, internet speed. Have a mobile hotspot ready as backup.",
          "Camera: Eye level, well-lit face, neutral background. Natural light from a window in front of you is ideal. Avoid backlighting.",
          "Audio: Earphones/headset recommended over laptop speakers. Reduces echo and background noise.",
          "Background: Clean, professional. A bookshelf, plain wall, or tidy room. No beds, messy rooms, or virtual backgrounds that glitch.",
        ],
      },
      {
        heading: "Virtual Interview Etiquette",
        paragraphs: [
          "Look at the camera (not the screen) when speaking — it simulates eye contact.",
          "Mute when not speaking in group calls. Unmute to respond.",
          "Have your CV, notes, and the job description visible on a second screen or printed beside you.",
          "Close unnecessary tabs and applications — notifications during an interview are embarrassing.",
          "If connection drops: Reconnect immediately, apologise briefly, and continue. Have the interviewer's phone number as backup.",
        ],
      },
      {
        heading: "Rwanda-Specific Virtual Tips",
        paragraphs: [
          "Internet reliability: If you're in a area with unstable connectivity, consider using a co-working space or cafe with reliable WiFi.",
          "Power backup: Have your laptop fully charged and a power bank ready. Load shedding can happen.",
          "Time zones: For international roles, confirm the time zone. Rwanda is CAT (UTC+2).",
          "Dress professionally even for virtual interviews — at least from the waist up.",
        ],
      },
    ],
    takeaways: [
      "Test setup 30 min before: camera, mic, internet, backup hotspot",
      "Look at camera (not screen) to simulate eye contact",
      "Have CV, notes, and job description visible nearby",
      "Close all unnecessary tabs and notifications",
      "Have interviewer's phone number as connection backup",
      "Dress professionally even for virtual interviews",
    ],
    faq: [
      { q: "What if my internet fails mid-interview?", a: "Reconnect immediately via phone hotspot. Send a brief message: 'Apologies for the connection issue. Reconnecting now.' Most interviewers understand — Rwanda's internet can be unpredictable." },
    ],
  },
  {
    slug: "salary-negotiation-interview-rwanda",
    category: "Interview Preparation",
    readingTime: "8 min",
    title: "How to Negotiate Your Salary After a Job Interview in Rwanda",
    excerpt: "When and how to discuss compensation, and strategies for maximising your total package.",
    body: [
      {
        heading: "When to Discuss Salary",
        paragraphs: [
          "In Rwanda, salary discussions typically happen: after the final interview (most common), during HR screening (some companies), or in the offer stage.",
          "If asked about salary expectations early: Give a range based on market research, not your current salary. 'Based on my research and experience, I'm targeting 1.5M-2M RWF monthly for this role.'",
          "Never ask about salary in the first interview unless the interviewer raises it.",
        ],
      },
      {
        heading: "Research Your Market Value",
        paragraphs: [
          "Sources: Imyanya.rw salary guides, Glassdoor (adjust for Rwanda), LinkedIn Salary, conversations with trusted peers, recruitment agencies (Adecco Rwanda, ManpowerGroup).",
          "Consider: role level, industry, company size, location (Kigali vs other districts), benefits package, and your specific qualifications.",
          "Get data from 3+ sources to triangulate. One data point is anecdotal; three is research.",
        ],
      },
      {
        heading: "Negotiation Strategies",
        paragraphs: [
          "Anchor high (but realistic). If the range is 1.2-1.8M, start at 1.8M and negotiate down if needed.",
          "Negotiate total package, not just base salary. Transport allowance, housing allowance, professional development budget, flexible work, performance bonus, review timeline.",
          "Use the 'I'm excited about the role and want to find a package that works for both of us' framing.",
          "Get the offer in writing before resigning from your current job.",
        ],
      },
      {
        heading: "Rwanda-Specific Tips",
        paragraphs: [
          "Allowances (transport, housing, meal) are often negotiable even when base salary is fixed.",
          "For banking roles: Negotiate the bonus structure, not just base.",
          "For NGO roles: Some salaries are donor-funded with fixed bands — but entry level within the band is negotiable.",
          "For government roles: Salary bands are fixed. Negotiate start date, leave, or professional development instead.",
          "Never lie about your current salary. Rwanda's professional network is small — lies get found out.",
        ],
      },
    ],
    takeaways: [
      "Salary discussions happen after final interview or in offer stage",
      "Research market value from 3+ sources before negotiating",
      "Anchor high but realistic based on data",
      "Negotiate total package: allowances, bonus, development, flexibility",
      "Get offer in writing before resigning",
      "Never lie about current salary — Rwanda's network is small",
    ],
    faq: [
      { q: "What if the offer is below my expectations?", a: "Ask for time to consider (24-48 hours). Research market rate, prepare a counter-offer with justification, and negotiate respectfully. 'I appreciate the offer. Based on my research and [specific qualifications], I was hoping for [X]. Is there flexibility?'" },
    ],
  },
  {
    slug: "group-interview-tips-rwanda",
    category: "Interview Preparation",
    readingTime: "6 min",
    title: "How to Succeed in Group Interviews in Rwanda",
    excerpt: "Strategies for assessment centres, panel interviews, and group discussions common at Rwandan employers.",
    body: [
      {
        heading: "Types of Group Interviews in Rwanda",
        paragraphs: [
          "Panel Interview: 3-5 interviewers ask questions sequentially. Common at banks (BK, Equity), government agencies, and NGOs.",
          "Assessment Centre: Group exercises, presentations, case studies, role plays. Used by MTN, Airtel, and international organisations.",
          "Group Discussion: Candidates discuss a topic while assessors observe. Less common but used for management trainee programmes.",
        ],
      },
      {
        heading: "Panel Interview Tips",
        paragraphs: [
          "Make eye contact with the person asking the question, but include others by glancing at them periodically.",
          "Address the most senior person first, but don't ignore others.",
          "If a question is directed at a specific panellist, answer them but include the group.",
          "Bring enough copies of your CV for each panellist (3-5).",
        ],
      },
      {
        heading: "Assessment Centre Tips",
        paragraphs: [
          "Group exercises: Show leadership without dominating. Listen, build on others' ideas, and ensure quieter participants are included.",
          "Presentations: Prepare thoroughly. Know your material without reading from notes. Handle questions confidently.",
          "Case studies: Structure your approach clearly. State assumptions, ask clarifying questions, and present recommendations with rationale.",
          "Role plays: Stay in character, handle objections professionally, and demonstrate empathy.",
        ],
      },
      {
        heading: "Standing Out Positively",
        paragraphs: [
          "Be the person who summarises key points during group discussions.",
          "Ask clarifying questions before diving into tasks.",
          "Give credit to others: 'I agree with [name]'s point, and I'd add...'",
          "Stay positive and professional even when disagreeing.",
          "Thank the assessors at the end and shake hands with each panel member.",
        ],
      },
    ],
    takeaways: [
      "Panel: Eye contact with questioner, include others by glancing",
      "Bring 3-5 CV copies for panellists",
      "Group exercises: Lead without dominating, include quieter voices",
      "Presentations: Know material without reading notes",
      "Summarise key points and give credit to others",
    ],
    faq: [
      { q: "How many candidates are typically in a group interview?", a: "4-8 for assessment centres, 1 for panel interviews. Each format tests different skills." },
    ],
  },
  {
    slug: "interview-follow-up-rwanda",
    category: "Interview Preparation",
    readingTime: "5 min",
    title: "What to Do After an Interview in Rwanda: Follow-Up Guide",
    excerpt: "Post-interview etiquette, thank-you notes, and follow-up strategies for the Rwandan job market.",
    body: [
      {
        heading: "Immediate Actions (Within 24 Hours)",
        paragraphs: [
          "Send a thank-you email or WhatsApp message within 4 hours. Reference a specific topic discussed. This is not common in Rwanda — it makes you memorable.",
          "Template: 'Dear [Name], thank you for the conversation today. I especially enjoyed discussing [specific project/challenge]. My experience with [relevant skill] aligns well with what you described. I'm excited about the possibility of contributing to [company mission]. Best regards, [Your Name].'",
          "If the interviewer's WhatsApp is on your phone (many Rwandan professionals use WhatsApp), a brief, professional message is acceptable. Keep it formal.",
        ],
      },
      {
        heading: "Follow-Up Timeline",
        paragraphs: [
          "Day 1: Send thank-you message.",
          "Day 5-7: If no response, send a brief follow-up email: 'Following up on my interview on [date]. I remain very interested in the role and would welcome any updates on the timeline.'",
          "Day 14: Second follow-up if still no response. Brief and professional.",
          "After 3 weeks with no response: Move on. Continue applying elsewhere. Don't burn bridges — the role may reopen.",
        ],
      },
      {
        heading: "Rwanda-Specific Follow-Up Tips",
        paragraphs: [
          "In Rwanda's relationship-oriented culture, follow-up is expected and appreciated. It shows persistence without being pushy.",
          "If you have a mutual connection, a gentle nudge through them can help: 'I interviewed at [company] last week. If you happen to know the hiring manager, a brief recommendation would be appreciated.'",
          "For government jobs: Follow the official timeline. Don't follow up more than once — they have formal processes.",
          "If you get rejected: Thank them graciously and ask for feedback. 'I appreciate the opportunity. Would you be able to share any feedback to help me improve for future applications?'",
        ],
      },
    ],
    takeaways: [
      "Send thank-you within 4 hours — reference specific discussion points",
      "Follow up at day 7 if no response, then day 14",
      "In Rwanda, follow-up is expected and shows persistence",
      "Mutual connections can provide gentle nudges",
      "If rejected: Thank graciously and ask for feedback",
    ],
    faq: [
      { q: "Is it okay to follow up on WhatsApp?", a: "Only if the interviewer shared their WhatsApp or if it's the company's standard communication channel. Always keep messages professional and brief." },
    ],
  },
  {
    slug: "psychometric-test-preparation-rwanda",
    category: "Interview Preparation",
    readingTime: "7 min",
    title: "How to Prepare for Psychometric Tests in Rwanda",
    excerpt: "Guide to aptitude tests, personality assessments, and cognitive ability tests used by Rwandan employers.",
    body: [
      {
        heading: "What Are Psychometric Tests?",
        paragraphs: [
          "Psychometric tests measure cognitive ability, personality traits, and behavioural tendencies. In Rwanda, they're used by: banks (BK, Equity, I&M) for entry/mid roles, MTN and Airtel for graduate programmes, Big 4 accounting firms, government agencies, and international NGOs.",
          "These tests are standardised and timed. Preparation significantly improves scores.",
        ],
      },
      {
        heading: "Common Test Types",
        paragraphs: [
          "Numerical Reasoning: Data interpretation from charts, tables, percentages, ratios. Practice: Interpret financial statements, calculate growth rates, work with ratios.",
          "Verbal Reasoning: Reading comprehension, logical inference, identifying assumptions. Practice: Read academic articles, identify conclusions, evaluate arguments.",
          "Logical/Abstract Reasoning: Pattern recognition, sequences, matrices. Practice: IQ test-style questions, spatial reasoning puzzles.",
          "Situational Judgement: 'What would you do if...' scenarios. Practice: Think about workplace dilemmas and ethical choices.",
          "Personality Tests (MBTI, DISC, Hogan): No right answers, but be consistent. Don't try to 'game' the test — inconsistencies are flagged.",
        ],
      },
      {
        heading: "Preparation Strategy",
        paragraphs: [
          "Take practice tests: SHL, Kenexa, and Cubiks offer free samples online. Practise under timed conditions.",
          "Review basic maths: Percentages, ratios, fractions, data interpretation. YouTube has excellent free tutorials.",
          "Read comprehension practice: Read news articles and practise summarising main arguments, identifying conclusions, and evaluating evidence.",
          "Know the employer's test format: Ask HR which tests they use. Different companies use different providers.",
        ],
      },
    ],
    takeaways: [
      "Psychometric tests are used by banks, telcos, Big 4, and NGOs",
      "Common types: Numerical, Verbal, Logical, Situational, Personality",
      "Practice under timed conditions using SHL, Kenexa, Cubiks samples",
      "Review basic maths: percentages, ratios, data interpretation",
      "Ask HR which specific tests they use",
    ],
    faq: [
      { q: "Can I retake a psychometric test?", a: "Usually not with the same company within 6-12 months. Some companies allow retakes after a cooling period. Focus on preparation, not retakes." },
    ],
  },
  {
    slug: "case-study-interview-rwanda",
    category: "Interview Preparation",
    readingTime: "7 min",
    title: "How to Prepare for Case Study Interviews in Rwanda",
    excerpt: "Guide to case study and business simulation exercises used by consulting firms, banks, and NGOs.",
    body: [
      {
        heading: "When Case Studies Are Used",
        paragraphs: [
          "Case study interviews are common for: consulting roles (PwC, EY, Deloitte Rwanda), banking management trainees, NGO programme design roles, marketing and strategy positions, and senior management roles.",
          "You'll typically receive a business scenario and 30-60 minutes to analyse it and present recommendations.",
        ],
      },
      {
        heading: "Case Study Framework",
        paragraphs: [
          "Listen and clarify: Restate the problem. Ask clarifying questions. 'Is this a profitability issue, market entry, or operational challenge?'",
          "Structure: Create a framework. For profitability: Revenue (price × volume) vs Costs (fixed vs variable). For market entry: Market attractiveness + Company capabilities + Entry mode.",
          "Analyse: Work through the data. Do calculations out loud. 'If revenue is 500M RWF and costs are 400M, margin is 20%. Industry average is 30%, so there's a gap.'",
          "Recommend: Give a clear recommendation with supporting rationale. 'I recommend entering the microfinance market because...'",
          "Risks: Acknowledge risks and mitigation strategies.",
        ],
      },
      {
        heading: "Rwanda-Specific Case Topics",
        paragraphs: [
          "Mobile money market: How would you design a product to compete with MoMo?",
          "Agricultural value chain: How would you reduce post-harvest losses for smallholder farmers?",
          "Tourism strategy: How would Rwanda increase conference tourism revenue?",
          "Digital government: How would you design a citizen services portal for rural areas?",
          "Financial inclusion: How would you increase bank account penetration in rural districts?",
        ],
      },
    ],
    takeaways: [
      "Used for: consulting, banking trainees, NGO programme design, strategy roles",
      "Framework: Clarify → Structure → Analyse → Recommend → Risks",
      "Do calculations out loud — show your thinking",
      "Prepare Rwanda-specific case topics: mobile money, agriculture, tourism",
      "Always acknowledge risks and mitigation strategies",
    ],
    faq: [
      { q: "What if I don't know the answer?", a: "It's fine. Show your analytical process. Interviewers care more about how you think than whether you get the 'right' answer." },
    ],
  },
  {
    slug: "second-interview-tips-rwanda",
    category: "Interview Preparation",
    readingTime: "5 min",
    title: "How to Prepare for Second and Final Round Interviews in Rwanda",
    excerpt: "Strategies for progressing from first interview to offer in Rwanda's multi-stage hiring processes.",
    body: [
      {
        heading: "What Changes in Later Rounds",
        paragraphs: [
          "First round (HR/Recruiter): Fit, basic qualifications, salary expectations, motivation.",
          "Second round (Hiring Manager): Deeper technical/functional assessment, team fit, specific skills validation.",
          "Final round (Senior Leadership/Director): Strategic thinking, leadership potential, cultural alignment, long-term fit.",
          "Each round narrows the pool. You're being compared against fewer, stronger candidates.",
        ],
      },
      {
        heading: "Preparation for Later Rounds",
        paragraphs: [
          "Research deeper: Read the company's annual report, recent news, competitor landscape. Be ready to discuss industry trends.",
          "Prepare questions about strategy: 'What's the company's 3-year plan for Rwanda? How does this role contribute?'",
          "Bring references: Have 2-3 professional references ready (inform them in advance).",
          "Prepare a 90-day plan: How you'd approach the role in the first 30/60/90 days. This demonstrates strategic thinking.",
          "Be ready for tougher questions: 'Why should we choose you over other candidates?' 'What would you change about our strategy?'",
        ],
      },
      {
        heading: "Rwanda-Specific Tips",
        paragraphs: [
          "Final rounds often involve meeting the Country Director, CEO, or Managing Director. Research them on LinkedIn.",
          "For banking final rounds: Be prepared for a board-style presentation or strategy discussion.",
          "For NGO final rounds: Be ready to discuss your development philosophy and approach to community engagement.",
          "Follow up after each round with a thank-you note referencing specific discussion points.",
        ],
      },
    ],
    takeaways: [
      "Each round narrows the pool — prepare deeper at each stage",
      "Research company strategy, annual reports, and recent news",
      "Prepare a 90-day plan for the role",
      "Have 2-3 references ready and informed",
      "For final rounds: Research the senior leader you'll meet",
    ],
    faq: [
      { q: "How many interview rounds should I expect?", a: "2-4 rounds is normal in Rwanda. Banks and large corporates tend toward 4. Startups and SMEs often have 2. If you're past round 3, you're likely a finalist." },
    ],
  },
  {
    slug: "interview-mistakes-rwanda",
    category: "Interview Preparation",
    readingTime: "6 min",
    title: "10 Interview Mistakes That Cost Rwandan Candidates the Job",
    excerpt: "The most common interview errors and how to avoid them in Rwanda's competitive job market.",
    body: [
      {
        heading: "The Mistakes",
        paragraphs: [
          "1. No research about the company. 'I don't know what your company does' is an instant rejection. Spend 30 minutes researching before every interview.",
          "2. Vague answers without examples. 'I'm a team player' means nothing. 'Led a team of 5 to deliver a project 2 weeks early' means everything.",
          "3. Badmouthing previous employers. In Rwanda's small professional community, this is especially damaging. Frame departures positively.",
          "4. Focusing only on salary. Show genuine interest in the role and company first.",
          "5. Not asking questions. 'No questions' signals disinterest. Prepare 3-5 thoughtful questions.",
          "6. Inconsistency between CV and interview answers. Interviewers cross-reference. Be consistent.",
          "7. Being too casual. Even in startup culture, professional attire and language are expected in Rwanda.",
          "8. Not following up. A thank-you note within 24 hours is professional and memorable.",
          "9. Lying or exaggerating. Rwanda's network is small. The truth always comes out.",
          "10. Showing desperation. 'I really need this job' is off-putting. 'I'm excited about this opportunity because...' is compelling.",
        ],
      },
      {
        heading: "How to Avoid These Mistakes",
        paragraphs: [
          "Prepare systematically: Research company, prepare STAR stories, practise answers aloud, prepare questions.",
          "Be honest about gaps and weaknesses. Rwandan interviewers respect maturity and self-awareness.",
          "Dress professionally regardless of company culture. You can always dress down later.",
          "Send a thank-you message within 4 hours of the interview.",
        ],
      },
    ],
    takeaways: [
      "Research company for 30 minutes before every interview",
      "Always use STAR examples with specific numbers",
      "Never badmouthing previous employers",
      "Prepare 3-5 thoughtful questions to ask",
      "Be honest — Rwanda's network is small, lies get found out",
      "Send thank-you within 4 hours",
    ],
    faq: [
      { q: "What's the single biggest interview mistake in Rwanda?", a: "Not researching the company. It's the easiest thing to fix and the most common reason for rejection at the first stage." },
    ],
  },
];

export default interviewPreparation;
