const checkOwnerShip = async (req, res, next) => {
    const  {id: _id} = req.params;
    try {
        if (_id === req.userId) {
            next();
        } else {
            res.status(403).json({message: "Forbidden"});
        }
    } catch (error) {
        res.status(403).json({message: "Forbidden"});
    }
}

export default checkOwnerShip;