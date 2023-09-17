const express = require('express')
const router = express.Router()
const{ getAllProductsHome, getOneProductHome, createProductHome, updateProductHome, deleteProductHome }= require('../controlers/productsHome')

router.get('/',getAllProductsHome)
router.get('/:id',getOneProductHome)

router.post('/',createProductHome)
router.put('/:id',updateProductHome)
router.delete('/:id',deleteProductHome)

module.exports= router
