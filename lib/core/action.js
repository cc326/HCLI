//把一个回调函数转promise
const { promisify } = require('util');
const path = require('path');

//clone git代码
const download = promisify(require('download-git-repo'));

const commandSpawn = require('../utils/terminal');
const { vueRepo } = require('../config/repo-config');
const { compile, writeToFile, mkdirSync,ejsToFile } = require('../utils/utils');
const toLower = require('../utils/toLower');



//克隆git项目（创建项目）
async function cloneProjectAction(project, other) {
  //clone
  await download(vueRepo, project, { clone: true });
  //npm install
  await commandSpawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['install'], { cwd: `./${project}` });
  //npm run serve
  await commandSpawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'serve'], { cwd: `./${project}` });
}

//添加组件
async function addCpnAction(name, dest) {
  ejsToFile(name, dest, 'vue-component.ejs', `./${name}.vue`);
}

//添加页面和路由
async function addPageAction(name, dest) {
  addCpnAction(name, dest);

  ejsToFile(name, dest.replace('views','router'), 'vue-router.ejs', `./${name}.js`);
  ejsToFile(name, dest.replace('views','store'), 'vue-store.ejs', `./${name}.js`);
  ejsToFile(name, dest.replace('views','store'), 'vue-types.ejs', `./type.js`);
}

module.exports = {
  cloneProjectAction,
  addCpnAction,
  addPageAction,
};
