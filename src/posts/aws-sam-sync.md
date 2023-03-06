---
title: Starting to figure out AWS SAM Sync
date: 2023-02-02
tags: [serverless, aws, aws-sam, local-development]
description: What is AWS SAM Sync for?
permalink: posts/{{ title | slugify }}/index.html
status: published
socialImage: /images/serverless/lone-cloud.jpg
---

## A Brief Intro on My Personal (TM) Understanding of AWS SAM Sync

AWS doesn't really let (or arguably want) you to develop functionality locally. There are probably some justified, and selfish reasons for this.

The justified reason is that in a [storage first](https://awstip.com/storage-first-pattern-in-aws-with-api-gateway-part-1-using-s3-216e20b08353) model for software development, running something "locally" means spinning up the entire set of services and containers so that you have a functional system. This is what [localstack](https://localstack.cloud/) aims to do, but it's understandable why this could seem to be a bit much. For example, if you're building a frontend that consumes data that's the output of a step function triggered by an event, ostensibly all you need to do is to connect to the data layer, but in order to get the data in you either have to a) set everything up or b) spoof the data anyway, so why not just mock it in the first place?

The less justified reason is that AWS makes money off of all those billable minute, their goal to serve you products and their desire to have you "build in the cloud" is well-aligned. If they make it really easy for you to "build in the cloud" they get those sweet sweet developer when you're figuring the code out in addition to when you're deployed to prod.

My understanding of the purpose of AWS SAM Sync is that it aims to do some of the stuff of making direct development possible. But instead of creating a virtual machine on your local

_It's a Cloud Formation... Get it?_
![image of a lone cloud on a black background](/images/serverless/lone-cloud.jpg)
Photo by <a href="https://unsplash.com/@resourcedatabase?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Resource Database</a> on <a href="https://unsplash.com/photos/Go21G2HWujs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

### The Links to the Actual Docs

Figured before we went further I should just link directly to the SAM Sync docs:

[The Actual SAM Sync Docs](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-sync.html)

## Big Picture Goal

My big picture goal is to test out whether or not `sam sync` is a viable solution for testing and checking development if I wanted to build out a pattern that's a direct connection from Appsync->DynamoDB.

[The theory is that encapsulating more logic in a appsync resolver, instead of a lambda will remove cold starts entirely and allow you to easily encapsulate logic.](https://levelup.gitconnected.com/slashing-serverless-api-latency-with-appsync-javascript-resolvers-8aa5ae6a9ac0)

Could I say... use sam sync to quickly build out a new set of resolvers without much lift? Or... spin up a quick interface if I wanted to test out an _interactive_ front end against it?

## Today's Goal

But for now, the first goal is... can I get the [:cipher-sam](https://www.urback.net/posts/four-looks-at-serverless/#AWSSAM) repo I had set-up working with SAM locally. Nothing fancy, no changes to how it currently works, just using SAM.

## My Steps

Well first I did the most obvious thing possible. I ran `sam sync` in the repo:

```bash
$ sam sync
Usage: sam sync [OPTIONS]
Try 'sam sync -h' for help.

Error: Missing option '--stack-name'.
```

The issue here, thanks to the error output is rather straightforward. Name it! My suspicion is that if I were working on an actual project, I would probably want to name this something specific like `service-pr-#` or `service-my-name-pr-#` or `service-dev-my-name-pr-#`. But... I'm in a personal AWS account so I yolo'ed it to the name of the project `cipher`

So I ran

```bash
$ sam sync --stack-name cipher
```

There was a bunch of CloudFormation stuff, but ultimately got yelled at for the following (obfuscated) error

```bash
aws:iam::########:user/Name is not authorized to perform: iam:AttachRolePolicy on resource: role cipher-HelloWorldFunctionRole-######## because no identity-based policy allows the iam:AttachRolePolicy
```

This is one of those times where I could tell you that I easily figured out the results because it's right there. But I spent a good 30 minutes trying to remember the exact configuration of how AWS IAM works.

It was basically:

1. Create a new Policy
2. Find the associated Service, Action, and Resources (I got tripped on this a few time because I thought the service would be lambda, but the Service in this case is `iam`, for what I was trying to do, and the Resource were specific ARNs that would limit the scope of the policy)
3. Attach that policy to the appropriate group/role that was running my `sync` action locally

Ok cool... so deleted the stack from CloudFormation and reran

```bash
$ sam sync --stack-name cipher
...
...
Stack creation succeeded. Sync infra completed.
$
```

Sweet. I went and hit the endpoint provided and I got back...

```
{"message":"hello world"}
```

Awesome... lemme go make a quick change to the response and retry... and...

still

```
{"message":"hello world"}
```

I'm being a smidge facetious here because the output above from `sam sync` ended, which kind of suggested there wasn't an active process. But yeah... this is where the AWS docs came in handy. I did a quick search for `watch` and I found this section:

> --watch Starts a process that watches your local application for changes and automatically syncs them to the AWS Cloud. By default, when you specify this option, AWS SAM syncs all resources in your application as you update them. With this option, AWS SAM performs an initial AWS CloudFormation deployment. Then, AWS SAM uses AWS service APIs to update code resources. AWS SAM uses AWS CloudFormation to update infrastructure resources when you update your AWS SAM template.

Perfect!

Re ran with

```bash
$ sam sync --stack-name cipher --watch
...
Stack update succeeded. Sync infra completed.

CodeTrigger not created as CodeUri or DefinitionUri is missing for ServerlessRestApi.
Infra sync completed.
```

I'm going to ignore that warning for a second, and I just went ahead and retried making a change to the response body. This time saving resulted in the following in my terminal:

```bash
Manifest is not changed for (HelloWorldFunction), running incremental build
Building codeuri: /cipher-sam/hello-world runtime: nodejs16.x metadata: {'BuildMethod': 'esbuild', 'BuildProperties': {'Minify': True, 'Target': 'es2020', 'EntryPoints': ['app.ts']}} architecture: x86_64 functions: HelloWorldFunction
Running NodejsNpmEsbuildBuilder:CopySource
Running NodejsNpmEsbuildBuilder:LinkSource
Running NodejsNpmEsbuildBuilder:EsbuildBundle
Finished syncing Lambda Function HelloWorldFunction.
```

Sweet! I went and hit the endpoint and got...

```
{"message":"hello world bob"}
```

Exactly what I wanted! And pretty fast too.

But before we left... I wanted to try one more thing, what would happen if instead of changing the code, I changed the route? I went ahead and changed my `/hello` endpoint to `/bingbong`

This time as I guessed, the change was much... slower. Because I was changing the actual AWS infrastructure it meant going through a bunch of CloudFormation functions like creating a new resource, creating the permissions, and then deleting the previous resource.

### One more catch

The other thing I'd like to add is that `sam sync --watch` won't tear down the environment for you when you're done with it, you have to either run `sam delete` or go into CloudFormation to delete the stack. (You will also make sure your user has the right access points to both create the roles/policies and also delete those roles/policies)

## What's Next

Ok so realistically this was a pretty basic test right? But I was kinda curious what the extent that `watch` would quickly deploy changes and honestly (again this being a basic example) it was pretty good! If my expectation was I had a pretty simply Backend For Frontend that integrated to a broader system, it wouldn't be all that hard to spin up for a quick test. With the caveat that I would probably (as a hypothesis) mostly use it for making straightforward code changes, more direct debugging, or just needing an interactive interface, I would not use it if I were trying to test out options around APIs or other infrastructural changes.

So what's next?

My next goal in this journey is to replace my Api Gateway Interface with an Appsync interface. I'm curious if that will make any changes to how fast this thing spins up!
