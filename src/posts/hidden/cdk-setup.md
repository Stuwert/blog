---
title: CDK Setup
date: 2022-10-01
description: My local setup for a terraform implementation
permalink: posts/{{ title | slugify }}/index.html
status: published
hidden: true
---

### Repo

[https://github.com/Stuwert/cipher-serverless/tree/local-cdk](https://github.com/Stuwert/cipher-serverless/tree/local-cdk)

### Initialization

I cloned and copied the serverless pattern here: [https://serverlessland.com/patterns/apigw-lambda-cdk](https://serverlessland.com/patterns/apigw-lambda-cdk)

### Directory

![image](/images/serverless/cdk-directory.png)

### Template

It’s all instrumented in the code of your choice:

```
    export class ApiStack extends Stack {
      constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id,props);

        const handler = new lambda.Function(this, "handler", {
          code: new lambda.AssetCode(path.resolve(__dirname, "dist")),
          handler: `index.${config.api.handler}`,
          runtime: lambda.Runtime.NODEJS_16_X,
          architecture: lambda.Architecture.ARM_64
        });

        new apigw.LambdaRestApi(this, config.apiName, {
          handler,
          description: config.apiDescription,
          proxy: true, // defines a greedy proxy ("{proxy+}")
        });

        const tags = config.tags

        tags.forEach(tag => {
          Tags.of(this).add(tag.key, tag.value)
          Tags.of(handler).add(tag.key, tag.value)
        })
      }
    }
```
