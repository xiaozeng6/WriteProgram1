
//out put the six values of PV
function PVSimulator(){
    function PVInformation(channelId,name,val,nanosecs,severity,status){
        this.channelId=channelId;
        this.name=name;
        this.val=val;
        this.nanosecs=nanosecs;
        this.severity=severity;
        this.status=status;
    }
    function randomName()
    {
        let str="",arr=['Example:ai1','Example:ai2','Example:ai3','Example:ai4','Example:ai5','Example:ai6','Example:ai7'];
        var pos=Math.round(Math.random()*(arr.length-1));
        str=arr[pos];
        return str;
    }
    var PVContent=new PVInformation(Math.round(Math.random()*100),randomName(),Math.round(Math.random()*1000),Date.now(),Math.round(Math.random()*10),Math.round(Math.random()*10))
    return PVContent;
}
module.exports.channelId=PVSimulator().channelId;
module.exports.name=PVSimulator().name;
module.exports.val=PVSimulator().val;
module.exports.nanosecs=PVSimulator().nanosecs;
module.exports.severity=PVSimulator().severity;
module.exports.status=PVSimulator().status;
