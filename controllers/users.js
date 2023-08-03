const Queries = require('../model/queries');

const querySchema = {userId: ''};
const userQueries = new Queries(querySchema);

const getOrderHistory = (req, res) => {
    querySchema.userId = req.session.user.id;
    userQueries.getOrderHistory()
    .then(data => res.send(data));
};

module.exports = {getOrderHistory};