#!/bin/bash

STACK_NAME=${1}
ECR_REPOSITORY_IMAGE_URI=${2} # Must be a new image, can't redeploy an old one this way!!!

aws cloudformation deploy \
--stack-name ${STACK_NAME} \
--no-fail-on-empty-changeset \
--template-file ./infrastructure/service/template.yaml \
--capabilities CAPABILITY_IAM \
--parameter-overrides ImageUrl=${ECR_REPOSITORY_IMAGE_URI}

