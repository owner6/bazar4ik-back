import jwt from 'jsonwebtoken';

const secret = process.env.SECRET_KEY;

export function authMiddleware(req, res, next) {
  // Для предобработки запросов с методом OPTIONS (CORS)
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    // Получение token  header Authorization
    const authToken = req.headers.authorization?.split(' ')[1];

    // if token отсутствует, возвращаем status 401
    if (!authToken) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // check next decoding token
    const decodedData = jwt.verify(authToken, secret);

    // check, есть ли у users достаточная role
    if (decodedData.role !== 'user') {
      return res.status(403).json({ message: 'Access denied: Insufficient role' });
    }

    // save data user in object запроса for дальнейшего использования
    req.user = decodedData;
    
    // next выполнение запроса
    next();
  } catch (e) {
    // Обработка errors validation token
    if (e.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Unauthorized: Token expired' });
    } else if (e.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // loging and return общей error
    console.log(e);
    return res.status(403).json({ message: 'User is not authorized' });
  }
}
