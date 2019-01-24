const pvProto=require('./EPICSEvent_pb.js');
const fs=require('fs');
const path=require('path');
const PVSimulator=require('./PVSimulator.js');
const storePV=new pvProto.FieldValue();
const moment=require('moment'); 
// var PVSim=PVSimulator;
// console.log(PVSimulator);
// console.log(PVSimulator.name);
// console.log(PVSimulator.nanosecs);
// console.log(PVSimulator.channelId);

//ProtoSerialize,return the serialize
function ProtoSerialize()
{
   storePV.setName(PVSimulator.name);
   storePV.setVal(PVSimulator.val); 
   storePV.setChannel(PVSimulator.channelId);
   storePV.setNano(PVSimulator.nanosecs);
   storePV.setSeverity(PVSimulator.severity);
   storePV.setStatus(PVSimulator.status);

   PVInformation=storePV.serializeBinary();
   return PVInformation;
//   console.log(PVInformation);
}
// var b=ProtoSerialize();
// console.log(b);
// var a=pvProto.FieldValue.deserializeBinary(b).getName();
// console.log(a);

//change the PVsIMulator to JSON 
function PV2JSON()
{
    return JSON.stringify(PVSimulator);
}
console.log(PV2JSON());

function getHostName()
{
    let os=require('os');
    return os.hostname();
}
// console.log(getHostName());

//this is the name of dir for STS
function date_today()
{
    date=new Date();
    year=date.getFullYear();
    month=date.getMonth()+1;
    day=date.getDate();
    FileName1=year+'-'+month+'-'+day;
    // dir=MainDirection+FileName;
    return FileName1;
}
//  console.log(date_today());
/*
function mkdirs(dirname,callback)
{
    fs.exists(dirname,function(exists){
        if (exists){
            callback();
        }
        else{
                mkdirs(path.dirname(dirname),function(){
                fs.mkdir(dirname,callback);
                console.log('make the dir '+dirname);
            });
        }
    });
}
mkdirs('/history/HBase/hadoop1/2019_1_13');
*/
function mkdirs(dirname){
    if(fs.existsSync(dirname)){
        return true;
    } else{
        if(mkdirs(path.dirname(dirname))){
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

function writefile(fileName,content)
{
    fs.appendFile(fileName,content+'\n',function(err){
        if(!err){

        }
    });
}

var LTS='/history/LTS/'+getHostName()+'/';
var STS='/history/STS/'+getHostName()+'/';
var HBase='/history/HBase/'+getHostName()+'/';
//write PB ---STS
for(var i=0;i<1000;i++)
{
    dirname=STS+moment().format('YYYY-MM-DD');
    mkdirs(dirname);
    var hour=new Date().getHours();
    var PV=ProtoSerialize();
    //  console.log(hour);
    var PVName=pvProto.FieldValue.deserializeBinary(PV).getName();
    // console.log(PVName);
    if (hour<12)
    {
        fileName=dirname+'/'+PVName+'_1.pb';
        writefile(fileName,PV);
    } else 
    {
        fileName=dirname+'/'+PVName+'_2.pb';
        writefile(fileName,PV);
    }
}
console.log('record done!');

//writeJSON ---HBase
for(var i=0;i<1000;i++)
{
    dirname=HBase+moment().format('YYYY-MM-DD');
    // console.log(HBase);
    mkdirs(HBase);
    var hour=new Date().getHours();
    PV=PV2JSON();
    // console.log(PV);
    if (hour<12)
    {
        fileName=dirname+'_1.JSON';
        writefile(fileName,PV);
    } else 
    {
        fileName=dirname+'_2.JSON';
        writefile(fileName,PV);
    }
}
console.log('JSON done')


module.exports=PV2JSON();