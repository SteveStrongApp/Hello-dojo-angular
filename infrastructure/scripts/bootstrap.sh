#!/bin/bash

STACK_NAME=${1}

aws cloudformation deploy --stack-name ${STACK_NAME}-service --no-fail-on-empty-changeset --template-file ./infrastructure/service/template.yaml --capabilities CAPABILITY_IAM
aws cloudformation deploy --stack-name ${STACK_NAME}-web --no-fail-on-empty-changeset --template-file ./infrastructure/web/template.yaml --capabilities CAPABILITY_IAM
