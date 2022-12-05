import React, { useMemo, useCallback } from 'react'

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
        row.map((cell, index) => {
          return (
            <Cell {...cell} key={index}/>
          )
        })
      }
    </div>
  )
}

const Grid = () => {
  // redux grid state
  const grid = useAppSelector((state) => state.grid)

  const renderGrid = useCallback(() => {
    return (
    grid.map((row, index) => {
      return (
        <Row
          key={index}
          row={row}
        />
      )
    }))
  }, [grid])
  // const memoizeGrid = useMemo(() => renderGrid(), [grid])
    


    return (
      <div className="grid">
        {
          renderGrid()
        }
        {/* {
          grid.map((row) => {
            return (
              <Row
                row={row}
              />
            )
          })
        } */}
      </div>
    )
}

export default Grid