FROM library/ubuntu

ENV NODE_ENV staging
ENV AWS_ACCESS_KEY ""
ENV AWS_SECRET_KEY ""
ENV S3_BUCKET ""
ENV USERNAME ""
ENV PASSWORD ""

EXPOSE 3000

CMD [ "node", "server/server.js" ]

RUN apt-get update && \
  apt-get install --yes wget ssh sshpass && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash

# Copy app files
RUN mkdir -p /var/www/app
WORKDIR /var/www/app

ENV NVM_DIR /root/.nvm
ENV NODE_VERSION 5.8.0
ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN . $NVM_DIR/nvm.sh \
  && nvm install $NODE_VERSION \
  && nvm alias default $NODE_VERSION \
  && nvm use default

COPY package.json package.json
RUN npm install

COPY . .
