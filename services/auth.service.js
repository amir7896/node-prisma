const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { ERROR_CODES } = require("../constants");

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = "7d";

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function comparePasswords(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

async function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

async function createUser(email, password) {
  const hashedPassword = await hashPassword(password);
  return prisma.user.create({ data: { email, password: hashedPassword } });
}

async function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

module.exports = {
  hashPassword,
  comparePasswords,
  generateToken,
  createUser,
  findUserByEmail,
};
