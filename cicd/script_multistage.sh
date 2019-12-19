#!/bin/bash

# build the angular build and image
echo "Starting build"
docker build -t ${SVC_NAME}:latest -f Dockerfile .
echo "Finished build"