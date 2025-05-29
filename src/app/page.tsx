import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const tiles = [
  {
    title: "Assist",
    description:
      "ALT Text Generation using AI Agents trained on custom guidelines for each client.",
  },
  {
    title: "PDF to PPT",
    description: "Convert your PDFs to presentations.",
    href: "/projects/pdf-to-ppt",
  },
  {
    title: "WORD to PPT",
    description: "Convert your Word documents to presentations.",
  },
  {
    title: "OCR Extraction",
    description: "Extract text from images and documents.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Operationalizing AI for Human-Centric Tasks
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl w-full m-8">
        {tiles.map((tile, index) => (
          <Card
            key={index}
            className="transform transition-transform hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            {tile.href ? (
              <Link href={tile.href} passHref>
                <div className="flex flex-col h-auto">
                  <CardHeader>
                    <CardTitle>{tile.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p>{tile.description}</p>
                  </CardContent>
                </div>
              </Link>
            ) : (
              <div className="flex flex-col h-auto">
                <CardHeader>
                  <CardTitle>{tile.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p>{tile.description}</p>
                </CardContent>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
