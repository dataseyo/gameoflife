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
    const closeModal = () => {
        setOpen(false)
    }

    return ReactDOM.createPortal(
        <>
            {open &&
                <div className="modal-wrapper" onClick={() => setOpen(false)}>
                    <Modal
                    open={open}
                    setOpen={setOpen}
                />
                </div>
            }
        </>, 
        document.getElementById('root')!,
    )
}

const Modal = ({
    open,
    setOpen
}: ModalProps) => {

  return (
    <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Menu</h2>
        <p className="modal-label">Grid Size: </p>
        <p className="modal-label">Cell Color: </p>
        <p className="modal-label">In progress.....</p>
    </div>
  )
}

export default ModalContainer