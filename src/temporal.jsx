import React from "react";

children.map((itemOrigin, i) => {
  let item = React.cloneElement(itemOrigin);
  const refactorFn = (children) => {
    if (!children || typeof children !== "object") {
      return;
    }console.log('children', children)
    if (children && children.props && typeof children.props.children === "object") {
      refactorFn(children.props.children)
    } else if (children && children.length) {
      children.map((item, i) => {//console.log('item', item)
        if (item && item.props && item.props.children) {
          return React.cloneElement(item, {children: refactorFn(item.props.children)})
        }
        return React.cloneElement(item, {children: refactorFn(item)})
      });
    }

    let object = {};
    if (children.type === 'input') {
      let tag = '';
      if (children.props.name) {
        tag = children.props.name
      } else {
        tag = 'name' + Math.floor(Math.random() * 10000)
      }
      values[tag] = '';
      object['onChange'] = (e) => {
        console.log(e.target.name, e.target.value);
        values[e.target.name] = e.target.value;
      };
      return React.cloneElement(children, object);console.log('children', children)
    }
  };
  if (typeof item.props.children === "object") {//console.log('refactorFn(item.props.children)', refactorFn(item.props.children))
    item = React.cloneElement(item, {children: refactorFn(item.props.children)});
  }
  let object = {key: name + Math.floor(Math.random() * 10000)};
  if (item.type === 'input') {
    let tag = '';
    if (item.props.name) {
      tag = item.props.name
    } else {
      tag = 'name' + Math.floor(Math.random() * 10000)
    }
    values[tag] = '';
    object['onChange'] = (e) => {
      console.log(e.target.name, e.target.value);
      values[e.target.name] = e.target.value;
    };
  }
  return React.cloneElement(item, object);
});