#!/bin/bash

mkdir -p libs
cp node_modules/socket.io-client/dist/socket.io.js* node_modules/vue/dist/vue.js node_modules/normalize.css/normalize.css libs
nodemon --experimental-modules --ignore client-device --ignore client-editor server/server.mjs
