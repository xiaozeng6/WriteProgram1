
var hbase=require('hbase');
var assert=require('assert');
//Instatiate a new client
client=new hbase.Client({host:'192.168.20.4',port:8090});
// create a table

client
.table('second_test')
.create('second_column_family',function(err,success){
//Insert a record
    client
    .table('second_test')
    .row('second_row')
    .put('second_column_family:second_column','first value',function(err,success){
        //Read a record
        client
        .table('second_test')
        .row('second_row')
        .get('second_column_family',(error,value)=>{
            // assert.strictEqual(404,error.code)
            // assert.strictEqual(null,value)
            console.info(value);
        })

    })
})



