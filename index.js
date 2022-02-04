const mongoose = require('mongoose');
const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();

function startServer(){
    app.listen(PORT, ()=> {
        console.log("server start");
    });
}

async function start(){
    try{
        await mongoose.connect("",{
            useNewUrlParser:true,
            useFindAndModify:false,
        });
        startServer();
    }
    catch(ex){
        console.log(ex);
    }
}
start();