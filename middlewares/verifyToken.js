import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Token undefined" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
