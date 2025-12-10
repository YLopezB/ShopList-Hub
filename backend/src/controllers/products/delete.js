import Product from "../../models/Product.js";

let DeleteP = async (req, res, next) => {
  try {
    let response = await Product.deleteOne({ _id: req.body.id });
    res.status(200).json({
      tittle: "Producto eliminado",
      message: `Producto ${response.name} ha sido eliminado con exito`,
    });
  } catch (error) {
    next(error);
  }
};

export default DeleteP;
