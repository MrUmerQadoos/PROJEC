import { type SchemaTypeDefinition } from 'sanity'
import experience from './experience'
import project from './project'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project,experience],
}
