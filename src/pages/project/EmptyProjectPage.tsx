import { RouteObject } from 'react-router-dom'

const emptyProjectRoute: RouteObject = {
  index: true,
  element: <EmptyProjectPage />,
}

export default emptyProjectRoute

function EmptyProjectPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <h1 className="text-white/50">Select a table</h1>
    </div>
  )
}
