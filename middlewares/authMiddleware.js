const jwt = require('jsonwebtoken');

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

module.exports = { requireAuth };