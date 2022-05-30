
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
        const price = Math.floor(Math.random()*20)+10;
         const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores ea illo animi minima iusto. Placeat temporibus obcaecati magni. Reprehenderit qui molestiae accusamus enim accusantium recusandae fugit. Expedita quibusdam ea sit.",
             price   
        })
        await camp.save();
    }

}

seedDB().then(() => {
    mongoose.connection.close();
});