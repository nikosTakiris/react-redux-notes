const initialState = {
  projects: [],
  isCreating: false
}

const projectsReducer = (state = initialState, action) => {

  switch (action.type) {
    case "IS_CREATING":
    return {
      ...state,
      isCreating: !state.isCreating
    }
      break;

    case "CREATE_PROJECT":
    return {
      ...state,
      projects: state.projects.concat(action.payload),
      isCreating: !state.isCreating
    }
    break;

    case "DELETE_PROJECT":
    let newProjects = state.projects.filter(project => project.id !== action.payload);
    return {
      ...state,
      projects: newProjects
    }
    break;

    case "IS_EDITING":
    return {
      ...state,
      projects: state.projects.map(project => {
        if(project.id === action.payload) {
          return (
            Object.assign( {}, project, {
              isEditing: !project.isEditing
            })
          )
        } else {
          return project;
        }
      })
    }
    break;

    case "EDIT_PROJECT":
    return {
      ...state,
      projects: state.projects.map(project => {
        if(project.id === action.payload.id) {
          return (
            Object.assign( {}, project, {
              id: action.payload.id,
              title: action.payload.title,
              description: action.payload.description,
              isEditing: !project.isEditing
            })
          )
        } else {
          return project;
        }
      })
    }
    break;
  }

  return state;
}

export default projectsReducer;
