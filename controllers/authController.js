const { createUser } = require("../services/authService");
const { body, validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const { query, collection, where, getDocs } = require("firebase/firestore");
const { db } = require("../config/firebase");
const { validationError } = require("../helpers/validationError");

const validateSignup = [
  body("name").notEmpty().withMessage("Nama tidak boleh kosong"),
  body("username")
    .custom(async (value) => {
      const q = query(
        collection(db, "users"),
        where("username", "==", value?.toLowerCase())
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        throw new Error("Username sudah terdaftar");
      }
    })
    .isLength({ min: 3 })
    .withMessage("Username harus memiliki minimal 3 karakter")
    .notEmpty()
    .withMessage("Username tidak boleh kosong")
    .toLowerCase(),
  body("email")
    .custom(async (value) => {
      const q = query(
        collection(db, "users"),
        where("email", "==", value?.toLowerCase())
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        throw new Error("Email sudah terdaftar");
      }
    })
    .isEmail()
    .withMessage("Harap masukkan email yang valid")
    .notEmpty()
    .withMessage("Email tidak boleh kosong")
    .toLowerCase(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password harus memiliki minimal 6 karakter")
    .notEmpty()
    .withMessage("Password tidak boleh kosong"),
];

const signup = async (req, res, next) => {
  // Check validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      statusText: "error",
      status: 400,
      errors: validationError(errors.array()),
    });
  }

  const { name, username, email, password } = matchedData(req);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
      name,
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      statusText: "success",
      status: 201,
      message: "Registrasi berhasil",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup: [...validateSignup, signup] };
