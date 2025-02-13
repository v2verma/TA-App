import { useState, useEffect, useMemo } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import { useReactFlow } from '@xyflow/react';
import { AppNode } from '../../nodes/types';
import { EditableCell } from './EditableCell';
import ToastMessage from '../ToastMessage';
import { NodeIdCell } from './NodeIdCell';
import { StatusCell } from './StatusCell';


const NodeDataGrid = (props: {nodes: AppNode[]}) => {
    const { setNodes } = useReactFlow();
    const [data, setData] = useState(props?.nodes?.map(node=>{return {...node, ...node.data}}));
    const [success, setSuccess] = useState(false);
    const columns = useMemo(()=>[
        {
          header: 'Node ID',
          accessorKey: 'nodeID',
          size: 500,
          cell: NodeIdCell
        },
        {
          header: 'Node Type',
          accessorKey: 'nodeType',
          cell: ({ row, column, cell, table }) => <div style={{width: '85px'}}>{row.getValue(column.id)}</div>
        },
        {
          header: 'Node Name',
          accessorKey: 'nodename',
          cell: EditableCell
        },
        {
          header: 'Assignee',
          accessorKey: 'assignee',
          cell: EditableCell
        },
        {
          header: 'Status',
          accessorKey: 'duedate',
          cell: StatusCell
          ,
        },
        {
          header: 'Actions',
          accessorKey: 'actions',
          cell: ({ row, column, cell }) => (
            <button className='btn btn-primary' onClick={() =>{
              setSuccess(true)
              return setNodes((prevNodes) => prevNodes.map((node)=> node.id === `${parseInt(row.id)+1}` ? {
                    ...node,
                    data: {
                      nodeID: row.original.nodeID,
                      nodeType: row.original.type,
                      nodename: row.original.nodename,
                      assignee: row.original.assignee,
                      duedate: row.original.duedate,
                    }
                }: node))}
            }>Save</button>
          ),
        },
      ], []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              }
            }
            return row
          })
        )
      },
    },
    debugTable: true,
  })

  useEffect(()=>{
    setData(props?.nodes?.map(node=>{return {...node, ...node.data}}))
  },[props])

  // useEffect(()=>{setSuccess(false)}, [success])

  return (
    <>
    <div className="table-responsive">
      <table className="table table-striped">
        <thead className='table-info' style={{height: '65px', verticalAlign: 'middle'}}>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : <div>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </div>}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
    {success && <ToastMessage message={"Node updated successfully"} handleClose={()=> setSuccess(false)}/>}
    </>
  )
}

export default NodeDataGrid;

