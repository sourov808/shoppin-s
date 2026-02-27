import { Category, OrderStatus } from '@prisma/client'
import { db as prisma } from '../lib/db'
import { hash } from 'bcryptjs'

// Product images from Unsplash
const productImages = {
  headphones: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
    'https://images.unsplash.com/photo-1524678606372-987d780461d7?w=800&q=80',
  ],
  speakers: [
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
    'https://images.unsplash.com/photo-1543512214-318c77a07298?w=800&q=80',
    'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=800&q=80',
  ],
  wearables: [
    'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80',
    'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80',
    'https://images.unsplash.com/photo-1617042375876-a13e36732a04?w=800&q=80',
  ],
  smartphones: [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
    'https://images.unsplash.com/photo-1592899677712-a5a25450336c?w=800&q=80',
    'https://images.unsplash.com/photo-1598327105666-5b89351aff23?w=800&q=80',
  ],
  tablets: [
    'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
    'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=80',
  ],
  accessories: [
    'https://images.unsplash.com/photo-1512446733611-9099a758e236?w=800&q=80',
    'https://images.unsplash.com/photo-1586953229671-e22cdd52811e?w=800&q=80',
    'https://images.unsplash.com/photo-1601524909162-ae8725290836?w=800&q=80',
  ],
}

const products = [
  // HEADPHONES
  {
    name: 'Sony WH-1000XM5 Wireless Headphones',
    description: 'Industry-leading noise cancellation with two processors controlling 8 microphones. Up to 30-hour battery life with quick charging. Crystal-clear hands-free calling and Alexa voice control.',
    price: 398.00,
    images: [productImages.headphones[0]],
    category: Category.HEADPHONES,
    stock: 45,
    sku: 'SNY-WH1000XM5-BLK',
    isFeatured: true,
    rating: 4.8,
    reviews: 1240,
  },
  {
    name: 'Apple AirPods Pro (2nd Generation)',
    description: 'Rich, high-quality audio with Active Noise Cancellation and Transparency mode. Adaptive EQ and spatial audio. Up to 6 hours of listening time with MagSafe charging case.',
    price: 249.00,
    salePrice: 199.00,
    images: [productImages.headphones[1]],
    category: Category.HEADPHONES,
    stock: 120,
    sku: 'APL-AIRPODS-PRO2',
    isFeatured: true,
    rating: 4.9,
    reviews: 3450,
  },
  {
    name: 'Bose QuietComfort Earbuds II',
    description: 'Personalized noise cancellation and sound performance. CustomTune technology analyzes your ears and adapts audio. Up to 6 hours battery life with 3 additional charges from case.',
    price: 299.00,
    images: [productImages.headphones[2]],
    category: Category.HEADPHONES,
    stock: 65,
    sku: 'BSE-QC-EARBUDS2',
    isFeatured: true,
    rating: 4.7,
    reviews: 870,
  },
  {
    name: 'Sennheiser Momentum 4 Wireless',
    description: 'Exceptional sound quality with Sennheiser Signature Sound. Adaptive noise cancellation and 60-hour battery life. Smart pause and transparent hearing.',
    price: 379.95,
    salePrice: 349.95,
    images: [productImages.headphones[3]],
    category: Category.HEADPHONES,
    stock: 38,
    sku: 'SEN-MOMENTUM4',
    isFeatured: false,
    rating: 4.6,
    reviews: 520,
  },
  // SPEAKERS
  {
    name: 'Sonos Roam Portable Smart Speaker',
    description: 'The portable smart speaker for all your listening adventures. Automatic Trueplay tuning. IP67 rated for water and dust resistance. 10 hours of continuous playback.',
    price: 179.00,
    images: [productImages.speakers[0]],
    category: Category.SPEAKERS,
    stock: 30,
    sku: 'SNS-ROAM-BLK',
    isFeatured: false,
    rating: 4.5,
    reviews: 210,
  },
  {
    name: 'JBL Flip 6 Portable Speaker',
    description: 'Bold JBL Original Pro Sound. IP67 waterproof and dustproof. 12 hours of playtime. PartyBoost feature to pair multiple speakers.',
    price: 129.95,
    salePrice: 99.95,
    images: [productImages.speakers[1]],
    category: Category.SPEAKERS,
    stock: 85,
    sku: 'JBL-FLIP6-BLU',
    isFeatured: true,
    rating: 4.7,
    reviews: 1890,
  },
  {
    name: 'Marshall Stanmore II Bluetooth Speaker',
    description: 'Iconic Marshall design with powerful room-filling sound. Analog control knobs for bass, treble, and volume. Multi-host functionality to switch between devices.',
    price: 379.99,
    images: [productImages.speakers[2]],
    category: Category.SPEAKERS,
    stock: 22,
    sku: 'MAR-STANMORE2',
    isFeatured: false,
    rating: 4.8,
    reviews: 670,
  },
  // WEARABLES
  {
    name: 'Samsung Galaxy Watch 6 Classic',
    description: 'Advanced sleep coaching and heart monitoring. Rotating bezel for intuitive navigation. Comprehensive fitness tracking with auto workout detection.',
    price: 399.99,
    salePrice: 349.99,
    images: [productImages.wearables[0]],
    category: Category.WEARABLES,
    stock: 55,
    sku: 'SAM-GW6-CLS-47MM',
    isFeatured: true,
    rating: 4.6,
    reviews: 890,
  },
  {
    name: 'Apple Watch Series 9 GPS + Cellular',
    description: 'Advanced health features including ECG and blood oxygen monitoring. Double tap gesture control. Bright Always-On Retina display. Carbon neutral combinations available.',
    price: 529.00,
    images: [productImages.wearables[1]],
    category: Category.WEARABLES,
    stock: 42,
    sku: 'APL-AWS9-45MM',
    isFeatured: true,
    rating: 4.9,
    reviews: 2340,
  },
  {
    name: 'Fitbit Charge 6 Fitness Tracker',
    description: 'Built-in GPS and Google apps. Heart rate monitoring and stress management. 7 days battery life. Includes 6 months Fitbit Premium membership.',
    price: 159.95,
    images: [productImages.wearables[2]],
    category: Category.WEARABLES,
    stock: 110,
    sku: 'FIT-CHARGE6',
    isFeatured: false,
    rating: 4.4,
    reviews: 1560,
  },
  // SMARTPHONES
  {
    name: 'iPhone 15 Pro Max 256GB',
    description: 'Titanium design with A17 Pro chip. 48MP Main camera with 5x Telephoto. Action button for quick access. All-day battery life.',
    price: 1199.00,
    images: [productImages.smartphones[0]],
    category: Category.SMARTPHONES,
    stock: 15,
    sku: 'APL-IP15PM-256-NTL',
    isFeatured: true,
    rating: 4.9,
    reviews: 5120,
  },
  {
    name: 'Samsung Galaxy S24 Ultra 512GB',
    description: 'Galaxy AI features with Circle to Search. 200MP camera with 100x Space Zoom. S Pen included. Titanium frame for durability.',
    price: 1419.99,
    salePrice: 1299.99,
    images: [productImages.smartphones[1]],
    category: Category.SMARTPHONES,
    stock: 28,
    sku: 'SAM-S24U-512-TIT',
    isFeatured: true,
    rating: 4.8,
    reviews: 3210,
  },
  {
    name: 'Google Pixel 8 Pro 128GB',
    description: 'Google AI features including Magic Editor and Best Take. Temperature sensor. 7 years of OS updates. Pro-level camera system.',
    price: 999.00,
    images: [productImages.smartphones[2]],
    category: Category.SMARTPHONES,
    stock: 65,
    sku: 'GOO-PIX8PRO-128',
    isFeatured: false,
    rating: 4.7,
    reviews: 1890,
  },
  // TABLETS
  {
    name: 'Google Pixel Tablet with Charging Speaker Dock',
    description: 'The tablet that helps around the house. Seamless smart home control. 12 hours of battery life. Includes charging speaker dock.',
    price: 499.00,
    salePrice: 399.00,
    images: [productImages.tablets[0]],
    category: Category.TABLETS,
    stock: 45,
    sku: 'GOO-PIXTAB-128',
    isFeatured: false,
    rating: 4.4,
    reviews: 456,
  },
  {
    name: 'iPad Air 11-inch M2 256GB',
    description: 'Supercharged by M2 chip. Stunning Liquid Retina display. 12MP Ultra Wide front camera. Works with Apple Pencil Pro and Magic Keyboard.',
    price: 749.00,
    images: [productImages.tablets[1]],
    category: Category.TABLETS,
    stock: 38,
    sku: 'APL-IPADAIR-M2-256',
    isFeatured: true,
    rating: 4.8,
    reviews: 1230,
  },
  // ACCESSORIES
  {
    name: 'Anker 7-in-1 USB-C Hub',
    description: '4K HDMI output, 100W Power Delivery, USB-C and USB-A data ports. SD and microSD card readers. Compact and portable design.',
    price: 34.99,
    images: [productImages.accessories[0]],
    category: Category.ACCESSORIES,
    stock: 300,
    sku: 'ANK-HUB7IN1',
    isFeatured: false,
    rating: 4.7,
    reviews: 4230,
  },
  {
    name: 'Anker PowerCore 20000mAh Power Bank',
    description: 'Ultra-high capacity charges most phones over 5 times. PowerIQ and VoltageBoost technology. Dual USB ports for simultaneous charging.',
    price: 49.99,
    salePrice: 39.99,
    images: [productImages.accessories[1]],
    category: Category.ACCESSORIES,
    stock: 250,
    sku: 'ANK-PWR20K',
    isFeatured: false,
    rating: 4.8,
    reviews: 8920,
  },
  {
    name: 'Logitech MX Master 3S Wireless Mouse',
    description: '8K DPI tracking sensor. Quiet clicks and MagSpeed electromagnetic scrolling. Ergonomic design for all-day comfort. Multi-device connectivity.',
    price: 99.99,
    images: [productImages.accessories[2]],
    category: Category.ACCESSORIES,
    stock: 145,
    sku: 'LOG-MXMASTER3S',
    isFeatured: true,
    rating: 4.9,
    reviews: 6780,
  },
  {
    name: 'Belkin 3-in-1 Wireless Charger for Apple Devices',
    description: 'Charge iPhone, Apple Watch, and AirPods simultaneously. MagSafe compatible for perfect alignment. Sleek space-saving design.',
    price: 149.99,
    salePrice: 129.99,
    images: ['https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80'],
    category: Category.ACCESSORIES,
    stock: 78,
    sku: 'BEL-3IN1-MAGSAFE',
    isFeatured: false,
    rating: 4.6,
    reviews: 2340,
  },
];

const users = [
  {
    name: 'Admin User',
    email: 'sourovsd00@gmail.com',
    password: process.env.SEED_ADMIN_PASSWORD || 'Admin@123',
    role: 'ADMIN',
  },
  {
    name: 'John Smith',
    email: 'john.smith@example.com',
    password: process.env.SEED_USER_PASSWORD || 'User@123',
    role: 'USER',
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    password: process.env.SEED_USER_PASSWORD || 'User@123',
    role: 'USER',
  },
  {
    name: 'Michael Chen',
    email: 'm.chen@example.com',
    password: process.env.SEED_USER_PASSWORD || 'User@123',
    role: 'USER',
  },
  {
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    password: process.env.SEED_USER_PASSWORD || 'User@123',
    role: 'USER',
  },
  {
    name: 'David Wilson',
    email: 'd.wilson@example.com',
    password: process.env.SEED_USER_PASSWORD || 'User@123',
    role: 'USER',
  },
];

const orders = [
  {
    status: OrderStatus.DELIVERED,
    totalAmount: 597.00,
    shippingCost: 15.00,
    taxAmount: 47.76,
    shippingAddress: '123 Main St, New York, NY 10001, USA',
    email: 'john.smith@example.com',
    phone: '+1-555-0101',
    items: [
      { productId: 0, quantity: 1, price: 398.00 }, // Sony headphones
      { productId: 6, quantity: 2, price: 34.99 }, // Anker hub
    ],
    daysAgo: 5,
  },
  {
    status: OrderStatus.SHIPPED,
    totalAmount: 1499.98,
    shippingCost: 0,
    taxAmount: 119.99,
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90001, USA',
    email: 'sarah.j@example.com',
    phone: '+1-555-0102',
    items: [
      { productId: 10, quantity: 1, price: 1199.00 }, // iPhone 15 Pro
      { productId: 17, quantity: 1, price: 49.99 }, // Power bank
    ],
    daysAgo: 3,
  },
  {
    status: OrderStatus.PROCESSING,
    totalAmount: 449.98,
    shippingCost: 10.00,
    taxAmount: 36.00,
    shippingAddress: '789 Pine Rd, Chicago, IL 60601, USA',
    email: 'm.chen@example.com',
    phone: '+1-555-0103',
    items: [
      { productId: 7, quantity: 1, price: 399.99 }, // Samsung Watch
      { productId: 15, quantity: 1, price: 34.99 }, // Anker hub
    ],
    daysAgo: 1,
  },
  {
    status: OrderStatus.PENDING,
    totalAmount: 879.97,
    shippingCost: 0,
    taxAmount: 70.40,
    shippingAddress: '321 Elm St, Houston, TX 77001, USA',
    email: 'emily.d@example.com',
    phone: '+1-555-0104',
    items: [
      { productId: 11, quantity: 1, price: 1419.99 }, // Samsung S24
      { productId: 1, quantity: 1, price: 199.00 }, // AirPods Pro
    ],
    daysAgo: 0,
  },
  {
    status: OrderStatus.DELIVERED,
    totalAmount: 559.97,
    shippingCost: 12.00,
    taxAmount: 44.80,
    shippingAddress: '654 Maple Dr, Phoenix, AZ 85001, USA',
    email: 'd.wilson@example.com',
    phone: '+1-555-0105',
    items: [
      { productId: 14, quantity: 1, price: 749.00 }, // iPad Air
      { productId: 5, quantity: 1, price: 99.95 }, // JBL speaker
    ],
    daysAgo: 12,
  },
  {
    status: OrderStatus.CANCELLED,
    totalAmount: 328.99,
    shippingCost: 8.00,
    taxAmount: 26.32,
    shippingAddress: '987 Cedar Ln, Philadelphia, PA 19101, USA',
    email: 'john.smith@example.com',
    phone: '+1-555-0101',
    items: [
      { productId: 2, quantity: 1, price: 299.00 }, // Bose earbuds
      { productId: 6, quantity: 1, price: 34.99 }, // Anker hub
    ],
    daysAgo: 20,
  },
];

async function main() {
  console.log('🌱 Start seeding ...')

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.savedItem.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verification.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();
  console.log('🗑️  Cleared existing data');

  // Create users
  const createdUsers = [];
  for (const u of users) {
    const hashedPassword = await hash(u.password, 12);
    const user = await prisma.user.create({
      data: {
        name: u.name,
        email: u.email,
        password: hashedPassword,
        role: u.role,
        emailVerified: true,
      },
    });
    createdUsers.push(user);
    console.log(`👤 Created user: ${user.email} (${user.role})`);
  }

  // Create products
  const createdProducts = [];
  for (const p of products) {
    const product = await prisma.product.create({
      data: {
        ...p,
        price: Number(p.price),
        salePrice: p.salePrice ? Number(p.salePrice) : null,
        stock: Number(p.stock),
        rating: Number(p.rating),
        reviews: Number(p.reviews),
      },
    });
    createdProducts.push(product);
    console.log(`📦 Created product: ${product.name} (SKU: ${product.sku})`);
  }

  // Create orders
  for (const o of orders) {
    const orderDate = new Date();
    orderDate.setDate(orderDate.getDate() - o.daysAgo);

    const user = createdUsers.find(u => u.email === o.email);
    
    const order = await prisma.order.create({
      data: {
        userId: user?.id,
        status: o.status,
        totalAmount: o.totalAmount,
        shippingCost: o.shippingCost,
        taxAmount: o.taxAmount,
        shippingAddress: o.shippingAddress,
        billingAddress: o.shippingAddress,
        email: o.email,
        phone: o.phone,
        createdAt: orderDate,
        items: {
          create: o.items.map((item) => ({
            productId: createdProducts[item.productId].id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });
    console.log(`📋 Created order: ${order.id} (${order.status})`);
  }

  // Create addresses for users
  for (const user of createdUsers) {
    await prisma.address.create({
      data: {
        userId: user.id,
        street: '123 User Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
        isDefault: true,
      },
    });
  }

  // Create some saved items
  if (createdUsers[1] && createdProducts[0]) {
    await prisma.savedItem.create({
      data: {
        userId: createdUsers[1].id,
        productId: createdProducts[0].id,
      },
    });
  }

  console.log('✅ Seeding finished successfully!');
  console.log('\n📊 Summary:');
  console.log(`   - ${createdUsers.length} users created`);
  console.log(`   - ${createdProducts.length} products created`);
  console.log(`   - ${orders.length} orders created`);
  console.log('\n🔐 Admin credentials:');
  console.log('   Email: sourovsd00@gmail.com');
  console.log('   Password: Admin@123');
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seeding error:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
