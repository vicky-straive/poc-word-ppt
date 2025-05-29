"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";

const loadingSteps = [
  "Extracting Content",
  "Constructing as per Instructions",
  "Alt Text Generation",
  "Generating Markdown Content",
];

const ProcessingPage = () => {
  const [progress, setProgress] = useState(0);
  const [completedStepIndex, setCompletedStepIndex] = useState(-1); // -1 means no steps completed yet
  const router = useRouter();

  useEffect(() => {
    // Progress bar update (smoothly to 100% in 5 seconds)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 2; // 2% every 100ms = 100% in 5s
        }
        clearInterval(progressInterval);
        return 100;
      });
    }, 100);

    // Update completed steps (one step per second for 4 seconds)
    let currentStep = 0;
    const stepInterval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        setCompletedStepIndex(currentStep);
        currentStep++;
      } else {
        clearInterval(stepInterval); // All steps shown as completed
      }
    }, 1000); // Update step every 1 second

    // Navigation after 5 seconds
    const navigationTimer = setTimeout(() => {
      router.push("/projects/pdf-to-ppt/extracted");
    }, 5000);

    // Cleanup function
    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearTimeout(navigationTimer);
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-semibold mb-8 text-gray-700">
        Processing Your Request
      </h1>
      <div className="w-full max-w-md bg-white p-6 shadow-lg rounded-lg">
        <Progress value={progress} className="w-full mb-6" />
        <ul className="space-y-3">
          {loadingSteps.map((step, index) => (
            <li
              key={index}
              className={`flex items-center text-sm ${
                index <= completedStepIndex ? "text-green-600" : "text-gray-500"
              }`}
            >
              <span className="mr-2">
                {index < completedStepIndex ? (
                  <span className="text-green-600">✓</span>
                ) : index === completedStepIndex ? (
                  <svg
                    className="animate-spin h-4 w-4 text-blue-500"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                ) : (
                  <span className="text-transparent">✓</span>
                )}
              </span>
              {step}
              {index > completedStepIndex &&
                index === completedStepIndex + 1 && (
                  <span className="ml-1 animate-pulse">...</span>
                )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProcessingPage;
