const express = require('express')
const router = express.Router()
const{ getAllProductsHome, getOneProductHome, createProductHome, updateProductHome, deleteProductHome }= require('../controlers/productsHome')
const auth = require('../middleware/auth')
const { check } = require('express-validator')

router.get('/', getAllProductsHome)
router.get('/:id',getOneProductHome)

router.post('/', 
[
    check('nombre', 'campo NOMBRE vacio').notEmpty(),
    check('precio', 'campo PRECIO vacio').notEmpty(),
    check('codigo', 'campo CODIGO vacio').notEmpty(),

], auth('admin'), createProductHome)
router.put('/:id', [
    check('nombre', 'campo NOMBRE vacio').notEmpty(),
    check('precio', 'campo PRECIO vacio').notEmpty(),
    check('codigo', 'campo CODIGO vacio').notEmpty(),

], auth('admin'), updateProductHome)
router.delete('/:id', auth('admin'), deleteProductHome)

module.exports= router
