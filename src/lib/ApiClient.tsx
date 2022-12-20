import { createContext, ReactNode, useContext, useMemo } from 'react'
import { PostgrestClient } from '@supabase/postgrest-js'
import { Body, fetch, HttpVerb, ResponseType } from '@tauri-apps/api/http'

import { ProjectMeta } from './AppData'

const REST_API_PATH = '/rest/v1'
const INTROSPECT_API_PATH = `/`
const makeLocalBaseUrl = (port: number) => `http://localhost:${port}${REST_API_PATH}`
const makeRemoteBaseUrl = (id: string) => `https://${id}.supabase.co${REST_API_PATH}`
const makeAuthHeaders = (apikey?: string) =>
  apikey
    ? { apikey, Authorization: `Bearer ${apikey}` }
    : {
        apikey: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU`,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU`,
      }

const Context = createContext<PostgrestClient>({} as PostgrestClient)

type ApiClientProps = { apiKey?: string; project: ProjectMeta }
type ProviderProps = { children: ReactNode } & ApiClientProps

export const ApiClientProvider = ({ project, apiKey, children }: ProviderProps) => {
  const client = useMemo(() => {
    const isLocal = 'port' in project
    const baseUrl = isLocal ? makeLocalBaseUrl(project.port) : makeRemoteBaseUrl(project.id)
    const headers = makeAuthHeaders(apiKey)
    const fetch = makeClientFetch(headers)
    return new PostgrestClient(baseUrl, { fetch })
  }, [project, apiKey])

  return <Context.Provider value={client}>{children}</Context.Provider>
}

export const useApiClient = () => {
  return useContext(Context)
}

const makeClientFetch =
  (defaultHeaders?: HeadersInit) => async (input: RequestInfo | URL, init?: RequestInit | undefined) => {
    console.log(input.toString())
    const res = await fetch(input.toString(), {
      method: (init?.method as HttpVerb) ?? 'GET',
      body: init?.body ? Body.text(init.body.toString()) : undefined,
      responseType: ResponseType.JSON,
      headers: { ...defaultHeaders, ...init?.headers },
    })

    return new Response(JSON.stringify(res.data) as BodyInit, res)
  }

export const fetchIntrospection = async ({ project, apiKey }: ApiClientProps) => {
  const isLocal = 'port' in project
  const clientFetch = makeClientFetch(makeAuthHeaders(apiKey))
  const baseUrl = isLocal ? makeLocalBaseUrl(project.port) : makeRemoteBaseUrl(project.id)
  const res = await clientFetch(baseUrl + INTROSPECT_API_PATH)
  const data = await res.json()
  return data as SupabaseIntrospectionResponse
}
