"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import chaptersData from "./chaptersData.json";

const ChaptersPage = () => {
  const searchParams = useSearchParams();
  // Get the book title from the query string (e.g., ?book=Medical Terminology in a Flash)
  const bookTitle = searchParams.get("book");
  // Find the book data from chaptersData
  const book =
    chaptersData.find((b) => b.title === bookTitle) || chaptersData[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        Select chapters of {book.title}
      </h1>
      <ul className="divide-y divide-gray-200 flex flex-col bg-white rounded-md shadow-md">
        {book.chapters.map((chapter, idx) => (
          <li
            key={idx}
            className="flex items-center gap-5 py-6 px-2 hover:bg-blue-50 transition-colors"
          >
            <Image
              src={chapter.image}
              alt={chapter.title}
              width={80}
              height={54}
              className="w-30 h-34 object-cover object-top rounded"
            />
            <Link
              href={{
                pathname: "/projects/pdf-to-ppt/templates",
                query: {
                  book: book.title,
                  chapter: `Chapter ${chapter.number}: ${chapter.title}`,
                },
              }}
              className="flex-1"
            >
              <div className="flex flex-col gap-1">
                <span className="block text-base font-medium text-gray-800 mb-3">
                  <span className="font-semibold text-xl">
                    Chapter {chapter.number}:
                  </span>{" "}
                  <span className="font-semibold text-xl">{chapter.title}</span>
                </span>
                <span className="block text-base font-medium text-gray-800">
                  <span className="font-semibold">Description:</span>{" "}
                  <span className="font-normal text-gray-600">
                    {chapter.description}
                  </span>
                </span>
                <span className="block text-base font-medium text-gray-800">
                  <span className="font-semibold">Keywords:</span>{" "}
                  <span className="font-normal text-gray-600">
                    {chapter.keywords.join(", ")}
                  </span>
                </span>
                <span className="block text-base font-medium text-gray-800">
                  <span className="font-semibold">Concepts:</span>{" "}
                  <span className="font-normal text-gray-600">
                    {chapter.concepts.join(", ")}
                  </span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

import { Suspense } from "react";

function ChaptersPageWithSuspense() {
  return (
    <Suspense fallback={<p>Loading chapters...</p>}>
      <ChaptersPage />
    </Suspense>
  );
}

export default ChaptersPageWithSuspense;
