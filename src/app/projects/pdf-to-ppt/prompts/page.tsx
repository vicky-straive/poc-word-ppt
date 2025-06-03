"use client";

import { Button } from "@/components/ui/button";
import { useState, Suspense } from "react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";

import { useRef } from "react";

const PromptsPage = () => {
  const promptSectionRef = useRef<HTMLDivElement | null>(null);
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

      <div
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          width: 64,
          height: 64,
          pointerEvents: "none",
          zIndex: 10002,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "translate(-50%, -50%)",
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
            background: "rgba(255, 221, 51, 0.18)", // yellow
            boxShadow: "0 0 0 0 rgba(255,221,51,0.5)",
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
            background: "rgba(255, 221, 51, 0.25)", // yellow
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
            background: "#ffdd33", // yellow
            zIndex: 3,
            boxShadow: "0 0 8px 2px #ffdd3355",
          }}
        />
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
