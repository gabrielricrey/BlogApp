import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {

    const token = req.header('Authorization');
    
    if(!token) {
        return res.status(401).json({message: 'Access denied, no token'})
    }
    
    try {

        const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = verified;
        console.log(req.user)
        next();

    } catch(error) {
        res.status(400).json({message: 'Token not valid'})
    }
}