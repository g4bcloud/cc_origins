# Base on Node 18
FROM node:18-alpine

WORKDIR /usr/src/app

# 1) Copy deps, install to leverage cache
COPY package*.json yarn.lock ./
RUN yarn install --production

# 2) Bring in source
COPY . .

# 3) Patch your Sequelize JSON so "host":"db" → points at our postgres service
RUN sed -i 's/"host": *"localhost"/"host": "db"/' src/db.config.json

# 4) Expose your Express port
EXPOSE 3000

# Default: start your express server
CMD ["node", "src/server.mjs"]
