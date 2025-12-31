import React, { useMemo, useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Funnel } from 'lucide-react'

export default function TableView({ data, loading, onEdit }) {
  const [countryFilter, setCountryFilter] = useState([])
  const [open, setOpen] = useState(false)

  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Entity',
      cell: info => (
        <div className="entity">
          <a className="nameLink">{info.getValue()}</a>
        </div>
      )
    },
    {
      accessorKey: 'gender',
      header: 'Gender',
      cell: info => {
        const g = info.getValue()
        return (
          <span
            className={`pill ${
              g?.toLowerCase() === 'male' ? 'male' : 'female'
            }`}
          >
            {g}
          </span>
        )
      }
    },
    {
      accessorKey: 'requestDate',
      header: 'Request date',
      cell: info => info.getValue()
    },
    {
      accessorKey: 'country',
      header: () => (
        <div className="countryHeader">
          Country
          <button
            className={`filterIconBtn ${open || countryFilter.length ? 'active' : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label="Filter country"
          >
            <Funnel
              size={16}
              strokeWidth={1.5}
              color={open || countryFilter.length ? '#6c2bd9' : '#6b6b6b'}
            />
          </button>

          {open && (
            <div className="countryFilterPopup">
              {['India', 'US', 'UK'].map(c => (
                <label key={c} className="countryOption">
                  <input
                    type="checkbox"
                    checked={countryFilter.includes(c)}
                    onChange={() =>
                      setCountryFilter(prev =>
                        prev.includes(c)
                          ? prev.filter(x => x !== c)
                          : [...prev, c]
                      )
                    }
                  />
                  {c}
                </label>
              ))}
            </div>
          )}
        </div>
      )
    },
    {
      id: 'actions',
      header: '',
      cell: info => (
        <button
          className="editBtn"
          onClick={() => onEdit(info.row.original)}
          aria-label="Edit"
        >
          <Pencil2Icon width={18} height={18} />
        </button>
      )
    }
  ], [onEdit, open, countryFilter])

  // compute filtered data outside of react-table to avoid filterFn shape issues
  const filteredData = useMemo(() => {
    if (!countryFilter || countryFilter.length === 0) return data
    return data.filter(row => {
      const val = row?.country
      const name = typeof val === 'string' ? val : val?.name || ''
      return countryFilter.includes(name)
    })
  }, [data, countryFilter])

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  if (loading) return <div>Loading...</div>

  return (
    <table className="table">
      <thead>
        {table.getHeaderGroups().map(hg => (
          <tr key={hg.id}>
            {hg.headers.map(h => (
              <th key={h.id}>
                {flexRender(h.column.columnDef.header, h.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
