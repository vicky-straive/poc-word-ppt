// import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const TemplatesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Select a book</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Template Option 1 */}
        {/* <Link href="/projects/pdf-to-ppt/prompts">
          <div className="border p-4 rounded-md text-center cursor-pointer hover:border-blue-500">
          <Image
                src="/assets/T1.jpg"
                alt="slide1"
                width={400}
                height={128}
                className="w-full h-auto object-cover object-top rounded"
              />
            <p className="text-sm mt-5 font-medium">Nursing Research Template</p>
          </div>
        </Link> */}
        {/* Template Option 2 */}
        <Link href="/projects/pdf-to-ppt/chapters">
          <div className="border p-4 rounded-md text-center cursor-pointer hover:border-blue-500">
            <Image
              src="/assets/B1.jpg"
              alt="slide1"
              width={400}
              height={128}
              className="w-full h-auto object-cover object-top rounded"
            />
            <p className="text-sm mt-5 font-medium">
              Medical Terminology in a Flash
            </p>
          </div>
        </Link>
        {/* Template Option 3 */}
        <Link href="/projects/pdf-to-ppt/chapters">
          <div className="border p-4 rounded-md text-center cursor-pointer hover:border-blue-500">
            <Image
              src="/assets/B2.jpg"
              alt="slide1"
              width={400}
              height={128}
              className="w-full h-auto object-cover object-top rounded"
            />
            <p className="text-sm mt-5 font-medium">
              Medical - Surgical Nursing Fundamentals and Applications
            </p>
          </div>
        </Link>
        {/* Template Option 4 */}
        <Link href="/projects/pdf-to-ppt/chapters">
          <div className="border p-4 rounded-md text-center cursor-pointer hover:border-blue-500">
            <Image
              src="/assets/B3.jpg"
              alt="slide1"
              width={400}
              height={128}
              className="w-full h-auto object-cover object-top rounded"
            />
            <p className="text-sm mt-5 font-medium">
              Understanding Medical-Surgical Nursing
            </p>
          </div>
        </Link>
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

export default TemplatesPage;
