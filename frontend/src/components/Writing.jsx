import React, { useState } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowUp } from 'lucide-react';

const Writing = ({ writing = [] }) => {
  const [showAll, setShowAll] = useState(false);
  const [activeArticle, setActiveArticle] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const displayArticles = Array.isArray(writing) && writing.length > 0 ? writing : [
    {
      _id: "cert_1",
      date: "INFOSYS",
      readTime: "CERTIFICATION",
      title: "Principles of Generative AI Certification – Infosys",
      excerpt: "Certified in Generative AI Principles covering LLMs, Prompt Engineering, and AI application architectures.",
      content: "Certified in Principles of Generative AI by Infosys. Gained foundational and practical knowledge of Generative AI, Large Language Models (LLMs), prompt design, and building AI-enhanced applications.",
      link: "#"
    },
    {
      _id: "cert_2",
      date: "INFOSYS",
      readTime: "CERTIFICATION",
      title: "Artificial Intelligence Primer Certification – Infosys",
      excerpt: "Foundational certification covering Machine Learning algorithms, AI models, and data pipelines.",
      content: "Certified in Artificial Intelligence Primer by Infosys. Covered core AI/ML concepts, supervised & unsupervised machine learning algorithms, and intelligent system architectures.",
      link: "#"
    },
    {
      _id: "cert_3",
      date: "GEEKSFORGEEKS",
      readTime: "CERTIFICATION",
      title: "React.js Certification — GeeksforGeeks",
      excerpt: "Comprehensive certification in React.js, hooks, state management, and modern component design.",
      content: "Completed React.js Certification on GeeksforGeeks covering modern React features, custom hooks, context API, state management, and building high-performance web UIs.",
      link: "#"
    },
    {
      _id: "cert_4",
      date: "LEETCODE",
      readTime: "ACHIEVEMENT",
      title: "Solved 100+ DSA & 50+ SQL Problems on LeetCode",
      excerpt: "Demonstrated strong problem-solving skills in Data Structures, Algorithms, and SQL queries.",
      content: "Successfully solved over 100 Data Structures & Algorithms problems and 50+ SQL database query challenges on LeetCode.",
      link: "https://leetcode.com/u/Sakshimehra/"
    }
  ];

  const visibleArticles = showAll ? displayArticles : displayArticles.slice(0, 2);

  const scrollToTop = () => {
    const detailContainer = document.getElementById('writing-detail-container');
    if (detailContainer) {
      detailContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="writing" className="editorial-section">
      <div className="editorial-container">
        <h2 className="section-title">Writing</h2>

        {displayArticles.length === 0 ? (
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', padding: '12px 0' }}>
            No articles published yet.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '24px' }}>
            {visibleArticles.map((article, idx) => {
              const articleId = article._id || idx;
              const isHovered = hoveredId === articleId;

              return (
                <div
                  key={articleId}
                  onClick={() => setActiveArticle(article)}
                  onMouseEnter={() => setHoveredId(articleId)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    padding: '16px 0',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    background: 'transparent'
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Metadata */}
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '6px' }}>
                      {article.date || 'ARTICLE'} {article.readTime ? `· ${article.readTime}` : ''}
                    </div>

                    {/* Article Title */}
                    <h3 style={{
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '6px',
                      textDecoration: isHovered ? 'underline' : 'none'
                    }}>
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p style={{
                      fontSize: '0.82rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.5',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Diagonal Arrow Icon */}
                  <a
                    href={article.link && article.link !== '#' ? article.link : '#'}
                    target={article.link && article.link !== '#' ? '_blank' : '_self'}
                    rel="noreferrer"
                    onClick={(e) => {
                      if (article.link && article.link !== '#') {
                        e.stopPropagation();
                      }
                    }}
                    style={{
                      color: 'var(--text-secondary)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px',
                      borderRadius: '4px',
                      transition: 'color 0.15s ease'
                    }}
                    title="Read Article"
                  >
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              );
            })}
          </div>
        )}

        {displayArticles.length > 2 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="editorial-link"
            style={{ background: 'transparent', border: 'none', padding: 0 }}
          >
            <span>{showAll ? 'Show less' : 'View all writing'}</span>
            <ArrowUpRight size={14} />
          </button>
        )}
      </div>

      {/* FULL-PAGE BLOG / WRITING VIEW (Matching Project Page UI) */}
      {activeArticle && (
        <div
          id="writing-detail-container"
          className="detail-modal-container"
        >
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            {/* Top Back Navigation */}
            <button
              onClick={() => setActiveArticle(null)}
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
              <span>Back to writing</span>
            </button>

            {/* Article Title */}
            <h1 className="detail-modal-title">
              {activeArticle.title}
            </h1>

            {/* Publication Date & Read Time */}
            <div style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              fontWeight: 600,
              letterSpacing: '0.5px',
              marginBottom: '32px'
            }}>
              {activeArticle.date} {activeArticle.readTime ? `· ${activeArticle.readTime}` : ''}
            </div>

            {/* Dashed Line Divider */}
            <div style={{ borderBottom: '1px dashed var(--border-color)', marginBottom: '32px' }} />

            {/* Summary Excerpt */}
            {activeArticle.excerpt && (
              <div style={{
                fontSize: '0.95rem',
                color: 'var(--text-primary)',
                lineHeight: '1.6',
                fontStyle: 'italic',
                marginBottom: '32px',
                paddingLeft: '16px',
                borderLeft: '2px solid var(--border-subtle)'
              }}>
                {activeArticle.excerpt}
              </div>
            )}

            {/* Full Blog Article Content */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              fontSize: '0.92rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.75',
              marginBottom: '48px'
            }}>
              {activeArticle.content ? (
                activeArticle.content.split('\n\n').map((paragraph, pIdx) => {
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={pIdx} style={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        marginTop: '12px',
                        marginBottom: '4px'
                      }}>
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  return <p key={pIdx}>{paragraph}</p>;
                })
              ) : (
                <p>{activeArticle.excerpt}</p>
              )}
            </div>

            {/* Back to top Footer Link */}
            <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px dashed var(--border-color)' }}>
              <button
                onClick={scrollToTop}
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

export default Writing;
