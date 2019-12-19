#!/bin/bash

echo "Starting image build ->"  ${SVC_NAME}:latest
docker build -t ${SVC_NAME}:latest -f DockerfileDeploy .
rm -rf ./dist
echo "Finished final image build"