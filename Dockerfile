FROM node:22

WORKDIR /src
COPY package*.json ./
RUN npm install --force
COPY . .
CMD ["npm", "run", "dev"]