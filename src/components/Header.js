import React from 'react';
import '../styles/Header.css';
import logo from '../img/pepe-logo.jpg';

function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">Meme Generator</h1>
      </div>
    </header>
  );
}

export default Header;
