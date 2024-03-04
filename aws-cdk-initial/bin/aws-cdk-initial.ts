#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsCdkInitialStack } from '../lib/aws-cdk-initial-stack';
import * as dotenv from 'dotenv'

const AWS_ACCOUNT_ID = process.env.AWS_ACCOUNT_ID;
const AWS_ZONE_ACCOUNT = 'us-east-1';

const app = new cdk.App();
new AwsCdkInitialStack(app, 'AwsCdkInitialStack', {
  env: { account: AWS_ACCOUNT_ID, region: AWS_ZONE_ACCOUNT }
 
});
