const fs = require("fs")
const { exec } = require('child_process')
const express = require("express");
const e = require("express");
const app = express();

const server = app.listen(21454,'0.0.0.0', () => {
    console.log("OpenJtalk HTTP API bind on "+server.address().address+":"+ + server.address().port);
});

app.get("/", async (req, res, next) => {
    let text = req.query.text
    let type = req.query.type
    let speed = req.query.speed
    let pitch = req.query.pitch
    if(!text){
        res.json({
            status:"error"
        })
        return
    }
    
    if(!type){
        type = "./openjtalk/mei/mei_normal.htsvoice"
    }else if(type == "mei_normal"){
        type = "./openjtalk/mei/mei_normal.htsvoice"
    }else if(type == "mei_sad"){
        type = "./openjtalk/mei/mei_sad.htsvoice"
    }else if(type == "mei_angry"){
        type = "./openjtalk/mei/mei_angry.htsvoice"
    }else if(type == "mei_bashful"){
        type = "./openjtalk/mei/mei_bashful.htsvoice"
    }else if(type == "mei_happy"){
        type = "./openjtalk/mei/mei_happy.htsvoice"
    }else if(type == "takumi_normal"){
        type = "./openjtalk/mei/takumi_normal.htsvoice"
    }else if(type == "takumi_sad"){
        type = "./openjtalk/mei/takumi_sad.htsvoice"
    }else if(type == "takumi_angry"){
        type = "./openjtalk/mei/takumi_angry.htsvoice"
    }else if(type == "takumi_bashful"){
        type = "./openjtalk/mei/takumi_bashful.htsvoice"
    }else if(type == "takumi_happy"){
        type = "./openjtalk/mei/takumi_happy.htsvoice"
    }else{
        type = "./openjtalk/mei/mei_normal.htsvoice"
    }

    if(!speed){speed = 0.8}

    if(!pitch){pitch = -0.5}

    const inTEMP = "./temp/"+Math.floor(Math.random() * ( 999999 - 100000 ) + 100000)
    const outTEMP = "./temp/"+Math.floor(Math.random() * ( 999999 - 100000 ) + 100000)
    fs.writeFileSync(inTEMP,text)
    const openjtalkCMD = `./openjtalk/open_jtalk -x ./openjtalk/dic -g 10 -m ${type} -r ${speed} -fm ${pitch} -ow ${outTEMP} ${inTEMP}`
    exec(openjtalkCMD, (err, stdout, stderr) => {
        console.log(err);
        console.log(stdout);
        console.log(`audio query => ${text} : ${type} : ${speed} : ${pitch}`);
        res.send(fs.readFileSync(outTEMP));
        fs.unlinkSync(inTEMP);
        fs.unlinkSync(outTEMP);
    })
});