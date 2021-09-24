import React from "react";

export default function CardForm({ formData, handleChange, handleSubmit, isNew }) {

  return (
    <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <input
            className="form-control"
            name="front"
            id="front"
            placeholder="Front side of card"
            value={formData.front}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            name="back"
            id="back"
            placeholder="Back side of card"
            value={formData.back}
            onChange={handleChange}
          />
        </div>

      <div>
        <button type="button" className="btn btn-secondary mr-3">{isNew ? "Done" : "Cancel"}</button>
        <button type="submit" className="btn btn-primary">{isNew ? "Save" : "Submit"}</button>
      </div>

    </form>
  );
}
