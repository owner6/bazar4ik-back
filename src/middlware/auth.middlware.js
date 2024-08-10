import jwt from 'jsonwebtoken';

const secret = process.env.SECRET_KEY;

export function authMiddleware(req, res, next) {
  if(req.method === 'OPTIONS') {
    next()
  }

  try {
    const token = req.headers.authorization?.split(' ')[1]; 

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const decodedData = jwt.verify(token, secret);

    if (decodedData.role === 'admin') {
      req.user = decodedData;
      next()
    } else {
      return res.status(403).json({message: 'Access denied: Insufficient role'})
    }
  } catch(e) {
    console.log(e) 
    return res.status(403).json({message: "User is not autherization"})
  }
}