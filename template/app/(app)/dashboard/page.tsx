import { verifyToken } from '@/lib/auth/verifyToken.server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await verifyToken();
  if (!user) redirect('/');

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-gray-600">Signed in as {user.email ?? user.firebaseUid}</p>
    </main>
  );
}
