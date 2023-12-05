const db = require("../models/index");
const User = db.users;

const createUser = async (req: any, res: any) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({
      username,
      password,
    });
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

exports.createUser = createUser;