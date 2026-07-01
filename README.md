# MICROSERVICE-CONSOLE
A Product Service and an Order Service communicate over TCP to validate stock and assemble orders. The client renders forms straight from JSON — no hardcoded fields, no rebuilds for schema changes.
microservices-app/

├── README.md ← setup guide with your name

├── product-service/ ← NestJS, port 3001, REST + TCP hybrid

├── order-service/ ← NestJS, port 3002, talks to product service

└── client-app/

    ├── src/ ← Next.js 14 source (components, pages, schema)

    └── out/ ← pre-built static site for Netlify
