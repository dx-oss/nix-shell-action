import * as core from '@actions/core'
import {cwd} from 'process'
import {execSync} from 'child_process'
import {writeFileSync} from 'fs'

function run(): void {
  try {
    const interpreter: string = core.getInput('interpreter')
    const file: string = core.getInput('file')
    const script: string = core.getInput('script')
    const scriptPath = `${__dirname}/script.sh`
    const nixFilePath = `${cwd()}/${file}`

    const wrappedScript = `
#!/usr/bin/env nix-shell
#!nix-shell ${nixFilePath} -i ${interpreter}

${script}
   `
    writeFileSync(scriptPath, wrappedScript, {mode: 0o755})

    execSync(`nix-shell ${scriptPath}`, {
      stdio: 'inherit'
    })
  } catch (error) {
    core.error(`Error ${error}, action may still succeed though`)
    core.setFailed(error.message)
  }
}

run()
