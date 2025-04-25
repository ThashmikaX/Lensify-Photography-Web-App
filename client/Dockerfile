# Use a lightweight Node.js Alpine image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the frontend source code
COPY . .

# Expose port 5173 (used by Vite dev server)
EXPOSE 5173

# Start the frontend app (change this command if not using Vite)
CMD ["npm", "run", "dev"]
