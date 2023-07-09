# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app/frontend/

# Copy package.json and package-lock.json to the working directory
COPY . /app/frontend/
# Install app dependencies
RUN npm install

# Copy the entire app to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Expose the port that the app will run on

