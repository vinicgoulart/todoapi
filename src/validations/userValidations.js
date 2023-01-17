exports.verifyNickname = (req, res, next) => {

    if(req.param.id !== req.session._id){
        res.status(403).json({ status: 'Failed', message: 'You must update YOURS nickname!' });
        return;
    }

    if(req.body.nickname === undefined){
        res.status(400).json({ status: 'Failed', message: 'Nickname is required!' });
        return;
    }

    var nickname = req.body.nickname;
    
    var pattern = /^[a-zA-Z0-9]+$/;
    var isAlphanumeric = pattern.test(nickname);

    if(!isAlphanumeric){
        res.status(400).json({ status: 'Failed', message: 'Only alphanumeric is accepted!' });
        return;
    }

    if(nickname.length <= 3){
        res.status(400).json({ status: 'Failed', message: 'Nickname must have at least 4 letters!' });
        return;
    }

    next();
};

exports.verifyUpdate = (req, res, next) => {

    if(req.param.id !== req.session._id){
        res.status(403).json({ status: 'Failed', message: 'You must update YOURS user!' });
        return;
    }

    if(req.body.name === undefined && req.body.desc === undefined){
        res.status(400).json({ status: 'Failed', message: 'Name or email are required to update a user' });
        return;
    }

    next();
};

exports.verifyDelete = (req, res, next) => {
    if(req.param.id !== req.session._id){
        res.status(403).json({ status: 'Failed', message: 'You must delete YOURS user!' });
        return;
    }

    next();
};
