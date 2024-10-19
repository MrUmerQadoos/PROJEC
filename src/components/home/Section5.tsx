"use client"

import { useEffect, useState } from "react";
import { IProjectItem } from "@/types";
// import { getProjects } from "@/data/projects"; // Ensure this is a named export from your data file
import ConstraintedBox from "@/components/core/ConstraintedBox";
import ResponsiveBox from "@/components/core/ResponsiveBox";
import SectionTitle from "@/components/common/SectionTitle";
import ProjectList from "./ui/ProjectList";
import getProjects from "@/data/projects";

const HomeSection5 = ({ id }: { id: string }) => {
  const [projects, setProjects] = useState<IProjectItem[]>([]); // State to hold fetched projects
  const [loading, setLoading] = useState<boolean>(true); // Optional loading state

  // Fetch projects on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProjects(); // Fetching projects from Sanity
        setProjects(data); // Set the projects data in state
      } catch (error) {
        console.error("Error fetching projects:", error); // Handle any error
      } finally {
        setLoading(false); // Set loading to false
      }
    }

    fetchData();
  }, []);

  return (
    <ResponsiveBox
      classNames="bg-[var(--dialogColor)] min-h-[calc(100vh-5rem)] items-center justify-center"
      id={id}
    >
      <ConstraintedBox classNames="p-4 py-16">
        <SectionTitle>Recent Works</SectionTitle>

        {/* Show loading state if necessary */}
        {loading ? (
          <p>Loading projects...</p>
        ) : (
          <ProjectList projects={projects} /> // Pass the fetched projects to ProjectList component
        )}
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection5;
