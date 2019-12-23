#!/bin/bash

STACK_NAME=${1}
EXIT_STATUS=0

set -e
echo "Checking if stack ${STACK_NAME} already exists..."

aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query 'Stacks[*].StackId' --output text || EXIT_STATUS=$?

if [ ${EXIT_STATUS} -eq 0 ]; then
  aws cloudformation update-stack --stack-name ${STACK_NAME} --template-body file://infrastructure/service/ecr.yaml
else
  aws cloudformation create-stack --stack-name ${STACK_NAME} --template-body file://infrastructure/service/ecr.yaml
fi
