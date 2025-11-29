import bcryptjs from "bcryptjs";

const validatePassword = (req, res, next) => {
  try {
    let passwordBody = req.body.password
    let passwordUser = req.user.password
    let compare = bcryptjs.compareSync(passwordBody, passwordUser)
    if(compare)
        return next()
    return res.status(400).json({
        message: "contraseña invalida"
    })
  } catch (error) {
    console.log(error);
    next(error)
  }
};

export default validatePassword;
