// import { Metadata } from 'next';
// import Image from 'next/image';
// import css from './ProfilePage.module.css';

// export const metadata: Metadata = {
//   title: 'Profile | NoteHub',
//   description: 'User profile page with personal information and settings.',
//   robots: 'noindex, nofollow',
// };

// export default function ProfilePage() {
//   return (
//     <main className={css.mainContent}>
//       <div className={css.profileCard}>
//         <div className={css.header}>
//           <h1 className={css.formTitle}>Profile Page</h1>
//           <a src="" className={css.editProfileButton}>
// 	       Edit Profile
// 	     </a>
//         </div>
        
//         <div className={css.avatarWrapper}>
//           <Image
//             src="https://ac.goit.global/default-avatar.png"
//             alt="User Avatar"
//             width={120}
//             height={120}
//             className={css.avatar}
//           />
//         </div>
        
//         <div className={css.profileInfo}>
//           <p>
//             <strong>Username:</strong> your_username
//           </p>
//           <p>
//             <strong>Email:</strong> your_email@example.com
//           </p>
//         </div>
//       </div>
//     </main>
//   );
// }

'use client'; // Обов'язково, бо використовуємо стор

import Image from 'next/image';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import css from './ProfilePage.module.css';

export default function ProfilePage() {
  // Отримуємо дані користувача зі стору
  const user = useAuthStore((state) => state.user);

  // Якщо юзер ще завантажується, можна показати скелетон або null
  if (!user) {
    return <p className={css.loading}>Loading profile...</p>;
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
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority // Швидше завантаження головного зображення
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