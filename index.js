const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const RoutesForAPI = require('./routes')
const mongoEstdCon = require("./config/db-connection").mongoDbClientConnect



app.use(express.urlencoded({extended: true})); // this will decreapt the sent data through URL
app.use(express.json()) // this will enable the body pasrser for JSON type
app.use((req, res, next)=>{
  // console.log('Recieved', req)
  // res.setHeader("Access-Control-Allow-Origin", "same-origin");
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.set('Access-Control-Allow-Origin', 'same-origin');
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )
  res.setHeader("Content-Type", "application/json")
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, PATCH, DELETE, OPTIONS"
  );
  next();
})

app.use('/api', RoutesForAPI)

app.listen(8000, ()=>{
  console.log("We are running at 8000")
})
