import { useState } from 'react'

import { RemoteProjectMeta } from '~/lib/AppData'
import { AwaitableComponentProps } from '~/lib/useAwaitableComponent'

interface Props extends AwaitableComponentProps<string> {
  project: RemoteProjectMeta
}

const ApiKeyDialog = ({ project, onSubmit, onCancel }: Props) => {
  const [val, setVal] = useState('')

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm">
      <div className="flex h-full items-center justify-center">
        <div className="bg-base-100 max-w-sm rounded p-4 shadow">
          <h1 className="text-base-content font-mono text-sm font-semibold">Enter the service role key for project:</h1>
          <span className="font-mono text-xs text-gray-500">
            {project.name} (ID: {project.id})
          </span>
          <input
            type="password"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="input input-bordered input-xs my-2 w-full"
            placeholder="service_role key"
          />
          <div className="flex w-full justify-end gap-x-2">
            <button type="button" className="btn btn-primary btn-outline btn-xs mt-2" onClick={() => onCancel()}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary btn-xs mt-2" onClick={() => onSubmit(val)}>
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApiKeyDialog
