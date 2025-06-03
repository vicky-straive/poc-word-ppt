"use client";

import { Button } from "@/components/ui/button";
import { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import { IconHandFinger } from "@tabler/icons-react";
import { createPortal } from "react-dom";
import { useTourStore } from "../tourStore";

import { useRef } from "react";

const PromptsPage = () => {
  const promptSectionRef = useRef<HTMLDivElement | null>(null);
  const [spotlightRect, setSpotlightRect] = useState<DOMRect | null>(null);
  const { tourSkipped, hydrate } = useTourStore();
  const [showTour, setShowTour] = useState(false);
  const generateBtnRef = useRef<HTMLButtonElement | null>(null);
  const [pointerPos, setPointerPos] = useState<{ left: number; top: number } | null>(null);

  useEffect(() => {
    hydrate();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!tourSkipped) setShowTour(true);
    else setShowTour(false);
  }, [tourSkipped]);

  useEffect(() => {
    if (showTour && promptSectionRef.current) {
      const rect = promptSectionRef.current.getBoundingClientRect();
      setSpotlightRect(rect);
    }
  }, [showTour]);

  useEffect(() => {
    function updatePointer() {
      if (showTour && generateBtnRef.current) {
        const rect = generateBtnRef.current.getBoundingClientRect();
        setPointerPos({
          left: rect.left - 46, // 16px to the left of the button
          top: rect.top + rect.height / 1.2, // center vertically
        });
      } else {
        setPointerPos(null);
      }
    }
    updatePointer();
    window.addEventListener('scroll', updatePointer, true);
    window.addEventListener('resize', updatePointer);
    return () => {
      window.removeEventListener('scroll', updatePointer, true);
      window.removeEventListener('resize', updatePointer);
    };
  }, [showTour]);

  const SpotlightOverlay = () => {
    if (!showTour || !spotlightRect) return null;
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
              <rect
                x={spotlightRect.left}
                y={spotlightRect.top}
                width={spotlightRect.width}
                height={spotlightRect.height}
                rx="8"
                fill="black"
              />
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
        {/* IconHandFinger pointer indicator */}
        {showTour && pointerPos && (
          <span
            style={{
              position: "fixed",
              left: pointerPos.left,
              top: pointerPos.top,
              zIndex: 10002,
              pointerEvents: "none",
              fontSize: 48,
              color: "#3c695a",
              rotate: "90deg",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "blink-cursor-smooth 1.2s cubic-bezier(0.4,0,0.2,1) infinite",
              transform: "translate(-100%, -50%)",
            }}
          >
            <IconHandFinger stroke={2} />
          </span>
        )}
        <style>{`
          @keyframes blink-cursor-smooth {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
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
  const [selectedAltTextOption, setSelectedAltTextOption] = useState<string | null>(null);
  const [selectedTextExtractionPrompt, setSelectedTextExtractionPrompt] = useState<string | null>(null);
  const [selectedMarkdownFormattingOption, setSelectedMarkdownFormattingOption] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const book = searchParams.get("book") || "";
  const chapter = searchParams.get("chapter") || "";
  const template = searchParams.get("template") || "";

  return (
    <div className="container mx-auto py-8 p-8">
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
            <Button
              ref={generateBtnRef}
              className={showTour ? "border-pulse relative self-end" : "self-end"}
              style={showTour ? { borderColor: '#3c695a', boxShadow: '0 0 0 2px rgb(34, 158, 75)', transition: 'box-shadow 0.3s, border-color 0.3s' } : {}}
            >
              Generate Markdown
            </Button>
          </Link>
        </div>
        <div className="flex flex-col gap-4 mt-8">
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

      <SpotlightOverlay />
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

export default function PromptsPageWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PromptsPage />
    </Suspense>
  );
}
