#!/bin/bash

STACK_NAME=${1}-web
BUCKET_NAME=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='WebsiteBucketName'].OutputValue" --output text)
CF_DISTRIBUTION=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDistribution'].OutputValue" --output text)

aws cloudformation deploy --stack-name ${STACK_NAME} --no-fail-on-empty-changeset --template-file ./infrastructure/web/template.yaml --capabilities CAPABILITY_IAM
aws s3 sync ./dist/hellodojofrontend s3://${BUCKET_NAME}
aws cloudfront create-invalidation --distribution-id ${CF_DISTRIBUTION} --paths "/*"
