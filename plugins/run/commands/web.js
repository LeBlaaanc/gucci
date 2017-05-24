const spawn = require('child_process').spawn;

module.exports = async function (context) {
    const { print, prompt, system } = context
    const { colors, warning, info, error, success } = print

    info(colors.green('🤖  Starting API'))
    const apiProcess = spawn('npm', ['start'], {
      cwd: './api'
    })
    apiProcess.stdout.on('data', data => process.stdout.write(colors.green(`${data}`)))
    apiProcess.stderr.on('data', data => process.stderr.write(colors.green(`${data}`)))

    info(colors.green('💻  Starting Web Application'))
    const simulatorProcess = spawn('npm', ['start'], {
      cwd: './web'
    })
    webProcess.stdout.on('data', data => process.stdout.write(colors.green(`${data}`)))
    webProcess.stderr.on('data', data => process.stderr.write(colors.green(`${data}`)))    
}

