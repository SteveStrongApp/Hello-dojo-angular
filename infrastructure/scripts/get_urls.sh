#!/bin/bash

WEB_STACK_NAME=${1}-web
SERVICE_STACK_NAME=${1}-service
WEB_URL=$(aws cloudformation describe-stacks --stack-name ${WEB_STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='DNSName'].OutputValue" --output text)
SERVICE_URL=$(aws cloudformation describe-stacks --stack-name ${SERVICE_STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='DNSName'].OutputValue" --output text)

echo "URL for stack ${WEB_STACK_NAME}: ${WEB_URL}"
echo "URL for stack ${SERVICE_STACK_NAME}: ${SERVICE_URL}"

