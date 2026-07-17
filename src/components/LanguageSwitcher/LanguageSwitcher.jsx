import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('gl') ? 'gl' : 'es';

  return (
    <div className="lang-switcher">
      <button
        className={`lang-btn ${currentLang === 'gl' ? 'active' : ''}`}
        onClick={() => i18n.changeLanguage('gl')}
      >
        GL
      </button>
      <span className="lang-separator"></span>
      <button
        className={`lang-btn ${currentLang === 'es' ? 'active' : ''}`}
        onClick={() => i18n.changeLanguage('es')}
      >
        ES
      </button>
    </div>
  );
};

export default LanguageSwitcher;
