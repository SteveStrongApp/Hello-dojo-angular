#!/bin/bash

WEB_STACK_NAME=${1}-web
SERVICE_STACK_NAME=${1}-service
ECR_REPOSITORY_NAME=$(aws cloudformation describe-stacks --stack-name ${SERVICE_STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='RepositoryName'].OutputValue" --output text)
BUCKET_NAME=$(aws cloudformation describe-stacks --stack-name ${WEB_STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='WebsiteBucketName'].OutputValue" --output text)

aws s3 rm s3://${BUCKET_NAME} --recursive
aws cloudformation delete-stack --stack-name ${WEB_STACK_NAME}

aws ecr delete-repository --repository-name ${ECR_REPOSITORY_NAME} --force
aws cloudformation delete-stack --stack-name ${SERVICE_STACK_NAME}

