# nix-shell-action

[![Check dist/](https://github.com/dx-oss/nix-shell-action/actions/workflows/check-dist.yml/badge.svg)](https://github.com/dx-oss/nix-shell-action/actions/workflows/check-dist.yml)
[![build-test](https://github.com/dx-oss/nix-shell-action/actions/workflows/test.yml/badge.svg)](https://github.com/dx-oss/nix-shell-action/actions/workflows/test.yml)

Run any command you like in a deterministic [Nix](https://nixos.org/nix/) shell on Linux and macOS.

## Usage

Create `shell.nix` in your repo, for example

```nix
{ pkgs ? import <nixpkgs> {} }:
  pkgs.mkShell {
    # nativeBuildInputs is usually what you want -- tools you need to run
    nativeBuildInputs = with pkgs; [ which nodejs python39 perl ];
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
    - uses: cachix/install-nix-action@v14.1
      with:
        nix_path: nixpkgs=channel:nixos-unstable
    - uses: dx-oss/nix-shell-action@v10
      with:
        script: |
          which node
    - uses: dx-oss/nix-shell-action@v10
      with:
        interpreter: python3
        script: |
          print("hello world from python")
    - uses: dx-oss/nix-shell-action@v10
      with:
        interpreter: perl
        file: shell.nix
        script: |
          use warnings;
          print("Hello, World! from perl\n");
```

For now, this action implicitly depends on having [Nix] installed and set up correctly, such as through the [install-nix-action] demonstrated in the examples above.

See also [cachix-action](https://github.com/cachix/cachix-action) for a simple binary cache setup to speed up your builds and share binaries with developers.

## Options `with: ...`

- `interpreter`:  Interpreter to use in the script, defaults to `bash`. 

- `file`: nix-shell file, Defaults to `shell.nix`.

- `script`: The actual script to execute in your shell. Will be passed to the `interpreter`.

---

## Hacking

See https://github.com/actions/typescript-action

[Nix]: https://nixos.org/nix/
[install-nix-action]: https://github.com/marketplace/actions/install-nix 
