const { STATUS_CODE, SUCCESS_MSG, ERRORS } = require("../constants");
const AuthService = require("../services/auth.service");

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await AuthService.findUserByEmail(email);

    if (existingUser) {
      return res.status(STATUS_CODE.CONFLICT).json({
        success: false,
        message: ERRORS.ERRORS.USER.EXISTS,
      });
    }

    const user = await AuthService.createUser(email, password);

    return res.status(STATUS_CODE.OK).json({
      success: true,
      message: SUCCESS_MSG.AUTH_MSG.REGISTER_SUCCESS,
      userId: user.id,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERRORS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await AuthService.findUserByEmail(email);
    if (!user) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ success: false, message: ERRORS.ERRORS.USER.NOT_FOUND });
    }

    const isCompared = await AuthService.comparePasswords(
      password,
      user.password
    );
    if (!isCompared) {
      return res
        .status(STATUS_CODE.UN_AUTHORIZED)
        .json({ success: false, message: ERRORS.ERRORS.INVALID_CREDENTIALS });
    }

    const token = await AuthService.generateToken(user.id);

    return res.status(STATUS_CODE.OK).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERRORS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};
