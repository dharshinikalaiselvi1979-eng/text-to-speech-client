import { useState, useEffect } from 'react';
import TextInput from './components/TextInput';
import LanguageSelector from './components/LanguageSelector';
import VoiceSelector from './components/VoiceSelector';
import GenerateButton from './components/GenerateButton';
import AudioPlayer from './components/AudioPlayer';
import DownloadButton from './components/DownloadButton';
import ErrorMessage from './components/ErrorMessage';
import { convertToSpeech, getVoices, getAudioUrl, getDownloadUrl } from './services/ttsService';
import './App.css';

const MAX_LENGTH = 500;
const BAR_COUNT = 14;

function Waveform({ active }) {
  return (
    <div className={`waveform${active ? ' waveform--active' : ''}`} aria-hidden="true">
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <div
          key={i}
          className="waveform__bar"
          style={{ '--d': `${(i % 5) * 0.15}s` }}
        />
      ))}
    </div>
  );
}

function App() {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('');
  const [voice, setVoice] = useState('');
  const [voices, setVoices] = useState([]);
  const [audioUrl, setAudioUrl] = useState('');
  const [filename, setFilename] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getVoices()
      .then((res) => setVoices(res.data.voices))
      .catch(() => setError('Could not load voices. Is the backend running?'));
  }, []);

  useEffect(() => {
    setVoice('');
  }, [language]);

  const handleGenerate = async () => {
    setError('');
    setAudioUrl('');

    if (!text.trim()) {
      setError('Please enter some text.');
      return;
    }
    if (text.length > MAX_LENGTH) {
      setError(`Text exceeds the ${MAX_LENGTH} character limit.`);
      return;
    }
    if (!language) {
      setError('Please select a language.');
      return;
    }
    if (!voice) {
      setError('Please select a voice.');
      return;
    }

    setLoading(true);
    try {
      const res = await convertToSpeech(text, language, voice);
      setAudioUrl(getAudioUrl(res.data.audioUrl));
      setFilename(res.data.filename);
    } catch (err) {
      const backendMessage = err.response?.data?.error;
      setError(backendMessage || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <aside className="ink-panel">
        <div className="ink-panel__mark">Text to Speech</div>
        <h1 className="ink-panel__title">
          Give your words a voice.
        </h1>
        <p className="ink-panel__tagline">
          Type or paste text, pick a language and voice, and listen back —
          or download the audio to keep.
        </p>

        <Waveform active={loading} />

        <p className="ink-panel__note">
          {loading ? 'Generating your audio…' : `Supports ${new Set(voices.map((v) => v.language)).size || '7'} languages.`}
        </p>
      </aside>

      <main className="paper-panel">
        <div className="form-sheet">
          <div className="form-sheet__eyebrow">New generation</div>
          <h2 className="form-sheet__heading">Enter your text</h2>

          <TextInput text={text} setText={setText} maxLength={MAX_LENGTH} />
          <LanguageSelector language={language} setLanguage={setLanguage} voices={voices} />
          <VoiceSelector voice={voice} setVoice={setVoice} voices={voices} language={language} />
          <GenerateButton onClick={handleGenerate} loading={loading} disabled={!text.trim()} />

          <ErrorMessage message={error} />

          {audioUrl && (
            <div className="audio-block">
              <div className="audio-block__title">Generated audio</div>
              <AudioPlayer audioUrl={audioUrl} />
              <DownloadButton downloadUrl={getDownloadUrl(filename)} filename={filename} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
