const { Router } = require("express")
const router = Router()
const { check } = require("express-validator")


const { getAllUsers, createUser, updateUser, deleteUser, getOneUsers, logierUser, logoutUser } = require("../controlers/users")
const auth = require("../middleware/auth")

router.get("/logout", auth("user"), logoutUser)
router.get("/:id", auth(['admin', 'user']) , getOneUsers)
router.get("/", auth("admin"), getAllUsers)


router.post("/", [
    check("nombre", "esta vacio el nombre").notEmpty(),
    check("nombre", "minimo 3 letras").isLength({ min: 3 }),
    check("usuario", "esta vacio el nombre").notEmpty(),
    check("usuario", "minimo 3 letras").isLength({ min: 3 }),
    /*    check("usuario","usuario tipo email").isEmail(), */
    check("contrasenia", "esta vacio el nombre").notEmpty(),
    check("contrasenia", "minimo 3 letras").isLength({ min: 8 })
], createUser)


router.post("/login", [
    check("usuario", "esta vacio el nombre").notEmpty(),
    check("contrasenia", "esta vacio la contraseña").notEmpty(),
], logierUser)


router.put("/:id", [
    check("id", "id no cresponde a mongo").isMongoId()
], auth("admin"), updateUser)
router.delete("/:id", auth("admin"), deleteUser)


module.exports = router