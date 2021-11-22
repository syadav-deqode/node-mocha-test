module.exports.takeNameFromEmail = (email) => {
  let name = "New User"
  if (email && email.trim().length > 0) {
    name = email.substring(0, email.indexOf("@"));
  }
  return { name }
}