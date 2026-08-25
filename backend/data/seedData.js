const initialPortfolioData = {
  personalInfo: {
    name: "Sakshi",
    subtitle: "Engineer · Developer · 988id of Code",
    tagline: "I think in systems, not just syntax.",
    bio1: "I think in systems, not just syntax. I build with React, Next.js, Node, and MongoDB, choosing tools that let me ship fast and scale harder.",
    bio2: "Passionate full-stack developer dedicated to crafting clean, high-performance web applications, intuitive interfaces, and robust backend architectures.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    resumeLink: "#",
    email: "[EMAIL_ADDRESS]",
    handle: "@sakshi",
    location: "Greater Noida, India",
    status: {
      active: true,
      listeningTo: "Starboy — The Weeknd"
    },
    socials: {
      github: "https://github.com",
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
      email: "mailto:sakshi.dev@example.com"
    }
  },
  experiences: [
    {
      _id: "exp_1",
      company: "TechCorp",
      role: "Full Stack Developer",
      duration: "September 2025 – Current",
      location: "Greater Noida, Sector 59",
      current: true,
      highlights: [
        "Developed an intelligent, high-performance AI chatbot utilizing the Groq API to deliver rapid, real-time conversational experiences.",
        "Architected and built a comprehensive CRM platform featuring Role-Based Access Control.",
        "Optimized backend APIs and complex database queries to significantly reduce loading times.",
        "Managed VPS deployment environments across AWS EC2 and Hostinger.",
        "Successfully delivered multiple full-stack projects using React, Next.js, Node.js, and MongoDB."
      ]
    },
    {
      _id: "exp_2",
      company: "Digivity",
      role: "Full Stack Developer",
      duration: "May 2025 – August 2025",
      location: "Knowledge Park II, Greater Noida",
      current: false,
      highlights: [
        "Engineered scalable web services and client dashboards.",
        "Collaborated with cross-functional teams to integrate real-time API modules."
      ]
    }
  ],
  skills: [
    { name: "React", category: "Frontend", proficiency: 95, icon: "Code" },
    { name: "Next.js", category: "Frontend", proficiency: 92, icon: "FileCode" },
    { name: "TypeScript", category: "Frontend", proficiency: 90, icon: "Code" },
    { name: "Node.js", category: "Backend", proficiency: 90, icon: "Server" },
    { name: "Express", category: "Backend", proficiency: 88, icon: "Cpu" },
    { name: "MongoDB", category: "Database", proficiency: 85, icon: "Database" },
    { name: "Mongoose", category: "Database", proficiency: 85, icon: "Database" },
    { name: "Tailwind CSS", category: "Frontend", proficiency: 92, icon: "Layout" },
    { name: "Shadcn UI", category: "Frontend", proficiency: 90, icon: "Box" },
    { name: "Framer Motion", category: "Frontend", proficiency: 85, icon: "Zap" },
    { name: "Redux", category: "Frontend", proficiency: 88, icon: "Layers" },
    { name: "AWS", category: "Tools", proficiency: 80, icon: "Cloud" },
    { name: "Nginx", category: "Tools", proficiency: 80, icon: "Terminal" }
  ],
  projects: [
    {
      _id: "proj_1",
      title: "Veil Drop",
      shortDescription: "Fast & secure peer-to-peer file transfer built with WebRTC.",
      description: "A fast, secure, peer-to-peer file transfer application built with WebRTC. It lets users share files directly between devices without storing anything on a server.",
      keyFeatures: [
        "End-to-end encrypted direct WebRTC peer connections",
        "Zero server file storage for total privacy and data safety",
        "Instant drag-and-drop file sharing with live transfer progress bars"
      ],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop&q=80",
      tags: ["WebRTC", "Socket.io", "React", "Node.js"],
      github: "https://github.com",
      demo: "https://veildrop.demo",
      featured: true
    },
    {
      _id: "proj_2",
      title: "LetsMeet",
      shortDescription: "Real-time random video & text chat platform connecting users globally.",
      description: "A massively scalable, Neo-Brutalist Omegle clone with real-time random video chat and text chatting worldwide.",
      keyFeatures: [
        "Instant matching algorithm using WebRTC & Socket.io signalling",
        "Real-time video & audio streaming with low latency fallback",
        "Integrated text chat box with typing indicators and connection controls"
      ],
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80",
      tags: ["WebRTC", "Socket.io", "React", "Node.js"],
      github: "https://github.com",
      demo: "https://letsmeet.demo",
      featured: true
    }
  ],
  writing: [
    {
      _id: "write_1",
      date: "JUL 7, 2026",
      readTime: "7 MIN READ",
      title: "Beyond SEO: The New Web Visibility Stack",
      excerpt: "Exploring modern search indexes, AI crawlers, structural web data, and how application visibility is shifting from traditional meta tags to semantic agent integration.",
      link: "#"
    },
    {
      _id: "write_2",
      date: "JUL 7, 2026",
      readTime: "5 MIN READ",
      title: "React vs Next.js: The Full Picture",
      excerpt: "A deep dive into server components, client interactivity boundaries, streaming hydration, and choosing the right paradigm for performance.",
      link: "#"
    }
  ],
  gallery: [
    { id: "g1", title: "Setup 🔥", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80" },
    { id: "g2", title: "Bhai puri in maggie 😂", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80" },
    { id: "g3", title: "Midnight Code ☕", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80" },
    { id: "g4", title: "Mountains & Serenity 🏔️", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80" }
  ],
  personal: [
    { id: "p1", title: "Gallery", subtitle: "A small collection of photos, people, and everyday moments.", link: "#gallery" },
    { id: "p2", title: "The 100 List", subtitle: "A living ledger of ambition. Things to build, experience, and achieve.", link: "#" },
    { id: "p3", title: "Favorite Movies", subtitle: "Catalysts for perspective. Films that shape how I see the world.", link: "#" }
  ],
  quote: {
    text: "What we do in life echoes in eternity.",
    author: "Maximus, Gladiator"
  },
  education: [
    {
      degree: "B.Tech in Computer Science",
      institution: "AKTU University",
      location: "Greater Noida, India",
      duration: "2021 - 2025",
      details: "Specialized in Full Stack Web Engineering & Cloud Systems."
    }
  ],
  messages: []
};

module.exports = { initialPortfolioData };
