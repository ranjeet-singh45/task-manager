import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Invalid token", err.message);
    res.status(400).json({ error: 'Invalid token' });
  }
};
