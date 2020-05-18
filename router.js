const express = require('express')
var router = express.Router();
var prodCtrl = require('./controllers/product.controller')

router.get('/',function(req,res){
    return res.end('Api working');
})

router.get('/product',prodCtrl.getProductAll)
router.get('/product/:id',prodCtrl.getProductDetail)
router.post('/product',prodCtrl.createProduct)
router.put('/product/:id',prodCtrl.updateProduct)
router.delete('/product/:id',prodCtrl.deleteProduct)

module.exports = router