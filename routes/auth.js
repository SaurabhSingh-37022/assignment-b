const jwt = require('jsonwebtoken');
require('dotenv/config')
const secretKey = process.env.secret; 

function authJwt() {
  return (req, res, next) => {
    console.log(req.path);
    if (req.path === '/api/v1/login' || req.path === '/public-page') {
      
      return next();
    }
    
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const token = authHeader.substring(7); 
    console.log(secretKey,token);

    
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      
      req.user = decoded;
      console.log(decoded);

      
      next();
    });
  };
}

module.exports = authJwt;