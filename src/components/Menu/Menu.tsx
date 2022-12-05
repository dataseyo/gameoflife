import React, { useEffect, useState, useRef } from 'react'

import './styles.css'
import { useAppDispatch, useAppSelector } from '../../state/store'
import {
  randomize,
  mutate,
  clear
} from '../../state/gridSlice'
import { FaPlay, FaStop, FaBars, FaTimes, FaRandom, FaEraser} from 'react-icons/fa'
import Modal from '../Modal/Modal'

type Props = {}

const Menu = (props: Props) => {
  // redux 
  const dispatch = useAppDispatch()
  const grid = useAppSelector((state) => state.grid)

  // game/menu state
  const [isPaused, setIsPaused] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  const handleModal = () => {
    setModalOpen(!modalOpen)
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
        <FaRandom 
          className="randomize-button"
          onClick={() => dispatch(randomize())}
          size="1.5em"
        >
        </FaRandom>

        {/* PLAY | PAUSE  */}
        { isPaused ? 
          <FaPlay
            className="play-button"
            onClick={(() => setIsPaused(false))}
            size="1.5em"
          />
          : 
          <FaStop
            className="stop-button"
            onClick={(() => setIsPaused(true))}
            size="1.5em"
          />
        }

      {
        <FaEraser
          className="eraser-button"
          size="1.5em"
          onClick={() => dispatch(clear())}
        />
      }
      

      {/* OPEN MODAL | CLOSE MODAL */}
      {
        modalOpen ?
        <FaTimes
          className="modal-button"
          size="1.5em"
          onClick={handleModal}
        />
        :
        <FaBars
          className="modal-button"
          size="1.5em"
          onClick={handleModal}
        />
      }
      
      
      {/* <button
        className="menu-button"
        onClick={() => dispatch(mutate())}
      >
        step
      </button>  */}

      <Modal
        open={modalOpen}
        setOpen={setModalOpen}
      />
    </div>
  )
}

export default Menu