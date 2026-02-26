---
trigger: manual
---

# Auth.js

Auth.js is a runtime-agnostic authentication library based on standard Web APIs that integrates deeply with multiple modern JavaScript frameworks including Next.js, SvelteKit, Qwik, and Express. It provides a comprehensive authentication solution that supports OAuth providers (Google, GitHub, Discord, etc.), magic link email authentication, credentials-based login, and WebAuthn/Passkeys. The library offers both JWT-based stateless sessions and database-backed sessions through a wide array of official database adapters.

## Installation and Basic Setup

Install Auth.js for your framework and generate the required secret for token encryption.

```bash
# Next.js
npm install next-auth@beta

# SvelteKit
npm install @auth/sveltekit

# Express
npm install @auth/express

# Qwik
npm run qwik add auth

# Generate AUTH_SECRET environment variable
npx auth secret
```

## NextAuth Configuration

Initialize NextAuth with providers and export handlers, authentication functions, and session management utilities.

```typescript
// auth.ts
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt", // or "database"
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      return session
    },
  },
})

// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth"
export const { GET, POST } = handlers

// proxy.ts (Next.js 16+) or middleware.ts (older versions)
export { auth as proxy } from "@/auth"
```

## SvelteKit Configuration

Configure Auth.js for SvelteKit with the handle function and session access through event.locals.

```typescript
// src/auth.ts
import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/sveltekit/providers/github"
import Google from "@auth/sveltekit/providers/google"

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [GitHub, Google],
  callbacks: {
    session({ session, token }) {
      session.user.id = token.id as string
      return session
    },
  },
})

// src/hooks.server.ts
export { handle } from "./auth"

// src/routes/+layout.server.ts
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async (event) => {
  const session = await event.locals.auth()
  return { session }
}
```

## Express Configuration

Set up Auth.js with Express using the ExpressAuth middleware and session retrieval.

```typescript
// app.ts
import { ExpressAuth, getSession } from "@auth/express"
import GitHub from "@auth/express/providers/github"
import Google from "@auth/express/providers/google"
import express from "express"

const app = express()

// Trust proxy for secure cookies behind reverse proxy
app.set("trust proxy", true)

// Auth routes
app.use("/auth/*", ExpressAuth({
  providers: [GitHub, Google],
  secret: process.env.AUTH_SECRET,
}))

// Session middleware
async function authSession(req, res, next) {
  res.locals.session = await getSession(req, {
    providers: [GitHub, Google],
    secret: process.env.AUTH_SECRET,
  })
  next()
}

// Protected route middleware
async function authenticatedUser(req, res, next) {
  const session = res.locals.session ?? await getSession(req, authConfig)
  if (!session?.user) {
    res.redirect("/login")
  } else {
    next()
  }
}

app.use(authSession)
app.get("/profile", authenticatedUser, (req, res) => {
  res.render("profile", { user: res.locals.session?.user })
})
```

## OAuth Provider Configuration

Configure OAuth providers with client credentials and optional customization for profile data.

```typescript
// auth.ts
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      // Force refresh token on every sign-in
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      // Add custom profile fields
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: profile.role ?? "user",
        }
      },
    }),
  ],
  callbacks: {
    // Restrict sign-in to verified Google emails
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        return profile?.email_verified && profile?.email?.endsWith("@example.com")
      }
      return true
    },
  },
})
```

## Credentials Provider

Implement username/password authentication with custom authorization logic and validation.

```typescript
// auth.ts
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { object, string } from "zod"

const signInSchema = object({
  email: string().email("Invalid email"),
  password: string().min(8, "Password must be at least 8 characters"),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate input
        const { email, password } = await signInSchema.parseAsync(credentials)

        // Hash password and verify against database
        const pwHash = await hashPassword(password)
        const user = await db.user.findUnique({
          where: { email, passwordHash: pwHash },
        })

        if (!user) throw new Error("Invalid credentials")

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        }
      },
    }),
  ],
})

// components/sign-in.tsx (Server Component)
import { signIn } from "@/auth"

export function SignIn() {
  return (
    <form action={async (formData) => {
      "use server"
      await signIn("credentials", formData)
    }}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit">Sign In</button>
    </form>
  )
}
```

## Email Magic Link Provider

Configure passwordless email authentication with providers like Resend, Sendgrid, or Nodemailer.

```typescript
// auth.ts
import NextAuth from "next-auth"
import Resend from "next-auth/providers/resend"
import Nodemailer from "next-auth/providers/nodemailer"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Database required for email verification tokens
  adapter: PrismaAdapter(prisma),
  providers: [
    // Option 1: Resend (API key)
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "noreply@example.com",
    }),

    // Option 2: Nodemailer (SMTP)
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
})

// components/magic-link-form.tsx
import { signIn } from "@/auth"

export function MagicLinkForm() {
  return (
    <form action={async (formData) => {
      "use server"
      await signIn("resend", formData)
    }}>
      <input name="email" type="email" placeholder="Enter your email" required />
      <button type="submit">Send Magic Link</button>
    </form>
  )
}
```

## Prisma Database Adapter

Integrate Prisma for persistent user data, accounts, sessions, and verification tokens.

```typescript
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  role          String?   @default("user")
  accounts      Account[]
  sessions      Session[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Account {
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@id([provider, providerAccountId])
}

model Session {
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String
  expires    DateTime
  @@id([identifier, token])
}

// prisma.ts - Singleton pattern for Prisma client
import { PrismaClient } from "./generated/prisma"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

// auth.ts
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import GitHub from "next-auth/providers/github"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  session: { strategy: "database" }, // Use database sessions
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id
      session.user.role = user.role
      return session
    },
  },
})
```

## Session Management - Server Side

Access session data on the server using the auth() function in pages, layouts, and API routes.

```typescript
// app/dashboard/page.tsx (Next.js App Router)
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/api/auth/signin")
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <img src={session.user.image} alt="Avatar" />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}

// app/api/protected/route.ts (Next.js API Route)
import { auth } from "@/auth"
import { NextResponse } from "next/server"

export const GET = auth(async function GET(req) {
  if (!req.auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json({
    user: req.auth.user,
    message: "This is protected data",
  })
})

// pages/profile.tsx (Next.js Pages Router)
import { auth } from "@/auth"

export default function ProfilePage({ ses