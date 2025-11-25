import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  timeout: 120000,
});

export const analyzeDocument = async (file) => {
  const formData = new FormData();
  formData.append('document', file);

  const { data } = await apiClient.post('/api/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data;
};


