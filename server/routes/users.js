const usersRouter = require("express").Router();

const express = require("express");
usersRouter.use(express.urlencoded({extended:true}));

const UserController = require("../controllers/userController");

function checkUserId(req,res,next)
{
    if(req.params.id == req.userInfo.id)
    {
        next();
    }
    else
    {
        res.status(403).json({
            error: "Forbidden"
        });
    }
}

usersRouter.post('/',(req,res) => {
    //res.send('add User');
    UserController.addUser(req,res);
});

usersRouter.get('/',(req,res) => { // not to be used in any way
    res.send('User list');
    //UserController.showAllUsers(req,res);
});

usersRouter.use('/',checkUserId);

usersRouter.get('/:id',(req,res) => {
    //res.send('User detail');
    UserController.showUserById(req,res);
});

usersRouter.put('/:id',(req,res) => {
    //res.send('update User');
    UserController.updateUser(req,res);
});

usersRouter.patch('/:id',(req,res) => {
    //res.send('update User');
    UserController.updateUser(req,res);
});

usersRouter.delete('/:id',(req,res) => {
    //res.send('delete User');
    UserController.deleteUser(req,res);
});

module.exports = usersRouter;