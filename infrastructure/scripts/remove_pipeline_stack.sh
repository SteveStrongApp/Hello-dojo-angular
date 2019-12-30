#!/bin/bash

PIPELINE_STACK_NAME=${1}
ECR_REPOSITORY_NAME=$(aws cloudformation describe-stacks --stack-name ${PIPELINE_STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='RepositoryName'].OutputValue" --output text)
SOURCE_BUCKET_NAME=$(aws cloudformation describe-stacks --stack-name ${PIPELINE_STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='SourceBucketName'].OutputValue" --output text)
ARTIFACT_BUCKET_NAME=$(aws cloudformation describe-stacks --stack-name ${PIPELINE_STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='ArtifactBucketName'].OutputValue" --output text)

./infrastructure/scripts/delete_all_object_versions.sh ${SOURCE_BUCKET_NAME}
./infrastructure/scripts/delete_all_object_versions.sh ${ARTIFACT_BUCKET_NAME}

aws s3 rm s3://${SOURCE_BUCKET_NAME} --recursive
aws s3 rm s3://${ARTIFACT_BUCKET_NAME} --recursive

aws ecr delete-repository --repository-name ${ECR_REPOSITORY_NAME} --force
aws cloudformation delete-stack --stack-name ${PIPELINE_STACK_NAME}

