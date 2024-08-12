const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
;


/**
 *  Customer Routes 
*/
router.get('/customer', customerController.customerMainPage);
router.get('/about', customerController.about);
router.get('/customer/add', customerController.addCustomer);
router.post('/customer/add', customerController.postCustomer);
router.get('/customer/view/:id', customerController.view);
router.get('/customer/edit/:id', customerController.edit);
router.put('/customer/edit/:id', customerController.editPost);
router.delete('/customer/edit/:id', customerController.deleteCustomer);

router.post('/customer/search', customerController.searchCustomers);







module.exports = router;