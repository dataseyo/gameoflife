import React, { useState, useCallback, useEffect } from 'react'

import './styles.css'
import useGrid from '../../hooks/useGrid'
import Cell from './Cell/Cell'
import { useAppSelector, useAppDispatch } from '../../state/store'

const getWindowDimensions = () => {
  const {
    innerWidth: width,
    innerHeight: height
  } = window

  return {
    width,
    height
  }
}

const computeGridResize = () => {

}

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

  // screen state
  const [mobile, setMobile] = useState(false)
  const [windowSize, setWindowSize] = useState(getWindowDimensions())
  const [gridScale, setGridScale] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleMobile = () => {
      if (windowSize.width < 400) {
        // setGridScale(.8)
        // grid scale computation
        // let gridWidth = window.getComputedStyle()
        let cellSize = 20
        let rowSize = 20
        let gridWidth = cellSize * rowSize
        let newGridScale = windowSize.width / gridWidth
        setGridScale(newGridScale)
      } else {
        setGridScale(1)
      }
    }

    console.log(gridScale)

    handleMobile()
  }, [windowSize])

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
      <div 
        className="grid"
        style={{
          transform: `scale(${gridScale})`
        }}
      >
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