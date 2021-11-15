import * as core from '@actions/core'
import {execFileSync} from 'child_process'
import {writeFileSync} from 'fs'

function run(): void {
  try {
    const interpreter: string = core.getInput('interpreter')
    const file: string = core.getInput('file')
    const script: string = core.getInput('script')
    const scriptPath = `${__dirname}/script.sh`

    const wrappedScript = `
#!/usr/bin/env nix-shell
#!nix-shell ${file} -i ${interpreter}

set -eu
${script}
   `
    writeFileSync(scriptPath, wrappedScript, {mode: 0o755})

    execFileSync(scriptPath, {
      stdio: 'inherit',
      shell: false
    })
  } catch (error) {
    core.error(`Error ${error}, action may still succeed though`)
    core.setFailed(error.message)
  }
}

run()
