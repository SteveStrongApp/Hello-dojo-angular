#!/bin/bash

STACK_NAME=${1}
ECR_REPOSITORY=$(aws ecr describe-repositories --query 'repositories[*].repositoryUri' --output text | grep ${STACK_NAME})
EXIT_STATUS=0

aws cloudformation deploy --stack-name ${STACK_NAME} --no-fail-on-empty-changeset --template-file ./infrastructure/service/ecs.yaml --capabilities CAPABILITY_IAM --parameter-overrides ImageUrl=${ECR_REPOSITORY}
