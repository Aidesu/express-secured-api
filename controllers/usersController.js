import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

let users = [];

export const register = async (req, res) => {
    try {
        const { username, pwd } = req.body;

        if (!username || !pwd)
            return res
                .status(400)
                .json({ message: "Username and password required" });

        const userExists = users.find((u) => u.username == username);
        if (userExists)
            return res.status(400).json({ message: "User already exists" });

        const hashPwd = await bcrypt.hash(pwd, 9);
        const newUser = { username, hashPwd };
        users.push(newUser);
        res.status(200).json({ newUser });
    } catch (e) {
        return res.status(500).json({ message: "server error", error: e });
    }
};

export const login = async (req, res) => {
    try {
        const { username, pwd } = req.body;

        if (!username || !pwd)
            return res
                .status(400)
                .json({ message: "Username and password required" });

        const user = users.find((u) => u.username == username);
        if (!user)
            return res
                .status(400)
                .json({ message: "Username or password incorrect" });

        const validatePwd = await bcrypt.compare(pwd, user.hashPwd);
        if (!validatePwd)
            return res
                .status(400)
                .json({ message: "Username or password incorrect" });

        const token = jwt.sign(
            { username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({ message: "Auth success", token });
    } catch (e) {
        return res
            .status(500)
            .json({ message: "server error", error: e.message });
    }
};
