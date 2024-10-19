"use client"

import { useEffect, useState } from 'react';
import ConstraintedBox from "@/components/core/ConstraintedBox";
import ResponsiveBox from "@/components/core/ResponsiveBox";
import GridBox from "@/components/core/GridBox";
import SectionTitle from "@/components/common/SectionTitle";
import ExperienceItem from "./ui/ExperienceItem";
import { IExperienceItem } from "@/types";
import { groq } from "next-sanity";
import { client } from '@/sanity/lib/client';

const HomeSection3 = ({ id }: { id: string }) => {
  const [experiences, setExperiences] = useState<IExperienceItem[]>([]);

  // GROQ query to fetch experience data from Sanity
  const experiencesQuery = groq`
    *[_type == "experience"]{
      _id,
      designation,
      company,
      startDate,
      endDate,
      isCurrentJob,
      location,
      shortDescription,
      description
    }
  `;

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const experienceData: IExperienceItem[] = await client.fetch(experiencesQuery);
        setExperiences(experienceData);
      } catch (error) {
        console.error("Error fetching experiences from Sanity:", error);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <ResponsiveBox
      classNames="bg-[var(--dialogColor)] min-h-[calc(100vh-5rem)] items-center justify-center"
      id={id}
    >
      <ConstraintedBox classNames="p-4 py-16">
        <SectionTitle>Experiences</SectionTitle>

        <GridBox classNames="justify-items-center grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-16">
          {experiences.map((experience) => (
            <ExperienceItem key={experience._id} data={experience} />
          ))}
        </GridBox>
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection3;
