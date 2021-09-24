import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";

export default function EditDeck() {
  const initialState = {
    name: "",
    description: "",
  };

  const { deckId } = useParams();
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    const abortController = new AbortController();
    const readingDeck = async () => {
      try {
        const deckData = await readDeck(deckId, abortController.signal);
        setFormData(() => ({ ...deckData }));
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

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    updateDeck(formData).then((deck) => history.push(`/decks/${deck.id}`));
  };

  return (
      
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <span className="oi oi-home text-primary mr-1"></span>
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{formData.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>

      <div className="mt-3 mb-3">
        <h2>Edit Deck</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <Link to={`/decks/${formData.id}`}>
        <button
          type="reset"
          className="btn btn-secondary mr-3"
        >
          Cancel
        </button>
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    
  );
};