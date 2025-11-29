import User from "../../models/User.js";

let create = async (req, res, next) => {
  console.log(req.body);
  try {
    let response = await User.create(req.body);
    return res.status(201).json({
        name: response.name,
        id: response._id,
        role: response.role
    });
    
  } catch (error) {
    next(error);
  }
};

export default create;
