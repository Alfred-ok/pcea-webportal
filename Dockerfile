# Stage 1: Build the React app
FROM node:18 AS builder

WORKDIR /app

# Copy the package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:stable-alpine

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built files to the Nginx HTML directory (Make sure it's 'build/' or 'dist/')
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 8040
EXPOSE 8040

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
