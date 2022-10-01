---
title: Sam Setup
date: 2022-10-01
description: My local setup for a terraform implementation
permalink: posts/{{ title | slugify }}/index.html
status: published
hidden: true
---

### Repo

https://github.com/Stuwert/cipher-serverless/tree/local-sam

### Initialization

`sam init`

```
Which template source would you like to use?
1 - AWS Quick Start Templates
2 - Custom Template Location
Choice: 1
Choose an AWS Quick Start application template
1 - Hello World Example
2 - Multi-step workflow
3 - Serverless API
4 - Scheduled task
5 - Standalone function
6 - Data processing
7 - Infrastructure event management
8 - Lambda EFS example
9 - Machine Learning
Template: 1
Use the most popular runtime and package type? (Python and zip) [y/N]: N
Which runtime would you like to use?
1 - dotnet6
2 - dotnet5.0
3 - dotnetcore3.1
4 - go1.x
5 - graalvm.java11 (provided.al2)
6 - graalvm.java17 (provided.al2)
7 - java11
8 - java8.al2
9 - java8
10 - nodejs16.x
11 - nodejs14.x
12 - nodejs12.x
13 - python3.9
14 - python3.8
15 - python3.7
16 - ruby2.7
17 - rust (provided.al2)
Runtime: 10
What package type would you like to use?
1 - Zip
2 - Image
Package type: 1
Based on your selections, the only dependency manager available is npm.
We will proceed copying the template using npm.
Select your starter template
1 - Hello World Example
2 - Hello World Example TypeScript
Template: 2
Would you like to enable X-Ray tracing on the function(s) in your application? [y/N]: N
```

### Directory

![image](/images/serverless/sam-directory.png)

### Template

```
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: >
  cipher-sam

  Sample SAM Template for cipher-sam

# More info about Globals: https://github.com/awslabs/serverless-application-model/blob/master/docs/globals.rst
Globals:
  Function:
    Timeout: 3

Resources:
  HelloWorldFunction:
    Type: AWS::Serverless::Function # More info about Function Resource: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#awsserverlessfunction
    Properties:
      CodeUri: hello-world/
      Handler: app.lambdaHandler
      Runtime: nodejs16.x
      Architectures:
        - x86_64
      Events:
        HelloWorld:
          Type: Api # More info about API Event Source: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#api
          Properties:
            Path: /hello
            Method: get
    Metadata: # Manage esbuild properties
      BuildMethod: esbuild
      BuildProperties:
        Minify: true
        Target: "es2020"
        # Sourcemap: true # Enabling source maps will create the required NODE_OPTIONS environment variables on your lambda function during sam build
        EntryPoints:
        - app.ts

Outputs:
  # ServerlessRestApi is an implicit API created out of Events key under Serverless::Function
  # Find out more about other implicit resources you can reference within SAM
  # https://github.com/awslabs/serverless-application-model/blob/master/docs/internals/generated_resources.rst#api
  HelloWorldApi:
    Description: "API Gateway endpoint URL for Prod stage for Hello World function"
    Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/hello/"
  HelloWorldFunction:
    Description: "Hello World Lambda Function ARN"
    Value: !GetAtt HelloWorldFunction.Arn
  HelloWorldFunctionIamRole:
    Description: "Implicit IAM Role created for Hello World function"
    Value: !GetAtt HelloWorldFunctionRole.Arn
```
