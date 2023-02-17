import React, { createContext, useReducer } from 'react'
import dataJson from '../data_ok.json'


const initialState = {
    order: [],
    objects:{}
    
};

function reducer(state, action) {
    switch (action.type) {
        case 'place': {
            const cards = action.cards;
            const newState = {
                order: cards.map((card) => card.id), 
                objects: cards.reduce((object, card) => ({ ...object, [card.id]: card }), {})
            };
            return newState;
        };  

        case 'create': {
            const id_card = Math.random();
            const newState = {
                order: [ ...state.order, id_card ], 
                objects: { ...state.objects, [id_card]: action.deck }
            };
            console.log('createCard', newState)
            return newState;
        };

        case 'update': {
            const id = action.deck.id;
            state.objects[id] = {...state.objects[id], ...action.deck}
            const newState = { ...state };
            return newState
        }

        case 'deleted': {
            const id = action.id;   
            const newOrder = state.order.filter((item) => item !== id )
            delete state.objects[id];
            const newState = { 
                order:  newOrder,
                objects: state.objects 
            };
        
            return newState;
        }
        
        default:
			throw new Error();
    }
}

const cdecks = reducer(initialState, {type: 'place', cards: dataJson.Cards });

export const CardContext = createContext(null)

const MemoryCards = ({children}) => {

    //useReducer recibe el reductor y cdecks viene a ser el estado inicial
    const [state, dispatch] = useReducer(reducer, cdecks)

    return (
        <CardContext.Provider  value={[state, dispatch]}>
            {children}
        </CardContext.Provider>
    )
}

export default MemoryCards