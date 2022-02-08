/**
 * Task description: Write a method that finds all intersections of objects
 * Expected Result: ({ a: 1, b: { c: 3 } }, { c: 1, b: { c: 3 } }) => { b: { c: 3 } }
 * @param {Object<string | number>} firstObj - Object with values of any data types
 * @param {Object<string | number>} secondObj - Object with values of any data types
 * @returns {Object}
 */
const intersectionDeep = (firstObj, secondObj) => {
  const firstObjKeys = Object.keys(firstObj);

  return firstObjKeys.reduce((acc = {}, key) => {
    if (firstObj[key] === secondObj[key]) {
      acc = {
        ...acc,
        [key]: firstObj[key],
      };
    }
    if (Array.isArray(firstObj[key]) && Array.isArray(secondObj[key])) {
      const isEqualArrays = isEqualDeep(firstObj[key], secondObj[key]);
      //console.log(isEqualArrays);
      if (isEqualArrays) {
        acc = {
          ...acc,
          [key]: firstObj[key],
        };
      }
    } else if (typeof firstObj[key] === 'object' && typeof secondObj[key] === 'object') {
      const hasIntersection = intersectionDeep(firstObj[key], secondObj[key]);

      if (Object.keys(hasIntersection).length !== 0) {
        acc = {
          ...acc,
          [key]: hasIntersection,
        };
      }
    }
    return acc;
  }, {});
};

const isEqualDeep = (firstObj, secondObj) => {
    const firstObjKeys = Object.keys(firstObj);
    const secondObjKeys = Object.keys(secondObj);
  
    if (firstObjKeys.length === 0 && secondObjKeys.length === 0) {
      return true;
    }
  
    const compareList = firstObjKeys.map((key) => {
      const valueOfFirstObject = firstObj[key];
      const valueOfSecondObject = secondObj[key];
      
      if ((Number.isNaN(valueOfFirstObject) && Number.isNaN(valueOfSecondObject))
        || (valueOfFirstObject === null && valueOfSecondObject === null)) {
        return true;
      }
      if (valueOfFirstObject === valueOfSecondObject) {
        return true;
      }
      if (Array.isArray(valueOfFirstObject) && Array.isArray(valueOfSecondObject)) {
        return isArraysEqualDeep(valueOfFirstObject, valueOfSecondObject);
      }
      if (typeof valueOfFirstObject === 'object' && typeof valueOfSecondObject === 'object') {
        return isEqualDeep(valueOfFirstObject, valueOfSecondObject);
      }
  
      return false;
    });
  
    return !compareList.includes(false) && !compareList.includes(undefined);
};

const data = { a: 1, b: { c: 3 } };
const data2 = { c: 1, b: { c: 3 } };
console.log(intersectionDeep(data, data2)); // { b: { c: 3 } }