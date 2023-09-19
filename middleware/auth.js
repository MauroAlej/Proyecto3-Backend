const jwt = require("jsonwebtoken");
const userModel = require("../modals/users")

module.exports = (role) => async(req,res,next)=>{
try {


    const token = req.header("authorization").replace("Bearer " , "")


    const  verifyToken = jwt.verify(token, process.env.SECRET_KEY)

    console.log(verifyToken);


    const userLogin = await userModel.findOne({_id : verifyToken.usuario.id})
  
    console.log(userLogin);
if (userLogin && userLogin.role === role) {
req.userLoginId= userLogin._id

    next()
    
}else{
    res.status(401).json({msg: "no autorizado"})
}
  
    
} catch (error) {
    res.status(500).json({msg: "token invalido"})
}}

