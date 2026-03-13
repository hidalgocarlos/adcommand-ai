const { execSync } = require('child_process');

process.env.DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/facedash";
process.env.DIRECT_URL = "postgresql://postgres:postgres@localhost:5432/facedash";

try {
  console.log('Generating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('Prisma Client generated successfully.');
} catch (error) {
  console.error('Failed to generate Prisma Client:', error.message);
  process.exit(1);
}
