import React, { useState } from 'react'

import './styles.css'
import { useAppDispatch, useAppSelector } from '../../../state/store'
import {
  click,
  mutate
} from '../../../state/gridSlice'

type Cell = {
  x: number,
  y: number,
  active: boolean,
  color: string
}

const Cell = ({
  x,
  y,
  active,
  color
}: Cell) => {
  // dispatch click action to redux
  const dispatch = useAppDispatch()
  const toggleCell = () => {
    dispatch(click([x, y]))
    console.log(x, y)
  }

  // test cells neighbors (delete later)
  const grid = useAppSelector(state => state.grid)
  const neighbors = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],            [0, 1],
    [1, -1], [1, 0], [1, 1]
]

  const calculateNeighbors = (grid: Cell[][], x: number, y: number) => {
    let count = 0; // initialize active neighbor count at 0
    for (let i = 0; i < neighbors.length; i++) {
        // check that neighbor is alive, unless neighbor is out of bounds
        // if neighbor is out of bounds, do nothing
        try {
            if (grid[x + neighbors[i][0]][y + neighbors[i][1]].active) {
                count++;
            }
        } catch {
            continue
        }
    }

    console.log(count)
}


  return (
    <div 
      // could change this to a react-spring useSpring toggled to run when active is toggled
      className={`cell ${active ? 'cell-active' : 'cell-inactive'}`} 
      onClick={toggleCell}
      // onClick={() => calculateNeighbors(grid, x, y)}
    >
    </div>
  )
}

export default Cell