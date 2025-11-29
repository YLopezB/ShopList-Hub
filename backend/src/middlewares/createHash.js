import bcryptjs from 'bcryptjs'

const createHash = (req, res, next) => {
    let password = req.body.password
    let hashPassword = bcryptjs.hashSync(password, 10)
    req.body.password = hashPassword
    next()
}

export default createHash