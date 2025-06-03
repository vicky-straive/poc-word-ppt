"use client";

// import { Button } from "@/components/ui/button};
import Link from "next/link";
import Image from "next/image";
import chaptersData from "../chapters/chaptersData.json";
import { Separator } from "@/components/ui/separator";
import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTourStore } from "../tourStore";
import { IconHandFinger } from '@tabler/icons-react';

const BookSelectionPage = () => {
  const focusRef = useRef<HTMLDivElement | null>(null);
  const [showTour, setShowTour] = useState(false);
  const [spotlightStyle, setSpotlightStyle] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [pointerPos, setPointerPos] = useState<{ left: number; top: number }>({ left: 0, top: 0 });
  const { tourSkipped, hydrate } = useTourStore();

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
    function updatePointer() {
      if (showTour && focusRef.current) {
        const rect = focusRef.current.getBoundingClientRect();
        setPointerPos({
          left: rect.left + rect.width / 2 - 8 + window.scrollX,
          top: rect.bottom + -520 + window.scrollY,
        });
      }
    }
    updatePointer();
    window.addEventListener('scroll', updatePointer, true);
    window.addEventListener('resize', updatePointer);
    return () => {
      window.removeEventListener('scroll', updatePointer, true);
      window.removeEventListener('resize', updatePointer);
    };
  }, [showTour]);

  const SpotlightOverlay = () => {
    if (!showTour) return null;
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
            position: "absolute",
            left: pointerPos.left,
            top: pointerPos.top,
            zIndex: 10002,
            pointerEvents: "none",
            fontSize: 48,
            color: "#3c695a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "blink-cursor-smooth 1.2s cubic-bezier(0.4,0,0.2,1) infinite",
            transform: "scaleY(-1)",
          }}
        >
          <IconHandFinger stroke={2} />
        </span>
        <style>{`
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
    <>
      <style>{`body { overflow-x: hidden !important; }`}</style>
      <div className="container mx-auto px-4 py-8 overflow-x-hidden">
        <SpotlightOverlay />
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
                className={`border p-4 rounded-lg shadow-sm text-center cursor-pointer hover:shadow-md hover:border-blue-500 h-full flex flex-col justify-between ${idx === 0 && showTour ? "border-pulse" : ""}`}
                style={{
                  ...(idx === 0 && showTour
                    ? {
                        position: "relative",
                        zIndex: 50,
                        borderColor: '#3c695a',
                        boxShadow: '0 0 0 2px #3c695a80',
                        transition: 'box-shadow 0.3s, border-color 0.3s',
                      }
                    : idx === 0
                      ? { boxShadow: 'none', borderColor: '#e5e7eb', animation: 'none' }
                      : {}),
                }}
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
        <style>{`
          @keyframes glow-border {
            0%, 100% { box-shadow: 0 0 0 2px #3c695a, 0 0 8px 4px #3c695a80; border-color: #3c695a; }
            50% { box-shadow: 0 0 0 2px #3c695a80, 0 0 16px 8px #3c695a80; border-color: #3c695a80; }
          }
          .glow-border {
            animation: glow-border 1.2s cubic-bezier(0.4,0,0.2,1) infinite;
            border-color: #3c695a !important;
          }
          @keyframes border-pulse-anim {
            0%, 100% {
              box-shadow: 0 0 0 2px rgb(34, 158, 75);
              border-color: rgb(34, 158, 75);
            }
            50% {
              box-shadow: 0 0 0 6px rgb(34, 158, 75);
              border-color: #3c695a;
            }
          }
          .border-pulse {
            border-width: 2px !important;
            animation: border-pulse-anim 1.4s infinite;
            box-shadow: 0 0 0 2px rgb(34, 158, 75);
            border-color: rgb(34, 158, 75) !important;
          }
        `}</style>
      </div>
    </>
  );
};

export default BookSelectionPage;
