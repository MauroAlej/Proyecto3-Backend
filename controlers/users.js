
const transporter = require("../middleware/nodemailer")
const UserModel = require("../modals/users")

const getAllUser = async(req, res)=>{
const allUsers = await UserModel.find()/* me devuelve todo los ususarios */
    res.json({msg:"se envian todos los ususarios", allUsers})
}
const getOneUser = async (req,res)=>{
  const id = req.params.id 
  const getUser = await UserModel.findOne({_id: id})
 

  res.json({msg:"usuario encontrado", getUser})
}

const createUser = async(req, res)=>{
try {
    const body = req.body

const userExist = await UserModel.findOne({usuario : body.usuario})
if (userExist) {
   return  res.status(400).json({msg: "el usuario ya existe"})
}

const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <emi.duarte643@gmail.com>', // sender address
    to: "emi.duarte643@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
   
  });
const user = new UserModel(body)



 await user.save()
res.json({msg:"usuario creado correctamente", user})

} catch (error) {
    console.log(error);
}

}
const uptadeUser = async(req, res)=>{
 
    const uptadeUser= await UserModel.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})

    res.status(200).json({msg:"usuario atualizado correctamente",uptadeUser}) 
}
const deleteUser = async(req, res)=>{
   
    await UserModel.findByIdAndDelete({_id: req.params.id})
    res.json({msg:"peticion get"},)
}

const logierUser= async(req,res)=>{
    const errors = validationResult (req)

if (!errors.isEmpty()) {
    res.status(422).json({msg: errors.array()})
    
}
try {
    const{usuario, contrasenia}= req.body

const userExist = await UserModel.findOne({usuario})

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

 const userUptade = await UserModel.findByIdAndUpdate({_id: userExist._id},userExist,{new: true}) 



    res.status(200).json({msg: "usuario legueado",userUptade})
}else{
    res.status(422).json({msg: "contraseña incorecta"})
}

}catch(error){
console.log(error);
}



}










const logoutUser = async(req,res)=>{
    const userId = await UserModel.findOne({_id: req.userLoginId})
    console.log(userId);
    userId.token = ""
    
    const userLogout = await UserModel.findByIdAndUpdate({_id: req.userLoginId},userId,{new: true})
    console.log(userLogout);
    
    res.status(200).json({msg :"usuario deslogueado"})
    
    }




module.exports= {
    getAllUser,  createUser, uptadeUser, deleteUser,getOneUser,logoutUser,logierUser
}