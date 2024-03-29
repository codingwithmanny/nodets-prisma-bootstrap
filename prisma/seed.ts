// Imports
// ========================================================
import { PrismaClient, User } from '@prisma/client';
import { faker } from '@faker-js/faker';

// Config
// ========================================================
const prisma = new PrismaClient();
const NUMBER_TO_GENERATE = 10;

// Main Seeder
// ========================================================
const main = async () => {
  // Users
  const CREATED_USERS: User[] = [];

  for (let i = 0; i < NUMBER_TO_GENERATE; i++) {
    CREATED_USERS.push(
      await prisma.user.create({
        data: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
        },
      }),
    );
  }

  console.group('Users Seeding:');
  console.log(`Created: ${CREATED_USERS.length}`);
  console.groupEnd();
};

// Init
// ========================================================
main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit();
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
