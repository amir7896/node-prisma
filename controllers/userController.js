const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { id: true, email: true },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
