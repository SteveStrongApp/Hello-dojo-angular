#!/bin/bash

STACK_NAME=${1}

aws cloudformation deploy \
  --stack-name ${STACK_NAME} \
  --no-fail-on-empty-changeset \
  --template-file ./infrastructure/iac/iac_template_bucket.yaml

TEMPLATE_BUCKET_NAME=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='IaCTemplateBucketName'].OutputValue" --output text)

aws s3 cp ./infrastructure/iac/ecs_service_template.yaml s3://${TEMPLATE_BUCKET_NAME}/ecs_service_template.yaml

echo "ECS Template file is ${TEMPLATE_BUCKET_NAME}/ecs_service_template.yaml.  Pass this value into any pipeline stack you create so the pipeline knows where to download IaC templates from."
