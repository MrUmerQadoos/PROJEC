import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'designation',
      title: 'Designation',
      type: 'string',
      description: 'Job title or role.',
      validation: (Rule) => Rule.required().error('Designation is required'),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      description: 'Name of the company.',
      validation: (Rule) => Rule.required().error('Company is required'),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'string',
      description: 'Start date of the job (e.g., Feb 2023).',
      validation: (Rule) => Rule.required().error('Start Date is required'),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'string',
      description: 'End date of the job. Leave empty if current job.',
    }),
    defineField({
      name: 'isCurrentJob',
      title: 'Current Job',
      type: 'boolean',
      description: 'Check if this is the current job.',
      initialValue: false,
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Location of the job.',
      validation: (Rule) => Rule.required().error('Location is required'),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      description:
        'A brief overview of the role or key achievement (maximum 200 characters).',
      validation: (Rule) =>
        Rule.required()
          .max(200)
          .warning('Keep the description brief and within 200 characters.'),
    }),
    defineField({
      name: 'description',
      title: 'Detailed Description',
      type: 'text',
      description:
        'A more detailed description of the role, achievements, and responsibilities.',
      validation: (Rule) => Rule.required().error('Detailed description is required'),
    }),
  ],
  preview: {
    select: {
      title: 'designation',
      subtitle: 'company',
    },
  },
});
