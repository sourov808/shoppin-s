/**
 * Site Configuration & Constants
 * Central location for all static content and configuration
 */

// Site Metadata
export const siteConfig = {
  name: "Stitch",
  tagline: "Style Beyond Expectation",
  description: "Modern E-commerce application featuring premium electronics, wearables, and accessories.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
  keywords: ["e-commerce", "electronics", "fashion", "accessories", "online shopping"],
};

// Navigation Links
export const navLinks = {
  main: [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/products?category=HEADPHONES", label: "Headphones" },
    { href: "/products?category=SPEAKERS", label: "Speakers" },
    { href: "/products?category=WEARABLES", label: "Wearables" },
  ],
  user: [
    { href: "/account", label: "Account", icon: "person" },
    { href: "/account/orders", label: "Orders", icon: "shopping_bag" },
    { href: "/account/wishlist", label: "Wishlist", icon: "favorite" },
    { href: "/cart", label: "Cart", icon: "shopping_cart" },
  ],
  admin: [
    { href: "/admin", label: "Dashboard", icon: "dashboard" },
    { href: "/admin/orders", label: "Orders", icon: "local_shipping" },
    { href: "/admin/products", label: "Products", icon: "inventory" },
    { href: "/admin/analytics", label: "Analytics", icon: "analytics" },
  ],
  footer: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
    { href: "/shipping", label: "Shipping Info" },
    { href: "/returns", label: "Returns" },
  ],
  social: [
    { href: "https://facebook.com", label: "Facebook", icon: "facebook" },
    { href: "https://twitter.com", label: "Twitter", icon: "twitter" },
    { href: "https://instagram.com", label: "Instagram", icon: "instagram" },
    { href: "https://youtube.com", label: "YouTube", icon: "youtube" },
  ],
};

// Product Categories with Images
export const categories = [
  {
    id: "HEADPHONES",
    name: "Headphones",
    description: "Premium audio experience",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    href: "/products?category=HEADPHONES",
  },
  {
    id: "SPEAKERS",
    name: "Speakers",
    description: "Powerful sound systems",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
    href: "/products?category=SPEAKERS",
  },
  {
    id: "WEARABLES",
    name: "Wearables",
    description: "Smart devices for everyday",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80",
    href: "/products?category=WEARABLES",
  },
  {
    id: "SMARTPHONES",
    name: "Smartphones",
    description: "Latest mobile technology",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    href: "/products?category=SMARTPHONES",
  },
  {
    id: "TABLETS",
    name: "Tablets",
    description: "Portable computing power",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80",
    href: "/products?category=TABLETS",
  },
  {
    id: "ACCESSORIES",
    name: "Accessories",
    description: "Essential add-ons",
    image: "https://images.unsplash.com/photo-1512446733611-9099a758e236?w=800&q=80",
    href: "/products?category=ACCESSORIES",
  },
];

// Hero Section Content
export const heroContent = {
  badge: "Summer Collection 2024",
  title: "Style Beyond Expectation",
  subtitle: "Experience the perfect blend of premium craftsmanship and contemporary design. Elevate your wardrobe with our latest curated essentials.",
  ctaPrimary: "Explore Now",
  ctaSecondary: "View Lookbook",
  backgroundImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80",
};

// Feature Sections
export const features = [
  {
    icon: "local_shipping",
    title: "Free Shipping",
    description: "Free shipping on orders over $50",
  },
  {
    icon: "security",
    title: "Secure Payment",
    description: "100% secure payment processing",
  },
  {
    icon: "refund",
    title: "Easy Returns",
    description: "30-day money back guarantee",
  },
  {
    icon: "support_agent",
    title: "24/7 Support",
    description: "Dedicated customer support",
  },
];

// Testimonials
export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Verified Buyer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    content: "The quality of the products is absolutely amazing. I've bought three items so far and they all exceeded my expectations.",
  },
  {
    id: 2,
    name: "Michael Brown",
    role: "Verified Buyer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 4.5,
    content: "Super fast shipping and the customer service team was very helpful when I needed to make a return.",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Verified Buyer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
    content: "Best online shopping experience I've had. The products are exactly as described and the quality is top-notch.",
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Verified Buyer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    rating: 5,
    content: "I'm impressed with the attention to detail. From packaging to product quality, everything is perfect.",
  },
];

// Footer Links
export const footerLinks = {
  shop: [
    { label: "All Products", href: "/products" },
    { label: "New Arrivals", href: "/products?sort=newest" },
    { label: "Best Sellers", href: "/products?sort=popular" },
    { label: "Sale", href: "/products?sale=true" },
  ],
  support: [
    { label: "Help Center", href: "/faq" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Returns", href: "/returns" },
    { label: "Track Order", href: "/account/orders" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Blog", href: "/blog" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

// Pricing Plans (for admin upsell)
export const pricingPlans = {
  free: {
    name: "Free",
    price: 0,
    features: ["Basic analytics", "Up to 100 products", "Standard support"],
  },
  pro: {
    name: "Pro",
    price: 29,
    features: ["Advanced analytics", "Unlimited products", "Priority support", "Custom branding"],
  },
  enterprise: {
    name: "Enterprise",
    price: 99,
    features: ["Everything in Pro", "Multi-store management", "Dedicated account manager", "API access"],
  },
};

// Order Status Configuration
export const orderStatusConfig: Record<string, { label: string; color: string; icon: string }> = {
  PENDING: { label: "Pending", color: "orange", icon: "schedule" },
  PROCESSING: { label: "Processing", color: "blue", icon: "manufacturing" },
  SHIPPED: { label: "Shipped", color: "purple", icon: "local_shipping" },
  DELIVERED: { label: "Delivered", color: "emerald", icon: "check_circle" },
  CANCELLED: { label: "Cancelled", color: "red", icon: "cancel" },
};

// Product Status Configuration
export const productStatusConfig = {
  active: { label: "Active", color: "emerald" },
  draft: { label: "Draft", color: "slate" },
  outOfStock: { label: "Out of Stock", color: "red" },
  lowStock: { label: "Low Stock", color: "orange" },
};

// Animation Delays (in ms)
export const animationDelays = {
  fast: 100,
  normal: 200,
  slow: 300,
};

// Cache Configuration
export const cacheConfig = {
  products: 1800, // 30 minutes
  categories: 3600, // 1 hour
  homepage: 1800, // 30 minutes
};

// Image Optimization Settings
export const imageConfig = {
  formats: ["image/webp", "image/avif"],
  sizes: {
    thumbnail: "200px",
    small: "400px",
    medium: "800px",
    large: "1200px",
    xlarge: "1600px",
  },
  quality: {
    default: 80,
    high: 90,
    low: 60,
  },
};

// SEO Defaults
export const seoDefaults = {
  titleTemplate: "%s | Stitch",
  defaultTitle: "Stitch - Premium Electronics & Accessories",
  defaultDescription: "Shop the latest electronics, headphones, wearables, and accessories. Free shipping on orders over $50.",
};
