function LanguageSelector({ language, setLanguage, voices }) {
  const languages = [...new Set(voices.map((v) => v.language))];

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
        Language:
      </label>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{ padding: '0.5rem', fontSize: '1rem', width: '100%' }}
      >
        <option value="">-- Select language --</option>
        {languages.map((lang) => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelector;