import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {

  handleProduct = (e) => {
    let id = e.target.id;
  }

  render() {
    return (
      <div className="main home">

      <div className="event-project-content without">
      { ( (this.props.events.length === 0) && (this.props.projects.length === 0) ) ? <p className="home-title-secondary">Create events and projects</p> : "" }


      { ( (this.props.events.length === 0) && (this.props.projects.length === 0) ) ? <div className="home-event-project-title"><p className="home-event-project-no-activity">There is no activity yet</p></div> : ""}


      {(this.props.events.length === 0) ? "" : <div className="home-e-p-title"><h2>Events</h2></div>}

      {(this.props.events.length === 0) ? "" : this.props.events.slice(0, 3).map(event => (
        <div key={event.id} className="home-current-item back-to">
          <Link to={`event/${event.id}`}><p>{event.title}</p></Link>
        </div>
      ))}

      {(this.props.projects.length === 0) ? "" : <div className="home-e-p-title"><h2>Projects</h2></div>}

      {(this.props.projects.length === 0) ? "" : this.props.projects.slice(0, 3).map(project => (
        <div key={project.id} className="home-current-item back-to">
          <Link to={`project/${project.id}`}><p>{project.title}</p></Link>
          </div>
      ))}



      </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    "events": state.eventsReducer.events,
    "projects": state.projectsReducer.projects
  }
}


export default connect(mapStateToProps)(Home);
