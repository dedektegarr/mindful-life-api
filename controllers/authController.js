const { createUserAccount } = require("../services/authService");

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await createUserAccount(email, password);
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Registrasi berhasil",
      data: {
        id: user.id,
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup };
