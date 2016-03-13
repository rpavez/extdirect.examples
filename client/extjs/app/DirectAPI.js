Ext.define('snuuper.DirectAPI', {
    /*
     Require Ext.Direct classes
     */
    requires: ['Ext.direct.*']
}, function() {
    var Loader = Ext.Loader,
        wasLoading = Loader.isLoading;

    var host = "http://localhost:3000";


    //Loading API
    Loader.loadScriptsSync(host+'/directapi', Ext.emptyFn, Ext.emptyFn, null, true);
    Loader.isLoading = wasLoading;
    /*
     Add provider. Name must match settings on serverside
    */

    ExtRemote = {};
    ExtRemote.REMOTING_API = Server.API;

    //ExtRemote.REMOTING_API.enableBuffer = false;
    Ext.direct.Manager.addProvider(ExtRemote.REMOTING_API);
});