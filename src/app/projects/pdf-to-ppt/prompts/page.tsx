"use client";

import { Button } from "@/components/ui/button";
import { useState, Suspense, useEffect, useRef } from "react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import { createPortal } from "react-dom";
import { useTourStore } from "../tourStore";

const PromptsPage = () => {
  const predefinedPrompts = [
    {
      title: "Extract key concepts",
      description: "Extract key concept's and definitions from the text.",
    },
    {
      title: "Summarize main points",
      description: "Summarize the main points of each section.",
    },
    {
      title: "Identify medical terms",
      description: "Identify and list important medical terms.",
    },
    {
      title: "Format for PowerPoint",
      description: "Extract and format text for PowerPoint slides.",
    },
  ];
  const [selectedAltTextOption, setSelectedAltTextOption] = useState<
    string | null
  >(null);
  const [selectedTextExtractionPrompt, setSelectedTextExtractionPrompt] =
    useState<string | null>(null);

  const [
    selectedMarkdownFormattingOption,
    setSelectedMarkdownFormattingOption,
  ] = useState<string | null>(null);

  const altTextOptions = [
    {
      id: "generate-alt-text",
      title: "Generate alt text for all images",
      description:
        "Automatically generate descriptive alt text for all images in the document.",
    },
    {
      id: "generate-aria-description",
      title: "Generate aria description for all images",
      description:
        "Create detailed ARIA descriptions for accessibility purposes for all images.",
    },
  ];

  const searchParams = useSearchParams();
  const book = searchParams.get("book") || "";
  const chapter = searchParams.get("chapter") || "";
  const template = searchParams.get("template") || "";

  // --- TOUR LOGIC START ---
  const promptSectionRef = useRef<HTMLDivElement>(null);
  const [spotlightRect, setSpotlightRect] = useState<DOMRect | null>(null);
  const [showTour, setShowTour] = useState(false);
  const { tourSkipped, setTourSkipped } = useTourStore();

  useEffect(() => {
    if (!tourSkipped) {
      setShowTour(true);
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
    if (showTour && promptSectionRef.current) {
      const rect = promptSectionRef.current.getBoundingClientRect();
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

  const SpotlightOverlay = () => {
    if (!showTour) return null;
    // Calculate center of the spotlight for the pulsing indicator
    const centerX = spotlightRect?.left
      ? spotlightRect.left + (spotlightRect.width || 0) / 2
      : 0;
    const centerY = spotlightRect?.top
      ? spotlightRect.top + (spotlightRect.height || 0) / 2
      : 0;
    return createPortal(
      <>
        {/* Transparent Mask - pointerEvents none so it never blocks interaction */}
        <svg
          width="100vw"
          height="100vh"
          style={{
            position: "absolute",
            inset: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none", // SVG never blocks pointer events
            zIndex: 40,
          }}
        >
          <defs>
            <mask id="spotlight-mask">
              <rect x="0" y="0" width="100vw" height="100vh" fill="white" />
              <rect
                x={spotlightRect?.left}
                y={spotlightRect?.top}
                width={spotlightRect?.width}
                height={spotlightRect?.height}
                rx="8"
                fill="black"
              />
            </mask>
          </defs>
          {/* Transparent mask, no color */}
          <rect
            x="0"
            y="0"
            width="100vw"
            height="100vh"
            fill="transparent"
            mask="url(#spotlight-mask)"
          />
        </svg>
        {/* Pulsing focus indicator */}
        <div
          style={{
            position: "fixed",
            left: centerX ? centerX - -625 : 0,
            top: centerY ? centerY - 72 : 0,
            width: 64,
            height: 64,
            pointerEvents: "none",
            zIndex: 10002,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "rgba(0, 180, 90, 0.18)",
              boxShadow: "0 0 0 0 rgba(0,180,90,0.5)",
              animation: "pulse-ring 1.5s cubic-bezier(0.66, 0, 0, 1) infinite",
              zIndex: 1,
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 16,
              top: 16,
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(0, 180, 90, 0.25)",
              zIndex: 2,
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 28,
              top: 28,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#00b45a",
              zIndex: 3,
              boxShadow: "0 0 8px 2px #00b45a55",
            }}
          />
        </div>
        {/* Transparent overlay for skip, but pointerEvents: none so it doesn't block anything */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 41,
            pointerEvents: "none",
          }}
        />
        {/* Pulsing ring animation keyframes */}
        <style>{`
          @keyframes pulse-ring {
            0% {
              transform: scale(0.7);
              opacity: 0.7;
            }
            70% {
              transform: scale(1.2);
              opacity: 0.15;
            }
            100% {
              transform: scale(1.4);
              opacity: 0;
            }
          }
        `}</style>
      </>,
      document.body
    );
  };

  return (
    <div className="container mx-auto py-8 p-8">
      {/* TOUR SPOTLIGHT OVERLAY */}
      {showTour && spotlightRect && (
        <>
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              pointerEvents: "none",
            }}
          >
            {/* SVG Mask */}
            <svg
              width="100vw"
              height="100vh"
              style={{
                position: "fixed",
                inset: 0,
                width: "100vw",
                height: "100vh",
                pointerEvents: "none",
              }}
            >
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
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="rgba(0, 0, 0, 0)"
                mask="url(#spotlight-mask)"
              />
            </svg>
            {/* Tooltip above the spotlighted area */}
            <div
              style={{
                position: "absolute",
                left:
                  spotlightRect.left +
                  spotlightRect.width -
                  Math.min(spotlightRect.width, 340),
                top: spotlightRect.top + spotlightRect.height + 24,
                width: Math.min(spotlightRect.width, 340),
                zIndex: 51,
                background: "white",
                borderRadius: 12,
                boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
                padding: 24,
                fontSize: 18,
                color: "#222",
                pointerEvents: "auto", // Tooltip remains interactive
              }}
            >
              <div className="mb-4 font-semibold">
                Enter a prompt and click Generate Markdown
              </div>
              <div className="mb-6 text-base text-gray-600">
                Type your custom instruction, then press the Generate Markdown
                button to continue.
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleTourSkip}
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-medium hover:bg-gray-300"
                >
                  Skip
                </button>
              </div>
            </div>
          </div>
          <SpotlightOverlay />
        </>
      )}
      <div className="mb-8" ref={promptSectionRef}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold mb-4">Add Custom Instruction</h2>
          <Link
            href={`/projects/pdf-to-ppt/loadingContent?book=${encodeURIComponent(
              book
            )}&chapter=${encodeURIComponent(
              chapter
            )}&template=${encodeURIComponent(template)}`}
            passHref
          >
            <Button className="self-end">Generate Markdown</Button>
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <Textarea placeholder="Enter your custom instruction here" rows={6} />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Pre-defined Instructions</h2>
        <Tabs defaultValue="text-extraction">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="text-extraction">Text Extraction</TabsTrigger>
            <TabsTrigger value="alt-text-generation">
              Alt Text Generation
            </TabsTrigger>
            <TabsTrigger value="markdown-formatting">
              Markdown Formatting
            </TabsTrigger>
          </TabsList>
          <TabsContent value="text-extraction" className="py-4">
            <div className="space-y-6">
              {predefinedPrompts.map((prompt) => (
                <div
                  key={prompt.title}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div className="flex-grow pr-4">
                    <h3 className="font-semibold">{prompt.title}</h3>
                    <p className="text-gray-600 text-sm">
                      {prompt.description}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setSelectedTextExtractionPrompt(prompt.title)
                    }
                    className={
                      selectedTextExtractionPrompt === prompt.title
                        ? "bg-black text-white"
                        : ""
                    }
                  >
                    Use
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="alt-text-generation" className="py-4">
            <div className="space-y-6">
              {altTextOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div className="flex-grow pr-4">
                    <h3 className="font-semibold">{option.title}</h3>
                    <p className="text-gray-600 text-sm">
                      {option.description}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedAltTextOption(option.id)}
                    className={
                      selectedAltTextOption === option.id
                        ? "bg-black text-white"
                        : ""
                    }
                  >
                    Use
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="markdown-formatting" className="py-4">
            <div className="space-y-6">
              {[
                {
                  title: "Headings Conversion",
                  description:
                    "Convert document headings into appropriate Markdown heading levels.",
                },
                {
                  title: "Lists Formatting",
                  description:
                    "Format bullet points and numbered lists using Markdown syntax.",
                },
                {
                  title: "Links and Images",
                  description:
                    "Ensure links and images are correctly represented with Markdown.",
                },
              ].map((option) => (
                <div
                  key={option.title}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div className="flex-grow pr-4">
                    <h3 className="font-semibold">{option.title}</h3>
                    <p className="text-gray-600 text-sm">
                      {option.description}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setSelectedMarkdownFormattingOption(option.title)
                    }
                    className={
                      selectedMarkdownFormattingOption === option.title
                        ? "bg-black text-white"
                        : ""
                    }
                  >
                    Use
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default function PromptsPageWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PromptsPage />
    </Suspense>
  );
}
