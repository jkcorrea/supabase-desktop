import { useEffect, useState } from 'react'
import { FolderOpenIcon, PlusIcon } from '@heroicons/react/24/outline'
import { open } from '@tauri-apps/api/dialog'
import { invoke } from '@tauri-apps/api/tauri'
import { Link, RouteObject, useNavigate } from 'react-router-dom'

import sbLogo from '~/assets/sb-logo--dark.svg'
import ApiKeyDialog from '~/components/ApiKeyDialog'
import AppData, { ProjectMeta, RemoteProjectMeta } from '~/lib/AppData'
import useUiStore from '~/lib/UiStore'
import useAwaitableComponent from '~/lib/useAwaitableComponent'

const initialPageRoute: RouteObject = {
  path: '/',
  index: true,
  element: <InitialPage />,
}
export default initialPageRoute

function InitialPage() {
  const { recentProjects, remoteProjects, syncRecentProjects, syncRemoteProjects, setApiKey } = useUiStore()
  useEffect(() => {
    syncRecentProjects()
    syncRemoteProjects()
  }, [])

  const navigate = useNavigate()
  const navigateToProject = (project: ProjectMeta, apiKey?: string) => {
    if (apiKey) setApiKey(apiKey)
    AppData.appendRecentProject(project)
    navigate(`/${project.id}`)
  }

  const handleOpenDirectory = async () => {
    const dir = await open({
      multiple: false,
      directory: true,
      defaultPath: '~/',
    })

    if (!dir) return
    try {
      const project = await invoke<ProjectMeta>('open_project', { dir })
      if (typeof dir !== 'string') throw new Error('Invalid directory') // TODO - display error to user
      navigateToProject(project)
    } catch (err) {
      console.log(err) // TODO - display error to user
    }
  }

  const [requestedProject, setRequestedProject] = useState<RemoteProjectMeta | null>(null)
  const [status, execute, resolve, reject, reset] = useAwaitableComponent<string>()
  const handleRequestProject = async (project: RemoteProjectMeta) => {
    setRequestedProject(project)
    try {
      const apiKey = await execute()
      navigateToProject(project, apiKey)
    } finally {
      setRequestedProject(null)
      reset()
    }
  }

  return (
    <>
      <div className="container p-10">
        <div className="flex items-center justify-center">
          <div className="flex flex-col">
            <a href="https://supabase.com" target="_blank" rel="noreferrer">
              <img src={sbLogo} alt="Supabase logo" className="h-20" />
            </a>
            <h1 className="-mt-3 self-end font-mono text-3xl font-thin uppercase tracking-widest">Desktop</h1>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <p className="bg-info-content text-info rounded py-2 px-3">
            Open or initialize a local Supabase project to get started!
          </p>
        </div>

        <div className="mx-auto mt-10 flex w-full max-w-md justify-between">
          <div className="space-y-10">
            <div>
              <h2 className="my-2 text-xl font-semibold">Remote</h2>
              <ul>
                {remoteProjects.map((project) => (
                  <li key={project.id}>
                    <button type="button" className="link link-info mr-2" onClick={() => handleRequestProject(project)}>
                      {project.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="my-2 text-xl font-semibold">Local</h2>
              <ul>
                <li>
                  <button type="button" className="link link-info inline-flex">
                    <PlusIcon className="mr-2 h-5 w-5" /> Initialize...
                  </button>
                </li>

                <li>
                  <button type="button" className="link link-info inline-flex" onClick={handleOpenDirectory}>
                    <FolderOpenIcon className="mr-2 h-5 w-5" /> Open...
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="my-2 text-xl font-semibold">Recent</h2>
            <ul>
              {recentProjects.map((project) => (
                <li key={project.id}>
                  <Link to={`/${project.id}`} className="link link-info mr-2">
                    {project.name}
                  </Link>{' '}
                  {'port' in project ? project.path : project.id}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {requestedProject && status === 'awaiting' && (
        <ApiKeyDialog project={requestedProject} onSubmit={resolve} onCancel={reject} />
      )}
    </>
  )
}
