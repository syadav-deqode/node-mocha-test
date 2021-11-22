const User = require('../models/User')

module.exports.getUserFromEmail = async (email) => {
  const user = await User.findOne({ where: { email } })
  return { user }
}

module.exports.getUserById = async (id) => {
  const user = await User.findOne({ where: { id } })
  return { user }
}

module.exports.addNewUser = async (user, { t } = {}) => {
  return await User.create(user, { transaction: t })
}

module.exports.getAllUsers = async () => {
  const users = await User.findAll({})
  return { users }
}

module.exports.findOrCreateUser = async (email) => {
  const [user, created] = await User.findOrCreate({
    where: { email },
  });
  return { user, created }
}

module.exports.findAndCountAllUser = async (email) => {
  const { count, rows } = await User.findAndCountAll({
    where: { email },
  });
  return { users: rows, count }
}
