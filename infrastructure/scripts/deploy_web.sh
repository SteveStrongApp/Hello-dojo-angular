#!/bin/bash

STACK_NAME=${1}
EXIT_STATUS=0

aws cloudformation deploy --stack-name ${STACK_NAME} --no-fail-on-empty-changeset --template-file ./infrastructure/web/cloudfront.yaml --capabilities CAPABILITY_IAM

BUCKET_NAME=$(aws cloudformation describe-stacks --stack-name hello-dojo-web --query "Stacks[*].Outputs[0].OutputValue" --output text)
aws s3 sync ./dist/hellodojofrontend s3://${BUCKET_NAME}
