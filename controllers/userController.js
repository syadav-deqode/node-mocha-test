'use strict'

const userService = require('../services/userService')

module.exports.loginUser = async (req, res, next) => {
  const users = await userService.loginUser(req.body)
  res.status(200).json(users)
  next()
}

module.exports.userListForTest = async (req, res, next) => {
  const { users } = await userService.getUsers(req.body)
  res.body = users
  next()
}

module.exports.registerUser = async (req, res, next) => {
  const { user } = await userService.addUser(req.body)
  res.status(200).json(user)
}
