exports.verifyAuth = (req, res, next) =>{
    if(req.session.userNick === undefined && req.session._id === undefined){
        res.status(403).json({ status: 'Failed', message: 'Unauthorized' });
        return;
    }

    next();
};
