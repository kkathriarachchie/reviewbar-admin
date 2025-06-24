# ReviewBar Admin 📊

A comprehensive admin dashboard for managing the ReviewBar product review system, built with Next.js and modern web technologies.

![REVIEWBAR-ADMIN](/public/Screenshots/REVIEWBAR-ADMIN.png)

## 🌟 Description

ReviewBar Admin is the administrative interface for the ReviewBar ecosystem - an innovative product review platform that leverages Universal Product Codes (UPC) to provide real-time access to authentic product reviews. In today's fast-paced retail environment, consumers are overwhelmed with product choices and need reliable, easily accessible information to make informed purchasing decisions.

This admin panel empowers administrators to:

- Monitor platform analytics and user engagement
- Manage product reviews and maintain content quality
- Track top-performing products and review trends
- Oversee the entire ReviewBar ecosystem through intuitive dashboards

The system utilizes GS1-regulated Universal Product Codes, ensuring global product uniqueness and standardization. In Sri Lanka, these barcode licenses are issued by [GS1 Lanka](https://gs1lanka.org).

## ✨ Key Features

### 🔐 Authentication System

- **Secure Sign-In**: Administrator login with NextAuth integration
- **User Registration**: New administrator account creation
- **Session Management**: Secure session handling and user state management

### 📈 Dashboard Overview

- **Real-time Analytics**: Monitor total active products, review counts, and visitor statistics
- **Interactive Charts**: Visualize platform performance with dynamic area charts
- **Quick Stats**: Get instant insights into platform health and user engagement

### 🔍 Quick View

- **UPC Search**: Find products instantly using Universal Product Codes
- **Review Management**: View, moderate, and manage individual product reviews
- **Product Details**: Access comprehensive product information and review history

### 🏆 Top Products

- **Performance Tracking**: View the top 10 most-reviewed products
- **Rating Distribution**: Analyze review patterns with visual rating breakdowns
- **Quick Navigation**: Seamlessly jump to detailed product views

### 🎯 Analytics (Coming Soon)

- Advanced reporting and insights
- User behavior analysis
- Review trend monitoring

## 🛠️ Technologies Used

### Frontend

- **Next.js 15.3.3** - React framework with App Router
- **React 19** - Modern React with latest features
- **TypeScript 5.8.3** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Radix UI** - Accessible component primitives

### Backend & Database

- **Express.js 5.1.0** - Server framework
- **MongoDB with Mongoose 8.15.1** - Database and ODM
- **Next-Auth 4.24.11** - Authentication system

### UI Components & Icons

- **@tabler/icons-react** - Beautiful icon library
- **Lucide React** - Additional icon set
- **@tanstack/react-table** - Powerful table components
- **Recharts** - Data visualization

### Development Tools

- **Turbopack** - Fast bundler for development
- **ESLint** - Code linting
- **Concurrently** - Run multiple commands
- **ts-node-dev** - TypeScript development server

## 🚀 Installation Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- MongoDB database
- Git

### Setup Steps

1. **Clone the repository**

```bash
git clone https://github.com/kkathriarachchie/reviewbar-admin.git
cd reviewbar-admin
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Server Configuration
SERVER_PORT=5000
```

4. **Build the server**

```bash
npm run build:server
```

5. **Development Mode**
   Run both frontend and backend simultaneously:

```bash
npm run dev:all
```

Or run them separately:

```bash
# Frontend only
npm run dev

# Backend only
npm run server
```

6. **Production Build**

```bash
npm run build
npm start
```

## 📱 Available Scripts

- `npm run dev` - Start Next.js development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality
- `npm run build:server` - Compile TypeScript server code
- `npm run server` - Start the Express.js backend server
- `npm run dev:all` - Run both frontend and backend concurrently

## 🏗️ Project Structure

```
reviewbar-admin/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx              # Main dashboard
│   │   ├── quick-view/
│   │   │   └── page.tsx          # Product search & review management
│   │   └── top-products/
│   │       └── page.tsx          # Top 10 products display
│   ├── services/
│   │   └── productApi.ts         # API service functions
│   └── layout.tsx
├── components/
│   ├── ui/                       # Reusable UI components
│   ├── chart-area-interactive.tsx
│   └── RatingDistribution.tsx
├── server/
│   ├── index.ts                  # Express server entry point
│   └── tsconfig.server.json      # Server TypeScript config
└── package.json
```

## 🖼️ Screenshots

### Authentication

![Sign In](/public/Screenshots/sign-in.png)
_Secure administrator login with NextAuth integration_

![Sign Up](/public/Screenshots/sign-up.png)
_New administrator registration with form validation_

### Dashboard Overview

![Dashboard](/public/Screenshots/dashboard.png)
_Real-time analytics and platform statistics_

### Quick View - Product Search

![Quick View](/public/Screenshots/quick-view.png)
_Search products by UPC and manage reviews_

### Top Products

![Top Products](/public/Screenshots/top-products.png)
_Most reviewed products with rating distributions_

## 👥 Authors & Contact

**Developer**: [Kavishka Kathriarachchi](https://github.com/kkathriarachchie)

- GitHub: [@kkathriarachchie](https://github.com/kkathriarachchie)
- Email: [kkathriarachchie@gmail.com](mailto:kkathriarachchie"@gmail.com)
- LinkedIn: [www.linkedin.com/in/kavishka-kathriarachchi](https://www.linkedin.com/in/kavishka-kathriarachchi)

## 🙏 Acknowledgments

- [GS1 Lanka](https://gs1lanka.org) for UPC standardization
- The open-source community for amazing tools and libraries

## 📄 License

This project is private and proprietary.

## 🚧 Project Status

Currently in active development (version 1.0).

---

**ReviewBar Admin** - Empowering informed consumer decisions through intelligent product review management.
