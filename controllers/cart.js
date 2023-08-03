const Queries = require('../model/queries');

const querySchema = {name: 'carts', userId: '', productId: '', quantity: ''};
const cartQueries = new Queries(querySchema);

const newCart = (req, res) => {
    querySchema.userId = req.session.user.id;
    cartQueries.newCart()
    .then(data => {
        if(!data.exists) res.send(data.res);
        res.send(data.msg);
    });
};

const addProductToCart = (req, res) => {
    querySchema.userId = req.session.user.id;
    querySchema.productId = req.body.productId;
    querySchema.quantity = req.body.quantity;
    cartQueries.addProductToCart()
    .then((data) => {
        if(data.cartError) return res.send('Please create a new cart first!');
        if(data.productError) return res.send('Please enter a valid product ID');
        res.send('You have successfully added the product to your cart!');
    });
};

const removeProductFromCart = (req, res) => {
    querySchema.userId = req.session.user.id;
    querySchema.productId = Number(req.params.productId);
    cartQueries.removeProductFromCart()
    .then(data => res.send(data));
};

const getProductsFromCart = (req, res) => {
    querySchema.userId = req.session.user.id;
    cartQueries.getFromCartByUserId()
    .then(data => res.send(data.rows));
};

const placeOrder = (req, res) => {
    querySchema.userId = req.session.user.id;
    querySchema.paymentMethod = req.body.paymentMethod;
    querySchema.creditCardNumber = req.body.creditCardNumber;
    cartQueries.placeOrder()
    .then(data => res.send(data));
};

module.exports = {
    newCart,
    addProductToCart,
    removeProductFromCart,
    getProductsFromCart,
    placeOrder
};
