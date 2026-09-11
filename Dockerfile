# Build Stage
FROM node:22-alpine AS builder

WORKDIR /app

# Accept build-time env vars
ARG VITE_BREVO_API_KEY
ARG VITE_BREVO_SENDER_EMAIL
ARG VITE_BREVO_RECIPIENT_EMAIL

ENV VITE_BREVO_API_KEY=$VITE_BREVO_API_KEY
ENV VITE_BREVO_SENDER_EMAIL=$VITE_BREVO_SENDER_EMAIL
ENV VITE_BREVO_RECIPIENT_EMAIL=$VITE_BREVO_RECIPIENT_EMAIL

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

# Production Stage
FROM nginx:alpine

ENV PORT=80

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
