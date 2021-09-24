import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";

export default function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ name: "Loading...", cards: [] });
  const [flipped, setflipped] = useState(false);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();
    async function getDeck() {
      try {
        let data = await readDeck(deckId, abortController.signal);
        setDeck(data);
      } catch (error) {
        setError(error);
      }
    }
    getDeck();
    return () => abortController.abort();
  }, [deckId]);

  if (error) {
    return error;
  }

  function NextCard() {
    if (index === deck.cards.length - 1) {
      const result = window.confirm(
        "Restart cards? Click 'cancel' to return to the home page."
      );
      if (result) {
        setIndex(0);
      }
    } else {
      setIndex(index + 1);
      setflipped(prevState => !prevState); //does this else statement need to be a history push to the homepage instead?
    }
  }

  function Flip() {
    setflipped(prevState => !prevState);
  }

  if (deck.cards.length <= 2) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <span className="oi oi-home mr-1"></span>
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h2>Not enough cards</h2>
        <p>
          You need at least 3 cards to study. There are {deck.cards.length} in
          this deck.
        </p>
        <Link to={`/decks/${deck.id}/cards/new`}>
          <button type="button" className="btn btn-primary">
            <span className="oi oi-plus mr-2"></span>
            Add Card
          </button>
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <span className="oi oi-home text-primary mr-1"></span>
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>

        <div className="study mt-3 mb-3">
          <h2>Study: {deck.name}</h2>
        </div>

        <div
              className="card mb-3"
              key={`deck${deck.id}`}
              style={{ width: "18rem" }}
            >
        <div className="card-body">
          <h5 className="card-title">Card {index + 1} of {deck.cards.length}</h5>
          <p className="card-text">
            {!flipped
            ? `${deck.cards[index].front}`
            : `${deck.cards[index].back}`}
            </p>
          <div className="container">
            <div className="row">
              <div className=" flip d-flex">
                  <button type="button" className="btn btn-secondary mr-3" onClick={Flip}>
                    <span className="oi oi-action-redo mr-2"></span>
                    Flip
                  </button>
              </div>
              {flipped && (
              <div className="study d-flex">
                  <button type="button" className="btn btn-primary" onClick={NextCard}>
                    <span className="oi oi-arrow-right mr-2"></span>
                    Next
                  </button>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
