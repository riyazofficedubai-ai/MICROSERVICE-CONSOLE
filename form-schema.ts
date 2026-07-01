# Microservice-Based Product & Order Management System

**Author:** Syed Riyaz  
**Stack:** NestJS (microservices) · Next.js · TypeScript · Material UI · React Hook Form

---

## Project Overview

A full-stack microservice application with:

- **Product Service** (NestJS, Port 3001) — REST API + TCP microservice transport for managing products
- **Order Service** (NestJS, Port 3002) — REST API that communicates with Product Service over TCP to validate stock and create orders
- **Client App** (Next.js, Port 3000) — Responsive UI with a JSON-driven dynamic form system

### Key Feature: JSON-Driven Form Engine

The signup form renders entirely from a field-definition JSON array. Change `"fieldType": "TEXT"` to `"fieldType": "LIST"` or `"fieldType": "RADIO"` in [`client-app/src/data/signup-form-schema.ts`](client-app/src/data/signup-form-schema.ts) and the rendered component swaps — no other code changes.

---

## Architecture

```
┌─────────────────────┐         REST          ┌──────────────────────┐
│   Next.js Client    │ ──────────────────▶   │   Product Service    │
│   (Port 3000)       │                        │   (Port 3001)        │
│                     │         REST          ├──────────────────────┤
│                     │ ──────────────────▶   │   Order Service      │
│                     │                        │   (Port 3002)        │
└─────────────────────┘                        └──────────┬───────────┘
                                                          │  TCP (NestJS
                                                          │  Microservice)
                                               ┌──────────▼───────────┐
                                               │   Product Service    │
                                               │   (TCP Port 3001)    │
                                               └──────────────────────┘
```

When an order is placed:
1. Order Service sends a TCP message `{ cmd: 'check_stock' }` to Product Service
2. Product Service validates availability and returns the product snapshot
3. Order Service sends `{ cmd: 'decrement_stock' }` to reduce inventory
4. Order is recorded with a price snapshot (historical pricing)

---

## Prerequisites

- Node.js v18+ (v20 recommended)
- npm v9+

---

## Running Locally

### 1. Clone / unzip the project

```bash
cd microservices-app
```

### 2. Start the Product Service

```bash
cd product-service
npm install
npm run start:dev
# Starts on http://localhost:3001
# Swagger docs: http://localhost:3001/api/docs
```

### 3. Start the Order Service (new terminal)

```bash
cd order-service
npm install
npm run start:dev
# Starts on http://localhost:3002
# Swagger docs: http://localhost:3002/api/docs
```

### 4. Start the Client App (new terminal)

```bash
cd client-app
npm install
npm run dev
# Starts on http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

### client-app/.env.local (optional — defaults work for local dev)

```env
NEXT_PUBLIC_PRODUCT_API_URL=http://localhost:3001
NEXT_PUBLIC_ORDER_API_URL=http://localhost:3002
```

---

## API Reference

### Product Service (Port 3001)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/products` | Create a product |
| GET | `/products` | List all products (supports `?category=`, `?status=`, `?search=`) |
| GET | `/products/stats` | Inventory statistics |
| GET | `/products/:id` | Get product by ID |
| GET | `/products/sku/:sku` | Get product by SKU |
| PATCH | `/products/:id` | Update a product |
| DELETE | `/products/:id` | Delete a product |

#### TCP Microservice Commands (internal)

| Command | Payload | Description |
|---------|---------|-------------|
| `get_product` | `{ id }` | Fetch single product |
| `get_products_by_ids` | `{ ids[] }` | Fetch multiple products |
| `check_stock` | `{ id, quantity }` | Check availability |
| `decrement_stock` | `{ id, quantity }` | Reduce stock |
| `increment_stock` | `{ id, quantity }` | Restore stock (on cancel) |

### Order Service (Port 3002)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/orders` | Create an order (validates + decrements stock via Product Service) |
| GET | `/orders` | List all orders (supports `?customerId=`, `?status=`) |
| GET | `/orders/stats` | Order statistics |
| GET | `/orders/:id` | Get order by ID |
| GET | `/orders/:id/details` | Get order + live product details from Product Service |
| PATCH | `/orders/:id` | Update status / tracking |
| DELETE | `/orders/:id` | Delete order (restores stock) |

---

## Create Product + Order — Example Flow

```bash
# 1. Create a product
curl -X POST http://localhost:3001/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wireless Headphones",
    "description": "Noise-cancelling BT headphones",
    "price": 2999.00,
    "stock": 50,
    "sku": "BT-HP-001",
    "category": "ELECTRONICS"
  }'

# 2. Copy the product ID from the response, then create an order:
curl -X POST http://localhost:3002/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "cust-riyaz",
    "customerName": "Syed Riyaz",
    "customerEmail": "riyaz@example.com",
    "items": [{ "productId": "<PRODUCT_ID>", "quantity": 2 }],
    "paymentMethod": "UPI",
    "shippingAddress": {
      "fullName": "Syed Riyaz",
      "addressLine1": "123 MG Road",
      "city": "Bengaluru",
      "state": "Karnataka",
      "postalCode": "560001",
      "country": "India",
      "phone": "+91-9876543210"
    }
  }'

# 3. View the order with live product details:
curl http://localhost:3002/orders/<ORDER_ID>/details
```

---

## Deployment

### Client App → Netlify

The `client-app/out/` directory is a complete static build ready for Netlify drop.

**Option A — Drag & Drop:**  
Go to [app.netlify.com](https://app.netlify.com), click "Add new site → Deploy manually", and drag the `client-app/out/` folder.

**Option B — Git:**  
Push to GitHub → connect repo on Netlify → set:
- Build command: `npm run build`
- Publish directory: `out`
- Add env vars: `NEXT_PUBLIC_PRODUCT_API_URL`, `NEXT_PUBLIC_ORDER_API_URL`

### Backend Services → Railway / Render / Fly.io

NestJS TCP microservices need a persistent server — Netlify Functions won't work for them.

**Railway (easiest):**
```bash
# From each service directory:
railway init
railway up
```

Set `PORT` env var to `3001` (product) and `3002` (order). After deployment update `NEXT_PUBLIC_*` env vars in Netlify to point to your Railway URLs.

---

## Project Structure

```
microservices-app/
├── product-service/          # NestJS microservice — port 3001
│   └── src/
│       ├── products/
│       │   ├── dto/          # CreateProductDto, UpdateProductDto (class-validator)
│       │   ├── entities/     # Product interface + enums
│       │   ├── products.controller.ts   # REST + TCP @MessagePattern handlers
│       │   ├── products.service.ts      # Business logic + in-memory store
│       │   └── products.module.ts
│       ├── app.module.ts
│       └── main.ts           # Hybrid app: REST + TCP microservice
│
├── order-service/            # NestJS microservice — port 3002
│   └── src/
│       ├── orders/
│       │   ├── dto/          # CreateOrderDto (nested validation), UpdateOrderDto
│       │   ├── entities/     # Order interface + enums (PENDING→DELIVERED states)
│       │   ├── orders.controller.ts
│       │   ├── orders.service.ts       # TCP calls to Product Service
│       │   └── orders.module.ts
│       ├── app.module.ts     # ClientsModule registers TCP connection to Product Service
│       └── main.ts
│
└── client-app/               # Next.js 14 App Router — port 3000
    ├── out/                  # ← Netlify deploy artifact (static build)
    └── src/
        ├── app/
        │   ├── page.tsx           # Home / landing
        │   ├── signup/page.tsx    # JSON-driven signup form
        │   ├── schema-demo/page.tsx  # Live fieldType toggle demo
        │   ├── products/page.tsx  # Product CRUD
        │   └── orders/page.tsx    # Order management
        ├── components/
        │   ├── DynamicField.tsx   # Renders TEXT / LIST / RADIO / CHECKBOX / TEXTAREA
        │   ├── DynamicForm.tsx    # Consumes schema array → full validated form
        │   ├── NavBar.tsx
        │   └── ThemeRegistry.tsx
        ├── data/
        │   └── signup-form-schema.ts   # ← THE JSON CONFIG (change fieldType here)
        ├── hooks/
        │   └── useLocalStorage.ts
        ├── lib/
        │   ├── api.ts                  # Axios clients for both services
        │   ├── dynamic-form-schema.ts  # Zod schema builder + default values
        │   └── theme.ts               # MUI theme (ink/amber palette)
        └── types/
            └── form-schema.ts          # FieldDefinition, FormSchema types
```

---

## Schema System — How It Works

The JSON at `client-app/src/data/signup-form-schema.ts`:

```json
{
  "data": [
    { "id": 1, "name": "Full Name", "fieldType": "TEXT", "required": true },
    { "id": 2, "name": "Email",     "fieldType": "TEXT", "required": true },
    { "id": 6, "name": "Gender",    "fieldType": "LIST", "listOfValues1": ["Male","Female","Others"] },
    { "id": 7, "name": "Love React?", "fieldType": "RADIO", "listOfValues1": ["Yes","No"] }
  ]
}
```

1. `buildDynamicSchema()` converts it into a Zod validation schema at runtime
2. `buildDefaultValues()` seeds react-hook-form initial state from `defaultValue`
3. `DynamicForm` passes each field to `DynamicField`
4. `DynamicField` switches on `fieldType` → renders the right MUI component

**To change the form:** edit only the JSON. No component code changes.
