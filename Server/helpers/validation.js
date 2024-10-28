const {check} = require('express-validator');

exports.SignUpValidation=[
    check('email','Please enter a valid mail').isEmail().normalizeEmail({gmail_remove_dots:true}),
    check('password','Password is required').isLength({min:6})
]