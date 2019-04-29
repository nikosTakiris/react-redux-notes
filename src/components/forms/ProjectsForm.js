import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

class ProjectsForm extends Component {
  constructor() {
    super();

    this.state = {
      id: '',
      title: '',
      description: '',
      isCreating: '',
      isEmpty: false,
      isSame: false
    }
  }

  onChange = (e) => {
    document.getElementById('warning-project-empty').style.display = "none";
    document.getElementById('warning-project-same').style.display = "none";
    this.setState({
      ...this.state,
        [e.target.name]: e.target.value,
      id: uuid.v4(),
      isEditing: false
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    document.getElementById('warning-project-empty').style.display = "block";
    document.getElementById('warning-project-same').style.display = "block";
    let isOk = true;
    let newState = Object.assign({}, this.state);
    let title_state = JSON.stringify(newState.title.trim());
    let projects = (this.props.projects !== "") && this.props.projects;
    if( (this.state.title === "") || (this.state.description === "") ) {
      this.setState({
        isEmpty: true
      });

      isOk = false;
      return;
    }

    if(projects) {
    projects.map(project => {
      let newProject = Object.assign({}, project);
      let project_title = JSON.stringify(newProject.title.trim());

      if( title_state.toLowerCase() === project_title.toLowerCase() ) {
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
    this.props.add_project(this.state);
  }
  }

  handleClose = () => {
    this.props.cancel_project();
  }

  render() {

    return (
      <div className="create-form">

      <form className="event-project-form" onSubmit={this.onSubmit.bind(this)}>
        <h3>Create new project</h3>
        <input type="text" placeholder="Title" name="title" onChange={this.onChange.bind(this)}/>
        <textarea placeholder="Description" name="description" onChange={this.onChange.bind(this)}></textarea>
        <button>Create</button>
        <button className="cancel-btn" onClick={this.handleClose.bind(this)}>Cancel</button>
        <p id="warning-project-empty" className="warnings">{(this.state.isEmpty) ? "Please fill all the fields" : ""}</p>
        <p id="warning-project-same" className="warnings">{(this.state.isSame) ? `${this.state.title} already exists` : ""}</p>
      </form>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add_project: (project) => dispatch({ type: "CREATE_PROJECT", payload: project }),
    cancel_project: () => dispatch({ type: "IS_CREATING", payload: false })
  }
}

export default connect(null, mapDispatchToProps)(ProjectsForm);
