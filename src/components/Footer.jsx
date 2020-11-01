import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Footer.scss';

const Footer = () => (
  <footer className='footer'>
    <Link to='/terms'>Terminos de uso</Link>
    <Link to='/privacity'>Declaración de privacidad</Link>
    <Link to='/help'>Centro de ayuda</Link>
  </footer>
);

export default Footer;
