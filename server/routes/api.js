const api = require("express").Router();

const express = require("express");
api.use(express.urlencoded({extended:true}));

const todosRouter = require("./todos");
const usersRouter = require("./users");
const generateToken = require("../middlewares/generateToken");
const generateTokenGoogle = require("../middlewares/generateTokenGoogle");
const verifyGoogleToken = require("../middlewares/verifyGoogleToken");
const authenticate = require("../middlewares/authentication");

api.post('/signin',generateToken);
api.post('/gsignin',verifyGoogleToken,generateTokenGoogle);

api.use('/users',usersRouter);

api.use('/todos',authenticate);
api.use('/todos',todosRouter);


module.exports = api;