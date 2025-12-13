import Store from "../../models/Store.js";

const UpdateS = async (req, res, next) => {
  let { id } = req.body;
  try {
    let response = await Store.findByIdAndUpdate(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export default UpdateS;
