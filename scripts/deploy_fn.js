const cmd = require('node-cmd');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let env_id, fn;

function getFn() {
    console.log('请输入要部署的函数:');
    rl.on('line', line => {
        if (!line) {
            console.log('请输入要部署的函数:');
        }
        else {
            fn = line;
            rl.close();
            deploy(env_id,fn);
        }
    })
}

function getEnvId() {
    console.log('请输入部署环境id:');
    rl.on('line', line => {
        if (!line) {
            console.log('请输入部署环境id:');
        }
        else {
            if (!testEnvId(line)) {
                console.log('请输入有效的环境id:');
            } else {
                env_id = line;
                getFn();
            }
        }
    })
}

function deploy(envId,fn) {
    console.log('执行部署中...')
    const exec = cmd.run(`tcb fn deploy ${fn} -e ${envId}`);
    process.stdin.pipe(exec.stdin);
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


getEnvId();
