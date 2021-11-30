{ pkgs ? import <nixpkgs> {}
}:

pkgs.mkShell {
  name = "install-nix-action-test-shell";

  buildInputs = with pkgs; [ which mill python39 perl ];
}
