import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
// import {expect, test} from '@jest/globals'

// shows how the runner will run a javascript action with env / stdout protocol
test('test testshell.nix has wanted version of hello', () => {
  process.env['INPUT_INTERPRETER'] = 'bash'
  process.env['INPUT_FILE'] = 'testshell.nix'
  process.env['INPUT_SCRIPT'] = `hello --version`
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'dist', 'index.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  expect(cp.execFileSync(np, [ip], options).toString()).toContain('2.12.1-6fe9')
})
test('test testshell that we are IN_NIX_SHELL', () => {
  process.env['INPUT_INTERPRETER'] = 'bash'
  process.env['INPUT_FILE'] = 'testshell.nix'
  process.env['INPUT_SCRIPT'] = `echo $IN_NIX_SHELL`
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'dist', 'index.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  expect(cp.execFileSync(np, [ip], options).toString()).toContain('impure')
})

test('test testshell multiline', () => {
  process.env['INPUT_INTERPRETER'] = 'bash'
  process.env['INPUT_FILE'] = 'testshell.nix'
  process.env['INPUT_SCRIPT'] = `hello --version
  hello --version
  hello --version
  hello --version
  hello --version
  hello --version
  `
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'dist', 'index.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  expect(
    cp.execFileSync(np, [ip], options).toString().split('2.12.1-6fe9').length
  ).toBe(7)
})
