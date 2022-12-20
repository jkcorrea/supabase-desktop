import { invoke } from '@tauri-apps/api'
import { fetch, ResponseType } from '@tauri-apps/api/http'

import { RemoteProjectMeta } from './AppData'

export const fetchRemoteProjects = async () => {
  const token = await invoke<string>('get_access_token')
  const res = await fetch<RemoteProjectMeta[]>('https://api.supabase.io/v1/projects', {
    method: 'GET',
    responseType: ResponseType.JSON,
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

export const fetchRemoteProjectById = async (id: string) => {
  const projects = await fetchRemoteProjects()
  return projects.find((p) => p.id === id)
}
