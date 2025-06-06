"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";

const ProcessingPage = () => {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 2; // Simulate progress
        }
        clearInterval(interval);
        // Redirect to preview page when done
        router.push(`/projects/pdf-to-ppt/preview${window.location.search}`);
        return prevProgress;
      });
    }, 100); // Update progress every 100ms

    return () => {
      clearInterval(interval);
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Preparing Your Presentation</h1>
      <p className="text-gray-600 mb-4">Analyzing content</p>
      <div className="w-full max-w-md">
        <Progress value={progress} className="w-full" />
        <p className="text-sm text-gray-500 mt-2">{progress}% complete</p>
      </div>
    </div>
  );
};

export default ProcessingPage;
