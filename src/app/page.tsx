'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useRef, useEffect } from "react";
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
  const hydrateTour = useTourStore((state) => state.hydrate);
  const tourSkipped = useTourStore((state) => state.tourSkipped);

  useEffect(() => {
    hydrateTour();
  }, [hydrateTour]);

  useEffect(() => {
    // If not skipped, activate the tour by default
    if (!tourSkipped) {
      setShowTour(true);
    }
  }, [tourSkipped, setShowTour]);

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
          const cardContent = (
            <div className="flex flex-col h-auto">
              <CardHeader>
                <CardTitle>{tile.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow ">
                <p>{tile.description}</p>
              </CardContent>
              {/* Hand pointer absolutely inside the card when tour is active */}
              {isPdfToPpt && showTour && (
                <span
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "100%",
                    transform: "translate(-50%, 12px)",
                    zIndex: 10002,
                    pointerEvents: "none",
                    fontSize: 48,
                    color: "#3c695a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: "blink-cursor-smooth 1.2s cubic-bezier(0.4,0,0.2,1) infinite",
                  }}
                >
                  <IconHandFinger stroke={2} />
                </span>
              )}
            </div>
          );
          if (isPdfToPpt) {
            return (
              <Card
                key={index}
                ref={pdfCardRef}
                className={`transform transition-transform hover:scale-105 hover:shadow-lg cursor-pointer${showTour ? " glow-border" : ""}`}
                style={showTour ? { position: "relative", zIndex: 10 } : {}}
                onClick={() => {
                  window.location.href = tile.href!;
                }}
                tabIndex={0}
                role="button"
                aria-label="Go to PDF to PPT"
              >
                {cardContent}
              </Card>
            );
          } else {
            return (
              <Card
                key={index}
                className="transform transition-transform opacity-90 cursor-not-allowed pointer-events-none"
              >
                <div className="flex flex-col h-auto">
                  <CardHeader>
                    <CardTitle>{tile.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p>{tile.description}</p>
                  </CardContent>
                </div>
              </Card>
            );
          }
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
            setTourSkipped(false);
          }
        }}
      >
        {showTour ? "Skip Guide" : "Show Guide"}
      </Button>
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
