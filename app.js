const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const Campground = require("./models/Campground");

mongoose.connect("mongodb://0.0.0.0:27017/yelpcamp")
.then(console.log("db conncected"))
.catch((er)=>{
console.log(er.message)
});

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))







app.get('/',(req,res) =>{
    res.render('home')
})
app.get('/campground', async (req,res)=>{
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index',{campgrounds})
})
app.get('/campground/:id',async(req,res)=>{
    
})






app.listen(3000,()=>{
    console.log("server started at 3000")
})