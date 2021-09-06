import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import CustomHttpService from '../services/CustomHttpService';
import Api from './Api';
import reducer from './reducer';

const httpService = new CustomHttpService();
const api = new Api(httpService);

const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument(api)),
);
export default store;
