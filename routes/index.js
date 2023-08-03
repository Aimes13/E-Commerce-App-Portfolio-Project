const express = require('express');
const {registerUser} = require('../controllers/register');
const {authenticateUser, logout} = require('../controllers/login');
const {getAllProducts, getProductsByCategory, getProductByName} = require('../controllers/products');
const {newCart, addProductToCart, removeProductFromCart, getProductsFromCart, placeOrder} = require('../controllers/cart');
const {getUserById, /*updateUser,*/ deleteUser, getOrderHistory} = require('../controllers/users');

// Create route for user login
const loginRouter = express.Router();
loginRouter.post('/', authenticateUser);

// Create route for user logout
const logoutRouter = express.Router();
logoutRouter.get('/', logout);

// Create route for user registration
const registerRouter = express.Router();
registerRouter.post('/', registerUser);

// Create routes for user activity
const userRouter = express.Router();
userRouter.get('/:userId', getUserById);
//userRouter.put('/:userId', updateUser);
userRouter.delete('/:userId', deleteUser);

// Create routes for product activity
const productsRouter = express.Router();
productsRouter.get('/', getAllProducts);
productsRouter.get('/:category', getProductsByCategory);
productsRouter.get('/exact/:name', getProductByName);

// Create routes for cart activity
const cartRouter = express.Router();
cartRouter.get('/', getProductsFromCart);
cartRouter.post('/new_cart', newCart);
cartRouter.put('/', addProductToCart);
cartRouter.delete('/:productId', removeProductFromCart);
cartRouter.post('/place_order', placeOrder);

// Create route to get order history
const ordersRouter = express.Router();
ordersRouter.get('/history', getOrderHistory);

module.exports = {
    loginRouter,
    logoutRouter,
    productsRouter,
    registerRouter,
    userRouter,
    cartRouter,
    ordersRouter
};