const { program } = require('commander');

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .usage('[options] <filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .option('-h, --help', 'output usage information')
  .parse(process.argv);

if (program.help) {
  program.outputHelp();
}
