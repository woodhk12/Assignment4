// Dependencies
var express = require('express');
var router = express.Router();
// Models
var Product = require('../models/product');
// Routes
router.route('/post').post(function (req, res) {
    var p = new Product();
    p.id = req.body.id;
    p.name = req.body.name;
    p.sku = req.body.sku;
    p.price = req.body.price;
    p.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.send({ message: 'Product Created !' })
    })
});

router.route('/find/:product_id').get(function (req, res) {

    Product.find({id: req.params.product_id}, function (err, prod) {
        if (err)
            res.send(err);
        res.json(prod);
    });
});

router.route('/update/:product_id').put(function (req, res) {

    Product.findOne({id: req.params.product_id}, function (err, prod) {
        if (err) {
            res.send(err);
        }
        prod.name = req.body.name;
		prod.sku = req.body.sku;
		prod.price = req.body.price;
        prod.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Product updated!' });
        });

    });
});

router.route('/delete/:product_id').delete(function (req, res) {

    Product.findOne({id: req.params.product_id}, function (err, prod) {
    if (err) {
        return;
    }
		prod.remove(function (err) {
        // if no error, your model is removed
		res.json({ message: 'Product deleted!' });
    });
	});
	

});

// Return router
module.exports = router;