import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { createAmplifyHosting } from './hosting/amplify'
import { IAwsAmplifyStackProps } from '../bin/types';
import { NagSuppressions } from 'cdk-nag';

export class AwsCdkAmplifyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: IAwsAmplifyStackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const amplifyHostedApp = createAmplifyHosting(this, props)


    NagSuppressions.addStackSuppressions(this, [
      { id: 'AwsSolutions-IAM4', reason: 'Using Amplify AWS Managed Policy.' },
      { id: 'AwsSolutions-IAM5', reason: 'Wildcard in AWS Managed Policy.' },
      { id: 'CdkNagValidationFailure', reason: 'Custom resource uses other node version.' },
      { id: 'AwsSolutions-L1', reason: 'Custom resource uses other node version.' },
    ]);

  }
}
