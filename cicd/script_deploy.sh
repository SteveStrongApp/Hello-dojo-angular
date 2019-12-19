#!/bin/bash

# double escape to escape groovy and then sed :(
echo "Logging into AWS ECR"
eval $(aws ecr get-login --region ${AWS_REGION} --no-include-email | sed 's/https:\/\///')

echo "Tagging latest image"
docker tag ${SVC_NAME}:latest ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${SVC_NAME}:latest

echo "Pushing image to ECR"
docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${SVC_NAME}:latest
echo "Finished pushing image to ECR"