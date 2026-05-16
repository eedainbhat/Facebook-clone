const User = require("../models/user.model");
module.exports.createUser = async ({
  username,
  email,
  password,
  phoneNumber,
}) => {
  if (!username || !email || !password || !phoneNumber) {
    throw new Error("All fields are required");
  }
  const existingUser = await User.findOne({
    $or: [
      { email: email },
      { username: username },
      { phoneNumber: phoneNumber },
    ],
  });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const newUser = new User({
    username,
    email,
    phoneNumber,
    password,
  });

  await newUser.save();

  return newUser;
};
