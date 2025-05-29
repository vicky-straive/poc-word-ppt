import Link from "next/link";
import Image from "next/image";

const ChaptersPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Select a Chapter</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Chapter Option 1 */}
        <Link href="/projects/pdf-to-ppt/templates">
          <div className="border p-4 rounded-md text-center cursor-pointer hover:border-blue-500">
            <Image
              src="/assets/temp1.png"
              alt="Chapter 1 Placeholder"
              width={400}
              height={128}
              className="w-full h-auto object-cover object-top rounded"
            />
            <p className="text-sm mt-5 font-medium">Chapter 1: Introduction</p>
          </div>
        </Link>
        {/* Chapter Option 2 */}
        <Link href="/projects/pdf-to-ppt/prompts">
          <div className="border p-4 rounded-md text-center cursor-pointer hover:border-blue-500">
            <Image
              src="/assets/temp2.png"
              alt="Chapter 2 Placeholder"
              width={400}
              height={128}
              className="w-full h-auto object-cover object-top rounded"
            />
            <p className="text-sm mt-5 font-medium">Chapter 2: Key Concepts</p>
          </div>
        </Link>
        {/* Chapter Option 3 */}
        <Link href="/projects/pdf-to-ppt/prompts">
          <div className="border p-4 rounded-md text-center cursor-pointer hover:border-blue-500">
            <Image
              src="/assets/temp3.png"
              alt="Chapter 3 Placeholder"
              width={400}
              height={128}
              className="w-full h-auto object-cover object-top rounded"
            />
            <p className="text-sm mt-5 font-medium">
              Chapter 3: Advanced Topics
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ChaptersPage;
