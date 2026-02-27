# ShopModern — Premium E-commerce Experience

ShopModern is a state-of-the-art e-commerce platform built with **Next.js 15**, **Tailwind CSS 4**, and **Framer Motion**. It features a modern, high-performance architecture with a focus on premium aesthetics and fluid user interactions.

![ShopModern Banner](https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80)

## ✨ Features

- **🚀 High Performance**: Built with Next.js 15 App Router and React Server Components.
- **🎨 Premium Aesthetics**: Dynamic dark mode support, glassmorphism UI, and curated HSL color palettes.
- **✨ Advanced Animations**:
  - **Entrance Sequence**: Cinematic brand reveal on initial load.
  - **Parallax Hero**: Immersive depth effects on the product showcase.
  - **Scroll Reveal**: Staggered content entrance as you explore.
  - **Page Transitions**: Smooth, global route transitions using `template.tsx`.
- **🛡️ Secure & Scalable**:
  - **Auth**: Fully integrated authentication with role-based access control (RBAC).
  - **Database**: PostgreSQL with Prisma ORM for robust data management.
  - **Security**: Remediated hardcoded secrets and environment-based configuration.
- **📱 Responsive Design**: Seamless experience across mobile, tablet, and desktop.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [Prisma](https://www.prisma.io/) with [PostgreSQL](https://www.postgresql.org/)
- **State Management**: React Context API
- **Icons**: [Lucide React](https://lucide.dev/) & [Google Material Symbols](https://fonts.google.com/icons)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd e-shopping
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```env
   DATABASE_URL="your-postgresql-url"
   SEED_ADMIN_PASSWORD="your-secure-admin-password"
   SEED_USER_PASSWORD="your-secure-user-password"
   ```

4. Run database migrations and seed data:

   ```bash
   npx prisma db push
   npx prisma db seed
   ```

5. Start the development server:
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the shop.

## 🔑 Default Credentials (Seed Data)

**Admin Account:**

- **Email:** `sourovsd00@gmail.com`
- **Password:** `Admin@123` (unless overridden in `.env`)

**User Account:**

- **Email:** `john.smith@example.com`
- **Password:** `User@123` (unless overridden in `.env`)

---

Developed with ❤️ for a modern shopping experience.
