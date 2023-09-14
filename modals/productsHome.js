const {Schema, model } = require('mongoose')


const ProductHomeSchema = new Schema ({
    nombre:{
        type: String,
        required: true,
    },
    precio:{
        type: Number,
        required: true
    },
    estado:{
        type: String,
        required: true
    },
    detalle:{
        type: String,
        required: true
    },
    categoria:{
        type: String,
        required: true
    }

})

ProductHomeSchema.methods.toJSON = function () {
    const { _v,...productHome}= this.toObject()  
    
    return productHome
}

const productHomeModel = model('products-Home',ProductHomeSchema )
module.exports = productHomeModel