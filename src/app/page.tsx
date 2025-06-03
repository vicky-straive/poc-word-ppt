'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTourStore } from "@/app/projects/pdf-to-ppt/tourStore";
import { IconHandFinger } from '@tabler/icons-react';

const tiles = [
  {
    title: "Assist",
    description:
      "ALT Text Generation using AI Agents trained on custom guidelines for each client.",
  },
  {
    title: "PDF to PPT",
    description: "Convert your PDFs to presentations.",
    href: "/projects/pdf-to-ppt",
  },
  {
    title: "WORD to PPT",
    description: "Convert your Word documents to presentations.",
  },
  {
    title: "OCR Extraction",
    description: "Extract text from images and documents.",
  },
];

export default function Home() {
  const pdfCardRef = useRef<HTMLDivElement | null>(null);
  const showTour = useTourStore((state) => state.showTour);
  const setShowTour = useTourStore((state) => state.setShowTour);
  const setTourSkipped = useTourStore((state) => state.setTourSkipped);
  const [, setPointerPos] = useState<{left: number, top: number}>({left: 0, top: 0});

  useEffect(() => {
    if (showTour && pdfCardRef.current) {
      const rect = pdfCardRef.current.getBoundingClientRect();
      setPointerPos({
        left: rect.left + rect.width / 2 - 24, // center pointer (icon ~48px)
        top: rect.bottom + 12 // 12px below card
      });
    }
  }, [showTour]);

  return (
    <div className="flex flex-col items-center justify-center min-h- py-12 px-4">
      <Image
        src="/assets/FA_Davis_Logo.png"
        alt="Logo"
        width={250}
        height={150}
        className="mb-6"
      />
      <h1 className="text-4xl font-bold mb-8 text-center">
        Operationalizing AI for Human-Centric Tasks
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl w-full m-8">
        {tiles.map((tile, index) => {
          const isPdfToPpt = tile.title === "PDF to PPT";
          return (
            <Card
              key={index}
              ref={isPdfToPpt ? pdfCardRef : undefined}
              className={`transform transition-transform ${
                isPdfToPpt
                  ? `hover:scale-105 hover:shadow-lg cursor-pointer ${showTour ? "glow-border" : ""}`
                  : "opacity-90 cursor-not-allowed pointer-events-none"
              }`}
            >
              {isPdfToPpt ? (
                <Link href={tile.href!} passHref>
                  <div className="flex flex-col h-auto">
                    <CardHeader>
                      <CardTitle>{tile.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow ">
                      <p>{tile.description}</p>
                    </CardContent>
                  </div>
                </Link>
              ) : (
                <div className="flex flex-col h-auto">
                  <CardHeader>
                    <CardTitle>{tile.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p>{tile.description}</p>
                  </CardContent>
                </div>
              )}
            </Card>
          );
        })}
      </div>
      {/* Show Guide button fixed to bottom right */}
      <Button
        style={{
          position: "fixed",
          bottom: 62,
          right: 12,
          zIndex: 10010,
          boxShadow: "0 2px 12px 0rgba(60, 105, 90, 0)"
        }}
        onClick={() => {
          if (showTour) {
            setShowTour(false);
            setTourSkipped(true);
          } else {
            setShowTour(true);
          }
        }}
      >
        {showTour ? "Skip Guide" : "Show Guide"}
      </Button>
      {showTour && (
        <span
          style={{
            position: "fixed",
            left: 635,
            top: 520,
            zIndex: 10002,
            pointerEvents: "none",
            fontSize: 48,
            color: "#3c695a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "blink-cursor-smooth 1.2s cubic-bezier(0.4,0,0.2,1) infinite",
            // transform: "scaleY(-1)",
          }}
        >
          <IconHandFinger stroke={2} />
        </span>
      )}
      <style>{`
        @keyframes glow-border {
          0%, 100% { box-shadow: 0 0 0 2px #3c695a, 0 0 8px 4px #3c695a80; border-color: #3c695a; }
          50% { box-shadow: 0 0 0 2px #3c695a80, 0 0 16px 8px #3c695a80; border-color: #3c695a80; }
        }
        .glow-border {
          animation: glow-border 1.2s cubic-bezier(0.4,0,0.2,1) infinite;
          border-color: #3c695a !important;
        }
        @keyframes blink-cursor-smooth {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
