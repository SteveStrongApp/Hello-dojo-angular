#!/bin/bash

STACK_NAME=${1}-service
ECR_REPOSITORY_NAME=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='RepositoryName'].OutputValue" --output text)
ECR_REPOSITORY_IMAGE_URI=$(aws ecr describe-repositories --query 'repositories[?Name=="${ECR_REPOSITORY_NAME}"].repositoryUri' --output text )
ECS_CLUSTER_NAME=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='ECSClusterName'].OutputValue" --output text)
ECS_SERVICE_NAME=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='ECSServiceName'].OutputValue" --output text)


aws cloudformation deploy --stack-name ${STACK_NAME} --no-fail-on-empty-changeset --template-file ./infrastructure/service/template.yaml --capabilities CAPABILITY_IAM --parameter-overrides ImageUrl=${ECR_REPOSITORY_IMAGE_URI}
aws cloudformation wait stack-update-complete --stack-name ${STACK_NAME}
aws ecs update-service --cluster ${ECS_CLUSTER_NAME} --service ${ECS_SERVICE_NAME} --force-new-deployment
