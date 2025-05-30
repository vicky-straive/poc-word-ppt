"use client";

"use client";

import { useSearchParams, useRouter } from "next/navigation";
import chaptersData from "./chaptersData.json";
import { useState } from "react";
import Image from "next/image";

interface Chapter {
  number: number;
  title: string;
  image: string;
  keywords: string[];
  description: string;
  concepts: string[];
}

interface Unit {
  title: string;
  chapters: Chapter[];
}

interface Book {
  title: string;
  image: string;
  icon: string;
  author: string;
  isbn: string;
  description: string;
  units: Unit[];
}

const ChaptersPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookTitle = searchParams.get("book");
  const book: Book =
    (chaptersData.find((b) => b.title === bookTitle) as Book) ||
    (chaptersData[0] as Book);

  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

  const handleChapterChange = (chapterTitle: string) => {
    setSelectedChapter(chapterTitle === selectedChapter ? null : chapterTitle);
    if (chapterTitle !== selectedChapter) {
      router.push(
        `/projects/pdf-to-ppt/templates?book=${book.title}&chapter=${chapterTitle}`
      );
    }
  };

  const ChapterTree = ({ units }: { units: Unit[] }) => {
    return (
      <ul>
        {units.map((unit, unitIndex) => (
          <li key={unitIndex}>
            <h3 className="text-lg font-semibold mt-2 ml-5 mb-5">
              {unit.title}
            </h3>
            <div role="radiogroup">
              {unit.chapters.map((chapter, chapterIndex) => (
                <div
                  key={chapterIndex}
                  className="flex items-center space-x-2 py-2 ml-5"
                >
                  <input
                    type="radio"
                    id={`chapter-${chapter.number}`}
                    name="chapter"
                    value={chapter.title}
                    checked={selectedChapter === chapter.title}
                    onChange={() => handleChapterChange(chapter.title)}
                    className="appearance-none border border-green-700 size-5 rounded-full align-middle transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-700 checked:bg-green-700 checked:border-green-700"
                  />
                  <label
                    htmlFor={`chapter-${chapter.number}`}
                    className="text-lg font-semibold cursor-pointer"
                  >
                    Chapter {chapter.number}: {chapter.title}
                  </label>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-between items-start">
      <div>
        <h1 className="text-2xl font-bold mb-4 m-2">Select a Chapter</h1>
        <div className="mb-4 m-2"></div>
        <h2 className="text-2xl font-semibold mt-8 mb-5 ml-2">
          Book: {book.title}
        </h2>
        <ChapterTree units={book.units} />
      </div>
      <div className="flex items-center p-auto mr-30">
        <Image
          src={
            book.image.startsWith("/")
              ? book.image
              : `/` + book.image.replace(/^public\//, "")
          }
          alt={book.title}
          width={2000}
          height={800}
          className="h-90 w-auto "
        />
      </div>
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
