const { STATUS_CODE, ERRORS, SUCCESS_MSG } = require("../constants");
const orderService = require("../services/order.service");

const createOrder = async (req, res) => {
  try {
    const { userId } = req.user;
    const { items } = req.body;

    const order = await orderService.createOrder(userId, items);
    return res
      .status(STATUS_CODE.CREATED)
      .json({ success: true, message: SUCCESS_MSG.ORDER.CREATED, data: order });
  } catch (error) {
    console.log("Error in create order :", error);

    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERRORS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await orderService.getOrderById(id);
    return res.status(STATUS_CODE.OK).json({ success: true, data: result });
  } catch (error) {
    console.log("Error in get single order :", error);

    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERRORS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.user;

    const result = await orderService.getUserOrders(userId);
    return res.status(STATUS_CODE.OK).json({ success: true, data: result });
  } catch (error) {
    console.log("Error in getting user orders ", error);
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERRORS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

const getTotalSales = async (req, res) => {
  try {
    const result = await orderService.getTotalSales();

    return res.status(STATUS_CODE.OK).json({ success: true, data: result });
  } catch (error) {
    console.log("Error in getting total sales:", error);
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERRORS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

const getTopSellingProducts = async (req, res) => {
  try {
    const { limit } = req.query;
    const parsedLimit  = parseFloat(limit)
    const result = await orderService.getTopSellingProducts(parsedLimit);
    return res.status(STATUS_CODE.OK).json({ success: true, data: result });
  } catch (error) {
    console.log("Error in getting top selling products:", error);
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERRORS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getUserOrders,
  getTotalSales,
  getTopSellingProducts,
};
