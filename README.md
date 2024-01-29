# PROTOHAK
ProtoHAK is a React and js-dos wrapper to emulate Proto Trak® lathe and mill UI in a browser.  It runs the original MS-DOS software in a js-dos emulator, and provides the custom keypad layout and key mapping to give the same look and feel of the physical control.  Presently it supports the LX2 lathe and the MX3 milling machine, as they are the machines we use at our makerspace.

Please note that /Trak® is a registered trademark of Southwestern Industries./

# Disclaimer
This project is intended for educational and training purposes in a makerspace environment.  It is not intended for commercial use or resale.  This repository contains no software images or intellectual property from Southwestern Industries.  There is a build script included which downloads publically available disk image files from their web site.  They are used unmodified inside of the DOSBox/js-dos emulator to provide an "offline" training environment.

# Building

At the moment only a linux environment is supported for development.  It was tested on Ubuntu 22.04.  Once built, the html/js can be hosted from any type of server.

- Install a recent version of `node` and `npm`.
- Clone this repo and change into the `protohak` directory.
- Run `npm install`.  This will take a few minutes.
- Run `./build-bundles.sh`.  This will download the disk images and documentation files from the SWI public web site and use them to build "bundles" that js-dos will use.
- Run `npm run start` to run a development server on your local machine at `localhost:3000`.  It will launch a browser automatically.
- Run `npm run build` to build a production version into the `./build` directory.  You can copy the build files to a web server directory once done.

