<div align="center">
  <i>Disclaimer: This project is a personal portfolio project inspired by Linktree. It is not affiliated with or endorsed by Linktree</i>
  <h1>🔗 Linker</h1>
  <p><strong>One Link, Every Connection</strong></p>
  <a href="https://linker.xenore.dev/"><strong>Live Preview</strong></a>
  <p>A modern Linktree clone built with Next.js 15, Convex, and real-time analytics</p>

  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#project-structure">Structure</a> •
    <a href="#deployment">Deployment</a>
  </p>
</div>

---

## 📖 Overview

**Linker** is a full-stack link-in-bio application that allows creators, influencers, and businesses to consolidate all their online presence into a single, beautiful, customizable page. Share one link that connects to everything you do.

### ✨ Why Linker?

- 🎨 **Fully Customizable** - Match your brand with custom themes, colors, and profile pictures
- 📊 **Advanced Analytics** - Track clicks, analyze visitor behavior, and understand your audience with Tinybird integration
- ⚡ **Lightning Fast** - Built on Next.js 15 and Convex for real-time updates and optimal performance
- 🔐 **Secure Authentication** - Powered by Clerk with social login support
- 📱 **Mobile Optimized** - Responsive design that looks great on any device
- 🎯 **Drag & Drop** - Intuitive link reordering with @dnd-kit
- 🌐 **Custom URLs** - Claim your unique username (e.g., `linker.app/u/yourname`)

---

## 🚀 Features

### For Users

- **Custom Link Pages** - Create beautiful, personalized landing pages
- **Username System** - Claim your unique username or use your user ID
- **Profile Customization** - Upload profile pictures, set descriptions, and choose accent colors
- **Link Management** - Add, edit, delete, and reorder links with drag-and-drop
- **Real-Time Analytics** - Track link clicks by country, date, and performance metrics
- **Mobile-First Design** - Seamless experience across all devices

### For Developers

- **Modern Stack** - Next.js 15 App Router with React 19
- **Real-Time Database** - Convex for serverless backend and live queries
- **Type Safety** - Full TypeScript with Convex validators
- **Authentication** - Clerk integration with middleware protection
- **Analytics Pipeline** - Tinybird for high-performance analytics
- **File Storage** - Built-in Convex storage for profile pictures
- **Edge Functions** - Vercel Edge for geolocation tracking

---

## 🛠 Tech Stack

### Frontend

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first styling
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI components
- **[@dnd-kit](https://dndkit.com/)** - Drag and drop functionality
- **[React Hook Form](https://react-hook-form.com/)** + **[Zod](https://zod.dev/)** - Form validation

### Backend

- **[Convex](https://convex.dev/)** - Real-time serverless database and functions
- **[Clerk](https://clerk.com/)** - Authentication and user management
- **[Tinybird](https://www.tinybird.co/)** - Real-time analytics engine
- **[Vercel](https://vercel.com/)** - Deployment and edge functions

---

## 🏃 Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Convex account ([sign up free](https://convex.dev/))
- A Clerk account ([sign up free](https://clerk.com/))
- (Optional) A Tinybird account for analytics ([sign up free](https://www.tinybird.co/))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/linktree-clone.git
   cd linktree-clone
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```bash
   # Convex
   CONVEX_DEPLOYMENT=
   NEXT_PUBLIC_CONVEX_URL=

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=

   # Tinybird Analytics (optional)
   TINYBIRD_HOST=https://api.europe-west2.gcp.tinybird.co
   TINYBIRD_TOKEN=
   ```

4. **Initialize Convex**

   ```bash
   npm run predev
   ```

   This will:
   - Initialize your Convex deployment
   - Open the Convex dashboard
   - Generate necessary types

5. **Configure Clerk**
   - Create a new application in [Clerk Dashboard](https://dashboard.clerk.com/)
   - Copy your publishable key and secret key to `.env.local`
   - Follow the [Convex Clerk integration guide](https://docs.convex.dev/auth/clerk#get-started) to create a JWT template
   - Add the JWT issuer domain to your Convex dashboard environment variables

6. **Run the development server**

   ```bash
   npm run dev
   ```

   This runs both:
   - Next.js frontend on `http://localhost:3000`
   - Convex backend with live reload

7. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) and start building!

---

## 📁 Project Structure

```
.
├── app/
│   ├── (admin)/
│   │   ├── dashboard/          # Protected dashboard routes
│   │   │   ├── page.tsx        # Main dashboard
│   │   │   ├── new-link/       # Create new link
│   │   │   ├── link/[id]/      # Edit link
│   │   │   └── billing/        # Billing page
│   │   └── layout.tsx          # Admin layout wrapper
│   ├── (public)/
│   │   └── u/[username]/       # Public profile pages
│   ├── api/
│   │   └── track-click/        # Analytics tracking endpoint
│   ├── layout.tsx              # Root layout (Clerk + Convex providers)
│   └── page.tsx                # Landing page
├── components/
│   ├── ConvexClientProvider.tsx
│   ├── CreateLinkForm.tsx
│   ├── CustomizationForm.tsx
│   ├── DashboardMetrics.tsx
│   ├── LinkAnalytics.tsx
│   ├── ManageLinks.tsx
│   ├── PublicPageContent.tsx
│   ├── SortableItem.tsx
│   ├── UsernameForm.tsx
│   ├── sections/               # Landing page sections
│   └── ui/                     # Reusable UI components
├── convex/
│   ├── schema.ts               # Database schema
│   ├── auth.config.ts          # Clerk auth configuration
│   └── lib/
│       ├── links.ts            # Link CRUD operations
│       ├── customizations.ts   # Profile customization
│       └── usernames.ts        # Username management
├── tinybird/
│   ├── datasources/            # Analytics data sources
│   ├── materializations/       # Materialized views
│   └── pipes/                  # Analytics query endpoints
├── lib/                        # Utilities and helpers
├── middleware.ts               # Clerk route protection
└── next.config.ts              # Next.js configuration
```

---

## 🗄️ Database Schema

The application uses **Convex** with the following tables:

### `usernames`

Maps user IDs to custom usernames

```typescript
{
  userId: string,
  username: string
}
Indexes: by_user_id, by_username
```

### `links`

Stores user links with ordering

```typescript
{
  userId: string,
  title: string,
  url: string,
  order: number
}
Indexes: by_user, by_user_and_order
```

### `userCustomizations`

Profile appearance settings

```typescript
{
  userId: string,
  profilePictureStorageId?: Id<"_storage">,
  description?: string,
  accentColor?: string
}
Index: by_user_id
```

---

## 📊 Analytics Pipeline

1. **User clicks a link** on a public profile (`/u/username`)
2. **Frontend sends tracking data** to `/api/track-click`
3. **API enriches data** with geolocation (Vercel Edge)
4. **Data sent to Tinybird** `link_clicks` datasource
5. **Tinybird pipes** aggregate and analyze the data
6. **Dashboard displays insights** (clicks by date, country, link performance)

---

## 🚢 Deployment

### Deploy to Vercel

1. **Push your code to GitHub**

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Vercel will auto-detect Next.js

3. **Configure environment variables**

   Add all variables from `.env.local` to Vercel:
   - `CONVEX_DEPLOYMENT`
   - `NEXT_PUBLIC_CONVEX_URL`
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `TINYBIRD_HOST` (optional)
   - `TINYBIRD_TOKEN` (optional)

4. **Configure Convex for production**

   ```bash
   npx convex deploy --prod
   ```

   Update your production Convex deployment with:
   - Clerk JWT issuer domain
   - Production environment variables

5. **Deploy!**

   Vercel will automatically deploy on every push to your main branch.

---

## 🧪 Development

### Available Scripts

```bash
# Run both frontend and backend
npm run dev

# Run only frontend
npm run dev:frontend

# Run only Convex backend
npm run dev:backend

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Initialize Convex and open dashboard
npm run predev
```

### Key Development Notes

- **Convex Schema Changes**: After modifying `convex/schema.ts`, types are automatically regenerated
- **Middleware Protection**: Dashboard routes are protected by Clerk middleware in `middleware.ts`
- **File Storage**: Profile pictures use Convex's built-in storage system
- **Link Ordering**: Links use timestamp-based ordering with drag-and-drop reordering
- **Analytics**: Tinybird integration is optional - the app works without it

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [Convex](https://convex.dev/) - For the amazing real-time backend
- [Clerk](https://clerk.com/) - For seamless authentication
- [Tinybird](https://www.tinybird.co/) - For powerful analytics
- [Vercel](https://vercel.com/) - For excellent hosting and edge functions
- [shadcn/ui](https://ui.shadcn.com/) - For beautiful UI components

---

## 📞 Support

If you have any questions or need help, please:

- Open an issue on [GitHub](https://github.com/yourusername/linktree-clone/issues)
- Check out the [Convex Documentation](https://docs.convex.dev/)
- Join the [Convex Discord Community](https://convex.dev/community)

---

<div align="center">
  Made with ❤️ using Next.js, Convex, and Clerk
</div>
