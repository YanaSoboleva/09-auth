'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';
import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
  const router = useRouter();
  const { isAuthenticated, clearIsAuthenticated } = useAuthStore();
  const handleLogout = async () => {
    try {
      await logout();
      clearIsAuthenticated();
      router.push('/sign-in');
    } catch (error) {
      console.error('Logout failed:', error);
      clearIsAuthenticated();
      router.push('/sign-in');
    }
  };

  return (
    <nav className={css.nav}>
      {isAuthenticated ? (
        <div className={css.authGroup}>
          <Link href="/profile" className={css.link}>
            Profile
          </Link>
          <button 
            onClick={handleLogout} 
            className={css.logoutButton}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className={css.guestGroup}>
          <Link href="/sign-up" className={css.link}>
            Register
          </Link>
          <Link href="/sign-in" className={css.link}>
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}