"use client";

import * as React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogPortal = RadixDialog.Portal;
export const DialogClose = RadixDialog.Close;

export function DialogContent({ className, ...props }: React.ComponentProps<typeof RadixDialog.Content>) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 bg-black/30" />
      <RadixDialog.Content
        className={cn(
          'fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg',
          className,
        )}
        {...props}
      />
    </RadixDialog.Portal>
  );
}

export function DialogTitle(props: React.ComponentProps<typeof RadixDialog.Title>) {
  return <RadixDialog.Title className="text-lg font-semibold" {...props} />;
}

export function DialogDescription(props: React.ComponentProps<typeof RadixDialog.Description>) {
  return <RadixDialog.Description className="text-sm text-gray-600" {...props} />;
}
