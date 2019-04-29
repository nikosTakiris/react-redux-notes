import React, { Component } from 'react';
import EditEvent from '../forms/EditEvent';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

class Events extends Component {

  handleEdit = () => {
    this.props.open_event_form(this.props.events.id);
  }

  handleDelete = () => {
    this.props.delete_event(this.props.events.id);
  }

  render() {
    const { id, title, description, location } = this.props.events;

  return (
    <div className="event-project">
      { (this.props.events.isEditing) ? (
      <EditEvent event={this.props.events} allEvents={this.props.allEvents} />
      )
      : (
      <div className="events-projects">
      <Link to={`/event/${this.props.events.id}`}><h3>{title}</h3></Link>
      <p className="event-project-description">{description}</p>
      <p className="event-project-description location">{location}</p>
      <button className="edit-btn" onClick={this.handleEdit}>Edit</button>
      <button className="delete-btn" onClick={this.handleDelete.bind(this)} >Delete</button>
      </div>
      )
    }

    </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    delete_event: (id) => dispatch({ type: "DELETE_EVENT", payload: id }),
    open_event_form: (id) => dispatch({type: "IS_EDITING_EVENT",payload: id })
  }
}

export default connect(null, mapDispatchToProps)(Events);
