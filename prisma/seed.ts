import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'Long Grain Parboiled Rice',
        category: 'Grains',
        unit: 'bag (50kg)',
        pricePerUnit: 45000,
        quantityAvailable: 120,
        sourceLocation: 'Kebbi',
      },
      {
        name: 'Yellow Maize',
        category: 'Grains',
        unit: 'bag (50kg)',
        pricePerUnit: 32000,
        quantityAvailable: 200,
        sourceLocation: 'Niger State',
      },
      {
        name: 'White Garri (Ijebu)',
        category: 'Garri',
        unit: 'bag (50kg)',
        pricePerUnit: 38000,
        quantityAvailable: 80,
        sourceLocation: 'Ogun State',
      },
      {
        name: 'Yellow Garri',
        category: 'Garri',
        unit: 'bag (50kg)',
        pricePerUnit: 36000,
        quantityAvailable: 65,
        sourceLocation: 'Oyo State',
      },
      {
        name: 'Raw Forest Honey',
        category: 'Honey',
        unit: 'litre',
        pricePerUnit: 6500,
        quantityAvailable: 150,
        sourceLocation: 'Kogi State',
      },
      {
        name: 'Dried Coconut (Whole)',
        category: 'Coconut',
        unit: 'piece',
        pricePerUnit: 300,
        quantityAvailable: 500,
        sourceLocation: 'Badagry',
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });