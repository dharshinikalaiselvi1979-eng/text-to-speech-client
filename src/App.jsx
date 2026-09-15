import { useState, useEffect } from 'react';
import TextInput from './components/TextInput';
import LanguageSelector from './components/LanguageSelector';
import VoiceSelector from './components/VoiceSelector';
import GenerateButton from './components/GenerateButton';
import AudioPlayer from './components/AudioPlayer';
import DownloadButton from './components/DownloadButton';
import ErrorMessage from './components/ErrorMessage';
import AuthForm from './components/AuthForm';
import HistoryList from './components/HistoryList';
import FavouritesList from './components/FavouritesList';
import { useAuth } from './context/AuthContext';
import {
  convertToSpeech,
  getVoices,
  getAudioUrl,
  getDownloadUrl,
  getFavourites,
  addFavourite,
  removeFavourite,
} from './services/ttsService';
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
  const { user, accessToken, signOut } = useAuth();
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('');
  const [voice, setVoice] = useState('');
  const [voices, setVoices] = useState([]);
  const [audioUrl, setAudioUrl] = useState('');
  const [filename, setFilename] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // UI state
  const [isGuest, setIsGuest] = useState(false);
  const [activeTab, setActiveTab] = useState('generate'); // 'generate' | 'history' | 'favourites'
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    getVoices()
      .then((res) => setVoices(res.data.voices))
      .catch(() => setError('Could not load voices. Is the backend running?'));
  }, []);

  useEffect(() => {
    if (accessToken) {
      loadFavourites();
    } else {
      setFavourites([]);
    }
  }, [accessToken]);

  const loadFavourites = async () => {
    try {
      const res = await getFavourites(accessToken);
      setFavourites(res.data.favourites || []);
    } catch (err) {
      // non-critical
    }
  };

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
      const res = await convertToSpeech(text, language, voice, accessToken);
      setAudioUrl(getAudioUrl(res.data.audioUrl));
      setFilename(res.data.filename);
    } catch (err) {
      const backendMessage = err.response?.data?.error;
      setError(backendMessage || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isFav = (vName) => favourites.some((f) => f.voice_name === vName);

  const handleToggleFav = async (vName) => {
    if (!accessToken) return;
    try {
      if (isFav(vName)) {
        await removeFavourite(vName, accessToken);
        setFavourites((prev) => prev.filter((f) => f.voice_name !== vName));
      } else {
        await addFavourite(vName, accessToken);
        setFavourites((prev) => [...prev, { voice_name: vName }]);
      }
    } catch (err) {
      setError('Could not update favourite.');
    }
  };

  const handleSelectFavVoice = (vObj) => {
    setLanguage(vObj.language);
    setVoice(vObj.name);
    setActiveTab('generate');
  };

  const showAuthFirst = !user && !isGuest;

  return (
    <div className="app-shell">
      <aside className="ink-panel">
        <div className="ink-panel__mark">Text to Speech</div>
        <h1 className="ink-panel__title">Give your words a voice.</h1>
        <p className="ink-panel__tagline">
          Type or paste text, pick a language and voice, and listen back —
          or download the audio to keep.
        </p>

        <Waveform active={loading} />

        <p className="ink-panel__note">
          {loading
            ? 'Generating your audio…'
            : `Supports ${new Set(voices.map((v) => v.language)).size || '7'} languages.`}
        </p>
      </aside>

      <main className="paper-panel">
        <div className="form-sheet">
          {/* Top User / Auth Header Bar */}
          <div className="user-bar">
            {user ? (
              <div className="user-pill">
                <span className="user-email">👤 {user.email}</span>
                <button type="button" className="btn-text" onClick={signOut}>
                  Log out
                </button>
              </div>
            ) : isGuest ? (
              <div className="user-pill">
                <span className="user-email">Guest Mode</span>
                <button type="button" className="btn-text" onClick={() => setIsGuest(false)}>
                  Log in / Sign up
                </button>
              </div>
            ) : null}
          </div>

          {/* If NOT logged in and NOT guest: Show Login / Signup Screen FIRST */}
          {showAuthFirst ? (
            <div style={{ marginTop: 20 }}>
              <AuthForm
                onSuccess={() => {
                  setIsGuest(false);
                  setActiveTab('generate');
                }}
                onGuest={() => setIsGuest(true)}
              />
            </div>
          ) : (
            <>
              {/* Navigation Tabs if logged in */}
              {user && (
                <div className="tab-bar">
                  <button
                    type="button"
                    className={`tab-btn ${activeTab === 'generate' ? 'tab-btn--active' : ''}`}
                    onClick={() => setActiveTab('generate')}
                  >
                    Generate
                  </button>
                  <button
                    type="button"
                    className={`tab-btn ${activeTab === 'history' ? 'tab-btn--active' : ''}`}
                    onClick={() => setActiveTab('history')}
                  >
                    History
                  </button>
                  <button
                    type="button"
                    className={`tab-btn ${activeTab === 'favourites' ? 'tab-btn--active' : ''}`}
                    onClick={() => setActiveTab('favourites')}
                  >
                    Favourites
                  </button>
                </div>
              )}

              {/* Main Tab Content */}
              {activeTab === 'generate' && (
                <>
                  <div className="form-sheet__eyebrow">New generation</div>
                  <h2 className="form-sheet__heading">Enter your text</h2>

                  <TextInput text={text} setText={setText} maxLength={MAX_LENGTH} />
                  <LanguageSelector language={language} setLanguage={setLanguage} voices={voices} />
                  <VoiceSelector
                    voice={voice}
                    setVoice={setVoice}
                    voices={voices}
                    language={language}
                    isFav={isFav(voice)}
                    onToggleFav={handleToggleFav}
                    isLoggedIn={!!user}
                  />
                  <GenerateButton onClick={handleGenerate} loading={loading} disabled={!text.trim()} />

                  <ErrorMessage message={error} />

                  {audioUrl && (
                    <div className="audio-block">
                      <div className="audio-block__title">Generated audio</div>
                      <AudioPlayer audioUrl={audioUrl} />
                      <DownloadButton downloadUrl={getDownloadUrl(filename)} filename={filename} />
                    </div>
                  )}
                </>
              )}

              {activeTab === 'history' && user && (
                <HistoryList accessToken={accessToken} />
              )}

              {activeTab === 'favourites' && user && (
                <FavouritesList
                  accessToken={accessToken}
                  voices={voices}
                  onSelectVoice={handleSelectFavVoice}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;