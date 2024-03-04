import { IAwsAmplifyStackProps } from './types';
import * as dotenv from 'dotenv'

require('dotenv').config()
const AWS_DOMAIN_NAME = process.env.AWS_DOMAIN_NAME || "domaintbd.com";
const AWS_GIT_TOKENNAME = process.env.AWS_GIT_TOKENNAME || "";

console.log(process.env)

export const stackConfig: IAwsAmplifyStackProps = {
  roleName: 'yb-amplify-role',
  roleDesc: 'role used for project amplify',
  secretName: 'github-token',
  appName: 'yb-fullstack-amplify-demo',
  appDomain: AWS_DOMAIN_NAME,
  appDesc: 'amplify webdemo',
  gitOwner: 'yacine555',
  gitRepo: 'aws-amplify-nextjs',
  gitBranch: 'main',
  gitTokenName: AWS_GIT_TOKENNAME,
};