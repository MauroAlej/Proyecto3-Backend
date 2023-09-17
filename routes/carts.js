const {Router }= require('express')
const { getOneCartAllProduct, AddProductCart, createCart } = require('../controlers/carts')
const router = Router()

router.get('/:id', getOneCartAllProduct)
router.post('/:idCart/:idProd', AddProductCart)
router.post('/', createCart)


module.exports = router