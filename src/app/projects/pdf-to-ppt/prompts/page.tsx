"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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

  return (
    <div className="container mx-auto py-8 p-8">
      <h1 className="text-3xl font-bold mb-4">Custom Instructions</h1>
      <p className="text-gray-600 mb-8">
        Tailor the AI&#39;s content extraction with custom instruction or use
        pre-defined options.
      </p>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold mb-4">Add Custom Instruction</h2>
          <Link href="/projects/pdf-to-ppt/loadingContent" passHref>
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

export default PromptsPage;
