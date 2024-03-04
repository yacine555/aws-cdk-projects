import { StackProps } from 'aws-cdk-lib';

export interface IAwsAmplifyStackProps extends StackProps {
  roleName: string,
  roleDesc: string,
  secretName: string,
  appName: string,
  appDomain: string,
  appDesc: string,
  gitOwner: string,
  gitRepo: string,
  gitBranch: string,
  gitTokenName: string,
}