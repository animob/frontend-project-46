#!/usr/bin/env node

import { program } from 'commander';

const command = () => {
  program.outputHelp();
}

program
  .version('1.0.0')
  .action(command)
  .description('Compares two configuration files and shows a difference.')
  .usage('[options] <filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);

