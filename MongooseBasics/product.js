const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
    .then(() => {
        console.log("Mongoose connected")
    }).catch(err => {
        console.log("Mongoose connection error", err)
    });

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be positive']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
});

productSchema.methods.greet = function () {
    console.log("Hello")
    console.log(`- from ${this.name}`)
}

productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();
}

productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
}

productSchema.statics.fireSale = function () {
    return this.updateMany({}, { onSale: true, price: 0 });
}

const Product = mongoose.model('Product', productSchema);

Product.fireSale().then(res => console.log(res));

// const findProduct = async () => {
//     const foundProduct = await Product.findOne({ name: 'Tire pump' });
//     console.log(foundProduct)
//     await foundProduct.toggleOnSale();
//     console.log(foundProduct)
//     await foundProduct.addCategory('Outdoors');
//     console.log(foundProduct)
// }



//findProduct();


// const bike = new Product({ name: 'Tire pump', price: 19.50, categories: ['Cycling'] });
// bike.save()
//     .then(data => {
//         console.log("It worked")
//         console.log(data)
//     })
//     .catch(err => {
//         console.log("Error")
//         console.log(err)
//     })

// Product.findOneAndUpdate({ name: 'Tire pump' }, { price: 20 }, { new: true, runValidators: true })
//     .then(data => {
//         console.log("It worked")
//         console.log(data)
//     })
//     .catch(err => {
//         console.log("Error")
//         console.log(err)
//     })

