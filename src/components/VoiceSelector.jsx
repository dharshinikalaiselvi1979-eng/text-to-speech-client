function VoiceSelector({ voice, setVoice, voices, language }) {
  const filteredVoices = voices.filter((v) => v.language === language);

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
        Voice:
      </label>
      <select
        value={voice}
        onChange={(e) => setVoice(e.target.value)}
        disabled={!language}
        style={{ padding: '0.5rem', fontSize: '1rem', width: '100%' }}
      >
        <option value="">-- Select voice --</option>
        {filteredVoices.map((v) => (
          <option key={v.name} value={v.name}>
            {v.name} ({v.gender})
          </option>
        ))}
      </select>
    </div>
  );
}

export default VoiceSelector;