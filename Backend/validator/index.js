exports.userSignupValidator = (req, res, next) => {
    req.check('firstName','First Name Required').notEmpty()
    req.check('lastName','Last Name Required').notEmpty()
    req.check('email','Email Required').notEmpty().matches(/.+\@.+\..+/).withMessage("Enter a valid email")
    req.check('password','Password Required').notEmpty()
    req.check('password').isLength({min: 6}).withMessage('Password must contain atleast 6 characters').matches(/\d/).withMessage('Password must contain a numerical value');

    const errors = req.validationErrors()
    if (errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }

    next();
}