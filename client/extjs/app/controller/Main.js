// Aquí hice trampa y usé el template del TodoGrid!

Ext.define('Demo.controller.Main', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'editor',
            selector: 'grid-actions #userForm'
        },
        {
            ref:'userGrid',
            selector:'grid-actions #userGrid'
        }
    ],

    init: function(application) {
        this.control({
            'grid-actions #userGrid': {
                itemclick: this.onTodoGridItemClick
            },

            'grid-actions button': { //listening for all buttons on grid-actions here, then narrow down to particular button inside actual method
                click: this.buttonActions
            },

            'grid-actions #userGrid toolbar #filter': {
                reset: function() { //not the best practice, please avoid if possible! this only shows that you can use dashes for event names.
                    //we can define logic also here
                    Ext.getStore('User').clearFilter();
                }
            }
        });
    },

    //improves excessive query overhead
    buttonActions: function(button, e, eOpts) {
        var me = this;

        switch(button.action){
            case 'insertRecord': me.onInsertBtnClick(); break;
            case 'updateRecord': me.onUpdateBtnClick(); break;
            case 'removeRecord': me.onRemoveBtnClick(); break;
            case 'loadStore': me.loadStore(); break;
            case 'userStore': me.userStore(); break;
            case 'filterStore': me.filterStore(); break;
            default: break;
        }
    },

    loadStore:function() {
        this.getTodoGrid().getStore().reload();
    },

    userStore:function(){
        this.getUserGrid().getStore().reload();
    },

    filterStore: function() {
        var field = this.getTodoGrid().down('toolbar #filter'),
            value = field.getValue(),
            store = Ext.getStore('User');

        if(value) {
            store.clearFilter(true);
            store.filter('text', value);  // filter on 'text' field
        }
    },

    onTodoGridItemClick: function(dataview, record, item, index, e, eOpts) {
        /*var form = this.getEditor();
        form.getForm().loadRecord(record);
        form.enable();*/

        //NECESITO QUE AL CLICLEAR UN ITEM EL STORE DEVUELVA LA DATA DEL ITEM

        Ext.create('Ext.window.Window', {
        title: 'Usuario',
        height: 200,
        width: 400,
        layout: 'fit',
        items: {
            xtype: 'grid',
            border: false,
            columns: [
                {
                    header: 'Username', 
                    dataIndex: 'username',
                    text: 'HOLA'
                },
                {
                    header:'Password',
                    dataIndex: 'password'
                }],
            store: 'User'
        }
}).show();
    },

    onInsertBtnClick: function() {
        var store = Ext.getStore('User');
        var record = Ext.create('Demo.model.TodoItem', {
            text: 'New todo action ' + +(store.getCount() + 1),
            complete: 0
        });
        record.save({
            callback:function(records, operation, success) {
                //we add to store only after successful insertion at the server-side
                if(success) {
                    Ext.getStore('User').add(records);
                } else {
                    console.log('Failure to add record: ', arguments);
                }
            }
        });
    },

    onRemoveBtnClick: function() {
        var me = this;
        if(this.missingSelection()) {
            Ext.Msg.alert('Error', 'Please select record to remove');
        } else {
            var form = me.getEditor().getForm(),
                record = form.getRecord(),
                store = Ext.getStore('User');

            me.getTodoGrid().getSelectionModel().deselect(record);

            store.remove(record);

            record.erase({
                callback: function(records, operation) {
                    var success = operation.wasSuccessful();
                    form.reset();
                    me.getEditor().disable();
                    if(success) {
                        console.log('Sucessfully removed record: ', arguments);
                    } else {
                        store.insert(record.index, record);
                        console.log('Failure to remove record: ', arguments);
                        Ext.Msg.alert('Server side Error', 'Unable to remove the record');
                    }
                }
            });
        }
    },

    onUpdateBtnClick: function() {
        //prevent errors if no records selected
        if(this.missingSelection()) {
            return false;
        }

        var form = this.getEditor().getForm();

        if (form.isValid()) {
            var record = form.getRecord();
            form.updateRecord(record);

            record.save({
                success: function(record, operation) {
                    record.commit(); // ##Juris :: Commit record in the store
                    console.log('success', record, operation);
                    // update form from computed remote record
                    form.loadRecord(record);
                },
                failure: function(record, operation) {
                    var exception = operation.getError();
                    if (exception && exception.errors) form.markInvalid(exception.errors);
                    console.log('failure', record, operation, exception);
                },
                scope: this
            });
        }
    },

    missingSelection: function() {
        return this.getTodoGrid().getSelectionModel().getSelection().length === 0;
    }
});
