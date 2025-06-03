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
import { IconHandFinger } from '@tabler/icons-react';
import { useTourStore } from "./tourStore";

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
  const newPresentationBtnRef = useRef<HTMLButtonElement | null>(null);
  const [spotlightStyle, setSpotlightStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  const showTour = useTourStore((state) => state.showTour);
  const hydrateTour = useTourStore((state) => state.hydrate);

  useEffect(() => {
    hydrateTour();
  }, [hydrateTour]);

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
        {/* IconHandFinger indicator instead of arrow or pulsing icon */}
        <span
          style={{
            position: "fixed",
            left: centerX - -4,
            top: centerY - -24, // position above the element
            zIndex: 10002,
            pointerEvents: "none",
            fontSize: 48,
            color: "#3c695a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // animation: "blink-cursor-smooth 1.2s cubic-bezier(0.4,0,0.2,1) infinite",
          }}
        >
          <IconHandFinger stroke={2} />
        </span>
        <style>{`
          @keyframes blink-cursor-smooth {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `}</style>
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
      <div className="flex justify-between items-center mb-6">
        <h2>My Presentations</h2>
        <Link
          href="/projects/pdf-to-ppt/book"
          passHref
          style={{ position: "relative", zIndex: showTour ? 10001 : undefined }}
        >
          <Button
            ref={newPresentationBtnRef}
            className={showTour ? "relative border-pulse" : undefined}
            style={showTour ? { zIndex: 1, borderColor: '#3c695a', boxShadow: '0 0 0 2px #3c695a80', transition: 'box-shadow 0.3s, border-color 0.3s' } : {}}
          >
            New Presentation
          </Button>
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
      <style>{`
        @keyframes blink-cursor-smooth {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}</style>
      <style>{`
        /* Optional: add a subtle pulse to the glow if you want it animated */
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 16px 4px #3c695a80, 0 0 0 4px #3c695a40; }
          50% { box-shadow: 0 0 32px 8px #3c695a80, 0 0 0 8px #3c695a40; }
        }
      `}</style>
      <style>{`
        .pulse-glow::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 120%;
          height: 120%;
          border-radius: 9999px;
          background: radial-gradient(circle, #3c695a40 0%, #3c695a00 80%);
          z-index: 0;
          pointer-events: none;
          animation: pulse-glow-anim 1.6s infinite;
        }
        .pulse-glow {
          z-index: 1;
          overflow: visible;
        }
        @keyframes pulse-glow-anim {
          0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.2; transform: translate(-50%, -50%) scale(1.15); }
        }
      `}</style>
      <style>{`
        .border-pulse {
          border-width: 2px !important;
          animation: border-pulse-anim 1.4s infinite;
          box-shadow: 0 0 0 2px rgba(64, 151, 122, 0.5);
          border-color:rgb(73, 228, 122) !important;
        }
        @keyframes border-pulse-anim {
          0%, 100% {
            box-shadow: 0 0 0 2px rgb(34, 158, 75);
            border-color:rgb(65, 208, 160);
          }
          50% {
            box-shadow: 0 0 0 6px #3c695a40;
            border-color: rgb(41, 215, 99);
          }
        }
      `}</style>
    </div>
  );
}
