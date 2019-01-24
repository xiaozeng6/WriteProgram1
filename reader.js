var pvProto=require('./EPICSEvent_pb.js');
var fs=require('fs');
var readline=require('readline');
var information;
//var readerstream=fs.createReadStream('./archiver/test.pb','UTF-8');
//var RealData=[];
//readerstream.on('open',function(fd){
//    console.log('begin to read.');
//});
//readerstream.on('data',function(data){
//RealData=data.split(',');
//console.log(RealData);
//var message=pvProto.FieldValue.deserializeBinary(new Uint8Array(RealData));
//console.log(pvProto.FieldValue.getName());
//console.log(message.getName(),message.getVal(),message.getTime());
//console.log(message);
//});
var rl=readline.createInterface({
    input:fs.createReadStream('./archiver/test.pb','UTF-8')
});
rl.on('line',(line)=>{
    EachLine=line.split(',');
//    console.log(EachLine);
    information=pvProto.FieldValue.deserializeBinary(new Uint8Array(EachLine));
    console.log(information.getName(),information.getVal(),information.getTime());
});