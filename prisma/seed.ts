import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.organization.createMany({
    data: [
      {
        name: "Organization 1",
        type: "maintenance",
        business_number: "123456789",
        address: "123 Main Street",
        city: "City 1",
        postcode: 12345,
        phone: 1234567890,
        email: "org1@example.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Organization 2",
        type: "seller",
        business_number: "987654321",
        address: "456 Market Street",
        city: "City 2",
        postcode: 54321,
        phone: 9876543210,
        email: "org2@example.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
      // Add more organizations as needed
    ],
  });

  await prisma.user.createMany({
    data: [
      {
        name: "User 1",
        email: "user1@example.com",
        password: "hashed_password_1",
        role: "admin",
        username: "user1",
        password_salt: "salt_1",
        language_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        organization_id: 1,
        modified_by_user: 1,
      },
      {
        name: "User 2",
        email: "user2@example.com",
        password: "hashed_password_2",
        role: "user",
        username: "user2",
        password_salt: "salt_2",
        language_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
        organization_id: 2,
        modified_by_user: 2,
      },
      // Add more users as needed
    ],
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(() => {
    prisma.$disconnect().then(
      () => console.log("Disconnected from database"),
      (e:Error) => console.error("Error disconnecting from database", e)
    );
  });
