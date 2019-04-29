import React, { Component } from 'react';
import Events from './Events';
import EventsForm from '../forms/EventsForm';
import { connect } from 'react-redux';

class EventsList extends Component {
  handleCreate = () => {
    this.props.create_form();
  }


  render() {

  return (
    <div className="main reviews">
    <div className="event-project-title">

    <div className="title-left">
      <p>My Events</p>
    </div>

    <div className="title-right">
    <button className={ (this.props.isEventCreating ? "close-btn" : "create-btn") } onClick={this.handleCreate.bind(this)}>{ (this.props.isEventCreating) ? "Close" : "Create event" }</button>
    </div>

    </div>
    <div className='event-project-content'>

    { (this.props.isEventCreating) ? <EventsForm events={(this.props.events.length === 0) ? "" : this.props.events} />
    : (this.props.events.length === 0) ? <p className="event-project-no-activity">You have no events yet.</p>
    : this.props.events.map(event => (
      <Events key={event.id} events={event} allEvents={this.props.events} />
    ))}



      </div>

    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    "events": state.eventsReducer.events,
    "isEventCreating": state.eventsReducer.isEventCreating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    create_form: () => {dispatch({
      type: "IS_EVENT_CREATING",
      payload: true
    })}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
