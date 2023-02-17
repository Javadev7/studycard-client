import React from 'react'
import Aside from './Aside'
import style from './Layout.module.css'
import {Outlet} from 'react-router-dom'


const Layout = () => {
  return (
    <div className={style.main}>
        <Aside/>
        <section className={style.section}>
            <Outlet></Outlet>
        </section>
    </div>
  )
}

export default Layout