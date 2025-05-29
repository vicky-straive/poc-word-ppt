'use client';

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import chaptersData from "./chaptersData.json";

const ChaptersPage = () => {
  const searchParams = useSearchParams();
  // Get the book title from the query string (e.g., ?book=Medical Terminology in a Flash)
  const bookTitle = searchParams.get("book");
  // Find the book data from chaptersData
  const book = chaptersData.find((b) => b.title === bookTitle) || chaptersData[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Select chapters of {book.title}</h1>
      <ul className="divide-y divide-gray-200 flex flex-col bg-white rounded-md shadow-md">
        {book.chapters.map((chapter, idx) => (
          <li key={idx} className="flex items-center gap-5 py-6 px-2 hover:bg-blue-50 transition-colors">
            <Image
              src={chapter.image}
              alt={chapter.title}
              width={80}
              height={54}
              className="w-20 h-14 object-cover object-top rounded"
            />
            <Link href="/projects/pdf-to-ppt/templates" className="flex-1">
              <span className="block text-base font-medium text-gray-800">
                Chapter {chapter.number}: {chapter.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChaptersPage;
