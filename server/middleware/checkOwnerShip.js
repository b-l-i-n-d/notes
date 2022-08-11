const checkOwnerShip = async (req, res, next) => {
    const { id: _id } = req.params;
    try {
        if (_id === req.userId) {
            return next();
        }
        return res.status(403).json({ message: 'Forbidden' });
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden' });
    }
};

export default checkOwnerShip;
