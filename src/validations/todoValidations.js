exports.validateCreate = (req, res, next) => {
    if(req.body.title === undefined || req.body.description === undefined){
        res.status(400).json({ status: 'Failed', message: 'It is necessary to have a title and description of the todo' });
        return;
    }

    var date = req.body.endDate;
    var pattern = /^\d{4}[/-]\d{2}[/-]\d{2}$/;
    var isDate = pattern.test(date);

    if(!isDate){
        res.status(400).json({ status: 'Failed', message: 'Date must have the format of YYYY/MM/DD' });
        return;
    }

    next();
};

exports.validateUpdate = (req, res, next) => {
    if(req.body.title === undefined && req.body.description === undefined && req.body.endDate === undefined && req.body.type === undefined){
        res.status(400).json({ status: 'Failed', message: 'One field at least must be filled!' });
        return;
    }

    var date = req.body.endDate;
    var pattern = /^\d{4}[/-]\d{2}[/-]\d{2}$/;
    var isDate = pattern.test(date);

    if(date === undefined) return next();

    if(!isDate){
        res.status(400).json({ status: 'Failed', message: 'Date must be YYYY/MM/DD' });
        return;
    }

    next();
};
