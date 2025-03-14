const { PrismaClient } = require("@prisma/client");
const { sanitizeInput } = require("../utils/sanitize");

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

async function getAllProducts(search, page, limit) {
  const sanitizedPage = Math.max(1, parseInt(page));
  const sanitizedLimit = Math.min(100, Math.max(1, parseInt(limit)));
  const skip = (sanitizedPage - 1) * sanitizedLimit;

  // Sanitize search input
  const sanitizedSearch = sanitizeInput(search);

  // Create search filter only if a valid search term exists
  const searchFilter = sanitizedSearch
    ? {
        OR: [
          { name: { contains: sanitizedSearch, mode: "insensitive" } },
          { description: { contains: sanitizedSearch, mode: "insensitive" } },
        ],
      }
    : {};

  const [products, totalDocuments] = await prisma.$transaction([
    prisma.product.findMany({
      where: searchFilter,
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        images: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
      skip,
      take: sanitizedLimit,
    }),
    prisma.product.count({ where: searchFilter }),
  ]);

  return {
    totalDocuments,
    currentPage: sanitizedPage,
    totalPages: Math.ceil(totalDocuments / sanitizedLimit),
    products,
  };
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
      createdAt: true,
      updatedAt: true,
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
  console.log('Update Product Id in service :', id)
  console.log('Updated product data in service:', productData)
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
