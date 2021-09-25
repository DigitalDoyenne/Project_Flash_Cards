import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { deleteCard, deleteDeck, readDeck } from "../../utils/api";

export default function Deck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ name: "Loading...", cards: [] });
  const cards = deck.cards || [];

  useEffect(() => {
    async function getDeck() {
      const { signal } = new AbortController();
      try {
      const response = await readDeck(deckId, signal);
      if (response) setDeck(response);
      } catch (error) {
        history.push("/NotFound")
      }
    }
    getDeck();
  }, [history, deckId]);

  const deleteDeckHandler = async deckId => {
    if (window.confirm("Delete this deck? You will not be able to recover it.")) {
      await deleteDeck(deckId);
      history.push("/");
    }
  };

  const deleteCardHandler = async cardId => {
    if (window.confirm("Delete this card? You will not be able to recover it.")) {
      await deleteCard(cardId);
      history.go(0);
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <span className="oi oi-home text-primary mr-1"></span>
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>

      <div className="card mb-3 w-50" key={`deck${deck.id}`}>
        <div className="card-body">
          <h5 className="card-title">{deck.name}</h5>
          <p className="card-text">{deck.description}</p>

          <div className="container">
            <div className="row">
              <div className="edit d-flex">
                <Link to={`/decks/${deck.id}/edit`}>
                  <button type="button" className="btn btn-secondary mr-3">
                    <span className="oi oi-pencil mr-2"></span>
                    Edit
                  </button>
                </Link>
              </div>

              <div className="study d-flex">
                <Link to={`/decks/${deck.id}/study`}>
                  <button type="button" className="btn btn-primary mr-3">
                    <span className="oi oi-book mr-2"></span>
                    Study
                  </button>
                </Link>
              </div>

              <div className="add-cards d-flex">
                <Link to={`/decks/${deck.id}/cards/new`}>
                  <button type="button" className="btn btn-primary mr-3">
                    <span className="oi oi-plus mr-2"></span>
                    Add Cards
                  </button>
                </Link>
              </div>

              <div className="delete d-flex">
                <Link to={`/decks/${deck.id}`}>
                  <button
                    type="delete"
                    className="btn btn-danger mr-0"
                    onClick={() => deleteDeckHandler(deck.id)}
                  >
                    <span className="oi oi-trash justify-content-right"></span>
                    {/* Delete icon */}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-list mt-3 mb-3">
        <h2>Cards</h2>
      </div>

      <div className="container">
        <div className="row mb-5 w-50">
          <ul className="col">
            {cards.map(card => {
              return (
                <li key={cards.indexOf(card)} className="card m-2">
                  <div className="row card-body">
                    <div className="col w-50 card-title">
                      <p className="card-text">{card.front}</p>
  
                      <div className="col w-50 card-title">
                        <p className="card-text">{card.back}</p>
                      </div>
                    </div>
                  </div>

                  <div className="container">
                    <div className="row justify-content-space-between">
                      <div className="edit d-flex">
                        <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>
                          <button
                            type="button"
                            className="btn btn-secondary mr-3"
                          >
                            <span className="oi oi-pencil mr-2"></span>
                            Edit
                          </button>
                        </Link>
                      </div>

                      <div className="delete d-flex">
                        <Link to={`/decks/${deck.id}`}>
                          <button
                            type="delete"
                            className="btn btn-danger mr-0"
                            onClick={() => deleteCardHandler(card.id)}
                          >
                            <span className="oi oi-trash"></span>
                            {/* Delete icon */}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};