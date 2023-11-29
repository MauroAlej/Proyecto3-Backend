const {Router }= require('express')
const { getOneCartAllProduct, AddProductCart, createCart } = require('../controlers/carts')
const router = Router()
const auth = require('../middleware/auth')

router.get('/:id', auth('user'), getOneCartAllProduct)
router.post('/:idCart/:idProd', auth('user'), AddProductCart)
router.post('/', createCart)


module.exports = router