import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getMe } from '@/lib/api/serverApi'; 
import css from './ProfilePage.module.css';

export const metadata: Metadata = {
  title: 'Мій профіль | NoteHub',
  description: 'Перегляд та редагування особистих даних користувача',
};

export default async function ProfilePage() {
  let user = null;

  try {
    user = await getMe();
  } catch (error) {
    redirect('/sign-in');
  }
  if (!user) {
    redirect('/sign-in');
  }
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || "https://ac.goit.global/default-avatar.png"}
            alt={`${user.username}'s avatar`}
            width={120}
            height={120}
            className={css.avatar}
            priority 
          />
        </div>
        
        <div className={css.profileInfo}>
          <p>
            <strong>Username:</strong> {user.username || 'Not set'}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </div>
    </main>
  );
}