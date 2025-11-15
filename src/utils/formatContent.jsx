import React from 'react';

// Convierte el texto raw en nodos React aplicando:
// 1) Usa || como marcador para saltos de línea explícitos
// 2) Usa ||| para generar un espacio vertical (párrafo vacío)
// 3) formateo inline: **bold** -> <strong>, *italic* -> <em>
// Devuelve un array de <p>...</p> que puedes insertar directamente en el JSX.
export default function formatContent(content) {
  if (!content) return null;

  const preformatted = content.replace(/\|\|\|/g, '\n\n').replace(/\|\|/g, '\n');

  // token regex para detectar **bold** o *italic*
  const tokenRegex = /(\*\*[^*]+?\*\*|\*[^*]+?\*)/g;

  const renderInline = (text) => {
    if (!text) return null;
    const parts = text.split(tokenRegex).filter(Boolean);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const inner = part.slice(2, -2);
        return <strong key={i}>{inner}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        const inner = part.slice(1, -1);
        return <em key={i}>{inner}</em>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  // Dividir por saltos de línea y envolver cada línea en un <p>
  const lines = preformatted.split('\n');
  return lines.map((line, idx) => (
    <p key={idx}>{line ? renderInline(line) : '\u00A0'}</p>
  ));
}
