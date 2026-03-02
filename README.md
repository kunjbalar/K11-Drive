# K11 Drive

A modern cloud storage solution built with Next.js that allows users to store and manage any type of file except videos. K11 Drive provides a seamless Google Drive-like experience with robust file management capabilities.

## ✨ Features

- 📁 **Folder Management**: Create, organize, and navigate through folders
- 📄 **File Upload & Storage**: Upload and store various file types (excluding videos)
- 🔐 **Authentication**: Secure user authentication with Clerk
- 📊 **Analytics**: User behavior tracking with PostHog
- 🎨 **Modern UI**: Beautiful interface built with Tailwind CSS and shadcn/ui components
- 🔒 **Type-Safe**: Full TypeScript support for enhanced developer experience
- 💾 **Database**: PostgreSQL with Prisma ORM for reliable data management

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) with Radix UI primitives
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend & Database
- **Runtime**: [Node.js](https://nodejs.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)

### Authentication & Storage
- **Authentication**: [Clerk](https://clerk.com/) - User authentication and management
- **File Storage**: [UploadThing](https://uploadthing.com/) - File upload and storage service

### Analytics & Monitoring
- **Analytics**: [PostHog](https://posthog.com/) - Product analytics and user behavior tracking

### Development Tools
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Linting**: [ESLint](https://eslint.org/) with Next.js config
- **Formatting**: [Prettier](https://prettier.io/) with Tailwind CSS plugin
- **Type Checking**: TypeScript with strict mode
- **Environment Variables**: [@t3-oss/env-nextjs](https://env.t3.gg/) with Zod validation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v20 or higher)
- **pnpm** (v10.30.0 or higher)
- **PostgreSQL** database (local or remote)
- **Docker** (optional, for local database setup)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd google_drive
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env` file in the root directory by copying the example file:

```bash
cp .env.example .env
```

Then, fill in the following environment variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/k11_drive"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

# UploadThing
UPLOADTHING_TOKEN="your_uploadthing_token"

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY="your_posthog_key"
```

### 4. Database Setup

#### Option A: Local Database with Docker (Recommended)

If you're on Windows, you'll need WSL (Windows Subsystem for Linux):

```bash
# Open WSL
wsl

# Run the database setup script
./start-database.sh
```

For Linux/macOS:

```bash
./start-database.sh
```

#### Option B: Use Your Own PostgreSQL Database

Update the `DATABASE_URL` in your `.env` file with your PostgreSQL connection string.

### 5. Database Migration

Run Prisma migrations to set up your database schema:

```bash
# Generate Prisma Client
pnpm db:push

# Or run migrations
pnpm db:generate
```

### 6. Run Development Server

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm format:check` - Check code formatting
- `pnpm format:write` - Format code with Prettier
- `pnpm db:generate` - Generate Prisma client and run migrations
- `pnpm db:push` - Push schema changes to database
- `pnpm db:studio` - Open Prisma Studio (database GUI)
- `pnpm db:migrate` - Deploy migrations to production

## 🔧 Configuration

### Clerk Authentication

1. Sign up at [Clerk.com](https://clerk.com/)
2. Create a new application
3. Copy your publishable key and secret key to `.env`
4. Configure sign-in/sign-up settings in the Clerk dashboard

### UploadThing Setup

1. Sign up at [UploadThing.com](https://uploadthing.com/)
2. Create a new project
3. Copy your API token to `.env` as `UPLOADTHING_TOKEN`
4. Configure file upload restrictions (videos are excluded by default)

### PostHog Setup

1. Sign up at [PostHog.com](https://posthog.com/)
2. Create a new project
3. Copy your project API key to `.env` as `NEXT_PUBLIC_POSTHOG_KEY`
4. Configure analytics events as needed

## 🗄️ Database Schema

The application uses two main models:

### Folder
- Hierarchical folder structure
- User ownership tracking
- Parent-child relationships
- Timestamps for creation tracking

### File
- File metadata (name, size, URL)
- User ownership tracking
- Parent folder association
- Upload timestamps

## 📁 Project Structure

```
google_drive/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts            # Database seeding
├── public/                # Static assets
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── (home)/       # Home route group
│   │   │   ├── drive/    # Main drive interface
│   │   │   └── sign-in/  # Sign-in page
│   │   ├── api/          # API routes
│   │   │   └── uploadthing/ # UploadThing endpoints
│   │   ├── f/            # File/folder routes
│   │   ├── _providers/   # React providers
│   │   └── layout.tsx    # Root layout
│   ├── components/       # React components
│   │   └── ui/          # shadcn/ui components
│   ├── lib/             # Utility functions
│   ├── server/          # Server-side code
│   │   ├── action.ts    # Server actions
│   │   ├── db.ts        # Database client
│   │   └── queries.ts   # Database queries
│   ├── styles/          # Global styles
│   ├── env.js           # Environment validation
│   └── middleware.ts    # Clerk middleware
├── .env.example         # Environment variables template
├── components.json      # shadcn/ui configuration
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript configuration
└── tailwind.config.js   # Tailwind CSS configuration
```

## 🔐 Security

- Environment variables are validated using Zod schemas
- Authentication is handled by Clerk middleware
- File uploads are processed through UploadThing's secure service
- Database queries use Prisma's prepared statements to prevent SQL injection

## 🚢 Deployment

### Build for Production

```bash
pnpm build
```

### Environment Variables

Ensure all environment variables are properly set in your deployment platform:
- `DATABASE_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `UPLOADTHING_TOKEN`
- `NEXT_PUBLIC_POSTHOG_KEY`

### Database Migrations

Before deploying, run:

```bash
pnpm db:migrate
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run linting and type checking (`pnpm check`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- Built with [Create T3 App](https://create.t3.gg/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

**Note**: Video files are not supported in this version of K11 Drive.