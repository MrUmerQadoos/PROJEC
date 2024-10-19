import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Project title is required'),
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'text',
      validation: (Rule) => Rule.required().error('Project description is required'),
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      options: {
        list: [
          { title: 'Personal', value: 'personal' },
          { title: 'Client', value: 'client' },
          { title: 'Open Source', value: 'opensource' },
        ],
      },
      validation: (Rule) => Rule.required().error('Project type is required'),
    }),
    defineField({
      name: 'repoType',
      title: 'Repository Type',
      type: 'string',
      options: {
        list: [
          { title: 'Public', value: 'public' },
          { title: 'Private', value: 'private' },
        ],
      },
      validation: (Rule) => Rule.required().error('Repository type is required'),
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
      description: 'Link to the GitHub repository',
    }),
    defineField({
      name: 'url',
      title: 'Live URL',
      type: 'url',
      description: 'Link to the live project',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Demo Video URL',
      type: 'url',
      description: 'Optional: Link to a demo video of the project',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Technologies or frameworks used in the project',
    }),
    defineField({
      name: 'icon',
      title: 'Project Icon',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Icon representing the project',
    }),
    defineField({
      name: 'screenshots',
      title: 'Screenshots',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Screenshots of the project',
    }),
  ],
});
