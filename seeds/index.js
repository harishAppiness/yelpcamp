
const mongoose = require('mongoose');
const Campground = require("../models/Campground");
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');

mongoose.connect("mongodb://0.0.0.0:27017/yelpcamp")
.then(console.log("db conncected"))
.catch((er)=>{
console.log(er.message)
});

const sample = array => array[Math.floor(Math.random() * array.length)];
const seedDB = async() =>{
    await Campground.deleteMany({});
    for(let i=0; i<50; i++){
        const random1000 = Math.floor(Math.random()*1000);
         const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();
    }

}

seedDB().then(() => {
    mongoose.connection.close();
});