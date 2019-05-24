#!/bin/bash

# run after npm install

mkdir -p client/libs
cp node_modules/socket.io-client/dist/socket.io.js client/libs
cp node_modules/vue/dist/vue.js client/libs
