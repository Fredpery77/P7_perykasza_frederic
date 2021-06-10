const bouncer = require ('express-bouncer')(600000, 3600000, 5); // Protection against bruteforce attacks. The user will have to wait between 10 minutes and 1 hour after 5 wrong password attempts.

bouncer.blocked = function (req, res, next, remaining)
{   
    res.status(429).json({message: "Too many requests have been made, therefore, your account has been blocked for security measures. " +
    "Please wait " + remaining / 1000 + " seconds"});
};

module.exports = bouncer;