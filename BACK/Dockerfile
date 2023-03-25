FROM ghcr.io/puppeteer/puppeteer:19.6.3

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

ENV NODE_OPTIONS="--max-old-space-size=8192"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

CMD [ "node" ,"index.js" ]
