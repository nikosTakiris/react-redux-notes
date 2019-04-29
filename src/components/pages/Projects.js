import React, { Component } from 'react';
import EditProject from '../forms/EditProject';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Projects extends Component {
  constructor() {
    super();
  }
  handleDelete = () => {
    this.props.delete_project(this.props.projects.id);
  }

  handleEdit = () => {
    this.props.open_form(this.props.projects.id);
  }

  render() {
    const { id, title, description } = this.props.projects;

    return (
      <div className="event-project">

      { (this.props.projects.isEditing) ? (
        <EditProject project={this.props.projects} allProjects={this.props.allProjects} />
      )
      : (
        <div className="events-projects">
        <Link to={`/project/${this.props.projects.id}`}><h3>{title}</h3></Link>
        <p className="event-project-description">{description}</p>
        <button className="edit-btn" onClick={this.handleEdit}>Edit</button>
        <button className="delete-btn" onClick={this.handleDelete} >Delete</button>
        </div>
      )
    }

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    delete_project: (id) => dispatch({ type: "DELETE_PROJECT", payload: id}),
    open_form: (id) => dispatch({type: "IS_EDITING", payload: id})
  }
}

export default connect(null, mapDispatchToProps)(Projects);
