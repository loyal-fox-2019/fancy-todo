const api = require("express").Router();

const express = require("express");
api.use(express.urlencoded({extended:true}));

const todosRouter = require("./todos");
const usersRouter = require("./users");

api.use('/todos',todosRouter);
api.use('/users',usersRouter);

module.exports = api;