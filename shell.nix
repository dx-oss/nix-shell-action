{ pkgs ? import
    (builtins.fetchTarball {
      name = "nixpkgs-unstable-2024-09-27";
      url = "https://github.com/nixos/nixpkgs/archive/28b5b8af91ffd2623e995e20aee56510db49001a.tar.gz";
      # Hash obtained using `nix-prefetch-url --unpack <url>`
      sha256 = "09zhy7bj0bd72r8dqpbrnpgapfkg5h91samrv1v8j0qxvv5kgv6n";
    })
    { }
}:
let
  # `dist/index.js` is a special file in Actions.
  # When you reference an action with `uses:` in a workflow,
  # `index.js` is the code that will run.
  # For our project, we generate this file through a build process from other source files.
  # We need to make sure the checked-in `index.js` actually matches what we expect it to be.
  generateDist = pkgs.writers.writeBashBin "generateDist" ''
    # install deps
    npm ci
    # rebuild dist directory
    npm run build
    npm run package
  '';
in

pkgs.mkShell {
  name = "install-nix-action-shell";

  buildInputs = [ pkgs.nodejs generateDist ];
}
