export const interviewScorecard = {
  id: "interview-scorecard",
  name: "Interview Self-Assessment Scorecard",
  slug: "interview-scorecard",
  category: "Checklist",
  description: "Self-assess your interview performance across key competency areas with this structured scorecard designed for Rwandan job seekers.",
  icon: "AssignmentIcon",
  inputs: [
    { id: "role-type", label: "Role Type Being Assessed", type: "select", required: true, options: [
      { value: "entry", label: "Entry Level / Graduate" },
      { value: "professional", label: "Professional / Individual Contributor" },
      { value: "manager", label: "Manager / Team Lead" },
      { value: "senior-manager", label: "Senior Manager / Director" },
      { value: "executive", label: "Executive / C-Level" },
    ]},
    { id: "sector", label: "Sector", type: "select", required: true, options: [
      { value: "private", label: "Private Sector / Corporate" },
      { value: "government", label: "Government / Public Sector" },
      { value: "ngo", label: "NGO / International Organization" },
      { value: "tech", label: "Technology / IT" },
      { value: "finance", label: "Banking / Finance" },
    ]},
  ],
  outputs: [
    { id: "total-score", label: "Total Score", type: "number", format: "out of 100" },
    { id: "category-scores", label: "Category Scores", type: "chart", format: "radar-chart" },
    { id: "overall-rating", label: "Overall Rating", type: "text", format: "rating label" },
    { id: "strengths", label: "Strengths Identified", type: "table", format: "list" },
    { id: "areas-to-improve", label: "Areas for Improvement", type: "table", format: "list" },
    { id: "recommendations", label: "Recommended Actions", type: "text", format: "action items" },
  ],
  categories: [
    {
      name: "Preparation & Research",
      weight: 15,
      questions: [
        { id: "company-research", text: "Researched company background, mission, and values", options: [
          { value: 0, label: "No research done" },
          { value: 1, label: "Read the website briefly" },
          { value: 2, label: "Researched company and recent news" },
          { value: 3, label: "Deep research including financials, culture, and competitors" },
        ]},
        { id: "role-understanding", text: "Understand the role requirements and responsibilities", options: [
          { value: 0, label: "Read the job description once" },
          { value: 1, label: "General understanding of role" },
          { value: 2, label: "Clear understanding with specific examples prepared" },
          { value: 3, label: "Deep understanding with STAR stories mapped to each requirement" },
        ]},
        { id: "questions-prepared", text: "Prepared thoughtful questions for the interviewer", options: [
          { value: 0, label: "No questions prepared" },
          { value: 1, label: "1-2 generic questions" },
          { value: 2, label: "3-4 role-specific questions" },
          { value: 3, label: "5+ insightful questions showing deep research" },
        ]},
        { id: "logistics", text: "Managed logistics (time, location, attire, documents)", options: [
          { value: 0, label: "Arranged nothing in advance" },
          { value: 1, label: "Confirmed time and basic preparation" },
          { value: 2, label: "Arrived early with copies of CV and documents" },
          { value: 3, label: "Fully prepared with all materials, professional attire, and backup plan" },
        ]},
      ],
    },
    {
      name: "Communication & Presentation",
      weight: 20,
      questions: [
        { id: "introduction", text: "Delivered a clear, confident self-introduction", options: [
          { value: 0, label: "Unclear and rambling introduction" },
          { value: 1, label: "Basic introduction with key points" },
          { value: 2, label: "Structured introduction with career narrative" },
          { value: 3, label: "Compelling introduction tailored to role and company" },
        ]},
        { id: "clarity", text: "Communicated clearly and concisely", options: [
          { value: 0, label: "Long-winded and unclear responses" },
          { value: 1, label: "Somewhat clear with occasional tangents" },
          { value: 2, label: "Clear, concise responses with good structure" },
          { value: 3, label: "Exceptionally clear, structured, and impactful responses" },
        ]},
        { id: "language", text: "Used appropriate professional language", options: [
          { value: 0, label: "Informal or inappropriate language" },
          { value: 1, label: "Mostly professional with some lapses" },
          { value: 2, label: "Professional language throughout" },
          { value: 3, label: "Polished, confident language with sector-specific vocabulary" },
        ]},
        { id: "body-language", text: "Demonstrated positive body language and engagement", options: [
          { value: 0, label: "Poor posture, no eye contact" },
          { value: 1, label: "Adequate posture and occasional eye contact" },
          { value: 2, label: "Good posture, steady eye contact, engaged" },
          { value: 3, label: "Excellent presence, confident, and naturally engaging" },
        ]},
      ],
    },
    {
      name: "STAR Stories & Competencies",
      weight: 25,
      questions: [
        { id: "star-format", text: "Used STAR format (Situation, Task, Action, Result)", options: [
          { value: 0, label: "No structure in responses" },
          { value: 1, label: "Occasional use of STAR format" },
          { value: 2, label: "Consistently used STAR format" },
          { value: 3, label: "Masterful STAR stories with quantified results" },
        ]},
        { id: "relevant-examples", text: "Provided relevant, role-specific examples", options: [
          { value: 0, label: "No concrete examples given" },
          { value: 1, label: "Some examples but not fully relevant" },
          { value: 2, label: "Relevant examples matching role requirements" },
          { value: 3, label: "Highly relevant examples that directly address job challenges" },
        ]},
        { id: "achievement-focus", text: "Emphasized achievements and impact", options: [
          { value: 0, label: "Listed responsibilities only" },
          { value: 1, label: "Some achievements mentioned" },
          { value: 2, label: "Clear achievements with metrics" },
          { value: 3, label: "Compelling achievements with significant quantified impact" },
        ]},
        { id: "problem-solving", text: "Demonstrated problem-solving and analytical thinking", options: [
          { value: 0, label: "No evidence of problem-solving" },
          { value: 1, label: "Basic problem description" },
          { value: 2, label: "Showed analytical approach and solution" },
          { value: 3, label: "Demonstrated structured thinking with innovative solutions" },
        ]},
      ],
    },
    {
      name: "Technical & Role-Specific",
      weight: 20,
      questions: [
        { id: "technical-knowledge", text: "Demonstrated required technical knowledge", options: [
          { value: 0, label: "Unable to answer technical questions" },
          { value: 1, label: "Basic knowledge with gaps" },
          { value: 2, label: "Solid technical knowledge" },
          { value: 3, label: "Expert-level knowledge with practical experience" },
        ]},
        { id: "industry-awareness", text: "Showed awareness of industry trends and challenges", options: [
          { value: 0, label: "No industry awareness" },
          { value: 1, label: "Basic awareness of sector" },
          { value: 2, label: "Good understanding of industry dynamics" },
          { value: 3, label: "Deep insights into industry trends and challenges in Rwanda" },
        ]},
        { id: "tools-expertise", text: "Demonstrated proficiency with required tools/software", options: [
          { value: 0, label: "No experience with required tools" },
          { value: 1, label: "Basic familiarity" },
          { value: 2, label: "Proficient user" },
          { value: 3, label: "Advanced user with implementation experience" },
        ]},
      ],
    },
    {
      name: "Cultural Fit & Soft Skills",
      weight: 20,
      questions: [
        { id: "teamwork", text: "Demonstrated teamwork and collaboration", options: [
          { value: 0, label: "Seemed individualistic" },
          { value: 1, label: "Some teamwork examples" },
          { value: 2, label: "Strong collaboration examples" },
          { value: 3, label: "Exceptional team player with leadership qualities" },
        ]},
        { id: "adaptability", text: "Showed adaptability and willingness to learn", options: [
          { value: 0, label: "Seemed rigid and resistant" },
          { value: 1, label: "Acknowledged need to learn" },
          { value: 2, label: "Demonstrated learning agility" },
          { value: 3, label: "Showed growth mindset with examples of adaptation" },
        ]},
        { id: "values-alignment", text: "Aligned personal values with company culture", options: [
          { value: 0, label: "Did not connect values" },
          { value: 1, label: "Vague alignment mentioned" },
          { value: 2, label: "Clear values alignment demonstrated" },
          { value: 3, label: "Strong personal connection to company mission" },
        ]},
        { id: "enthusiasm", text: "Showed genuine enthusiasm for the role", options: [
          { value: 0, label: "Seemed disinterested" },
          { value: 1, label: "Polite but neutral" },
          { value: 2, label: "Visibly engaged and interested" },
          { value: 3, label: "Passionate and highly motivated" },
        ]},
      ],
    },
  ],
  ratingRanges: [
    { min: 90, max: 100, label: "Excellent", color: "green", description: "Highly likely to receive an offer. Great fit for the role." },
    { min: 75, max: 89, label: "Good", color: "blue", description: "Strong performance. Stand a good chance but may have minor gaps." },
    { min: 60, max: 74, label: "Average", color: "yellow", description: "Acceptable performance. Work on specific areas to improve." },
    { min: 40, max: 59, label: "Below Average", color: "orange", description: "Need significant improvement in multiple areas." },
    { min: 0, max: 39, label: "Needs Work", color: "red", description: "Consider more preparation and practice before next interview." },
  ],
  tips: [
    "Rate yourself honestly - this is for your self-improvement, not for sharing",
    "Record your interview (voice memo) if permitted to review your responses later",
    "Focus more on lower-scoring categories - these are your growth areas",
    "Practice STAR stories until they feel natural and conversational",
    "For Rwanda-specific roles, highlight local market knowledge and language skills",
    "Ask for feedback after the interview if the employer offers it",
  ],
  relatedTools: ["interview-question-bank", "interview-countdown", "career-assessment"],
  metaTitle: "Interview Self-Assessment Scorecard | Rate Your Performance | Imyanya.rw",
  metaDescription: "Self-assess your interview performance with this structured scorecard. Rate yourself on preparation, communication, STAR stories, and cultural fit for Rwandan jobs.",
};

export default interviewScorecard;
