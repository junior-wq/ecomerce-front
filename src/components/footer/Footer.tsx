import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <section className='footer-container'>
      {/* Seção Loja */}
      <div className='footer_colum'>
        <h4>Loja</h4>
        <Link to=''>Feminino</Link>
        <Link to=''>Masculino</Link>
        <Link to=''>Infantil</Link>
        <Link to=''>Novidades</Link>
        <Link to=''>Promoções</Link>
      </div>

      {/* Seção Atendimento */}
      <div className='footer_colum'>
        <h4>Atendimento ao Cliente</h4>
        <Link to=''>Central de Ajuda</Link>
        <Link to=''>Trocas e Devoluções</Link>
        <Link to=''>Rastreamento de Pedidos</Link>
        <Link to=''>Perguntas Frequentes</Link>
        <Link to=''>Fale Conosco</Link>
      </div>

      {/* Seção Sobre Nós */}
      <div className='footer_colum'>
        <h4>Sobre Nós</h4>
        <Link to=''>Nossa História</Link>
        <Link to=''>Sustentabilidade</Link>
        <Link to=''>Trabalhe Conosco</Link>
        <Link to=''>Blog</Link>
      </div>

      {/* Seção Redes Sociais */}
      <div className='footer_colum'>
        <h4>Redes Sociais</h4>
        <Link to=''>Instagram</Link>
        <Link to=''>Facebook</Link>
        <Link to=''>Twitter</Link>
        <Link to=''>YouTube</Link>
      </div>
    </section>
  );
}
