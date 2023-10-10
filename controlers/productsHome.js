const ProductModel = require('../modals/productsHome')
const cloudinary = require('../helpers/cloudinary')

const getAllProductsHome = async (req, res)=> {
    try {
        const getAllProd = await ProductModel.find()
        res.status(200).json({msg: 'Se envian los productos',getAllProd})
        
    } catch (error) {
        console.log(error)
        throw new Error ('No se encontraron los productos')
    }
    
}

const getOneProductHome = async (req, res)=> {
    try {
        const getOneProd = await ProductModel.findOne({_id: req.params.id})
        res.status(200).json({msg: 'Producto encontrado',getOneProd})
    } catch (error) {
        console.log(error)
        
    }
    

}

const createProductHome = async (req, res)=> {
    try {
        const newProd = new ProductModel(req.body)
        await newProd.save()
        res.status(201).json({msg: 'Se creo el producto correctamente',newProd})
    } catch (error) {
        console.log(error)
    }
   

}

const updateProductHome = async (req, res)=> {
    try {
        const updateProd= await ProductModel.findByIdAndUpdate({_id: req.params.id},req.body,{new:true})
        res.status(200).json({msg: 'producto actualizado correctamente ',updateProd})
    } catch (error) {
        console.log(error)
    }
    

}

const deleteProductHome = async (req, res)=> {
    try {
        await ProductModel.findByIdAndDelete({_id: req.params.id})
        res.status(200).json({msg: 'producto eliminado correctamente',})
    } catch (error) {
        console.log(error)
    }
    

}

const productImage = async(req, res) =>{
    try {
        
        const product = await ProductModel.findOne({_id: req.params.idProduct})
        const response = await cloudinary.uploader.upload(req.file.path)
        const urlImageCloud = response.secure_url
        product.imagen = urlImageCloud

        const productUpdate = await ProductModel.findByIdAndUpdate({_id : req.params.idProduct}, product,{new:true})
        res.status(200).json(productUpdate)
    } catch (error) {
        console.log (error)
    }
}

module.exports= {
    getAllProductsHome,
    getOneProductHome,
    createProductHome,
    updateProductHome,
    deleteProductHome,
    productImage
}