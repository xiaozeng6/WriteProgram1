const schedule=require('node-schedule');
const moment=require('moment'); 
const fs=require('fs');
const os=s=require('os');
var LTS='/history/LTS/'+os.hostname()+'/';
var STS='/history/STS/'+os.hostname()+'/';
var HBase='/history/HBase/'+os.hostname()+'/';
function DeleteFile()
{
    day2=moment().subtract(2,'day').format('YYYY-MM-DD');
    Dir=STS+day2;
    // console.log(Dir);
    function DeleteFolder(Dir){
        var fiels=[];
        if(fs.existsSync(Dir)){
            files=fs.readdirSync(Dir);
            files.forEach(function(file,index){
                var curPath=Dir+'/'+file;
                if(fs.statSync(curPath).isDirectory()){
                    deleteFolder(curPath);
                }else{
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(Dir);
        }
    };
    DeleteFolder(Dir);
    // console.log(day2);
}
const DeleteFileSchedule=()=>{
    //delete the file at 00:00:30 every day
    schedule.scheduleJob('30 0 0 * * *',()=>{
        DeleteFile();
    });
}
