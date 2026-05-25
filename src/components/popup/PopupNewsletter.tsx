// components/popup/PopupNewsletter.tsx
import './styles.css';
import { useState, useEffect } from 'react';
import { FiMail, FiX } from 'react-icons/fi';

interface PopupNewsletterProps {
  onClose?: () => void;
}

const PopupNewsletter = ({ onClose }: PopupNewsletterProps) => {
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Verifica se o popup já foi mostrado nesta sessão
    const hasBeenShown = sessionStorage.getItem('popupShown');
    
    if (!hasBeenShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('popupShown', 'true');
      }, 60000); // 60 segundos = 1 minuto
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Aqui você pode integrar com sua API
      console.log('Email capturado:', email);
      alert('Inscrito com sucesso!');
      setIsVisible(false);
      onClose?.();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <div className="popup-overlay" onClick={handleClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <button className="popup__close" onClick={handleClose}>
          <FiX size={20} />
        </button>
        
        <div className="popup__icon">
          <FiMail size={24} />
        </div>
        
        <h2 className="popup__title">Ofertas exclusivas</h2>
        <p className="popup__description">
          Receba novidades e descontos especiais diretamente no seu email.
        </p>
        
        <form className="popup__form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="popup__input"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="popup__button">
            Quero receber
          </button>
        </form>
        
        <p className="popup__note">
          Sem spam. Você pode cancelar a qualquer momento.
        </p>
      </div>
    </div>
  );
};

export default PopupNewsletter;