import User from "../models/User.js";

const existAccount = async (req, res, next) => {
  try {
    let account = await User.findOne({ email: req.body.email });
    if (account) {
      req.user = {
        id: account.id,
        role: account.role,
        password: account.password,
      };
      return next();
    }
    return res.status(400).json({
      message: "el correo ya existe",
    });
  } catch (error) {
    next();
  }
};

export default existAccount;
