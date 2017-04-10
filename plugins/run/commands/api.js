const spawn = require('child_process').spawn;

module.exports = async function (context) {
    const { print, prompt, system } = context
    const { colors, warning, info, error, success } = print

    info(colors.magenta('🤖  Starting API'))
    const apiProcess = spawn('npm', ['start'], {
      cwd: './api'
    })
    apiProcess.stdout.on('data', data => print.info(colors.magenta(`${data}`)))
    apiProcess.stderr.on('data', data => print.error(colors.magenta(`${data}`)))
}

