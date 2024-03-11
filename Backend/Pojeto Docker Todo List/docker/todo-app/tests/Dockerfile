FROM betrybe/puppeteer:1.0
WORKDIR /app/tests
ADD node_modules.tar.gz /app/tests
COPY . /app/tests
CMD ["npm", "test"]