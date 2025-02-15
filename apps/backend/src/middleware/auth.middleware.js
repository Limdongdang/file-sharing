import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }

    try {
        const decoded = jwt.verify(token, "secret"); // 환경 변수로 추후 변경
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Invalid token.");
    }
};

export default authMiddleware;