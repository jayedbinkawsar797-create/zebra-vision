# Zebra Golf Cart — Luxury Street-Legal Solar-Powered Golf Carts

Official web application and interactive customizer for **Zebra Golf Cart** ([zebragolfcart.com](https://zebragolfcart.com)).

## Features

- **Interactive 3D/Customizer**: Real-time cart builder for models (Zebra 4 Cruiser, Zebra 6 Grand Cruiser, Safari Sport 4x4, Estate Elite 8).
- **Automated Lead Management**: Direct Brevo (Sendinblue) transactional email integrations routing inquiries, demo bookings, quote requests, test drives, and dealer applications to `info@zebragolfcart.com`.
- **Flexible Financing**: Integrated DealerDirect financing CTAs with dynamic loan application pre-population.
- **Showroom Locators**: Highlighting premier authorized showrooms across Florida, Arizona, and Georgia (Atlanta).
- **SEO & Performance**: Optimized responsive UI, modern SVG/PNG favicon set, OpenGraph & Twitter cards, and structured JSON-LD schema.

## Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Animations & Carousels**: Framer Motion & Embla Carousel
- **Routing**: React Router DOM v6
- **Lead Email System**: Brevo API v3 (`@sendinblue/client` / REST)
- **Deployment**: Docker + Nginx on Railway / Cloud Containers

## Getting Started

### Prerequisites

- Node.js 18+ & npm (or Bun)
- Brevo API Key (for lead notifications)

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jayedbinkawsar797-create/zebra-vision.git
   cd zebra-vision
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Set your Brevo API Key:
   ```env
   VITE_BREVO_API_KEY=your_brevo_api_key_here
   ```

4. **Start Dev Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:8080` in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   ```

## Production Deployment (Railway / Docker)

The project includes a multi-stage `Dockerfile` and dynamic Nginx configuration (`nginx.conf.template`) compatible with Railway, Render, Fly.io, or any cloud container platform that dynamically assigns a `$PORT` environment variable.

- **Port Resolution**: Handled automatically via `/etc/nginx/templates/default.conf.template` and `20-envsubst-on-templates.sh`.
- **SPA Fallback**: Configured via `try_files $uri $uri/ /index.html;`.
- **Gzip Compression**: Enabled for high performance delivery.

## License

Private repository © Zebra Golf Cart. All rights reserved.
