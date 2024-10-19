import { groq } from 'next-sanity';
import { IProjectItem, RepoType, ProjectType } from '@/types'; // Ensure these enums and types are imported
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

// GROQ query to fetch project data from Sanity
const projectsQuery = groq`*[_type == "project"]{
  _id,
  title,
  description,
  "icon": icon.asset->url,
  repoType,
  projectType,
  githubUrl,
  url,
  videoUrl, // Include video URL
  tags,
  "screenshots": screenshots[].asset->url
}`;

// Fetch all projects from Sanity
export default async function getProjects(): Promise<IProjectItem[]> {
  const projects = await client.fetch(projectsQuery);

  return projects.map((project: any) => ({
    id: project._id,
    title: project.title,
    description: project.description,
    icon: urlFor(project.icon).url(),
    repoType: project.repoType === 'private' ? RepoType.Private : RepoType.Public, // Map string to enum
    projectType: project.projectType as ProjectType, // Ensure correct typing here if available
    githubUrl: project.githubUrl || '',
    url: project.url || '',
    videoUrl: project.videoUrl || '', // Map video URL
    tags: project.tags || [],
    screenshots: project.screenshots || [],
  }));
}

// Fetch a single project by ID from Sanity
export async function getProjectDetails(id: string): Promise<IProjectItem | null> {
  const projectQuery = groq`*[_type == "project" && _id == $id][0]{
    _id,
    title,
    description,
    "icon": icon.asset->url,
    repoType,
    projectType,
    githubUrl,
    url,
    videoUrl, // Include video URL
    tags,
    "screenshots": screenshots[].asset->url
  }`;

  const project = await client.fetch(projectQuery, { id });

  if (!project) return null;

  return {
    id: project._id,
    title: project.title,
    description: project.description,
    icon: urlFor(project.icon).url(),
    repoType: project.repoType === 'private' ? RepoType.Private : RepoType.Public, // Map string to enum
    projectType: project.projectType as ProjectType, // Ensure correct typing here
    githubUrl: project.githubUrl || '',
    url: project.url || '',
    videoUrl: project.videoUrl || '', // Map video URL
    tags: project.tags || [],
    screenshots: project.screenshots || [],
  };
}

// Helper function to get the project title by ID
export async function getProjectName(id: string): Promise<string | null> {
  const project = await getProjectDetails(id);
  return project ? project.title : null;
}














// import { groq } from 'next-sanity';
// import { client } from '../../dev-portfolio/sanity'; // Your Sanity client setup
// import { IProjectItem, RepoType, ProjectType } from '@/types'; // Ensure these enums and types are imported
// import { urlFor } from '../../dev-portfolio/sanity'; // Helper to build image URLs from Sanity

// // GROQ query to fetch project data from Sanity
// const projectsQuery = groq`*[_type == "project"]{
//   _id,
//   title,
//   description,
//   "icon": icon.asset->url,
//   repoType,
//   projectType,
//   githubUrl,
//   url,
//   tags,
//   "screenshots": screenshots[].asset->url
// }`;

// // Fetch all projects from Sanity
// export default  async function getProjects(): Promise<IProjectItem[]> {
//   const projects = await client.fetch(projectsQuery);

//   return projects.map((project: any) => ({
//     id: project._id,
//     title: project.title,
//     description: project.description,
//     icon: urlFor(project.icon).url(),
//     repoType: project.repoType === 'private' ? RepoType.Private : RepoType.Public, // Map string to enum
//     projectType: project.projectType as ProjectType, // Ensure correct typing here if available
//     githubUrl: project.githubUrl || '',
//     url: project.url || '',
//     tags: project.tags || [],
//     screenshots: project.screenshots || [],
//   }));
// }

// // Fetch a single project by ID from Sanity
// export  async function getProjectDetails(id: string): Promise<IProjectItem | null> {
//   const projectQuery = groq`*[_type == "project" && _id == $id][0]{
//     _id,
//     title,
//     description,
//     "icon": icon.asset->url,
//     repoType,
//     projectType,
//     githubUrl,
//     url,
//     tags,
//     "screenshots": screenshots[].asset->url
//   }`;

//   const project = await client.fetch(projectQuery, { id });

//   if (!project) return null;

//   return {
//     id: project._id,
//     title: project.title,
//     description: project.description,
//     icon: urlFor(project.icon).url(),
//     repoType: project.repoType === 'private' ? RepoType.Private : RepoType.Public, // Map string to enum
//     projectType: project.projectType as ProjectType, // Ensure correct typing here
//     githubUrl: project.githubUrl || '',
//     url: project.url || '',
//     tags: project.tags || [],
//     screenshots: project.screenshots || [],
//   };
// }

// // Helper function to get the project title by ID
// export async function getProjectName(id: string): Promise<string | null> {
//   const project = await getProjectDetails(id);
//   return project ? project.title : null;
// }



