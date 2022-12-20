import { useEffect, useMemo, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { capitalCase } from 'change-case'
import { RouteObject, useParams } from 'react-router-dom'

import ResourceTable from '~/components/ResourceTable'
import { useApiClient } from '~/lib/ApiClient'

import { useProjectLoaderData } from './utils'

const resourceRoute: RouteObject = {
  path: ':resourceId',
  element: <ResourcePageGuard />,
}

export default resourceRoute

function ResourcePageGuard() {
  const { resourceId } = useParams()
  const { definitions } = useProjectLoaderData()
  if (!(resourceId && resourceId in definitions)) throw new Error('Resource not found')
  return <ResourcePage />
}

function ResourcePage() {
  const params = useParams()
  const { definitions } = useProjectLoaderData()
  const resourceId = params.resourceId as keyof typeof definitions
  const def = definitions[resourceId as keyof typeof definitions]

  const columns = useColumns(def.properties)

  // Load the data
  const apiClient = useApiClient()
  const [data, setData] = useState<any[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const res = await apiClient.from(resourceId).select('*')
      setIsLoading(false)
      setData(res.data ?? [])
    }
    fetchData()
  }, [resourceId])

  return <ResourceTable isLoading={isLoading} data={data} columns={columns} />
}

const useColumns = (properties: Record<string, SupabaseResourceProperty>) => {
  return useMemo(
    () =>
      Object.entries(properties ?? {}).map<ColumnDef<unknown>>(([id, _def]) => ({
        id,
        header: capitalCase(id),
        accessorKey: id,
      })),
    [properties],
  )
}
