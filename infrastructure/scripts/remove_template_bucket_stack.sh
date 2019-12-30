#!/bin/bash

PIPELINE_STACK_NAME=${1}
TEMPLATE_BUCKET_NAME=$(aws cloudformation describe-stacks --stack-name ${PIPELINE_STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='IaCTemplateBucketName'].OutputValue" --output text)

aws s3 rm s3://${TEMPLATE_BUCKET_NAME} --recursive

aws cloudformation delete-stack --stack-name ${PIPELINE_STACK_NAME}
