const { program } = require('commander');
const { cloneProjectAction, addCpnAction, addPageAction } = require('./action');
const toLower=require('../utils/toLower')

module.exports = function createCommands() {
  program
    .command('create <project> [other...]')
    .description('clone repository into a folder')
    .action(cloneProjectAction);

  program
    .command('addCpn <name>')
    .description('add vue component,  例 addCpn HelloWorld [-d src/component]')
    .action((name) => {
      addCpnAction(name, program.opts().Dest || `src/components/${name}`);
    });

  program
    .command('addPage <name>')
    .description('add vue page and router,  例 addPage HelloWorld [-d src/component]')
    .action((name) => {
        addPageAction(name, program.opts().Dest || `src/views/${name}`);
    });
};
