### About
This repository contains examples on how to use Ext.Direct in conjunction with node.js server side using MySQL

### Client
ExtJS 5.1.0 (Check docs in http://docs.sencha.com/extjs/5.1.0/)

### Server
Node.js server of version 0.12.2+ and Express 4.x
(check your NodeJS version using `node -v` if its not 0.12.* use this tool https://github.com/tj/n, get it working by running `sudo npm install -g n` then running `n 0.12.2` that will download and switch to NodeJS 0.12.2)

### Steps to get this working
* 1. Clone this repo
* 2. Create a local DB called Demo and load ./server/mysql/squema_mysql.sql
* 3. go to ./server/mysql and run `npm install` then run `sudo npm install -g nodemon` and then `nodemon server.js`
* 4. go to your browser to http://localhost:3000

### Steps to develop new stuff
* 1. Go to ./client/extjs
* 2. Open htis folder with you favorite text editor (Subl, Atom, WebStorm) as a project.
* 3. Edit files only inside ./client/extjs/app
* 4. After editing refresh your browser to see the changes.

### Building (only required for production)
* 1. Install Sencha CMD 5.1.2.52 from http://cdn.sencha.com/cmd/5.1.2.52/SenchaCmd-5.1.2.52-osx.app.zip (Newest versions of Sencha CMD wont work and will break codebase)
* 2. Go to ./client/extjs
* 3. run `sencha app build`
* 4. It will generate ./client/extjs/build/Demo