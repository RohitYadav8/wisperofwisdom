import "dotenv/config";
import bcrypt from "bcryptjs";

import { prisma } from "../src/lib/prisma";

async function main() {
  const email = "admin@whispersofwisdom.com";
  const password = "Admin@123";

  const admin = await prisma.adminUser.findUnique({
    where: {
      email,
    },
  });

  if (!admin) {
    console.log("❌ Admin not found in Aiven PostgreSQL.");
    return;
  }

  console.log("✅ Admin found");
  console.log("ID:", admin.id);
  console.log("Name:", admin.name);
  console.log("Email:", admin.email);
  console.log("Active:", admin.isActive);
  console.log(
    "Password is bcrypt hash:",
    admin.password.startsWith("$2")
  );

  const passwordMatches = await bcrypt.compare(
    password,
    admin.password
  );

  console.log(
    "Password match:",
    passwordMatches ? "✅ YES" : "❌ NO"
  );
}

main()
  .catch((error) => {
    console.error("❌ Admin check failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });