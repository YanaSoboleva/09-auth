'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession, getMe } from '@/lib/api/clientApi';

const PRIVATE_ROUTES = ['/profile', '/notes'];

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isRefreshing, setIsRefreshing] = useState(true);
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

useEffect(() => {
    const initAuth = async () => {
      try {
        const sessionValid = await checkSession();

        if (sessionValid) {
          const userData = await getMe();
          
          if (userData) {
            setUser(userData);
          } else {
            handleUnauthorized();
          }
        } else {
          handleUnauthorized();
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        handleUnauthorized();
      } finally {
        setIsRefreshing(false);
      }
    };

    const handleUnauthorized = () => {
      clearIsAuthenticated();
      if (PRIVATE_ROUTES.some(route => pathname.startsWith(route))) {
        router.push('/sign-in');
      }
    };

    initAuth();
  }, [pathname, setUser, clearIsAuthenticated, router]);

  if (isRefreshing) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <p>Завантаження сесії...</p> 
      </div>
    );
  }

  return <>{children}</>;
}