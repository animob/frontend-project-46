#!/usr/bin/env node
import { readFileSync } from 'fs';

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

const genDiff = (file1Path, file2Path, format1, format2) => {
  const file1Content = readFileSync(file1Path, 'utf-8');
  const file2Content = readFileSync(file2Path, 'utf-8');

  const data1 = JSON.parse(file1Content);
  const data2 = JSON.parse(file2Content);

  // console.log('Data from file 1:', data1);
  // console.log('Data from file 2:', data2);

  const diffReport = compareData(data1, data2);
  console.log('Difference report:', diffReport);

  return diffReport;
};

export default genDiff;
