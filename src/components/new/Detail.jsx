import React, { useContext, useEffect, useState } from 'react'
import style from './Detail.module.css'
import styleCard from '../list/Card.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../memory/MemoryData';
import { create_Card, delete_Card, update_Card } from '../../services/requestDecks';

const Detail = () => {

  const {card_id} = useParams()
  const {id} = useParams()

  const [form, setForm] = useState({
      "front": "",
      "back": "",
      "image":"",
      "id_deck": id      
  });
  
  const [state, dispatch] = useContext(Context);
  const { front, back, urlImage, id_deck } = form;

  const onChange = (event, prop) => {
		setForm((estado) => ({ ...estado, [prop]: event.target.value }));
	};

  const navegar = useNavigate()

      useEffect(() => {
        const cardMemo = state.Cards.objects[card_id]
/*         console.log(cardMemo)
 */       if(!card_id ) return;
          if(!cardMemo) {
          return navegar('/404')
      } 
      setForm(cardMemo);
    }, [ id, card_id ]); 

  const createCard = async() => {
    const newCard = await create_Card(form)
    dispatch({ type: 'CREATE_CARD', card: newCard })
    navegar('/allDecks')
  }

  const updateCard = async() => {
    const updatedCard = await update_Card(form)
    dispatch({type: 'UPDATE_CARD',  card_id, card: updatedCard})
    navegar('/allDecks')
  }

  const deleteCard = async() => {
    await delete_Card(form.id)
    dispatch({ type: 'DELETE_CARD', id, card_id })
    navegar('/allDecks')
    
  }
  
  const cancel = () => {
  navegar(`/allDecks`)
  }

  return (
    <div className={style.containnerForm}>
        <form className={styleCard.card}>
            <label className={style.label}>
                Front of card
            </label>
            <input 
                className={style.input}
                type='text'
                placeholder='Add the front...'
                value={front}
                onChange={(e) => onChange(e, "front")}
            />
            <label className={style.label}>Back of card</label>
            <input 
              className={style.input}
              placeholder='Add the answer...'
              value={back}
              onChange={(e) => onChange(e, "back")}
              />
              <div className={style.buttons}>
              { !card_id && (
                <button type="button" className={styleCard.button} onClick={createCard}>
                  Create
                </button>  
              )}
              { card_id && (
                <button type="button" className={styleCard.button} onClick={updateCard} >
                  Update
                </button>
              )}
              { card_id && (
                <button type="button" className={styleCard.button} onClick={deleteCard}>
                  Delete
                </button>
              )}
              <button type="button" className={styleCard.button} onClick={cancel}>
                Cancel
              </button>
            </div>
        </form>
 
    </div>
  )
}

export default Detail