import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';
import { db } from '@/db';
import { users } from '@/db/schema/users';
import { eq } from 'drizzle-orm';

export type VerifiedUser = {
  id: string;
  firebaseUid: string;
  email: string | null;
};

export async function verifyToken(): Promise<VerifiedUser | null> {
  try {
    const token = cookies().get('session')?.value;
    if (!token) return null;
    const decoded = await adminAuth().verifyIdToken(token);
    const firebaseUid = decoded.uid;
    const email = decoded.email ?? null;

    const existing = await db.select().from(users).where(eq(users.firebaseUid, firebaseUid)).limit(1);
    if (existing.length === 0) {
      const [inserted] = await db
        .insert(users)
        .values({ firebaseUid, email })
        .returning();
      return { id: inserted.id, firebaseUid, email };
    }
    const u = existing[0]!;
    if (u.email !== email) {
      const [updated] = await db
        .update(users)
        .set({ email })
        .where(eq(users.id, u.id))
        .returning();
      return { id: updated.id, firebaseUid, email };
    }
    return { id: u.id, firebaseUid, email };
  } catch {
    return null;
  }
}
