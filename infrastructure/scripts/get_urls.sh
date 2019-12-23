#!/bin/bash

STACK_NAME=${1}

SERVICE_URL=$(aws elbv2 describe-load-balancers --query "LoadBalancers[*].DNSName" --output text)

echo "Service URL: ${SERVICE_URL}"

WEB_URL=$(aws cloudfront list-distributions --query "DistributionList.Items[*].DomainName")

echo "Web URL: ${WEB_URL}"
