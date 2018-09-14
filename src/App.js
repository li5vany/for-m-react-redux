import React from 'react';
import {connect} from 'react-redux';
import * as types from './types';
import logo from './logo.svg';
import FormReactRedux, {getValueFromFormReactRedux, getUniqueKey} from './FormReactRedux';
import './App.css';

const App = ({formReactRedux, formReactReduxChangeFieldValue, formReactReduxUndo, formReactReduxRedo, formReactReduxReset}) => {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Welcome to Form-React-Redux</h1>
      </header>
      <FormReactRedux formName="form-to-test-values" submit={(values) => {
        let defaultValues = {text: 'This is a text', radio: 'option-2', checkbox: true};
        formReactReduxChangeFieldValue('form-test', values.name, values.value, defaultValues)
      }}>
        <input type="text" name="name" placeholder="Name"/>
        <input type="text" name="value" placeholder="Value"/>
        <input type="submit" className="btn-mini" value="Change"/>
      </FormReactRedux>
      {' '}
      <button className="btn-mini" onClick={() => {
        formReactReduxUndo("form-test")
      }}>Undo
      </button>
      {' '}
      <button className="btn-mini" onClick={() => {
        formReactReduxRedo("form-test")
      }}>Redo
      </button>
      {' '}
      <button className="btn-mini" onClick={() => {
        formReactReduxReset()
      }}>Reset all
      </button>
      {' '}
      <button className="btn-mini" onClick={() => {
        formReactReduxReset("form-test")
      }}>Reset form-test
      </button>
      <FormReactRedux
        className="form"
        formName="form-test"
        defaultValues={{text: 'This is a text', radio: 'option-2', checkbox: true}}
        language={{'This field is required': 'This field is required'}}
        submit={
          (values, e) => {
            console.log(values);
            alert(JSON.stringify(values));
          }}
        onChange={
          (name, values, e) => {
            // console.log(name, values, e)
          }
        }>
        <div className="container">
          Level 1 &nbsp;
          <input name="text" placeholder="Text" required errormessage="Number, most be a number" onChange={(e) => {
          }}/>
          <div className="level">
            <label>
              <input type="radio" name="radio" value="option-1" noerrormessage="true"/>
              &nbsp;Level 2 => Option 1
            </label>&nbsp;&nbsp;&nbsp;
            <label>
              <input type="radio" name="radio" value="option-2" noerrormessage="true"/>
              &nbsp;Level 2 => Option 2
            </label>
            <div className="level">
              Level 3 &nbsp;&nbsp;
              <input type="file" name="file"/>
              <br/>
              <div className="level">
                <input type="checkbox" name="checkbox" noerrormessage="true"/> Level 4
              </div>
              <div className="level">
                <span>Level 6</span> &nbsp;
                <select name="select">
                  <option value="Option-1">Option-1</option>
                  <option value="Option-2">Option-2</option>
                  <option value="Option-3">Option-3</option>
                  <option value="Option-4">Option-4</option>
                  <option value="Option-5">Option-5</option>
                </select>
                <div className="level">
                  <span>Level 7</span> &nbsp;
                  <textarea name="text-area" placeholder="Text Area" cols="15" rows="3"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div><input type="number" name="number" placeholder="Number" className="width" required/></div>
          <div><input type="email" name="email" placeholder="Email" className="width" required/></div>
          <div><input type="password" name="password" placeholder="Password" className="width" required/></div>
          <div><input type="tel" name="telephone" placeholder="(000) 000-0000" className="width"/></div>
          <div><input type="url" name="url" placeholder="http://www.example.com/" className="width"/></div>
          <div><input type="search" name="search" placeholder="Search" className="width"/></div>
          <div><input type="range" name="range" placeholder="Range" className="width"/></div>
          <div><input type="color" name="color" placeholder="Color" className="width"/></div>
        </div>
        <div className="container">
          <div><input type="datetime" name="datetime" placeholder="Datetime" className="width"/></div>
          <div><input type="datetime-local" name="datetime-local" placeholder="Datetime Local" className="width"/></div>
          <div><input type="date" name="date" placeholder="Date" className="width"/></div>
          <div><input type="month" name="month" placeholder="Month" className="width"/></div>
          <div><input type="week" name="week" placeholder="Week" className="width"/></div>
          <div><input type="time" name="time" placeholder="Time" className="width"/></div>
          <input type="text" name="data-list" placeholder="Data List" list="data-list"/>
          <datalist id="data-list">
            <option>Accra, Ghana</option>
            <option>Paris, France</option>
            <option>Melbourne, Australia</option>
            <option>Lima, Peru</option>
            <option>Los Angeles, United Sates</option>
            <option>Kuala Lumpur, Malaysia</option>
          </datalist>
        </div>
        {formReactRedux && formReactRedux['form-test'] && <div className="container">
          {(() => {
            let values = formReactRedux['form-test'].values, array = [], errors = formReactRedux['form-test'].errors, validation = formReactRedux['form-test'].validation;
            for (let i in values) {
              array.push(
                <span key={getUniqueKey()}>
                  {i.toUpperCase()} <br/>&nbsp;&nbsp;Value: {values[i]}<br/>
                  {validation && validation[i] && validation[i].required ? <span>&nbsp;&nbsp;Required: {validation[i].required.toString()}<br/></span> : ''}
                  {validation && validation[i] && validation[i].pattern ? <span>&nbsp;&nbsp;Pattern: {validation[i].pattern.toString()}<br/></span> : ''}
                  {validation && validation[i] && validation[i].regex ? <span>&nbsp;&nbsp;Regex: {validation[i].regex.toString()}<br/></span> : ''}
                  {errors && errors[i] ? <span>&nbsp;&nbsp;ErrorMessage: {errors[i]}<br/></span> : ''}<br/>
                </span>
              );
            }
            return array;
          })()}
        </div>}
        <div className="submit-container">
          <input type="submit" value={"Submit " + (getValueFromFormReactRedux('form-test', formReactRedux, 'isValid', 'boolean', false) ? 'Enabled' : "Disabled")} disabled={!(getValueFromFormReactRedux('form-test', formReactRedux, 'isValid', 'boolean', false))}/>
          {' '}
          <input type="submit" value="Submit"/>
        </div>
      </FormReactRedux>
    </div>
  );
};


const mapStateToProps = store => {
  return {
    formReactRedux: store.formReactRedux
  };
};

const mapDispatchProps = dispatch => {
  return {
    formReactReduxReset: (formName) => {
      dispatch({type: types.FORM_REACT_REDUX_RESET, formName})
    },
    formReactReduxChangeFieldValue: (formName, fieldName, fieldValue, defaultValues) => {
      dispatch({type: types.FORM_REACT_REDUX_CHANGE_VALUE, data: {formName, fieldName, fieldValue, defaultValues}})
    },
    formReactReduxUndo: (formName) => {
      dispatch({type: types.FORM_REACT_REDUX_UNDO, formName})
    },
    formReactReduxRedo: (formName) => {
      dispatch({type: types.FORM_REACT_REDUX_REDO, formName})
    }
  }
};

export default connect(mapStateToProps, mapDispatchProps)(App);
