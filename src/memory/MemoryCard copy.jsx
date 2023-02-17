import React, { createContext, useReducer } from 'react'
import dataJson from '../data_ok.json'


const initialState = {
    order: [],
    objects:{}
    
};

/* function reducer(state, action) {
    switch (action.type) {
        case 'place': {
            const decks = action.decks;
            const newState = {
                order: decks.map((deck) => deck.id), 
                objects: decks.reduce((object, deck) => ({ ...object, [deck.id]: deck }), {})
                
            };
            console.log('createCard', newState)
            return newState;
        };   */

function reducer(state, action) {
    switch (action.type) {
        case 'place': {
            const decks = action.decks;
            const newState = {
                order: decks.map((deck) => deck.id), 
                objects: decks.reduce((object, deck) => ({ ...object, 
                    [deck.id]: { ...deck, Cards: deck.Cards.map((card)=> card.id) } }), {})
                
            };
            console.log('place', newState)
            return newState;
        };  

        case 'createDesk': {
            const id_deck = state.order.length + 1;
            const newState = {
                order: [ ...state.order, id_deck],
                objects: {...state.objects, [id_deck]: action.deck }
            };
            return newState;
        };

        case 'createCard': {
            const id_card = Math.random();
            const id_deck = action.deck.id_deck
        /*  const id_deck = state.order.length */
            const newState = {
                order: [ ...state.order ], 
                objects: {...state.objects, 
                    [id_deck]: {...state.objects[id_deck], 
                    Cards: {...state.objects[id_deck].Cards, [id_card]: action.deck }} }
            };

            return newState;
        };

        case 'updateDeck': {
            const id = action.id;
            state.objects[id] = {...state.objects[id], ...action.deck}
            const newState = { ...state };
            return newState
        }

        case 'updateCard': {
            const id_deck = action.id;
            const card_id = action.card_id;
           /*  const idArray = JSON.stringify(parseInt(card_id) - 1) */
                state.objects[id_deck].Cards[card_id] = {...state.objects[id_deck].Cards[card_id],  
                    ...action.deck}
            const newState = { ...state };
            console.log('updateCard', newState)
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

const cdecks = reducer(initialState, {type: 'place', decks: dataJson.Decks });

export const Context = createContext(null)

const MemoryDeck = ({children}) => {

    //useReducer recibe el reductor y cdecks viene a ser el estado inicial
    const [state, dispatch] = useReducer(reducer, cdecks)

    return (
        <Context.Provider  value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export default MemoryDeck