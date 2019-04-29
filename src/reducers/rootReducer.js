import eventsReducer from './eventsReducer';
import projectsReducer from './projectsReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  eventsReducer: eventsReducer,
  projectsReducer: projectsReducer
});

export default rootReducer;
