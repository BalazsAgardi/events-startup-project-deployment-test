# Build stage for React app
FROM node:20.12.1-alpine AS app-builder

WORKDIR /build

# Copy root package files and app package files
COPY package*.json ./
COPY app/package*.json ./app/

# Install root dependencies (for shared packages like MUI)
RUN npm install

# Copy app source code
COPY app ./app

# Install app-specific dependencies
RUN cd app && npm install

# Set build-time environment variables
ENV VITE_API_URL=/api
ENV NODE_ENV=production

# Build React app
RUN cd app && npm run build

# Final runtime stage
FROM node:20.12.1-alpine

WORKDIR /app

# Copy API package files
COPY api/package*.json ./api/

# Install API dependencies only
RUN cd api && npm install --omit=dev

# Copy API source code
COPY api ./api

# Copy built React app from builder stage
COPY --from=app-builder /build/app/dist ./api/public

# Set environment
ENV PORT=3000
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Start the API server (which will serve both the API and static React files)
CMD ["node", "api/src/index.mjs"]
