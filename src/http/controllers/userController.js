
const {User} = require('../../models');

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
}

const createUser = async (req, res, next) => {
    try {        
        const {name, email} = req.body
        const user = await createUserService(name, email);
        handleResponse(res, 201, 'Created user', user);
    } catch (error) {
        next(error)
    }
}

const getAllUser = async (req, res, next) => {
    try {
        
        const user = await User.findAll();
        handleResponse(res, 200, 'Get user', user);
    } catch (error) {        
        next('user not found')
    }
}

const getUserById = async (req, res, next) => {
    try {
        const user = await getUserByIdService(req.params.id);
        if(!user) handleResponse(res, 404, 'Not Found User');
        handleResponse(res, 200, 'User', user);
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const {name, email} = req.body
        const user = await updateUserService(req.params.id, name, email);
        handleResponse(res, 200, 'Updated user', user);
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const user = await deleteUserService(req.params.id);
        handleResponse(res, 200, 'Deleted user', user);
    } catch (error) {
        next(error)
    }
}

module.exports = {createUser,getAllUser,getUserById,updateUser,deleteUser}