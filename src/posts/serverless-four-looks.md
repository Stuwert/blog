---
title: Four Different Patterns to Implement Serverless
oldTitle: Four Looks at Serverless
date: 2022-10-01
tags: [engineering, serverless, aws]
description: What's the difference between the all of the serverless frameworks?
permalink: posts/{{ oldTitle | slugify }}/index.html
status: published
socialImage: /images/serverless/four-options.png
---

So, I’ve got one way to boot this locally down. What are the other ways? Coming into this, I knew about `AWS SAM`, but I didn’t know about anything else. I went to [Serverlessland’s Patterns](https://serverlessland.com/patterns?framework=CDK) to figure out the available implementations as a starting point.

![image](/images/serverless/four-options.png)

I’m going to cheat a bit and reorder it to focus on the stuff that I have more confidence with first.

- [Serverless Framework](#serverless)
- [AWS SAM](#aws-sam)
- [AWS CDK](#aws-cdk)
- [Terraform](#terraform)

## What are the options?

SAM, or Serverless Application Model, is AWS’ toolkit to basically create deployment templates for common deployment steps, along with local development tooling, similar to the Serverless Framework. Serverlessland doesn’t have any templates for TS and SAM, but `sam init` had a hello world example, that was a good starting point.

CDK, or Cloud Development Kit, is basically a set of packages, exposed to various libraries, that allows for developers to instrument cloud formation functions within code. Basically all that stuff you see in serverless framework’s `template.ts` but instead of config, it’s code.

Finally, Terraform. I honestly didn’t even realize terraform was an option here because it felt like using a jackhammer to break up peppermint bark. But the option is there, so I’m going to try it out. Similar to SAM, Serverlessland doesn’t have any templates for Typescript and Terraform together.

## Serverless

If you want to know how to set up serverless locally, look here: [https://www.urback.net/posts/how-do-i-get-a-serverless-function-running-locally/](https://www.urback.net/posts/how-do-i-get-a-serverless-function-running-locally/)

## AWS SAM

[AWS SAM](https://aws.amazon.com/serverless/sam/) is AWS’ version of Serverless. You can find [installation instructions here](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-mac.html). I used `brew` on my Mac, and then ran `sam init` to kick things off.

[:repo](/posts/sam-setup#repo)

[:initialization](/posts/sam-setup#initialization)

[:directory](/posts/sam-setup#directory)

[:template file](/posts/sam-setup#template)

### Things That Jumped Out to Me

1. The main commands to execute are `sam build` (builds your package) `sam local invoke` (invokes locally), but you can also use `sam local start-lambda` (or `start-api`) to create a running implementation that you can invoke against dynamically.
2. The output of build creates an `.aws-sam` directory, which is what gets referenced locally (and what, I assume, gets deployed as well).
3. Out of the box, SAM doesn’t support hot reloading.
   1. To be fair, neither does Serverless, but it’s a two line installation to get it functioning.
   2. There are multiple support requests for this with SAM, but nothing appears to be rapidly forthcoming.
4. SAM doesn’t (at least not obviously to me) have a system of plugins I can easily add various sets of functionality.
5. SAM has many of the same local instrumentation layers that serverless does, creating a local gateway that I can execute against, or creating an execution instance for the lambda to be invoked other ways.
6. SAM definitely seems more oriented towards a “pure” implementation of a lambda, i.e., a distributed set of components that are invoked via events, not as a coherent system I met need to run and develop against on my local.
   1. And… from Amazon’s perspective… I get it? But I don’t think it’s all that helpful, especially not in the situations where I’m trying to transition away from a monolith, but a lot of my functionality is going to have to come through direct invocation.
7. Out of the box, the typescript implementation has each subdirectory install separate packages, rather than having node run at the top level. This makes me think they're nudging towards a mono-repo type implementation, potentially.

## AWS CDK

[AWS CDK](https://aws.amazon.com/cdk/) lets you write infrastructure as code. I didn’t have much if any experience coming into this early on. The installation for `CDK` isn’t anything special because it’s “just another NPM package”.

[:repo](/posts/cdk-setup#repo)

[:initialization](/posts/cdk-setup#initialization)

[:directory](/posts/cdk-setup#directory)

[:template file](/posts/cdk-setup#template)

### Things that Jumped Out To Me

1. Having to use `SAM` locally means the difference between `CDK` and `SAM` is minimal.
2. `CDK` seems way more heavy weight than necessary for instrumenting a basic lambda.
3. That said, `CDK` seems like it would be great if you wanted to orchestrate many lambdas together within a single repo implementation.
4. This is one of those cases where infrastructure as code seems harder to parse than infrastructure as a `YAML` file. This might seem wild, but `YAML` files do a much better job of encoding logic that’s abstracted consistently (and that I can read at a glance), instead of trying to read and parse code.
5. `CDK` has similar outputs as `SAM`, but with `cdk` prefix instead of `.aws-sam`.

## Terraform

Ok so terraform, the big beast of the bunch. [Terraform](https://www.terraform.io/), by Hashicorp, the same company that brought you VMWare (one of the first virtual machines I used in my career) lets you write infrastructure as “code”. To be honest, I assumed that it wouldn’t be applicable in this case because I thought it would be. Installation instructions can be found here: [https://www.terraform.io/downloads](https://www.terraform.io/downloads)

To install terraform I ran:

```
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
```

[:repo](/posts/terraform-setup#repo)

[:initialization](/posts/terraform-setup#initialization)

[:directory](/posts/terraform-setup#directory)

[:template file](/posts/terraform-setup#template)

You can find my repo implementation here:

1. At first, I found Terraform’s implementation easier to read, but by the end I found it incredibly hard to figure out which reference was pointing where, even compared to the `yaml` files I’d seen previous.
2. One thing I really liked about `terraform` is splitting apart `terraform plan` and `terraform apply`.
   1. Plan will describe to you what’s going to happen (which you can lock in place by defining an output) and apply will do it for you.
3. Installing and playing around with [LocalStack](https://localstack.cloud/) was a helpful experience. It basically seemed like a locally implemented version of AWS (or a subset), that I could point to as a target.
4. Getting terraform working with LocalStack required changing some of my targets to local implementations.
   1. I’m guessing you can use flags to point to which environment you’re building with, but it’s still unlike any of the others where you can simply build and target things locally without any extra work.
5. However, figuring out what the endpoint I needed to hit to test it out was a bit of a pain
   1. `[http://localhost:4566/restapis/wfbyj3b6bz/test/\_user\_request\_/my\_api\_route]`
   2. The `wfbyj3b6bz` is the api ID, test is the api gateway identifier, I’m not sure what `_user_request_` is supposed to indicate, and `my_api_route` is the route path.
6. It seems less heavy weight than `CDK` though, so I’d probably pick it before that one.

## What about local development?

Most of the development examples here didn’t support some version of “hot reloading”, where I could make a change to the code and see it propagated on every next request I make. I am a big fan of the “guess and check” method of software development. Where I build sets of code together by having a live instance running locally, making a change, and then running an API request to validate whether that change took effect.

The fundamental problem all of these things get into is that a lambda is a zipped package of code that gets executed and built from an S3 bucket. That’s way different than a long-running process that can be viewed and rebuilt. Is it possible? Yes, as `Serverless` and `SAM` point to, but it still ends up being a slight deviation from what the deployed code is going to look like.

Is this type of development possible in lambda land?

I suspect my answer to this, from a pure “serverless” perspective, would be to… **not do it**. I suspect they would argue that, like a component of a car, you don’t test the individual component by deploying the car and then running it. If I wanted to “guess and check” I should run tests in watch mode. And then, I should define clean interfaces with the components of the rest of the system. Maybe, I can run it once locally before I deploy, but that would be it.

But as I said when talking about the difference between [pits of success and architecture transitions](https://www.urback.net/posts/don-t-build-a-pit-outfit-your-explorers/), I think there is often some conflict in those goals. The end state of building this way makes sense to me, but it’s a huge challenge in the interim: where getting things working might require something as bonkers as having a FE that talks to a monolith BE that directly invokes a lambda locally. While long term I might never need to set up the ecosystem on my local, when I move from here to there, I probably will want to, which means systems like Serverless will be way more interesting to me.

## Summary and Appendix

The thing that’s jumped out to me the most through all of this, though, is how different each of these implementations seem to be. In the “traditional” server world, there might be a Go server, or an Express Server, or a Flask Server, but I could open up the GitHub repository and pretty quickly have a pretty clear sense of the implementation. Similar to serverless engineering generally, it’s an entirely different way of thinking about the world.

I’m spending way more time thinking about my infrastructure and set up and way less time thinking about code… On one hand, that’s strange and kind of boring. On the other hand, it aligns pretty closely to how the new serverless world works. Less, more lightweight code, more thoughts about the underlying architecture that goes along with it.

As the complexity shifts further down the stack, there seem to be entirely different ways of even implementing deployment and maintenance steps, so “reading” the codebase becomes its own adventure.

### Ecosystems

It seems like there’s a lot of different ways to build out a lambda function, to varying degrees of success. One critique of this approach is that this is a “localhost” first look at how to spin up and maintain lambdas. This isn’t really the “serverless world” way of thinking about it.

For example, both `serverless` and `localstack` seem great, but they’re each heavily invested in node and python ecosystems. You might pick one or the other, so you don’t have to maintain python and node simultaneously in any given package. `AWS SAM` has similar problems in that it seems built specifically for AWS (internal) workflows… which is fine, you should do things the “framework” way, but it doesn’t seem to be updated with the same speed that other frameworks are.

This is still an area of active development though, and things like [SST](https://docs.sst.dev/what-is-sst]), built on top of CDK but with a more straightforward set of interfaces for developers to build on top of.

My basic (and boring) take is… you should pick a framework and lean into it.
