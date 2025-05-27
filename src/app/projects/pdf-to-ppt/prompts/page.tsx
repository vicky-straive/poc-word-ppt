'use client';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const PromptsPage = () => {
  const predefinedPrompts = [
    {
      title: "Extract key concepts",
      description: "Extract key concepts and definitions from the text."
    },
    {
      title: "Summarize main points",
      description: "Summarize the main points of each section."
    },
    {
      title: "Identify medical terms",
      description: "Identify and list important medical terms."
    },
    {
      title: "Format for PowerPoint",
      description: "Extract and format text for PowerPoint slides."
    },
  ];

  return (
    <div className="container mx-auto py-8 p-8">
      <h1 className="text-3xl font-bold mb-4">Custom Prompts</h1>
      <p className="text-gray-600 mb-8">Tailor the AI's content extraction with custom prompts or use pre-defined options.</p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Prompt</h2>
        <div className="flex flex-col gap-4">
          <Textarea placeholder="Enter your custom prompt here" rows={6} />
          <Button className="self-end">Save Prompt</Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Pre-defined Prompts</h2>
        <Tabs defaultValue="text-extraction">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="text-extraction">Text Extraction</TabsTrigger>
            <TabsTrigger value="alt-text-generation">Alt Text Generation</TabsTrigger>
            <TabsTrigger value="markdown-formatting">Markdown Formatting</TabsTrigger>
          </TabsList>
          <TabsContent value="text-extraction" className="py-4">
            <div className="space-y-6">
              {predefinedPrompts.map((prompt, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-4">
                  <div>
                    <h3 className="font-semibold">{prompt.title}</h3>
                    <p className="text-gray-600 text-sm">{prompt.description}</p>
                  </div>
                  <Button variant="outline">Use</Button>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="alt-text-generation" className="py-4">
            <div className="space-y-4">
              <div className="p-4 border rounded-md cursor-pointer hover:bg-gray-50">
                <h3 className="font-semibold">Generate alt text for all images</h3>
                <p className="text-gray-600 text-sm">Automatically generate descriptive alt text for all images in the document.</p>
              </div>
              <div className="p-4 border rounded-md cursor-pointer hover:bg-gray-50">
                <h3 className="font-semibold">Generate aria description for all images</h3>
                <p className="text-gray-600 text-sm">Create detailed ARIA descriptions for accessibility purposes for all images.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="markdown-formatting" className="py-4">
             <p className="text-gray-500">Markdown Formatting prompts will appear here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PromptsPage;