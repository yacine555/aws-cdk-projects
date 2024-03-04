#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsCdkAmplifyStack } from '../lib/aws-cdk-amplify-stack';
import { stackConfig } from './config';

const AWS_ACCOUNT_ID = process.env.AWS_ACCOUNT_ID;
const AWS_ZONE_ACCOUNT = 'us-east-1';
const app = new cdk.App();

new AwsCdkAmplifyStack(app, 'yb-amplify-stack', {
  env: { account: AWS_ACCOUNT_ID, region: AWS_ZONE_ACCOUNT },
  ...stackConfig,
});