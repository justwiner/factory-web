import { join } from 'path'
import { Factory } from 'fbi'

import CommandBuild from './commands/build'
import CommandServe from './commands/serve'
import CommandLint from './commands/lint'
import CommandFormat from './commands/format'
import CommandTypesCreate from './commands/types-create'
import CommandTypesSync from './commands/types-sync'

import TemplateBase from './templates/base'
import TemplateVue from './templates/vue'
import TemplateReact from './templates/react'
import TemplateMicroMain from './templates/micro-main'
import TemplateMicroVue from './templates/micro-vue'
import TemplateMicroReact from './templates/micro-react'
import TemplateMiniProgram from './templates/mini-program'

export default class FactoryWeb extends Factory {
  id = require('../package.json').name
  description = 'factory for web application development'
  commands = [
    new CommandBuild(this),
    new CommandServe(this),
    new CommandTypesCreate(this),
    new CommandTypesSync(this),
    new CommandLint(this),
    new CommandFormat(this)
  ]

  templates = [
    new TemplateVue(this),
    new TemplateReact(this),
    new TemplateMicroMain(this),
    new TemplateMicroVue(this),
    new TemplateMicroReact(this),
    new TemplateMiniProgram(this)
  ] as any

  execOpts: any = {
    cwd: process.cwd(),
    localDir: join(__dirname, '../'),
    preferLocal: true
  }
}

export {
  CommandBuild,
  CommandServe,
  CommandTypesCreate,
  CommandTypesSync,
  TemplateBase,
  TemplateVue,
  TemplateReact,
  TemplateMicroMain,
  TemplateMicroVue,
  TemplateMicroReact
}
