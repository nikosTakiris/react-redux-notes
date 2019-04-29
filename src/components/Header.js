import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

const Header = () => {
  return (
    <div className="header">
    <div className="header-inside">
    <div className="logo">
    <Link to="/"><h1>Notes</h1></Link>
    </div>
    <Navigation />
    </div>
    </div>
  );
}

export default Header;
