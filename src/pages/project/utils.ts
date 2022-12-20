import { useRouteLoaderData } from 'react-router-dom'

import { ProjectMeta } from '~/lib/AppData'

export type ProjectLoaderData = {
  project: ProjectMeta
  definitions: SupabaseIntrospectionResponse['definitions']
  apiKey?: string
}
export const PROJECT_ROOT_LOADER_ID = 'project'
export const useProjectLoaderData = () => useRouteLoaderData(PROJECT_ROOT_LOADER_ID) as ProjectLoaderData
