#!/bin/bash

STACK_NAME=${1}
SERVICE_URL=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='ServiceUrl'].OutputValue" --output text)

echo "URL for stack ${STACK_NAME}: ${SERVICE_URL}"

