'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const UploadPage = () => {
  const router = useRouter();

  const handleBrowseFilesClick = () => {
    // TODO: Implement file browsing logic
    console.log("Browse Files clicked");
  };

  // Temporary function to simulate upload and redirect
  const handleSimulateUpload = () => {
    router.push('/projects/pdf-to-ppt/templates');
  };

  // TODO: Implement drag and drop functionality

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Upload PDF or eBook</h1>
      <p className="text-gray-600 mb-6">
        Upload your PDF or eBook file to extract content into markdown format. This markdown can then be used to generate
        PowerPoint presentations.
      </p>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center flex flex-col items-center justify-center mb-4">
        <p className="text-lg font-semibold mb-2">Drag and drop a PDF or eBook here</p>
        <p className="text-gray-500 mb-4">Or browse files</p>
        <Button onClick={handleBrowseFilesClick}>Browse Files</Button>
        <Button onClick={handleSimulateUpload} className="mt-4">Simulate Upload (Temporary)</Button>
      </div>

      <p className="text-gray-500 text-sm text-center">
        Supported file types: PDF, EPUB. Maximum file size: 50MB
      </p>
    </div>
  );
};

export default UploadPage;