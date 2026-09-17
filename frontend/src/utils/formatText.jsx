import React from 'react';

/**
 * Parses inline formatting tags like **bold** or <b>bold</b> into bold React elements.
 */
export const renderFormattedText = (text) => {
  if (typeof text !== 'string') return text;
  if (!text) return '';

  // Regex matches **text**, <b>text</b>, or <strong>text</strong>
  const regex = /(\*\*.*?\*\*|<b>.*?<\/b>|<strong>.*?<\/strong>)/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={i} style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{part.slice(2, -2)}</strong>;
    }
    if ((part.startsWith('<b>') && part.endsWith('</b>')) || (part.startsWith('<strong>') && part.endsWith('</strong>'))) {
      const content = part.replace(/<\/?(b|strong)>/g, '');
      return <strong key={i} style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{content}</strong>;
    }
    return part;
  });
};
