# nix-shell-action

[![build-test](https://github.com/dx-oss/nix-shell-action/actions/workflows/test.yml/badge.svg)](https://github.com/dx-oss/nix-shell-action/actions/workflows/test.yml)

Run any command you like in a deterministic [Nix](https://nixos.org/nix/) shell.

## Usage

Create `shell.nix` in your repo, for example

```nix
{ pkgs ? import
    (builtins.fetchTarball {
      name = "nixpkgs-unstable-2024-09-27";
      url = "https://github.com/nixos/nixpkgs/archive/28b5b8af91ffd2623e995e20aee56510db49001a.tar.gz";
      sha256 = "09zhy7bj0bd72r8dqpbrnpgapfkg5h91samrv1v8j0qxvv5kgv6n";
    })
    { }
}:
  pkgs.mkShell {
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

This action depends on having [Nix] installed and set up correctly, such as through the [install-nix-action] or [nix-quick-install-action] as demonstrated in the examples above.

## Options `with: ...`

- `interpreter`: Interpreter to use in the script, defaults to `bash`.

- `file`: nix-shell file, Defaults to `shell.nix`.

- `script`: The actual script to execute in your shell. Will be passed to the `interpreter`.

- `options`: Other options to pass along to the `nix-shell` command, like `--pure` or `--packages hello` or multiple options combined.

---

[nix]: https://nixos.org/nix/
[install-nix-action]: https://github.com/marketplace/actions/install-nix
[nix-quick-install-action]: https://github.com/marketplace/actions/nix-quick-install
