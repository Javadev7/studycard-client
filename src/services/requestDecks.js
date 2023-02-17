
   //* DECKS REQUESTS
export async function requestDeck() {
    const response = await fetch('/api/decks')
    const decks =  await response.json()
    return decks
}

export async function create_Deck(deck) {
  const response = await fetch('/api/decks', {
    method: 'POST',
    body: JSON.stringify(deck),
    headers: {
        "content-type": "application/json; charset=utf-8"
    }
  })
  const deckCreated = await response.json();
  console.log("deck creado!", deckCreated);
  return deckCreated;
}

export async function update_Deck(deck) {
  const response = await fetch(`/api/decks/${deck.id}`, {
    method: 'PUT',
    body: JSON.stringify(deck),
    headers: {
        "content-type": "application/json; charset=utf-8"
    }
  })
  const deckUpdated = await response.json();
  console.log("deck actualizada!", deckUpdated);
  return deckUpdated;
}

export async function delete_Deck(id) {
  await fetch(`/api/decks/${id}`, {
    method: 'DELETE',
    headers: {
        "content-type": "application/json; charset=utf-8"
    }
  })
  console.log("Deck deleted", id);
}

//* CARD REQUESTS
export async function requestCard() {
  const response = await fetch('/api/cards')
  const cards =  await response.json()
  return cards
}

export async function create_Card(card) {
  const response = await fetch('/api/cards', {
    method: 'POST',
    body: JSON.stringify(card),
    headers: {
        "content-type": "application/json; charset=utf-8"
    }
  })
  const cardCreated = await response.json();
  return cardCreated;
}

export async function update_Card(card) {
  const response = await fetch(`/api/cards/${card.id}`, {
    method: 'PUT',
    body: JSON.stringify(card),
    headers: {
        "content-type": "application/json; charset=utf-8"
    }
  })
  const cardUpdated = await response.json();
  return cardUpdated;
}

export async function delete_Card(id) {
  await fetch(`/api/cards/${id}`, {
    method: 'DELETE',
    headers: {
        "content-type": "application/json; charset=utf-8"
    }
  })
  console.log("Deck deleted", id);
}


