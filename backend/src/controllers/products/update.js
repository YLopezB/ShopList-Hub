import Product from "../../models/Product.js";

let UpdateP = async (req, res, next) => {
  try {
    let response = await Product.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
    });
    if (!response) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    return res.status(200).json({
      message: `Producto ${response.name} actualizado con éxito`,
    });
  } catch (error) {
    next(error);
  }
};

export default UpdateP;
