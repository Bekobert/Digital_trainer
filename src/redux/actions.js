import * as $ from './actionTypes';

export function setQuestionLoadingFlag(flagValue) {
  return {type: $.SET_QUESTION_LOADING_FLAG, payload: flagValue};
}

export function setQuestion(question) {
  return {type: $.SET_QUESTION, payload: question};
}
export function setSubjects(subjects) {
  return {type: $.SET_SUBJECTS, payload: subjects};
}
export function setInformation(information) {
  return {type: $.SET_INFORMATION, payload: information};
}
export function setConstraints(constraints) {
  return {type: $.SET_CONSTRAINTS, payload: constraints};
}
export function setAnswers(answers) {
  return {type: $.SET_ANSWERS, payload: answers};
}

export function getRandomQuestion() {
  return async (dispatch, getState, api) => {
    try {
      const {question, subjects, variables, answers} =
        await api.getRandomQuestion();

      dispatch(setQuestion(question));
      dispatch(setSubjects(subjects));
      dispatch(
        setInformation(
          variables.filter(variable => variable.type === 'Information'),
        ),
      );
      dispatch(
        setConstraints(
          variables.filter(variable => variable.type === 'Constraint'),
        ),
      );
      dispatch(setAnswers(answers));
    } catch (error) {
      console.log(error);
    }

    dispatch(setQuestionLoadingFlag(false));
  };
}
