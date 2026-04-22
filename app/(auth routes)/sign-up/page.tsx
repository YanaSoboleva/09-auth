'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/api/clientApi';
import css from './SignUpPage.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession } from '@/lib/api/clientApi';

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await register({ email, password });
      const userData = await checkSession();
    
      if (userData) {
        setUser(userData);
        router.push('/profile');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error during registration');
    } finally {
      setIsLoading(false);
    }
    };
    return (
      <main className={css.mainContent}>
        <h1 className={css.formTitle}>Sign up</h1>
        <form className={css.form} onSubmit={handleSubmit}>
          <div className={css.formGroup}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" className={css.input} required />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" className={css.input} required />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.submitButton} disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>

          {error && <p className={css.error}>{error}</p>}
        </form>
      </main>
    );
}