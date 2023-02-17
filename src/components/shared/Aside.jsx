import React from 'react'
import style from './Aside.module.css'
import {Link} from 'react-router-dom'

const Aside = () => {

  return (
    <div className={style.containner_aside}>
        <div className={style.aside}>
					<Link to="/new" className={style.button}>New Card</Link>
        </div>
    </div>
  )
}

export default Aside