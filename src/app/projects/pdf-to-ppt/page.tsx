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
import { useState } from "react";

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
