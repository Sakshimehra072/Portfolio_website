const initialPortfolioData = {
  personalInfo: {
    name: "Sakshi",
    subtitle: "Full Stack Developer · MCA · Web Engineer",
    tagline: "Building scalable web apps with React, Next.js, Node.js & MongoDB.",
    bio1: "Full Stack Developer with 1 year experience building web applications using Next.js, React.js, Node.js, Express.js, SQL and MongoDB. Developed an e-commerce platform, Learning Management System, and AI-powered interview preparation platform. Enjoy building user-friendly applications and continuously improving my technical skills.",
    bio2: "Passionate full-stack developer dedicated to crafting clean, high-performance web applications, intuitive interfaces, and robust backend architectures.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    resumeLink: "#",
    email: "sakshimehra072@gmail.com",
    handle: "@Sakshimehra072",
    location: "Punjab, India",
    status: {
      active: true,
      listeningTo: "Building Web Apps 🚀"
    },
    socials: {
      github: "https://github.com/Sakshimehra072",
      linkedin: "https://linkedin.com/in/sakshi-mehra-b91ab024b",
      twitter: "https://leetcode.com/u/Sakshimehra/",
      email: "mailto:sakshimehra072@gmail.com"
    }
  },
  experiences: [
    {
      company: "Boxshin Display and Packing Pvt. Ltd.",
      role: "Web Developer",
      duration: "Nov 2025 – Apr 2026",
      location: "Delhi, India",
      current: false,
      highlights: [
        "Contributed to the development and enhancement of the company’s e-commerce website by designing and improving user interface components.",
        "Improved website responsiveness and performance, helping deliver a smoother user experience across devices.",
        "Integrated OTP-based user authentication and Razorpay payment gateway to support secure login and online transactions."
      ]
    },
    {
      company: "Freelance / Learning Management System",
      role: "Freelance Full Stack Developer",
      duration: "Jun 2025 – Sep 2025",
      location: "Remote",
      current: false,
      highlights: [
        "Collaborated with a client to design and develop a Learning Management System (LMS) for online course delivery and content management.",
        "Implemented OTP-based authentication and Role Based Access Control (RBAC) for students and admins.",
        "Developed responsive, component-based dashboards using React.js and Tailwind CSS.",
        "Integrated protected video streaming using VdoCipher & Email.js and deployed the application, enabling online course access."
      ]
    }
  ],
  skills: [
    { name: "C++", category: "Programming Languages", proficiency: 85, icon: "Code" },
    { name: "JavaScript (ES6+)", category: "Programming Languages", proficiency: 95, icon: "Code" },
    { name: "TypeScript", category: "Programming Languages", proficiency: 90, icon: "Code" },
    { name: "React.js", category: "Frontend", proficiency: 95, icon: "Code" },
    { name: "Next.js", category: "Frontend", proficiency: 92, icon: "FileCode" },
    { name: "HTML5 / CSS3", category: "Frontend", proficiency: 95, icon: "Layout" },
    { name: "Tailwind CSS", category: "Frontend", proficiency: 92, icon: "Layout" },
    { name: "Node.js", category: "Backend", proficiency: 90, icon: "Server" },
    { name: "Express.js", category: "Backend", proficiency: 88, icon: "Cpu" },
    { name: "REST APIs", category: "Backend", proficiency: 90, icon: "Server" },
    { name: "JWT Authentication", category: "Backend", proficiency: 88, icon: "Key" },
    { name: "MongoDB", category: "Database", proficiency: 88, icon: "Database" },
    { name: "MySQL", category: "Database", proficiency: 85, icon: "Database" },
    { name: "Git & GitHub", category: "Tools", proficiency: 90, icon: "Terminal" },
    { name: "Firebase", category: "Tools", proficiency: 85, icon: "Cloud" },
    { name: "Razorpay", category: "Tools", proficiency: 80, icon: "Zap" },
    { name: "Postman", category: "Tools", proficiency: 85, icon: "Terminal" },
    { name: "RBAC & Auth", category: "Concepts", proficiency: 90, icon: "Layers" }
  ],
  projects: [
    {
      title: "BlogVerse | Online Blogging Platform",
      shortDescription: "Implemented blog creation, editing, publishing, likes, comments, favourites, and sharing.",
      description: "Implemented blog creation, editing, publishing, likes, comments, favourites, sharing, and user profile features with real-time database integration. Built a responsive, mobile-friendly UI using Tailwind CSS displaying recent blogs, categories, and personalized user content. Integrated REST APIs for authentication and blog management with frontend on Vercel and backend on Railway with MySQL.",
      keyFeatures: [
        "Implemented blog creation, editing, publishing, likes, comments, favourites, and user profiles",
        "Built responsive, mobile-friendly UI using Tailwind CSS displaying categories & personalized content",
        "Integrated REST APIs for authentication and blog management connected to MySQL database on Railway"
      ],
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80",
      tags: ["Next.js", "Node.js", "Express.js", "MySQL", "Railway", "Tailwind CSS"],
      category: "Full Stack",
      github: "https://github.com/Sakshimehra072",
      demo: "https://github.com/Sakshimehra072",
      featured: true
    },
    {
      title: "InterviewPrep | AI Interview Platform",
      shortDescription: "AI interview platform generating role-specific questions with Vapi AI integration.",
      description: "Developed an interview preparation platform that generates role-specific interview questions and supports mock interview practice. Integrated Vapi AI workflows to dynamically generate interview questions based on the selected technology stack. Implemented Firebase Authentication and responsive React interfaces.",
      keyFeatures: [
        "Integrated Vapi AI workflows to dynamically generate interview questions by tech stack",
        "Implemented Firebase Authentication & built responsive React.js user interfaces",
        "Supports interactive mock interview practice with dynamic AI question generation"
      ],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
      tags: ["TypeScript", "JavaScript", "React.js", "CSS", "Firebase", "Vapi AI"],
      category: "AI / Full Stack",
      github: "https://github.com/Sakshimehra072",
      demo: "https://github.com/Sakshimehra072",
      featured: true
    },
    {
      title: "LMS | Learning Management System",
      shortDescription: "Course delivery platform with OTP authentication, RBAC, and protected video streaming.",
      description: "Collaborated with a client to design and develop a Learning Management System (LMS) for online course delivery and content management. Implemented OTP-based authentication and Role Based Access Control (RBAC) for students and admins. Integrated protected video streaming using VdoCipher & Email.js.",
      keyFeatures: [
        "Implemented OTP authentication & Role-Based Access Control (RBAC) for students and admins",
        "Developed responsive, component-based dashboards using React.js and Tailwind CSS",
        "Integrated protected video streaming via VdoCipher enabling secure online course access"
      ],
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=80",
      tags: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "MongoDB", "Node.js", "VdoCipher"],
      category: "Full Stack",
      github: "https://github.com/Sakshimehra072",
      demo: "https://github.com/Sakshimehra072",
      featured: true
    }
  ],
  writing: [
    {
      date: "2026",
      readTime: "CERTIFICATION",
      title: "Principles of Generative AI Certification – Infosys",
      excerpt: "Certified in Generative AI Principles covering LLMs, Prompt Engineering, and AI application architectures.",
      link: "#"
    },
    {
      date: "2026",
      readTime: "CERTIFICATION",
      title: "Artificial Intelligence Primer Certification – Infosys",
      excerpt: "Foundational certification covering Machine Learning algorithms, AI models, and data pipelines.",
      link: "#"
    },
    {
      date: "2025",
      readTime: "CERTIFICATION",
      title: "React.js Certification — GeeksforGeeks",
      excerpt: "Comprehensive certification in React.js, hooks, state management, and modern component design.",
      link: "#"
    },
    {
      date: "LEETCODE",
      readTime: "ACHIEVEMENT",
      title: "Solved 100+ DSA & 50+ SQL Problems on LeetCode",
      excerpt: "Demonstrated strong problem-solving skills in Data Structures, Algorithms, and SQL queries.",
      link: "https://leetcode.com/u/Sakshimehra/"
    }
  ],
  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Lovely Professional University, Punjab",
      location: "Punjab, India",
      duration: "Aug 2023 – May 2025",
      details: "CGPA 7.2 | Specialization in Full Stack Engineering, Web Architectures, and Database Systems."
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Shanti Devi Arya Mahila College, Dinanagar",
      location: "Punjab, India",
      duration: "Aug 2019 – May 2022",
      details: "81% | Foundation in Computer Applications, Data Structures, and Software Development."
    }
  ],
  gallery: [
    { id: "g1", title: "Coding Setup 💻", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80" },
    { id: "g2", title: "Building Web Apps 🚀", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80" },
    { id: "g3", title: "LPU Campus 🎓", image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80" }
  ],
  personal: [
    { id: "p1", title: "Certifications", subtitle: "Infosys AI, GeeksforGeeks React.js & LeetCode badges.", link: "#" },
    { id: "p2", title: "LeetCode Profile", subtitle: "100+ DSA & 50+ SQL Solved Problems.", link: "https://leetcode.com/u/Sakshimehra/" }
  ],
  quote: {
    text: "Building user-friendly applications and continuously improving my technical skills.",
    author: "Sakshi"
  },
  messages: []
};

async function seedDatabase(force = false) {
  const mongoose = require('mongoose');
  const dotenv = require('dotenv');
  dotenv.config();

  const { PersonalInfo, Skill, Project, Experience, Education, Writing, Gallery, Quote, Personal } = require('../models/Schemas');

  if (mongoose.connection.readyState !== 1) {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
    await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 5000 });
    console.log('🌱 Connected to MongoDB for Seeding...');
  }

  // If force is true or PersonalInfo is empty, reset and insert latest resume data
  const personalInfoCount = await PersonalInfo.countDocuments();
  if (force || personalInfoCount === 0) {
    await PersonalInfo.deleteMany({});
    await PersonalInfo.create(initialPortfolioData.personalInfo);
    console.log('✅ PersonalInfo seeded');
  }

  const skillsCount = await Skill.countDocuments();
  if (force || skillsCount === 0) {
    await Skill.deleteMany({});
    await Skill.insertMany(initialPortfolioData.skills);
    console.log('✅ Skills seeded');
  }

  const projectsCount = await Project.countDocuments();
  if (force || projectsCount === 0) {
    await Project.deleteMany({});
    await Project.insertMany(initialPortfolioData.projects);
    console.log('✅ Projects seeded');
  }

  const expCount = await Experience.countDocuments();
  if (force || expCount === 0) {
    await Experience.deleteMany({});
    await Experience.insertMany(initialPortfolioData.experiences);
    console.log('✅ Experiences seeded');
  }

  const eduCount = await Education.countDocuments();
  if (force || eduCount === 0) {
    await Education.deleteMany({});
    await Education.insertMany(initialPortfolioData.education);
    console.log('✅ Education seeded');
  }

  const writingCount = await Writing.countDocuments();
  if (force || writingCount === 0) {
    await Writing.deleteMany({});
    await Writing.insertMany(initialPortfolioData.writing);
    console.log('✅ Writing/Certifications seeded');
  }

  const galleryCount = await Gallery.countDocuments();
  if (force || galleryCount === 0) {
    await Gallery.deleteMany({});
    await Gallery.insertMany(initialPortfolioData.gallery);
    console.log('✅ Photo Gallery seeded');
  }

  const quoteCount = await Quote.countDocuments();
  if (force || quoteCount === 0) {
    await Quote.deleteMany({});
    await Quote.create(initialPortfolioData.quote);
    console.log('✅ Quote seeded');
  }

  const personalCount = await Personal.countDocuments();
  if (force || personalCount === 0) {
    await Personal.deleteMany({});
    await Personal.insertMany(initialPortfolioData.personal);
    console.log('✅ Personal cards seeded');
  }

  console.log('🎉 MongoDB Data Seeding Completed!');
}

module.exports = { initialPortfolioData, seedDatabase };
