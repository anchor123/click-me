const cmd = require('node-cmd');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function execute() {
    console.log('请输入部署环境id:');
    rl.on('line', line => {
        if (!line) {
            console.log('请输入部署环境id:');
        }
        else {
            if (!testEnvId(line)) {
                console.log('请输入有效的环境id:');
            } else {
                deploy(line);
                rl.close();
            }
        }
    })
}

function deploy(envId) {
    console.log('执行部署中...')
    const exec = cmd.run(`tcb framework deploy -e ${envId}`);
    exec.stdout.on('data', data => {
        console.log(data);
    });
    exec.on('error', (err) => {
        console.error(err);
        process.exit(-1);
    })
    exec.on('exit', () => {
        console.log('部署完成！');
        process.exit(0);
    })
}

function testEnvId(envId) {
    return /^[^-.]+-[^-.]+-[^-.]+$/g.test(envId);
}


execute();
