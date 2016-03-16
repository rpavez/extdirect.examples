var mysql = require('mysql'),
    cfg = require('./db-config');

function MySQL(config) {

    this.connection = null;

    this.connect = function(){
        this.connection = mysql.createConnection({
            host: config.hostname,
            port: config.port,
            user: config.user,
            password: config.password,
            database: config.db
        });

        this.connection.connect(function(err) {
            if(err){
                console.error('Connection had errors: ', err.code);
                console.error('Connection params used: hostname = ' +  config.hostname + ', username = ' + config.user + ', db = '+  config.db );
                process.exit(1);
            }
        });

        //add alias for debug
        this.connection.debug = this.debug;

        return this.connection;
    };

    this.disconnect = function() {
        this.connection.end();
    };

    this.debug = function(err, callback) {
        // Generate SOFT error, instead of throwing hard error.
        // We send messages with debug info only if in development mode

        if(global.App.env === 'development') {
            callback({
                message: {
                    text: 'Database error',
                    debug: err
                }
            });
        }else{
            callback({
                message: {
                    text: 'Unknown error',
                    debug: null
                }
            });
        }
    }
}

global.App.database = new MySQL(cfg);

/*// db config
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

    this.connection.connect(function(err){
      if (err) {
        console.log("CONNECTION ERROR");
        process.exit(1);
      }
    });

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

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});

*/