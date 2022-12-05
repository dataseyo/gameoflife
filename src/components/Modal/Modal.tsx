/* 
    MODAL MENU POPUP
*/
import React from 'react'
import ReactDOM from 'react-dom'

import './styles.css'

type ModalProps = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalContainer = ({
    open,
    setOpen
}: ModalProps) => {
    return ReactDOM.createPortal(
        <>
            {open && <Modal
                open={open}
                setOpen={setOpen}
            />}
        </>, 
        document.getElementById('root')!,
    )
}

const Modal = ({
    open,
    setOpen
}: ModalProps) => {
  return (
    <div className="modal">
        MODAL TEST
    </div>
  )
}

export default ModalContainer