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
import { IconClick } from '@tabler/icons-react';

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
  const { tourSkipped } = useTourStore();

  useEffect(() => {
    if (!tourSkipped) {
      setShowTour(true);
    } else {
      setShowTour(false);
    }
  }, [tourSkipped]);

  // Ensure tour is shown on first visit if not skipped
  useEffect(() => {
    if (typeof window !== "undefined") {
      const skipped = localStorage.getItem("pptTourSkipped");
      if (skipped === "true") {
        setShowTour(false);
      } else {
        setShowTour(true);
      }
    }
  }, []);

  useEffect(() => {
    if (showTour && gridRef.current) {
      const rect = gridRef.current.getBoundingClientRect();
      setSpotlightRect(rect);
    }
  }, [showTour]);

  // --- TOUR LOGIC END ---

  const SpotlightOverlay = () => {
    if (!showTour) return null;
    const centerX = spotlightRect ? spotlightRect.left + spotlightRect.width / 2 : 0;
    const centerY = spotlightRect ? spotlightRect.top + spotlightRect.height / 2 : 0;
    return createPortal(
      <>
        <svg
          width="100vw"
          height="100vh"
          style={{
            position: "absolute",
            inset: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: 40,
          }}
        >
          <defs>
            <mask id="spotlight-mask">
              <rect x="0" y="0" width="100vw" height="100vh" fill="white" />
              {spotlightRect && (
                <rect
                  x={spotlightRect.left}
                  y={spotlightRect.top}
                  width={spotlightRect.width}
                  height={spotlightRect.height}
                  rx="8"
                  fill="black"
                />
              )}
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="100vw"
            height="100vh"
            fill="transparent"
            mask="url(#spotlight-mask)"
          />
        </svg>
        {/* IconClick pointer indicator */}
        <span
          style={{
            position: "fixed",
            left: centerX - 24,
            top: centerY - 24,
            zIndex: 10002,
            pointerEvents: "none",
            fontSize: 48,
            color: "#ffdd33",
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            animation: "blink-cursor-smooth 1.2s cubic-bezier(0.4,0,0.2,1) infinite",
          }}
        >
          <IconClick stroke={2} />
        </span>
        <style>{`
          @keyframes blink-cursor-smooth {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
        `}</style>
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 41,
            pointerEvents: "none",
          }}
        />
      </>,
      document.body
    );
  };

  return (
    <>
      <style>{`body { overflow-x: hidden !important; }`}</style>
      <div className="container mx-auto px-4 py-8 overflow-x-hidden">
        {/* TOUR SPOTLIGHT OVERLAY */}
        {showTour && spotlightRect && (
          <SpotlightOverlay />
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
              style={
                showTour
                  ? {
                      animation: 'blink-border 1.2s cubic-bezier(0.4,0,0.2,1) infinite',
                      borderColor: '#3c695a',
                      boxShadow: '0 0 0 2px #3c695a',
                    }
                  : { boxShadow: 'none', borderColor: '#e5e7eb', animation: 'none' }
              }
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
        <style>{`
          @keyframes blink-border {
            0%, 100% { box-shadow: 0 0 0 2px #3c695a; border-color: #3c695a; }
            50% { box-shadow: 0 0 0 2px #3c695a80; border-color: #3c695a80; }
          }
        `}</style>
      </div>
    </>
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
