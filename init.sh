#!/bin/bash

# run after npm install

mkdir libs
cp node_modules/socket.io-client/dist/socket.io.js node_modules/vue/dist/vue.js libs
