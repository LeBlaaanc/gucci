const minimist = require('minimist')
const { build, printCommands, printWtf, print } = require('gluegun')
const { isNil, isEmpty } = require('ramda')
const PrettyError = require('pretty-error')
const pe = new PrettyError()

module.exports = async function run (argv) {
  let runtime;

  try {
    runtime = build()
      .brand('gucci')
      .loadDefault(`${__dirname}`)
      .loadAll(`${__dirname}/plugins`)
      .createRuntime()
  } catch (e) {
    console.log(pe.render(e))
    throw e // rethrow
  }

  // parse the commandLine line
  const commandLine = minimist(argv.slice(2))

  // should we show the version number & jet?
  const hasNoArguments = isEmpty(commandLine._)
  const hasVersionOption = commandLine.version || commandLine.v
  if (hasNoArguments && hasVersionOption) {
    await runtime.run({ rawCommand: 'version' })
    return
  }

  // wtf mode shows problems with plugins, commands, and extensions
  if (commandLine.wtf) {
    printWtf(runtime)
    return
  }

  // run the command
  let context
  try {
    context = await runtime.run()
  } catch (e) {
    console.log(pe.render(e))
    throw e // rethrow
  }

  if (commandLine.help || commandLine.h || isNil(context.plugin) || isNil(context.command)) {
    // no args, show help
    print.info('')
    printCommands(context)
    print.info('')
    print.info(print.colors.magenta('If you need additional help, join our Slack at http://community.infinite.red'))
    print.info('')
  }

  if (context.error) {
    print.debug(context.error)
  }

  // send it back to make testing easier
  return context
}
