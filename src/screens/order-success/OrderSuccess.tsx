import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import "./OrderSuccess.css";

const OrderSuccess: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true
    });

    // Confetti muito simples
    myConfetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 }
    });

    return () => {};
  }, []);

  return (
    <div className="order-success-page">
      <canvas ref={canvasRef} className="confetti-canvas" />
      
      <div className="success-card">
        <h1 className="success-title">Pedido Confirmado ✓</h1>
        
        <p className="order-id">
          ID: #ORD-2025-7890
        </p>

        <p className="success-message">
          Obrigado pela sua compra. Você receberá uma confirmação por email em breve.
        </p>

        <div className="success-actions">
          <Link to="/orders" className="btn-secondary">
            Ver Pedidos
          </Link>
          <Link to="/" className="btn-primary">
            Continuar Comprando
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;