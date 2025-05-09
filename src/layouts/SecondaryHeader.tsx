'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

interface SecondaryHeaderProps {
  title: string;
}

export function SecondaryHeader({ title }: SecondaryHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 p-4 border-b">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.back()}
        className="shrink-0"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <h1 className="text-lg font-semibold truncate">{title}</h1>
    </div>
  );
}
