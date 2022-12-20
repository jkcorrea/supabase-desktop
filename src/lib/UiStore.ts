import create from 'zustand'

import AppData, { ProjectMeta, RemoteProjectMeta } from './AppData'
import { makeUpdate } from './make-update'
import { fetchRemoteProjects } from './SupabaseMagementApi'

export type Store = {
  apiKey: string | null
  setApiKey: (apiKey: string | null) => void
  remoteProjects: RemoteProjectMeta[]
  syncRemoteProjects: () => Promise<void>
  recentProjects: ProjectMeta[]
  syncRecentProjects: () => Promise<void>
}

const update = makeUpdate<Store>()

const useUiStore = create<Store>((set) => ({
  apiKey: null,
  setApiKey: (apiKey) => set(update('apiKey', () => apiKey)),
  remoteProjects: [],
  syncRemoteProjects: async () => {
    const projects = await fetchRemoteProjects()
    set(update('remoteProjects', () => projects))
  },
  recentProjects: [],
  syncRecentProjects: async () => {
    const projects = await AppData.getRecentProjects()
    set(update('recentProjects', () => projects))
  },
}))

export default useUiStore
