const User = require('../models/User');
const jwt = require('jsonwebtoken');

/** Middleware for Token auth */
const requireAuth = (req, res, next) => {
    // try to obtain jwt from cookies
    const token = req.cookies.jwt;

    // check if jwt exists in cookies and verifies if it is authentic with jsonwebtoken method
    if (token) {
        // no need to import dotenv to use process.env again (already in app.js)
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            };
        });
    } else {
        res.redirect('/login');
    };
};

/** Middleware to obtain user data if valid token */
const obtainUser = (req, res, next) => {
    // try to obtain jwt from cookies
    const token = req.cookies.jwt;

    // check if jwt exists in cookies and verifies if it is authentic with jsonwebtoken method
    if (token) {
        // no need to import dotenv to use process.env again (already in app.js)
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                // we don't want to perform anything if there is an error
                next();
            } else {
                console.log(decodedToken);
                // decodedToken has a payload with the user id (see token creation)
                const user = await User.findById(decodedToken.id);
                console.log(user.email);
                // locals to make any data we want accessible from the view
                res.locals.user = user;
                next();
            };
        });
    } else {
        res.locals.user = null;
        next();
    };
};

module.exports = {
    requireAuth, 
    obtainUser
};