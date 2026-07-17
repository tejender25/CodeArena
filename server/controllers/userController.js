const User = require("../models/User");

const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  res.json({
    success: true,
    user,
  });
};

const updateProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  user.fullName = req.body.fullName || user.fullName;
  user.skills = req.body.skills || user.skills;

  await user.save();

  res.json({
    success: true,
    user,
  });
};

module.exports = {
  getProfile,
  updateProfile,
};