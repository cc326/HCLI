const {program} =require('commander')

const helpOption=()=>{
    program
    .option('-w -why', 'a why cli')
    .option('-d -dest <dest>', '放入的目标文件 例：/src/components')
    .option('-f --framework <framework>','your framswork');

    program.on('--help',()=>{
        console.log('');
        console.log('Other:');
        console.log(' other option');
    })
}

module.exports=helpOption