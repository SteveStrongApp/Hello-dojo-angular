#!/bin/bash

STACK_NAME=${1}
SOURCE_BUCKET=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='SourceBucketName'].OutputValue" --output text)

zip -r dist.zip ./ -x "./node_modules/**" -x "./dist/**" -x ".git/**" -x ".vs-code/**"
aws s3 cp ./dist.zip s3://${SOURCE_BUCKET}/dist.zip
