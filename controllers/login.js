// Importing modules

const jwt = require("jsonwebtoken");
const User = require("../models/User");
require('dotenv/config')



exports.login = async (req, res,next) => {
  let { username, password } = req.body;
  let secret = process.env.secret;
  console.log(username, password);

  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  if (!existingUser || existingUser.password != password) {
    const error = Error("Wrong details please check once");
    return next(error);
  }
  let token;
  try {

    token = jwt.sign(
      { userId: existingUser.id, username: existingUser.username },
      secret,
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }

  res.status(200).json({
    success: true,
    data: {
      userId: existingUser.id,
      username: existingUser.username,
      token: token,
    },
  });
};

