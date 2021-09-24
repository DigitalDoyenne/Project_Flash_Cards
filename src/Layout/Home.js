import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

export default function Home() {
  
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchDecks() {
      const decks = await listDecks(abortController.signal);
      setDecks(decks);
    }
    fetchDecks();
  }, []);

  const deleteHandler = async deckId => {
    if (window.confirm("Delete this deck? You will not be able to recover it.")) {
      await deleteDeck(deckId);
      window.location.reload();
    }
  };

  if (decks.length === 0) return null;

  return (
    <div>
      <div className="actions">
        <Link to="/decks/new">
          <button className="btn btn-secondary mb-3">
            <span className="oi oi-plus  mr-2"></span>
            Create Deck
          </button>
        </Link>

        {decks.map(deck => {
          return (
            <div
              className="card mb-3 w-50"
              key={`deck${deck.id}`}
            >
              <div className="card-body">
                <h5 className="card-title">{deck.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {deck.cards.length} cards
                </h6>
                <p className="card-text">{deck.description}</p> 

                <div className="container">
                  <div className="row">
                    <div className="view d-flex">
                      <Link to={`/decks/${deck.id}`}>
                        <button
                          type="button"
                          className="btn btn-secondary mr-3"
                        >
                          <span className="oi oi-eye mr-2"></span>
                          View
                        </button>
                      </Link>
                    </div>

                    <div className="study d-flex">
                      <Link to={`/decks/${deck.id}/study`}>
                        <button type="button" className="btn btn-primary mr-4">
                          <span className="oi oi-book mr-2"></span>
                          Study
                        </button>
                      </Link>
                    </div>

                    <div className="col-6"></div>

                    <div className="delete d-flex">
                      <Link to={`/decks/${deck.id}`}>
                        <button
                          type="delete"
                          className="btn btn-danger mr-0"
                          onClick={() => deleteHandler(deck.id)}
                        >
                          <span className="oi oi-trash"></span>
                          {/* Delete icon */}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
