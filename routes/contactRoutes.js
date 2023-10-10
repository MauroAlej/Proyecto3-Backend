const express = require("express");
const routerContact = express.Router();
const { check, validationResult } = require("express-validator");
const contactController = require("../controllers/contactController");

routerContact.post(
  "/send",
  [
    check("user")
      .isAlpha()
      .withMessage("Por favor ingrese solo letras y espacios"),
    check("email")
      .isEmail()
      .withMessage("Por favor ingrese un correo electrónico válido"),
    check("message")
      .isLength({ min: 5 })
      .withMessage("El mensaje debe tener al menos 5 caracteres"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      await contactController.sendContactForm(req, res);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      res
        .status(500)
        .json({ success: false, message: "Error al enviar el formulario" });
    }
  }
);

module.exports = routerContact;
