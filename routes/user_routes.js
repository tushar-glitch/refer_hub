const express = require('express')
const userController = require('../controllers/userController')
const route = express.Router()
const verifytokenmiddleware = require('../middleware/verifyToken')

route.post('/register',userController.userRegistration)
route.post('/login',userController.userLogin)
route.get('/verifytoken/:id',userController.emailTokenVerify)
route.post('/sendotp',userController.sendotp)
route.post('/emailtoken',userController.emailToken)

module.exports = route