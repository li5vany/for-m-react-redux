import React from 'react';
import {connect} from 'react-redux';
import * as types from './types';
import logo from './logo.svg';
import FormReactRedux from './FormReactRedux';
import './App.css';

const App = ({formReactReduxChangeFieldValue, formReactReduxUndo, formReactReduxRedo, formReactReduxReset}) => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo"/>
      <h1 className="App-title">Welcome to for-m-react-redux</h1>
    </header>

    <h3>Simple Form</h3>
    <FormReactRedux
      formName="simple-form"
      defaultValues={{name: 'Ease way to build...'}}
      submit={(values, e) => {
        console.log('values: ', values);
        // values: {name: 'Ease way to build...'}
      }}
    >
      <input name="name" placeholder="Ease way to build..." required/>
      <input type="submit" value="Submit"/>
    </FormReactRedux>

    <h3>Default validation messages</h3>
    <FormReactRedux formName="default-validation-messages">
      <input name="required" placeholder="Required" required/>
      {/* display red message */}
      {/* This field is required */}
      <input type="number" name="number" placeholder="Number"/>
      {/* This field most be number */}
      <input type="email" name="email" placeholder="Email"/>
      {/* This field most be email */}
      <input type="submit" value="Submit"/>
    </FormReactRedux>

    <h3>Define validation messages</h3>
    <h5>define new validation messages</h5>
    <FormReactRedux
      formName="define-validation-messages"
      errorMessages={{"This is required": "Este campo es obligatorio"}}
    >
      <input name="required" placeholder="Required" required/>
      {/* Este campo es obligatorio */}
      <input type="submit" value="Submit"/>
    </FormReactRedux>

    <h5>define one validation message</h5>
    <FormReactRedux formName="define-one-validation-message">
      <input name="name" placeholder="Required" required errorMessage="Required"/>
      {/* Required */}
      <input type="submit" value="Submit"/>
    </FormReactRedux>

    <h3>Default input type validation</h3>
    <FormReactRedux formName="default-input-type-validation">
      <input type="email" name="email" placeholder="Email"/>
      {/* This field most be email */}
      <input type="number" name="number" placeholder="Number"/>
      {/* This field most be number */}
      <input type="url" name="url" placeholder="Url"/>
      {/* This field most be url */}
      <input type="submit" value="Submit"/>
    </FormReactRedux>

    <h3>Specify validation</h3>
    <FormReactRedux formName="specify-validation">
      <input name="required" placeholder="Required" required/>
      {/* This field is required */}
      <input name="alphanumeric" placeholder="Alphanumeric" alphanumeric/>
      {/* This field is alphanumeric */}
      <input name="word" placeholder="Only Words" word/>
      {/* This field is word */}
      <input name="number" placeholder="Number" number/>
      {/* This field is number */}
      <input name="naturalNumber" placeholder="Natural number" naturalNumber/>
      {/* This field is natural number */}
      <input name="integer" placeholder="Integer" integer/>
      {/* This field is integer */}
      <input name="decimal" placeholder="Decimal" decimal/>
      {/* This field is decimal */}
      <input name="email" placeholder="Email" email/>
      {/* This field is email */}
      <input name="url" placeholder="Url" url/>
      {/* This field is url */}
      <input type="submit" value="Submit"/>
    </FormReactRedux>

    <h3>Function Validation</h3>
    <FormReactRedux formName="function-validation">
      <input name="more-then" placeholder="More then 2 characters" required validation={(value, values) => value.toString().length > 2} errorMessage="This field required more then 2 characters"/>
      <input type="submit" value="Submit"/>
    </FormReactRedux>

    <h3>Boolean Validation</h3>
    <FormReactRedux formName="boolean-validation">
      <input name="always-invalid" placeholder="Always invalid" required validation={false} errorMessage="This field always be invalid"/>
      <input type="submit" value="Submit"/>
    </FormReactRedux>

    <h3>Style error message</h3>
    <FormReactRedux formName="style-error-message" styleErrorMessage={{color: 'green'}}>
      <input name="required" placeholder="Required" required/>
      <input type="submit" value="Submit"/>
    </FormReactRedux>

    <h3>Get Values. Submit function only fire in case form is valid if it'snot, see the errors messages.</h3>
    <FormReactRedux
      formName="get-values"
      submit={(values, e) => {
        console.log('values: ', values);
        // values: {name: ''}
      }}
    >
      <input name="name" placeholder="Name" required/>
      <input type="submit" value="Submit"/>
    </FormReactRedux>

    <h3>Set Values from object</h3>
    <FormReactRedux formName="set-values" defaultValues={{name: 'Default value'}}>
      <input name="name" placeholder="Name" required/>
      <input type="submit" value="Submit"/>
    </FormReactRedux>

    <h3>Set Value on field</h3>
    <FormReactRedux formName="set-value">
      <input name="name" placeholder="Name" defaultValue="Default Value" required/>
      <input type="submit" value="Submit"/>
    </FormReactRedux>

    <h3>Set Value on functionality</h3>
    <button
      onClick={() => {
        // defaultValues only if the form have defined
        let defaultValues = {name: 'TheName', surname: ''};
        formReactReduxChangeFieldValue('set-value-fn', 'surname', 'TheSurname', defaultValues)
      }}
    >
      Click to add value
    </button>
    <FormReactRedux formName="set-value-fn" defaultValues={{name: 'TheName', surname: ''}}>
      <input name="name" placeholder="Name"/>
      <input name="surname" placeholder="Surname"/>
      <input type="submit" value="Submit"/>
    </FormReactRedux>

    <h3>Default submit values</h3>
    <FormReactRedux noPreventDefault formName="default-submit-value">
      <input name="name" placeholder="Name" required/>
      <input type="submit" value="Submit"/>
    </FormReactRedux>


    <h3>History. Undo (Ctrl-Z). Redo (Ctrl-Shift-Z or Ctrl-Y)</h3>
    <button onClick={() => {formReactReduxUndo("history")}}>Undo</button>
    <button onClick={() => {formReactReduxRedo("history")}}>Redo</button>
    <button onClick={() => {formReactReduxReset("history")}}>Reset this form</button>
    <button onClick={() => {formReactReduxReset()}}>Reset all</button>

    <FormReactRedux formName="history">
      <input name="name" placeholder="Name" required/>
      <input name="surname" placeholder="Surname" required/>
      <input type="submit" value="Submit"/>
    </FormReactRedux>

  </div>
);


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
