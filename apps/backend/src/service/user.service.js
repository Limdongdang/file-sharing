// user.service.js
import { User } from "../model/user.model.js";
import { sequelize } from "../model/index.js";
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
    };
    const secret = "secret"; // 환경 변수로 추후 변경
    const options = {
        expiresIn: '1h',
    };

    return jwt.sign(payload, secret, options);
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
    });
    return user;
}

const loginUser = async (data) => {
    const user = await User.findOne({
        where: {
            username : data.username,
            password : data.password,
        },
    });
    return user;
}

const sendVerificationEmail = async (email) => {
    // 이메일 전송 로직
}

        
export default { registerUser, findUser, generateToken, loginUser };