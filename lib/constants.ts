export const categories = [
  "Electronics",
  "Apparel",
  "Home & Garden",
  "Sports",
  "Toys",
  "Books",
];

export const products = [
  {
    id: "prod-1",
    name: "Wireless Noise-Canceling Headphones",
    description:
      "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and high-fidelity sound. Perfect for travel and deep work.",
    price: 299.99,
    originalPrice: 349.99,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2665&auto=format&fit=crop",
    ],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    featured: true,
  },
  {
    id: "prod-2",
    name: "Minimalist Leather Backpack",
    description:
      "Handcrafted full-grain leather backpack with laptop compartment. Durable, stylish, and perfect for daily commute.",
    price: 159.0,
    category: "Apparel",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=2574&auto=format&fit=crop",
    ],
    rating: 4.5,
    reviews: 89,
    inStock: true,
    featured: true,
  },
  {
    id: "prod-3",
    name: "Smart Fitness Watch",
    description:
      "Advanced fitness tracker with heart rate monitoring, sleep analysis, and built-in GPS. Water resistant up to 50m.",
    price: 199.5,
    originalPrice: 249.0,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2572&auto=format&fit=crop",
    ],
    rating: 4.7,
    reviews: 312,
    inStock: true,
    featured: false,
  },
  {
    id: "prod-4",
    name: "Organic Cotton T-Shirt",
    description:
      "Ultra-soft, sustainable organic cotton t-shirt with a relaxed fit. ethically made.",
    price: 28.0,
    category: "Apparel",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2680&auto=format&fit=crop",
    ],
    rating: 4.9,
    reviews: 45,
    inStock: true,
    featured: false,
  },
  {
    id: "prod-5",
    name: "Ceramic Coffee Mug Set",
    description:
      "Set of 4 artisan-crafted ceramic mugs. Microwave and dishwasher safe with a matte minimal finish.",
    price: 45.0,
    category: "Home & Garden",
    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=2670&auto=format&fit=crop",
    ],
    rating: 4.6,
    reviews: 67,
    inStock: false,
    featured: false,
  },
  {
    id: "prod-6",
    name: "Professional Camera Lens",
    description:
      "High-performance 50mm f/1.4 prime lens for stunning portraits and low-light photography.",
    price: 899.0,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2564&auto=format&fit=crop",
    ],
    rating: 4.9,
    reviews: 210,
    inStock: true,
    featured: true,
  },
];

export const recentOrders = [
  {
    id: "ORD-7392",
    customer: "Jane Doe",
    date: "2024-03-15",
    total: 327.99,
    status: "Delivered",
  },
  {
    id: "ORD-7393",
    customer: "John Smith",
    date: "2024-03-14",
    total: 159.0,
    status: "Processing",
  },
  {
    id: "ORD-7394",
    customer: "Alice Johnson",
    date: "2024-03-14",
    total: 45.0,
    status: "Shipped",
  },
  {
    id: "ORD-7395",
    customer: "Bob Williams",
    date: "2024-03-13",
    total: 1098.5,
    status: "Delivered",
  },
  {
    id: "ORD-7396",
    customer: "Charlie Brown",
    date: "2024-03-12",
    total: 28.0,
    status: "Cancelled",
  },
];

export const adminAnalytics = {
  totalRevenue: 24598.5,
  revenueGrowth: 12.5,
  totalOrders: 342,
  orderGrowth: 8.2,
  activeCustomers: 128,
  customerGrowth: 4.1,
  conversionRate: 3.2,
  conversionGrowth: -0.4,
};
