FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install app dependencies (with --legacy-peer-deps if necessary)
RUN npm install --production 
# Copy the app source code
COPY . .

# Copy .env file to the container
COPY .env ./

# Expose the port the app runs on
EXPOSE 8000

# Start the app
CMD ["node", "server.js" ]
