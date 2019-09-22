import { arrayIsSubset, } from './utils.mjs';

/*
  const required = true;
  const definingObject = {
    propA: { required, },
    propB: { default: 'propBValue', },
    propC: { required },
    propD: { default: null }
  };

  const initObject = { propA: 10, propB: 'propBVal', propC: null };

  factoryTemplate(definingObject, initObject)
  // Object { propA: 10, propB: "propBVal", propC: null, propD: null }
  */
export function factoryTemplate(definingObject, initObject) {
  let device = null;

  const propsPassedArr = Object.keys(initObject);
  const propsBaseArr = Object.keys(definingObject);
  const subset = arrayIsSubset(propsBaseArr, propsPassedArr);
  const requiredPassed = arrayIsSubset(
    propsPassedArr,
    propsBaseArr.filter(prop => definingObject[prop].required)
  );

  if (subset && requiredPassed) {
    const defaultValProps = propsBaseArr
      .filter(defaultValueSet(definingObject));
    device = Object.assign({}, initObject);
    defaultValProps.forEach(setDefaultValue(device, definingObject));
  } else {
    console.error('factoryTemplate passed props error');
  }
  return device;
}

function defaultValueSet(obj) {
  return function (prop) {
    return obj[prop].default !== undefined;
  };
}

function setDefaultValue(device, definingObject) {
  return function (prop) {
    if (device[prop] === undefined) {
      device[prop] = definingObject[prop].default;
    }
  };
}
