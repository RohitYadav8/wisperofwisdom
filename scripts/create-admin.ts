import "dotenv/config";
import bcrypt from "bcryptjs";

import { prisma } from "../src/lib/prisma";

async function main() {
  const email = "admin@whispersofwisdom.com";
  const password = "Admin@123";
  const name = "Admin";

  const hashedPassword = await bcrypt.hash(password, 12);

  const admin = await prisma.adminUser.upsert({
    where: {
      email,
    },
    update: {
      name,
      password: hashedPassword,
      isActive: true,
    },
    create: {
      name,
      email,
      password: hashedPassword,
      isActive: true,
    },
  });

  console.log("Admin user created successfully.");
  console.log(`Admin ID: ${admin.id}`);
  console.log(`Admin Email: ${admin.email}`);
}

main()
  .catch((error) => {
    console.error("Failed to create admin user:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });