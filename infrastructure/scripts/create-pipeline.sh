#!/bin/bash

BOOTSTRAP_STACK_NAME=${1}
APPLICATION_NAME=${2}

TEMPLATE_BUCKET=$(aws cloudformation describe-stacks --stack-name ${BOOTSTRAP_STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='IaCTemplateBucketName'].OutputValue" --output text)
VPC_ID=$(aws cloudformation describe-stacks --stack-name ${BOOTSTRAP_STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='VpcId'].OutputValue" --output text)
SUBNET_1=$(aws cloudformation describe-stacks --stack-name ${BOOTSTRAP_STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='PublicSubnet1'].OutputValue" --output text)
SUBNET_2=$(aws cloudformation describe-stacks --stack-name ${BOOTSTRAP_STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='PublicSubnet2'].OutputValue" --output text)
PRIVATE_SUBNET_1=$(aws cloudformation describe-stacks --stack-name ${BOOTSTRAP_STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='PrivateSubnet1'].OutputValue" --output text)
PRIVATE_SUBNET_2=$(aws cloudformation describe-stacks --stack-name ${BOOTSTRAP_STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='PrivateSubnet2'].OutputValue" --output text)

aws cloudformation deploy \
  --stack-name ${APPLICATION_NAME}-pipeline \
  --no-fail-on-empty-changeset \
  --template-file ./infrastructure/pipeline/pipeline.yaml \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides ApplicationName=${APPLICATION_NAME} \
  TemplateBucket=${TEMPLATE_BUCKET} \
  VpcId=${VPC_ID} \
  Subnet1=${SUBNET_1} \
  Subnet2=${SUBNET_2} \
  PrivateSubnet1=${PRIVATE_SUBNET_1} \
  PrivateSubnet2=${PRIVATE_SUBNET_2}
