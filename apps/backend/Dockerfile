# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:18

# Create and change to the app directory.
WORKDIR /app

# Copy application dependency manifests to the container image.
COPY package*.json package-lock.json ./

# Install production dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# wait-for-it.sh 스크립트 복사 및 실행 권한 부여
COPY wait-for-it.sh /usr/src/app/wait-for-it.sh
RUN chmod +x /usr/src/app/wait-for-it.sh

# Run the web service on container startup.
CMD ["./wait-for-it.sh", "db:3306", "--", "npm", "start"]