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
    // Destructure & validate query params
    const { search = "", page = "1", limit = "10" } = req.query;

    const data = await ProductService.getAllProducts(search, page, limit);

    return res.status(STATUS_CODE.OK).json({
      success: true,
      success: true,
      totalDocuments: data.totalDocuments,
      currentPage: data.currentPage,
      totalPages: data.totalPages,
      data: data.products,
    });
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
    const parsedId  = parseInt(id)

    const product = await ProductService.getSingleProduct(parsedId);

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

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const parsedId  = parseInt(id)
    const updatedProduct = await ProductService.updateProduct(parsedId, body);
    return res.status(STATUS_CODE.OK).json({
      success: true,
      message: SUCCESS_MSG.PRODUCT.UPDATED,
      data: updatedProduct,
    });
  } catch (error) {
    console.log("Error in update product :", error)
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERRORS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const parsedId  = parseInt(id)
    const deleteProduct = await ProductService.deleteProduct(parsedId);
    return res.status(STATUS_CODE.OK).json({
      success: true,
      message: SUCCESS_MSG.PRODUCT.DELETED,
      data: deleteProduct,
    });
  } catch (error) {
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERRORS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};
