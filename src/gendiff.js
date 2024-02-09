#!/usr/bin/env node
import { readFileSync } from 'fs';

const genDiff = (file1Path, file2Path, format1, format2) => {
  const file1Content = readFileSync(file1Path, 'utf-8');
  const file2Content = readFileSync(file2Path, 'utf-8');

  const data1 = JSON.parse(file1Content);
  const data2 = JSON.parse(file2Content);

  console.log('Data from file 1:', data1);
  console.log('Data from file 2:', data2);

};

export default genDiff;
