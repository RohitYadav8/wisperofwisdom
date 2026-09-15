import "dotenv/config";
import mariadb from "mariadb";

async function testConnection() {
  console.log("Testing database connection...");

  console.log({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,

    // Password print nahi karenge
    passwordLoaded: Boolean(process.env.DATABASE_PASSWORD),
  });

  let connection;

  try {
    connection = await mariadb.createConnection({
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT ?? 3306),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      allowPublicKeyRetrieval: true,
      connectTimeout: 5000,
    });

    console.log("✅ Direct MySQL connection successful");

    const rows = await connection.query("SELECT DATABASE() AS db");

    console.log(rows);
  } catch (error) {
    console.error("❌ Direct MySQL connection failed");
    console.error(error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

testConnection();