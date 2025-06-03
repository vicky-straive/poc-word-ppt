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

  const handleSkipTour = () => {
    setShowTour(false);
    setTourSkipped(true);
    localStorage.setItem("pptTourSkipped", "true");
  };

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
        {/* Pulsing focus indicator */}
        <div
          style={{
            position: "fixed",
            left: centerX - 32,
            top: centerY - 32,
            width: 64,
            height: 64,
            pointerEvents: "none",
            zIndex: 10002,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "rgba(0, 180, 90, 0.18)",
              boxShadow: "0 0 0 0 rgba(0,180,90,0.5)",
              animation: "pulse-ring 1.5s cubic-bezier(0.66, 0, 0, 1) infinite",
              zIndex: 1,
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 16,
              top: 16,
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(0, 180, 90, 0.25)",
              zIndex: 2,
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 28,
              top: 28,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#00b45a",
              zIndex: 3,
              boxShadow: "0 0 8px 2px #00b45a55",
            }}
          />
        </div>
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
      {/* Tour Tooltip */}
      {showTour && newPresentationBtnRef.current && (
        <div
          style={{
            position: "fixed",
            left: spotlightStyle.left + spotlightStyle.width / 2 - 130, // Center horizontally (minWidth/2)
            top: spotlightStyle.top + spotlightStyle.height + 12, // Below the button
            zIndex: 100,
            background: "white", // green background
            borderRadius: 8,
            boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
            padding: 16,
            minWidth: 260,
            maxWidth: 320,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="mb-2 font-semibold text-center">
            Start a new presentation!
          </div>
          <div className="flex gap-2 mt-2">
            <button
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-medium hover:bg-gray-300"
              onClick={handleSkipTour}
            >
              Skip
            </button>
          </div>
        </div>
      )}
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
