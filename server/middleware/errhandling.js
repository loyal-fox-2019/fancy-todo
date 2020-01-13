class Errorhandle{
    static err(req,res){
        res.status(500).json({
            message: 'Server Timeout'
        })
    }
}

module.exports = Errorhandle