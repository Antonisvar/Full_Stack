const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => console.log('Connected to MONGO DB!'))
    .catch(error => {
        console.log('Error connecting to MONGO DB!');
        console.log(error.message);
    });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//can add more categories
const categories = ['fruit', 'vegetable', 'dairy'];
app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category });
        res.render('products/index', { products, category });
    } else {
        const products = await Product.find({});
        res.render('products/index', { products, category: 'All' });
    }
    //console.log(products);
})

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
});

app.post('/products', async (req, res) => {
    const newproduct = new Product(req.body);
    //console.log(req.body);
    await newproduct.save();
    res.redirect(`/products/${newproduct._id}`);
});

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    //console.log(product);
    res.render('products/show', { product });
});

app.get('/products/:id/edit', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render(`products/edit`, { product, categories });
});

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
    // console.log(req.body);
    // res.send('PUT');
})

app.delete('/products/:id', async (req, res) => {
    //res.send('DELETE');
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

