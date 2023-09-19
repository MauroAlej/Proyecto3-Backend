


const { validationResult}= require("express-validator")
const userModel = require("../modals/users")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const transporter = require("../middleware/nodemailer");



const getAllUser = async(req,res)=>{
transporter
const allUser = await userModel.find()


res.status(200).json({msg:"se envian todos los usuarios", allUser})



}

const getOneUser = async (req,res)=>{


    const getUser = await userModel.findOne({_id: req.params.id})

res.json({msg: "usuario encontrado", getUser})

}



const createUser = async(req,res)=>{
const errors = validationResult (req)
console.log(errors)
if (!errors.isEmpty()) {
 return   res.status(422).json({msg: errors.array()})
    
}

    


    try {
        const body= req.body
 const userExist = await userModel.findOne({usuario:  body.usuario})

if(userExist){
return  res.status(400).json({msg: "si existe"})
}

const salt = await bcrypt.genSaltSync()
body.contrasenia = await bcrypt.hash(body.contrasenia, salt)
 
    const user = new userModel(body);

const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <emi.duarte643@gmail.com>', // sender address
    to: "emi.duarte643@gmail.com", // list of receivers
    subject: "bienvenido ✔", // Subject line
  
    html: "<b>hola nerea?</b>", // html body
  });

   console.log(info);


 await user.save()  
 


    res.status(201).json({msg: "usuario creado con exito",user, status:201})


    } catch (error) {
        console.log(error);
    }


    }
    const uptadeUser = async(req,res)=>{
        
try {
    const errors = validationResult (req)
    console.log(errors)
    if (!errors.isEmpty()) {
        res.status(422).json({msg: errors.array()})
        
    }
const uptadeUser= await userModel.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})

    res.status(200).json({msg:"usuario atualizado correctamente",uptadeUser}) 
} catch (error) {
    console.log(error);
}
         
        
        }
        const deleteUser = async(req,res)=>{
         
 await userModel.findByIdAndDelete({_id: req.params.id})
           
            res.json({msg:"se borro corretamente el usuario"})
            
            
            }

const logierUser= async(req,res)=>{
    const errors = validationResult (req)

if (!errors.isEmpty()) {
    res.status(422).json({msg: errors.array()})
    
}
try {
    const{usuario, contrasenia}= req.body

const userExist = await userModel.findOne({usuario})

if (!userExist) {
    res.status(400).json({msg: "usuario no existe"})

}

const passCheck = await bcrypt.compare(contrasenia,  userExist.contrasenia )
console.log(passCheck)



if (passCheck) {
const jwtPayload={
    usuario:{
        id : userExist._id,
        username: userExist.usuario
    }
}
console.log(userExist);
const token = jwt.sign(jwtPayload , process.env.SECRET_KEY)

userExist.token = token

 const userUptade = await userModel.findByIdAndUpdate({_id: userExist._id},userExist,{new: true}) 



    res.status(200).json({msg: "usuario legueado",userUptade})
}else{
    res.status(422).json({msg: "contraseña incorecta"})
}

}catch(error){
console.log(error);
}



}

const logoutUser = async(req,res)=>{
const userId = await userModel.findOne({_id: req.userLoginId})
console.log(userId);
userId.token = ""

const userLogout = await userModel.findByIdAndUpdate({_id: req.userLoginId},userId,{new: true})
console.log(userLogout);

res.status(200).json({msg :"usuario deslogueado"})

}

module.exports = {
    getAllUser,
    getOneUser,
    createUser,
    uptadeUser,
    deleteUser,
    logierUser,
    logoutUser
}