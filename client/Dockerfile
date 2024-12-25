# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock from the correct path
COPY client/package.json client/yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the source code
COPY . .

# Build the frontend
RUN yarn build

# Use nginx to serve the static files
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
