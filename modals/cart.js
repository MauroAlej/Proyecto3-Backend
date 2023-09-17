const {  model, Schema} = require('mongoose')


const CartSchema = new Schema ({
    idUsuario: {
        type: String
    },
    products: []
})

CartSchema.methods.toJSON = function () {
    const { _v,...cart}= this.toObject()  
    
    return cart
}

const cartModel = model ('carts', CartSchema)
module.exports = cartModel