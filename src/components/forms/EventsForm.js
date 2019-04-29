import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

class EventsForm extends Component {
  constructor() {
    super();

    this.state = {
      id: '',
      title: '',
      description: '',
      location: '',
      isEditing: '',
      isEmpty: false,
      isSame: false
    }

  }

  onChange = (e) => {
    document.getElementById('warning-event-empty').style.display = "none";
    document.getElementById('warning-event-same').style.display = "none";

    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
      id: uuid.v4(),
      isEditing: false
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    document.getElementById('warning-event-empty').style.display = "block";
    document.getElementById('warning-event-same').style.display = "block";
    let isOk = true;
    let newState = Object.assign({}, this.state);
    let title_state = JSON.stringify(newState.title.trim());
    let events = (this.props.events !== "") && this.props.events;

    if( (this.state.title === "") || (this.state.description === "") || (this.state.location === "") ) {
      this.setState({
        isEmpty: true
      });
      isOk = false;
      return;
    }

    if(events) {
    events.map(event => {
      let newEvent = Object.assign({}, event);
      let event_title = JSON.stringify(newEvent.title.trim());

      if( title_state.toLowerCase() === event_title.toLowerCase() ) {
      this.setState({
        isSame: true
      });
        isOk = false;
      } else {
        isOk = true;
      }
    });
  }
  if(isOk) {
    this.props.add_event(this.state);
  }
  }

  handleClose = () => {
    this.props.cancel_event();
  }

  render() {

    return (
      <div className="create-form">

      <form className="event-project-form" onSubmit={this.onSubmit.bind(this)}>
        <h3>Create new event</h3>
        <input type="text" placeholder="Title" name="title" onChange={this.onChange.bind(this)}/>
        <textarea placeholder="Description" name="description" onChange={this.onChange.bind(this)}></textarea>
        <input type="text" placeholder="Location" name="location" onChange={this.onChange.bind(this)} />
        <button>Create</button>
        <button className="cancel-btn" onClick={this.handleClose.bind(this)}>Cancel</button>
        <p id="warning-event-empty" className="warnings">{(this.state.isEmpty) ? "Please fill all the fields" : ""}</p>
        <p id="warning-event-same" className="warnings">{(this.state.isSame) ? `${this.state.title} already exists` : ""}</p>
      </form>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add_event: (event) => dispatch({ type: "CREATE_EVENT", payload: event }),
    cancel_event: () => dispatch({ type: "IS_EVENT_CREATING", payload: false })
  }
}

export default connect(null, mapDispatchToProps)(EventsForm);
