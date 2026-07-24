export interface KnowledgeChunk {
  id: string;
  category: 'bio' | 'education' | 'project' | 'skills' | 'certs' | 'contact';
  title: string;
  keywords: string[];
  content: string;
}

export const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: 'bio',
    category: 'bio',
    title: 'Hari Babu S R - Profile & Bio',
    keywords: ['hari', 'who', 'about', 'bio', 'profile', 'background', 'architect', 'developer', 'mca', 'davanagere'],
    content: `Name: Hari Babu S R
Role: MCA Student & Full-Stack Architect
Location: Davanagere, Karnataka, India
Bio: Hari specializes in architecting scalable web solutions, bypassing technical bottlenecks, and engineering secure backend systems across React, Next.js, Python, Flask, MongoDB, and Machine Learning.`,
  },
  {
    id: 'education-mca',
    category: 'education',
    title: 'Masters of Computer Applications (MCA)',
    keywords: ['mca', 'master', 'masters', 'gm university', 'davanagere', 'degree', 'study', 'education', 'security', 'cryptography', 'hacking'],
    content: `Degree: Masters of Computer Applications (MCA)
Institution: GM University, Davanagere (2026 - 2027)
Specialization & Focus: Network security, cryptography, secure software development, and ethical hacking.`,
  },
  {
    id: 'education-bca',
    category: 'education',
    title: 'Bachelors of Computer Applications (BCA)',
    keywords: ['bca', 'bachelor', 'bachelors', 'don bosco', 'don bosco degree college', 'cgpa', 'degree', 'college'],
    content: `Degree: Bachelors of Computer Applications (BCA)
Institution: Don Bosco Degree College (2022 - 2025)
CGPA: 7.6 / 10
Focus: Foundational knowledge in Python, full-stack web development, and database management.`,
  },
  {
    id: 'skills-stack',
    category: 'skills',
    title: 'Tech Stack & Arsenal',
    keywords: ['skill', 'skills', 'tech', 'stack', 'languages', 'python', 'javascript', 'react', 'next.js', 'flask', 'tailwind', 'mongodb', 'mysql', 'git', 'docker', 'machine learning', 'ml'],
    content: `Tech Arsenal:
- Languages: Python, JavaScript
- Frontend: React, Next.js, Tailwind CSS
- Backend: Flask, REST APIs, Node.js
- Databases: MongoDB, MySQL
- Tools & Focus: Git, Docker, Machine Learning, Network Security & Cryptography`,
  },
  {
    id: 'project-agrilens',
    category: 'project',
    title: 'AgriLens AI (Flagship Project)',
    keywords: ['agrilens', 'agrilens ai', 'crop', 'agriculture', 'farming', 'fastapi', 'gemini', 'docker'],
    content: `Project Name: AgriLens AI
Category: Flagship Project (Live)
Description: AI-powered agricultural lens for crop disease detection and smart farming insights.
Tech Stack: React, Python, FastAPI, Gemini AI, Docker
Live URL: https://agrilensai.onrender.com/`,
  },
  {
    id: 'project-cora',
    category: 'project',
    title: 'CORA (Flagship Project)',
    keywords: ['cora', 'movie', 'recommendation', 'filtering', 'flask', 'vanilla js', 'tmdb'],
    content: `Project Name: CORA
Category: Flagship Project (Live)
Description: Content-based filtering engine for personalized movie recommendations.
Tech Stack: Flask, Vanilla JS, REST APIs
Live URL: https://cora-b6o6.onrender.com/`,
  },
  {
    id: 'project-tassels',
    category: 'project',
    title: 'Tassels by Saritha (Freelance Project)',
    keywords: ['tassel', 'tassels', 'saritha', 'handcrafted', 'brand', 'vite'],
    content: `Project Name: Tassels by Saritha
Category: Freelance Project (Live)
Description: Handcrafted tassel brand showcase with product catalog and client engagement.
Tech Stack: React, Vite, Tailwind CSS
Live URL: https://tasselsbysaritha.me`,
  },
  {
    id: 'project-zyra',
    category: 'project',
    title: 'Zyra Unique Events (Freelance Project)',
    keywords: ['zyra', 'events', 'event management', 'planning', 'booking'],
    content: `Project Name: Zyra Unique Events
Category: Freelance Project (Live)
Description: Event management platform for planning and showcasing unique events.
Tech Stack: React, Vite, Tailwind CSS
Live URL: https://zyra-unique-events.vercel.app`,
  },
  {
    id: 'project-varada',
    category: 'project',
    title: 'Varada\'s Kitchen (Freelance Project)',
    keywords: ['varada', 'kitchen', 'cloud kitchen', 'ordering', 'food'],
    content: `Project Name: Varada's Kitchen
Category: Freelance Project (Live)
Description: Responsive cloud kitchen platform with backend order management logic.
Tech Stack: React, JavaScript, Tailwind CSS
Live URL: https://varadas-kitchen-oaxa.onrender.com`,
  },
  {
    id: 'project-qr-attendance',
    category: 'project',
    title: 'QR Attendance System (Enterprise Internal)',
    keywords: ['qr', 'attendance', 'qr attendance', 'scanning', 'institutional'],
    content: `Project Name: QR Attendance System
Category: Enterprise Project (Internal)
Description: Automated attendance tracking via QR code scanning for institutional use.
Tech Stack: Python, Flask, MySQL`,
  },
  {
    id: 'project-event-approval',
    category: 'project',
    title: 'Event Approval System (Enterprise Internal)',
    keywords: ['event approval', 'approval system', 'workflow', 'socket.io', 'express'],
    content: `Project Name: Event Approval System
Category: Enterprise Project (Internal)
Description: Multi-tier event approval workflow with role-based access control.
Tech Stack: Node.js, Express, Socket.IO, React, MySQL`,
  },
  {
    id: 'certs-list',
    category: 'certs',
    title: 'Certifications & Hackathons',
    keywords: ['cert', 'certs', 'certificate', 'certificates', 'hackathon', 'google cloud', 'agentic ai', 'build for bengaluru', 'gdg', 'openai', 'nxtwave'],
    content: `Certifications & Credentials:
1. Google Cloud Agentic AI Day (Google Cloud x Hack2skill)
2. Build for Bengaluru Hackathon (30-hr hackathon by GDG Bengaluru @ Reva University)
3. OpenAI Academy x NxtWave Regional Buildathon (Karnataka)`,
  },
  {
    id: 'contact-socials',
    category: 'contact',
    title: 'Contact Information & Social Links',
    keywords: ['contact', 'hire', 'email', 'social', 'socials', 'linkedin', 'github', 'twitter', 'x', 'instagram', 'reach'],
    content: `Contact & Social Links:
- Email: haribabusr78@gmail.com
- LinkedIn: https://www.linkedin.com/in/hari-babu-nese-a29b27237/
- GitHub: https://github.com/harinese/
- X (Twitter): https://x.com/Hari_Nese
- Instagram: https://www.instagram.com/hari.nese/
- Location: Davanagere, Karnataka, India`,
  },
];

export function retrieveContext(query: string): { chunks: KnowledgeChunk[]; combinedText: string } {
  const STOPWORDS = new Set(['me', 'my', 'he', 'his', 'him', 'her', 'she', 'the', 'is', 'am', 'are', 'was', 'do', 'did', 'to', 'of', 'in', 'on', 'at', 'it', 'an', 'if', 'or', 'so', 'no', 'up', 'we', 'us', 'be', 'by', 'as', 'can', 'you', 'your', 'this', 'that', 'what', 'how', 'tell', 'give', 'get', 'has', 'had', 'have', 'does', 'from', 'with', 'about', 'where', 'when', 'who', 'whom', 'which', 'there', 'here', 'also', 'just', 'like', 'know', 'want', 'please', 'bro', 'dude', 'man', 'hey', 'first', 'idiot']);
  const terms = query.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(t => t.length > 2 && !STOPWORDS.has(t));
  if (terms.length === 0) {
    return { chunks: [], combinedText: 'No specific query terms.' };
  }

  const scored = KNOWLEDGE_BASE.map(chunk => {
    let score = 0;
    for (const term of terms) {
      if (chunk.keywords.some(kw => kw.includes(term) || term.includes(kw))) {
        score += 3;
      }
      if (chunk.title.toLowerCase().includes(term)) {
        score += 2;
      }
      if (chunk.content.toLowerCase().includes(term)) {
        score += 1;
      }
    }
    return { chunk, score };
  });

  const matched = scored.filter(s => s.score > 0).sort((a, b) => b.score - a.score);

  if (matched.length === 0) {
    return { chunks: [], combinedText: 'No matching portfolio records found for this query.' };
  }

  const topChunks = matched.slice(0, 3).map(m => m.chunk);
  const combinedText = topChunks.map(c => `=== [${c.title}] ===\n${c.content}`).join('\n\n');

  return { chunks: topChunks, combinedText };
}
