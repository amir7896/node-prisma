const { PrismaClient } = require("@prisma/client");
const { STATUS_CODE, ERRORS } = require("../constants");
const UserService = require("../services/user.service");

exports.getProfile = async (req, res) => {
  try {
    const user = await UserService.getUserProfile(req.user.userId);

    return res.status(STATUS_CODE.OK).json({ success: true, data: user });
  } catch (error) {
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERRORS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};
