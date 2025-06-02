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
import { useState, useEffect } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

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
    { id: 1, project_name: "Pediatric Nursing: Respiratory Distress", category: "Pediatric Nursing", status: "Completed", last_modified: "2024-01-15", action_url: "/projects/pdf-to-ppt/1/download" },
    { id: 2, project_name: "Critical Care: Cardiac Arrest Management", category: "Critical Care", status: "In Progress", last_modified: "2024-02-20", action_url: "/projects/pdf-to-ppt/2/edit" },
    { id: 3, project_name: "Medical-Surgical Nursing: Diabetes Management", category: "Medical-Surgical Nursing", status: "Completed", last_modified: "2024-03-10", action_url: "/projects/pdf-to-ppt/3/download" },
    { id: 4, project_name: "Geriatric Nursing: Fall Prevention Strategies", category: "Geriatric Nursing", status: "Completed", last_modified: "2024-04-05", action_url: "/projects/pdf-to-ppt/4/download" },
    { id: 5, project_name: "Mental Health Nursing: Anxiety Disorders", category: "Mental Health Nursing", status: "In Progress", last_modified: "2024-05-01", action_url: "/projects/pdf-to-ppt/5/edit" },
  ];

  const [projects, ] = useState<Project[]>(sampleProjects);
  const [filter, setFilter] = useState("All");

  // Joyride tour state
  const [runTour, setRunTour] = useState(false);
  const [tourSkipped, setTourSkipped] = useState(false);

  // Check localStorage for skip state
  useEffect(() => {
    if (typeof window !== "undefined") {
      const skipped = localStorage.getItem("pptTourSkipped");
      setTourSkipped(skipped === "true");
      if (!skipped) setRunTour(true);
    }
  }, []);

  // Joyride steps
  const steps: Step[] = [
    {
      target: "#new-presentation-btn",
      content: "Click here to start a new presentation!",
      disableBeacon: true,
      placement: "bottom"
    }
  ];

  // Joyride callback
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === STATUS.SKIPPED || status === STATUS.FINISHED) {
      setRunTour(false);
      setTourSkipped(true);
      localStorage.setItem("pptTourSkipped", "true");
    }
  };

  // Floating button to restart tour
  const floatingBtnStyle = {
    position: "fixed" as const,
    bottom: 24,
    right: 24,
    zIndex: 10000
  };

  // Simple client-side filtering for demonstration
  const filteredProjects = filter === "All"
    ? projects
    : projects.filter(project => project.category === filter);

  const categories = [
    "All",
    "Pediatric Nursing",
    "Critical Care",
    "Medical-Surgical Nursing",
    "Geriatric Nursing",
    "Mental Health Nursing",
  ];

  return (
    <div className="container mx-auto py-8 p-8">
      <Joyride
        steps={steps}
        run={runTour}
        continuous
        showSkipButton
        showProgress
        disableOverlayClose
        callback={handleJoyrideCallback}
        styles={{ options: { zIndex: 10000 } }}
      />
      {!runTour && tourSkipped && (
        <button
          style={floatingBtnStyle}
          className="bg-green-700 text-white px-4 py-2 rounded shadow-lg hover:bg-green-800"
          onClick={() => {
            setRunTour(true);
            setTourSkipped(false);
            localStorage.removeItem("pptTourSkipped");
          }}
        >
          Start Tour
        </button>
      )}
      <div className="flex justify-between items-center mb-6">
        <h2>My Presentations</h2>
        <Link href="/projects/pdf-to-ppt/book" passHref>
          <Button id="new-presentation-btn">New Presentation</Button>
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
              <TableCell className="font-medium">{project.project_name}</TableCell>
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
