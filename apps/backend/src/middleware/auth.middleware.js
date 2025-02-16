import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // 환경 변수로 추후 변경
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Invalid token.");
    }
};

export default authMiddleware;