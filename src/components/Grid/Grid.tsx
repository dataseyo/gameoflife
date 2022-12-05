import React from 'react'

import './styles.css'
import useGrid from '../../hooks/useGrid'
import Cell from './Cell/Cell'
import { useAppSelector, useAppDispatch } from '../../state/store'

type RowType = {
  row: Array<{
    x: number,
    y: number,
    active: boolean,
    color: string
  }>
}

const Row = ({row}: RowType) => {
  return (
    <div className="row">
      {
        row.map(cell => {
          return (
            <Cell {...cell}/>
          )
        })
      }
    </div>
  )
}

const Grid = () => {
  // redux grid state
  const grid = useAppSelector((state) => state.grid)

  // click handler


    return (
      <div className="grid">
        {
          grid.map((row) => {
            return (
              <Row
                row={row}
              />
            )
          })
        }
      </div>
    )
}

export default Grid