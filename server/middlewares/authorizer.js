module.exports = (req,res,next) => {
    if(req.username !== "admin"){
        next("not-admin")
    }
    else(next)
};
