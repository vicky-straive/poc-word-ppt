"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Item {
  id: string;
  label: string;
  category: "clinical" | "case-study";
}

const clinicalProcedures: Item[] = [
  { id: "central-line", label: "Central Line Insertion", category: "clinical" },
  { id: "intubation", label: "Intubation", category: "clinical" },
  { id: "chest-tube", label: "Chest Tube Placement", category: "clinical" },
  { id: "arterial-line", label: "Arterial Line Insertion", category: "clinical" },
  { id: "lumbar-puncture", label: "Lumbar Puncture", category: "clinical" },
  { id: "paracentesis", label: "Paracentesis", category: "clinical" },
];

const caseStudies: Item[] = [
  { id: "respiratory-distress", label: "Respiratory Distress", category: "case-study" },
  { id: "cardiac-arrest", label: "Cardiac Arrest", category: "case-study" },
  { id: "sepsis", label: "Sepsis", category: "case-study" },
  { id: "stroke", label: "Stroke", category: "case-study" },
  { id: "trauma", label: "Trauma", category: "case-study" },
  { id: "diabetic-ketoacidosis", label: "Diabetic Ketoacidosis", category: "case-study" },
];

const NewProjectPage = () => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (itemId: string) => {
    setSelectedItem(selectedItem === itemId ? null : itemId);
    router.push(`/projects/pdf-to-ppt/create?template=${itemId}`);
  };

  const renderItem = (item: Item) => (
    <Card
      key={item.id}
      className={cn(
        "cursor-pointer hover:border-primary transition-colors",
        selectedItem === item.id && "border-primary ring-2 ring-primary"
      )}
      onClick={() => handleItemClick(item.id)}
    >
      <CardContent className="flex items-center space-x-4 p-4">
        {/* Placeholder for Icon */}
        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
          Icon
        </div>
        <span className="text-lg font-medium">{item.label}</span>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Create a new slide deck</h1>

      <h2 className="text-2xl font-semibold mb-4">Clinical Procedures</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {clinicalProcedures.map(renderItem)}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Case Studies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {caseStudies.map(renderItem)}
      </div>
    </div>
  );
};

export default NewProjectPage;