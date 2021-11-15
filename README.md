# nix-shell-action

<a href="https://github.com/workflow/nix-shell-action/actions"><img alt="nix-shell-action status" src="https://github.com/workflow/nix-shell-action/workflows/nix-shell-action-test/badge.svg"></a>

Run any command you like in a deterministic [Nix](https://nixos.org/nix/) shell on Linux and macOS.

## Usage

Create `shell.nix` in your repo, for example

```nix
{ pkgs ? import <nixpkgs> {} }:
  pkgs.mkShell {
    # nativeBuildInputs is usually what you want -- tools you need to run
    nativeBuildInputs = [ pkgs.nodejs ];
}
```

Create `.github/workflows/test.yml` in your repo with the following contents:

```yaml
name: "Test"
on:
  pull_request:
  push:
jobs:
  tests:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: cachix/install-nix-action@v10
      with:
        nix_path: nixpkgs=channel:nixos-unstable
    - uses: ZenithalHourlyRate/nix-shell-action@v1
      with:
        script: |
          node --version
```

For now, this action implicitly depends on having [Nix] installed and set up correctly, such as through the [install-nix-action] demonstrated in the examples above.

See also [cachix-action](https://github.com/cachix/cachix-action) for a simple binary cache setup to speed up your builds and share binaries with developers.

## Options `with: ...`

- `interpreter`:  Interpreter to use in the nix shell shebang, defaults to `bash`. (This is passed to `nix-shell -i`)

- `file`: nix-shell file, Defaults to `shell.nix`.

- `script`: The actual script to execute in your shell. Will be passed to the `interpreter`.

---

## Hacking

See https://github.com/actions/typescript-action

[Nix]: https://nixos.org/nix/
[install-nix-action]: https://github.com/marketplace/actions/install-nix 
