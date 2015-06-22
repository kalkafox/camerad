var plucker = require('image-plucker'),spawn = require('child_process').spawn,
    fs = require('fs'), butter = [],
    config = {
        auth: {
            user:"guest",
            pass:"Guest12"
        },
        host:"10.208.0.16",
        port:88
    };
function paulaDeen(id){
    var path="rtsp://";
    if(config.auth.user!=""){
        path+=config.auth.user;
        if(config.auth.pass!="") path+=":"+config.auth.pass;
        path+="@";
    }
    path+=config.host;
    if(path.port!=80) path+=":"+config.port;
    var ffmpeg = spawn('./bin/ffmpeg', ['-i', path+"/"+id, '-vcodec', 'png', '-f', 'image2pipe', '-']);
    butter[id]={png:"",jpg:""};
    plucker(config, ffmpeg.stdout, 'png', function(err, image){butter[id].png=image;});
    plucker(config, ffmpeg.stdout, 'jpg', function(err, image){butter[id].jpg=image;});
    this.kill = function(){ffmpeg.kill();}
    this.getButterPng = function(){return butter[id].png;}
    this.getButterJpg = function(){return butter[id].jpg;}
    console.log("Writer started for track ["+id+"].");
}

setInterval(function(){
    for(var i in butter)
        fs.writeFile('streams/stream.'+i+'.png', butter[i].png);
        fs.writeFile('streams/stream.'+i+'.jpg', butter[i].jpg);
},5000);

var theRopes = new paulaDeen("videoMain");