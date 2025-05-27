"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PreviewPage() {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar for Slide Previews */}
      <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Slide Preview</h3>
        {/* Placeholder for slide previews */}
        <div className="space-y-4">
          <div className="w-full h-32 bg-gray-300 rounded"></div>
          <div className="w-full h-32 bg-gray-300 rounded"></div>
          <div className="w-full h-32 bg-gray-300 rounded"></div>
          {/* Add more placeholders as needed */}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Transform Your Clinical Documents into Engaging Presentations
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Effortlessly convert PDFs and eBooks into dynamic PowerPoint slides
            with SlideSpark. Save time and enhance your presentations for
            nursing education with our intuitive tool.
          </p>
        <div className="flex gap-4 justify-center">
         
          <Button asChild className="mt-4">
            <Link href="/projects/pdf-to-ppt">View Project Table</Link>
          </Button>
          <Button asChild className="mt-4">
            <Link href="">Download Slides</Link>
          </Button>
           <Button asChild className="mt-4">
            <Link href="/projects/pdf-to-ppt/new">New Project</Link>
          </Button>
        </div>
        </div>
      </div>
    </div>
  );
}
