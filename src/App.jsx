
import { useState, useEffect } from 'react';
import TextInput from './components/TextInput';
import LanguageSelector from './components/LanguageSelector';
import VoiceSelector from './components/VoiceSelector';
import GenerateButton from './components/GenerateButton';
import AudioPlayer from './components/AudioPlayer';
import DownloadButton from './components/DownloadButton';
import ErrorMessage from './components/ErrorMessage';
import { convertToSpeech, getVoices, getAudioUrl, getDownloadUrl } from './services/ttsService';

const MAX_LENGTH = 500;

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
    <div style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'sans-serif', padding: '0 1rem' }}>
      <h1 style={{ textAlign: 'center' }}>Text to Speech</h1>

      <TextInput text={text} setText={setText} maxLength={MAX_LENGTH} />
      <LanguageSelector language={language} setLanguage={setLanguage} voices={voices} />
      <VoiceSelector voice={voice} setVoice={setVoice} voices={voices} language={language} />
      <GenerateButton onClick={handleGenerate} loading={loading} disabled={!text.trim()} />

      <ErrorMessage message={error} />
      <AudioPlayer audioUrl={audioUrl} />
      <DownloadButton downloadUrl={audioUrl ? getDownloadUrl(filename) : ''} filename={filename} />
    </div>
  );
}

export default App;