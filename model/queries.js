const pool = require('../model/pool');
const bcrypt = require('bcrypt');
const validateCreditCard = require('../controllers/utils');

class Queries {
    constructor(schema){
        this.schema = schema;
    }

    // Get all products from schema
    async getAllFromSchema(){
        const products = await pool.query(`SELECT * FROM ${this.schema.name}`);
        return products.rows;
    }

    // Get products by category
    async getFromSchemaByCategory(){
        const products = await pool.query(`SELECT * FROM ${this.schema.name} WHERE category = '${this.schema.category}'`);
        if(!products.rows[0]) return {error: true, message: "Please select a valid category"};
        return {error: false, products};
    }

    // Get products by name
    async getFromSchemaByName(){
        const products = await pool.query(`SELECT * FROM ${this.schema.name} WHERE name = '${this.schema.product}'`);
        if(!products.rows[0]) return {error: true, message: "Product does not exist!"};
        return {error: false, products};
    }

    // To register a new user
    async registerUser(){
        const {username, hashedPassword, firstName, lastName, email} = this.schema.userDetails;
        try {
            const user = await pool.query(`INSERT INTO users (username, password, firstname, lastname, email) VALUES(
                '${username}', '${hashedPassword}', '${firstName}', '${lastName}', '${email}'
            )`);
            const userId = await pool.query(`SELECT id FROM users WHERE username='${username}'`);
            return {error: false, data: userId.rows[0]};
        } catch(err) {
            return {error: true, errorMessage: "A problem occurred. Please try a different username and/or password"}
        };
    }

    // To login a user
    async loginUser(){
        const {password, username} = this.schema;
        const user = await pool.query(`SELECT * from users WHERE username='${username}'`);
        if(!user.rows[0]) return null;
        const matchedPassword = await bcrypt.compare(password, user.rows[0].password);
        if(matchedPassword) return {match: true, id: user.rows[0].id};
        return false;
    }

    // To get the user information by ID
    async getUserById(){
        const user = await pool.query(`SELECT username, email, firstname, lastname, telephone, address FROM users WHERE id = ${this.schema.userId}`);
        return user;
    };

    // To update user information by user ID
    /*async updateUser(){
        const { telephone, address } = this.schema;
        try {
            const updatedUser = await pool.query(`UPDATE users SET telephone = ${telephone}, address = ${address} WHERE id = ${this.schema.userId}`);
            return updatedUser; 
        } catch(err){
            return {err: true, msg: err.msg};
        }
    };*/
    
    // To delete user account by user ID
    async deleteUser(){
        try {
            const updatedUser = pool.query(`DELETE FROM users WHERE id = ${this.schema.userId} RETURNING *`);
            if(!updatedUser.rows[0]) return 'User does not exist!';
            return updatedUser;
            } catch(err){
                return {err: true, msg: err.msg};
        }
    };

    // To get cart by user ID
    async getFromCartByUserId(){
        const cart = await pool.query(`SELECT * FROM carts WHERE user_id = ${this.schema.userId}`);
        return cart;
    }

    // To create a new cart
    async newCart(){
        const cartExists = await pool.query(`SELECT * FROM carts WHERE user_id = ${this.schema.userId}`);
        if(cartExists.rows[0]) return {exists: true, msg: "You already have an existing cart. You can continue shopping."};
        const newCart = await pool.query(`INSERT INTO carts (user_id) VALUES (${this.schema.userId})`);
        return {exists: false, res: 'Cart successfully created! Enjoy your shopping!'};
    }

    // To add a product to the cart
    async addProductToCart(){
        try {
            const cartId = await pool.query(`SELECT * FROM carts WHERE user_id = ${this.schema.userId}`);
            if (!cartId.rows[0] ) return {cartError:true, productError:false};
            const updatedCart = await pool.query(`INSERT INTO carts (id, user_id, product_id, quantity) VALUES (
                ${cartId.rows[0].id}, ${this.schema.userId}, ${this.schema.productId}, 1
            )`);
            return updatedCart;
        } catch(err) {
            return {cartError:false, productError:true};
        };
    }

    // To remove a product from the cart
    async removeProductFromCart(){
        try {
        const updatedCart = await pool.query(`DELETE FROM carts WHERE user_id=${this.schema.userId} AND product_id=${this.schema.productId} RETURNING *`);
        if(!updatedCart.rows[0]) return 'This product is not in your cart';
        return 'Successfully removed product from cart';
        } catch(err){
            return {err: true, msg: err.msg}
        };
    }

    // To pay for cart items and place an order
    async placeOrder(){
        try{
            const cart = await pool.query(`SELECT * FROM carts JOIN products ON carts.product_id = products.id WHERE user_id = ${this.schema.userId}`);
            if(!cart.rows[0]) return "Please create a new cart or add products to your cart";
            let totalCost = 0;
            for (let item of cart.rows){totalCost+=item.price};
            if( totalCost === 0 || totalCost === NaN ) return "Please add items to your cart";
            if(this.schema.paymentMethod==="Credit card"){
                if(!validateCreditCard(this.schema.creditCardNumber)) return "Please enter a valid credit card number";
            };
            const d = new Date();
            await pool.query(`INSERT INTO orders (user_id, total_cost, date, time, payment_method) VALUES (${this.schema.userId}, ${totalCost}, '${d.getMonth()+1}-${d.getDate()}-${d.getFullYear()}', '${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}', '${this.schema.paymentMethod}')`);
            await pool.query(`DELETE FROM carts WHERE user_id=${this.schema.userId}`);
            return 'Your order has been placed!';
        } catch(err) {
            return err.message;
        }
    }

    // To get order history
    async getOrderHistory(){
        const orderHistory = await pool.query(`SELECT * FROM orders WHERE user_id=${this.schema.userId}`);
        if(!orderHistory.rows[0]) return "No order history! Please make a purchase first!";
        return orderHistory.rows;
    }
};

module.exports = Queries;