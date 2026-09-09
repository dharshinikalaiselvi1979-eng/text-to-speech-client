import axios from 'axios';

const API_BASE = `${import.meta.env.VITE_API_URL}/api`;

export const convertToSpeech = (text, language, voice) =>
  axios.post(`${API_BASE}/tts`, { text, language, voice });

export const getVoices = () => axios.get(`${API_BASE}/voices`);

export const getAudioUrl = (path) => `${import.meta.env.VITE_API_URL}${path}`;
export const getDownloadUrl = (filename) => `${import.meta.env.VITE_API_URL}/api/download/${filename}`;