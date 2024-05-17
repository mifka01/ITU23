let
  pkgs = import <nixpkgs> {};
in
pkgs.mkShell {
  name = "Gitu";
  buildInputs = [
    pkgs.nodejs_20
  ];
}

