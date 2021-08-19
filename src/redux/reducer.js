import * as $ from './actionTypes';

const INITIAL_STATE = {
  questionLoading: true,

  question: null,
  subjects: [],
  information: [],
  constraints: [],
  answers: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case $.SET_QUESTION_LOADING_FLAG:
      return {...state, questionLoading: action.payload};

    case $.SET_QUESTION:
      return {...state, question: action.payload};
    case $.SET_SUBJECTS:
      return {...state, subjects: action.payload};
    case $.SET_INFORMATION:
      return {...state, information: action.payload};
    case $.SET_CONSTRAINTS:
      return {...state, constraints: action.payload};
    case $.SET_ANSWERS:
      return {...state, answers: action.payload};

    default:
      break;
  }

  return state;
}
