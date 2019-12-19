#!/bin/bash

echo "Starting unit testing"
docker run ${SVC_NAME}_build:latest npm run test_prod
echo "Finished unit testing"