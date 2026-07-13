// Run with: npx tsx scripts/debug-login.ts <email> <password>
// Example:   npx tsx scripts/debug-login.ts admin@swincotex.com ChangeMe123!
//
// This bypasses NextAuth entirely and directly tests the same lookup +
// verify steps that authorize() in lib/auth.ts performs. If this script
// says the password is valid but signing in through the browser still
// fails, the bug is in the NextAuth/route wiring, not the credentials.
// If this script says invalid, the bug is in the seeded password or in
// lib/password.ts's hash/verify pairing.

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { verifyPassword } from "../src/lib/password";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const [email, password] = process.argv.slice(2);
  // Check for undefined specifically (arg not passed at all), not
  // falsiness — an empty string "" is a valid, intentional test case
  // here (checking for the old empty-password seed bug) and would be
  // wrongly rejected by a truthiness check.
  if (email === undefined || password === undefined) {
    console.error("Usage: npx tsx scripts/debug-login.ts <email> <password>");
    process.exit(1);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.log(`❌ No user found in DB with email: ${email}`);
    console.log("   Run `npx prisma db seed` if you haven't, or check the email is exactly right.");
    return;
  }

  console.log("✅ User found:", { id: user.id, email: user.email, role: user.role });
  console.log("   passwordHash in DB:", user.passwordHash);
  console.log("   passwordHash length:", user.passwordHash.length);

  if (!user.passwordHash || user.passwordHash.length < 20) {
    console.log("⚠️  This hash looks too short to be a real bcrypt hash — likely seeded with an empty password.");
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  console.log(isValid ? "✅ Password is VALID against this hash." : "❌ Password does NOT match this hash.");
}

main()
  .catch((err) => {
    console.error("Script threw an error:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());