import {combineReducers} from 'redux';
import {getValueFromFormReactRedux} from '../FormReactRedux';
import * as types from '../types';

export const reducers = {
  formReactRedux: (state = {}, action) => {
    switch (action.type) {
      case types.FORM_REACT_REDUX_RESET:
        let tmp = {};
        if (action.formName && state[action.formName]) {
          for (let i in state) {
           if (i !== action.formName) {
             tmp[i] = {...state[i]};
           }
          }
        }
        return tmp;
      case types.FORM_REACT_REDUX_CHANGE:
        return action.data || state;
      case types.FORM_REACT_REDUX_CHANGE_VALUE:
        let formName = action.data.formName, name = action.data.fieldName, value = action.data.fieldValue, defaultValues = action.data.defaultValues;
        if (formName && name) {
          let lastValues = state[formName] && state[formName].lastValues ? {...state[formName].lastValues} : {},
            values = state[formName] && state[formName].values ? {...state[formName].values} : {};
          if (defaultValues) {
            for (let i in defaultValues) {
              if (defaultValues[i] && typeof values[i] === 'undefined') {
                values[i] = defaultValues[i];
              }
            }
          }
          if (typeof value === 'string') {
            if (value === 'true') {
              value = true;
            } else if (value === 'false') {
              value = false;
            } else if (/^-?\d*(\.\d+)?$/.test(value)) {
              value = parseFloat(value);
            } else if (/^-?\d+$/.test(value)) {
              value = parseInt(value, 10);
            }
          }
          lastValues[name] = values[name];
          values[name] = value;
          let tmp = {};
          tmp[action.data.formName] = {values: {...values}, lastValues: {...lastValues}};
          return {...state, ...tmp}
        }
        return state;
      case types.FORM_REACT_REDUX_UNDO:
        if (action.formName) {
          let historyIndex = getValueFromFormReactRedux(action.formName, state, 'historyIndex', 'number', 0),
            history = getValueFromFormReactRedux(action.formName, state, 'history', 'array', []);
          if (historyIndex && history && history.length && historyIndex - 1 >= 0 && history[historyIndex - 1]) {

            const getHistoryValue = (value) => {
              return history[historyIndex - 1][value];
            };

            return {...state, ...getTmpValues(action.formName, getHistoryValue, history)};
          }
        }
        return state;
      case types.FORM_REACT_REDUX_REDO:
        if (action.formName) {
          let historyIndex = getValueFromFormReactRedux(action.formName, state, 'historyIndex', 'number', 0),
            history = getValueFromFormReactRedux(action.formName, state, 'history', 'array', []);
          if (history && history.length && historyIndex + 1 < history.length && history[historyIndex + 1]) {

            const getHistoryValue = (value) => {
              return history[historyIndex + 1][value];
            };

            return {...state, ...getTmpValues(action.formName, getHistoryValue, history)};
          }
        }
        return state;
      default:
        return state
    }
  },
  showData: (state = false, action) => {
    switch (action.type) {
      case types.SHOW_DATA:
        return true;
      case types.HIDE_DATA:
        return false;
      case types.TOGGLE_DATA:
        return !state;
      default:
        return false
    }
  }
};

const getTmpValues = (formName, getHistoryValue, history) => {

  let tmp = {};

  tmp[formName] = {
    validation: {...getHistoryValue('validation')},
    lastValues: {...getHistoryValue('lastValues')},
    values: {...getHistoryValue('values')},
    errors: {...getHistoryValue('errors')},
    blurs: {...getHistoryValue('blurs')},
    selectionStart: getHistoryValue('selectionStart'),
    selectionEnd: getHistoryValue('selectionEnd'),
    historyIndex: getHistoryValue('historyIndex'),
    history,
    isValid: getHistoryValue('isValid'),
    isActive: getHistoryValue('isActive'),
    focus: getHistoryValue('focus')
  };

  return tmp;
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
