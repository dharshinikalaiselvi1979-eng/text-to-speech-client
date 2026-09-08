import axios from 'axios';

const API_BASE = 'http://localhost:4000/api';

export const convertToSpeech = (text, language, voice) =>
  axios.post(`${API_BASE}/tts`, { text, language, voice });

export const getVoices = () => axios.get(`${API_BASE}/voices`);

export const getAudioUrl = (path) => `http://localhost:4000${path}`;
export const getDownloadUrl = (filename) => `http://localhost:4000/api/download/${filename}`;