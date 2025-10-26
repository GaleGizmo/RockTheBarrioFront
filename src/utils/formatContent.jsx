import React from 'react';

// Convierte el texto raw en nodos React aplicando:
// 1) la transformación de puntuación que ya existía en DetallesEvento
//    (reemplaza ". " por ".\n" y ": -" por ":\n-")
// 2) formateo inline: **bold** -> <strong>, *italic* -> <em>
// Devuelve un array de <p>...</p> que puedes insertar directamente en el JSX.
export default function formatContent(content) {
  if (!content) return null;

  // 1) aplicar el reemplazo de puntuación equivalente al useEffect original
  const preformatted = content.replace(/\.(?=\s)|:(?=\s-)/g, (match) =>
    match === '.' ? '.\n' : ':\n-'
  );

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

  // 2) dividir por saltos de línea y envolver cada línea en un <p>
  const lines = preformatted.split('\n');
  return lines.map((line, idx) => (
    <p key={idx}>{renderInline(line)}</p>
  ));
}
