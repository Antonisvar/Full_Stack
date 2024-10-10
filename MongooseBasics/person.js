const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
    .then(() => {
        console.log("Mongoose connected")
    }).catch(err => {
        console.log("Mongoose connection error", err)
    });


const personSchema = new mongoose.Schema({
    first: String,
    last: String
});

personSchema.virtual('fullName').get(function () {
    return `${this.first} ${this.last}`
});

personSchema.pre('save', async function () {
    this.first = 'YO';
    this.last = 'MAMA';
    console.log("About to save!")
});

personSchema.post('save', async function () {
    console.log("Just saved!")
});

const Person = mongoose.model('Person', personSchema);

