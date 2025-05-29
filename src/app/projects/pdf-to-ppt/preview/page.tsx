"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import templateData from "../templates/templateData.json";

function PreviewPageInner() {
  const searchParams = useSearchParams();
  const book = searchParams.get("book") || "";
  const chapter = searchParams.get("chapter") || "";
  const template = searchParams.get("template") || "";

  // Lookup slides from templateData.json
  let images: string[] = [];
  const bookObj = templateData.find((b) => b.book === book);
  const chapterObj = bookObj?.chapters.find((c) => c.chapter === chapter);
  const templateObj = chapterObj?.templates.find((t) => t.template === template);
  if (templateObj?.slides) {
    images = templateObj.slides;
  }

  const [selectedImage, setSelectedImage] = useState(images[0] || "");

  // If no images, show a message
  if (!images.length) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">No slides found for this selection.</h2>
          <p className="text-gray-600">Please go back and select a different template, chapter, or book.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Left Sidebar for Slide Previews */}
      <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Slide Preview</h3>
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
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-gray-200">
        {selectedImage && (
          <div className="w-full max-w-screen-lg bg-white rounded-lg shadow-lg overflow-hidden">
            <Image
              src={selectedImage}
              alt="Selected Slide Preview"
              width={800}
              height={128}
              className="w-full object-cover object-top rounded"
            />
          </div>
        )}
        <div className="text-center mt-8">
          <div className="flex w-full gap-4 justify-end align-end">
            <Button asChild className="mt-4">
              <Link href="">Download Slides</Link>
            </Button>
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
