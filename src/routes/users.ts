import express, {Request, Response, NextFunction } from 'express';
//var express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req:Request, res:Response, next:NextFunction) {
  res.send('respond with a resources');


});




export default  router;
