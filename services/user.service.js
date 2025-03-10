const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getUserProfile(userId) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true },
  });
}

module.exports = {
  getUserProfile,
};
