FROM node:16-alpine
EXPOSE 3001
WORKDIR /app/back-end
ADD node_modules.tar.gz /app/back-end
COPY . /app/back-end
CMD ["start"]
ENTRYPOINT ["npm"]