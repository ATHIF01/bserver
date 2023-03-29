// import express and store in avariable
const express = require("express")

//import data service
const ds = require('./service/dataService')


//import jswt
const jwt=require("jsonwebtoken")


//app creation
const app = express()



//To convert alla data from json to js
app.use(express.json())



//middleware creaction
const jwtMiddleware=(req,res,next)=>{

    try{
//access data from request body
const token=req.headers['access_token']

//verify the token with secret key
const data =jwt.verify(token,"superkey123")

next()
}
catch{
    res.status(422).json({
        status:false,
        message:"please login",
        statusCode:404
    })
}
}





//resolve api


//register    -  post
//login       -  get
//deposit     -  patch
//withdraw    -  patch
//transaction -  get
//delete      -  delete



app.post("/register", (req, res) => {

     ds.register(req.body.acno, req.body.uname, req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)

     })

 
})



app.post("/login", (req, res) => {

     ds.login(req.body.acno, req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
 
     })

})



app.post("/deposit",jwtMiddleware, (req, res) => {

    const result = ds.deposit(req.body.acno, req.body.psw,req.body.amnt)
res.status(result.statusCode).json(result)
 
})



app.post("/withdraw",jwtMiddleware, (req, res) => {

    const result = ds.withdraw(req.body.acno, req.body.psw,req.body.amnt)
res.status(result.statusCode).json(result)
 
})


app.get("/transaction",jwtMiddleware, (req, res) => {

    const result = ds.getTransaction(req.body.acno)
res.status(result.statusCode).json(result)
 
})


app.listen(3000,()=>{
    console.log("server started at port 3000");
})









// app.get("/",(req,res)=>{
//     res.send('Get Method Working...')
// })


// app.post("/",(req,res)=>{
//     res.send('Post Method Working...')
// })

// app.put("/",(req,res)=>{
//     res.send('Put Method Working...')
// })


// app.patch("/",(req,res)=>{
//     res.send('Patch Method Working...')
// })



// app.delete("/",(req,res)=>{
//     res.send('Delete Method Working...')
// })


// //port set
// app.listen(3000,()=>{
//     console.log("Server started at  port 3000");
// })