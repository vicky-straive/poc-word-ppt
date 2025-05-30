"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import chaptersData from "./chaptersData.json";

const ChaptersPage = () => {
  const searchParams = useSearchParams();
  // Get the book title from the query string (e.g., ?book=Medical Terminology in a Flash)
  const bookTitle = searchParams.get("book");
  // Find the book data from chaptersData
  const book =
    chaptersData.find((b) => b.title === bookTitle) || chaptersData[0];
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

  const handleRadioChange = (chapterTitle: string) => {
    setSelectedChapter(chapterTitle);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Select chapter</h1>
      <p className="text-gray-600 mb-6">{book.title}</p>

      {book.units.map((unit) => (
        <div key={unit.unit} className="mb-6">
          <h2 className="text-xl font-semibold mb-3">{`Unit ${unit.unit}: ${unit.title}`}</h2>
          <ul className="space-y-3">
            {unit.chapters.map((chapter) => (
              <li key={chapter.title} className="flex items-center">
                <input
                  type="radio"
                  id={`chapter-${chapter.title}`}
                  className="mr-2 w-5 h-5 accent-green-500"
                  checked={selectedChapter === chapter.title}
                  onChange={() => handleRadioChange(chapter.title)}
                />
                <label
                  htmlFor={`chapter-${chapter.title}`}
                  className="text-lg text-gray-800 cursor-pointer"
                >
                  {chapter.title}
                </label>
              </li>
            ))}
          </ul>
            </div>
      ))}
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
