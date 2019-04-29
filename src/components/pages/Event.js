import React, { Component } from 'react';
import EditEvent from '../forms/EditEvent';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Event extends Component {

  constructor(props) {
    super(props);
  }


  handleEdit = () => {
    this.props.open_event_form(this.props.current_event.id);
  }

  handleDelete = () => {
    this.props.delete_event(this.props.current_event.id);
    this.props.history.push('/');
  }

  render() {

  return (
    <div className="current-event-project">
    {(!this.props.current_event) ?
    (
      <p>Page not found</p>
    )

    :
    (this.props.current_event.isEditing) ?
    <EditEvent event={this.props.current_event} allEvents={this.props.all_events} />

    : (
      <div>
      <h3 className="current-event-project-title">{this.props.current_event.title}</h3>
      <p className="event-project-description">{this.props.current_event.description}</p>
      <p className="event-project-description location">{this.props.current_event.location}</p>
      <button className="edit-btn" onClick={this.handleEdit}>Edit</button>
      <button className="delete-btn" onClick={this.handleDelete} >Delete</button>

      <div className="home-current-item back-to">
      <Link to={`/events`}><p>Back to events</p></Link>
      </div>

      </div>
    )

  }
    </div>
  );
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  return {
    "current_event": state.eventsReducer.events.find(event => event.id === id),
    "all_events": state.eventsReducer.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    delete_event: (id) => dispatch({ type: "DELETE_EVENT", payload: id }),
    open_event_form: (id) => dispatch({type: "IS_EDITING_EVENT",payload: id })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Event);
