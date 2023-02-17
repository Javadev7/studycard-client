import React, { useContext } from 'react'
import { Link, Outlet,  useParams } from 'react-router-dom';
import { Context } from '../../memory/MemoryData';
import style from './Card.module.css'
import { ReactComponent as EditIcon } from '../../images/edit.svg';
import {ReactComponent as PlusIcon} from '../../images/plus.svg'
import { CardContext } from '../../memory/MemoryCards';



const getRandomObject = (array) => {
    const randomObject = array[Math.floor(Math.random() * array.length)];
    return randomObject; 
};

const Card = () => {
const [state, dispatchDeck] = useContext(Context)

const {id} = useParams();


const cards_deck = state.Decks.objects[id].cards
const card_id = getRandomObject(cards_deck);
const card = state.Cards.objects[card_id]; 

const linkToEdit = `/allDecks/desk/${id}/card/${card_id}`

return (
    <div className={style.containner} >
        <div className={style.card}>
            <div className={style.icon} >
                <Link to={`/allDecks/desk/${id}/Card`}> <PlusIcon /> </Link> 
                <Link to={linkToEdit}> 
                    <EditIcon alt="edit" />
                </Link>
                <Outlet />
            </div>  
            <span className={style.text1}>
                {card.front}
            </span>
            <div className={style.allButtons}>
                <button className={style.button}>Ver respuesta</button>    
            </div>
        </div>
    </div>
    )
}

export default Card