const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      console.log(token);
      jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
          res.send({ status: 401, message: "Invalid Token" });
        }
        req.user = decoded.user;
        next();
      });
      if(!token){
        res.send({ status: 401, message: "User Is Not Authorized Or Token Is Missing" });
      }
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = validateToken;
