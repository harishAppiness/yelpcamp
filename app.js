const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const {cmpgroundSchema, reviewSchema} = require('./schemas.js');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const Campground = require("./models/Campground");
const methodOverride = require("method-override");
const Review = require('./models/review');
const review = require("./models/review");
const campgrounds = require('./routes/campgrounds');

mongoose.connect("mongodb://0.0.0.0:27017/yelpcamp")
    .then(console.log("db conncected"))
    .catch((er) => {
        console.log(er.message)
    });

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


const validateReview = (req, res, next) =>{
    const{error}= reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el=> el.message).join(',')
        throw new ExpressError(msg,400)
    }else{
        next();
    }
}

app.use('/campgrounds',campgrounds)



    app.get('/', (req, res) => {
        res.render('home')
    })
  
    app.post('/campgrounds/:id/reviews',catchAsync(async (req, res) =>{
        const campground = await Campground.findById(req.params.id);
        const review = new Review(req.body.review); 
        campground.reviews.push(review);
        await review.save();
        await campground.save();
        res.redirect(`/campgrounds/${campground._id}`);
    }))
    app.delete('/campgrounds/:id/reviews/:reviewId',catchAsync(async(req,res)=>{
        const{id, reviewId}= req.params;
        await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
        await Review.findByIdAndDelete(reviewId);
        res.redirect(`/campgrounds/${id}`);
    }))
 

    app.all('*', (req, res, next) => {
        next(new ExpressError('page not found', 404))
    })

    app.use((err, req, res, next) => {
        const { statusCode = 500 } = err;
        if (!err.message) err.message = ' oh no, something went wrong'
        res.status(statusCode).render('error', { err });
    })

    
    app.listen(3000, () => {
        console.log("server started at 3000")
    })