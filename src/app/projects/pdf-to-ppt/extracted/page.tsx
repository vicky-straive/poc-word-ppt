"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import templateData from "../templates/templateData.json";
import { useTourStore } from "../tourStore";
import { createPortal } from "react-dom";

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
  const { tourSkipped, setTourSkipped } = useTourStore();

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

  function handleTourNext() {
    setShowTour(false);
    document.body.style.overflow = "";
  }
  function handleTourSkip() {
    setTourSkipped(true);
    setShowTour(false);
    document.body.style.overflow = "";
  }
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

  return (
    <div className="container mx-auto px-8 py-8">
      {/* TOUR SPOTLIGHT OVERLAY */}
      {showTour && spotlightRect && createPortal(
        <div style={{position: 'fixed', inset: 0, zIndex: 50, pointerEvents: 'none'}}>
          {/* SVG Mask */}
          <svg width="100vw" height="100vh" style={{position: 'fixed', inset: 0, width: '100vw', height: '100vh', pointerEvents: 'none'}}>
            <defs>
              <mask id="spotlight-mask">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <rect
                  x={spotlightRect.left - 12}
                  y={spotlightRect.top - 12}
                  width={spotlightRect.width + 24}
                  height={spotlightRect.height + 24}
                  rx={20}
                  fill="black"
                />
              </mask>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="rgba(0,0,0,0.6)" mask="url(#spotlight-mask)" />
          </svg>
          {/* Tooltip at the bottom right of the mask */}
          <div
            style={{
              position: 'absolute',
              left: spotlightRect.left + spotlightRect.width - 400,
              top: spotlightRect.top - 580, // Place tooltip above the button
              width: 400,
              zIndex: 51,
              background: 'white',
              borderRadius: 12,
              boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
              padding: 24,
              fontSize: 18,
              color: '#222',
              pointerEvents: 'auto', // Tooltip remains interactive
            }}
          >
            <div className="mb-4 font-semibold">Scroll down if needed and click Generate Slides</div>
            <div className="mb-6 text-base text-gray-600">If the markdown is long, scroll to the bottom and press the Generate Slides button to continue.</div>
            <div className="flex gap-3 justify-end">
              <button onClick={handleTourSkip} className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-medium hover:bg-gray-300">Skip</button>
              <button onClick={handleTourNext} className="px-4 py-2 rounded bg-green-800 text-white font-medium hover:bg-green-700">Next</button>
            </div>
          </div>
        </div>,
        document.body
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
          <pre className="whitespace-pre-wrap w-full">{markdown}</pre>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" asChild>
          <Link href={`/projects/pdf-to-ppt/prompts?book=${encodeURIComponent(book)}&chapter=${encodeURIComponent(chapter)}&template=${encodeURIComponent(template)}`}>Back</Link>
        </Button>
        <span ref={buttonRef} style={{display: 'inline-flex'}}>
          <Button asChild>
            <Link href={`/projects/pdf-to-ppt/processing?book=${encodeURIComponent(book)}&chapter=${encodeURIComponent(chapter)}&template=${encodeURIComponent(template)}`}>Generate Slides</Link>
          </Button>
        </span>
      </div>
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
