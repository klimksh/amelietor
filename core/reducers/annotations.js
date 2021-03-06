import {REQUEST_ANNOTATIONS, RECEIVE_ANNOTATIONS, INVALIDATE_ANNOTATION, RECEIVE_ANNOTATIONS_FAILED} from '../actions/actions';
const initialState = {
  key:null,
  isFetching: false,
  isInvalid: false,
  items: []
};
const annotations = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_ANNOTATIONS:
      return Object.assign({}, state, {
        key: action.key,
        isFetching:true,
        isError: false,
        isInvalid: false,
      });
    case RECEIVE_ANNOTATIONS:
      return Object.assign({}, state, {
        key: action.key,
        isFetching: false,
        isInvalid: false,
        isError: false,
        errorMessage:"",
        items: action.annotations,
        lastUpdated: action.receivedAt
      });
    case RECEIVE_ANNOTATIONS_FAILED:
      return Object.assign({}, state, {
        key: action.key,
        isFetching: false,
        isInvalid: false,
        isError: true,
        errorMessage:action.errorMessage,
        items: action.annotations,
        lastUpdated: action.receivedAt
      });
    case INVALIDATE_ANNOTATION:
      return Object.assign({}, state, {
        key: action.key,
        isInvalid: true,
        lastUpdated: action.receivedAt
      });

    default:
        return state
  }
};

function annotationsByKey(state = { }, action) {
  switch (action.type) {
    case RECEIVE_ANNOTATIONS:
    case INVALIDATE_ANNOTATION:
    case RECEIVE_ANNOTATIONS_FAILED:
    case REQUEST_ANNOTATIONS:
      return Object.assign({}, state, {
        [action.key]: annotations(state[action.key], action)
      });
    default:
      return state
  }
}

export default annotationsByKey
