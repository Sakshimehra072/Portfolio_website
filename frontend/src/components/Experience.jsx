import React from 'react';
import { renderFormattedText } from '../utils/formatText';

const defaultTechStack = [
  'C++', 'JavaScript', 'TypeScript', 'React.js', 'Next.js',
  'Node.js', 'Express.js', 'Tailwind CSS', 'MongoDB', 'MySQL',
  'Firebase', 'Razorpay', 'VdoCipher', 'REST APIs', 'RBAC'
];

const defaultExperiences = [
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
                        {renderFormattedText(h)}
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
