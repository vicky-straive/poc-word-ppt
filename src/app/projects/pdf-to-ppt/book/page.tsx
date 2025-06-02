"use client";

// import { Button } from "@/components/ui/button};
import Link from "next/link";
import Image from "next/image";
import chaptersData from "../chapters/chaptersData.json";
import { Separator } from "@/components/ui/separator";
import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTourStore } from "../tourStore";

const BookSelectionPage = () => {
  const focusRef = useRef<HTMLDivElement | null>(null);
  const [showTour, setShowTour] = useState(false);
  const [spotlightStyle, setSpotlightStyle] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const { tourSkipped, setTourSkipped, hydrate } = useTourStore();

  useEffect(() => {
    hydrate();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!tourSkipped) setShowTour(true);
    else setShowTour(false);
  }, [tourSkipped]);

  useEffect(() => {
    if (showTour && focusRef.current) {
      const rect = focusRef.current.getBoundingClientRect();
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

  const handleSkipTour = () => {
    setShowTour(false);
    setTourSkipped(true);
  };

  const handleNextTour = () => {
    setShowTour(false);
    // Do NOT setTourSkipped here, so the tour continues on next page
  };

  const SpotlightOverlay = () => {
    if (!showTour) return null;
    return createPortal(
      <div style={{ position: "fixed", inset: 0, zIndex: 40, pointerEvents: "auto" }}>
        <svg width="100vw" height="100vh" style={{ position: "absolute", inset: 0, width: "100vw", height: "100vh" }}>
          <defs>
            <mask id="spotlight-mask">
              <rect x="0" y="0" width="100vw" height="100vh" fill="white" />
              <rect
                x={spotlightStyle.left}
                y={spotlightStyle.top}
                width={spotlightStyle.width}
                height={spotlightStyle.height}
                rx="12"
                fill="black"
              />
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="100vw"
            height="100vh"
            fill="rgba(0,0,0,0.7)"
            mask="url(#spotlight-mask)"
          />
        </svg>
        <div style={{ position: "fixed", inset: 0, zIndex: 41, pointerEvents: "auto" }} onClick={() => setShowTour(false)} />
      </div>,
      document.body
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SpotlightOverlay />
      {/* Tour Tooltip for the first book */}
      {showTour && focusRef.current && (
        <div
          style={{
            position: "fixed",
            left: spotlightStyle.left + spotlightStyle.width + 24,
            top: spotlightStyle.top,
            zIndex: 100,
            background: "white",
            borderRadius: 8,
            boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
            padding: 16,
            minWidth: 260,
            maxWidth: 320,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <div className="mb-2 font-semibold text-center">
            Click here to select{" "}
            <span className="text-green-700 font-bold">
              Medical Terminology in a Flash
            </span>{" "}
            and view its chapters!
          </div>
          <div className="flex gap-2 mt-2">
            <button
              className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
              onClick={handleNextTour}
            >
              Next
            </button>
            <button
              className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400"
              onClick={handleSkipTour}
            >
              Skip
            </button>
          </div>
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4 text-center">
        Medical Education Excellence{" "}
      </h1>
      <p className="text-center py-4">
        Comprehensive medical textbooks for healthcare professional and students
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {chaptersData.map((book, idx) => (
          <Link
            href={{
              pathname: "/projects/pdf-to-ppt/chapters",
              query: { book: book.title },
            }}
            key={idx}
            passHref
          >
            <div
              ref={idx === 0 ? focusRef : undefined}
              className="border p-4 rounded-lg shadow-sm text-center cursor-pointer hover:shadow-md hover:border-blue-500 h-full flex flex-col justify-between"
              style={idx === 0 && showTour ? { position: "relative", zIndex: 50 } : {}}
            >
              <div>
                <Image
                  src={book.image.replace(/^public\//, "/")}
                  alt={book.title}
                  width={400}
                  height={400}
                  className="w-full h-80 object-cover object-top rounded-md mb-4 flex mx-auto"
                />
                <h3 className="text-md font-bold text-gray-800 mb-1">
                  {book.title}
                </h3>
                <p className="text-xs text-gray-600 px-2 py-2">{book.description}</p>
                <Separator
                  orientation="horizontal"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs font-bold text-[#3c695a] px-2">
                    {book.author}
                  </p>
                  <p className="text-xs font-bold px-2 text-[#3c695a]">
                    {book.isbn}
                  </p>
                </div>
              </div>
            </div>
          </Link>
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

export default BookSelectionPage;
