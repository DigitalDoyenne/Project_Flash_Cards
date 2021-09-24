import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readCard, updateCard, readDeck } from "../../utils/api";
import CardForm from "./CardForm";

export default function EditCard() {
  const initialDeckState = {
    name: "",
    description: "",
  };

  const initialCardState = {
    id: "",
    front: "",
    back: "",
    deckId: "",
  };

    const [formData, setFormData] = useState({initialCardState});
    const { deckId, cardId } = useParams();
    const [deck, setDeck] = useState({initialDeckState});
    const history = useHistory();

    useEffect(() => {
        async function loadTheCard() {
          const loadedCard = await readCard(cardId);
          setFormData(loadedCard);
        }
        loadTheCard();
      }, [cardId]);
    
      useEffect(() => {
        async function readTheDeck() {
          const deckIsRead = await readDeck(deckId);
          setDeck(deckIsRead);
        }
        readTheDeck();
      }, [deckId]);

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
        await updateCard(formData)
        history.push(`/decks/${deckId}`);
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
              Edit Card {cardId}
            </li>
          </ol>
        </nav>

        <div className="study mt-3 mb-3">
          <h2>Edit Card</h2>
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