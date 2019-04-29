import React, { Component } from 'react';
import { connect } from 'react-redux';

class Notifications extends Component {
  render() {

    return (
      <div className="notifications">
      <div className="notifications-title">
      <p>Notifications</p>
      </div>

      <div className="notifications-content">
        {( (this.props.events.length === 0 ) && (this.props.projects.length === 0) ? <p className="notification-no-activity">No activity yet</p> : "" )}


        { (this.props.events.length !== 0) ? <p className="notification-item">Events <span className="notification-item-number">{this.props.events.length}</span></p> : ""}
        { (this.props.projects.length !== 0) ?  <p className="notification-item">Projects <span className="notification-item-number">{this.props.projects.length}</span></p> : "" }

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

export default connect(mapStateToProps)(Notifications);
