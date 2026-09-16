import jwt from 'jsonwebtoken';

export const generateToken = (user : any  ) => {
    const payload : any = {
        id: user._id,
        email: user.email,
    };

    const secretKey = process.env.JWT_SECRET || 'default_secret_key';
    const options : any = {
        expiresIn: '1h', // Token expiration time
    };

    const accessToken =  jwt.sign(payload, secretKey, options);
    return accessToken;
}
export const verifyToken = (token : string) => {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key');
    return decodeToken;
}