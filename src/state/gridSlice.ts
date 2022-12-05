/* 
    Redux slice to hold Grid State
*/
import { useCallback } from 'react'
import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'

type CellType = {
    x: number,
    y: number,
    active: boolean,
    color: string,
    numLiveNeighbors: number
}

// (y, x) neighbors
const neighbors = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],            [0, 1],
    [1, -1], [1, 0], [1, 1]
]

const calculateNeighbors = (grid: CellType[][], x: number, y: number) => {
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

    return count
}


/*
    Function that generates an x, y grid
    ---
    -param numRows: number of rows to generate
    -param numCols: number of columns to generate
*/
const createGrid = (numRows: number, numCols: number): CellType[][]  => {
    const grid: Array<Array<{
      x: number,
      y: number,
      active: boolean,
      color: string,
      numLiveNeighbors: number
    }>> = []
    for (let x = 0; x < numRows; x++) {
      grid[x] = []
      for (let y = 0; y < numCols; y++) {
        grid[x][y] = {
          x: x,
          y: y,
          active: false,
          color: "",
          numLiveNeighbors: 0
        }
      }
    }

    return grid
}

const initialState: CellType[][] = createGrid(20, 20)

const gridSlice = createSlice({
    name: 'grid',
    initialState,
    reducers: {
        // start grid mutations, iterate step by step
        start: (state) => {

        },

        // pause grid mutations
        stop: (state) => {

        },

        // take in action.payload as cell id, toggle the active state
        click: (state, action: PayloadAction<[number, number]>) => {
            state.map(prevGrid => [
                ...prevGrid,
                [
                    prevGrid.map(prevCell => {
                        if (prevCell.x == action.payload[0] && prevCell.y == action.payload[1]) {
                            prevCell.active = !prevCell.active
                        }
                    })
                ]
            ])

        },

        // change grid according to game of life rules
        mutate: (state) => {
            // check each cell for:
            // if cell alive, stays alive if has 2 or 3 live neighbors
            // if cell dead, comes to life if has 3 live neighbors

            // compute live neighbors for each cell
            for (let i = 0; i < state.length; i++) {
                for (let j = 0; j < state[i].length; j++) {
                    state[i][j].numLiveNeighbors = calculateNeighbors(state, state[i][j].x, state[i][j].y)
                }
            }

            // check # of live neighbors, and implement game of life rules
            const nextState = state.map(prevGrid => [
                ...prevGrid,
                [
                    prevGrid.map(prevCell => {
                        if (prevCell.active) {
                            if (prevCell.numLiveNeighbors == 2 || prevCell.numLiveNeighbors == 3) {
                                prevCell.active = true
                            } else {
                                prevCell.active = false
                            }
                        } else {
                            if (prevCell.numLiveNeighbors == 3) {
                                prevCell.active = true
                            } else {
                                prevCell.active = false
                            }
                        }
                    })             
                ]
            ])
            
        },

        // randomly generate grid
        randomize: (state) => {
            const newGrid = state.map(prevGrid => [
                ...prevGrid,
                [
                    prevGrid.map(prevCell => {
                        prevCell.active = Math.random() < 0.5
                    })
                ]
            ])
        },

        clear: (state) => {
            const newGrid = state.map(prevGrid => [
                ...prevGrid,
                [
                    prevGrid.map(prevCell => {
                        prevCell.active = false
                    })
                ]
            ])
        }
    }
})

// export actions
export const {
    start,
    stop,
    mutate,
    randomize,
    click,
    clear
} = gridSlice.actions

// export reducer 
export default gridSlice.reducer