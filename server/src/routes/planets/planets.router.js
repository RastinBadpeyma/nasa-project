const express  = require('express');

const planetsRouter = express.Router();

const {
   getAllPlanets
} = require('./planets/planetsRouter');

planetsRouter:get('/planets' , getAllPlanets);

module.exports = planetsRouter;