import React from "react";
import { Link } from "react-router-dom";

import "./Hero.css";
const Hero = () => {
  return (
    <>
      <div className="hero">
        <div className="hero-text">
          <h1>
            Bienvenido a <span className="colored-text">"ITurnito"</span>
          </h1>
          <h2 className="ligth-text">Gestión de Turnos Simplificada</h2>
          <p>
            Optimiza <span className="colored-text">Tus citas</span> con nuestra
            plataforma intuitiva. Ideal para clínicas, salones de belleza y más.
            Regístrate ahora y mejora tu eficiencia.
          </p>
          <button className="btn">
            <Link to="/agendar">Agendar un turnito <i className="bx bxs-calendar"></i></Link>
          </button>
        </div>

        <div className="hero-img">
          <img src="/medic.svg" alt="hero" />
        </div>
      </div>
      <div className="hero">
        <div className="hero-img">
          <img src="/appIlust.svg" alt="hero" />
        </div>

        <div className="hero-text">
          <h3 className="ligth-text">Beneficios de usar <span className="colored-text">"ITurnito"</span></h3>
          <div className="benefits-list">
          <ul>
            <li><i className='bx bx-check' ></i>"Optimiza tu Tiempo"
            Reduce el tiempo de espera y mejora la eficiencia de tu clínica.</li>
            <li><i className='bx bx-check' ></i>"Aumenta la Satisfacción del Paciente"
            Ofrece una experiencia de cita sin complicaciones con recordatorios automáticos.</li>
            <li><i className='bx bx-check' ></i>"Fácil de Usar"
            Plataforma intuitiva para profesionales de la salud y pacientes.</li>
            <li><i className='bx bx-check' ></i>"Acceso 24/7"
            Administra tus citas desde cualquier dispositivo en cualquier momento.</li>
            <li><i className='bx bx-check' ></i>"Seguridad y Privacidad"
            Mantén la confidencialidad y seguridad de los datos de tus pacientes.</li>
          </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
