#!/bin/bash

STACK_NAME=${1}
APPLICATION_NAME=${2}
TEMPLATE_FILE=${3}

aws cloudformation deploy \
  --stack-name ${STACK_NAME} \
  --no-fail-on-empty-changeset \
  --template-file ./infrastructure/pipeline/pipeline.yaml \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides ApplicationName=${APPLICATION_NAME} TemplateFile=${TEMPLATE_FILE}
