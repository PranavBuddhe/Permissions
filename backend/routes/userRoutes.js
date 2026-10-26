const express = require("express");

const router = express.Router();

const {
    authenticateToken
} = require("../middleware/authMiddleware");

router.get("/dashboard", authenticateToken, (req, res) => {

    res.status(200).json({
        message: "Welcome to Dashboard",
        user: req.user
    });

});

module.exports = router;