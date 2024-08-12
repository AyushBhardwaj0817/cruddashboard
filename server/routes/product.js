const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 *  Product Routes 
*/
router.get('/', productController.homepage);
router.get('/about', productController.about);
router.get('/add', productController.addProduct);
router.post('/add', productController.postProduct);
router.get('/view/:id', productController.view);
router.get('/edit/:id', productController.edit);
router.put('/edit/:id', productController.editPost);
router.delete('/edit/:id', productController.deleteProduct);

router.post('/search', productController.searchProducts);
// create product
// router.post('/create/product',productController.postProduct);





module.exports = router;