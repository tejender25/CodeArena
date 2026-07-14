const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {

        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        res.status(401).json({
            success: false,
            message: "Invalid Token"
        });

    }
};

const isRecruiter = (req, res, next) => {

    if (req.user.role !== "recruiter") {
        return res.status(403).json({
            success: false,
            message: "Access Denied. Recruiters only."
        });
    }

    next();
};

module.exports = {
    auth,
    isRecruiter
};