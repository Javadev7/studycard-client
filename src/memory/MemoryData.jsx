import React, { createContext, useReducer } from 'react'
import dataJson from '../data_ok.json'


const initialState = {
    Decks: {
        order: [],
        objects:{}
    },
    Cards: {
        order: [],
        objects: {}
    }
};

function reducer(state, action) {
    switch (action.type) {
        case 'GET_DECKS': {
            const Decks = action.Decks;
            const Cards = action.Cards;
            const newState = { ...state,
                Decks: {
                  order: Decks.map((deck) => deck.id), 
                  objects: Decks.reduce((object, deck) => ({ ...object, [deck.id]:{...deck, cards:
                  Cards.filter((card)=> card.id_deck === deck.id ).map(card => card.id) } }), {})
                },
                Cards: {
                  order: Cards.map((card) => card.id),
                  objects: Cards.reduce((object, card) => ({ ...object, [card.id]: card}), {})
                }
            };  
            console.log('NEWSTATE', newState)
            return newState;
        };  

        case 'CREATE_DECK': {
            const id_deck = action.deck.id;
            const newState = {
                  Decks: {
                    order: [ ...state.Decks.order, id_deck], 
                    objects: {...state.Decks.objects, [id_deck]: {
                      ...action.deck, cards:[] } }
                  },
                  Cards: {
                    order: [...state.Cards.order ],
                    objects: { ...state.Cards.objects }
                  }
              };  
              console.log('CREATE_CARD', newState)
            return newState;
        };

        case 'UPDATE_DECK': {
          const id = action.id;
          state.Decks.objects[id] = {...state.Decks.objects[id], ...action.deck}
          const newState = { ...state };
          console.log('updateDeck', newState)
          return newState
      }

      case 'DELETE_DECK': {
        const id = action.id;   
        const newOrder = state.Decks.order.filter((item) => item !== id )
        delete state.Decks.objects[id];
        const newState ={
          Decks: {
              order: newOrder, 
              objects: state.Decks.objects 
              },
          Cards: {
              order: [...state.Cards.order ],
              objects: {...state.Cards.objects }
              }
            }
        console.log('DELETE_DECK', newState)
        return newState;
    }

        case 'CREATE_CARD': {
          const id_card = action.card.id;
          const id_deck = action.card.id_deck
          const newState = {
              Decks: {
                  order: [ ...state.Decks.order ], 
                  objects: {...state.Decks.objects, 
                    [id_deck]: {...state.Decks.objects[id_deck], 
                      cards: [ ...state.Decks.objects[id_deck].cards, id_card  ] }
                    }
                },  
                Cards: {
                  order: [...state.Cards.order, id_card ],
                  objects: { ...state.Cards.objects, [id_card]: action.card }
                }
            }
            console.log('CREATE_CARD', newState)
            return newState;
        };

        case 'UPDATE_CARD': {
          const id = action.card_id;
          state.Cards.objects[id] = {...state.Cards.objects[id], ...action.card}
          const newState = { ...state };
          console.log('updateCard', newState)
          return newState
      }

      case 'DELETE_CARD': {
        const card_id = action.card_id;  
        const id = action.id 
        const newOrder = state.Cards.order.filter((item) => item !== card_id )
        delete state.Cards.objects[card_id]
        state.Decks.objects[id] = {...state.Decks.objects[id], cards: [...state.Decks.objects[id].cards.filter((item)=> item !== +card_id)] } 
        const newState =  {
          Decks: {
              order: [ ...state.Decks.order ], 
              objects: {...state.Decks.objects }
              },
          Cards: {
              order: newOrder,
              objects: state.Cards.objects 
              }
            }
        console.log('DELETE_CARD', newState)
        return newState;
    }
        default:
			throw new Error();
    }
}

/* const cdecks = reducer(initialState, {type: 'place', Data: dataJson }); */

export const Context = createContext(null)

const MemoryData = ({children}) => {

    //useReducer recibe el reductor y cdecks viene a ser el estado inicial
    /* const [state, dispatch] = useReducer(reducer, cdecks) */
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <Context.Provider  value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export default MemoryData