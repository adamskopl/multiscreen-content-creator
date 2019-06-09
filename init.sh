#!/bin/bash

# run after npm install

LIB_DIRS=( "client-device" "client-editor" )
for libDir in "${LIB_DIRS[@]}"
do
    mkdir -p $libDir/libs
    cp node_modules/socket.io-client/dist/socket.io.js node_modules/vue/dist/vue.js $libDir/libs
done
