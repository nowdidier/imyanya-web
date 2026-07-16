export const coverLetterGenerator = {
  id: "cover-letter-generator",
  name: "Cover Letter Tips & Templates",
  slug: "cover-letter-generator",
  category: "Template",
  description: "Access cover letter templates, tips, and best practices for Rwandan job applications. Learn how to structure your cover letter for different sectors and roles.",
  icon: "EmailIcon",
  inputs: [
    { id: "sector", label: "Target Sector", type: "select", required: true, options: [
      { value: "corporate", label: "Corporate / Private Sector" },
      { value: "ngo", label: "NGO / International Organization" },
      { value: "government", label: "Government / Public Sector" },
      { value: "tech", label: "Technology / Startup" },
      { value: "academia", label: "Academia / Research" },
      { value: "creative", label: "Creative / Media" },
    ]},
    { id: "experience-level", label: "Experience Level", type: "select", required: true, options: [
      { value: "entry", label: "Entry Level / Fresh Graduate" },
      { value: "mid", label: "Mid-Level Professional" },
      { value: "senior", label: "Senior / Executive" },
    ]},
    { id: "application-method", label: "Application Method", type: "select", required: true, options: [
      { value: "email", label: "Email Attachment" },
      { value: "portal", label: "Online Portal Upload" },
      { value: "physical", label: "Hard Copy / In Person" },
    ]},
  ],
  outputs: [
    { id: "template-structure", label: "Recommended Structure", type: "table", format: "sections" },
    { id: "full-example", label: "Example Cover Letter", type: "text", format: "example" },
    { id: "dos-and-donts", label: "Dos and Don'ts", type: "table", format: "list" },
    { id: "key-phrases", label: "Key Phrases to Use", type: "text", format: "list" },
    { id: "rwanda-specific-tips", label: "Rwanda-Specific Tips", type: "text", format: "tips" },
    { id: "email-guide", label: "Email Application Guide", type: "text", format: "guide" },
  ],
  templates: [
    {
      sector: "corporate",
      level: "mid",
      structure: {
        sections: [
          { name: "Header", content: "Your name, contact, date, recipient details" },
          { name: "Subject / Re:", content: "Application for [Role] - [Your Name]" },
          { name: "Salutation", content: "Dear [Mr./Ms. Last Name]," },
          { name: "Opening Paragraph", content: "Introduce yourself, the role you are applying for, and a brief hook" },
          { name: "Body Paragraph 1", content: "Relevant experience and achievements (2-3 key accomplishments)" },
          { name: "Body Paragraph 2", content: "Why you want this role and why you fit the company culture" },
          { name: "Closing Paragraph", content: "Call to action (request for interview), availability, thanks" },
          { name: "Sign Off", content: "Sincerely, [Your Name]" },
        ],
        length: "One page (300-400 words)",
      },
      example: `Dear [Hiring Manager Name],

I am writing to apply for the [Role Title] position at [Company Name], as advertised on Imyanya.rw. With [X] years of experience in [field/industry] and a track record of [key achievement], I am confident I can contribute meaningfully to your team.

In my current role at [Current Company], I [describe a specific achievement with metrics]. For example, I led [project] that resulted in [quantified result - e.g., 20% increase in efficiency / 50M RWF in savings]. This experience has equipped me with [skill 1], [skill 2], and [skill 3] that are directly relevant to this role.

I am particularly drawn to [Company Name] because of [specific reason - e.g., your commitment to innovation, your market leadership, specific company value]. I share your passion for [value] and would be excited to bring my expertise in [area] to your team.

I would welcome the opportunity to discuss how my skills and experience align with your needs. I am available for an interview at your convenience and can be reached at [phone] or [email].

Thank you for considering my application.

Sincerely,
[Your Name]`,
      dos: ["Customize each cover letter for the role", "Quantify achievements with specific numbers", "Address to a specific person if possible", "Keep to one page", "Proofread carefully"],
      donts: ["Use generic opening lines", "Repeat your CV verbatim", "Focus only on what you want, not what you offer", "Use informal language or emojis", "Exceed one page"],
      keyPhrases: ["Proven track record of", "Successfully led/managed", "Drove [X%] improvement in", "Demonstrated expertise in", "Passionate about [industry/field]"],
      rwandaTips: ["Mention your language proficiency (English, French, Kinyarwanda)", "If you have local market knowledge, highlight it", "Reference specific initiatives or challenges in Rwanda's sector", "Include your +250 phone number"],
    },
    {
      sector: "ngo",
      level: "mid",
      structure: {
        sections: [
          { name: "Header", content: "Your name, contact, date, recipient details" },
          { name: "Subject / Re:", content: "Application for [Role] - [Your Name]" },
          { name: "Salutation", content: "Dear [Title Last Name]," },
          { name: "Opening Paragraph", content: "Role applied for, your current role, and your passion for the mission" },
          { name: "Body Paragraph 1", content: "Relevant experience in development programs, key results achieved" },
          { name: "Body Paragraph 2", content: "Understanding of the sector, specific expertise, alignment with values" },
          { name: "Closing Paragraph", content: "Motivation for the role, availability, contact" },
          { name: "Sign Off", content: "Sincerely, [Your Name]" },
        ],
        length: "One page (350-450 words)",
      },
      example: `Dear [Hiring Manager Name],

I am writing to express my interest in the [Role Title] position at [Organization Name]. With a Master's degree in [field] and [X] years of experience in the development sector in Rwanda, I am committed to advancing [organization's mission].

In my current role at [Current Organization], I have [describe achievement with metrics - e.g., managed a 200M RWF program reaching 5,000 beneficiaries]. My experience in [specific areas] has prepared me to contribute effectively to your team.

I am particularly aligned with [Organization Name]'s work in [specific area]. Having worked in [district/community], I understand the local context and challenges. My skills in [skill 1], [skill 2], and [skill 3] will allow me to [specific contribution].

I would welcome the opportunity to discuss how my experience in the development sector aligns with your needs. I am available for an interview at your convenience.

Thank you for considering my application.

Sincerely,
[Your Name]`,
      dos: ["Highlight specific development sector experience", "Mention languages and cross-cultural competence", "Reference relevant SDGs or national development goals", "Show understanding of donor requirements", "Emphasize stakeholder management skills"],
      donts: ["Focus only on salary or benefits", "Use generic corporate language", "Ignore the organization's specific mission and values", "Make exaggerated claims about impact", "Overlook reporting and M&E experience"],
      keyPhrases: ["Community engagement and stakeholder participation", "Monitoring and evaluation of programs", "Results-based management", "Capacity building and training", "Cross-sectoral collaboration"],
      rwandaTips: ["Reference knowledge of Rwanda's development context (Vision 2050, NST1)", "Mention experience working with local communities in Rwanda", "Include Kinyarwanda proficiency level", "Highlight familiarity with donor requirements (USAID, DFID, EU, UN)"],
    },
    {
      sector: "tech",
      level: "mid",
      structure: {
        sections: [
          { name: "Header", content: "Name, contact, portfolio/GitHub URL, LinkedIn" },
          { name: "Subject", content: "Application for [Role] - [Your Name]" },
          { name: "Salutation", content: "Dear [Hiring Manager / Team Name]," },
          { name: "Opening", content: "Role applied for, current role, brief technical hook" },
          { name: "Body 1", content: "Technical experience, projects, and technologies" },
          { name: "Body 2", content: "Impact / results from your work, collaboration" },
          { name: "Closing", content: "Link to portfolio/GitHub, interview request" },
          { name: "Sign Off", content: "Best regards, [Your Name]" },
        ],
        length: "Half to one page (250-350 words)",
      },
      example: `Hi [Hiring Manager Name / Team],

I'm applying for the [Role Title] role at [Company Name]. I'm a [type of developer/tech professional] with [X] years of experience building [type of products] using [key tech stack].

Most recently at [Current Company], I [key achievement - e.g., built a payment system handling 10k+ daily transactions reducing processing time by 40%]. I used [tech stack] and collaborated with [cross-functional teams].

I'm excited about [Company Name] because [specific reason - e.g., your work in fintech / your focus on the African market]. I've been following your [product/company news] and have ideas about [relevant topic].

You can see my work at: [portfolio/GitHub URL]

I'd love to chat about how I can contribute. I'm available for a technical interview at your convenience.

Best regards,
[Your Name]`,
      dos: ["Include links to GitHub, portfolio, or project demos", "Be specific about tech stack and experience level", "Show enthusiasm for the company's product", "Keep it concise - tech hiring managers read quickly", "Mention relevant side projects"],
      donts: ["Use overly formal language for startups", "Ignore the company's tech stack - mention it if relevant", "Forget to include links to your work", "Make it too generic - show the role research", "Hide your location - mention if you are in Kigali"],
      keyPhrases: ["Built and deployed", "Reduced [X] by [Y]%", "Implemented [tech] to solve [problem]", "Collaborated with cross-functional teams", "Experienced with [tech stack]"],
      rwandaTips: ["Rwanda's tech ecosystem values problem-solving and adaptability", "Mention if you have experience with mobile money or payments (common in Rwanda)", "Language proficiency in English is critical for tech roles", "Kigali-based tech meetups and communities are good to mention"],
    },
  ],
  tips: [
    "Always customize your cover letter for each specific role - never use the same one twice",
    "Address the letter to a named person if possible (check LinkedIn or company website)",
    "Use the first paragraph to grab attention with your strongest selling point",
    "Quantify achievements with numbers that show your impact",
    "Keep to one page - Rwandan employers prefer concise applications",
    "Proofread multiple times and ask someone else to review it",
    "Save as PDF with a professional filename",
  ],
  relatedTools: ["cv-checklist", "resume-templates", "interview-question-bank"],
  metaTitle: "Cover Letter Tips & Templates | Job Applications Rwanda | Imyanya.rw",
  metaDescription: "Cover letter templates for Rwandan job seekers. Sector-specific examples for corporate, NGO, and tech roles with best practices and examples.",
};

export default coverLetterGenerator;
