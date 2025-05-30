"use client";

"use client";

import { useSearchParams, useRouter } from "next/navigation";
import chaptersData from "./chaptersData.json";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

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
            <ul className="list-none pl-5">
              {unit.chapters.map((chapter, chapterIndex) => (
                <li key={chapterIndex} className="py-2 ml-5">
                  <label
                    className="flex items-center space-x-2"
                    htmlFor={`chapter-${chapter.number}`}
                  >
                    <Checkbox
                      id={`chapter-${chapter.number}`}
                      checked={selectedChapter === chapter.title}
                      onCheckedChange={() => handleChapterChange(chapter.title)}
                    />
                    <span>{chapter.title}</span>
                  </label>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 m-2">Select Chapters</h1>
      <div className="mb-4 m-2">
        <h2 className="text-xl font-semibold mb-5">Book: {book.title}</h2>
        <ChapterTree units={book.units} />
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
