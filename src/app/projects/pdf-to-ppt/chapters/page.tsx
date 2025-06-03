"use client";

"use client";

import { useSearchParams, useRouter } from "next/navigation";
import chaptersData from "./chaptersData.json";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useTourStore } from "../tourStore";
import { createPortal } from "react-dom";
import { IconHandFinger } from "@tabler/icons-react";

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
  const { tourSkipped, hydrate } = useTourStore();
  const radioGroupRef = useRef<HTMLDivElement | null>(null);
  const [showTour, setShowTour] = useState(false);
  const [spotlightStyle, setSpotlightStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    hydrate();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!tourSkipped) setShowTour(true);
    else setShowTour(false);
  }, [tourSkipped]);

  useEffect(() => {
    if (showTour && radioGroupRef.current) {
      const rect = radioGroupRef.current.getBoundingClientRect();
      setSpotlightStyle({
        left: rect.left - 12,
        top: rect.top - 8,
        width: rect.width + 24,
        height: rect.height + 16,
      });
    }
  }, [showTour]);

  useEffect(() => {
    if (showTour) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showTour]);

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
            <div
              role="radiogroup"
              ref={unitIndex === 0 ? radioGroupRef : undefined}
              style={
                showTour && unitIndex === 0
                  ? { position: "relative", zIndex: 10001 }
                  : {}
              }
            >
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

  const SpotlightOverlay = () => {
    if (!showTour) return null;
    const centerX = spotlightStyle.left + spotlightStyle.width / 2;
    const centerY = spotlightStyle.top + spotlightStyle.height / 2;
    return createPortal(
      <>
        <svg
          width="100vw"
          height="100vh"
          style={{
            position: "absolute",
            inset: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: 40,
          }}
        >
          <defs>
            <mask id="spotlight-mask">
              <rect x="0" y="0" width="100vw" height="100vh" fill="white" />
              <rect
                x={spotlightStyle.left}
                y={spotlightStyle.top}
                width={spotlightStyle.width}
                height={spotlightStyle.height}
                rx="8"
                fill="black"
              />
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="100vw"
            height="100vh"
            fill="transparent"
            mask="url(#spotlight-mask)"
          />
        </svg>
        {/* IconHandFinger pointer indicator */}
        <span
          style={{
            position: "fixed",
            left: centerX - -254,
            top: centerY - 55,
            zIndex: 10002,
            pointerEvents: "none",
            fontSize: 48,
            color: "#3c695a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "move-left-right-smooth 1.2s cubic-bezier(0.4,0,0.2,1) infinite",
          }}
        >
          <IconHandFinger stroke={2} />
        </span>
        <style>{`
          @keyframes move-left-right-smooth {
            0%, 100% { transform: scaleX(-1) rotate(90deg) translateY(0); }
            20% { transform: scaleX(-1) rotate(90deg) translateY(-10px); }
            50% { transform: scaleX(-1) rotate(90deg) translateY(10px); }
            80% { transform: scaleX(-1) rotate(90deg) translateY(-10px); }
          }
          @keyframes blink-cursor-smooth {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
        `}</style>
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 41,
            pointerEvents: "none",
          }}
        />
      </>,
      document.body
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-between items-start">
      <SpotlightOverlay />
      <div>
        <h1 className="text-2xl font-bold mb-4 m-2">Select a chapter</h1>
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
