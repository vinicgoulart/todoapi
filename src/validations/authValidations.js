exports.validateLogin = (req, res, next) => {
    if(req.body.email === undefined || req.body.password === undefined){
        res.status(400).json({ status: 'Failed', message: 'Both email and password fields must be filled!' });
        return;
    }

    next();
};

exports.validateRegister = (req, res, next) => {
    if(req.body.name === undefined || req.body.nickname === undefined || req.body.email === undefined || req.body.password === undefined){
        res.status(400).json({ status: 'Failed', message: 'Fill all the required fields!' });
        return;
    }

    var nickname = req.body.nickname;
    var pattern = /^[a-zA-Z0-9]+$/;
    var isAlphanumeric = pattern.test(nickname);

    if(nickname.length <= 3 || !isAlphanumeric){
        res.status(400).json({ status: 'Failed', message: 'Nickname must contain only alphanumeric and be longer than 3 characters' });
        return;
    }

    var email = req.body.email;
    var patternEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    var isEmail = patternEmail.test(email);

    if(!isEmail){
        res.status(400).json({ status: 'Failed', message: 'Email must be valid!' });
        return;
    }

    var password = req.body.password;
    var patternPassword = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;
    var isPasswordStrong = patternPassword.test(password);

    if(!isPasswordStrong){
        res.status(400).json({ status: 'Failed', message: 'Password must contain 8 characters, 2 in Upper case, 1 special character, 2 numbers and 3 letters in lower case!' });
        return;
    }

    next();
};

exports.validateChangePass = (req, res, next) => {
    var password = req.body.password;
    var patternPassword = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;
    var isPasswordStrong = patternPassword.test(password);

    if(!isPasswordStrong){
        res.status(400).json({ status: 'Failed', message: 'Password must contain 8 characters, 2 in Upper case, 1 special character, 2 numbers and 3 letters in lower case!' });
        return;
    }

    next();
};
