function VoiceSelector({ voice, setVoice, voices, language }) {
  const filteredVoices = voices.filter((v) => v.language === language);

  return (
    <div className="field">
      <label className="field__label" htmlFor="tts-voice">
        Voice
      </label>
      <select
        id="tts-voice"
        className="select"
        value={voice}
        onChange={(e) => setVoice(e.target.value)}
        disabled={!language}
      >
        <option value="">
          {language ? 'Select a voice' : 'Select a language first'}
        </option>
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
