const mongoose = require('mongoose');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');
const cities = require('./cities');

//image: `https://picsum.photos/400?random=${Math.random()}`,

const db_url = process.env.DB_URL;
//'mongodb://localhost:27017/yelp-camp'       process.env.DB_URL;
mongoose.connect(db_url);


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '670194b2b86a0a987a296525',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius mollitia vitae numquam unde eveniet. Commodi, quas. Libero repellendus nostrum officiis hic, illo sed ducimus minima et sunt, similique consectetur fugiat.',
            price: Math.floor(Math.random() * 20) + 10,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dwyqg0bmj/image/upload/v1728304827/YelpCamp/ep9oxwnkrrlhr5r2b6ov.jpg',
                    filename: 'YelpCamp/lnq4q7jxjxjz0n1g5w2p'
                },
                {
                    url: 'https://res.cloudinary.com/dwyqg0bmj/image/upload/v1728231115/cactus_ju7vyo.jpg',
                    filename: 'YelpCamp/lnq4q7jxjxjz0n1g5w2p'
                }
            ]

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});