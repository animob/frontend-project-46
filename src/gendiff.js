#!/usr/bin/env node

const compareData = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const uniqueKeys1 = keys1.filter(key => !keys2.includes(key));
  const uniqueKeys2 = keys2.filter(key => !keys1.includes(key));

  const commonKeys = keys1.filter(key => keys2.includes(key));

  const changedValues = commonKeys.reduce((result, key) => {
    if (data1[key] !== data2[key]) {
      result[key] = { value1: data1[key], value2: data2[key] };
    }
    return result;
  }, {});

  return {
    added: uniqueKeys2.reduce((result, key) => {
      result[key] = data2[key];
      return result;
    }, {}),
    removed: uniqueKeys1.reduce((result, key) => {
      result[key] = data1[key];
      return result;
    }, {}),
    changed: changedValues,
  };
};

const genDiff = (data1, data2) => {

  const file1 = JSON.parse(data1);
  const file2 = JSON.parse(data2);

  const diffReport = compareData(file1, file2);
  console.log('Difference report:', diffReport);

  return diffReport;
};

export default genDiff;
