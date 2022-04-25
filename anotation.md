

## steps install aws cdk

https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html

Install	npm install aws-cdk-lib
Import	const cdk = require('aws-cdk-lib');


## implements using javascript

example: 
const bucket = new s3.Bucket(this, 'MyBucket', {
  bucketName: 'my-bucket',
  versioned: true,
  websiteRedirect: {hostName: 'aws.amazon.com'}});

## install aws cdk
npm install -g aws-cdk
cdk --version

## configure aws cli
aws configure


## bootstrapping

`cdk bootstrap aws://ACCOUNT-NUMBER/REGION`

Tip
If you don't have your AWS account number handy, you can get it from the AWS Management Console. Or, if you have the AWS CLI installed, the following command displays your default account information, including the account number.

`aws sts get-caller-identity`

If you have created named profiles in your local AWS configuration, you can use the --profile option to display the account information for a specific profile's account, such as the prod profile as shown here.

`aws sts get-caller-identity --profile prod`

To display the default region, use aws configure get.

`aws configure get region`
`aws configure get region --profile prod`


## create app

step 1: create path with project
step 2: 
    mkdir <name-prj>
    cd <name-prj>
step 3: 
    cdk init app --language javascript

RESULT : 

    Applying project template app for javascript
    # Welcome to your CDK JavaScript project

    This is a blank project for CDK development with JavaScript.

    The `cdk.json` file tells the CDK Toolkit how to execute your app. The build step is not required when using JavaScript.

    ## Useful commands

    * `npm run test`         perform the jest unit tests
    * `cdk deploy`           deploy this stack to your default AWS account/region
    * `cdk diff`             compare deployed stack with current state
    * `cdk synth`            emits the synthesized CloudFormation template

    Initializing a new git repository...
    hint: Using 'master' as the name for the initial branch. This default branch name
    hint: is subject to change. To configure the initial branch name to use in all
    hint: of your new repositories, which will suppress this warning, call:
    hint: 
    hint:   git config --global init.defaultBranch <name>
    hint: 
    hint: Names commonly chosen instead of 'master' are 'main', 'trunk' and
    hint: 'development'. The just-created branch can be renamed via this command:
    hint: 
    hint:   git branch -m <name>
    Executing npm install...
    npm WARN deprecated source-map-url@0.4.1: See https://github.com/lydell/source-map-url#deprecated
    npm WARN deprecated urix@0.1.0: Please see https://github.com/lydell/urix#deprecated
    npm WARN deprecated resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated
    npm WARN deprecated source-map-resolve@0.5.3: See https://github.com/lydell/source-map-resolve#deprecated
    npm WARN deprecated sane@4.1.0: some dependency vulnerabilities fixed, support for node < 10 dropped, and newer ECMAScript syntax/features added
    ✅ All done!

## list the stack in the app
cdk ls

## add an amazon S3 bucket
into path lib/<name-prj>-stack.js

insert code:

    const cdk = require('aws-cdk-lib');
    const s3 = require('aws-cdk-lib/aws-s3');

    class HelloCdkStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);

        new s3.Bucket(this, 'MyFirstBucket', {
        versioned: true
        });
    }
    }

    module.exports = { HelloCdkStack }

Bucket is the first construct we've seen, so let's take a closer look. Like all constructs, the Bucket class takes three parameters.

scope: Tells the bucket that the stack is its parent: it is defined within the scope of the stack. You can define constructs inside of constructs, creating a hierarchy (tree). Here, and in most cases, the scope is this (self in Python), meaning the construct that contains the bucket: the stack.

Id: The logical ID of the Bucket within your AWS CDK app. This (plus a hash based on the bucket's location within the stack) uniquely identifies the bucket across deployments so the AWS CDK can update it if you change how it's defined in your app. Here it is "MyFirstBucket." Buckets can also have a name, which is separate from this ID (it's the bucketName property).

props: A bundle of values that define properties of the bucket. Here we've defined only one property: versioned, which enables versioning for the files in the bucket.

All constructs take these same three arguments, so it's easy to stay oriented as you learn about new ones. And as you might expect, you can subclass any construct to extend it to suit your needs, or just to change its defaults.

## synthesize as aws cloudformtation templete

cdk synth

NOTE: If you received an error like --app is required..., it's probably because you are running the command from a subdirectory. Navigate to the main app directory and try again.

RESULT:

    Resources:
    MyFirstBucketB8884501:
        Type: AWS::S3::Bucket
        Properties:
        VersioningConfiguration:
            Status: Enabled
        UpdateReplacePolicy: Retain
        DeletionPolicy: Retain
        Metadata:
        aws:cdk:path: HelloCdkStack/MyFirstBucket/Resource
    CDKMetadata:
        Type: AWS::CDK::Metadata
        Properties:
        Analytics: v2:deflate64:H4sIAAAAAAAA/zPSMzLUM1RMLC/WTU7J1s3JTNKrDi5JTM7WAQrFFxvrVTuVJmenlug4p+VBWLUgZlBqcX5pUXIqiO2cn5eSWZKZn1erk5efkqqXVaxfZmiuZ6ZnoJhVnJmpW1SaV5KZm6oXBKEBeAnir3IAAAA=
        Metadata:
        aws:cdk:path: HelloCdkStack/CDKMetadata/Default
        Condition: CDKMetadataAvailable
    Conditions:
    CDKMetadataAvailable:
        Fn::Or:
        - Fn::Or:
            - Fn::Equals:
                - Ref: AWS::Region
                - af-south-1
            - Fn::Equals:
                - Ref: AWS::Region
                - ap-east-1
            - Fn::Equals:
                - Ref: AWS::Region
                - ap-northeast-1
            - Fn::Equals:
                - Ref: AWS::Region
                - ap-northeast-2
            - Fn::Equals:
                - Ref: AWS::Region
                - ap-south-1
            - Fn::Equals:
                - Ref: AWS::Region
                - ap-southeast-1
            - Fn::Equals:
                - Ref: AWS::Region
                - ap-southeast-2
            - Fn::Equals:
                - Ref: AWS::Region
                - ca-central-1
            - Fn::Equals:
                - Ref: AWS::Region
                - cn-north-1
            - Fn::Equals:
                - Ref: AWS::Region
                - cn-northwest-1
        - Fn::Or:
            - Fn::Equals:
                - Ref: AWS::Region
                - eu-central-1
            - Fn::Equals:
                - Ref: AWS::Region
                - eu-north-1
            - Fn::Equals:
                - Ref: AWS::Region
                - eu-south-1
            - Fn::Equals:
                - Ref: AWS::Region
                - eu-west-1
            - Fn::Equals:
                - Ref: AWS::Region
                - eu-west-2
            - Fn::Equals:
                - Ref: AWS::Region
                - eu-west-3
            - Fn::Equals:
                - Ref: AWS::Region
                - me-south-1
            - Fn::Equals:
                - Ref: AWS::Region
                - sa-east-1
            - Fn::Equals:
                - Ref: AWS::Region
                - us-east-1
            - Fn::Equals:
                - Ref: AWS::Region
                - us-east-2
        - Fn::Or:
            - Fn::Equals:
                - Ref: AWS::Region
                - us-west-1
            - Fn::Equals:
                - Ref: AWS::Region
                - us-west-2
    Parameters:
    BootstrapVersion:
        Type: AWS::SSM::Parameter::Value<String>
        Default: /cdk-bootstrap/hnb659fds/version
        Description: Version of the CDK Bootstrap resources in this environment, automatically retrieved from SSM Parameter Store. [cdk:skip]
    Rules:
    CheckBootstrapVersion:
        Assertions:
        - Assert:
            Fn::Not:
                - Fn::Contains:
                    - - "1"
                    - "2"
                    - "3"
                    - "4"
                    - "5"
                    - Ref: BootstrapVersion
            AssertDescription: CDK bootstrap stack version 6 required. Please run 'cdk bootstrap' with a recent version of the CDK CLI.

## implement the stack
cdk deploy

RESULT:

    ✨  Synthesis time: 0.89s

    current credentials could not be used to assume 'arn:aws:iam::693390691938:role/cdk-hnb659fds-lookup-role-693390691938-us-east-1', but are for the right account. Proceeding anyway.
    (To get rid of this warning, please upgrade to bootstrap version >= 8)
    current credentials could not be used to assume 'arn:aws:iam::693390691938:role/cdk-hnb659fds-deploy-role-693390691938-us-east-1', but are for the right account. Proceeding anyway.
    HelloCdkStack: deploying...
    current credentials could not be used to assume 'arn:aws:iam::693390691938:role/cdk-hnb659fds-deploy-role-693390691938-us-east-1', but are for the right account. Proceeding anyway.

    ❌  HelloCdkStack failed: Error: HelloCdkStack: SSM parameter /cdk-bootstrap/hnb659fds/version not found. Has the environment been bootstrapped? Please run 'cdk bootstrap' (see https://docs.aws.amazon.com/cdk/latest/guide/bootstrapping.html)
        at CloudFormationDeployments.validateBootstrapStackVersion (/Users/rcts/.nvm/versions/node/v17.6.0/lib/node_modules/aws-cdk/lib/api/cloudformation-deployments.ts:482:13)
        at processTicksAndRejections (node:internal/process/task_queues:96:5)
        at CloudFormationDeployments.publishStackAssets (/Users/rcts/.nvm/versions/node/v17.6.0/lib/node_modules/aws-cdk/lib/api/cloudformation-deployments.ts:457:7)
        at CloudFormationDeployments.deployStack (/Users/rcts/.nvm/versions/node/v17.6.0/lib/node_modules/aws-cdk/lib/api/cloudformation-deployments.ts:339:7)
        at CdkToolkit.deploy (/Users/rcts/.nvm/versions/node/v17.6.0/lib/node_modules/aws-cdk/lib/cdk-toolkit.ts:209:24)
        at initCommandLine (/Users/rcts/.nvm/versions/node/v17.6.0/lib/node_modules/aws-cdk/lib/cli.ts:341:12)

    HelloCdkStack: SSM parameter /cdk-bootstrap/hnb659fds/version not found. Has the environment been bootstrapped? Please run 'cdk bootstrap' (see https://docs.aws.amazon.com/cdk/latest/guide/bootstrapping.html)

## create bootstrap template
cdk bootstrap

RESULT:

    ⏳  Bootstrapping environment aws://693390691938/us-east-1...
    Trusted accounts for deployment: (none)
    Trusted accounts for lookup: (none)
    Using default execution policy of 'arn:aws:iam::aws:policy/AdministratorAccess'. Pass '--cloudformation-execution-policies' to customize.
    CDKToolkit: creating CloudFormation changeset...
    ✅  Environment aws://693390691938/us-east-1 bootstrapped.


NOTE: execute again cdk deploy

RESULT:
    ✨  Synthesis time: 0.99s

    HelloCdkStack: deploying...
    [0%] start: Publishing e403d383c8a3eeedd350464f0351ff6901039a87aa9bdb458a3d1155bb4f7012:current_account-current_region
    [100%] success: Published e403d383c8a3eeedd350464f0351ff6901039a87aa9bdb458a3d1155bb4f7012:current_account-current_region
    HelloCdkStack: creating CloudFormation changeset...

    ✅  HelloCdkStack

    ✨  Deployment time: 45.9s

    Stack ARN:
    arn:aws:cloudformation:us-east-1:693390691938:stack/HelloCdkStack/76721130-c35b-11ec-96e7-0ab0fcc5e9f5

    ✨  Total time: 46.9s

## check diff
    cdk diff before execute cdk deploy

