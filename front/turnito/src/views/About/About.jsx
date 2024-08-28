import React from "react";
import "./About.css";
import profilePic from "../../../public/profile.jpg";

const About = () => {
  return (
    <div className="about-container">
      <div className="profile-section">
        <img
          src={profilePic}
          alt="Maximiliano Iván Frias"
          className="profile-pic"
        />
        <h1>Hola, soy Maximiliano Iván Frias</h1>
      </div>
      <div className="info-section">
        <p>
          Soy un apasionado desarrollador en formación con un fuerte interés en
          la tecnología y la programación. A mis 22 años, estoy dedicado a
          perfeccionar mis habilidades en desarrollo Full Stack, combinando
          estudios en el bootcamp de Henry y la carrera de Programador
          Universitario en la Facultad de Ciencias Exactas y Tecnología de
          Tucumán (FACET).
        </p>
        <h2>Formación y Habilidades</h2>
        <ul>
          <li>🟡 Frontend: HTML, CSS, JavaScript, React, Redux, Typescript</li>
          <li>🟡 Backend: Node.js, Express, PostgreSQL</li>
          <li>🟡 Herramientas: Git, GitHub, REST APIs, Metodologías Ágiles</li>
        </ul>
        <p>
          En FACET, complemento esta formación con una base teórica en ciencias
          de la computación y desarrollo de software.
        </p>
        <h2>Proyectos</h2>
        <ul>
          <li>
            🟡 Sistema de Gestión de Turnos: Aplicación web usando React y
            Node.js para gestionar citas.
          </li>
          <li>
            🟡 Página de Recomendación de Juegos Free-to-Play: Página web
            dinámica que recomienda juegos, incluyendo un "juego del día" y
            funcionalidades interactivas.
          </li>
        </ul>
        <h2>Pasión y Objetivos</h2>
        <p>
          Soy proactivo y orientado a resolver problemas, siempre buscando
          aprender y crecer. Me apasiona la naturaleza, el mate, los animales y
          disfrutar de buenas conversaciones, lo que me ayuda a mantener un
          equilibrio saludable entre la vida personal y profesional.
        </p>
        <p>
          Estoy ansioso por comenzar mi carrera profesional en desarrollo de
          software y contribuir a proyectos desafiantes e innovadores. Estoy
          abierto a oportunidades que me permitan seguir aprendiendo y aplicar
          mis conocimientos en un entorno real y dinámico.
        </p>
        <p>
          ¡Conectemos! Estoy dispuesto a colaborar y aprender junto a otros
          profesionales apasionados por la tecnología.👨‍💻
        </p>
      </div>
    </div>
  );
};

export default About;
