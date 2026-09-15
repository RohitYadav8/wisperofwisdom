import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST!,
  port: Number(process.env.DATABASE_PORT ?? 3306),
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  connectionLimit: 5,
  allowPublicKeyRetrieval: true,
});

const prisma = new PrismaClient({
  adapter,
});

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

  console.log("✅ Admin created successfully");

  console.log({
    id: admin.id,
    name: admin.name,
    email: admin.email,
    isActive: admin.isActive,
  });
}

main()
  .catch((error) => {
    console.error("❌ Failed to create admin:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });