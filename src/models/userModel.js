const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date
    }
});

userModel.pre('save', async function save(next){
    if(!this.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    }catch (error){
        return next(error)
    }
})

module.exports = mongoose.model('users', userModel);
