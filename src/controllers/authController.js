const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');

exports.login = async (req, res) => {
    const query = { email: req.body.email };
    const userData = {
        email: req.body.email,
        password: req.body.password
    };

    try{
        const queryUser = await User.findOne(query);
        const comparePass = await bcrypt.compare(req.body.password, queryUser.password);

        if(!comparePass){
            res.status(401).json({ status: 'Success', message: 'Wrong email or password' });
            return;
        }

        req.session._id = queryUser._id;
        req.session.userNick = queryUser.nickname;
        req.session.save();

        res.status(200).json({ status: 'Success', message: 'Authorized!' });
    }catch(error){
        res.status(500).json({ status: 'Failed', message: error.message });
    }
};

exports.register = async (req, res) => {
    const userData = new User({
        name: req.body.name,
        nickname: req.body.nickname,
        email: req.body.email,
        password: req.body.password,
        description: req.body.desc,
        createdAt: Date.now()
    });

    try{
        const newUser = await userData.save();
        res.status(200).json({ status: 'Success', message: 'User successfully created!' });
    }catch(error){
        res.status(500).json({ status: 'Failed', message: error.message });
    }
};

exports.updatePassword = async (req, res) => {
    const query = { _id: req.session._id };
    
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newPassUser = await User.updateOne(query, { password: hashedPass });
        res.status(200).json({ status: 'Success', message: 'Password successfully changed!'});
    }catch(error){
        res.status(500).json({ status: 'Failed', message: error.message });
    }
};

exports.logout = (req, res) => {
    try{
        req.session._id = undefined;
        req.session.nickname = undefined;

        req.session.save(function (error){
            if(error) next(error);

            req.session.regenerate(function (error){
                if(error) next(error);
            });
        });

        res.status(200).json({ status: 'Success', message: 'User logged out!' });
    }catch(error){
        res.status(500).json({ status: 'Failed', message: error.message });
    }
};
