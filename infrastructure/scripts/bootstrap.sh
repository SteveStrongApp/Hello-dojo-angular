#!/bin/bash

STACK_NAME=${1}

aws cloudformation deploy \
  --stack-name ${STACK_NAME} \
  --no-fail-on-empty-changeset \
  --template-file ./infrastructure/iac/bootstrap.yaml

TEMPLATE_BUCKET=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='IaCTemplateBucketName'].OutputValue" --output text)

cd ./infrastructure/iac/
zip -r templates.zip ./
aws s3 cp ./ s3://${TEMPLATE_BUCKET} --recursive
cd -
