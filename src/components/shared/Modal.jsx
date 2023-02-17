import React from 'react'
import style from './Modal.module.css'

const Modal = ({children}) => {

  return (
    <div className={style.containnerModal}>
      <div className={style.modal}>
        {children}
      </div>
    </div>
  )
}

export default Modal