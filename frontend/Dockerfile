# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Add labels
LABEL maintainer="parknich081@gmail.com"
LABEL version="1.0"
LABEL description="This is a Docker image for a Create-React-App project."

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build && echo "Build successful" || echo "Build failed"

# Remove the existing bg2.mp4 file from the build directory
RUN rm -f build/bg2.mp4

# Download the new bg2.mp4 file
RUN wget -O build/bg2.mp4 https://files.catbox.moe/xjsz9u.mp4

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["node", "server.js"]
