import './App.css';
import { Navigate, Route, Routes }  from 'react-router-dom'
import Detail from './components/new/Detail';
import AllDecks from './components/list/AllDecks';
import Layout from './components/shared/Layout'; 
import Modal from './components/shared/Modal';
import Card from './components/list/Card';
import DetailDeck from './components/new/DetailDeck';
import { useContext, useEffect } from 'react';
import { Context } from './memory/MemoryData';
import { requestCard, requestDeck } from './services/requestDecks';

function App() {

  const [state, dispatch] = useContext(Context);

  useEffect(() => {
		//jalamos el servicio creado 
			(async function () {
			const Decks = await requestDeck();
      const Cards = await requestCard()
			dispatch({ type: "GET_DECKS", Decks, Cards });
		})();
		/* fetchData(); */
		}, [dispatch]);

  return (

    <Routes> 
      <Route path="/" element ={ <Navigate to="/allDecks" /> } /> 
        <Route element={ <Layout /> }> 
            <Route path="/allDecks" element={<AllDecks /> } />
            <Route path="/allDecks/deskDetail/:id" element= {<DetailDeck />} />
            <Route path="/allDecks/desk/:id" element= {<Card />} >
                <Route
                        path="/allDecks/desk/:id/card/:card_id" 
                        element= {  <Modal>
                                      <Detail/>
                                    </Modal> }
                      />
            </Route> 
            <Route path="/allDecks/desk/:id/Card" element={ <Detail />} />
          <Route path="/newDeck" element={ <DetailDeck />} />
        </Route>
    </Routes>
  );
}

export default App;
