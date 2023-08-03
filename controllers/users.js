const Queries = require('../model/queries');

const querySchema = {name: 'users', userId: '', userDetails: ''};
const userQueries = new Queries(querySchema);

const getUserById = (req, res) => {
    querySchema.userId = req.session.user.id;
    userQueries.getUserById()
    .then(data => {
        if(!data.error){
            res.send(data.rows);
        } else {
            res.send('User does not exist!');
        };
    });
};

/*const updateUser = (req, res) => {
    querySchema.userId = req.session.user.id;
    const { telephone, address } = req.body;
    querySchema.userDetails = { telephone, address };
    userQueries.updateUser()
    .then(data => {
        if(!data.error){
            res.send('You have successfully updated your user information!');
        } else {
            res.send(data.errorMessage);
        };
    });
}; */

const deleteUser = (req, res) => {
    querySchema.userId = req.session.user.id;
    userQueries.deleteUser()
    .then(data => res.send('You have successfully deleted your account!'));
}

const getOrderHistory = (req, res) => {
    querySchema.userId = req.session.user.id;
    userQueries.getOrderHistory()
    .then(data => res.send(data));
};

module.exports = {
    getUserById,
    //updateUser,
    deleteUser,
    getOrderHistory
};