import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client.js";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@whispersofwisdom.com";
  const password = "Admin@123";

  const hashedPassword = await bcrypt.hash(password, 12);

  const admin = await prisma.adminUser.upsert({
    where: {
      email,
    },
    update: {
      name: "Admin",
      password: hashedPassword,
      isActive: true,
    },
    create: {
      name: "Admin",
      email,
      password: hashedPassword,
      isActive: true,
    },
  });

  console.log("Admin created successfully:");
  console.log({
    id: admin.id,
    name: admin.name,
    email: admin.email,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });