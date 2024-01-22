const User = require("../models/user");
const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  };

  const authUser = async(req, res) => {
    const { username} = req.body;

    const user = await User.findOne({ username: username });

    if (user) {
			res.json({
					id: user.id,
					name: user.name,
					email: user.email,
					username: user.username,
					token: generateToken(user.id),
			})
		} else {
        res.status(401);
        throw new Error("Invalid username");
    }
};

const allUsers = async(req, res) => {
	const users = await User.find();

	const usernames = users.map(user => user.username)
	res.json(usernames);
}

module.exports ={
	authUser,
	allUsers
}