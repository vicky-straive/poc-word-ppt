"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
// import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { createPortal } from "react-dom";
import { IconClick } from "@/components/icons"; // Adjust the import based on your project structure

interface Project {
  id: number; // Changed to number for sample data
  project_name: string;
  category: string;
  status: "Completed" | "In Progress";
  last_modified: string;
  action_url: string; // This will likely need to be dynamic based on action (edit/download)
}

export default function PdfToPptProjectsPage() {
  // Sample data - replace with actual data fetching
  const sampleProjects: Project[] = [
    {
      id: 1,
      project_name: "Pediatric Nursing: Respiratory Distress",
      category: "Pediatric Nursing",
      status: "Completed",
      last_modified: "2024-01-15",
      action_url: "/projects/pdf-to-ppt/1/download",
    },
    {
      id: 2,
      project_name: "Critical Care: Cardiac Arrest Management",
      category: "Critical Care",
      status: "In Progress",
      last_modified: "2024-02-20",
      action_url: "/projects/pdf-to-ppt/2/edit",
    },
    {
      id: 3,
      project_name: "Medical-Surgical Nursing: Diabetes Management",
      category: "Medical-Surgical Nursing",
      status: "Completed",
      last_modified: "2024-03-10",
      action_url: "/projects/pdf-to-ppt/3/download",
    },
    {
      id: 4,
      project_name: "Geriatric Nursing: Fall Prevention Strategies",
      category: "Geriatric Nursing",
      status: "Completed",
      last_modified: "2024-04-05",
      action_url: "/projects/pdf-to-ppt/4/download",
    },
    {
      id: 5,
      project_name: "Mental Health Nursing: Anxiety Disorders",
      category: "Mental Health Nursing",
      status: "In Progress",
      last_modified: "2024-05-01",
      action_url: "/projects/pdf-to-ppt/5/edit",
    },
  ];

  const [projects] = useState<Project[]>(sampleProjects);
  const [filter, setFilter] = useState("All");
  const [showTour, setShowTour] = useState(false);
  const [tourSkipped, setTourSkipped] = useState(false);
  const newPresentationBtnRef = useRef<HTMLButtonElement | null>(null);
  const [spotlightStyle, setSpotlightStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const skipped = localStorage.getItem("pptTourSkipped");
      setTourSkipped(skipped === "true");
      if (!skipped) setShowTour(true);
    }
  }, []);

  useEffect(() => {
    if (showTour && newPresentationBtnRef.current) {
      const rect = newPresentationBtnRef.current.getBoundingClientRect();
      setSpotlightStyle({
        left: rect.left - 12,
        top: rect.top - 8,
        width: rect.width + 24,
        height: rect.height + 16,
      });
    }
  }, [showTour]);

  const handleStartTour = () => {
    setShowTour(true);
    setTourSkipped(false);
    localStorage.removeItem("pptTourSkipped");
  };

  // Simple client-side filtering for demonstration
  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  const categories = [
    "All",
    "Pediatric Nursing",
    "Critical Care",
    "Medical-Surgical Nursing",
    "Geriatric Nursing",
    "Mental Health Nursing",
  ];

  // Spotlight overlay component
  const SpotlightOverlay = () => {
    if (!showTour) return null;
    // Calculate center of the spotlight for the pulsing indicator
    const centerX = spotlightStyle.left + spotlightStyle.width / 2;
    const centerY = spotlightStyle.top + spotlightStyle.height / 2;
    return createPortal(
      <>
        {/* Transparent Mask - pointerEvents none so it never blocks interaction */}
        <svg
          width="100vw"
          height="100vh"
          style={{
            position: "absolute",
            inset: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none", // SVG never blocks pointer events
            zIndex: 40,
          }}
        >
          <defs>
            <mask id="spotlight-mask">
              <rect x="0" y="0" width="100vw" height="100vh" fill="white" />
              <rect
                x={spotlightStyle.left}
                y={spotlightStyle.top}
                width={spotlightStyle.width}
                height={spotlightStyle.height}
                rx="8"
                fill="black"
              />
            </mask>
          </defs>
          {/* Transparent mask, no color */}
          <rect
            x="0"
            y="0"
            width="100vw"
            height="100vh"
            fill="transparent"
            mask="url(#spotlight-mask)"
          />
        </svg>
        {/* IconClick indicator instead of arrow or pulsing icon */}
        <span
          style={{
            position: "fixed",
            left: centerX - 24,
            top: centerY - 64, // position above the element
            zIndex: 10002,
            pointerEvents: "none",
            fontSize: 48,
            color: "#ffdd33",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconClick stroke={2} />
        </span>
        {/* Transparent overlay for skip, but pointerEvents: none so it doesn't block anything */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 41,
            pointerEvents: "none",
          }}
        />
        {/* Pulsing ring animation keyframes */}
        <style>{`
          @keyframes pulse-ring {
            0% {
              transform: scale(0.7);
              opacity: 0.7;
            }
            70% {
              transform: scale(1.2);
              opacity: 0.15;
            }
            100% {
              transform: scale(1.4);
              opacity: 0;
            }
          }
        `}</style>
      </>,
      document.body
    );
  };

  return (
    <div className="container mx-auto py-8 p-8">
      {/* Spotlight Overlay */}
      <SpotlightOverlay />
      {/* Floating Start Tour Button */}
      {!showTour && tourSkipped && (
        <button
          style={{ position: "fixed", bottom: 24, right: 24, zIndex: 10000 }}
          className="bg-green-700 text-white px-4 py-2 rounded shadow-lg hover:bg-green-800"
          onClick={handleStartTour}
        >
          Start Tour
        </button>
      )}
      <div className="flex justify-between items-center mb-6">
        <h2>My Presentations</h2>
        <Link
          href="/projects/pdf-to-ppt/book"
          passHref
          style={{ position: "relative", zIndex: showTour ? 10001 : undefined }}
        >
          <Button ref={newPresentationBtnRef}>New Presentation</Button>
        </Link>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="All" onValueChange={setFilter}>
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Presentation Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Modified</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProjects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">
                {project.project_name}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    project.status === "Completed" ? "default" : "secondary"
                  }
                >
                  {project.status}
                </Badge>
              </TableCell>
              <TableCell>{project.last_modified}</TableCell>
              <TableCell>
                <Button variant="link" asChild>
                  <Link href={project.action_url}>
                    {project.status === "Completed" ? "Download" : "Edit"}
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
