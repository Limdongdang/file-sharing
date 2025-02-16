// user.service.js
import { User } from "../model/user.model.js";
import { sequelize } from "../model/index.js";
import jwt from 'jsonwebtoken';

const generateAccessToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
        // 테스트용 30초 설정
        expiresIn: '5s',
    };

    return jwt.sign(payload, secret, options);
}

const generateRefreshToken = (user) => {    
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
    };
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
        expiresIn: '7d',
    };

    return jwt.sign(payload, secret, options);
}

const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
}

const registerUser = async (username, password, email) => {
    await sequelize.transaction(async (t) => {
        await User.create({
            username,
            password,
            email,
        }, { transaction: t });
    });
};

const findUser = async (username) => {
    const user = await User.findOne({
        where: {
            username,
        },
        attributes: ['id', 'username', 'email'],
    });
    return user;
}

const loginUser = async (data) => {
    const user = await User.findOne({
        where: {
            username : data.username,
            password : data.password,
        },
        attributes: ['id', 'username', 'email'],
    });
    return user;
}

const sendVerificationEmail = async (email) => {
    // 이메일 전송 로직
}

        
export default { registerUser, findUser, generateAccessToken, loginUser, verifyToken, generateRefreshToken };