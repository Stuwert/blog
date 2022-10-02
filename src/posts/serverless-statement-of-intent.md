---
title: Serverless Learning Statement of Intent
date: 2022-09-24
tags: [engineering, serverless]
description: What do I want to accomplish learning about serverless?
permalink: posts/{{ title | slugify }}/index.html
status: published
socialImage: /images/fahrul-razi-BR6lrzCPYPk-unsplash.jpg
---

## The Serverless Experience

### General Hypotheses

Serverless is a huge pain in the ass right now. On top of the fact that it’s an entirely new way of thinking about things, there aren’t the same standards you can lean on. That being said, with the money being invested in serverless, the types of things that feel hard now won’t feel as hard in the future.

While in the short term, the learning curve for these pieces of functionality feels even more arcane than code, in the long term, as time and money gets invested, these pieces of functionality will be cheaper and easier to configure and manage. Why bother having to configure your own “worker queue” when you can click a few buttons in AWS and ship a single file function to manage it for you?

![image](/images/fahrul-razi-BR6lrzCPYPk-unsplash.jpg)

But how do we get there?

### Why People Are Actually Anti-Lambda

When people talk about serverless, they tend to bring up a number of very specific concerns like cold starts, the inability to run for more than a limited period of time, or weird issues like database connection pooling. I believe these are proximal causes for what is actually a fundamental transition for how we think about software engineering.

I believe Swyx’s post about [the end of localhost](https://www.swyx.io/the-end-of-localhost). Basically, as systems get increasingly complex (and we’re honestly almost already there), less and less of our system development will happen on a personal machine and more and more development will happen “in the cloud”. For a group of people who have made their bones on having a lot of control over their set-up and environment, moving to patterns that are increasingly defined by vendors (and vendor lock in) feels scary.

As a backend developer, a lot of what we thought about when it came to things like “building a system”, it meant creating a series of interrelated entities (structured by foreign keys) that encapsulated a strongly articulated set of ideas. In the serverless world, a lot of these concepts disappear entirely as things like “Snowflake” do the data management, and separate entities live in separate databases entirely.

I’m in agreement with people in the sense that sometimes lambdas really are overkill. But, I don’t agree that “servers accomplish exactly what lambdas can”. From a purely technical perspective, it might actually be true that a high performing monolith is cheaper and more available than a set of lambdas. However, organizationally monoliths introduce a huge number of problems related to deployment and maintenance that creates chokepoints that are hard to untangle.

### Knowledge I’m coming in with

Honestly, I’m in agreement about this skepticism and concern. However, regardless of if it’s the right choice, it’s certainly the choice we’re headed towards, and it’s worth understanding what’s going on under the hood. I have enough experience with books like _Accelerate_ to understand the general concept of why lambdas are good.

My theories are twofold:

1. Devops resources are the scarcest in the world. Building out EKS clusters is a pain in the ass, and trying to maintain them is harder. “Serverless” technologies basically mean you have to spend less time on that stuff as a business.
2. While single servers are great and scale wonderfully, they actually create chokepoints on the development side because the more developers who have to commit to a single infrastructure, the harder it gets to actually make changes.

I’ve committed code to a repo that is a lambda, and I’ve done some various kicking around on things like [AWS SAM](https://aws.amazon.com/serverless/sam/) and [Serverless](https://www.serverless.com/). What I don’t have is the habits to know what tools to reach in with as new things pop up.

### Goals for this Experiment

Have a deployed, publicly accessible API that operates similarly to an existing API I have deployed previously. Likely this one: [https://github.com/play-this-tonight/games-api](https://github.com/play-this-tonight/games-api)

You’ll notice that right now this is **only** a Graphql server. To get the full benefit of all of this, I’m likely going to play around with REST concepts as well. The goal isn’t to create a server that is maximally “correct” but a server that uses different concepts to understand their benefits and use cases.

I also want to end this with a list of answers for basic questions I have about how I can use different serverless concepts.

#### TL;DR Goals

1. Deployed serverless “server”
2. Answers to my list of questions about serverless

### My Approach

I’m going to ask a question, or try to accomplish a basic task that I already know how to do. This might look something like “How do I use DynamoDB?” or “How do I run things locally?”. I will write a corresponding blog post and create a GitHub branch that encapsulates these learnings, sharing both out. This roughly follow’s Julia Evans’ advice on [Learning Skills](https://jvns.ca/blog/2018/09/01/learning-skills-you-can-practice/). Find an area of my understanding that I don’t know in serverless, compare it to something I do know, and research until I can understand the differences.

I plan to follow [Jessica Kerr’s](https://jessitron.com/) advice to [keep projects separate](https://jessitron.com/2022/06/07/keep-your-experiments-separate/). By splitting them up into as small of concepts as possible, I can attempt an implementation, get some basic learnings, and move on quickly without getting bogged down in complex and interwoven concepts.

#### More Practical Concepts

I'll be using AWS as the service provider, assuming many of the concepts will be transferrable, and I will lean into [free and cheap sources](https://aws.amazon.com/free/) wherever possible. This might mean some concepts (like a postgres database) go by the wayside in the effort to keep control of costs.

I'll be building using Typescript and Node because that's where I'm most comfortable. I want to focus on system building not language learning.

### Let’s Go

And with that, we’re off. Time to go learn how to lambda.
