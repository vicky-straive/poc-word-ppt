"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import templateData from "../templates/templateData.json";

const ExtractedMarkdownPage = () => {
  const searchParams = useSearchParams();
  const book = searchParams.get("book") || "";
  const chapter = searchParams.get("chapter") || "";
  const template = searchParams.get("template") || "";

  // Extract the chapter title from the chapter query parameter
  const chapterTitle = chapter.replace(/^Chapter\s*\d+:\s*/, "");
  const bookObj = templateData.find((b) => b.book === book);
  const chapterObj = bookObj?.chapters.find((c) => c.chapter === chapterTitle);
  const templateObj = chapterObj?.templates.find((t) => t.template === template);
  const markdownPath = templateObj?.markdown || "No markdown found.";

  const [markdown, setMarkdown] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (markdownPath.startsWith("/assets/")) {
      setLoading(true);
      fetch(markdownPath)
        .then((res) => res.text())
        .then((text) => setMarkdown(text))
        .catch(() => setMarkdown("Failed to load markdown."))
        .finally(() => setLoading(false));
    } else {
      setMarkdown(markdownPath);
      setLoading(false);
    }
  }, [markdownPath]);

  return (
    <div className="container mx-auto px-8 py-8">
      <h1 className="text-2xl font-bold mb-4">Extracted Markdown</h1>
      <p className="text-gray-600 mb-6">
        Review the extracted markdown below. Tag elements to indicate their role
        in the presentation. This helps our AI understand how to structure your
        slides effectively.
      </p>

      <div className="bg-gray-100 p-6 rounded-md mb-6 min-h-[120px] flex items-center justify-center">
        {loading ? (
          <span className="text-gray-500 animate-pulse">Loading markdown...</span>
        ) : (
          <pre className="whitespace-pre-wrap w-full">{markdown}</pre>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" asChild>
          <Link href={`/projects/pdf-to-ppt/prompts?book=${encodeURIComponent(book)}&chapter=${encodeURIComponent(chapter)}&template=${encodeURIComponent(template)}`}>Back</Link>
        </Button>
        <Button asChild>
          <Link href={`/projects/pdf-to-ppt/processing?book=${encodeURIComponent(book)}&chapter=${encodeURIComponent(chapter)}&template=${encodeURIComponent(template)}`}>Generate Slides</Link>
        </Button>
      </div>
    </div>
  );
};

export default function ExtractedMarkdownPageWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExtractedMarkdownPage />
    </Suspense>
  );
}
