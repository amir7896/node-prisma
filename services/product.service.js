const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createProduct(data) {
  return await prisma.product.create({
    data: {
      name: data.name,
      price: data.price,
      description: data.description,
      userId: data.userId,
      images: {
        createMany: {
          data: data.images,
        },
      },
    },
    include: { images: true },
  });
}

async function getAllProducts() {
  return await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      images: true,
      user: {
        select: {
          id: true,
          email: true,
          // Add userName when available in the DB
        },
      },
    },
  });
}

const getSingleProduct = async (id) => {
  return await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      images: true,
      user: {
        select: {
          id: true,
          email: true,
          // Add userName when available in the DB
        },
      },
    },
  });
};

async function updateProduct(id, productData) {
  return prisma.product.update({
    where: { id },
    data: {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      images: {
        deleteMany: {},
        createMany: {
          data: productData.images,
        },
      },
    },
    include: {
      images: true,
    },
  });
}

const deleteProduct = async (id) => {
  return await prisma.$transaction([
    prisma.image.deleteMany({ where: { productId: id } }),
    prisma.product.delete({ where: { id } }),
  ]);
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
