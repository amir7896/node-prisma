const cron = require("node-cron");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Function to generate a 6-character random token
const generateToken = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

exports.start = () => {
  cron.schedule("* * * * *", async () => {
    console.log("Cron job is running...");

    try {
      const token = generateToken();

      // Create token
      await prisma.token.create({
        data: { token },
      });

      // Update Token
      // await prisma.token.update({
      //   where: { id: 1 },
      //   data: {
      //     token: token,
      //   },
      // });

      console.log(`New Token Generated & Stored: "${token}"`);
    } catch (error) {
      console.error("Error storing token:", error);
    }
  });
};
