import Product from "../../models/Product.js";

const createP = async (req, res, next) => {
    try {
        let response = await Product.create(req.body)
        res.status(201).json({response})
    } catch (error) {
        next(error)
        console.log(error);
        
    }
}

export default createP