import { IAwsCognitoStackProps } from './types';
// import * as dotenv from 'dotenv';

require('dotenv').config();

const AWS_ARN_BUCKET = process.env.AWS_ARN_BUCKET  || '';
const AWS_ARN_TABLE = process.env.AWS_ARN_TABLE || '';
const AWS_ARN_KMSKEY = process.env.AWS_ARN_KMSKEY || '';
const GOOGLE_SECRET_NAME = process.env.GOOGLE_SECRET_NAME || '';
const FACEBOOK_SECRET_NAME = process.env.FACEBOOK_SECRET_NAME || '';
const AWS_ARN_CERTIFICATE = process.env.AWS_ARN_CERTIFICATE || '';
const AWS_HOSTEDZONE_ID = process.env.AWS_HOSTEDZONE_ID || '';




export const stackConfig:IAwsCognitoStackProps = {
  imports: {
    bucketArn: AWS_ARN_BUCKET,
    tableArn: AWS_ARN_TABLE,
    kmsKeyArn: AWS_ARN_KMSKEY,
    googleSecretName: GOOGLE_SECRET_NAME,
    facebookSecretName: FACEBOOK_SECRET_NAME,
    acmArn: AWS_ARN_CERTIFICATE,
    hostedZoneId: AWS_HOSTEDZONE_ID,
  },
  domain: 'izmartech.net',
  cognitoDomain: 'auth.izmartech.net',
  postSignupLambdaName: 'yb-post-signup-trigger',
  userPoolName: 'yb-userpool',
  identityPoolName: 'yb-identitypool',
  userPoolClientName: 'yb-userpool-client',
  authenticatedUserName: 'yp-auth-role',
  unAuthenticatedUserName: 'yp-unauth-role',
  email: {
    subject: 'Account Verification',
    body: `Welcome to IZMARTECH!
Click on the link to verify your email {##Verify Email##}`,
    from: 'noreply@izmartech.net',
    name: 'izmartech',
    replyTo: 'noreply@izmartech.net',
  },
  callbackUrls: [
    'https://izmartech.net',
    'https://izmartech.net/design',
    'https://izmartech.net/checkout',
  ],
  logoutUrls: [
    'https://izmartech.net',
    'https://izmartech.net/design',
    'https://izmartech.net/checkout',
    'https://izmartech.net/login',
  ],
  redirectUri: 'https://izmartech.net/',
};