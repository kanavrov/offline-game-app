# offline-game-app
A retro game website offering a GameBoy game playable while offline. Done for a workshop in VarnaLab (https://www.varnalab.org)

## Project desctiption

### OfflineGameApp.Web
A .Net Core 2.2 MVC application. To run: 
- Install .Net Core SDK 2.2 (https://dotnet.microsoft.com/download/dotnet-core/2.2)
- Navigate to folder OfflineGameApp.Web in cmd / terminal
- Execute **dotnet run** command
- Open app in browser at https://localhost:5001 or http://localhost:5000

### OfflineGameApp.Game
A GB Studio (https://www.gbstudio.dev) game project. 
- To build as ROM to play in emulator follow instructions here https://www.gbstudio.dev/docs/build/#build-as-rom. A good emulator is VisualBoyAdvance (http://www.emulator-zone.com/doc.php/gba/vboyadvance.html).
- To build for the Web follow instrunctions here https://www.gbstudio.dev/docs/build/#build-and-deploy-for-web. The game won't work if you open index.html directly because of CORS policy. To play web version locally (without deploying to a server):
  - Install node js (https://nodejs.org/en/)
  - Execute command **npm install http-server -g** in cmd / terminal
  - Navigate to web build folder
  - Execute command **http-server -p 8080** in cmd / terminal
  - Point your browser to http://localhost:8080/index.html
