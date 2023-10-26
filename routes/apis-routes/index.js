const Router = require('express').Router();
const user = require('./user');
const thought = require('./thought');
Router.use('/user', user);
Router.use('/thought', thought);
module.exports = Router;