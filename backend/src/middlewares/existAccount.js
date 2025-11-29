import User from "../models/User.js";

const existAccount = async (req, res, next) => {
  console.log(req.body);
  try {
    let account = await User.findOne({ email: req.body.email });
    console.log(account);
    if(account){
        req.user = {
            id: account.id,
            role: account.role,
            password: account.password
        }
        console.log(req.user);
        return next()
    }
    return res.status(400).json({
        message: "el usuario no existe"
    })
  } catch (error) {
    console.log(error);
    next()
  }
};

export default existAccount
