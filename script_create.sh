#!/bin/bash
export SERVICE_NAME="dojofrontend"
# printenv

docker build -t ${SERVICE_NAME}_build:latest -f Dockerfile-build  .