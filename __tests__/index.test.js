#!/usr/bin/env node
/* eslint-disable no-undef */
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff, { compareData } from '../src/gendiff.js';

describe('JSON comparison', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const fixturesPath = path.resolve(__dirname, '..', '__fixtures__');
  const data1Path = path.join(fixturesPath, 'file1.json');
  const data2Path = path.join(fixturesPath, 'file2.json');

  const data1 = fs.readFileSync(data1Path, 'utf-8');
  const data2 = fs.readFileSync(data2Path, 'utf-8');

  test('should correctly identify added keys', () => {
    const result = compareData(JSON.parse(data1), JSON.parse(data2));
    expect(result.added).toEqual({ verbose: true });
  });

  test('should correctly identify removed keys', () => {
    const result = compareData(JSON.parse(data1), JSON.parse(data2));
    expect(result.removed).toEqual({ proxy: '123.234.53.22', follow: false });
  });

  test('should correctly identify changed values', () => {
    const result = compareData(JSON.parse(data1), JSON.parse(data2));
    expect(result.changed).toEqual({ timeout: { value1: 50, value2: 20 } });
  });

  test('should produce the same result using genDiff function', () => {
    const result = genDiff(data1, data2);
    const expectedResult = {
      added: { verbose: true },
      removed: { proxy: '123.234.53.22', follow: false },
      changed: { timeout: { value1: 50, value2: 20 } }
    };
    expect(result).toEqual(expectedResult);
  });
});