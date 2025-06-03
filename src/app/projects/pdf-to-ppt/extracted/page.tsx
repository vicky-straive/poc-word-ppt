"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import templateData from "../templates/templateData.json";
import { useTourStore } from "../tourStore";
import { IconHandFinger } from '@tabler/icons-react';

const ExtractedMarkdownPage = () => {
  const searchParams = useSearchParams();
  const book = searchParams.get("book") || "";
  const chapter = searchParams.get("chapter") || "";
  const template = searchParams.get("template") || "";

  // Extract the chapter title from the chapter query parameter
  const chapterTitle = chapter.replace(/^Chapter\s*\d+:\s*/, "");
  const bookObj = templateData.find((b) => b.book === book);
  const chapterObj = bookObj?.chapters.find((c) => c.chapter === chapterTitle);
  const templateObj = chapterObj?.templates.find((t) => t.template === template);
  const markdownPath = templateObj?.markdown || "No markdown found.";

  const [markdown, setMarkdown] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // --- TOUR LOGIC START ---
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [spotlightRect, setSpotlightRect] = useState<DOMRect | null>(null);
  const [showTour, setShowTour] = useState(false);
  const { tourSkipped } = useTourStore();

  useEffect(() => {
    if (!tourSkipped) {
      setShowTour(true);
      // Do NOT disable scroll at all for this page's tour
      document.body.style.overflow = "";
    } else {
      setShowTour(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [tourSkipped]);

  useEffect(() => {
    if (showTour && buttonRef.current) {
      // Use setTimeout to ensure layout is stable after scroll/resize
      const updateRect = () => {
        const rect = buttonRef.current!.getBoundingClientRect();
        setSpotlightRect(rect);
      };
      updateRect();
      window.addEventListener('scroll', updateRect, true);
      window.addEventListener('resize', updateRect);
      return () => {
        window.removeEventListener('scroll', updateRect, true);
        window.removeEventListener('resize', updateRect);
      };
    }
  }, [showTour]);
  // --- TOUR LOGIC END ---

  useEffect(() => {
    if (markdownPath.startsWith("/assets/")) {
      setLoading(true);
      fetch(markdownPath)
        .then((res) => res.text())
        .then((text) => setMarkdown(text))
        .catch(() => setMarkdown("Failed to load markdown."))
        .finally(() => setLoading(false));
    } else {
      setMarkdown(markdownPath);
      setLoading(false);
    }
  }, [markdownPath]);

  const SpotlightOverlay = () => {
    if (!showTour) return null;
    return null;
  };

  return (
    <div className="container mx-auto px-8 py-8">
      {/* TOUR SPOTLIGHT OVERLAY */}
      {showTour && spotlightRect && (
        <>
          <SpotlightOverlay />
        </>
      )}
      <h1 className="text-2xl font-bold mb-4">Extracted Markdown</h1>
      <p className="text-gray-600 mb-6">
        Review the extracted markdown below. Tag elements to indicate their role
        in the presentation. This helps our AI understand how to structure your
        slides effectively.
      </p>

      <div className="bg-gray-100 p-6 rounded-md mb-6 min-h-[120px] flex items-center justify-center">
        {loading ? (
          <span className="text-gray-500 animate-pulse">Loading markdown...</span>
        ) : (
          <pre className="whitespace-pre-wrap w-full min-h-[40vh] max-h-[50vh] overflow-auto">{markdown}</pre>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" asChild>
          <Link href={`/projects/pdf-to-ppt/prompts?book=${encodeURIComponent(book)}&chapter=${encodeURIComponent(chapter)}&template=${encodeURIComponent(template)}`}>Back</Link>
        </Button>
        <span ref={buttonRef} style={{display: 'inline-flex', position: 'relative'}}>
          <Button asChild
            className={showTour ? "border-pulse relative" : undefined}
            style={showTour ? { borderColor: '#3c695a', boxShadow: '0 0 0 2px #3c695a80', transition: 'box-shadow 0.3s, border-color 0.3s' } : {}}>
            <Link href={`/projects/pdf-to-ppt/processing?book=${encodeURIComponent(book)}&chapter=${encodeURIComponent(chapter)}&template=${encodeURIComponent(template)}`}>Generate Slides</Link>
          </Button>
          {showTour && (
            <span
              style={{
                position: 'absolute',
                left: '50%',
                top: '100%',
                transform: 'translateX(-50%) translateY(8px)',
                zIndex: 10002,
                pointerEvents: 'none',
                fontSize: 48,
                color: '#3c695a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'blink-cursor-smooth 1.2s cubic-bezier(0.4,0,0.2,1) infinite',
              }}
            >
              <IconHandFinger stroke={2} />
            </span>
          )}
        </span>
      </div>
      <style>{`
        .border-pulse {
          border-width: 2px !important;
          animation: border-pulse-anim 1.4s infinite;
          box-shadow: 0 0 0 2px rgba(64, 151, 122, 0.5);
          border-color:rgb(73, 228, 122) !important;
        }
        @keyframes border-pulse-anim {
          0%, 100% {
            box-shadow: 0 0 0 2px rgb(34, 158, 75);
            border-color:rgb(65, 208, 160);
          }
          50% {
            box-shadow: 0 0 0 6px #3c695a40;
            border-color: rgb(41, 215, 99);
          }
        }
      `}</style>
    </div>
  );
};

export default function ExtractedMarkdownPageWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExtractedMarkdownPage />
    </Suspense>
  );
}
