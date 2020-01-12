module.exports = (err,req,res,next)=>{
    // console.log(err+' is the error message')
    switch (err) {
        case "user-exist":
            res.status(409).json({message: "email already exist"})
            break
        case "internal-server":
            res.status(500).json({message: "Internal server error"})
            break
        case "user-not-found":
            res.status(400).json({message: "User doesn't exist"})
            break
        case "not-admin":
            res.status(401).json({message: "Admin access required"})
            break
        case "not-admin":
            res.status(401).json({message: "Can't create account with email admin"})
            break
        case 'wrong-password':
            res.status(401).json({message: "Wrong password"})
            break
        case 'todo-not-found':
            res.status(400).json({message: "Todo not found"})
            break
        case err :
            if(err.message === 'jwt must be provided'){
                res.status(401).json({message: "invalid token"})
            }
            else if(err.name === 'ValidationError'){
                res.status(400).json({message: err.errors})
            }
            break
        default : 
            res.status(400).json(err)
    }
}
