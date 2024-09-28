FROM node:20

# Install MySQL client
RUN apt-get update && apt-get install -y default-mysql-client

# Set environment variables for Node.js application
ENV PORT=3000
ENV JWT_SECRET=thisIsSecret
ENV MYSQL_HOST=localhost
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=
ENV MYSQL_DATABASE=railway_management

# Create a directory for the Node.js application
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port on which the Node.js application will run
EXPOSE 3000

# Command to run the Node.js application
CMD ["node", "server.js"]
