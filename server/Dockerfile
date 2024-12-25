# Use Node.js as the base image
FROM node:20.15

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock from the correct paths
COPY server/package.json server/yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the source code
COPY . .

# Expose the necessary port
EXPOSE 5100

# Run the app
CMD ["yarn", "start"]
