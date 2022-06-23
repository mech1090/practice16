const express = require('express')
const router = express.Router()
const userController = require('../controller/user.controller')

router.get('/',userController.getLoginFrom)
router.post('/',userController.login)
router.get('/',userController.getSignupFrom)
router.post('/',userController.signup)

module.exports = router