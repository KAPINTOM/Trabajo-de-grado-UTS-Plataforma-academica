const bcrypt = require("bcryptjs");

const passCrypt = {};

//Metodos de encriptado de contraseñas usando bcrypt

passCrypt.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

passCrypt.matchPassword = async (password, savedPassword) => {
  try {
    await bcrypt.compare(password, savedPassword);
  } catch (error) {
    console.log(error);
  }
};

module.exports = passCrypt;
