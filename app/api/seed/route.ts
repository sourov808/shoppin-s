import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Category } from "@prisma/client";

const productImages = {
  headphones: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
  ],
  speakers: [
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
    'https://images.unsplash.com/photo-1543512214-318c77a07298?w=800&q=80',
  ],
  wearables: [
    'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80',
    'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80',
  ],
  smartphones: [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
    'https://images.unsplash.com/photo-1592899677712-a5a25450336c?w=800&q=80',
  ],
  tablets: [
    'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
  ],
  accessories: [
    'https://images.unsplash.com/photo-1512446733611-9099a758e236?w=800&q=80',
    'https://images.unsplash.com/photo-1586953229671-e22cdd52811e?w=800&q=80',
  ],
};

const products = [
  {
    name: 'Sony WH-1000XM5 Wireless Headphones',
    description: 'Industry-leading noise cancellation with two processors controlling 8 microphones. Up to 30-hour battery life with quick charging.',
    price: 398.00,
    images: [productImages.headphones[0]],
    category: Category.HEADPHONES,
    stock: 45,
    sku: 'SNY-WH1000XM5-BLK',
    isFeatured: true,
  },
  {
    name: 'Apple AirPods Pro (2nd Generation)',
    description: 'Rich, high-quality audio with Active Noise Cancellation and Transparency mode. Adaptive EQ and spatial audio.',
    price: 249.00,
    salePrice: 199.00,
    images: [productImages.headphones[1]],
    category: Category.HEADPHONES,
    stock: 120,
    sku: 'APL-AIRPODS-PRO2',
    isFeatured: true,
  },
  {
    name: 'Bose QuietComfort Earbuds II',
    description: 'Personalized noise cancellation and sound performance. CustomTune technology analyzes your ears and adapts audio.',
    price: 299.00,
    images: [productImages.headphones[2]],
    category: Category.HEADPHONES,
    stock: 65,
    sku: 'BSE-QC-EARBUDS2',
    isFeatured: true,
  },
  {
    name: 'JBL Flip 6 Portable Speaker',
    description: 'Bold JBL Original Pro Sound, racetrack-shaped woofer, and optimized tweeter for clarity and deep bass.',
    price: 129.99,
    images: [productImages.speakers[0]],
    category: Category.SPEAKERS,
    stock: 80,
    sku: 'JBL-FLIP6-BLK',
    isFeatured: false,
  },
  {
    name: 'Sonos Era 100',
    description: 'Next-generation smart speaker with enhanced acoustics, seamless controls, and built-in Alexa.',
    price: 249.00,
    images: [productImages.speakers[1]],
    category: Category.SPEAKERS,
    stock: 40,
    sku: 'SON-ERA100-WHT',
    isFeatured: true,
  },
  {
    name: 'Apple Watch Series 9',
    description: 'The ultimate device for a healthy life. Advanced health sensors, Always-On Retina display, and fast charging.',
    price: 399.00,
    images: [productImages.wearables[0]],
    category: Category.WEARABLES,
    stock: 100,
    sku: 'APL-WATCH-S9',
    isFeatured: true,
  },
  {
    name: 'Samsung Galaxy Watch 6',
    description: 'Advanced health monitoring, powerful performance, and sleek design. Track your fitness goals with precision.',
    price: 329.99,
    images: [productImages.wearables[1]],
    category: Category.WEARABLES,
    stock: 75,
    sku: 'SAM-GAL-WATCH6',
    isFeatured: false,
  },
  {
    name: 'iPhone 15 Pro',
    description: 'Titanium design, A17 Pro chip, and advanced camera system. The most powerful iPhone ever.',
    price: 999.00,
    images: [productImages.smartphones[0]],
    category: Category.SMARTPHONES,
    stock: 50,
    sku: 'APL-IPHONE15-PRO',
    isFeatured: true,
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Galaxy AI is here. Epic camera, S Pen, and built-in AI features. The ultimate smartphone experience.',
    price: 1299.99,
    images: [productImages.smartphones[1]],
    category: Category.SMARTPHONES,
    stock: 35,
    sku: 'SAM-GALAXY-S24-ULT',
    isFeatured: true,
  },
  {
    name: 'iPad Pro 12.9"',
    description: 'Supercharged by M2 chip. Stunning Liquid Retina XDR display. Blazing fast wireless. Apple Pencil hover.',
    price: 1099.00,
    images: [productImages.tablets[0]],
    category: Category.TABLETS,
    stock: 30,
    sku: 'APL-IPAD-PRO-12',
    isFeatured: true,
  },
  {
    name: 'Anker PowerCore 20000mAh',
    description: 'Massive 20,000mAh capacity with fast charging. Charge multiple devices on the go.',
    price: 49.99,
    images: [productImages.accessories[0]],
    category: Category.ACCESSORIES,
    stock: 200,
    sku: 'ANK-POWER-20K',
    isFeatured: false,
  },
  {
    name: 'Samsung 45W USB-C Charger',
    description: 'Fast and efficient charging for your devices. Compatible with a wide range of USB-C devices.',
    price: 49.99,
    images: [productImages.accessories[1]],
    category: Category.ACCESSORIES,
    stock: 150,
    sku: 'SAM-CHARGER-45W',
    isFeatured: false,
  },
];

export async function GET() {
  try {
    const existingProducts = await db.product.count();
    
    if (existingProducts > 0) {
      return NextResponse.json({ 
        message: `Database already has ${existingProducts} products`,
        products: existingProducts 
      });
    }

    await db.product.createMany({
      data: products.map(p => ({
        ...p,
        rating: Math.random() * 2 + 3.5,
        reviews: Math.floor(Math.random() * 500) + 10,
      })),
    });

    return NextResponse.json({ 
      message: 'Products seeded successfully',
      products: products.length 
    });
  } catch (error) {
    console.error('Error seeding products:', error);
    return NextResponse.json(
      { error: 'Failed to seed products' },
      { status: 500 }
    );
  }
}
