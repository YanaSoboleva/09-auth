import { cookies } from 'next/headers';
import { api } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';
import { NoteTag } from '@/lib/api/api';
import { AxiosResponse } from 'axios';

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();
  return {
    headers: {
      Cookie: allCookies || '',
    },
  };
};

export const fetchNotes = async ({
  page = 1,
  perPage = 10,
  search = '',
  tag,
}: {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}) => {
  const authConfig = await getAuthHeaders();
  const { data } = await api.get('/notes', {
    ...authConfig,
    params: { page, perPage, search, tag },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const authConfig = await getAuthHeaders();
  const { data } = await api.get(`/notes/${id}`, { ...authConfig });
  return data;
};

export const checkSession = async (): Promise<AxiosResponse> => {
  const authConfig = await getAuthHeaders();
  return api.get('/auth/session', {
    ...authConfig,
    validateStatus: (status) => status < 500,
  });
};

export const getMe = async (): Promise<User> => {
  const authConfig = await getAuthHeaders();
  const { data } = await api.get('/users/me', { ...authConfig });
  return data;
};

