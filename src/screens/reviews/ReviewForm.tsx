import React, { useState } from "react";
import './ReviewForm.css'

const ReviewModal = ({ isOpen, onClose, }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, comment, });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="review-modal-compact">
        <div className="modal-header">
          <h2 className="review-title">Deixe sua avaliação</h2>
          <p className="review-subtitle">
            Conte para outros clientes o que achou do produto
          </p>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="review-form">
          {/* Avaliação com estrelas - IDÊNTICO AO ORIGINAL */}
          <div className="form-group rating-group">
            {/* <label>Sua nota</label> */}
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${rating >= star ? "active" : ""}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Texto - Mais compacto */}
          <div className="form-group">
            <label htmlFor="comment">Comentário</label>
            <textarea
              id="comment"
              placeholder="Escreva sua experiência com o produto..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="3"
            />
          </div>

          {/* Upload de imagem - Estilo original */}
          <div className="form-group">
            <label htmlFor="photo">Foto (opcional)</label>
            <input type="file" id="photo" accept="image/*" />
          </div>

          {/* Botões */}
          <div className="form-actions">
            <button type="submit" className="review-button">
              Enviar Avaliação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;