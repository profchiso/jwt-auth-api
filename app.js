const express = require('express');
const jwt = require('jsonwebtoken');


const app =express();



app.get('/api',(req,res)=>{
    res.json({
        message:"welcome to the home route"
    })
})

app.post('/api/post',verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretkey',(err,authorizationData)=>{
        if(err){
            res.sendStatus(403)
        }else{
            res.json({
                message:"post added",
                status:201,
                authorizationData
    
            })
        }
    })
})

app.post('/api/login',(req,res)=>{
    const user={
        name:"chinedu",
        email: "chinedu@gmail.com",
        password:"password"
    }
    jwt.sign({user:user},"secretkey",{expiresIn:"2 days"},(err,token)=>{
        if(err){
            res.json(err)
        }
        res.json({
            token:token
        })
    })

})
function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !=='undefined'){
        const bearer = bearerHeader.split(" ")
        const bearerToken=bearer[1];
        req.token=bearerToken;
        next();

    }else{
        res.sendStatus(403);
    }


}

app.listen(3000,()=>{console.log("app listening to port 3000")});

