const React = require('react');

// Same functionality as the .jsx util but using React.createElement to avoid JSX
module.exports = function formatContent(content) {
  if (!content) return null;

  const preformatted = content.replace(/\.(?=\s)|:(?=\s-)/g, (match) =>
    match === '.' ? '.\n' : ':\n-'
  );

  const tokenRegex = /(\*\*[^*]+?\*\*|\*[^*]+?\*)/g;

  const renderInline = (text) => {
    if (!text) return null;
    const parts = text.split(tokenRegex).filter(Boolean);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const inner = part.slice(2, -2);
        return React.createElement('strong', { key: i }, inner);
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        const inner = part.slice(1, -1);
        return React.createElement('em', { key: i }, inner);
      }
      return React.createElement('span', { key: i }, part);
    });
  };

  const lines = preformatted.split('\n');
  return lines.map((line, idx) => React.createElement('p', { key: idx }, renderInline(line)));
};
