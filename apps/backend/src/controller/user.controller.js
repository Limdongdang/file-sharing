import userService from "../service/user.service.js";

export const loginUser = async (req, res) => {
    try {
        console.log(req.body);
        const result = await userService.loginUser(req.body);

        if(result === null) {
            throw new Error('사용자 정보가 일치하지 않습니다.');
        };

        const token = userService.generateToken(result);
        res.status(200).send({ token });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

export const registerUser = async (req, res) => {
    try {
        if(userService.findUser(req.body.username)) {
            throw new Error('이미 존재하는 사용자입니다.');
        }

        const result = await userService.registerUser(req.body);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

export const sendVerificationEmail = async (req, res) => {
    try {
        const result = await userService.sendVerificationEmail(req.body);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}