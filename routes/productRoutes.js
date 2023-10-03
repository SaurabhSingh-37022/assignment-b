const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 

router.post('/select-product/:productId', async (req, res) => {
    const productId = req.params.productId;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        
        if (!req.session.selectedProducts) {
            req.session.selectedProducts = [];
        }
        req.session.selectedProducts.push(product);
        res.json({ message: 'Product selected successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
