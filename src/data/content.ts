// ─── Central Content Config ───────────────────────────────────────────────────
// Edit this file to update all portfolio content in one place.

export const PERSONAL = {
  name: 'Sambangi Eswar Rao',
  initials: 'SER',
  taglines: ['Aspiring Data Analyst'],
  bio: [
    "I'm a passionate data analyst focused on building data-driven solutions and applying machine learning models to solve real-world problems.",
    "From developing comprehensive Power BI dashboards for retail sales to analyzing complex environmental datasets with Python and Excel, I enjoy uncovering meaningful patterns in data.",
    "I thrive at the intersection of statistical analysis, predictive modeling, and intelligent data systems. My goal: transform raw data into actionable insights that drive impact.",
  ],
  email: 'sambangieswar10@gmail.com',
  github: 'https://github.com/eswarrao10',
  linkedin: 'https://www.linkedin.com/in/eswarrao/',
  twitter: '',
  resumeUrl: 'https://drive.google.com/file/d/1rLdLViegyN6v7fyyvNNOD-iXW2ZPv2cT/view?usp=drive_link',
  availableForWork: true,
};

export const PROJECTS = [
  {
    title: 'Air Quality Analysis',
    subtitle: 'Machine Learning Classification',
    description:
      'Analyzed Indian Air Quality Index (AQI) data and developed an end-to-end machine learning pipeline including data cleaning, feature engineering, and exploratory data analysis. Built and evaluated ML models and applied K-Means clustering using Scikit-learn.',
    tech: ['Python', 'Pandas', 'Numpy', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
    github: 'https://github.com/eswarrao10/Air-Quality-Analysis',
    live: null,
    number: '01',
    gradient: 'from-rose-500/20 via-red-500/10 to-transparent',
    accentColor: 'hsl(355 80% 55%)',
    stats: [
      { label: 'R² Score', value: '0.85' },
      { label: 'Vis', value: 'Seaborn' },
    ],
  },
  {
    title: 'Zudio Retail Sales Analytics',
    subtitle: 'Oct’ 25 - Dec’ 25',
    description:
      'Designed a multi-page Power BI dashboard to analyze retail sales KPIs, processing 10k+ sales records to understand revenue, orders, quantity, and average order value trends. Developed 15+ interactive visuals, 10+ custom measures, tracking top 5 products and improving insight retrieval time by ~40%.',
    tech: ['Power BI', 'Data Analytics', 'DAX', 'Data Modeling'],
    github: 'https://github.com/eswarrao10/ZUDIO-Retail-Analytics/tree/main',
    live: null,
    number: '02',
    gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
    accentColor: 'hsl(200 80% 55%)',
    stats: [
      { label: 'Platform', value: 'Power BI' },
      { label: 'Data', value: '10k+ Rows' },
    ],
  },
  {
    title: 'Rain Analysis',
    subtitle: 'March 2025',
    description:
      'Studied rainfall patterns in India to understand seasonal and regional variations. Developed visualizations with boxplots and heatmaps, and conducted statistical analyses (t-test, correlation) to identify significant monsoon shifts.',
    tech: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'SciPy'],
    github: 'https://github.com/eswarrao10/Rain-Analysis',
    live: null,
    number: '03',
    gradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
    accentColor: 'hsl(270 60% 60%)',
    stats: [
      { label: 'Scope', value: '114 Years' },
      { label: 'Language', value: 'Python' },
    ],
  },
  {
    title: 'Air Quality Dashboard',
    subtitle: 'April 2025',
    description:
      'Analyzed air-quality metrics across regions and time periods by processing and cleaning 15,000+ data entries. Built an interactive Excel dashboard using pivot tables and calculated fields, increasing pollutant-trend interpretability by 30%.',
    tech: ['Excel', 'Pivot Tables', 'Data Cleaning'],
    github: 'https://github.com/eswarrao10/AIR-Quality-Dashboard/tree/main',
    live: null,
    number: '04',
    gradient: 'from-emerald-500/20 via-green-500/10 to-transparent',
    accentColor: 'hsl(145 80% 48%)',
    stats: [
      { label: 'Tool', value: 'Excel' },
      { label: 'Data', value: '15k+ Entries' },
    ],
  },
];


export const SKILLS = [
  {
    title: 'Languages',
    icon: '⟨/⟩',
    color: 'from-emerald-400 to-cyan-400',
    glowColor: 'hsl(165 80% 48%)',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'SQL', level: 85 },
      { name: 'R', level: 75 },
      { name: 'C / C++', level: 80 },
    ],
  },
  {
    title: 'Data Fundamentals',
    icon: '◆',
    color: 'from-violet-400 to-purple-400',
    glowColor: 'hsl(270 60% 60%)',
    skills: [
      { name: 'Statistics', level: 85 },
      { name: 'Data Visualization', level: 90 },
      { name: 'Data Cleaning', level: 90 },
      { name: 'DAX', level: 80 },
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: '⚡',
    color: 'from-amber-400 to-orange-400',
    glowColor: 'hsl(38 92% 60%)',
    skills: [
      { name: 'Power BI', level: 90 },
      { name: 'Excel', level: 95 },
      { name: 'Git / GitHub', level: 85 },
      { name: 'MySQL', level: 85 },
    ],
  },
  {
    title: 'Data Analytics & AI',
    icon: '◈',
    color: 'from-rose-400 to-pink-400',
    glowColor: 'hsl(350 80% 60%)',
    skills: [
      { name: 'Machine Learning', level: 85 },
      { name: 'Predictive Analytics', level: 80 },
      { name: 'Data Modeling', level: 85 },
      { name: 'EDA', level: 90 },
    ],
  },
  {
    title: 'Soft Skills',
    icon: '⊛',
    color: 'from-sky-400 to-blue-400',
    glowColor: 'hsl(200 80% 55%)',
    skills: [
      { name: 'Problem Solving', level: 90 },
      { name: 'Analytical Thinking', level: 95 },
      { name: 'Adaptability', level: 95 },
      { name: 'Team Player', level: 100 },
    ],
  },
];

export const CERTIFICATIONS = [
  { title: 'Oracle Cloud AI Foundations', org: 'Oracle', date: 'Feb’ 26', icon: '🧠', link: 'https://brm-certview.oracle.com/ords/certview/ecertificate?ssn=OC7955258&trackId=OCI25AICFA&key=0f068ff5cf418b1e69e16b713a6d4ba37ccafd46' },
  { title: 'Oracle Cloud Data Center Foundations', org: 'Oracle', date: 'Jan’ 26', icon: '☁️', link: 'https://brm-certview.oracle.com/ords/certview/ecertificate?ssn=OC7955258&trackId=OCI25DCFA&key=6ed4ac77187f02ff1ac047398349ad974f613b21' },
  { title: 'Code-A-Haunt Hackathon', org: 'LinkedIn', date: 'Oct’ 25', icon: '🏆', link: 'https://www.linkedin.com/posts/eswarrao_certificate-of-participation-code-a-haunt-activity-7370819928687321088-3q9E' },
  { title: 'Build Generative AI Tools', org: 'Infosys SpringBoard', date: 'Sep’ 25', icon: '🔶', link: 'https://www.linkedin.com/posts/eswarrao_generativeai-nocode-ai-activity-7370778009710211072-AI2d' },
  { title: 'Summer Training', org: 'Event', date: 'Jul’ 25', icon: '🏅', link: 'https://drive.google.com/file/d/19V95ypcmOxJb1XOsZ0pvueh58y26XohE/view' },
  { title: 'Cloud Computing', org: 'NPTEL', date: 'May’ 25', icon: '☁️', link: 'https://www.linkedin.com/posts/eswarrao_cloudcomputing-nptel-iitkharagpur-activity-7370774922693918720-qSme' },
  { title: 'Graph Theory Programming Camp', org: 'AlgoUniversity', date: 'Feb’ 25', icon: '☁️', link: 'https://d3uam8jk4sa4y4.cloudfront.net/static/certificates/graph_camp/eswar-rao-sambangi.png' },
];

export const EDUCATION = [
  { degree: 'Bachelors of Computer Science and Engineering - CGPA: 6.80', school: 'Lovely Professional University', period: 'Aug’ 23 - Present', score: 'Ongoing', color: 'hsl(165 80% 48%)' },
  { degree: 'Intermediate - 91%', school: 'Vidya Vikas Junior College', period: 'Apr’ 22 – Mar’ 23', score: 'Completed', color: 'hsl(270 60% 60%)' },
  { degree: 'Matriculation - 98.8%', school: 'Chalapathi Public School', period: 'Apr’ 20 – Mar’ 21', score: 'Completed', color: 'hsl(200 80% 55%)' },
];

export const AWARDS = [
  { title: 'TCS National Qualifier', desc: 'Secured 65% in TCS National Qualifier Test.', emoji: '🏅' },
  { title: '1st Runner-Up Trophy', desc: 'Recognized for strong analytical thinking and reasoning ability.', emoji: '🏆' },
  { title: '2nd Place', desc: 'University-level Aptitude, Reasoning, and CS Fundamentals competition.', emoji: '🥈' },
];

export const ABOUT_STATS = [
  { label: 'Education', value: 'CS Degree', icon: '🎓' },
  { label: 'Languages', value: 'Python, SQL', icon: '💻' },
  { label: 'Projects', value: '4 Projects', icon: '🚀' },
  { label: 'Focus', value: 'Analytics & AI', icon: '📜' },
];
