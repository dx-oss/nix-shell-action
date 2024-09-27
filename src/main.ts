import * as core from '@actions/core'
import {cwd} from 'process'
import {execSync} from 'child_process'
import {writeFileSync} from 'fs'

function run(): void {
  try {
    const interpreter: string = core.getInput('interpreter')
    const file: string = core.getInput('file')
    const script: string = core.getInput('script')
    const options: string = core.getInput('options')
    const scriptPath = `${__dirname}/script.sh`
    const nixFilePath = `${cwd()}/${file}`

    writeFileSync(
      scriptPath,
      [`#!/usr/bin/env ${interpreter}`, script].join('\n'),
      {mode: 0o755}
    )

    execSync(`nix-shell --run ${scriptPath} ${options} ${nixFilePath}`, {
      stdio: 'inherit'
    })
  } catch (error) {
    core.error(`Error ${error}, action may still succeed though`)
    core.setFailed((error as Error).message)
  }
}

run()
