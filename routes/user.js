
const {Router} = require("express")
const router =  Router()
const { check } = require("express-validator")


const{getAllUser, createUser, uptadeUser, deleteUser,getOneUser, logierUser,logoutUser}= require("../controllers/users")
const auth = require("../middleware/auth")

router.get ("/logout",auth("user"),logoutUser )
router.get ("/:id",getOneUser )
router.get ("/",
getAllUser )


router.post("/",[
    check("nombre","esta vacio el nombre").notEmpty(),
    check("nombre","minimo 3 letras").isLength({min: 3}),
    check("usuario","esta vacio el nombre").notEmpty(),
    check("usuario","minimo 3 letras").isLength({min: 3}),
 /*    check("usuario","usuario tipo email").isEmail(), */
    check("contrasenia","esta vacio el nombre").notEmpty(),
    check("contrasenia","minimo 3 letras").isLength({min: 8})
],createUser)


router.post("/login", [ 
    check("usuario","esta vacio el nombre").notEmpty(),
check("contrasenia","esta vacio la contraseña").notEmpty(),
],logierUser)


router.put ("/:id",[
    check ("id" ,"id no cresponde a mongo").isMongoId()
],


uptadeUser)
router.delete ("/:id",deleteUser)


module.exports = router