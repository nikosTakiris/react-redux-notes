import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/pages/Home';
import EventsList from './components/pages/EventsList';
import Event from './components/pages/Event';
import Project from './components/pages/Project';
import ProjectsList from './components/pages/ProjectsList';
import Sidebar from './components/sidebar/Sidebar';
import './App.scss';

class App extends Component {
  render() {
    return (

      <HashRouter>
      <Header />
      <div className="App">
      <Sidebar />

          <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/events" component={EventsList}></Route>
          <Route path="/projects" component={ProjectsList}></Route>
          <Route path="/event/:id" component={Event}></Route>
          <Route path="/project/:id" component={Project}></Route>
          </Switch>

      </div>
      </HashRouter>

    );
  }
}

export default App;
