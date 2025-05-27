import { Button } from "@/components/ui/button";
import Link from "next/link";

const TemplatesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Create a new presentation</h1>
      <p className="text-gray-600 mb-8">Start with a template or create your own</p>

      <h2 className="text-xl font-semibold mb-4">Start with a template</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Template Option 1 */}
        <Link href="/projects/pdf-to-ppt/prompts">
          <div className="border p-4 rounded-md text-center cursor-pointer hover:border-blue-500">
            <div className="w-full h-32 bg-gray-200 rounded-md mb-2"></div> {/* Placeholder for image */}
            <p className="text-sm font-medium">Nursing Report Template</p>
          </div>
        </Link>
        {/* Template Option 2 */}
        <Link href="/projects/pdf-to-ppt/prompts">
          <div className="border p-4 rounded-md text-center cursor-pointer hover:border-blue-500">
            <div className="w-full h-32 bg-gray-200 rounded-md mb-2"></div> {/* Placeholder for image */}
            <p className="text-sm font-medium">Clinical Case Study Template</p>
          </div>
        </Link>
        {/* Template Option 3 */}
        <Link href="/projects/pdf-to-ppt/prompts">
          <div className="border p-4 rounded-md text-center cursor-pointer hover:border-blue-500">
            <div className="w-full h-32 bg-gray-200 rounded-md mb-2"></div> {/* Placeholder for image */}
            <p className="text-sm font-medium">Patient Education Template</p>
          </div>
        </Link>
        {/* Template Option 4 */}
        <Link href="/projects/pdf-to-ppt/prompts">
          <div className="border p-4 rounded-md text-center cursor-pointer hover:border-blue-500">
            <div className="w-full h-32 bg-gray-200 rounded-md mb-2"></div> {/* Placeholder for image */}
            <p className="text-sm font-medium">Medical Research Presentation</p>
          </div>
        </Link>
      </div>

      <h2 className="text-xl font-semibold mb-4">Start from scratch</h2>
      <div className="border-2 border-dashed border-gray-300 p-8 rounded-md text-center">
        <p className="text-lg font-medium mb-4">Create a blank presentation</p>
        <p className="text-gray-600 mb-6">Start with a blank canvas and add your own content</p>
        <Link href="/projects/pdf-to-ppt/prompts"><Button>Create blank presentation</Button></Link>
      </div>
    </div>
  );
};

export default TemplatesPage;