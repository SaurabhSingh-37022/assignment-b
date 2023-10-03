const express = require("express");
const app = express();
const cors = require('cors');





const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const authJwt=require('./routes/auth')


require("dotenv").config();
const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());
app.use(authJwt());


const todoRoutes = require("./routes/todos");


app.use("/api/v1", todoRoutes);



app.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`);
})


const dbConnect = require("./config/database");
dbConnect();


app.get("/", (req,res) => {
    res.send(`<h1> This is HOMEPAGE</h1>`);
})




const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
});
const Product = mongoose.model('Product', ProductSchema);


app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: false,
}));


app.use(passport.initialize());
app.use(passport.session());


const User = require('./models/User'); 


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.post('/select-product/:productId', (req, res) => {
    const productId = req.params.productId;

    Product.findById(productId, (err, product) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        
        if (!req.session.selectedProducts) {
            req.session.selectedProducts = [];
        }
        req.session.selectedProducts.push(product);
        res.json({ message: 'Product selected successfully' });
    });
});


app.get('/my-products', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const selectedProducts = req.session.selectedProducts || [];
    res.json(selectedProducts);
});
