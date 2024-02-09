#!/usr/bin/env node
import { program } from 'commander';
import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import genDiff from '../src/gendiff.js';

const formatOption = (value, _previous) => value;

const genDiffAction = (filePath1, filePath2, options) => {
  program.outputHelp();

  const absolutePath1 = resolve(process.cwd(), filePath1);
  const absolutePath2 = resolve(process.cwd(), filePath2);

// Определяем формат данных: извлекаем расширение файла и сразу удаляем точку из расширения
  const format1 = extname(absolutePath1).slice(1);
  const format2 = extname(absolutePath2).slice(1);

  const file1 = readFileSync(absolutePath1, 'utf-8');
  const file2 = readFileSync(absolutePath2, 'utf-8');

  const diff = genDiff(file1, file2, options.format || format1, options.format || format2);
  console.log(diff);
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