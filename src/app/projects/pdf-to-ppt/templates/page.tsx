"use client";

import { Suspense } from "react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

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

  return (
    <div className="container mx-auto px-4 py-8">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {templateOptions.map((tpl) => (
          <button
            key={tpl.name}
            className="border p-4 rounded-md text-center cursor-pointer hover:border-blue-500 bg-white"
            onClick={() => handleTemplateSelect(tpl.name)}
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
