import React, { useEffect, useState, useRef } from 'react'

import './styles.css'
import { useAppDispatch, useAppSelector } from '../../state/store'
import {
  randomize,
  mutate
} from '../../state/gridSlice'

type Props = {}

const Menu = (props: Props) => {
  // redux 
  const dispatch = useAppDispatch()
  const grid = useAppSelector((state) => state.grid)

  // game/menu state
  const [isPaused, setIsPaused] = useState(true)

  const handlePlay = () => {
    const interval = setInterval(() => {
      dispatch(mutate())
    }, 500)
  }

  const handlePause = () => {

  }

  // control whether game is paused or playing
  let interval = useRef<NodeJS.Timeout | null>(null)
  useEffect(() => {
    if (!isPaused) {
      interval.current = setInterval(() => {
        dispatch(mutate())
      }, 500)}
    
    
    if (interval.current) {
      return () => clearInterval(interval.current as NodeJS.Timeout)
    } 
    

  }, [isPaused])

  return (
    <div className="menu__container">
      <button 
        className="menu-button"
        onClick={() => dispatch(randomize())}
      >
        randomize
      </button>

      <button
        onClick={() => dispatch(mutate())}
      >
        step
      </button> 

      <button
        onClick={(() => setIsPaused(false))}
      >
        play
      </button>

      <button
        onClick={(() => setIsPaused(true))}
      >
        stop
      </button>


      
    </div>
  )
}

export default Menu