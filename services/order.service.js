const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createOrder = async (userId, items) => {
  return await prisma.$transaction(async (tx) => {
    const orderItems = items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price * item.quantity, // Price of order item 
    }));

    const total = orderItems.reduce((acc, item) => acc + item.price, 0);

    const order = await tx.order.create({
      data: {
        userId,
        total,
        items: { create: orderItems },
      },
      include: {
        items: true,
      },
    });
    return order;
  });
};

const getOrderById = async (id) => {
  return await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });
};

const getUserOrders = async (userId) => {
  return await prisma.order.findMany({
    where: { userId },
    include: { items: true },
  });
};

const getTotalSales = async () => {
  return await prisma.order.aggregate({
    _sum: { total: true },
  });
};

const getTopSellingProducts = async (limit) => {
  const result = await prisma.orderItem.groupBy({
    by: ["productId"],
    _sum: { quantity: true },
    orderBy: { _sum: { quantity: "desc" } },
    take: limit, // limit the result
  });

  return result;
};

module.exports = {
  createOrder,
  getOrderById,
  getUserOrders,
  getTotalSales,
  getTopSellingProducts,
};
