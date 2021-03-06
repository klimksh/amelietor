import {SELECT_REC,
  CLEAR_REC,
  RECEIVE_REC_META,
  REQUEST_REC_META,
  REQUEST_ALTERNATIVES,
  RECEIVE_ALTERNATIVES,
  REQUEST_SOFTWARE,
  RECEIVE_SOFTWARE,
  REQUEST_SOFTWARE_SOLUTION_DELETION,
  REQUEST_ALTERNATIVE_DELETION,
  REMOVE_REC
} from '../actions/actions';

const recs = (state = {
  token: null,
  info:{isFetching: false, didInvalidate: false, lastUpdated:null},
  alternatives: {isFetching: false, didInvalidate: false, lastUpdated:null},
  software: {isFetching: false, didInvalidate: false, lastUpdated:null},
  tokenData: {}
}, action) => {
  switch (action.type) {
    case SELECT_REC:
      return Object.assign({}, state, {
        token: action.tokenData.token,
        tokenData: action.tokenData
      });
    case CLEAR_REC:
      return Object.assign({}, state, {
        token: null,
        tokenData: {}
      });
    case REMOVE_REC:
      return Object.assign({}, state, {
        token: action.tokenData.token,
        tokenData: action.tokenData
      });
    case REQUEST_SOFTWARE_SOLUTION_DELETION:
      return Object.assign({}, state, {
        href: action.href,
        tokenData: action.token
      });
    case REQUEST_ALTERNATIVE_DELETION:
      return Object.assign({}, state, {
        href: action.href,
        tokenData: action.token
      });
    case REQUEST_REC_META:
      return Object.assign({}, state, {
        href: action.href,
        info:{
          isFetching:true
        }
      });
    case RECEIVE_REC_META:
      return Object.assign({}, state, {
        href: action.href,
        info: {
          isFetching: false,
          didInvalidate: false,
          data:action.info,
          lastUpdated: action.receivedAt
        }
      });
    case REQUEST_ALTERNATIVES:
      return Object.assign({}, state, {
        href: action.href,
        alternatives:{
          isFetching:true
        }
      });
    case RECEIVE_ALTERNATIVES:
      return Object.assign({}, state, {
        href: action.href,
        alternatives: {
          isFetching: false,
          didInvalidate: false,
          data:action.alternatives,
          lastUpdated: action.receivedAt
        }
      });
    case REQUEST_SOFTWARE:
      return Object.assign({}, state, {
        href: action.href,
        software:{
          isFetching:true
        }
      });
    case RECEIVE_SOFTWARE:
      return Object.assign({}, state, {
        href: action.href,
        software: {
          isFetching: false,
          didInvalidate: false,
          data:action.software,
          lastUpdated: action.receivedAt
        }
      });
    default:
      return state
  }
};

export default recs
