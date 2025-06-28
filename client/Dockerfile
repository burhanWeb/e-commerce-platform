# Stage 1: Build
FROM node:20 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Stage 2: Serve static files
FROM node:20

WORKDIR /app

# Install a lightweight static file server
RUN npm install -g serve

# Copy build output from builder
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Serve the Vite build
CMD ["serve", "dist", "-l", "3000"]
