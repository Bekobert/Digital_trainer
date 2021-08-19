import {useDispatch} from 'react-redux';

import * as $ from '../../redux/actions';

export default function useRedux() {
  const dispatch = useDispatch();

  const dispatchAction = action => {
    dispatch(action);
  };

  return {dispatchAction, $};
}
