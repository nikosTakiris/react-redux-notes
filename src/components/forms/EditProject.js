import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.project.id,
      title: this.props.project.title,
      description: this.props.project.description,
      isSame: false
    }
  }

  onChange = (e) => {
    document.getElementById('warning-edit-project').style.display = "none";
    this.setState({
      [e.target.name]: (e.target.value === "") ? e.target.defaultValue : e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    document.getElementById('warning-edit-project').style.display = "block";
    let isOk = true;
    let newState = Object.assign({}, this.state);
    let title_state = JSON.stringify(newState.title.trim());
    let projects_all = (this.props.allProjects !== "") && this.props.allProjects;
    let projects_filter = projects_all.filter(project => project.id !== this.state.id);
    if(projects_filter) {
    projects_filter.some(project => {
      let newProject = Object.assign({}, project);
      let project_title = JSON.stringify(newProject.title.trim());
      if( title_state.toLowerCase() === project_title.toLowerCase() ) {
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
    this.props.edit_project(this.state);
  }
  }

  handleClose = (e) => {
    e.preventDefault();
    this.props.cancel_edit(this.props.project.id);
  }

  render() {
    const {title, description} = this.props.project;
    return (
      <div className="create-form">

      <form className="event-project-form" onSubmit={this.onSubmit}>
        <h3>Edit project</h3>
        <textarea className="edit-title" name="title" onChange={this.onChange} defaultValue={title}></textarea>
        <textarea name="description" onChange={this.onChange} defaultValue={description}></textarea>
        <button>Save changes</button>
        <button className="cancel-btn cancel-btn-edit" onClick={this.handleClose}>Cancel</button>
        <p id="warning-edit-project" className="warnings">{(this.state.isSame) ? `${this.state.title} already exists` : ""}</p>
      </form>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cancel_edit: (id) => dispatch({ type: "IS_EDITING", payload: id }),
    edit_project: (project) => dispatch({ type: "EDIT_PROJECT", payload: project })
  }
}

export default connect(null, mapDispatchToProps)(EditProject);
