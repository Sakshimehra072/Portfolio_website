import React, { useState } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowUp } from 'lucide-react';

const Writing = ({ writing = [] }) => {
  const [showAll, setShowAll] = useState(false);
  const [activeArticle, setActiveArticle] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const displayArticles = Array.isArray(writing) && writing.length > 0 ? writing : [
    {
      _id: "write_1",
      date: "JUL 7, 2026",
      readTime: "7 MIN READ",
      title: "Beyond SEO: The New Web Visibility Stack",
      excerpt: "Exploring modern search indexes, AI crawlers, structural web data, and how application visibility is shifting from traditional meta tags to semantic agent integration.",
      content: "As artificial intelligence and automated agents become the primary consumption layer for web information, traditional search engine optimization (SEO) is undergoing its most radical transformation since the advent of Google PageRank.\n\nIn this new paradigm, structured JSON-LD schemas, clean semantic HTML5 markup, and real-time API availability matter far more than keyword density or superficial backlink farming.\n\n### The Shift to Semantic Agent Visibility\nWhen autonomous search agents index web applications, they do not parse pages visually; they inspect machine-readable contracts and standardized data structures. Developers building for the modern web must prioritize high-fidelity meta data, deterministic state endpoints, and fast response times.\n\n### Modern Indexing Principles\n1. Structural Integrity: Valid HTML5 landmark tags (header, main, nav, section) help LLM parsers extract content hierarchy accurately.\n2. Machine-Readable Metadata: OpenGraph, JSON-LD, and microdata tags empower autonomous crawlers to index entities and relationships cleanly.\n3. Performance & Speed: Sub-second response times prevent automated crawlers from timing out when ingesting dynamic web applications.\n\nAs web developers, engineering for both humans and intelligent AI clients is no longer optional—it is the foundation of future web presence.",
      link: "#"
    },
    {
      _id: "write_2",
      date: "JUL 7, 2026",
      readTime: "5 MIN READ",
      title: "React vs Next.js: The Full Picture",
      excerpt: "A deep dive into server components, client interactivity boundaries, streaming hydration, and choosing the right paradigm for performance.",
      content: "Choosing between client-rendered React applications and full-stack Next.js frameworks requires a deep understanding of runtime performance, hydration boundaries, and deployment architecture.\n\nWhile React SPA models offer simple client-side routing and instant local state transitions, Next.js leverage Server Components (RSC) to minimize JavaScript bundle sizes delivered to the browser.\n\n### Interactivity & Hydration Boundaries\nBy defaulting to server components, Next.js keeps heavy utility libraries on the server side. Only interactive components marked with 'use client' trigger hydration on the browser client, resulting in significantly faster First Contentful Paint (FCP) and Time to Interactive (TTI).\n\n### When to Choose Which Paradigm\n- Single Page Applications (SPAs): Choose pure React for heavily interactive dashboards behind authentication where search indexing is irrelevant.\n- Content & E-commerce Platforms: Choose Next.js for high-SEO visibility, dynamic server caching, and sub-second page loads globally.",
      link: "#"
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
                marginBottom: '32px',
                padding: 0
              }}
            >
              <ArrowLeft size={14} />
              <span>Back to writing</span>
            </button>

            {/* Article Title */}
            <h1 style={{
              fontSize: '2.4rem',
              fontWeight: 400,
              fontFamily: 'Georgia, serif',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '12px'
            }}>
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
