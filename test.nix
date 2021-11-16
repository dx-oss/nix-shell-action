{ pkgs ? import <nixpkgs> {}
}:

pkgs.mkShell {
  name = "install-nix-action-test-shell";

  buildInputs = [ pkgs.mill ];
}
