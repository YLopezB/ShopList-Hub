import Store from "../../models/Store.js";

const DeleteS = async (req, res, next) => {
  try {
    let response = await Store.deleteOne({ _id: req.body.id });
    return res.status(200).json({ response });
  } catch (error) {
    next(error);
  }
};

export default DeleteS;
