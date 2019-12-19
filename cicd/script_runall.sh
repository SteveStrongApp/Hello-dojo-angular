#!/bin/bash
export SVC_NAME="ngtemp"
export AWS_ACCOUNT_ID="xxxxx"
export AWS_REGION="us-east-1"
# printenv

bash script_build.sh
#bash script_unittests.sh
bash script_extract.sh
bash script_createimage.sh
#bash script_deploy.sh
#bash script_remove.sh

docker run -d -p 3000:8080 ${SVC_NAME} .