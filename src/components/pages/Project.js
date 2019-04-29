import React, { Component } from 'react';
import EditProject from '../forms/EditProject';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Project extends Component {

  constructor(props) {
    super(props);
  }

  handleEdit = () => {
    this.props.open_form(this.props.current_project.id);
  }

  handleDelete = () => {
    this.props.delete_project(this.props.current_project.id);
    this.props.history.push('/');
  }

  render() {

  return (
    <div className="current-event-project">
    {(!this.props.current_project) ?
    (
      <p className="not-found">Page not found</p>
    )

    :
    (this.props.current_project.isEditing) ?
    <EditProject project={this.props.current_project} allProjects={this.props.all_projects} />

    : (
      <div>
      <h3 className="current-event-project-title">{this.props.current_project.title}</h3>
      <p className="event-project-description">{this.props.current_project.description}</p>
      <button className="edit-btn" onClick={this.handleEdit}>Edit</button>
      <button className="delete-btn" onClick={this.handleDelete} >Delete</button>

      <div className="home-current-item back-to">
      <Link to={`/projects`}><p>Back to projects</p></Link>
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
    "current_project": state.projectsReducer.projects.find(project => project.id === id),
    "all_projects": state.projectsReducer.projects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    delete_project: (id) => dispatch({ type: "DELETE_PROJECT", payload: id}),
    open_form: (id) => dispatch({type: "IS_EDITING", payload: id})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Project);
