'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";

const ExtractedMarkdownPage = () => {
  const extractedMarkdown = `Patient History: Patient presented to the emergency room with a chief complaint of chest pain. The patient reported that the pain started suddenly and is a 7/10 on the pain scale. The patient denies any known allergies and has been taking aspirin for headache on and off for the past few months. Medical Guideline Excerpt: The American Heart Association recommends that all patients presenting with acute myocardial infarction receive thrombolytic therapy within 3 hours of symptom onset. The decision to use thrombolytics should be made in consultation with the patient and their family. Clinical Procedure Description: The procedure involves a minimally invasive approach to the surgical site. The surgeon will make a small incision in the skin and then insert a specialized instrument into the cavity. Once inside, the surgeon will use a camera to view the area and then perform the necessary steps to repair the affected structure.`;

  return (
    <div className="container mx-auto px-8 py-8">
      <h1 className="text-2xl font-bold mb-4">Extracted Markdown</h1>
      <p className="text-gray-600 mb-6">
        Review the extracted markdown below. Tag elements to indicate their role in the presentation. This helps our AI understand how to structure your slides effectively.
      </p>

      <div className="bg-gray-100 p-6 rounded-md mb-6">
        <pre className="whitespace-pre-wrap">{extractedMarkdown}</pre>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" asChild>
          <Link href="/projects/pdf-to-ppt/prompts">Back</Link>
        </Button>
        <Button>Generate Slides</Button>
      </div>
    </div>
  );
};

export default ExtractedMarkdownPage;