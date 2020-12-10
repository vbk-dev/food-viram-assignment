const jwt = require('jsonwebtoken');


/**
 * This method verify that the JWT token
 */
exports.authorizeToken = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) return res.status(401).json({error: 'No Token, authorization failed'});
  try {
    const user_id = jwt.verify(token, process.env.JWT_SECRET, {algorithms: ['HS256']}).id;
    req.user_id = user_id;
    next();
  } catch (error) {
    console.log({error})
    return res.status(401).json({error: 'Invalid Token, authorization failed'});
  }
}