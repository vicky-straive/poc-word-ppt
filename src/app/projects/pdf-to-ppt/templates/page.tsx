"use client";

import { Suspense } from "react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTourStore } from "../tourStore";

const TemplatesPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const book = searchParams.get("book") || "";
  const chapter = searchParams.get("chapter") || "";

  // Template options
  const templateOptions = [
    {
      name: "Nursing Lecture Template",
      image: "/assets/T2.jpg",
      description:
        "Clear and structured template for teaching fundamental nursing concepts and theories",
    },
    {
      name: "Nursing Case Studies Template",
      image: "/assets/T3.jpg",
      description:
        "Interactive template designed for presenting and analyzing real-world patient cases",
    },
    {
      name: "Nursing Concepts Template",
      image: "/assets/T4.jpg",
      description:
        "Comprehensive template for detailed lecture notes and key learning points",
    },
  ];

  function handleTemplateSelect(templateName: string) {
    // Go to prompts page with book, chapter, and template in query params
    router.push(
      `/projects/pdf-to-ppt/prompts?book=${encodeURIComponent(
        book
      )}&chapter=${encodeURIComponent(chapter)}&template=${encodeURIComponent(
        templateName
      )}`
    );
  }

  // Before return, extract chapter number for display
  let chapterDisplay = null;
  if (chapter) {
    // Remove "Chapter X:" prefix from the display if present
    const match = chapter.match(/Chapter\s*(\d+):?\s*(.*)/i);
    const chapterNumber = match ? match[1] : null;
    const chapterTitle = match ? match[2] : chapter;
    chapterDisplay = (
      <p className="text-gray-600 text-start ">
        {chapterNumber ? `Chapter ${chapterNumber}: ` : ""}
        {chapterTitle}
      </p>
    );
  }

  // --- TOUR LOGIC START ---
  const gridRef = useRef<HTMLDivElement>(null);
  const [spotlightRect, setSpotlightRect] = useState<DOMRect | null>(null);
  const [showTour, setShowTour] = useState(false);
  const { tourSkipped, setTourSkipped } = useTourStore();

  useEffect(() => {
    if (!tourSkipped) {
      setShowTour(true);
      // Disable scroll
      document.body.style.overflow = "hidden";
    } else {
      setShowTour(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [tourSkipped]);

  useEffect(() => {
    if (showTour && gridRef.current) {
      const rect = gridRef.current.getBoundingClientRect();
      setSpotlightRect(rect);
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* TOUR SPOTLIGHT OVERLAY */}
      {showTour && spotlightRect && createPortal(
        <div style={{position: 'fixed', inset: 0, zIndex: 50, pointerEvents: 'auto'}}>
          {/* SVG Mask */}
          <svg width="100vw" height="100vh" style={{position: 'fixed', inset: 0, width: '100vw', height: '100vh', pointerEvents: 'none'}}>
            <defs>
              <mask id="spotlight-mask">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <rect
                  x={spotlightRect.left}
                  y={spotlightRect.top - 0}
                  width={spotlightRect.width}
                  height={spotlightRect.height + 100}
                  rx={16}
                  fill="black"
                />
              </mask>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="rgba(0,0,0,0.6)" mask="url(#spotlight-mask)" />
          </svg>
          {/* Tooltip - now above the spotlighted area */}
          <div
            style={{
              position: 'absolute',
              left: spotlightRect.left,
              top: Math.max(spotlightRect.top - 240, 16), // 140px above, but not offscreen
              width: Math.min(spotlightRect.width, 340),
              zIndex: 51,
              background: 'white',
              borderRadius: 12,
              boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
              padding: 24,
              fontSize: 18,
              color: '#222',
            }}
          >
            <div className="mb-4 font-semibold">Choose a PowerPoint template</div>
            <div className="mb-6 text-base text-gray-600">Pick a template style for your presentation. You can preview each before continuing.</div>
            <div className="flex gap-3 justify-end">
              <button onClick={handleTourSkip} className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-medium hover:bg-gray-300">Skip</button>
              <button onClick={handleTourNext} className="px-4 py-2 rounded bg-green-800 text-white font-medium hover:bg-green-700">Next</button>
            </div>
          </div>
        </div>,
        document.body
      )}
      <div className="flex flex-col gap-4 items-center justify-between mb-8">
        <div className="">
          <h1 className="text-2xl font-bold mb-4">
            Want to create a stunning presentation? Look no further! Choose a
            template that best suits your requirements.
          </h1>
          <p className="text-2xl font-bold mb-8"></p>
        </div>
      </div>
      {(book || chapter) && (
        <div className="mb-6 mt-8 flex gap-4">
          {book && (
            <h2 className="text-gray-600 mb-4 text-start">Book: {book}</h2>
          )}
          <span className="text-gray-400">|</span>
          {chapterDisplay}
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">Select a template</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" ref={gridRef}>
        {templateOptions.map((tpl) => (
          <button
            key={tpl.name}
            className="border p-4 rounded-md text-center cursor-pointer hover:border-blue-500 bg-white"
            onClick={() => handleTemplateSelect(tpl.name)}
            style={showTour ? { boxShadow: 'none', borderColor: '#e5e7eb' } : {}}
          >
            <p className="text-md mb-5 font-medium">{tpl.name}</p>
            <Image
              src={tpl.image}
              alt={tpl.name}
              width={400}
              height={128}
              className="w-full h-auto object-cover object-top rounded"
            />
            <p className="text-sm mt-5">{tpl.description}</p>
          </button>
        ))}
      </div>

      {/* <h2 className="text-xl font-semibold mb-4">Start from scratch</h2>
      <div className="border-2 border-dashed border-gray-300 p-8 rounded-md text-center">
        <p className="text-lg font-medium mb-4">Create a blank presentation</p>
        <p className="text-gray-600 mb-6">Start with a blank canvas and add your own content</p>
        <Link href="/projects/pdf-to-ppt/prompts"><Button>Create blank presentation</Button></Link>
      </div> */}
    </div>
  );
};

function TemplatesPageWithSuspense() {
  return (
    <Suspense fallback={<p>Loading templates...</p>}>
      <TemplatesPage />
    </Suspense>
  );
}

export default TemplatesPageWithSuspense;
