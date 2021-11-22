'use strict'
const express = require('express')
const router = express.Router()

const asyncHandler = fn => (req, res, next) => {
  return Promise
    .resolve(fn(req, res, next))
    .catch(next)
}

const userController = require('../controllers/userController')

router.post('/login', asyncHandler(userController.loginUser))

router.get('/list/user-list', asyncHandler(userController.userListForTest))

router.post('/register-user', asyncHandler(userController.registerUser))

module.exports = router
