const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    console.log('Token received:', token); // Debugging
    if (!token) return res.status(401).json({ error: 'No token provided' });
  
    try {
      const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(401).json({ error: 'Invalid token' });
    }
  };
  