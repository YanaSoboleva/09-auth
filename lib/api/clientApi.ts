import { api } from './api';
import { Note } from '@/types/note';
import { User } from '@/types/user';
import { NoteTag } from '@/lib/api/api';

interface RegisterData {
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export const fetchNotes = async ({ 
  page = 1, 
  perPage = 10, 
  search = '', 
  tag 
}: { 
  page?: number; 
  perPage?: number; 
  search?: string; 
  tag?: NoteTag 
}) => {
  const { data } = await api.get('/notes', { 
    params: { page, perPage, search, tag } 
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

export const createNote = async (noteData: Partial<Note>) => {
  const { data } = await api.post('/notes', noteData);
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};

export const register = async (userData: RegisterData): Promise<User> => {
  const { data } = await api.post<User>('/auth/register', userData);
  return data;
};

export const login = async (credentials: LoginRequest): Promise<User> => {
  const { data } = await api.post<User>('/auth/login', credentials);
  return data;
};

export const logout = async () => {
  const { data } = await api.post('/auth/logout');
  return data;
};

export const checkSession = async () => {
  const { data } = await api.get('/auth/session');
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get('/users/me');
  return data;
};

export const updateMe = async (updateData: Partial<User>) => {
  const { data } = await api.patch('/users/me', updateData);
  return data;
};