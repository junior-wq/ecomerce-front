import "./styles.css";


function About() {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-image">
        <img src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Atendimento ao cliente ecommerce" />
        </div>
        <div className="about-content">
          <h2>Sobre Nós</h2>
          <p>
            Descubra a beleza e a sofisticação das nossas joias. Cada peça é cuidadosamente 
            trabalhada para proporcionar elegância e exclusividade. Nosso compromisso é com 
            a qualidade e o design atemporal.
          </p>
          <p>
            Seja para um momento especial ou para realçar sua beleza no dia a dia, nossas 
            coleções são criadas para brilhar com você.
          </p>
          <button className="shop-button">Explorar Coleção</button>
        </div>
      </div>
    </section>
  );
}

export default About;
