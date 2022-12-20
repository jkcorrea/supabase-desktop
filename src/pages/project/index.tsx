import { invoke } from '@tauri-apps/api'
import { capitalCase } from 'change-case'
import { Link, Outlet, RouteObject } from 'react-router-dom'

import ResizablePane from '~/components/ResizablePane'
import Topbar from '~/components/Topbar'
import { ApiClientProvider, fetchIntrospection } from '~/lib/ApiClient'
import { LocalProjectMeta } from '~/lib/AppData'
import { fetchRemoteProjectById } from '~/lib/SupabaseMagementApi'
import useUiStore from '~/lib/UiStore'

import emptyProjectRoute from './EmptyProjectPage'
import resourceRoute from './ResourcePage'
import { PROJECT_ROOT_LOADER_ID, ProjectLoaderData, useProjectLoaderData } from './utils'

const projectRoute: RouteObject = {
  id: PROJECT_ROOT_LOADER_ID,
  path: '/:projectId',
  element: <ProjectLayout />,
  children: [emptyProjectRoute, resourceRoute],
  loader: async ({ params }): Promise<ProjectLoaderData> => {
    const apiKey = useUiStore.getState().apiKey ?? undefined
    const isLocal = !apiKey
    const { projectId } = params
    if (!projectId) throw new Error('project not found')
    const project = isLocal
      ? await invoke<LocalProjectMeta>('get_local_project_by_id', { id: projectId })
      : await fetchRemoteProjectById(projectId)
    if (!project) throw new Error('project not found')

    const res = await fetchIntrospection({ project, apiKey })

    return {
      project,
      definitions: res.definitions,
      apiKey,
    }
  },
}

export default projectRoute

function ProjectLayout() {
  const { project, definitions, apiKey } = useProjectLoaderData()

  return (
    <ApiClientProvider project={project} apiKey={apiKey}>
      <div className="relative flex h-full w-full flex-col">
        <Topbar projectName={project.name} />

        {/* Left Sidebar */}
        <div className="relative flex h-full w-full overflow-hidden whitespace-nowrap">
          <ResizablePane initialSize={300} orientation="right">
            <div className="bg-base-100 text-base-content relative h-full">
              <ul className="flex h-full flex-col overflow-auto">
                {Object.keys(definitions).map((name) => (
                  <li key={name} className="hover:bg-primary cursor-pointer px-5 py-2">
                    <Link to={name}>{capitalCase(name)}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </ResizablePane>

          {/* Main content */}
          <div className="h-full w-full overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </ApiClientProvider>
  )
}
