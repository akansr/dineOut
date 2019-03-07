FROM node:8


# Create app directory
WORKDIR /usr/src/app
ENV NODE_ENV dev
ENV NODE_CONFIG_DIR src/config
ENV API_KEY "AIzaSyBN7rdi2_s9p7AFWWKQR7gvo9hUGJf50qk"
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY /src/config ./src/config

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8000:8000

CMD [ "node", "./build/src/app.js" ]
