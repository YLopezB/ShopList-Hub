import User from "../../models/User.js";

let validate = async (req, res, next) => {
  try {
    let response = await User.findById(req.body.id);
    if (response) return res.status(200).json(response);
    return res.status(200).json({ message: false });
  } catch (error) {
    next(error);
  }
};

export default validate;
