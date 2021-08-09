import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import CustomHttpService from '../services/CustomHttpService';
import Api from './Api';

const INITIAL_STATE = {
  posts: [],
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SAVE_POSTS':
      return {...state, posts: action.payload};

    default:
      break;
  }

  return state;
}

const httpService = new CustomHttpService();
const api = new Api(httpService);

const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument(api)),
);
export default store;
