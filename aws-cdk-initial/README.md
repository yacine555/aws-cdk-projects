# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript to create, deploy and destroy an AWS CDK stack.

The `cdk.json` file tells the CDK Toolkit how to execute your app.
Stack will create a lambda that prints Hello world


## requirements:

[NodeJs](https://nodejs.org/en)

node --version
v20.11.1

python --version
Python 3.11.8

[aws cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
which aws
/usr/local/bin/aws

aws --version
aws-cli/2.15.24 Python/3.11.6 Darwin/23.3.0 exe/x86_64 prompt/off

[aws cdk](https://docs.aws.amazon.com/cdk/v2/guide/hello_world.html)
cdk --version
2.130.0 (build bd6e5ee)

- Setup the aws credentials with a profile **awscdk** to be used to deploy your stack.
aws-mfa --profile awscdk


## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk diff --profile awscdk`    compare deployed stack with current state
* `npx cdk deploy --profile awscdk`  deploy this stack to your default AWS account/region
* `npx cdk synth --profile awscdk`   emits the synthesized CloudFormation template
