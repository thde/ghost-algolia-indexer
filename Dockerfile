FROM node:8-alpine
COPY ghost-algolia-indexer.js package.json package-lock.json ./
RUN npm install && npm link
CMD ["/usr/local/bin/ghost-algolia-indexer"]
