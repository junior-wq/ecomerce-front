import React from 'react';
import './styles.css';

interface AboutProps {
  imageUrl?: string;
  storeName?: string;
  foundedYear?: number;
  description?: string;
  stats?: {
    years: number;
    customers: string;
    focus: string;
  };
}

const About: React.FC<AboutProps> = ({
  imageUrl = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=450&fit=crop",
  storeName = "Nova Store",
  foundedYear = 2016,
  description = "Nasceu para transformar experiências. Design minimalista, qualidade excepcional e atendimento que faz a diferença.",
  stats = { years: 8, customers: "5k+", focus: "100%" }
}) => {
  const currentYear = new Date().getFullYear();
  const yearsOperating = currentYear - foundedYear;

  return (
    <section className="about">
      <div className="about__title">
        <h2>Sobre Nós</h2>
      </div>

      <div className="about__grid">
        <div className="about__image">
          <img 
            src={imageUrl} 
            alt={storeName}
          />
        </div>
        
        <div className="about__content">
          <p>
            A <strong>{storeName}</strong> {description}
          </p>
          <p>
            Há mais de {yearsOperating} anos criando momentos únicos para quem busca 
            produtos selecionados com cuidado e uma experiência de compra 
            verdadeiramente especial.
          </p>
          
          <div className="about__stats">
            <div className="stat">
              <div className="stat__number">{stats.years}+</div>
              <div className="stat__label">Anos</div>
            </div>
            <div className="stat">
              <div className="stat__number">{stats.customers}</div>
              <div className="stat__label">Clientes</div>
            </div>
            <div className="stat">
              <div className="stat__number">{stats.focus}</div>
              <div className="stat__label">Foco</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;