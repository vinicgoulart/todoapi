const Todo = require('../models/todoModel');

exports.todo_list = async (req, res) => {
    const query = { idUser: req.session._id };

    try{
        const retrieveTodo = await Todo.find(query, { __v: 0 });
        res.status(200).json({ status: 'Success', todo: retrieveTodo });
    }catch(error){  
        res.status(500).json({ status: 'Failed', message: error.message });
    }
};

exports.todo_create = async (req, res) => {
    const newTodo = new Todo({
        title: req.body.title,
        description: req.body.description,
        endDate: req.body.endDate,
        type: req.body.type,
        idUser: req.session._id,
    });
    try{
        const sendTodo = await newTodo.save();
        res.status(201).json({ status: 'Success', message: 'Todo created' });
    }catch(error){
        res.status(400).json({ status: 'Failed', message: error.message });
    }
};

exports.todo_listone = async (req, res) => {
    const query = { _id: req.params.id, idUser: req.session._id };
    try{
        const oneTodo = await Todo.findOne(query, { __v: 0 });
        res.status(200).json({ status: 'Success', todo: oneTodo });
    }catch(error){
        res.status(500).json({ status: 'Failed', message: error.message });
    }
};

exports.todo_edit = async (req, res) => {
    const query = { _id: req.params.id };

    const userData = {
        title: req.body.title,
        description: req.body.description,
        endDate: req.body.endDate,
        type: req.body.type
    };

    try{
        const findTodo = await Todo.findOne(query);

        if(findTodo.idUser !== req.session._id){
            res.status(403).json({ status: 'Failed', message: 'You must update only YOURS to-dos!' });
            return;
        }

        const newTodo = await Todo.updateOne(query, userData);
        res.status(200).json({ status: 'Success', message: 'Todo successfully updated!' });
    }catch(error){  
        res.status(400).json({ status: 'Failed', message: error.message });
    }
};

exports.todo_delete = async (req, res) => {
    const query = { _id: req.params.id };

    try{
        const existTodo = await Todo.findOne(query);

        if(existTodo.idUser !== req.session._id){
            res.status(403).json({ status: 'Failed', message: 'You must delete only your to-dos!' });
            return;
        }

        const deletedTodo = await Todo.deleteOne(query);

        res.status(200).json({ status: 'Success', message: 'Todo successfully deleted!' });
    }catch(error){
        res.status(500).json({ status: 'Failed', message: error.message });
    }
};
