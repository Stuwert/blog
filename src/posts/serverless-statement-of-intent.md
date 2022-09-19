---
title: Serverless, A Statement of Intent
date: "2022-09-18"
tags: [engineering, serverless]
description: What I plan to accomplish with this project
permalink: posts/{{ title | slugify }}/index.html
status: draft
# socialImage:
---

Look I know that going to server less land is about a whole new way of seeing and thinking about the world. I generally believe Swyx’s post about [the end of localhost]. But while that might be the way the world is headed, it’s easiest for me to understand this stuff in the context of how I typically develop software. Long term most of this stuff is going into event driven systems where the “call and response” of the front end backend coupling doesn’t make much sense, which will further disconnect the need for this type of work.

That means a focus on local setup, being able to mimic existing patterns.

So what I’m going to do is I’m going to build out an API in AWS lambda using Graphql and Restful components to communicate between a backend and a front end. I’m going to be walking through my impressions and expectations each step of the way. Along with what I have learned.

### Knowledge I’m coming in with

I have enough experience with books like _Accelerate_ to understand the general concept of why lambdas are good.

My theories are twofold:

1. Devops resources are the scarcest in the world. Building out EKS clusters is a pain in the ass and trying to maintain them is harder. “Serverless” technologies basically mean you have to spend less time on that stuff as a business.
2. While single servers are great and scale wonderfully, they actually create huge chokepoints on the development side because the more developers that have to commit to a single infrastructure the harder it gets to actually make changes. (Google for example has its own version control system built just to handle this problem)

There are also counterpoints like:

- Lambdas can’t remain running long term easily
- They’re good for background or one off tasks but not good for server management

And on the other side there’s this whole idea that “Distributed Systems” are an entirely different way of thinking about the world.

Like… uh… sure, yes, but I’m not going to get to the point where I can learn those things until I know how to recreate what I’ve got in Lambdaland.

### Goals for this Experiment

- Come up with a solid set of deployment and development environment patterns
- Understand how deployments work and how different components of the AWS ecosystem function
  - Events
  - AppSync
  - API Gateway
  - DynamoDb
    - I’m picking DynamoDb here because they give you lots of free hours
- Understand what the cost drivers are of each of these

### What does success look like?

That I know enough to create competent fully orchestrated implementations of AWS lambda and that I know enough when to use lambda versus not (and where the technology is going) and

### Plan of Attack

At each point I’d like to write a quick blog post about what I’ve learned and then publish those thoughts, and move onto the next one.

I plan to follow Julia Evans’ advice here and do one thing at a time, asking questions, framing those questions, and then repeating back what I’ve learned

[https://jvns.ca/blog/2018/09/01/learning-skills-you-can-practice/]

I also plan to keep the projects separate. Each will have a single goal and try to answer a single question [https://jessitron.com/2022/06/07/keep-your-experiments-separate/]
