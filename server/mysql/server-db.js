// db config
var env = "dev",
    config = require('./db-config'),
    sequelize = require('sequelize');

function Sequelize(config){
  this.connection = null;
  this.connect = function(){
    this.connection = new Sequelize(
      'Demo', config.user, config.password,{
        hostname: config.hostname,
        port: config.port
      });
/*
    this.connection.connect(function(err){
      if (err) {
        console.log("CONNECTION ERROR");
        process.exit(1);
      }
    });
*/
    this.connection.debug = this.debug;
    return this.connection;
  };

  this.disconnect = function(){
    this.connection.close();
  };

  this.debug = function(err, callback){
    if (global.App.env === 'development') {
      callback({
        message:{
          text: 'DB Error',
          debug: err
        }
      });
    } else {
      callback({
        message: 'Unknown error',
        debug: null
      });
    }
  };
}

global.App.database = new Sequelize(config);
