import { Category } from '@prisma/client'
import { db as prisma } from '../lib/db'

const products = [
  {
    name: 'Sony WH-1000XM5',
    description: 'Industry leading noise canceling headphones',
    price: 398.00,
    images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80'],
    category: Category.HEADPHONES,
    stock: 50,
    sku: 'SNY-WH1000XM5',
    isFeatured: true,
    rating: 4.8,
    reviews: 1240,
  },
  {
    name: 'Apple AirPods Pro (2nd Gen)',
    description: 'Rich, high-quality audio and voice with active noise cancellation.',
    price: 249.00,
    salePrice: 199.00,
    images: ['https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&q=80'],
    category: Category.HEADPHONES,
    stock: 120,
    sku: 'APL-APP2',
    isFeatured: true,
    rating: 4.9,
    reviews: 3450,
  },
  {
    name: 'Sonos Roam',
    description: 'The portable smart speaker for all your listening adventures.',
    price: 179.00,
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80'],
    category: Category.SPEAKERS,
    stock: 30,
    sku: 'SNS-ROAM',
    isFeatured: false,
    rating: 4.5,
    reviews: 210,
  },
  {
    name: 'Samsung Galaxy Watch 6',
    description: 'Advanced sleep coaching, heart monitoring, and fitness tracking.',
    price: 299.99,
    images: ['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&q=80'],
    category: Category.WEARABLES,
    stock: 85,
    sku: 'SAM-GW6',
    isFeatured: true,
    rating: 4.6,
    reviews: 890,
  },
  {
    name: 'iPhone 15 Pro Max',
    description: 'Titanium design. A17 Pro chip. A customizable Action button.',
    price: 1199.00,
    images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80'],
    category: Category.SMARTPHONES,
    stock: 15,
    sku: 'APL-IP15PM',
    isFeatured: true,
    rating: 4.9,
    reviews: 5120,
  },
  {
    name: 'Google Pixel Tablet',
    description: 'The tablet that is helpful seamlessly combined with a smart display.',
    price: 499.00,
    salePrice: 399.00,
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80'],
    category: Category.TABLETS,
    stock: 45,
    sku: 'GOO-PIXTB',
    isFeatured: false,
    rating: 4.4,
    reviews: 156,
  },
  {
    name: 'Anker USB-C Hub',
    description: '7-in-1 USB C Hub with 4K HDMI, 100W Power Delivery.',
    price: 34.99,
    images: ['https://images.unsplash.com/photo-1512446733611-9099a758e236?w=500&q=80'],
    category: Category.ACCESSORIES,
    stock: 300,
    sku: 'ANK-HUB7',
    isFeatured: false,
    rating: 4.7,
    reviews: 4230,
  },
  {
    name: 'Bose QuietComfort Earbuds II',
    description: 'Personalized noise cancellation and sound performance.',
    price: 299.00,
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80'],
    category: Category.HEADPHONES,
    stock: 65,
    sku: 'BSE-QC2',
    isFeatured: true,
    rating: 4.7,
    reviews: 870,
  }
];

async function main() {
  console.log('Start seeding ...')
  
  // Clear existing products
  await prisma.product.deleteMany();
  console.log('Cleared existing products');

  for (const p of products) {
    const product = await prisma.product.create({
      data: p,
    })
    console.log(`Created product with id: ${product.id} and sku: ${product.sku}`)
  }
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
