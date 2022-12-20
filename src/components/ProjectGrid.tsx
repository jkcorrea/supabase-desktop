const ProjectGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      <ProjectGridItem />
      <ProjectGridItem />
      <ProjectGridItem />
    </div>
  )
}

const ProjectGridItem = () => {
  return (
    <div className="col-span-1 flex flex-col rounded-lg border border-gray-400 text-center shadow">
      <div className="flex flex-1 flex-col p-8">
        <img
          className="mx-auto h-32 w-32 shrink-0 rounded-full bg-black"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt=""
        />
        <h3 className="mt-6 text-sm font-medium text-gray-900">Workflow</h3>
      </div>
    </div>
  )
}

export default ProjectGrid
