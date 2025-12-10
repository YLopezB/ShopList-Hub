import Store from "../../models/Store.js";

const CreateS = async (req, res, next) => {
  try {
    let response = await Store.create(req.body);
    res.status(201).json({ response });
  } catch (error) {
    next(error);
  }
};

export default CreateS;
