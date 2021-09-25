import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import CardForm from "./CardForm"

export default function AddCard() {
  const initialFormData = {
    front: "",
    back: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    const readingDeck = async () => {
      try {
        const deckData = await readDeck(deckId, abortController.signal);
        setDeck(() => ({ ...deckData }));
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        } else {
          throw error;
        }
      }
    };

    readingDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createCard(deckId, formData)
    setFormData(initialFormData);
  };

  const handleCancel = () => history.push(`/decks/${deckId}`);

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
            Add Card
          </li>
        </ol>
      </nav>

      <div className="add-card mt-3 mb-3">
        <h2>{deck.name}: Add Card</h2>
      </div>

      <CardForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        deckId={deckId}
      />
      
    </div>
  );
};
