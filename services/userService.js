const sequelize = require('../helpers/db')
const userRepository = require('../repositories/userRepository')
const { takeNameFromEmail } = require('../helpers/extract')

module.exports.addUser = async (body) => {
  let returnObj = { error: null, success: null, message: null, }
  // Get the email from body
  const { email } = body
  // Check for user existance
  const { user } = await userRepository.getUserFromEmail(email)

  if (!user) {
    const { name } = takeNameFromEmail(email)
    // Register new user
    const payload = { name, email }
    await sequelize.transaction(async (t) => {
      await userRepository.addNewUser(payload, { t })
    })

    returnObj = { ...returnObj, success: true, message: "New user added", }
  } else {
    // Return error to notify the email is exists
    returnObj = { ...returnObj, error: true, message: "Email already in use" }
  }

  return { user: returnObj }
}

module.exports.findOrCreateUser = async (email) => {
  let returnObj = { error: null, success: null, message: null, }
  /**
   * Find the user with email.
   * Or create new one.
   * created is a flag that return true/false
   */
  const { user, created } = await userRepository.findOrCreateUser(email)

  returnObj = { ...returnObj, success: true, message: "List of users.", }

  return { user: returnObj }
}

module.exports.getUsers = async () => {
  const { users } = await userRepository.getAllUsers()
  return { users }
}

module.exports.loginUser = async (body) => {
  let returnObj = { error: null, success: null, message: null }
  const { email } = body
  // Get the user from DB
  const { user } = await userRepository.getUserFromEmail(email)
  // Return error if email missing
  if (!user) {
    returnObj = { ...returnObj, error: true, message: "Requested email not found" }
  } else {
    returnObj = { ...returnObj, success: true, message: "User authenticated." }
  }

  return returnObj
}
