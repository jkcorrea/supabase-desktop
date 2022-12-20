import React from 'react'
import { Column, ColumnDef, flexRender, getCoreRowModel, RowData, useReactTable } from '@tanstack/react-table'
import clsx from 'clsx'

import { Spinner } from '../Spinner'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line unused-imports/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    /** Class names applied to every cell in the column (th & td) */
    className?: string
    /** Class names applied to only header cells (th) */
    headerClassName?: string
    /** Class names applied to only data cells (td) */
    cellClassName?: string
  }
}

const getClassNameForCell = ({ columnDef: { meta } }: Column<any, any>, header = false) =>
  clsx(meta?.className, header ? meta?.headerClassName : meta?.cellClassName)

export interface ResourceTableProps {
  isLoading?: boolean
  data?: any[] | null
  columns: ColumnDef<any>[]
}

const ResourceTable = ({ isLoading, data, columns }: ResourceTableProps) => {
  const showSpinner = isLoading || data === null
  const table = useReactTable<any>({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
  })

  return (
    <div className="relative h-full w-full">
      <table className="table-zebra table-compact table w-full flex-1">
        {/* head */}
        <thead>
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className={clsx('sticky top-0 rounded-none align-top', getClassNameForCell(header.column, true))}
                >
                  {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="h-full overflow-y-auto">
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} className={clsx('group', row.getIsSelected() && 'active')}>
                {row.getVisibleCells().map((cell) => {
                  const val = cell.getValue()
                  return (
                    <td
                      key={cell.id}
                      className={clsx(
                        'group-hover:bg-primary/10 h-8 font-mono text-xs',
                        getClassNameForCell(cell.column),
                      )}
                    >
                      {val === null ? (
                        <span className="uppercase text-white text-opacity-40">NULL</span>
                      ) : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      {showSpinner && <Spinner />}
    </div>
  )
}

export default ResourceTable
