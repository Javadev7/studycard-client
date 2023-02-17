import React, { useContext } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom';
import { Context } from '../../memory/MemoryData';
import styleC from './Card.module.css'
import style from './AllDecks.module.css'
import {ReactComponent as PlusIcon} from '../../images/plus.svg'
import {ReactComponent as EditDeckIcon} from '../../images/editdeck.svg'
import {ReactComponent as DeleteIcon} from '../../images/delete.svg'


const AllDecks = () => {

  const [state, dispatch] = useContext(Context);
  
  return (
    <div className={styleC.containner}>
      <div className={styleC.card}>
      <div className={style.plusIcon}>
        <Link to={`/newDeck`}> <PlusIcon />  </Link> 
      </div>
      <h2 className={style.title}> Choose a deck to study </h2>
        {state.Decks.order.map((id, index) => { 
          return (
            <div className={style.decklist} key={ index+'desk'}>
              {state.Decks.objects[id].cards.length === 0 ? 
              <Link to={`/allDecks/desk/${id}/Card`}  className={style.text_decks}>{state.Decks.objects[id].name}</Link> : 
              <Link to={`/allDecks/desk/${id}`}  className={style.text_decks}>{state.Decks.objects[id].name} </Link> }
    
                  <div > 
                    <Link to={`/allDecks/deskDetail/${id}`}> <EditDeckIcon /> </Link>
                    <Link to={`/allDecks/deskDetail/${id}`}> <DeleteIcon /> </Link>
                  </div>
            </div>
          )
        })}
      <Outlet />
      </div>
    </div>
  )
}

export default AllDecks