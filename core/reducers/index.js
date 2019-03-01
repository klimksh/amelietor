import { combineReducers } from 'redux'
import { sessionReducer } from 'redux-react-session';
import recs from './recs'
import annotationsByKey from './annotations'
import content from './content'
import amelietorReducer from './amelietorReducer'

const amelietor = combineReducers({
  recs,
  session: sessionReducer,
  annotationsByKey,
  content,
  amelietorReducer
});

export default amelietor
