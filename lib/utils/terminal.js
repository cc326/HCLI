// 执行终端命令代码
//开启子进程
const { spawn } = require('child_process');

const commandSpawn=(...args)=> {
  return new Promise((resolve, reject) => {
    //执行指令
    const childProcess = spawn(...args);
    //把该进程输出流放入process中
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    //监听执行完毕
    childProcess.on('close', () => {
      resolve();
    });
  });
}

module.exports = commandSpawn;
