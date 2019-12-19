#!/bin/bash

# build the angular build and image
echo "Starting build image ->" ${SVC_NAME}_build:latest
docker build -t ${SVC_NAME}_build:latest -f DockerfileBuild .
echo "Finished build"