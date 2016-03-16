Ext.define('Demo.model.UserItem', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'id'
            //,mapping: '_id'  // IMPORTANT! Uncomment for MongoDB backend example
        },
        {
            name: 'username'
        },
        {
            name: 'password'
        }
    ],

    proxy: {
        type: 'direct',
        api: {
            create:  'Server.Demo.User.create',
            read:    'Server.Demo.User.read',
            update:  'Server.Demo.User.update',
            destroy: 'Server.Demo.User.destroy'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'message' // mandatory if you want the framework to set message property content
        }
    }
});