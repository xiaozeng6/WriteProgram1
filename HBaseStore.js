var PVSimulator=require('./PVSimulator.js');
var hbase=require('hbase');
var schedule=require('node-schedule');
var PVSimulator=require('./PVSimulator.js');
var assert=require('assert');
// var WriteFiles=require('./WriteFiles');
const client=new hbase.Client({host:'192.168.20.4',port:8090});
//const PVTable=hbase({}).table('PVSimulator_test');
var Rows=[];
// var myTable=new hbase.Table(client,'PVSimulator_test');
// myTable.delete();
// create a table
// Table=client
// .table('PVSimulator_test')
// .create('PV',function(error,success){
//     // console.info('Table created: '+(success? 'yes':'no'))
//     console.log('successful');
// });
//console.log(PVContent);
// // x=PVContent["name"];
// // console.log(x);
const Insert2HBase=()=>{
    //generate PV per 30s
    schedule.scheduleJob('* * * * * *',()=>{
        
        channelId=PVSimulator.channelId.toString();
        name=PVSimulator.name;
        val=PVSimulator.val.toString();
        nanosecs=PVSimulator.nanosecs.toString();
        severity=PVSimulator.severity.toString();
        status=PVSimulator.status.toString();
        rowkey=name+'_'+nanosecs;
        // console.log('s');
        rows=
        [
            {key:rowkey,column:'PV:chanId',$:channelId}
            ,{key:rowkey,column:'PV:name',$:name}
            ,{key:rowkey,column:'PV:val',$:val}
            // ,{key:rowkey,column:'PV:nanosecs',$:nanosecs}
            ,{key:rowkey,column:'PV:severity',$:severity}
            ,{key:rowkey,column:'PV:status',$:status}
        ]
        console.log(channelId);
        client
        .table('PVSimulator_test')
        .row()
        .put(rows,(error,success)=>{
            assert.strictEqual(true,success); 
        });
        
    });
}

function getDataHBase(rowkey,name){
    ColumnName='PV:'+name;
    client
        .table('PVSimulator_test')
        .row(rowkey)
        .get(ColumnName,(error,value)=>{
            console.info(value);        
        });
}

function DeleteData(rowkey){
    client
    .table('PVSimulator_test')
    .row(rowkey)
    .delete((error,success)=>{
        assert.strictEqual(true,success);
    });
}


function DeleteColumn(rowkey,name){
    ColumnName='PV:'+name;
    client
    .table('PVSimulator_test')
    .row(rowkey)
    .delete(ColumnName,(error,success)=>{
        assert.strictEqual(true,success);
    });
}



