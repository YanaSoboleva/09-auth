import { NoteTag } from '@/lib/api/api';
import 'react';

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag; 
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
}

declare module 'react' {
  interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
    src?: string;
  }
}