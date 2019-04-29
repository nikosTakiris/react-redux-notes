import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {

  return (
    <div className="navigation">
      <ul>
      <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
      <li><NavLink to="/events" activeClassName="active">Events</NavLink></li>
      <li><NavLink to="/projects" activeClassName="active">Projects</NavLink></li>
      </ul>
    </div>
  );
}

export default Navigation;
