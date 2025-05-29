"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IconArrowLeft } from '@tabler/icons-react';

export default function BackButton() {
  const router = useRouter();
  return (
    <Button variant="ghost" size="sm" onClick={() => router.back()}>
      <IconArrowLeft  />
    </Button>
  );
}