import React, { FC } from 'react'
import './table.scss'

interface TableProps {
  columns: IColumn[]
  data: Record<string, string | number>[]
}

export interface IColumn {
  title: string
  fieldName: string
  widthPercent?: number
}

export const Table: FC<TableProps> = ({ columns, data, children }) => (
  <div className="table">
    <TableHeader columns={columns} />
    <TableBody data={data} columns={columns}>
      {children}
    </TableBody>
  </div>
)

interface TableBodyProps {
  columns: IColumn[]
  data: Record<string, string | number>[]
}

const TableBody: FC<TableBodyProps> = ({ columns, data, children }) => (
  <div className="table-body">
    {data.map((element) => (
      // eslint-disable-next-line no-underscore-dangle
      <div className="table-body__row" data-id={element._id}>
        {columns.map((column) => {
          if (column.fieldName) {
            return (
              <div className="table-body__cell" style={{ flexBasis: `${column.widthPercent}%` }}>
                {element[column.fieldName]}
              </div>
            )
          }
          return (
            <div className="table-body__cell" style={{ flexBasis: `${column.widthPercent}%` }}>
              {children}
            </div>
          )
        })}
      </div>
    ))}
  </div>
)
interface TableHeaderProps {
  columns: IColumn[]
}

export const TableHeader: FC<TableHeaderProps> = ({ columns }) => (
  <div className="table-header">
    {columns.map((column) => (
      <div className="table-header__cell" style={{ flexBasis: `${column.widthPercent}%` }}>
        {column.title}
      </div>
    ))}
  </div>
)
