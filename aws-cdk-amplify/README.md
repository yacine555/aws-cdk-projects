# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## build and deploy ctack
* emits the synthesized CloudFormation template 
```
cdk synth
```  
*  perform the jest unit tests and cdk nag test
```
npm run test
```   

* compile typescript to js
```
npm run build
```

* Authenticate with profile

```
aws-mfa --profile awscdk
```

*  compare deployed stack with current state
```
cdk diff --profile awscdk
```

* deploy this stack to your default AWS account/region
```
cdk deploy --profile awscdk
```

* Destroy this stack
```
cdk destroy --profile awscdk
```


## Useful commands


* `npm run watch`   watch for changes and compile

