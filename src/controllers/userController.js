const User = require('../models/userModel');

exports.index = async (req, res) => {
    try{
        const allUser = await User.find({}, { _id: 1, nickname: 1, email: 1, name: 1, desc: 1 });
        res.status(200).json({ status: 'Success', user: allUser });
    }catch(error){
        res.status(500).json({ status: 'Failed', message: error.message });
    }
};

exports.oneUser = async (req, res) => {
    const query = { _id: req.params.id };

    try{
        const oneUser = await User.findOne(query, { _id: 1, nickname: 1, email: 1, name: 1, desc: 1 });
        res.status(200).json({ status: 'Success', user: oneUser });
    }catch(error){
        res.status(500).json({ status: 'Failed', message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    const query = { _id: req.params.id };
    const newData = {
        name: req.body.name,
        desc: req.body.desc
    };

    try{
        const updatedUser = await User.updateOne(query, newData);
        res.status(200).json({ status: 'Success', message: 'User successfully updated!' });
    }catch(error){
        res.status(500).json({ status: 'Failed', message: error.message });
    }   
};

exports.updateNickname = async (req, res) => {
    const query = { _id: req.params.id };
    const newData = { nickname: req.body.nickname };

    try{
        const verifyNickname = await User.findOne(newData);
        
        if(verifyNickname !== null){
            res.status(406).json({ status: 'Failed', message: 'Nickname already taken!' });
            return;
        }

        const updateUserNickname = await User.updateOne(query, newData);
        res.status(200).json({ status: 'Success', message: 'Nickname successfully updated!' });
    }catch(error){
        res.status(500).json({ status: 'Failed', message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const query = { _id: req.params.id };

    try{
        const deletedUser = await User.deleteOne(query);
        res.status(200).json({ status: 'Success', message: 'User successfully deleted!' });
    }catch(error){
        res.status(500).json({ status: 'Failed', message: error.message });
    }
};
