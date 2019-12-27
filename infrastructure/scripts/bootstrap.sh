#!/bin/bash

STACK_NAME=${1}
APPLICATION_NAME=${2}

aws cloudformation deploy \
  --stack-name ${STACK_NAME} \
  --no-fail-on-empty-changeset \
  --template-file ./pipeline/pipeline.yaml \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides ApplicationName=${APPLICATION_NAME}
