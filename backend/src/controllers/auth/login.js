const login = async (req, res, next) => {
  try {
    return res.status(200).json({ id: req.user.id, role: req.user.role });
  } catch (error) {
    console.log(error);
    
    next(error);
  }
};

export default login;
