// export default function SignInLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <section>
//       {children}
//     </section>
//   );
// }
'use client'; 

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // 2. Викликаємо оновлення роутера при монтуванні
  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <section>
      {children}
    </section>
  );
}