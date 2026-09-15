import axios from 'axios';

const API_BASE = `${import.meta.env.VITE_API_URL}/api`;

// TTS
export const convertToSpeech = (text, language, voice, accessToken) =>
  axios.post(
    `${API_BASE}/tts`,
    { text, language, voice },
    accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {}
  );

export const getVoices = () => axios.get(`${API_BASE}/voices`);

export const getAudioUrl = (path) => `${import.meta.env.VITE_API_URL}${path}`;
export const getDownloadUrl = (filename) => `${import.meta.env.VITE_API_URL}/api/download/${filename}`;

// History
export const getHistory = (accessToken) =>
  axios.get(`${API_BASE}/history`, { headers: { Authorization: `Bearer ${accessToken}` } });

// Favourites
export const getFavourites = (accessToken) =>
  axios.get(`${API_BASE}/favourites`, { headers: { Authorization: `Bearer ${accessToken}` } });

export const addFavourite = (voice_name, language, accessToken) =>
  axios.post(
    `${API_BASE}/favourites`,
    { voice_name, language },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

export const removeFavourite = (id, accessToken) =>
  axios.delete(`${API_BASE}/favourites/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });