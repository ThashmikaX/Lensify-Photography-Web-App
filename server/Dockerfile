# Use a lightweight Node.js Alpine base image
FROM node:18-alpine

# Set working directory in container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Expose the app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
