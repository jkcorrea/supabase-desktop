import { useState } from 'react'

export type AwaitableComponentStatus = 'idle' | 'awaiting' | 'resolved' | 'rejected'

type AwaitableComponentData<T = any> = {
  status: AwaitableComponentStatus
  resolve: ((value: T) => void) | null
  reject: ((reason?: string) => void) | null
}

export type AwaitableComponentProps<T = any> = {
  onSubmit: (value: T) => void
  onCancel: (reason?: string) => void
}

export default function useAwaitableComponent<T = any>() {
  const [data, setData] = useState<AwaitableComponentData<T>>({ status: 'idle', resolve: null, reject: null })

  const handleResolve = (val: T) => {
    if (data.status !== 'awaiting') throw 'Awaitable component is not awaiting.'
    data.resolve?.(val)
    setData({ status: 'resolved', resolve: null, reject: null })
  }

  const handleReject = (reason?: string) => {
    if (data.status !== 'awaiting') throw 'Awaitable component is not awaiting.'
    data.reject?.(reason)
    setData({ status: 'rejected', resolve: null, reject: null })
  }

  const handleReset = () => {
    setData({ status: 'idle', resolve: null, reject: null })
  }

  const handleExecute = async () => {
    return new Promise<T>((resolve, reject) => {
      setData({ status: 'awaiting', resolve, reject })
    })
  }
  return [data.status, handleExecute, handleResolve, handleReject, handleReset] as const
}
