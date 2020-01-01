#!/bin/bash

BOOTSTRAP_STACK_NAME=${1}
TEMPLATE_BUCKET_NAME=$(aws cloudformation describe-stacks --stack-name ${BOOTSTRAP_STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='IaCTemplateBucketName'].OutputValue" --output text)

./infrastructure/scripts/delete_all_object_versions.sh ${TEMPLATE_BUCKET_NAME}

aws s3 rm s3://${TEMPLATE_BUCKET_NAME} --recursive

aws cloudformation delete-stack --stack-name ${BOOTSTRAP_STACK_NAME}
