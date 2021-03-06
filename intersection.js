/**
 * Task description: Write a method that finds shallow intersections of objects
 * Expected Result: ({ a: 1, b: 2 }, { c: 1, b: 2 }) => { b: 2 }
 * @param {Object<string | number>} firstObj - Object with values of primitive data types
 * @param {Object<string | number>} secondObj - Object with values of primitive data types
 * @returns {Object}
 */
const intersection = (firstObj, secondObj) => {
    const firstObjKeys = Object.keys(firstObj);
  
    return firstObjKeys.reduce((acc = {}, key) => {
      if (firstObj[key] === secondObj[key]) {
        acc = {
          ...acc,
          [key]: firstObj[key],
        };
      }
  
      return acc;
    }, {});
};

const data = { a: 1, b: 2 };
const data2 = { c: 1, b: 2 };
console.log(intersection(data, data2)); // { b: 2 }