// import { Button } from "@/components/ui/button};
import Link from "next/link";
import Image from "next/image";
import chaptersData from "../chapters/chaptersData.json";

const BookSelectionPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Medical Education Excellence </h1>
      <p className="text-center py-4">Comprehensive medical textbooks for healthcare professional and students</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {chaptersData.map((book, idx) => (
          <Link
            href={{
              pathname: "/projects/pdf-to-ppt/chapters",
              query: { book: book.title },
            }}
            key={idx}
            passHref
          >
            <div className="border p-4 rounded-lg shadow-sm text-center cursor-pointer hover:shadow-md hover:border-blue-500 h-full flex flex-col justify-between">
              <div>
                <Image
                  src={book.image.replace(/^public\//, "/")}
                  alt={book.title}
                  width={400}
                  height={400}
                  className="w-full h-80 object-cover object-top rounded-md mb-4 flex mx-auto"
                />
                <h3 className="text-md font-bold text-gray-800 mb-1">
                  {book.title}
                </h3>
                <p className="text-xs text-gray-600 px-2">{book.description}</p>
              </div>
            </div>
          </Link>
        ))}
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

export default BookSelectionPage;
