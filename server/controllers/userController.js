const profile = async (req, res) => {

    res.json({

        success: true,

        message: "Protected Route",

        user: req.user

    });

};

module.exports = {

    profile

};