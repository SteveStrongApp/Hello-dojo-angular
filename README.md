# hellodojofrontend

https://medium.com/@manivel45/angular-7-unit-testing-code-coverage-5c7a238315b6


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# AWS


## Dependencies
Make sure you first download and configure the CLI for use when attempting to run these commands ad hoc from your local machine.

## Bootstrap

To prepare the account for deployment you need to set up a few resources in AWS that the framework requires.

Run `npm run aws:cfm:bootstrap -- <bootstrap stack name>`

This command will create the VPC and subnets that the containers will be deployed in.  It also creates the S3 Bucket where all the IaC scripts are loaded for use by the pipeline framework.  This command can also be re-run to push any changes to the IaC scripts up to S3 for use by the pipeline.

## Deployment
### Pipeline

Now that the account has been bootstrapped, we can start creating pipelines.

Run `npm run aws:cfm:create-pipeline -- <bootstrap stack name> <application name>`

This command will create a pipeline, an S3 source bucket, and a repository in ECR for an application.  Code pushed to the S3 bucket will trigger the pipeline which can be converted over to Git for the trigger at a later date.

### Trigger Pipeline/Deploy Applcation

Now that we have our pipeline ready, we can trigger it by pushing code to the S3 bucket.

Run `npm run aws:s3:push-source -- <application name> <source location>`

This command pushes the source code, all of it, from the source location to the S3 source bucket that was generated when you created the pipeline, so use the same <applcation name> as you did when you created the pipeline.  This will (eventually) trigger the pipeline.

### View The Application

Once the pipeline is successful, you are ready to view the applcation.

Run `npm run aws:cfm:get-url -- <applcation name>`

This command will display the URL you can use to access the application.

## Teardown

### Application

Run `npm run aws:cfm:teardown-app -- <application name>`

This will remove the applcation and all its resources from AWS.

### Pipeline

Run `npm run aws:cfm:teardown-pipeline -- <application name>`

This will remove the application pipeline and all its resources from AWS including cleaning up and removing the S3 source code bucket and the ECR repository.

### Bootstrap

Run `npm run aws:cfm:teardown-bootstrap -- <bootstrap stack name>`

This will remove the S3 bucket with all the IaC scripts, the VPC and the subnets from AWS.
