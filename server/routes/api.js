const api = require("express").Router();

const express = require("express");
api.use(express.urlencoded({extended:true}));

const todosRouter = require("./todos");
const usersRouter = require("./users");
const generateToken = require("../middlewares/generateToken");
const authenticate = require("../middlewares/authentication");

api.post('/signin',generateToken);

api.use('/users',usersRouter);

api.use('/todos',authenticate);
api.use('/todos',todosRouter);


module.exports = api;