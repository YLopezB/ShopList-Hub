import Product from "../../models/Product.js";

const ReadP = async (req, res, next) => {
  try {
    let response = await Product.find();
    return res.status(200).json({
      response,
    });
  } catch (error) {
    next(error);
  }
};

export default ReadP;
