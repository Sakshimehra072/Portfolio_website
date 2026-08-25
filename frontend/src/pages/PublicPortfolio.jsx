import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Writing from '../components/Writing';
import Gallery from '../components/Gallery';
import Quote from '../components/Quote';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SearchModal from '../components/SearchModal';
import portfolioAPI from '../services/api';

const defaultSakshiInfo = {
  name: "Sakshi",
  subtitle: "Engineer · Developer · 988id of Code",
  tagline: "I think in systems, not just syntax.",
  bio1: "I think in systems, not just syntax. I build with React, Next.js, Node, and MongoDB, choosing tools that let me ship fast and scale harder.",
  bio2: "Passionate full-stack developer dedicated to crafting clean, high-performance web applications, intuitive interfaces, and robust backend architectures.",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
  banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
  email: "sakshi.dev@example.com",
  phone: "",
  location: "Greater Noida, India",
  socials: {
    github: "https://github.com",
    twitter: "https://x.com",
    linkedin: "https://linkedin.com",
    email: "mailto:sakshi.dev@example.com"
  }
};

const PublicPortfolio = () => {
  const [data, setData] = useState({
    personalInfo: defaultSakshiInfo,
    experiences: [],
    skills: [],
    projects: [],
    education: [],
    writing: [],
    gallery: [],
    personal: [],
    quote: {}
  });
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    portfolioAPI.getPortfolio()
      .then(res => {
        if (res.data) {
          const apiInfo = res.data.personalInfo || {};

          setData({
            personalInfo: apiInfo.name ? apiInfo : defaultSakshiInfo,
            experiences: res.data.experiences?.length > 0 ? res.data.experiences : [],
            skills: res.data.skills?.length > 0 ? res.data.skills : [],
            projects: res.data.projects?.length > 0 ? res.data.projects : [],
            education: res.data.education?.length > 0 ? res.data.education : [],
            writing: res.data.writing || [],
            gallery: res.data.gallery || [],
            personal: res.data.personal || [],
            quote: res.data.quote || {}
          });
        }
      })
      .catch(err => {
        console.error('Error loading portfolio data:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-secondary)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '32px',
            height: '32px',
            border: '2px solid var(--border-color)',
            borderTopColor: 'var(--text-primary)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 12px auto'
          }} />
          <span style={{ fontSize: '0.85rem' }}>Loading Sakshi Portfolio...</span>
        </div>
        <style>{`
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      {/* Sticky Top Navbar */}
      <Navbar onOpenSearch={() => setSearchOpen(true)} />

      {/* Main Content Layout */}
      <main style={{ paddingBottom: '40px' }}>
        <Hero personalInfo={data.personalInfo} />
        <Skills skills={data.skills} />
        <Experience experiences={data.experiences} />
        <Projects projects={data.projects} />
        <Education education={data.education} />
        <Writing writing={data.writing} />
        <Gallery gallery={data.gallery} />
        <Quote quote={data.quote} />
        <Contact personalInfo={data.personalInfo} />
      </main>

      {/* Spacious Footer */}
      <Footer name={data.personalInfo?.name || "Sakshi"} />

      {/* ⌘ K Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        data={data}
      />
    </div>
  );
};

export default PublicPortfolio;
