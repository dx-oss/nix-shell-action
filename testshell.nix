let
  pkgs = import
    (builtins.fetchTarball {
      name = "nixpkgs-unstable-2022-06-08";
      url = "https://github.com/nixos/nixpkgs/archive/e0169d7a9d324afebf5679551407756c77af8930.tar.gz";
      # Hash obtained using `nix-prefetch-url --unpack <url>`
      sha256 = "1nr7ih856ca2vl0blim4bz2yxz6cg7jfsx4z096hg0qa5i04zg95";
    })
    { };
in

pkgs.mkShell {
  name = "install-nix-action-shell";

  buildInputs = [ pkgs.hello ];
}
