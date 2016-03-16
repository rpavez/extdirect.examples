Ext.define('Demo.view.Users',{
    extend:'Ext.container.Container',

    xtype:'grid-actions',

    title: 'Usuarios',

    layout: 'border',

    style: 'padding:5px',

    items: [
        {
            xtype: 'gridpanel',
            region: 'center',
            itemId: 'userGrid',
            store: 'User',
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items:[
                    {
                        xtype: 'button',
                        action: 'insertRecord',
                        icon: 'resources/assets/plus-circle.png',
                        text: 'Insert blank record'
                    },
                    {
                        text: 'Load data',
                        icon: 'resources/assets/arrow-circle-double-135.png',
                        action: 'userStore'
                    }
                ]
            },{
                xtype: 'pagingtoolbar',
                store: 'User',   // same store GridPanel is using
                dock: 'bottom',
                displayInfo: true
            }],

            columns: [
                {
                    dataIndex: 'id',
                    text: 'Id',
                    width: 170
                },
                {
                    flex:1,
                    dataIndex: 'username',
                    text: 'Username'
                },
                {
                    dataIndex: 'password',
                    text: 'Password'
                }
            ]
        }
    ]
});
