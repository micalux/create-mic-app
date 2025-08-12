"use client";

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Rocket } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

const schema = z.object({
  email: z.string().email(),
});

type FormValues = z.infer<typeof schema>;

export default function Page() {
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { email: '' } });

  return (
    <main className="mx-auto flex max-w-xl flex-col gap-6 p-8">
      <h1 className="flex items-center gap-2 text-3xl font-bold"><Rocket className="h-7 w-7" /> Welcome</h1>
      <p className="text-gray-600">This is the public marketing page.</p>

      <form
        className="flex items-center gap-2"
        onSubmit={form.handleSubmit(async () => {/* demo only */})}
      >
        <Input placeholder="Email" {...form.register('email')} />
        <Button type="submit">Submit</Button>
      </form>

      <div>
        <Link href="/dashboard" className="text-blue-600 underline">Go to Dashboard</Link>
      </div>
    </main>
  );
}
