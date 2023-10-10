const { validationResult } = require("express-validator");

const Contact = require("../models/Contact");

const contactController = {};

contactController.sendContactForm = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { user, email, message } = req.body;

  try {
    const newContact = new Contact({ user, email, message });
    await newContact.save();
    res.json({ success: true, message: "¡Formulario enviado!" });
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al enviar el formulario" });
  }
};

module.exports = contactController;
