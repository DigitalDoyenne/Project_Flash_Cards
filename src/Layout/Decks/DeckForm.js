import React from "react";

export default function DeckForm({
  formData,
  handleChange,
  handleSubmit,
  handleCancel,
  isNew,
}) {
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          className="form-control"
          name="name"
          id="name"
          placeholder="Deck Name"
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
          placeholder="Brief description of the deck"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <button
          type="button"
          className="btn btn-secondary mr-3"
          onClick={handleCancel}
        >
          {isNew ? "Done" : "Cancel"}
        </button>
        <button type="submit" className="btn btn-primary">
          {isNew ? "Save" : "Submit"}
        </button>
      </div>
    </form>
  );
};