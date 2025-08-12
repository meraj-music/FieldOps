# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the local files to the container
COPY . .

# Expose port 3000 to the Docker host
EXPOSE 3000

# The command to run the app
CMD ["npm", "start"]