// import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const booksData = [
  {
    id: 1,
    href: "/projects/pdf-to-ppt/chapters",
    imgSrc: "/assets/B1.jpg",
    imgAlt: "Medical Terminology in a Flash",
    title: "Medical Terminology in a Flash",
    description: "A quick guide to essential medical terms and their meanings.",
  },
  {
    id: 2,
    href: "/projects/pdf-to-ppt/chapters",
    imgSrc: "/assets/B2.jpg",
    imgAlt: "Medical - Surgical Nursing Fundamentals and Applications",
    title: "Medical - Surgical Nursing Fundamentals and Applications",
    description: "Comprehensive coverage of nursing principles and practices.",
  },
  {
    id: 3,
    href: "/projects/pdf-to-ppt/chapters",
    imgSrc: "/assets/B3.jpg",
    imgAlt: "Understanding Medical-Surgical Nursing",
    title: "Understanding Medical-Surgical Nursing",
    description:
      "Focuses on patient care in various medical-surgical settings.",
  },
  {
    id: 4,
    href: "/projects/pdf-to-ppt/chapters",
    imgSrc: "/assets/B4.jpg",
    imgAlt: "Pharmacology for Nursing Practice",
    title: "Pharmacology for Nursing Practice",
    description:
      "Key pharmacological concepts and drug administration for nurses.",
  },
];

const BookSelectionPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Select a book</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {booksData.map((book) => (
          <Link href={book.href} key={book.id} passHref>
            <div className="border p-4 rounded-lg shadow-sm text-center cursor-pointer hover:shadow-md hover:border-blue-500 h-full flex flex-col justify-between">
              <div>
                <Image
                  src={book.imgSrc}
                  alt={book.imgAlt}
                  width={400}
                  height={400} // Adjusted height for better aspect ratio if images vary
                  className="w-full h-64 object-cover object-top rounded-md mb-4"
                />
                <h3 className="text-md font-semibold text-gray-800 mb-1">
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
