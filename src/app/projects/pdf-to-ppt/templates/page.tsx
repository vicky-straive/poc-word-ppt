"use client";

import { Suspense } from "react";
// import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const TemplatesPage = () => {
  const searchParams = useSearchParams();
  const book = searchParams.get("book");
  const chapter = searchParams.get("chapter");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-4">Create a new presentation</h1>
          <p className="text-gray-600 mb-8">
            Start with a template or create your own
          </p>
        </div>
        {(book || chapter) && (
          <div className="mb-6">
            {book && <h2 className="text-2xl font-bold mb-4 text-end">Book: {book}</h2>}
            {chapter && (
              <p className="text-gray-600 text-end">
                Chapter: {chapter}
              </p>
            )}
          </div>
        )}
      </div>

      <h2 className="text-xl font-bold mb-4">Select a template</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Template Option 1 */}
        {/* <Link href="/projects/pdf-to-ppt/prompts">
          <div className="border p-4 rounded-md text-center cursor-pointer hover:border-blue-500">
          <Image
                src="/assets/T1.jpg"
                alt="slide1"
                width={400}
                height={128}
                className="w-full h-auto object-cover object-top rounded"
              />
            <p className="text-sm mt-5 font-medium">Nursing Research Template</p>
          </div>
        </Link> */}
        {/* Template Option 2 */}
        <Link href="/projects/pdf-to-ppt/prompts">
          <div className="border p-4 rounded-md text-center cursor-pointer hover:border-blue-500">
            <p className="text-md mb-5 font-medium">Nursing Lecture Template</p>
            <Image
              src="/assets/T2.jpg"
              alt="slide1"
              width={400}
              height={128}
              className="w-full h-auto object-cover object-top rounded"
            />
            <p className="text-sm mt-5">
              Clear and structured template for teaching fundamental nursing
              concepts and theories
            </p>
          </div>
        </Link>
        {/* Template Option 3 */}
        <Link href="/projects/pdf-to-ppt/prompts">
          <div className="border p-4 rounded-md text-center cursor-pointer hover:border-blue-500">
            <p className="text-md mb-5 font-medium">
              Nursing Case Studies Template
            </p>
            <Image
              src="/assets/T3.jpg"
              alt="slide1"
              width={400}
              height={128}
              className="w-full h-auto object-cover object-top rounded"
            />
            <p className="text-sm mt-5">
              Interactive template designed for presenting and analyzing
              real-world patient cases
            </p>
          </div>
        </Link>
        {/* Template Option 4 */}
        <Link href="/projects/pdf-to-ppt/prompts">
          <div className="border p-4 rounded-md text-center cursor-pointer hover:border-blue-500">
            <p className="text-md mb-5 font-medium">
              Nursing Concepts Template
            </p>
            <Image
              src="/assets/T4.jpg"
              alt="slide1"
              width={400}
              height={128}
              className="w-full h-auto object-cover object-top rounded"
            />

            <p className="text-sm mt-5">
              Comprehensive template for detailed lecture notes and key learning
              points
            </p>
          </div>
        </Link>
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
