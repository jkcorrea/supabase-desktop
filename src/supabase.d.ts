interface SupabaseResourceProperty {
  description: string
  format:
    | 'integer'
    | 'string'
    | 'boolean'
    | 'timestamp'
    | 'timestamp without timezone'
    | 'ARRAY'
    | 'double precision'
    | 'tsvector'
  type: 'integer' | 'string' | 'boolean' | 'number' | 'array'
  default?: any
}

interface SupabaseDefinition {
  properties: Record<string, SupabaseResourceProperty>
  required: string[]
  type: 'object'
}

interface SupabaseIntrospectionResponse {
  definitions: Record<string, SupabaseDefinition>
}
