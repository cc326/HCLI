#! /usr/bin/env node
// /\ 一般叫 sheband/hashband  作用 在命令行敲某个指令时 根据#！后面配置的环境执行

const {program} = require('commander');
const helpOption=require('./lib/core/help')
const createCommands= require('./lib/core/create')

//定义版本号  why -V
program.version(require('./package.json').version);

//帮助和可选信息
helpOption()

//创建其他指令
createCommands()

//解析参数
program.parse(process.argv);

// console.log(program.opts());
