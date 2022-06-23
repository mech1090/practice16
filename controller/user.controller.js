const {userValidationSchema} = require('../validation/user.validation')
const bcrypt = require('bcrypt')
const config = require('config')
const userService = require('../service/user.service')

const getLoginForm = (req,res)=>{
    return res.render('login/layout')
}
const login = async(req,res)=>{
    const {email,password} = req.body
    const fields = {email,password}
    const findUser = await userService.findEmail({email})
    if(!findUser){
        return res.render('signup/layout',{message:'User Not exist Signup'})
    }
    const matchPassword = await bcrypt.compare(password,findUser.password)
    if(!matchPassword){
        return res.render('login/layout',{message:'Credential Mismatched'})
    }
    return res.render('user/layout')
}


const getSignupForm = (req,res)=>{
    return res.render('signup/layout')
}
const signup = async(req,res)=>{
    const {email,password} = req.body
    const fields = {email,password}
    const {error,value} = userValidationSchema(fields)
    if(error){
        return res.render('signup/layout',{message:error.details[0].message})
    }
    const hashPassword = await bcrypt.hash(password,config.get('hash.salt'))
    const findUser = await userService.findEmail({email})
    if(findUser){
        return res.render('login/layout',{message:'User Exist Login'})
    }
    const createUser = await userService.createEntries({email,password:hashPassword})
    return res.render('signup/layout',{message:'User Created'})
}

module.exports ={getLoginForm,login,getSignupForm,signup}