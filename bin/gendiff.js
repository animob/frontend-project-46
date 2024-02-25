#!/usr/bin/env node
/* eslint-disable no-undef */
import { program } from 'commander';
import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import genDiff from '../src/gendiff.js';

const formatOption = (value) => value;

const genDiffAction = (filePath1, filePath2, options) => {
  const absolutePath1 = resolve(process.cwd(), filePath1);
  const absolutePath2 = resolve(process.cwd(), filePath2);

// Определяем формат данных: извлекаем расширение файла и сразу удаляем точку из расширения
  const format1 = extname(absolutePath1).slice(1);
  const format2 = extname(absolutePath2).slice(1);

  const data1 = readFileSync(absolutePath1, 'utf-8');
  const data2 = readFileSync(absolutePath2, 'utf-8');

  const diff = genDiff(data1, data2, options.format || format1, options.format || format2);

  return diff;
};

program
  .version('1.0.0')
  .action(genDiffAction)
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .usage('[options] <filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', formatOption)
  .parse(process.argv);

export default genDiffAction;