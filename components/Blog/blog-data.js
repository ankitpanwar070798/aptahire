export function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const blogPosts = [
  {
    id: 1,
    title: "How AI is Transforming the Recruitment Process in 2026",
    excerpt:
      "From automated screening to predictive analytics, artificial intelligence is fundamentally reshaping how companies identify, attract, and hire top talent. We explore what this means for HR teams today.",
    content: `
      <p>Artificial intelligence has moved from a buzzword to a boardroom priority in talent acquisition. In 2026, over 75% of Fortune 500 companies now use some form of AI in their hiring pipeline — a staggering jump from just 12% five years ago.</p>
      <h2>Automated Resume Screening</h2>
      <p>Modern ATS platforms powered by large language models can now parse thousands of resumes in seconds, ranking candidates not just by keyword match but by contextual relevance. This reduces initial screening time by up to 80%, freeing recruiters to focus on relationship-building.</p>
      <h2>Predictive Candidate Scoring</h2>
      <p>Machine learning models trained on historical hiring data can now predict which candidates are likely to stay beyond 12 months, reach high performance within 6 months, and align with team culture — all before the first interview.</p>
      <h2>Bias Mitigation</h2>
      <p>When implemented thoughtfully, AI tools can help reduce unconscious bias by anonymizing demographic information during initial screening. However, this requires careful dataset curation and ongoing auditing.</p>
      <h2>What This Means for HR Professionals</h2>
      <p>AI doesn't replace recruiters — it amplifies them. The most effective hiring teams in 2026 treat AI as a co-pilot: it handles volume and pattern recognition, while humans handle judgment, empathy, and cultural assessment.</p>
      <p>The critical skill for modern HR is now understanding how to configure, audit, and collaborate with these systems rather than compete with them.</p>
    `,
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    categories: ["AI in HR", "Recruitment Technology"],
    date: "March 18, 2026",
    dateISO: "2026-03-18",
    author: "Priya Ramesh",
    authorRole: "Head of Talent Strategy",
    readTime: "6 min read",
  },
  {
    id: 2,
    title: "Writing Job Descriptions That Actually Attract Great Candidates",
    excerpt:
      "Most job descriptions are a laundry list of requirements. The best ones tell a story. Here's a framework for writing JDs that speak to the candidates you actually want to hire.",
    content: `
      <p>The average job description is read for 49 seconds before a candidate decides to apply or bounce. In those 49 seconds, you're competing with hundreds of other open roles. Your JD is your first impression — make it count.</p>
      <h2>Lead With Impact, Not Requirements</h2>
      <p>Start with what the person in this role will accomplish in their first 90 days, not a list of qualifications. "You'll lead the migration of our analytics stack to a real-time architecture, directly impacting how 200 teams make decisions" is infinitely more compelling than "5+ years of data engineering experience required."</p>
      <h2>The 70/30 Rule</h2>
      <p>Research shows that candidates — especially women and underrepresented groups — are far less likely to apply if they don't meet every listed requirement. Aim for 70% essential requirements, 30% nice-to-haves. Be explicit about which is which.</p>
      <h2>Culture Signals Over Culture Fit</h2>
      <p>Replace vague phrases like "fast-paced environment" and "team player" with specific, observable behaviours: "We do weekly retrospectives and expect everyone to be candid about what's not working" tells a candidate far more.</p>
      <h2>Salary Transparency</h2>
      <p>In 2026, salary ranges are now mandated in most major hiring markets. Beyond compliance, publishing ranges reduces negotiation friction and signals a culture of fairness. Candidates who know the range before applying are 40% more likely to accept an offer.</p>
    `,
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80",
    categories: ["Recruitment", "Employer Branding"],
    date: "March 12, 2026",
    dateISO: "2026-03-12",
    author: "Karan Mehta",
    authorRole: "Senior Recruiter",
    readTime: "5 min read",
  },
  {
    id: 3,
    title: "The Complete Guide to Structured Interviews in 2026",
    excerpt:
      "Unstructured interviews are barely better than a coin flip at predicting job performance. Structured interviews, done right, are among the most powerful hiring tools available. Here's how to run them.",
    content: `
      <p>Meta-analyses of hiring research consistently show structured interviews have roughly twice the predictive validity of unstructured conversations. Despite this, fewer than 30% of companies use them consistently. Here's your practical blueprint.</p>
      <h2>Define the Competency Framework First</h2>
      <p>Before writing a single question, map the 4-6 competencies that actually predict success in the role. For a senior engineer: technical depth, system design thinking, cross-functional communication, and ownership. For a sales leader: pipeline discipline, coaching instinct, and executive presence.</p>
      <h2>Behavioural vs. Situational Questions</h2>
      <p>Behavioural questions ask about past experience ("Tell me about a time you…"). Situational questions present hypothetical scenarios ("How would you handle…"). Research suggests behavioural questions have stronger predictive validity, but the best interviews use both.</p>
      <h2>Calibrated Scoring Rubrics</h2>
      <p>Without a scoring rubric, interviewers default to gut feel and first impressions. Build a 1-5 scale with behavioural anchors for each score. "5 = Candidate proactively identified system-level risks and drove alignment across teams without being asked" is far more useful than "5 = Excellent".</p>
      <h2>Panel Debrief Protocol</h2>
      <p>Require all interviewers to submit scores independently before the debrief. This prevents anchoring bias, where the first opinion expressed disproportionately influences the group. Discuss outliers first.</p>
    `,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    categories: ["Interviewing", "Best Practices"],
    date: "March 5, 2026",
    dateISO: "2026-03-05",
    author: "Deepa Nair",
    authorRole: "Talent Operations Lead",
    readTime: "8 min read",
  },
  {
    id: 4,
    title: "Employee Retention in a Hybrid World: What the Data Says",
    excerpt:
      "Three years after the great return-to-office debate, the data is in. Companies that got hybrid right are retaining talent at 2.4x the rate of those who didn't. Here's what separates them.",
    content: `
      <p>The hybrid work debate has largely settled — not because one side won, but because the companies still fighting it are losing talent to those that figured it out. Here's what the 2026 data tells us.</p>
      <h2>Autonomy Over Presence</h2>
      <p>The single strongest predictor of retention in hybrid teams is not how many days employees are in-office — it's how much autonomy they have over when those days are. Mandated specific days show 23% higher attrition than flexible-day-choice hybrid policies.</p>
      <h2>The Proximity Bias Problem</h2>
      <p>Remote employees are still 18% less likely to be promoted in companies without explicit anti-proximity-bias processes. High-retention hybrid companies solve this through visibility parity: performance review calibrations that require contribution evidence, not presence evidence.</p>
      <h2>Manager Quality Is Everything</h2>
      <p>In hybrid teams, the variance in experience is driven overwhelmingly by management quality. A great manager leading a hybrid team achieves retention rates comparable to fully co-located teams. The investment with the highest ROI? Manager training for async communication and distributed leadership.</p>
      <h2>The Onboarding Gap</h2>
      <p>Hybrid employees hired fully remotely in their first 90 days are 31% more likely to leave within a year. The fix is deliberate: structured in-person onboarding weeks, assigned buddies, and explicit social time — not just team meetings.</p>
    `,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    categories: ["Employee Relations", "Retention"],
    date: "February 27, 2026",
    dateISO: "2026-02-27",
    author: "Ananya Singh",
    authorRole: "People Analytics Lead",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "LinkedIn Outreach That Gets Responses: A Recruiter's Playbook",
    excerpt:
      "The average InMail response rate is 18%. Top recruiters consistently hit 45-60%. The difference isn't luck — it's a repeatable system. Here's ours.",
    content: `
      <p>Passive candidate outreach is both the most powerful and most abused channel in modern recruiting. Done well, it builds genuine talent relationships. Done poorly — and it usually is — it pollutes your employer brand and trains candidates to ignore you.</p>
      <h2>The 3-Second Rule</h2>
      <p>When a candidate opens your message, you have three seconds before they decide to close it. Your opening line must immediately answer "why me, why now?" — not introduce yourself, not explain your company, not list the role. Lead with what you noticed about them specifically.</p>
      <h2>Research at Scale</h2>
      <p>The irony of personalization at scale is that it requires process. Build a research template: recent post or article they published, a project on their profile, a mutual connection, a career transition worth acknowledging. Spend 3-4 minutes per candidate — no more, no less.</p>
      <h2>The Role of AI Message Generators</h2>
      <p>Tools like Aptahire's LinkedIn Message Generator can draft the structural scaffold of your outreach in seconds, giving you a strong foundation to personalize. The key is treating AI output as a first draft, not a finished message — add one specific observation about the candidate to every template.</p>
      <h2>Follow-Up Cadence</h2>
      <p>If you don't hear back, follow up once — just once — after 5 business days with a brief, low-pressure message. Two-message campaigns yield 28% more responses than single-message campaigns. Three or more messages yield diminishing returns and brand damage.</p>
    `,
    image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&q=80",
    categories: ["Recruitment", "Sourcing"],
    date: "February 19, 2026",
    dateISO: "2026-02-19",
    author: "Rohan Krishnan",
    authorRole: "Lead Sourcing Specialist",
    readTime: "6 min read",
  },
  {
    id: 6,
    title: "Building a Competency Framework from Scratch",
    excerpt:
      "A well-built competency framework aligns hiring, performance reviews, learning paths, and succession planning. Most companies don't have one. Here's how to build yours in 30 days.",
    content: `
      <p>A competency framework is one of the most leveraged investments an HR team can make. When done right, it becomes the connective tissue between every people process — hiring rubrics, performance conversations, learning investments, and promotion criteria all speak the same language.</p>
      <h2>Start With Roles, Not Theory</h2>
      <p>The most common mistake is starting with industry frameworks or generic competency libraries. Start instead with your highest performers in each function. Interview 3-5 of them: "Walk me through how you approached your biggest win in the last 12 months." Mine for behaviours, not attributes.</p>
      <h2>The Architecture: Levels and Functions</h2>
      <p>A clean framework has two axes: seniority level (Individual Contributor → Senior → Lead → Manager → Director+) and functional domain (Engineering, Sales, Operations, etc.). Core competencies apply across all functions at all levels. Functional competencies are role-specific.</p>
      <h2>Behavioural Anchors Are Non-Negotiable</h2>
      <p>"Strong communicator" is useless as a competency. "Proactively shares context that helps teammates make better decisions without being asked" is observable and coachable. Every competency needs at least three behavioural anchors per level.</p>
      <h2>Piloting and Iteration</h2>
      <p>Run your framework through one full performance cycle before rolling it out company-wide. Collect calibration data. Where do managers disagree most? Those are the competencies with under-specified anchors. Refine before scaling.</p>
    `,
    image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=800&q=80",
    categories: ["Performance Management", "HR Strategy"],
    date: "February 10, 2026",
    dateISO: "2026-02-10",
    author: "Priya Ramesh",
    authorRole: "Head of Talent Strategy",
    readTime: "9 min read",
  },
  {
    id: 7,
    title: "Psychometric Testing: What Works, What Doesn't, and What's Overhyped",
    excerpt:
      "Not all assessments are created equal. We break down the science behind cognitive tests, personality inventories, and situational judgment tests — and which ones you should actually use.",
    content: `
      <p>The assessment industry is a $4.5 billion market built on a mix of rigorous science and confident pseudoscience. Knowing which is which is one of the most important skills a modern talent professional can develop.</p>
      <h2>What the Research Actually Says</h2>
      <p>General cognitive ability (GCA) tests remain the single strongest predictor of job performance across all roles and levels, with a validity coefficient of ~0.51. Work sample tests are close behind at ~0.44. Most personality inventories hover around 0.15-0.22 — useful in combination, not as standalone screens.</p>
      <h2>The Myers-Briggs Problem</h2>
      <p>MBTI has test-retest reliability problems: 50% of people get a different type when retested after 5 weeks. Despite this, it remains one of the most widely used assessments in corporate settings. Use it for team communication workshops if you must — never for hiring decisions.</p>
      <h2>What Actually Works</h2>
      <p>The assessment stack with the strongest predictive validity combines: a cognitive ability test, a structured work sample or technical exercise, a conscientiousness measure from a validated Big Five inventory, and a structured behavioural interview. Together, these have cumulative validity that no single tool can match.</p>
      <h2>Candidate Experience Considerations</h2>
      <p>Assessment dropout is a real cost. Assessments over 45 minutes see completion rates drop below 60% for senior candidates. Keep it focused, explain why each component matters, and share results where possible — it signals respect.</p>
    `,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    categories: ["Interviewing", "HR Technology"],
    date: "January 28, 2026",
    dateISO: "2026-01-28",
    author: "Deepa Nair",
    authorRole: "Talent Operations Lead",
    readTime: "7 min read",
  },
  {
    id: 8,
    title: "Onboarding in 2026: From Day One to Day Ninety",
    excerpt:
      "69% of employees are more likely to stay at a company for 3 years if they experienced great onboarding. Yet 88% of companies are doing it poorly. Here's a framework for the whole 90-day arc.",
    content: `
      <p>Onboarding isn't an event — it's a 90-day programme with three distinct phases, each with different goals. Treating it as orientation paperwork and a laptop setup is one of the most expensive mistakes companies make.</p>
      <h2>Phase 1: Orientation (Days 1-15)</h2>
      <p>Goal: eliminate confusion, establish belonging. Deliverables: system access, role clarity, team introduction, cultural immersion. The most impactful single intervention? An assigned peer buddy for the first 30 days — data shows it reduces time-to-productivity by 25% and increases 6-month satisfaction scores by 36%.</p>
      <h2>Phase 2: Integration (Days 16-60)</h2>
      <p>Goal: first contribution, relationship building. New hires should have their first meaningful deliverable by day 30 — not a major project, but something they can own and complete. This signals competence, builds confidence, and gives the team something real to give feedback on.</p>
      <h2>Phase 3: Contribution (Days 61-90)</h2>
      <p>Goal: independent operation, feedback loop. The 90-day check-in should be a structured conversation — not a performance review, but a forward-looking alignment: "What do you need to do your best work? What are we not telling you that you should know? Where do you see yourself in 12 months?"</p>
      <h2>Remote and Hybrid Onboarding</h2>
      <p>Remote onboarding requires 40% more deliberate planning than co-located onboarding. The most critical missing element is informal social interaction — build it explicitly with virtual coffees, team lunches on expense, and an in-person team week in the first 60 days whenever possible.</p>
    `,
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    categories: ["Employee Development", "HR Best Practices"],
    date: "January 15, 2026",
    dateISO: "2026-01-15",
    author: "Karan Mehta",
    authorRole: "Senior Recruiter",
    readTime: "8 min read",
  },
];

export const allCategories = [...new Set(blogPosts.flatMap((p) => p.categories))].sort();

export function getPostBySlug(slug) {
  return blogPosts.find((p) => slugify(p.title) === slug) || null;
}
