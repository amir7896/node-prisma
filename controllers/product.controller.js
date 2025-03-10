const { STATUS_CODE, SUCCESS_MSG, ERRORS } = require("../constants");
const ProductService = require("../services/product.service");

exports.createProduct = async (req, res) => {
  try {
    const product = await ProductService.createProduct({
      ...req.body,
      userId: req.user.userId,
    });
    return res.status(STATUS_CODE.CREATED).json({
      success: true,
      message: SUCCESS_MSG.PRODUCT.CREATED,
      data: product,
    });
  } catch (error) {
    console.log("Error in create product ", error);
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERRORS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await ProductService.getAllProducts();
    return res.status(STATUS_CODE.OK).json({ success: true, data: products });
  } catch (error) {
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERRORS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductService.getSingleProduct(id);

    if (!product) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ success: false, message: ERRORS.ERRORS.PRODUCT.NOT_FOUND });
    }
    return res.status(STATUS_CODE.OK).json({ success: true, data: product });
  } catch (error) {
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERRORS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};
