#!/bin/bash

APPLICATION_NAME=${1}
SOURCE_LOCATION=${2}
SOURCE_BUCKET=$(aws cloudformation describe-stacks --stack-name ${APPLICATION_NAME}-pipeline --query "Stacks[0].Outputs[?OutputKey=='SourceBucketName'].OutputValue" --output text)

cd ${SOURCE_LOCATION}
zip -r dist.zip ./
aws s3 cp ./dist.zip s3://${SOURCE_BUCKET}/dist.zip
cd -
