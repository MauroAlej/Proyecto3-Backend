const cartModel = require("../modals/cart")
const productHomeModel = require("../modals/productsHome")

const getOneCartAllProduct = async (req, res) =>{
    try {
        const getCart = await cartModel.findOne({_id: req.params.id})
        res.status(200).json({msg: 'Carrito encontrado', getCart})
    } catch (error) {
        console.log(error)
    }
}

const AddProductCart = async (req, res) =>{
    try {
        const getCart = await cartModel.findOne({_id: req.params.idCart})
        const getProd = await productHomeModel.findOne({_id: req.params.idProd})
        
        const prodExist = getCart.products.filter((prod) => prod._id == req.params.idProd )
        console.log(prodExist.length)
        if(prodExist.length > 0){
            return res.status(400).json({msg: 'Producto ya existente en el carrito', status: 400})
        }else{
            console.log('Else')
        }

        getCart.products.push(getProd)
        await getCart.save()
        
        res.status(200).json({msg: 'Producto se cargo correctamente', getCart})

    } catch (error) {
        console.log (error)
    }
}

const createCart = async (req, res) => {
    try {
        const newCart = new cartModel(req.body)
        await newCart.save()
        res.status(201).json({msg: 'Carrito creado correctamente', newCart})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    AddProductCart,
    getOneCartAllProduct,
    createCart
}