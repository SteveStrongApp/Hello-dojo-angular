#!/bin/bash

ECR_REPOSITORY=$(aws ecr describe-repositories --query 'repositories[*].repositoryUri' --output text | grep hello-dojo-service)

docker build -t hello-dojo-service -f Dockerfile .
docker tag hello-dojo-service:latest ${ECR_REPOSITORY}:latest
$(aws ecr get-login --no-include-email)
docker push ${ECR_REPOSITORY}:latest
docker logout https://${ECR_REPOSITORY}
