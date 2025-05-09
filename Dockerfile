# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy source code
COPY . .

# Expose the port
EXPOSE 5000

# Install global ts-node-dev for hot reloading (optional)
RUN yarn global add ts-node-dev

# Start the dev server with hot-reload
CMD ["yarn", "dev"]
