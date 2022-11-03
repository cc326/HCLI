const path = require('path');
const fs = require('fs');
const ejs = require('ejs');


const toLower = require('./toLower');
//编译ejs
const compile = async (templateName, data) => {
  const templatePosition = `../templates/${templateName}`;
  const templatePath = path.resolve(__dirname, templatePosition);

  const res = await ejs.renderFile(templatePath, { data }, {});
  return res;
};

//判断文件是否存在  不存在就创建
const mkdirSync = (dirname) => {
  //判断该文件夹是否存在
  if (fs.existsSync(dirname)) {
    //存在跳出
    return true;
  } else {
    //文件夹不存在  判断其父目录是否存在
    if (mkdirSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
};
//写入文件
const writeToFile = (path, content) => {
  return fs.promises.writeFile(path, content);
};

/**
 * 把ejs编译并写入目标文件
 * @param {string} name 文件名
 * @param dest 路径
 * @param template 模板
 * @param fileName 文件全名
 */
async function ejsToFile(name, dest, template, fileName) {
  //组件路径
  const cpnPath = dest.replace('router', 'views').replace('src', '@') + `/${name}.vue`;
  //路由路径
  const routePath = dest.replace('src', '').replace('/router', '');
  //编译ejs
  const result = await compile(template, { name, lowerName: toLower(name), cpnPath, routePath });
  //写入文件路径
  const targetPath = path.resolve(dest, fileName);

  //判断父文件是否存在 不存在创建
  mkdirSync(dest);
  //写入文件
  writeToFile(targetPath, result);
}

module.exports = {
  compile,
  writeToFile,
  mkdirSync,
  ejsToFile,
};
