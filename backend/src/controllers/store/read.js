import Store from "../../models/Store.js";

const ReadS = async (req, res, next) => {
    try {
        let response = await Store.find()
        res.status(200).json({response})
    } catch (error) {
        next(error)
    }
}

export default ReadS
