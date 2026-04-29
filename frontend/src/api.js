import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

export const startSession = async (data) => {
  const response = await api.post('/start', data);
  return response.data;
};

export const runAgent = async (step, sessionId, feedback = null, previousContent = null) => {
  const payload = { session_id: sessionId };
  if (feedback) payload.feedback = feedback;
  if (previousContent) payload.previous_content = previousContent;
  const response = await api.post(`/${step}`, payload);
  return response.data;
};

export const saveAgentContent = async (step, sessionId, content) => {
  const response = await api.post(`/${step}/save`, { session_id: sessionId, content });
  return response.data;
};

export const getFinalPdfUrl = (sessionId) => {
  return `http://localhost:8000/final/${sessionId}`;
};

export default api;
