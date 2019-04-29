import uuid from 'uuid';

const initialState = {
  events: [],
  isEventCreating: false
}

const eventsReducer = (state = initialState, action) => {

  switch (action.type) {
    case "IS_EVENT_CREATING":
    return {
      ...state,
      isEventCreating: !state.isEventCreating
    }
      break;
  case "CREATE_EVENT":
  return {
    ...state,
    events: state.events.concat(action.payload),
    isEventCreating: !state.isEventCreating
  }
  break;

  case "DELETE_EVENT":
  let newEvents = state.events.filter(event => event.id !== action.payload);

  return {
    ...state,
    events: newEvents
  }
  break;

  case "IS_EDITING_EVENT":
  return {
    ...state,
    events: state.events.map(event => {
      if(event.id === action.payload) {
        return (
          Object.assign( {}, event, {
            isEditing: !event.isEditing
          })
        )
      } else {
        return event;
      }
    })
  }
  break;

  case "EDIT_EVENT":
  return {
    ...state,
    events: state.events.map(event => {
      if(event.id === action.payload.id) {
        return (
          Object.assign( {}, event, {
            id: action.payload.id,
            title: action.payload.title,
            description: action.payload.description,
            location: action.payload.location,
            isEditing: !event.isEditing
          })
        )
      } else {
        return event;
      }
    })
  }
  break;
  }

  return state;
}


export default eventsReducer;
