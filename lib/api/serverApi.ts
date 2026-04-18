import { cookies } from 'next/headers';
import { api } from './api';
import { Note, User } from '@/types/note';
import { NoteTag } from '@/lib/api';

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  return {
    headers: {
      Cookie: cookieStore.toString(),
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
  const authHeaders = await getAuthHeaders();
  const { data } = await api.get('/notes', {
    ...authHeaders,
    params: { page, perPage, search, tag },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const authHeaders = await getAuthHeaders();
  const { data } = await api.get(`/notes/${id}`, authHeaders);
  return data;
};

export const checkSession = async () => {
  try {
    const authHeaders = await getAuthHeaders();
    const { data } = await api.get('/auth/session', authHeaders);
    return data;
  } catch (error) {
    return null; 
  }
};

export const getMe = async (): Promise<User | null> => {
  try {
    const authHeaders = await getAuthHeaders();
    const { data } = await api.get('/auth/me', authHeaders);
    return data;
  } catch (error) {
    return null;
  }
};