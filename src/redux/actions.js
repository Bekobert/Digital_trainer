import * as $ from './actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      const rawSeenQuestionIds = await AsyncStorage.getItem(
        'SEEN_QUESTION_IDS',
      );
      const seenQuestionIds = JSON.parse(rawSeenQuestionIds || '[]');
      console.log('🪲 - seenQuestionIds', seenQuestionIds);

      const {question, subjects, variables, answers} =
        await api.getRandomQuestion(seenQuestionIds);

      seenQuestionIds.push(question._id);
      await AsyncStorage.setItem(
        'SEEN_QUESTION_IDS',
        JSON.stringify(seenQuestionIds),
      );

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
      dispatch(setQuestion(null));
      dispatch(setSubjects([]));
      dispatch(setInformation([]));
      dispatch(setConstraints([]));
      dispatch(setAnswers([]));
    }

    dispatch(setQuestionLoadingFlag(false));
  };
}
