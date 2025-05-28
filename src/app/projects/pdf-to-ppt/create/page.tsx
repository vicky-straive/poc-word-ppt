"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function CreatePresentationPage() {
  const [template, setTemplate] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [keywords, setKeywords] = useState("");
  // const [notes, setNotes] = useState("");

  const searchParams = useSearchParams();

  useEffect(() => {
    const templateFromUrl = searchParams.get('template');
    if (templateFromUrl) {
      setTemplate(templateFromUrl);
    }}, [searchParams]);

  return (
    <div className="container mx-auto py-8 px-8">
      <h1 className="text-2xl font-bold mb-6">Create a Presentation</h1>

      <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
        {/* Select Template */}
        {/* Uncomment and use Shadcn Select if available */}
        {/*
        <div>
          <label htmlFor="template" className="block text-sm font-medium text-gray-700">Select a template</label>
          <Select onValueChange={setTemplate} value={template}>
            <SelectTrigger id="template">
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent>
              {/\* Add your template options here *\/}
              <SelectItem value="template1">Template 1</SelectItem>
              <SelectItem value="template2">Template 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        */}
        {/* Placeholder for template select if Shadcn Select is not used */}
        <div>
          <label htmlFor="template" className="block text-sm font-medium text-gray-700">Selected template</label>
          <Input
            id="template"
            placeholder="Select a template"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            disabled
          />
        </div>


        {/* Presentation Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Presentation title</label>
          <Input
            id="title"
            placeholder="Presentation title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Author Name */}
        <div>
 <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author name</label>
 <Select onValueChange={setAuthor} value={author}>
 <SelectTrigger id="author">
 <SelectValue placeholder="Select an author" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="author1">Author One</SelectItem>
 <SelectItem value="author2">Author Two</SelectItem>
 </SelectContent>
 </Select>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
          <Input
            id="subject"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <Input
            id="date"
            type="date"
            placeholder="mm-dd-yyyy"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Keywords */}
        <div>
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">Keywords</label>
          <Input
            id="keywords"
            placeholder="Keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>

        {/* Notes */}
        {/* <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            id="notes"
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
          />
        </div> */}

        {/* Upload Button */}
        <div className="flex justify-end mt-4">
          <Button asChild><Link href="/projects/pdf-to-ppt/upload">Upload PDF or eBook</Link></Button>
        </div>
      </div>
    </div>
  );
}