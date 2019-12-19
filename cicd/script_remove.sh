#!/bin/bash

# build the angular build and image
echo "Starting remove"
docker rm -f ${SVC_NAME}_build:latest
docker rm -f ${SVC_NAME}:latest
echo "Finished remove"