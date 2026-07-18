# Backend Architecture
# Catalog Omah Ban

---

## 1. Tech Stack

| Layer | Technology | Alasan |
|-------|-----------|--------|
| Framework | Next.js 14+ (App Router) | SSR, API routes, file-based routing |
| Language | TypeScript | Type safety, DX |
| ORM | Prisma | Type-safe DB access, migrations |
| Database | PostgreSQL | Relational data, JSON support |
| Auth | NextAuth.js v5 | Credentials + Google OAuth |
| AI | OpenAI SDK (BYOK) | User provides own API key |
| Validation | Zod | Schema validation, type inference |
| Styling | Tailwind CSS + shadcn/ui | Rapid UI development |
| State | Zustand | Lightweight client state |
| Caching | Next.js built-in + React Query | Server + client caching |

---

## 2. Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/page.tsx
│   │   ├── katalog/
│   │   │   ├── ban/page.tsx
│   │   │   ├── ban/[id]/page.tsx
│   │   │   ├── velg/page.tsx
│   │   │   ├── velg/[id]/page.tsx
│   │   │   └── layout.tsx
│   │   ├── mobil/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── learning/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── ai-chat/page.tsx
│   │   ├── settings/page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── ban/route.ts
│   │   ├── ban/[id]/route.ts
│   │   ├── velg/route.ts
│   │   ├── velg/[id]/route.ts
│   │   ├── mobil/route.ts
│   │   ├── mobil/[id]/route.ts
│   │   ├── learning/route.ts
│   │   ├── learning/[slug]/route.ts
│   │   ├── ai-chat/route.ts
│   │   ├── ai-chat/stream/route.ts
│   │   ├── user/garage/route.ts
│   │   ├── user/favorites/route.ts
│   │   ├── user/api-key/route.ts
│   │   └── search/route.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── MobileNav.tsx
│   │   └── Breadcrumb.tsx
│   ├── katalog/
│   │   ├── TireCard.tsx
│   │   ├── RimCard.tsx
│   │   ├── CarCard.tsx
│   │   ├── TireSizeDisplay.tsx
│   │   ├── PCDDisplay.tsx
│   │   ├── FilterPanel.tsx
│   │   └── ComparisonTable.tsx
│   ├── learning/
│   │   ├── ArticleCard.tsx
│   │   ├── ProgressTracker.tsx
│   │   ├── QuizComponent.tsx
│   │   └── GlossarySearch.tsx
│   ├── ai-chat/
│   │   ├── ChatWindow.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── ChatInput.tsx
│   │   ├── QuickPrompts.tsx
│   │   └── APIStatusBadge.tsx
│   └── shared/
│       ├── SearchBar.tsx
│       ├── StatCard.tsx
│       ├── FavoriteButton.tsx
│       └── LoadingSkeleton.tsx
├── lib/
│   ├── db.ts            # Prisma client singleton
│   ├── auth.ts          # NextAuth config
│   ├── ai.ts            # OpenAI client helper
│   ├── encryption.ts    # API key encryption
│   ├── validators.ts    # Zod schemas
│   └── utils.ts         # Helper functions
├── hooks/
│   ├── useSearch.ts
│   ├── useFavorites.ts
│   ├── useChat.ts
│   └── useGarage.ts
├── store/
│   ├── sidebar.ts       # Sidebar state
│   ├── filters.ts       # Filter state
│   └── chat.ts          # Chat state
└── types/
    ├── tire.ts
    ├── rim.ts
    ├── car.ts
    ├── article.ts
    └── user.ts
```

---

## 3. Database Schema (Prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==================== USER ====================

model User {
  id              String    @id @default(cuid())
  email           String    @unique
  name            String?
  passwordHash    String?              // null if OAuth only
  avatar          String?
  apiKeyEncrypted String?              // encrypted OpenAI API key
  apiKeyIV        String?              // initialization vector
  preferredModel  String?   @default("gpt-4o-mini")
  
  cars            Car[]
  favorites       Favorite[]
  chatSessions    ChatSession[]
  learningProgress LearningProgress[]
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  @@map("users")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

// ==================== TIRE (BAN) ====================

model TireBrand {
  id        String  @id @default(cuid())
  name      String  @unique
  logo      String?
  country   String?
  website   String?
  
  tires     Tire[]
  
  @@map("tire_brands")
}

model Tire {
  id            String      @id @default(cuid())
  brandId       String
  model         String
  fullName      String                 // "Bridgestone Ecopia EP150"
  
  // Size
  width         Int                   // 185 (mm)
  profile       Int                   // 65 (%)
  rimDiameter   Int                   // 15 (inch)
  sizeString    String                // "185/65 R15"
  
  // Specs
  loadIndex     Int?                  // 88
  speedRating   String?               // "H"
  loadIndexKg   Float?                // 560 (derived)
  speedRatingKmh Int?                 // 210 (derived)
  
  // Details
  type          TireType              // TOURING, SPORT, OFF_ROAD, ALL_TERRAIN
  treadPattern  String?               // "Symmetrical", "Asymmetrical", "Directional"
  isRunflat     Boolean   @default(false)
  isTubeless    Boolean   @default(true)
  
  // Pricing
  priceMin      Int?                  // 600000 (IDR)
  priceMax      Int?                  // 750000 (IDR)
  
  // Metadata
  description   String?   @db.Text
  imageUrl      String?
  externalUrl   String?
  
  // Relations
  brand         TireBrand @relation(fields: [brandId], references: [id])
  carTires      CarTire[]
  favorites     Favorite[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@index([sizeString])
  @@index([brandId])
  @@index([type])
  @@index([width, profile, rimDiameter])
  @@map("tires")
}

enum TireType {
  TOURING
  SPORT
  OFF_ROAD
  ALL_TERRAIN
  PERFORMANCE
  ECO
  WINTER
}

// ==================== RIM (VELG) ====================

model RimBrand {
  id        String  @id @default(cuid())
  name      String  @unique
  logo      String?
  country   String?
  website   String?
  
  rims      Rim[]
  
  @@map("rim_brands")
}

model Rim {
  id            String    @id @default(cuid())
  brandId       String
  model         String
  fullName      String               // "Enkei RPF1"
  
  // Size
  diameter      Int                  // 15 (inch)
  width         Float                // 7 (inch) - "7J"
  sizeString    String               // "15x7"
  
  // Fitment
  pcd           String               // "4x100", "5x114.3"
  boltCount     Int                  // 4
  boltSpacing   Float                // 100 (mm)
  offset        Int                  // 35 (ET35)
  centerBore    Float?               // 60.1 (mm)
  
  // Details
  material      RimMaterial          // ALLOY, STEEL, FORGED
  color         String?              // "Silver", "Black", "Gold"
  weight        Float?               // kg per piece
  
  // Pricing
  pricePerPiece Int?                 // 4500000 (IDR)
  priceSet      Int?                 // 18000000 (set of 4)
  
  // Metadata
  description   String?  @db.Text
  imageUrl      String?
  externalUrl   String?
  
  // Relations
  brand         RimBrand @relation(fields: [brandId], references: [id])
  carRims       CarRim[]
  favorites     Favorite[]
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  @@index([pcd])
  @@index([diameter])
  @@index([brandId])
  @@map("rims")
}

enum RimMaterial {
  ALLOY
  STEEL
  FORGED
  FLOW_FORMED
  CARBON
}

// ==================== CAR (MOBIL) ====================

model CarBrand {
  id        String  @id @default(cuid())
  name      String  @unique           // "Toyota", "Honda"
  logo      String?
  country   String?
  
  cars      Car[]
  
  @@map("car_brands")
}

model Car {
  id            String    @id @default(cuid())
  brandId       String
  model         String                // "Avanza"
  generation    String?               // "Gen 2"
  yearStart     Int                   // 2012
  yearEnd       Int?                  // 2022 (null = current)
  bodyType      CarBodyType           // MPV, SUV, SEDAN, etc.
  
  // Fitment specs
  pcd           String                // "4x100"
  boltCount     Int                   // 4
  centerBore    Float?                // 60.1
  stockRimSize  String?               // "5.5Jx15"
  stockOffset   Int?                  // 40 (ET40)
  
  // Metadata
  imageUrl      String?
  description   String?   @db.Text
  
  // Relations
  brand         CarBrand  @relation(fields: [brandId], references: [id])
  carTires      CarTire[]
  carRims       CarRim[]
  userCars      UserCar[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@index([brandId])
  @@index([bodyType])
  @@map("cars")
}

enum CarBodyType {
  MPV
  SUV
  SEDAN
  HATCHBACK
  CROSSOVER
  PICKUP
  WAGON
  COUPE
  VAN
}

// Junction: Car ↔ Tire (many-to-many with role)
model CarTire {
  id        String   @id @default(cuid())
  carId     String
  tireId    String
  role      TireRole                // STOCK, UPGRADE, OPTIONAL
  notes     String?
  
  car       Car      @relation(fields: [carId], references: [id], onDelete: Cascade)
  tire      Tire     @relation(fields: [tireId], references: [id], onDelete: Cascade)
  
  @@unique([carId, tireId])
  @@map("car_tires")
}

enum TireRole {
  STOCK
  UPGRADE
  OPTIONAL
}

// Junction: Car ↔ Rim
model CarRim {
  id        String   @id @default(cuid())
  carId     String
  rimId     String
  role      RimRole                 // STOCK, UPGRADE
  notes     String?
  
  car       Car      @relation(fields: [carId], references: [id], onDelete: Cascade)
  rim       Rim      @relation(fields: [rimId], references: [id], onDelete: Cascade)
  
  @@unique([carId, rimId])
  @@map("car_rims")
}

enum RimRole {
  STOCK
  UPGRADE
}

// ==================== USER GARAGE ====================

model UserCar {
  id        String   @id @default(cuid())
  userId    String
  carId     String
  nickname  String?                // "Avanza Putih"
  year      Int?                   // 2019
  notes     String?
  
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  car       Car      @relation(fields: [carId], references: [id], onDelete: Cascade)
  
  createdAt DateTime @default(now())
  
  @@unique([userId, carId])
  @@map("user_cars")
}

// ==================== FAVORITES ====================

model Favorite {
  id        String     @id @default(cuid())
  userId    String
  itemType  FavoriteItemType         // TIRE, RIM, ARTICLE
  tireId    String?
  rimId     String?
  articleId String?
  
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  tire      Tire?    @relation(fields: [tireId], references: [id], onDelete: Cascade)
  rim       Rim?     @relation(fields: [rimId], references: [id], onDelete: Cascade)
  
  createdAt DateTime @default(now())
  
  @@unique([userId, itemType, tireId, rimId, articleId])
  @@map("favorites")
}

enum FavoriteItemType {
  TIRE
  RIM
  ARTICLE
}

// ==================== LEARNING ====================

model Article {
  id          String        @id @default(cuid())
  title       String
  slug        String        @unique
  excerpt     String?
  content     String        @db.Text
  category    ArticleCategory
  difficulty  Difficulty
  imageUrl    String?
  
  // Relations
  progress    LearningProgress[]
  favorites   Favorite[]
  
  published   Boolean       @default(false)
  publishedAt DateTime?
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
  
  @@index([category])
  @@index([difficulty])
  @@index([slug])
  @@map("articles")
}

enum ArticleCategory {
  BAN_101
  VELG_101
  TIPS
  NEWS
  REVIEW
}

enum Difficulty {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}

model GlossaryTerm {
  id          String   @id @default(cuid())
  term        String   @unique
  definition  String   @db.Text
  category    String?
  example     String?
  imageUrl    String?
  
  createdAt   DateTime @default(now())
  
  @@index([term])
  @@map("glossary_terms")
}

model LearningProgress {
  id          String   @id @default(cuid())
  userId      String
  articleId   String
  progress    Int      @default(0)    // 0-100
  completed   Boolean  @default(false)
  lastReadAt  DateTime @default(now())
  
  user        User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  article     Article @relation(fields: [articleId], references: [id], onDelete: Cascade)
  
  @@unique([userId, articleId])
  @@map("learning_progress")
}

// ==================== CHAT ====================

model ChatSession {
  id          String    @id @default(cuid())
  userId      String
  title       String?
  
  messages    ChatMessage[]
  
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  @@index([userId])
  @@map("chat_sessions")
}

model ChatMessage {
  id          String    @id @default(cuid())
  sessionId   String
  role        ChatRole                // USER, ASSISTANT, SYSTEM
  content     String    @db.Text
  model       String?                 // "gpt-4o-mini"
  tokensUsed  Int?
  
  session     ChatSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  
  createdAt   DateTime  @default(now())
  
  @@index([sessionId])
  @@map("chat_messages")
}

enum ChatRole {
  USER
  ASSISTANT
  SYSTEM
}
```

---

## 4. API Endpoints

### 4.1 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/[...nextauth]` | NextAuth handlers (login, OAuth) |
| POST | `/api/auth/logout` | Logout |

### 4.2 Tires (Ban)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/ban` | List tires (with filters) |
| GET | `/api/ban/[id]` | Get tire detail |
| GET | `/api/ban/size/[size]` | Get tires by size string |
| GET | `/api/ban/car/[carId]` | Get tires compatible with car |
| POST | `/api/ban` | Create tire (admin) |
| PUT | `/api/ban/[id]` | Update tire (admin) |
| DELETE | `/api/ban/[id]` | Delete tire (admin) |

**GET /api/ban Query Params:**
```
?page=1&limit=20
&search=bridgestone
&size=185/65/R15
&width=185
&profile=65
&rim=15
&brand=bridgestone
&type=TOURING
&priceMin=300000
&priceMax=2000000
&speedRating=H
&sort=price_asc|price_desc|rating|newest
```

**Response:**
```json
{
  "data": [
    {
      "id": "clx...",
      "brand": { "name": "Bridgestone", "logo": "..." },
      "model": "Ecopia EP150",
      "fullName": "Bridgestone Ecopia EP150",
      "size": { "width": 185, "profile": 65, "rim": 15, "string": "185/65 R15" },
      "loadIndex": 88,
      "speedRating": "H",
      "type": "TOURING",
      "price": { "min": 600000, "max": 750000 },
      "rating": 4.5,
      "reviewCount": 120,
      "imageUrl": "..."
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### 4.3 Rims (Velg)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/velg` | List rims (with filters) |
| GET | `/api/velg/[id]` | Get rim detail |
| GET | `/api/velg/pcd/[pcd]` | Get rims by PCD |
| GET | `/api/velg/car/[carId]` | Get rims compatible with car |
| POST | `/api/velg` | Create rim (admin) |
| PUT | `/api/velg/[id]` | Update rim (admin) |
| DELETE | `/api/velg/[id]` | Delete rim (admin) |

**GET /api/velg Query Params:**
```
?page=1&limit=20
&search=enkei
&diameter=15
&pcd=4x100
&offset=35
&material=FORGED
&brand=enkei
&priceMin=1000000
&priceMax=15000000
&sort=price_asc|price_desc|newest
```

### 4.4 Cars (Mobil)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/mobil` | List cars |
| GET | `/api/mobil/[id]` | Get car detail + compatible tires/rims |
| GET | `/api/mobil/brand/[brand]` | Get cars by brand |
| GET | `/api/mobil/by-tire/[size]` | Get cars that use tire size |
| GET | `/api/mobil/by-pcd/[pcd]` | Get cars by PCD |

### 4.5 Learning

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/learning` | List articles |
| GET | `/api/learning/[slug]` | Get article by slug |
| GET | `/api/glossary` | List/search glossary terms |
| POST | `/api/learning/progress` | Update reading progress |
| GET | `/api/learning/progress` | Get user's progress |

### 4.6 AI Chat

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai-chat` | Send message (non-streaming) |
| POST | `/api/ai-chat/stream` | Send message (SSE streaming) |
| GET | `/api/ai-chat/sessions` | List chat sessions |
| GET | `/api/ai-chat/sessions/[id]` | Get session with messages |
| DELETE | `/api/ai-chat/sessions/[id]` | Delete session |

**POST /api/ai-chat/stream Request:**
```json
{
  "sessionId": "optional-existing-session-id",
  "message": "Ban terbaik untuk Avanza apa?",
  "context": {
    "currentPage": "/katalog/ban",
    "viewingTire": "optional-tire-id"
  }
}
```

**SSE Stream Response:**
```
data: {"type":"start","sessionId":"clx..."}
data: {"type":"content","delta":"Untuk"}
data: {"type":"content","delta":" Toyota"}
data: {"type":"content","delta":" Avanza"}
data: {"type":"done","usage":{"prompt":1200,"completion":350}}
```

### 4.7 User

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/profile` | Get profile |
| PUT | `/api/user/profile` | Update profile |
| GET | `/api/user/garage` | Get user's cars |
| POST | `/api/user/garage` | Add car to garage |
| DELETE | `/api/user/garage/[id]` | Remove car from garage |
| GET | `/api/user/favorites` | Get favorites |
| POST | `/api/user/favorites` | Toggle favorite |
| PUT | `/api/user/api-key` | Save encrypted API key |
| DELETE | `/api/user/api-key` | Remove API key |
| POST | `/api/user/api-key/test` | Test API key validity |

### 4.8 Search

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/search?q=...` | Global search (tires, rims, cars, articles) |

**Response:**
```json
{
  "tires": [...],
  "rims": [...],
  "cars": [...],
  "articles": [...],
  "total": 25
}
```

---

## 5. AI Chat Architecture

### 5.1 System Prompt Template

```
Kamu adalah AI assistant untuk Catalog Omah Ban, platform pembelajaran
ban dan velg mobil di Indonesia.

KEMAMPUAN:
- Menjawab pertanyaan tentang ukuran ban per mobil
- Memberikan rekomendasi ban dan velg
- Menjelaskan istilah teknis (PCD, offset, load index, dll)
- Membantu perbandingan produk
- Tips perawatan ban dan velg

DATA YANG KAMU MILIKI:
{injected_catalog_context}

ATURAN:
1. Selalu jawab dalam Bahasa Indonesia
2. Jika tidak yakin, katakan "Saya tidak yakin, silakan cek ke toko ban terdekat"
3. Jangan memberikan harga pasti (harga berubah-ubah), berikan range
4. Selalu sebutkan sumber data jika ada
5. Untuk pertanyaan di luar ban/velg/mobil, arahkan kembali ke topik
6. Gunakan format yang rapi: bullet points, tabel untuk perbandingan

MOBIL USER (jika ada):
{user_garage_data}
```

### 5.2 Context Injection Strategy

```typescript
// lib/ai.ts

interface ChatContext {
  userMessage: string;
  userApiKey: string;
  userGarage?: Car[];
  catalogData?: {
    relevantTires?: Tire[];
    relevantRims?: Rim[];
    relevantCars?: Car[];
  };
  currentPage?: string;
}

async function getRelevantContext(message: string) {
  // 1. Extract keywords from message
  const keywords = extractKeywords(message);
  
  // 2. Search catalog for relevant data
  const [tires, rims, cars] = await Promise.all([
    searchTires(keywords),
    searchRims(keywords),
    searchCars(keywords),
  ]);
  
  // 3. Format context for system prompt
  return formatCatalogContext(tires, rims, cars);
}

function extractKeywords(message: string): string[] {
  // Extract: brand names, tire sizes, car models, technical terms
  const patterns = [
    /\b\d{3}\/\d{2}\s*R\d{2}\b/g,           // tire size: 185/65 R15
    /\b\d+x\d+(\.\d+)?\b/g,                 // rim size: 15x7
    /\b[45]x\d{3}(\.\d+)?\b/g,              // PCD: 4x100
    /\b(avanza|innova|jazz|brio|hrv|...)\b/gi, // car models
    /\b(bridgestone|dunlop|gt.?radial|...)\b/gi, // brands
    /\b(pcd|offset|et|load.?index|...)\b/gi, // technical terms
  ];
  // ... extract and deduplicate
}
```

### 5.3 Streaming Implementation

```typescript
// app/api/ai-chat/stream/route.ts

import OpenAI from 'openai';
import { decrypt } from '@/lib/encryption';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response('Unauthorized', { status: 401 });

  const { message, sessionId, context } = await req.json();
  
  // Get user's encrypted API key
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { apiKeyEncrypted: true, apiKeyIV: true },
  });
  
  if (!user?.apiKeyEncrypted) {
    return new Response('API key not configured', { status: 400 });
  }
  
  const apiKey = decrypt(user.apiKeyEncrypted, user.apiKeyIV);
  const openai = new OpenAI({ apiKey });
  
  // Get catalog context
  const catalogContext = await getRelevantContext(message);
  
  // Get or create session
  const chatSession = sessionId
    ? await getExistingSession(sessionId)
    : await createNewSession(session.user.id, message);
  
  // Build messages array
  const messages = [
    { role: 'system', content: buildSystemPrompt(catalogContext) },
    ...await getChatHistory(chatSession.id),
    { role: 'user', content: message },
  ];
  
  // Stream response
  const stream = await openai.chat.completions.create({
    model: user.preferredModel || 'gpt-4o-mini',
    messages,
    stream: true,
    temperature: 0.7,
    max_tokens: 2000,
  });
  
  // Create SSE response
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      let fullResponse = '';
      
      controller.enqueue(encoder.encode(
        `data: ${JSON.stringify({ type: 'start', sessionId: chatSession.id })}\n\n`
      ));
      
      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content || '';
        if (delta) {
          fullResponse += delta;
          controller.enqueue(encoder.encode(
            `data: ${JSON.stringify({ type: 'content', delta })}\n\n`
          ));
        }
      }
      
      // Save assistant message
      await prisma.chatMessage.create({
        data: {
          sessionId: chatSession.id,
          role: 'ASSISTANT',
          content: fullResponse,
          model: user.preferredModel,
        },
      });
      
      controller.enqueue(encoder.encode(
        `data: ${JSON.stringify({ type: 'done' })}\n\n`
      ));
      controller.close();
    },
  });
  
  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
```

---

## 6. Security

### 6.1 API Key Encryption

```typescript
// lib/encryption.ts

import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const SECRET_KEY = process.env.ENCRYPTION_KEY!; // 32 bytes hex

export function encrypt(text: string): { encrypted: string; iv: string } {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY, 'hex'), iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return {
    encrypted: encrypted + ':' + authTag.toString('hex'),
    iv: iv.toString('hex'),
  };
}

export function decrypt(encrypted: string, ivHex: string): string {
  const [encryptedText, authTagHex] = encrypted.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY, 'hex'), iv);
  decipher.setAuthTag(authTag);
  
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}
```

### 6.2 Rate Limiting

```typescript
// lib/rate-limit.ts

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests per 10 seconds
  analytics: true,
});

// Applied to AI chat endpoint
export async function checkRateLimit(userId: string) {
  const { success, limit, remaining } = await ratelimit.limit(userId);
  return { success, limit, remaining };
}
```

### 6.3 Auth Middleware

```typescript
// middleware.ts

import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: { signIn: '/login' },
});

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/katalog/:path*',
    '/mobil/:path*',
    '/learning/:path*',
    '/ai-chat/:path*',
    '/settings/:path*',
    '/api/user/:path*',
    '/api/ai-chat/:path*',
  ],
};
```

---

## 7. Environment Variables

```env
# .env.example

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/omahban"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

# Google OAuth (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Encryption (32 bytes hex for API key encryption)
ENCRYPTION_KEY="your-64-char-hex-string-here"

# Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 8. Seed Data Strategy

```typescript
// prisma/seed.ts

async function main() {
  // 1. Seed tire brands
  const tireBrands = await Promise.all([
    prisma.tireBrand.create({ data: { name: 'Bridgestone', country: 'Japan' } }),
    prisma.tireBrand.create({ data: { name: 'Dunlop', country: 'Japan' } }),
    prisma.tireBrand.create({ data: { name: 'GT Radial', country: 'Indonesia' } }),
    prisma.tireBrand.create({ data: { name: 'Yokohama', country: 'Japan' } }),
    prisma.tireBrand.create({ data: { name: 'Michelin', country: 'France' } }),
    prisma.tireBrand.create({ data: { name: 'Falken', country: 'Japan' } }),
    prisma.tireBrand.create({ data: { name: 'Accelera', country: 'Indonesia' } }),
    prisma.tireBrand.create({ data: { name: 'Hankook', country: 'South Korea' } }),
    prisma.tireBrand.create({ data: { name: 'Toyo', country: 'Japan' } }),
    prisma.tireBrand.create({ data: { name: 'Continental', country: 'Germany' } }),
  ]);

  // 2. Seed car brands
  const carBrands = await Promise.all([
    prisma.carBrand.create({ data: { name: 'Toyota', country: 'Japan' } }),
    prisma.carBrand.create({ data: { name: 'Honda', country: 'Japan' } }),
    prisma.carBrand.create({ data: { name: 'Suzuki', country: 'Japan' } }),
    prisma.carBrand.create({ data: { name: 'Daihatsu', country: 'Japan' } }),
    prisma.carBrand.create({ data: { name: 'Mitsubishi', country: 'Japan' } }),
    prisma.carBrand.create({ data: { name: 'Nissan', country: 'Japan' } }),
    prisma.carBrand.create({ data: { name: 'Mazda', country: 'Japan' } }),
    prisma.carBrand.create({ data: { name: 'Hyundai', country: 'South Korea' } }),
    prisma.carBrand.create({ data: { name: 'Kia', country: 'South Korea' } }),
    prisma.carBrand.create({ data: { name: 'Wuling', country: 'China' } }),
    prisma.carBrand.create({ data: { name: 'BMW', country: 'Germany' } }),
    prisma.carBrand.create({ data: { name: 'Mercedes-Benz', country: 'Germany' } }),
  ]);

  // 3. Seed cars (populer di Indonesia)
  // ... full data from PUBLIC-SPEC.md

  // 4. Seed tires
  // ... 100+ tire entries

  // 5. Seed rims
  // ... 50+ rim entries

  // 6. Seed articles
  // ... 20 articles for learning center

  // 7. Seed glossary
  // ... 50+ terms
}
```

---

## 9. Deployment

### Vercel (Recommended)

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npx prisma generate && next build",
  "env": {
    "DATABASE_URL": "@database-url",
    "NEXTAUTH_SECRET": "@nextauth-secret",
    "ENCRYPTION_KEY": "@encryption-key"
  }
}
```

### Docker (Self-hosted)

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package*.json ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM base AS runner
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["node", "server.js"]
```

---

**Last Updated:** 2026-07-18
**Status:** Ready for Implementation
