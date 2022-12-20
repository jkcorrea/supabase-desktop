import * as R from 'rambda'
import { Store as TauriStore } from 'tauri-plugin-store-api'

const store = new TauriStore('.sbdesktop.dat')

export interface LocalProjectMeta {
  id: string
  name: string
  path: string
  port: number
}

export interface RemoteProjectMeta {
  id: string
  name: string
}

export type ProjectMeta = LocalProjectMeta | RemoteProjectMeta

async function getRecentProjects(): Promise<ProjectMeta[]> {
  const projs = await store.get<ProjectMeta[]>('recentProjects')
  return projs ? projs : []
}

async function appendRecentProject(proj: ProjectMeta) {
  let projs = await getRecentProjects()
  // Loop backwards over projs & remove any duplicates
  let i = projs.length
  while (i--) {
    if (projs[i].id === proj.id) projs.splice(i, 1)
  }
  projs.push(proj)
  if (projs.length >= 20) projs = R.drop(projs.length - 20, projs)
  await store.set('recentProjects', projs)
}

function watchRecentProjects(cb: (projs: ProjectMeta[]) => void) {
  store.onKeyChange('recentProjects', (value) => cb(value as ProjectMeta[]))
}

async function clearRecentProjects() {
  await store.set('recentProjects', [])
}

const AppData = {
  getRecentProjects,
  clearRecentProjects,
  appendRecentProject,
  watchRecentProjects,
}

export default AppData
