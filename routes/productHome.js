const express = require('express')
const router = express.Router()
const{ getAllProductsHome, getOneProductHome, createProductHome, updateProductHome, deleteProductHome, productImage }= require('../controlers/productsHome')
const multer = require('../middleware/multer')

router.get('/',getAllProductsHome)
router.get('/:id',getOneProductHome)

router.post('/',createProductHome)
router.post('/image/:idProduct', multer.single('image') ,productImage)
router.put('/:id',updateProductHome)
router.delete('/:id',deleteProductHome)

module.exports= router
