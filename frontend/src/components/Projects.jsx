import React, { useState } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowUp, Github, ExternalLink } from 'lucide-react';

const Projects = ({ projects = [] }) => {
  const [showAll, setShowAll] = useState(false);
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const displayProjects = projects.length > 0 ? projects : [
    {
      _id: "p1",
      title: "Veil Drop",
      shortDescription: "A fast, secure, peer-to-peer file transfer application built with WebRTC. It lets users share files directly between devices without storing anything on a server.",
      description: "Veil Drop is a peer-to-peer file sharing web app that I built to solve the problem of slow, server-dependent file transfers.\n\nInstead of uploading a file to a cloud provider and having the recipient download it, Veil Drop connects both users directly using WebRTC.\n\nI focused heavily on optimizing the JavaScript transfer loop. By using the File System Access API, the app streams large files directly to disk, bypassing memory limits.\n\nI also implemented strict backpressure handling to ensure the browser doesn't crash when transferring files at gigabit network speeds.\n\nFinally, it includes AES-GCM end-to-end encryption to keep the streams private.",
      keyFeatures: [
        "High-performance WebRTC data channels optimized to saturate local network speeds by chunking files efficiently.",
        "Memory-safe transfer logic using event-driven backpressure to pause uploads when network buffers fill up.",
        "End-to-End Encryption using AES-GCM where the decryption keys are shared securely via URL fragments.",
        "Direct-to-disk streaming using the modern File System Access API to bypass RAM limits on large transfers."
      ],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80",
      tags: ["WebRTC", "Socket.io", "React", "Node.js", "Cryptography"],
      demo: "https://veildrop.demo",
      github: "https://github.com"
    },
    {
      _id: "p2",
      title: "LetsMeet",
      shortDescription: "A massively scalable, Neo-Brutalist Omegle clone with real-time random video chat and text chatting worldwide.",
      description: "LetsMeet is a real-time video discovery platform engineered for high concurrency and ultra-low latency peer connections.\n\nBuilt with WebRTC data and media streams, it connects random active users instantly using custom Socket.io signalling servers.\n\nI engineered a fast queue-matching algorithm on Node.js to pair users in milliseconds, handling reconnects and skip events seamlessly.",
      keyFeatures: [
        "Instant matching algorithm using WebRTC & Socket.io signalling.",
        "Real-time video & audio streaming with low latency fallback.",
        "Integrated text chat box with typing indicators and connection controls.",
        "Responsive glassmorphism UI with camera and microphone toggles."
      ],
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
      tags: ["WebRTC", "Socket.io", "React", "Node.js", "TailwindCSS"],
      demo: "https://letsmeet.demo",
      github: "https://github.com"
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
                onClick={() => setActiveProjectModal(project)}
                onMouseEnter={() => setHoveredId(project._id || project.title)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  display: 'flex',
                  gap: '18px',
                  alignItems: 'flex-start',
                  padding: '12px 0',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                {/* Left Image Thumbnail */}
                <div style={{
                  width: '130px',
                  height: '82px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  background: 'var(--bg-tertiary)'
                }}>
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
                    {project.shortDescription || (typeof project.description === 'string' ? project.description : '')}
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
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 5000,
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            overflowY: 'auto',
            padding: '40px 20px 80px 20px'
          }}
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
                marginBottom: '32px',
                padding: 0
              }}
            >
              <ArrowLeft size={14} />
              <span>Back to projects</span>
            </button>

            {/* Project Title */}
            <h1 style={{
              fontSize: '2.4rem',
              fontWeight: 400,
              fontFamily: 'Georgia, serif',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '12px'
            }}>
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
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
              marginBottom: '40px'
            }}>
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
                  <p key={pIdx}>{paragraph}</p>
                ))
              ) : (
                <p>{activeProjectModal.description}</p>
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
                  listStyleType: 'disc',
                  paddingLeft: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {activeProjectModal.keyFeatures.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      style={{
                        fontSize: '0.88rem',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.6'
                      }}
                    >
                      {feature}
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
