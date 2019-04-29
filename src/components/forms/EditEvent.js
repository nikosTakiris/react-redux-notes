import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.event.id,
      title: this.props.event.title,
      description: this.props.event.description,
      location: this.props.event.location,
      isSame: false
    }
  }

  onChange = (e) => {
    document.getElementById('warning-edit-event').style.display = "none";
      this.setState({
        [e.target.name]: (e.target.value === "") ? e.target.defaultValue : e.target.value
      });
    }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.props.allEvents);
    document.getElementById('warning-edit-event').style.display = "block";
    let isOk = true;
    let newState = Object.assign({}, this.state);
    let title_state = JSON.stringify(newState.title.trim());
    let events_all = (this.props.allEvents !== "") && this.props.allEvents;
    let events_filter = events_all.filter(event => event.id !== this.state.id);
    if(events_filter) {
    events_filter.some(event => {
      let newEvent = Object.assign({}, event);
      let event_title = JSON.stringify(newEvent.title.trim());
      if( title_state.toLowerCase() === event_title.toLowerCase() ) {
        isOk = false;
        this.setState({
          isSame: true
        });
      }
    });
    if(!isOk) {
      return;
    }
  }

  if(isOk) {
    this.props.edit_event(this.state);
  }
  }

  handleClose = (e) => {
    e.preventDefault();
    this.props.cancel_event(this.props.event.id);
  }

  render() {

    const {title, description, location} = this.props.event;
    return (

      <div className="create-form edit-form">

      <form className="event-project-form" onSubmit={this.onSubmit}>
        <h3>Edit event</h3>
        <textarea className="edit-title" name="title" ref="title" onChange={this.onChange.bind(this)} defaultValue={title}></textarea>
        <textarea name="description" ref="description" onChange={this.onChange.bind(this)} defaultValue={description}></textarea>
        <textarea className="edit-location" ref="location" name="location" onChange={this.onChange.bind(this)} defaultValue={location}></textarea>
        <button>Save changes</button>
        <button className="cancel-btn cancel-btn-edit" onClick={this.handleClose}>Cancel</button>
        <p id="warning-edit-event" className="warnings">{(this.state.isSame) ? `${this.state.title} already exists` : ""}</p>
      </form>

      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cancel_event: (id) => dispatch({ type: "IS_EDITING_EVENT", payload: id }),
    edit_event: (event) => dispatch({ type: "EDIT_EVENT", payload: event })
  }
}

export default connect(null, mapDispatchToProps)(EditEvent);
