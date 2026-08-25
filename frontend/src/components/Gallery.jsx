import React, { useState } from 'react';
import { ArrowUpRight, ChevronUp, X } from 'lucide-react';

const defaultPhotos = [
  { id: '1', title: 'Setup 🔥', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80' },
  { id: '2', title: 'Bhai puri in maggie 😂', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80' },
  { id: '3', title: 'Midnight Code ☕', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80' },
  { id: '4', title: 'Mountains & Serenity 🏔️', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&auto=format&fit=crop&q=80' }
];

const Gallery = ({ gallery = [] }) => {
  const [showAll, setShowAll] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);

  const photos = gallery.length > 0 ? gallery : defaultPhotos;
  const visiblePhotos = showAll ? photos : photos.slice(0, 4);

  const topRow = photos.slice(0, 3);
  const bottomRow = photos.slice(3, 4);
  const extraPhotos = photos.slice(4);

  return (
    <section id="gallery" className="editorial-section">
      <div className="editorial-container">
        <h2 className="section-title">Gallery</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
          {/* Top Row: 3 Images */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: photos.length >= 3 ? 'repeat(3, 1fr)' : `repeat(${Math.max(photos.length, 1)}, 1fr)`,
            gap: '10px'
          }}>
            {topRow.map((photo, index) => (
              <div
                key={photo._id || photo.id || index}
                onClick={() => setActivePhoto(photo)}
                style={{
                  position: 'relative',
                  height: '140px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  cursor: 'pointer'
                }}
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="zoom-img"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(0.15) brightness(0.92) contrast(1.05)',
                    transition: 'transform 0.3s ease, filter 0.3s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '8px 10px'
                }}>
                  <span style={{ fontSize: '0.75rem', color: '#FFFFFF', fontWeight: 500 }}>
                    {photo.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row / Featured Row */}
          {bottomRow.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
              {bottomRow.map((photo, index) => (
                <div
                  key={photo._id || photo.id || index}
                  onClick={() => setActivePhoto(photo)}
                  style={{
                    position: 'relative',
                    height: '170px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="zoom-img"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'grayscale(0.15) brightness(0.92) contrast(1.05)',
                      transition: 'transform 0.3s ease, filter 0.3s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '10px 14px'
                  }}>
                    <span style={{ fontSize: '0.8rem', color: '#FFFFFF', fontWeight: 500 }}>
                      {photo.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Expanded Grid for Extra Uploaded Photos */}
          {showAll && extraPhotos.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '10px',
              marginTop: '10px'
            }}>
              {extraPhotos.map((photo, index) => (
                <div
                  key={photo._id || photo.id || index}
                  onClick={() => setActivePhoto(photo)}
                  style={{
                    position: 'relative',
                    height: '130px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="zoom-img"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '8px 10px'
                  }}>
                    <span style={{ fontSize: '0.72rem', color: '#FFFFFF', fontWeight: 500 }}>
                      {photo.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {photos.length > 4 && (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="editorial-link"
            style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <span>{showAll ? 'Show less photos' : `View all photos (${photos.length})`}</span>
            {showAll ? <ChevronUp size={14} /> : <ArrowUpRight size={14} />}
          </button>
        )}
      </div>

      {/* Lightbox Image Preview Modal */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            background: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              borderRadius: '8px',
              overflow: 'hidden',
              background: '#0D0D0D',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 24px 48px rgba(0,0,0,0.6)'
            }}
          >
            <button
              onClick={() => setActivePhoto(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                zIndex: 10,
                background: 'rgba(0,0,0,0.6)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            <img
              src={activePhoto.image}
              alt={activePhoto.title}
              style={{
                maxWidth: '100%',
                maxHeight: '75vh',
                objectFit: 'contain',
                display: 'block'
              }}
            />

            <div style={{ padding: '16px 20px', background: '#121212' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#E5E5E5', marginBottom: '4px' }}>
                {activePhoto.title}
              </h3>
              {activePhoto.caption && (
                <p style={{ fontSize: '0.82rem', color: '#8A8A8A' }}>
                  {activePhoto.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
