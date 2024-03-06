import * as cdk from 'aws-cdk-lib';
import { SecretValue } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as amplify from '@aws-cdk/aws-amplify-alpha'
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as iam from 'aws-cdk-lib/aws-iam';
import { IAwsAmplifyStackProps } from '../../bin/types';




export function createAmplifyHosting(
	scope: Construct,
	props: IAwsAmplifyStackProps
) {


    const roleAmplify = new iam.Role(scope, 'RoleAmplify', {
        roleName: props.roleName,
        description: props.roleDesc,
        assumedBy: new iam.ServicePrincipal('amplify.amazonaws.com'),
      });
    roleAmplify.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess-Amplify'));

    const secret = SecretValue.secretsManager(props.gitTokenName);

    const buildSpec = codebuild.BuildSpec.fromObjectToYaml({
        version: '1.0',
        frontend: {
            phases: {
                install: {
                    'runtime-versions': {
                        'nodejs': '20.x'
                    },
                    commands: [
                        'n 20',
                        'node -v'
                    ],
                },
                preBuild: {
                    commands: ['npm ci'],
                },
                build: {
                    commands: ['npm run build'],
                },
            },
            artifacts: {
                baseDirectory: '.next',
                files: ['**/*'],
            },
            cache: {
                paths: ['node_modules/**/*'],
            },
        },
    });

    console.log("******************")
    console.log(props)

	const amplifyApp = new amplify.App(scope, `${props.appName}-hosting`, {
		appName: `${props.appName}`,
		sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
			owner: props.gitOwner,
			repository: props.gitRepo,
			oauthToken: secret,
		}),
		platform: amplify.Platform.WEB_COMPUTE,
		autoBranchCreation: { // Automatically connect branches that match a pattern set
			autoBuild: true,
			patterns: ['feature/*', 'test/*'],
		},
		autoBranchDeletion: true,
		customRules: [
			{
				source: '/<*>',
				target: '/index.html',
				status: amplify.RedirectStatus.NOT_FOUND_REWRITE,
			},
		],
		environmentVariables: {
			myAmplifyEnv: 'frontend', //process.env.myAmplifyEnv
		},
		buildSpec: buildSpec
	})


	const devBranch = amplifyApp.addBranch('development', {
		autoBuild: true,
        branchName: 'development',
		stage: 'DEVELOPMENT',
	})

	const domainDev = amplifyApp.addDomain("dev.".concat(props.appDomain));
    domainDev.mapRoot(devBranch);
    //domainDev.mapSubDomain(devBranch, 'ybamplify');

	const mainBranch = amplifyApp.addBranch('main', {
		autoBuild: true,
		stage: 'PRODUCTION',
		branchName: 'main',
	})

	//Production domain
	const domainProd = amplifyApp.addDomain(props.appDomain);
    domainProd.mapRoot(mainBranch);
    domainProd.mapSubDomain(mainBranch, 'www');


	return amplifyApp
}