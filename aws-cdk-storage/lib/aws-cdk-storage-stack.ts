import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as ddb from 'aws-cdk-lib/aws-dynamodb';
import { IAwsStorageStackProps, ISecondayIndexes } from '../bin/types';
import { NagSuppressions } from 'cdk-nag';


export class AwsCdkStorageStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: IAwsStorageStackProps) {
    super(scope, id, props);

    // Encryption Key.
    const key = new kms.Key(this, 'yb-Key', {
      description: props.kms.desc,
      enableKeyRotation: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // change for production
    });

    // add key alias.
    new kms.Alias(this, 'yb-KeyAlias', {
      targetKey: key,
      aliasName: props.kms.alias,
    });


    // App S3 Images Storage
    new s3.Bucket(this, 'yb-Bucket', {
      bucketName: props.s3.name,
      encryption: s3.BucketEncryption.KMS,
      encryptionKey: key,
      versioned: true,
      serverAccessLogsPrefix: 'access-logs',
      enforceSSL: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // change for production
    });

    // DB Customer Accounts Table
    const customersTable = new ddb.Table(this, 'yb-Customers', {
      tableName: props.dynamodb.customerTable.name,
      partitionKey: {
        name: props.dynamodb.customerTable.partionKey,
        type: ddb.AttributeType.STRING,
      },
      sortKey: {
        name: props.dynamodb.customerTable.sortingKey!,
        type: ddb.AttributeType.STRING,
      },
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      encryption: ddb.TableEncryption.CUSTOMER_MANAGED,
      encryptionKey: key,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // change for production
    });

    props.dynamodb.customerTable.secondaryIndexes.map(
      (secondaryIndex: ISecondayIndexes) => {
        customersTable.addGlobalSecondaryIndex({
          indexName: secondaryIndex.indexName,
          partitionKey: {
            name: secondaryIndex.partionKeyName,
            type: ddb.AttributeType.STRING,
          },
          sortKey: {
            name: secondaryIndex.sortingKey,
            type: ddb.AttributeType.STRING,
          },
        });
      },
    );

    // Internal Orders Table
    const ordersTable = new ddb.Table(this, 'yb-Orders', {
      tableName: props.dynamodb.ordersTable.name,
      partitionKey: {
        name: props.dynamodb.ordersTable.partionKey,
        type: ddb.AttributeType.STRING,
      },
      sortKey: {
        name: props.dynamodb.ordersTable.sortingKey,
        type: ddb.AttributeType.STRING,
      },
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      encryption: ddb.TableEncryption.CUSTOMER_MANAGED,
      encryptionKey: key,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // change for production
    });

    props.dynamodb.ordersTable.secondaryIndexes.map(
      (secondaryIndex: ISecondayIndexes) => {
        ordersTable.addGlobalSecondaryIndex({
          indexName: secondaryIndex.indexName,
          partitionKey: {
            name: secondaryIndex.partionKeyName,
            type: ddb.AttributeType.STRING,
          },
          sortKey: {
            name: secondaryIndex.sortingKey,
            type: ddb.AttributeType.STRING,
          },
        });
      },
    );

    // CDK NAG SUPPRESSIONS: For production, do add recovery
    NagSuppressions.addResourceSuppressions(
      [customersTable, ordersTable],
      [{ id: 'AwsSolutions-DDB3', reason: 'No Point-in-time recovery needed at this point' }],
      true,
    );

  }
}
