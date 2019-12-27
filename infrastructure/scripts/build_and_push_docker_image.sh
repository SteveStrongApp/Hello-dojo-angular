#!/bin/bash

STACK_NAME=${1}
ECR_REPOSITORY_NAME=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='RepositoryName'].OutputValue" --output text)
ECR_REPOSITORY_IMAGE_URI=$(aws ecr describe-repositories --query 'repositories[?Name=="${ECR_REPOSITORY_NAME}"].repositoryUri' --output text )

docker build -t ${STACK_NAME} -f Dockerfile .
docker tag ${STACK_NAME}:latest ${ECR_REPOSITORY_IMAGE_URI}:latest
$(aws ecr get-login --no-include-email)
docker push ${ECR_REPOSITORY_IMAGE_URI}:latest
docker logout https://${ECR_REPOSITORY_IMAGE_URI}
