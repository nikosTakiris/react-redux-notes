import React, { Component } from 'react';
import Projects from './Projects';
import ProjectsForm from '../forms/ProjectsForm';
import { connect } from 'react-redux';

class ProjectsList extends Component {

  handleCreate = () => {
    this.props.create_form();
  }

  render() {
  return (
    <div className="main cart">
    <div className="event-project-title">

    <div className="title-left">
      <p>My projects</p>
    </div>

    <div className="title-right">
    <button className={ (this.props.isCreating) ? "close-btn" : "create-btn" } onClick={this.handleCreate.bind(this)}>{ (this.props.isCreating) ? "Close" : "Create project" }</button>
    </div>

    </div>

      <div className="event-project-content">
      { (this.props.isCreating) ? <ProjectsForm projects={(this.props.projects.length === 0) ? "" : this.props.projects} />
        : (this.props.projects.length === 0) ? <p className="event-project-no-activity">You have no projects yet.</p>
        : this.props.projects.map(project => (
          <Projects key={project.id} projects={project} isCreating={this.props.isCreating} allProjects={this.props.projects} />
        ))}
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    "projects": state.projectsReducer.projects,
    "isCreating": state.projectsReducer.isCreating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    create_form: () => { dispatch({
      type: "IS_CREATING",
      payload: true
    }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
