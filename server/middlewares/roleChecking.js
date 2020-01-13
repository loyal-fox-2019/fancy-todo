const roleChecking = (req, res, next) => {
    if (req.role !== "Admin") {
        return res.status(401).json("You dont have authorized for this action");
    }
    next();
};

module.exports = roleChecking;