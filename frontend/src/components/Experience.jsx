import React from 'react';

const defaultTechStack = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Express',
  'MongoDB', 'Mongoose', 'Tailwind CSS', 'Shadcn UI',
  'Framer Motion', 'Redux', 'AWS', 'Nginx'
];

const defaultExperiences = [
  {
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
    company: "Digivity",
    role: "Full Stack Developer",
    duration: "May 2025 – August 2025",
    location: "Knowledge Park II, Greater Noida",
    current: false,
    highlights: [
      "Engineered RESTful web services and admin dashboards.",
      "Integrated real-time API integrations and cloud storage modules."
    ]
  }
];

const Experience = ({ experiences = [] }) => {
  const displayExperiences = experiences.length > 0 ? experiences : defaultExperiences;

  return (
    <section id="experience" className="editorial-section">
      <div className="editorial-container">
        <h2 className="section-title">Experience</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {displayExperiences.map((exp, index) => (
            <div
              key={exp._id || exp.company + index}
              style={{
                paddingBottom: index !== displayExperiences.length - 1 ? '28px' : '0',
                borderBottom: index !== displayExperiences.length - 1 ? '1px dashed var(--border-color)' : 'none'
              }}
            >
              {/* Header Row */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '8px',
                marginBottom: '12px'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {exp.company}
                    </h3>
                    {(exp.current || exp.duration?.toLowerCase().includes('current')) && (
                      <span className="green-dot" style={{ width: '6px', height: '6px' }} />
                    )}
                  </div>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {exp.role}
                  </span>
                </div>

                <div style={{ textAlign: 'right', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <div>{exp.duration}</div>
                  <div>{exp.location}</div>
                </div>
              </div>

              {/* Key Contributions */}
              {exp.highlights && exp.highlights.length > 0 && (
                <div style={{ marginTop: '12px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                    Key Contributions
                  </span>
                  <ul style={{
                    listStyle: 'disc inside',
                    fontSize: '0.84rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}>
                    {exp.highlights.map((h, i) => (
                      <li key={i} style={{ paddingLeft: '2px' }}>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tech Stack Horizontal Wrapping Pills */}
        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600, display: 'block', marginBottom: '12px' }}>
            Tech Stack
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {defaultTechStack.map((tech, idx) => (
              <div key={idx} style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                color: 'var(--text-primary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease'
              }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-secondary)' }} />
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
