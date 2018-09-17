# for-m-react-redux

Ease way to build fast and simple forms in react isomorphic application.

**Dependencies**

- React
- Redux

**Install**

clone repo

`npm install`

**Run**

`npm start`

**Simple Form**

```
import React from 'react';
import FormReactRedux from './FormReactRedux';

const App = () => (
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
)
```

**Validation**

- Default validation messages:
```
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
```

- Define validation messages:
    - define new validation messages
    ```
    <FormReactRedux
        formName="define-validation-messages"
        language={{"This field is required": "Este campo es obligatorio"}}
    >
        <input name="required" placeholder="Required" required/>
        {/* Este campo es obligatorio */}
        <input type="submit" value="Submit"/>
    </FormReactRedux>
    ```
    - define one validation message
    ```
    <FormReactRedux formName="define-one-validation-message">
      <input name="name" placeholder="Required" required errormessage="Required"/>
      {/* Required */}
      <input type="submit" value="Submit"/>
    </FormReactRedux>
    ```

- Default input type validation
    - email
    - number
    - url
    ```
    <FormReactRedux formName="default-input-type-validation">
      <input type="email" name="email" placeholder="Email"/>
      {/* This field most be email */}
      <input type="number" name="number" placeholder="Number"/>
      {/* This field most be number */}
      <input type="url" name="url" placeholder="Url"/>
      {/* This field most be url */}
      <input type="submit" value="Submit"/>
    </FormReactRedux>
    ```
- Specify validation
    - required
    - alphanumeric
    - word
    - number
    - natural number
    - integer
    - decimal
    - email
    - url
    ```
    <FormReactRedux formName="specify-validation">
      <input name="required" placeholder="Required" required/>
      {/* This field is required */}
      <input name="alphanumeric" placeholder="Alphanumeric" alphanumeric/>
      {/* This field is alphanumeric */}
      <input name="word" placeholder="Only Words" word/>
      {/* This field is word */}
      <input name="number" placeholder="Number" number/>
      {/* This field is number */}
      <input name="naturalNumber" placeholder="Natural number" naturalnumber/>
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
    ```
    - Function Validation
    ```
    <FormReactRedux formName="function-validation">
      <input name="more-then" placeholder="More then 2 characters" validation={(value, values) => value.toString().length > 2} errormessage="This field required more then 2 characters"/>
      <input type="submit" value="Submit"/>
    </FormReactRedux>
    ```
    - Boolean Validation
    ```
    <FormReactRedux formName="boolean-validation">
      <input name="always-invalid" placeholder="Always invalid" required validation={false} errormessage="This field always be invalid"/>
      <input type="submit" value="Submit"/>
    </FormReactRedux>
    ```
- Style error message
```
<FormReactRedux formName="style-error-message" styleErrorMessage={{color: 'green'}}>
  <input name="required" placeholder="Required" required/>
  <input type="submit" value="Submit"/>
</FormReactRedux>
```

**Handle values**

- Get Values. Submit function only fire in case form is valid if it'snot, see the errors messages.
```
<FormReactRedux
  formName="get-values"
  submit={(values, e) => {
    console.log('values: ', values);
    // values: {name: 'Ease way to build...'}
  }}
>
  <input name="name" placeholder="Name" required/>
  <input type="submit" value="Submit"/>
</FormReactRedux>
```

- Set Values from object
```
<FormReactRedux formName="set-values" defaultValues={{name: 'Default value'}}>
  <input name="name" placeholder="Name" required/>
  <input type="submit" value="Submit"/>
</FormReactRedux>
```

- Set Value on field
```
<FormReactRedux formName="set-value">
  <input name="name" placeholder="Name" defaultValue="Default Value" required/>
  <input type="submit" value="Submit"/>
</FormReactRedux>
```

- Set Value on functionality
```
import React from 'react';
import {connect} from 'react-redux';
import FormReactRedux from './FormReactRedux';

const App = ({formReactReduxChangeFieldValue}) => (
  <div>
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
  </div>
)

const mapDispatchProps = dispatch => ({
  formReactReduxChangeFieldValue: (formName, fieldName, fieldValue, defaultValues) => {
    dispatch({type: types.FORM_REACT_REDUX_CHANGE_VALUE, data: {formName, fieldName, fieldValue, defaultValues}})
  }
});
connect(undefined, mapDispatchProps)(App);
```

- Default submit values
```
<FormReactRedux noPreventDefault formName="default-submit-value">
  <input name="name" placeholder="Name" required/>
  <input type="submit" value="Submit"/>
</FormReactRedux>
```

- History. Undo (Ctrl-Z). Redo (Ctrl-Shift-Z or Ctrl-Y)
```
import React from 'react';
import {connect} from 'react-redux';
import FormReactRedux from './FormReactRedux';

const App = ({formReactReduxUndo, formReactReduxRedo, formReactReduxReset}) => (
  <div>
    <button onClick={() => {formReactReduxUndo("history")}}>Undo</button>
    <button onClick={() => {formReactReduxRedo("history")}}>Redo</button>
    <button onClick={() => {formReactReduxReset("history")}}>Reset this form</button>
    <button onClick={() => {formReactReduxReset()}}>Reset all</button>
    
    <FormReactRedux noPreventDefault formName="history">
      <input name="name" placeholder="Name" required/>
      <input name="surname" placeholder="Surname" required/>
      <input type="submit" value="Submit"/>
    </FormReactRedux>
  </div>
)

const mapDispatchProps = dispatch => ({
  formReactReduxUndo: (formName) => {
    dispatch({type: types.FORM_REACT_REDUX_UNDO, formName})
  },
  formReactReduxRedo: (formName) => {
    dispatch({type: types.FORM_REACT_REDUX_REDO, formName})
  },
  formReactReduxReset: (formName) => {
    dispatch({type: types.FORM_REACT_REDUX_RESET, formName})
  }
});
connect(undefined, mapDispatchProps)(App);
```
