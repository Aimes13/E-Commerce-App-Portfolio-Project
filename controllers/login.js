const Queries = require('../model/queries');

const queriesSchema = {name: 'login', username: '', password: ''};
const loginQueries = new Queries(queriesSchema);

const authenticateUser = (req, res) => {
    const {username, password} = req.body;
    queriesSchema.username = username;
    queriesSchema.password = password;
    loginQueries.loginUser()
    .then((success) => {
        try{
            if(success.match){
                req.session.user = {id: success.id};
                req.session.authenticated = true;
                console.log(req.session);
                res.send('You have logged in successfully!');
            } else {
                res.status(403).send("Incorrect username and/or password");  
            };
        } catch(error) {
            res.status(403).send("User does not exist");
        };
    });
};

const checkIfAuthenticated = (req, res, next) => {
    if(req.session.authenticated){
        next();
    } else {
        res.send("Please proceed with user authentication!");
    };
};

const logout = (req, res) => {
    req.session.authenticated = false;
    res.send("You have logged out succesfully!");
};

module.exports = {
    authenticateUser,
    checkIfAuthenticated,
    logout,
};
