import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { Note } from '@/types/note';

export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'all';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

export type CreateNoteData = {
  title: string;
  content: string;
  tag: Exclude<NoteTag, 'all'>; 
};

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// export const fetchNotes = async ({
//   page = 1,
//   perPage = 10,
//   search = '',
//   tag = 'all',
// }: FetchParams = {}): Promise<FetchNotesResponse> => {
//   const params: Record<string, string | number> = { page, perPage };

//   if (search.trim()) {
//     params.search = search;
//   }

//   if (tag && tag !== 'all') {
//     params.tag = tag;
//   }

//   const response = await api.get<FetchNotesResponse>('/notes', { params });
//   return response.data;
// };

api.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken'); // Назва має збігатися з вашим middleware
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 3. Оновлена функція fetchNotes, яка приймає другий аргумент config
export const fetchNotes = async (
  { search = '', page = 1, perPage = 12, tag = 'all' } = {},
  config: AxiosRequestConfig = {} // ДОДАНО: приймає заголовки з сервера
) => {
  const params = {
    search: search.trim(),
    page,
    perPage,
    tag: tag !== 'all' ? tag : undefined,
  };

  // Передаємо config у запит, щоб додати Authorization: Bearer
  const response = await api.get('/notes', { 
    params, 
    ...config 
  });
  
  return response.data;
};

// 4. Інші методи (приклад для отримання однієї нотатки)
export const fetchNoteById = async (id: string, config: AxiosRequestConfig = {}) => {
  const response = await api.get(`/notes/${id}`, config);
  return response.data;
};

export const createNote = async (noteData: { title: string; content: string; tag: string }) => {
  const response = await api.post('/notes', noteData);
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
};