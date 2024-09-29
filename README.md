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
name: 'Test'
on:
    push:
        branches: [main]
    pull_request:
        branches: [main]
jobs:
    tests:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4
            - uses: nixbuild/nix-quick-install-action@v27
            - uses: dx-oss/nix-shell-action@v12
              env:
                  NIX_BUILD_SHELL: bash # if using nix-quick-install-action, and not using flakes, you need to specify NIX_BUILD_SHELL
              with:
                  file: shell.nix
                  script: which node
```

For now, this action implicitly depends on having [Nix] installed and set up correctly, such as through the [install-nix-action] demonstrated in the examples above.

See also [cachix-action](https://github.com/cachix/cachix-action) for a simple binary cache setup to speed up your builds and share binaries with developers.

## Options `with: ...`

- `interpreter`: Interpreter to use in the script, defaults to `bash`.

- `file`: nix-shell file, Defaults to `shell.nix`.

- `script`: The actual script to execute in your shell. Will be passed to the `interpreter`.

- `options`: Other options to pass along to the `nix-shell` command, like `--pure` or `--packages hello` or multiple options combined.

---

## Hacking

See https://github.com/actions/typescript-action

[nix]: https://nixos.org/nix/
[install-nix-action]: https://github.com/marketplace/actions/install-nix
