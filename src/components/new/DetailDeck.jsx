import React, { useContext, useEffect, useState } from 'react'
import styleC from '../list/Card.module.css'
import style from '../list/AllDecks.module.css'
import styleDetail from './Detail.module.css'
import { Context } from '../../memory/MemoryData'
import { useNavigate, useParams } from 'react-router-dom'
import { create_Deck, delete_Deck, update_Deck } from '../../services/requestDecks'

const DetailDeck = () => {

  const [state, dispatch] = useContext(Context)
  const {id} = useParams()

  const [form, setForm] = useState(
    {
      name: "",
      icon: "", 
      usuario_id: 1
    })

  const navegar = useNavigate()

  const { name } = form

  const onChange = (event, prop) => {
		setForm((estado) => ({ ...estado, [prop]: event.target.value }));
	};

  useEffect(() => {
    const cardMemo = state.Decks.objects[id]
      if( !id ) return;
      if(!cardMemo) {
      return navegar('/404')
  } 
  setForm(cardMemo);
}, [id]); 
  
  const createDeck =  async() => {
    const newDeck = await create_Deck(form)
    dispatch({ type: 'CREATE_DECK', deck: newDeck})
    navegar(`/AllDecks`)
  }

  const updateDeck = async() => {
    const bd_form = {id: form.id, name: form.name, icon: form.icon, usuario_id: form.usuario_id}
    const updatedDeck = await update_Deck(bd_form)
    dispatch({type: 'UPDATE_DECK', id, deck: updatedDeck})
    navegar('/allDecks')
  }

  const deletedDeck = async() => {
    await delete_Deck(form.id)
    dispatch({ type: 'DELETE_DECK', id })
  }

  const cancel = () => {
    navegar(`/allDecks`)
    }

  return (
    <div className={styleC.containner}>
      <div className={styleC.card}>
        <div className={style.title}>
          Deck 
        </div>
            <label className={styleDetail.label}>
                Name of deck
            </label>
            <input 
                className={styleDetail.input}
                type="text"
                placeholder='Add the name of deck...'
                defaultValue={name}
                onChange={(e) => onChange(e, "name")}
                />
              <div className={styleDetail.buttons}>
              { !id && (
                <button type="button" className={styleC.button} onClick={createDeck}>
                  Create
                </button>  
              )}
              { id && (
                <button type="button" className={styleC.button} onClick={updateDeck} >
                  Update
                </button>
              )}
              { id && (
                <button type="button" className={styleC.button} onClick={deletedDeck}>
                  Delete
                </button>
              )}
              <button type="button" className={styleC.button}  onClick={cancel} >
                Cancel
              </button>
            </div>
      </div>
    </div>
  )
}

export default DetailDeck