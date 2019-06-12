#!/bin/bash

# run after npm install

mkdir libs
cp node_modules/socket.io-client/dist/socket.io.js* node_modules/vue/dist/vue.js node_modules/normalize.css/normalize.css node_modules/pixi.js/dist/pixi.js* libs
