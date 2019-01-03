import React from 'react';
import {getUniqueKey} from "./FormReactRedux";

const ShowValues = ({values}) => {
  let data = [];
  for (let i in values) {
    if (values.hasOwnProperty(i)) {
      data.push(<div key={getUniqueKey()}>
        <b>{i}: {values[i]}</b>
      </div>)
    }
  }
  return (data ? <div>{data}</div> : <span/>);
};

export default ShowValues;