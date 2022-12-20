import { BoltIcon, HomeIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

import useUiStore from '~/lib/UiStore'

type Props = {
  projectName: string
}

const Topbar = ({ projectName }: Props) => {
  const { apiKey } = useUiStore()

  return (
    <div className="relative flex h-10 w-full items-stretch justify-between bg-gray-800 px-5">
      <div className="breadcrumbs flex h-full items-center text-sm">
        <ul>
          <li>
            <Link to="/">
              <HomeIcon className="h-3 w-3" />
              <span className="ml-2 text-sm">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <BoltIcon className="h-3 w-3" />
              <span className="ml-2 text-sm">{projectName}</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex h-full items-center">
        <div
          className={clsx(
            'badge badge-outline flex cursor-pointer gap-2 text-xs uppercase shadow',
            !apiKey ? 'badge-primary shadow-primary' : 'badge-accent shadow-accent',
          )}
        >
          <div
            className={clsx(
              'h-2 w-2 rounded-full shadow',
              !apiKey ? 'shadow-primary bg-primary' : 'shadow-accent bg-accent',
            )}
          />
          {apiKey ? 'Remote' : 'Local'}
        </div>
      </div>
    </div>
  )
}

export default Topbar
