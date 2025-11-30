const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedProducts() {
  const products = [
    { name: 'Laptop', price: 1200.00, quantity: 10 },
    { name: 'Smartphone', price: 800.00, quantity: 25 },
    { name: 'Headphones', price: 150.00, quantity: 50 },
    { name: 'Monitor', price: 300.00, quantity: 15 },
    { name: 'Keyboard', price: 75.00, quantity: 40 },
  ];

  await prisma.product.createMany({
    data: products,
    skipDuplicates: true,
  });

  console.log('Seeded 5 products');
}

seedProducts()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
