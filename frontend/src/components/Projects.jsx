import React, { useState } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowUp, Github, ExternalLink } from 'lucide-react';
import { renderFormattedText } from '../utils/formatText';

const Projects = ({ projects = [] }) => {
  const [showAll, setShowAll] = useState(false);
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const displayProjects = projects.length > 0 ? projects : [
    {
      _id: "p1",
      title: "BlogVerse | Online Blogging Platform",
      shortDescription: "Implemented blog creation, editing, publishing, likes, comments, favourites, and sharing.",
      description: "Implemented blog creation, editing, publishing, likes, comments, favourites, sharing, and user profile features with real-time database integration.\n\nBuilt a responsive, mobile-friendly UI using Tailwind CSS displaying recent blogs, categories, and personalized user content.\n\nIntegrated REST APIs for authentication and blog management with the frontend deployed on Vercel and a backend connected to a MySQL database on Railway.",
      keyFeatures: [
        "Implemented blog creation, editing, publishing, likes, comments, favourites, and user profiles",
        "Built responsive, mobile-friendly UI using Tailwind CSS displaying categories & personalized content",
        "Integrated REST APIs for authentication and blog management connected to MySQL database on Railway"
      ],
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop&q=80",
      tags: ["Next.js", "Node.js", "Express.js", "MySQL", "Railway", "Tailwind CSS"],
      github: "https://github.com/Sakshimehra072",
      demo: "https://github.com/Sakshimehra072"
    },
    {
      _id: "p2",
      title: "InterviewPrep | AI Interview Platform",
      shortDescription: "AI interview platform generating role-specific questions with Vapi AI integration.",
      description: "Developed an interview preparation platform that generates role-specific interview questions and supports mock interview practice.\n\nIntegrated Vapi AI workflows to dynamically generate interview questions based on the selected technology stack.\n\nImplemented Firebase Authentication and built responsive user interfaces using React.js for a seamless user experience.",
      keyFeatures: [
        "Integrated Vapi AI workflows to dynamically generate interview questions by tech stack",
        "Implemented Firebase Authentication & built responsive React.js user interfaces",
        "Supports interactive mock interview practice with dynamic AI question generation"
      ],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=80",
      tags: ["TypeScript", "JavaScript", "React.js", "CSS", "Firebase", "Vapi AI"],
      github: "https://github.com/Sakshimehra072",
      demo: "https://github.com/Sakshimehra072"
    },
    {
      _id: "p3",
      title: "LMS | Learning Management System",
      shortDescription: "Course delivery platform with OTP authentication, RBAC, and protected video streaming.",
      description: "Collaborated with a client to design and develop a Learning Management System (LMS) for online course delivery and content management.\n\nImplemented OTP-based authentication and Role Based Access Control (RBAC) for students and admins.\n\nIntegrated protected video streaming using VdoCipher & Email.js and deployed the application, enabling online course access.",
      keyFeatures: [
        "Implemented OTP authentication & Role-Based Access Control (RBAC) for students and admins",
        "Developed responsive, component-based dashboards using React.js and Tailwind CSS",
        "Integrated protected video streaming via VdoCipher enabling secure online course access"
      ],
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&auto=format&fit=crop&q=80",
      tags: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "MongoDB", "Node.js", "VdoCipher"],
      github: "https://github.com/Sakshimehra072",
      demo: "https://github.com/Sakshimehra072"
    }
  ];

  const visibleProjects = showAll ? displayProjects : displayProjects.slice(0, 2);

  const scrollToDetailTop = () => {
    const detailContainer = document.getElementById('project-detail-container');
    if (detailContainer) {
      detailContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="editorial-section">
      <div className="editorial-container">
        <h2 className="section-title">Projects</h2>

        {/* Borderless Project Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
          {visibleProjects.map((project) => {
            const isHovered = hoveredId === (project._id || project.title);
            return (
              <div
                key={project._id || project.title}
                className="project-row-item"
                onClick={() => setActiveProjectModal(project)}
                onMouseEnter={() => setHoveredId(project._id || project.title)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Left Image Thumbnail */}
                <div className="project-row-thumb">
                  <img
                    src={project.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=80'}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                    }}
                  />
                </div>

                {/* Right Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <h3 style={{
                      fontSize: '0.98rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      textDecoration: isHovered ? 'underline' : 'none'
                    }}>
                      {project.title}
                    </h3>
                    <a
                      href={project.demo || project.github || '#'}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        color: 'var(--text-secondary)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '4px',
                        borderRadius: '4px',
                        transition: 'color 0.15s ease, transform 0.15s ease'
                      }}
                      title="Open Live Link"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  </div>

                  {/* Short Description */}
                  <p style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.5',
                    marginBottom: '10px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {renderFormattedText(project.shortDescription || (typeof project.description === 'string' ? project.description : ''))}
                  </p>

                  {/* Tech Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {project.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.72rem',
                          color: 'var(--text-muted)',
                          background: 'var(--bg-tertiary)',
                          border: '1px dashed var(--border-subtle)',
                          padding: '1px 7px',
                          borderRadius: '4px'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Projects Toggle */}
        {displayProjects.length > 2 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="editorial-link"
            style={{ background: 'transparent', border: 'none', padding: 0 }}
          >
            <span>{showAll ? 'Show fewer projects' : 'View all projects'}</span>
            <ArrowUpRight size={14} />
          </button>
        )}
      </div>

      {/* FULL-PAGE DETAILED PROJECT VIEW (Matching Reference Screenshot) */}
      {activeProjectModal && (
        <div
          id="project-detail-container"
          className="detail-modal-container"
        >
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            {/* Top Back Navigation Link */}
            <button
              onClick={() => setActiveProjectModal(null)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.82rem',
                marginBottom: '24px',
                padding: 0
              }}
            >
              <ArrowLeft size={14} />
              <span>Back to projects</span>
            </button>

            {/* Project Title */}
            <h1 className="detail-modal-title">
              {activeProjectModal.title}
            </h1>

            {/* Short Subtitle / Description */}
            <p style={{
              fontSize: '0.92rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              marginBottom: '32px'
            }}>
              {activeProjectModal.shortDescription || (typeof activeProjectModal.description === 'string' ? activeProjectModal.description.split('\n')[0] : '')}
            </p>

            {/* Dashed Line Divider */}
            <div style={{ borderBottom: '1px dashed var(--border-color)', marginBottom: '32px' }} />

            {/* Technologies & Links Section */}
            <div className="project-modal-grid">
              {/* Technologies */}
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
                  Technologies
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {activeProjectModal.tags?.map((tech, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.78rem',
                        color: 'var(--text-secondary)',
                        background: 'transparent',
                        border: '1px dashed var(--border-subtle)',
                        padding: '4px 12px',
                        borderRadius: '6px'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
                  Links
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {activeProjectModal.github && (
                    <a
                      href={activeProjectModal.github}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontSize: '0.78rem',
                        color: 'var(--text-primary)',
                        background: 'transparent',
                        border: '1px dashed var(--border-subtle)',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Github size={13} />
                      <span>GitHub</span>
                    </a>
                  )}
                  {activeProjectModal.demo && (
                    <a
                      href={activeProjectModal.demo}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontSize: '0.78rem',
                        color: 'var(--text-primary)',
                        background: 'transparent',
                        border: '1px dashed var(--border-subtle)',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <ExternalLink size={13} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Featured Image Showcase Frame (Glowing Border/Aura) */}
            {activeProjectModal.image && (
              <div style={{
                position: 'relative',
                borderRadius: '16px',
                padding: '16px',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(99,102,241,0.15) 100%)',
                border: '1px solid var(--border-subtle)',
                boxShadow: '0 20px 50px rgba(99, 102, 241, 0.15)',
                marginBottom: '40px'
              }}>
                <div style={{
                  width: '100%',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)',
                  background: '#0D0D0D'
                }}>
                  <img
                    src={activeProjectModal.image}
                    alt={activeProjectModal.title}
                    style={{ width: '100%', display: 'block', height: 'auto', maxHeight: '420px', objectFit: 'cover' }}
                  />
                </div>
              </div>
            )}

            {/* Full Narrative Description */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              marginBottom: '40px'
            }}>
              {typeof activeProjectModal.description === 'string' ? (
                activeProjectModal.description.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx}>{renderFormattedText(paragraph)}</p>
                ))
              ) : (
                <p>{renderFormattedText(activeProjectModal.description)}</p>
              )}
            </div>

            {/* Key Features Section */}
            {activeProjectModal.keyFeatures && activeProjectModal.keyFeatures.length > 0 && (
              <div style={{ marginBottom: '48px' }}>
                <h3 style={{
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '16px'
                }}>
                  Key Features
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {activeProjectModal.keyFeatures.map((feature, fIdx) => (
                    <li key={fIdx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      fontSize: '0.88rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6'
                    }}>
                      <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'var(--text-muted)',
                        marginTop: '8px',
                        flexShrink: 0
                      }} />
                      <span>{renderFormattedText(feature)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Back to top Footer Link */}
            <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px dashed var(--border-color)' }}>
              <button
                onClick={scrollToDetailTop}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>Back to top</span>
                <ArrowUp size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
