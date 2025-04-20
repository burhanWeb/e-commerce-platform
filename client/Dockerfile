FROM node:20


# Create app directory
WORKDIR /app


# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install app dependencies
RUN npm install --legacy-peer-deps


# Copy app source code
COPY . .




# Expose the port the app runs on
EXPOSE 5173

# Start the app
CMD ["npm", "run", "dev"]



