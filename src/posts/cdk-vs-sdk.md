---
title: What’s the Difference Between the AWS CDK and the SDK?
date: 2023-05-06
tags: [serverless, aws, dynamodb, cloudformation]
description: How I differentiate the AWS CDK and AWS SDK
permalink: posts/{{ title | slugify }}/index.html
status: published
socialImage: /images/DALL-E-Cloud-CD.png
---

# What’s the Difference Between the AWS CDK and the SDK?

This is a thought I had the other night as I was messing around with [DynamoDB](/posts/dynamodb-adventure-stepping-into-nosql-storage-land/).

The comparisons between the two seem rather obvious. They’re both packages that wrap api commands in code that make changes to services within the AWS sphere. If I’m being kind to myself I probably intellectually understood the difference but it didn’t really click until I had the thought that I was using the SDK to make direct changes to a Dynamo instance on my local computer, but I absolutely wouldn’t do that with the CDK unless I had spun up some sort of provider like [Localstack](https://localstack.cloud/) to emulate the entire AWS space.

_Dall-E: An impressionist painting of a cloud and a cd-rom side by side made of tiny strings of code_
![An impressionist painting of a cloud and a cd-rom side by side made of tiny strings of code](/images/DALL-E-Cloud-CD.png)

### Direct vs. Indirect Changes

The SDK (Software Development Kit) is a wrapper for API level commands that you have access to in AWS. Making changes via command line or the SDK should roughly have the same results, whether that’s spinning up a new database or triggering a lambda. If you can do it in the CLI you can do it via the SDK.

Where the CDK differs however, is that it doesn’t make any changes directly, and as such, doesn’t have access to do something like… directly invoke a lambda. It’s still possible to do that (if you really wanted), but you wouldn’t really want to do that. What the CDK is good at is creating a chain of orchestration steps to make sure that you can always spin up the AWS services you need on demand.

### Idempotency

This leads us to, in my opinion, one of the core difference. The CDK is idempotent. It means that if you tell the CDK to spin up a new DynamoDB instance with the name `Fred` , you can trigger that command as many times as you want, and it will successfully create `Fred` once. If you update the CDK with changes to `Fred` it will modify `Fred` if possible based on the delta between the existing instance and the new one.

Whereas with the SDK, if you trigger a create database command for DynamoDB, to create a new database called `Elouise` your first `Eloise` create command will succeed but every subsequent one will fail because DynamoDB requires you to have unique names within the same region.

### Connection to the Stack

The other awesome power of the CDK is that the resources you create are directly connected to the CloudFormation Stack that gets spun up. (This is how it knows how to check for deltas when making modification) That also means that tear down is exceptionally easy. You don’t have to do things like define special or custom names for all of the component parts in order to delete them in the correct order. If you want to get rid of the services, all you have to do is delete the stack, and CloudFormation will (try to) gracefully delete the different components.

### Why is There Overlap?

Well, because there might be reasons you want to orchestrate some behaviors via CloudFormation but execute them via code in other cases.

The idea of a DynamoDB instance springs to mind. If you’re creating **the instance** that will hold all of your data and manage your system for a service you’re creating, using CDK would probably make the most sense because it lets you set the parameters once, and then hook those rules into your CI to make sure wherever you deploy your code, you’ll get the same database.

If, however, instead you want to spin up bespoke DynamoDB instances on demand as the result of some sort of single tenant command as the result of a request or user input, the SDK is more your speed. The SDK gives you the ability to create and destroy the instances you need, as you need them.
