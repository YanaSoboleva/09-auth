// import { cookies } from 'next/headers';
// import { api } from './api';
// import { Note, User } from '@/types/note';
// import { NoteTag } from '@/lib/api/api';
// // import axios from 'axios';

// const getAuthHeaders = async () => {
//   const cookieStore = await cookies();
//   return {
//     headers: {
//       Cookie: cookieStore.toString(),
//     },
//   };
// };

// export const fetchNotes = async ({
//   page = 1,
//   perPage = 10,
//   search = '',
//   tag,
// }: {
//   page?: number;
//   perPage?: number;
//   search?: string;
//   tag?: NoteTag;
// }) => {
//   const authHeaders = await getAuthHeaders();
//   const { data } = await api.get('/notes', {
//     ...authHeaders,
//     params: { page, perPage, search, tag },
//   });
//   return data;
// };

// export const fetchNoteById = async (id: string): Promise<Note> => {
//   const authHeaders = await getAuthHeaders();
//   const { data } = await api.get(`/notes/${id}`, authHeaders);
//   return data;
// };

// export const checkSession = async () => {
//   try {
//     const authHeaders = await getAuthHeaders();
//     const { data } = await api.get('/auth/session', {
//       ...authHeaders,
//       validateStatus: (status) => status < 500, // Не викидати помилку на 4xx статусах
//     });
    
//     // Якщо бекенд повернув 401, data може бути порожнім або містити помилку
//     return data;
//   } catch (error) {
//     return null;
//   }
// };

// export const getMe = async (): Promise<User | null> => {
//   try {
//     const authHeaders = await getAuthHeaders();
//     const { data } = await api.get('/auth/me', authHeaders);
//     return data;
//   } catch (error) {
//     return null;
//   }
// };

import { cookies } from 'next/headers';
import { api } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';
import { NoteTag } from '@/lib/api/api';
import { AxiosResponse } from 'axios';

/**
 * Отримує заголовки авторизації з кук для серверних запитів.
 */
const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) return {};

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      // Також додаємо Cookie про всяк випадок, якщо бекенд їх використовує
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

/**
 * ПЕРЕВІРКА СЕСІЇ
 * ВИПРАВЛЕНО: Повертає повний об'єкт AxiosResponse
 */
export const checkSession = async (): Promise<AxiosResponse> => {
  const authHeaders = await getAuthHeaders();
  return api.get('/auth/session', {
    ...authHeaders,
    validateStatus: (status) => status < 500,
  });
};

/**
 * ОТРИМАННЯ ПРОФІЛЮ
 * ВИПРАВЛЕНО: Змінено ендпоінт на /users/me
 * ВИПРАВЛЕНО: Повертає тільки User (без null) і не приглушує помилки
 */
export const getMe = async (): Promise<User> => {
  const authHeaders = await getAuthHeaders();
  const { data } = await api.get('/users/me', authHeaders);
  return data;
};



