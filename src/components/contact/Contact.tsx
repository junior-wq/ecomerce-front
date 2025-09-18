import React from 'react';
import './styles.css'; // Importando o arquivo CSS

const ContactSection = () => {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title">Entre em Contato</h2>
        <p className="contact-description">
          Tem alguma dúvida ou precisa de ajuda? Nossa equipe está pronta para ajudar!
        </p>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              placeholder="Seu nome"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Seu e-mail"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="form-label">Mensagem</label>
            <textarea
              id="message"
              name="message"
              className="form-textarea"
              placeholder="Escreva sua mensagem..."
              required
            ></textarea>
          </div>
          <button type="submit" className="form-button">Enviar Mensagem</button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;