"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import templateData from "../templates/templateData.json";
import { IconRefresh } from "@tabler/icons-react";
import { Download } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function PreviewPageInner() {
  const searchParams = useSearchParams();
  const book = searchParams.get("book") || "";
  const chapter = searchParams.get("chapter") || "";
  const template = searchParams.get("template") || "";

  // Extract just the chapter title (remove 'Chapter X: ' if present)
  const chapterTitle = chapter.replace(/^Chapter\s*\d+:\s*/, "");
  const bookObj = templateData.find((b) => b.book === book);
  const chapterObj = bookObj?.chapters.find((c) => c.chapter === chapterTitle);
  const templateObj = chapterObj?.templates.find(
    (t) => t.template === template
  );
  let images: string[] = [];
  if (templateObj?.slides) {
    images = templateObj.slides;
  }

  const [selectedImage, setSelectedImage] = useState(images[0] || "");

  // If no images, show a message
  if (!images.length) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">
            No slides found for this selection.
          </h2>
          <p className="text-gray-600">
            Please go back and select a different template, chapter, or book.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Left Sidebar for Slide Previews */}
      <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-auto">
          <h3 className="text-sm font-semibold mb-4">Slide Preview</h3>
          <Button className="mb-4" variant="outline">
            <Link href="">Download All Slides</Link>
          </Button>
        </div>
        {/* Placeholder for slide previews */}
        <div className="space-y-2">
          {images.map((src, index) => (
            <div
              key={index}
              className={`relative w-full rounded cursor-pointer ${
                selectedImage === src ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setSelectedImage(src)}
            >
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                width={400}
                height={128}
                className="w-full h-auto object-cover object-top rounded"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-10 transition-opacity rounded"></div>
            </div>
          ))}
          {/* Add more image containers as needed */}
          <div className="w-full h-32 rounded flex items-center justify-center">
            {/* Placeholder for potential additional content or spacing */}
          </div>
        </div>
      </div>

      {/* Main Content Area */}

      <div className="w-full flex justify-center items-start bg-gray-200">
        {selectedImage && (
          <div className="w-full m-4 justify-center bg-white rounded-lg shadow-lg overflow-hidden max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
            <Image
              src={selectedImage}
              alt="Selected Slide Preview"
              width={800}
              height={128}
              className="w-full object-cover object-top rounded"
            />
          </div>
        )}
        <div className="flex flex-col items-center justify-center mr-6 ">
          <div className="mt-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                  <IconRefresh />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <span>Regenerate Slide</span>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="mt-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                  <Download color="black" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <span>Download Slide</span>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<div>Loading preview...</div>}>
      <PreviewPageInner />
    </Suspense>
  );
}
