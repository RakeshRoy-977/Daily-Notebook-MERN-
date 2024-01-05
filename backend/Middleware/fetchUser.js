var jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ error: "Please auth using a vaild token" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT);
    req.user = data.user;
  } catch (error) {
    return res.status(401).json({ error: "Please auth using a vaild token" });
  }

  next();
};

module.exports = fetchUser;
