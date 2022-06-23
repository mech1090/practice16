const User = require('../model/user.model')

const findEmail = (field)=>{
    return User.findOne(field)
}

const createEntries = (fields)=>{
    return User.create(fields)
}

module.exports = {findEmail,createEntries}