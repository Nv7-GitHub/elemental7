# [Elemental 7](https://elem7.tk)
Elemental 7 is a fan made recreation of [Elemental 3](http://htwins.net/elem3/), built on modern web
technologies, and with many client customization features.

## Play Live Build
[elem7.tk](https://elem7.tk) <br>
[dev.elem7.tk (development branch)](https://dev.elem7.tk)

## Development
The game is separated onto two parts: server (server folder) and client (game folder). They are
almost two separate projects, but the server is required to be running for the game to work.

The build system was changed last minute, separating the client and server, so it's a crazy mess. I
also didn't keep an old copy of this repository, so the first commit is a lot. I also didn't commit
useful names. I just want this project out. As of the release, Everything is sloppy. Good luck
figuring out anything.

Run the your own server
- Get node.js & npm
- `npm install -D`
- `npm run build-server`
- `node gen-env`
- Edit .env with your stuff
- Run `node .` to start the server

Develop Server Side
- Folders: shared, server
- setup a build of the server
- `npm run watch-server`
- you still have to restart it every time of course
- As of the client/server separation, the local dev server wont appear in the dropdown by default. You have to add it manually.

Develop Client Side:
- Folders: everything but ./server
- ./client.sh: Starts a server on localhost:8000

SVG stuff designed in figma, see project [here](https://www.figma.com/file/wrCKu78yrbRzMdHAS3EpNv/Elemental-4?node-id=0%3A1)
