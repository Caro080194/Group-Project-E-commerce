'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const PORT = process.env.PORT || 4000;

// CORS options to allow requests from frontend domain
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

//require the handlers
const { getProductsHandler, getProductHandler, getBrandsHandler, getLoginHandler, newUserHandler, createOrderHandler, getItemHandler, deleteItemHandler } = require("./handlers");

express()
  .use(cors(corsOptions))
  .use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('./server/assets'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  // PRODUCT ENDPOINTS___________________________________________________

  //  getProductsHandler -> returns all items from db
  .get('/products', getProductsHandler)

  //  getProductHandler -> returns specific item from db using _id
  .get("/products/:_id", getProductHandler)




  // USER ENDPOINTS___________________________________________________

  // newUserHandler -> posts a new user to db using id
  .post("/signUp", newUserHandler)
  // logInHandler -> retrieves user from db logs user in
  .post("/login", getLoginHandler)


  // ORDER ENDPOINTS___________________________________________________

  // createOrderHandler -> creates order from cart and adds to db
  .post("/checkout", createOrderHandler)
  // getItemHandler -> update the stock according to what the user added
  .patch("/products/:_id", getItemHandler)
  // deleteItemHandler -> update the stock if the user delete the item from his cart
  .patch("/checkout", deleteItemHandler)



  // getBrands -> retrieves all brands from db
  .get("/brands", getBrandsHandler)

  // 



  //_______________________________________________________________
  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
