// 'use client';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useAuthStore } from '@/lib/store/authStore';
// import css from './ProfilePage.module.css';

// export default function ProfilePage() {
//   const user = useAuthStore((state) => state.user);

//   if (!user) {
//     return <p className={css.loading}>Loading profile...</p>;
//   }

//   return (
//     <main className={css.mainContent}>
//       <div className={css.profileCard}>
//         <div className={css.header}>
//           <h1 className={css.formTitle}>Profile Page</h1>
//           <Link href="/profile/edit" className={css.editProfileButton}>
//             Edit Profile
//           </Link>
//         </div>
        
//         <div className={css.avatarWrapper}>
//           <Image
//             src={user.avatar || "https://ac.goit.global/default-avatar.png"}
//             alt="User Avatar"
//             width={120}
//             height={120}
//             className={css.avatar}
//             priority
//           />
//         </div>
        
//         <div className={css.profileInfo}>
//           <p>
//             <strong>Username:</strong> {user.username || 'Not set'}
//           </p>
//           <p>
//             <strong>Email:</strong> {user.email}
//           </p>
//         </div>
//       </div>
//     </main>
//   );
// // }
// import Image from 'next/image';
// import Link from 'next/link';
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
  // 1. Оголошуємо змінну для користувача
  let user = null;

  try {
    // 2. Отримуємо дані. Якщо тут виникне 401 помилка, ми перейдемо в блок catch
    user = await getMe();
  } catch (error) {
    // Якщо сталася помилка авторизації (401), редиректимо на вхід
    redirect('/sign-in');
  }

  // 3. Додаткова перевірка: якщо профілю немає, також редиректимо
  if (!user) {
    redirect('/sign-in');
  }

  // 4. Тільки якщо дані успішно отримані, повертаємо верстку
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