"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const ExtractedMarkdownPage = () => {
  const extractedMarkdown = `Interactive Quiz
  
Test your knowledge with this interactive quiz based on the material from your uploaded documents. Each question is designed to reinforce key concepts and help you retain information effectively.

Question 1: What is the primary function of insulin in the human body?

Question 2: Which of the following is a common symptom of dehydration?

Question 3: What is the recommended daily intake of water for an adult?

Question 4: Which nutrient is essential for bone health?

Question 5: What is the normal range for human body temperature?`;

  return (
    <div className="container mx-auto px-8 py-8">
      <h1 className="text-2xl font-bold mb-4">Extracted Markdown</h1>
      <p className="text-gray-600 mb-6">
        Review the extracted markdown below. Tag elements to indicate their role
        in the presentation. This helps our AI understand how to structure your
        slides effectively.
      </p>

      <div className="bg-gray-100 p-6 rounded-md mb-6">
        <pre className="whitespace-pre-wrap">{extractedMarkdown}</pre>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" asChild>
          <Link href="/projects/pdf-to-ppt/prompts">Back</Link>
        </Button>
        <Button asChild>
          <Link href="/projects/pdf-to-ppt/processing">Generate Slides</Link>
        </Button>
      </div>
    </div>
  );
};

export default ExtractedMarkdownPage;
