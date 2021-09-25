import React, { useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { createDeck } from "../../utils/api";
import DeckForm from "./DeckForm";

export default function NewDeck() {
  const initialState = {
    name: "",
    description: "",
  };

  const { deckId } = useParams();
  const [formData, setFormData] = useState(initialState);

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const deck = await createDeck(formData)
    history.push(`/decks/${deck.id}`);
  };

  const handleCancel = () => history.push('/');

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <span className="oi oi-home text-primary mr-1"></span>
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>

      <div className="create-deck mt-3 mb-3">
        <h2>Create Deck</h2>
      </div>

      <DeckForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        deckId={deckId}
      />

    </div>
  );
};