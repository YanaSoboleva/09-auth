// 'use client';

// import { use } from 'react';
// import { useRouter } from 'next/navigation';
// import Modal from '@/components/Modal/Modal';
// import NoteDetailsClient from '@/app/(private routes)/notes/[id]/NoteDetails.client';

// interface PageProps {
//   params: Promise<{ id: string }>;
// }

// export default function NoteModalPage({ params }: PageProps) {
//   const router = useRouter();
//   const { id } = use(params);
//   const onDismiss = () => {
//     router.back();
//   };

//   return (
//     <Modal onClose={onDismiss}>
//       <NoteDetailsClient id={id} />
//     </Modal>
//   );
// }

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/serverApi'; // Використовуємо серверний API
import NoteDetailsClient from './NotePreview.client';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteModalPage({ params }: PageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  // 1. Попереднє завантаження даних на сервері (Prefetching)
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    // 2. Передача дегідрованого стану клієнту
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}